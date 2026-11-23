#!/usr/bin/env python3
"""
scripts/upload_vehicle.py

Reusable vehicle ingestion and deployment script for Alberka Motors.
Ingests future vehicles with images, technical specifications, dynamic equipment
checklist, builds the frontend, and optionally deploys to VPS and purges Cloudflare cache.

Usage:
  # Initialize a sample manifest template:
  python scripts/upload_vehicle.py --init-manifest new_vehicle.json

  # Check a manifest before touching the catalogue:
  python scripts/upload_vehicle.py --manifest new_vehicle.json --validate-only

  # Ingest and build:
  python scripts/upload_vehicle.py --manifest new_vehicle.json --build

  # Ingest, build and run the full deploy pipeline (dist, nginx, CMS sync):
  python scripts/upload_vehicle.py --manifest new_vehicle.json --deploy

  NOTE: adding a vehicle only in Payload /admin will NOT publish it. The frontend
  treats src/data/vehicles.ts as the canonical catalogue and ignores CMS-only
  vehicle records. This script is the supported way to add a car. The deploy
  step uploads the updated catalogue to the VPS and runs the create-only Payload
  sync, which verifies every vehicle is queryable in the CMS before finishing.
"""

import argparse
import json
import os
import re
import shutil
import subprocess
import sys
import tarfile
import tempfile
import urllib.request

# Windows consoles default to cp1252 and cannot print the check marks used in
# the script's status messages.
if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")

ROOT_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
VEHICLES_TS_PATH = os.path.join(ROOT_DIR, "src", "data", "vehicles.ts")
MODEL_HUBS_TS_PATH = os.path.join(ROOT_DIR, "src", "data", "modelHubs.ts")
PUBLIC_VEHICLES_DIR = os.path.join(ROOT_DIR, "public", "vehicles")
DIST_DIR = os.path.join(ROOT_DIR, "dist")

VPS_HOST = "169.58.169.64"
VPS_USER = "root"
VPS_KEY_PATH = r"C:\Users\ADMIN\.ssh\smart_team.pem"
REMOTE_DIST_PATH = "/home/ec2-user/alberka-motors/dist"
CF_ZONE_ID = "35b136dc268c7a8ad91b149b8c325e8c"  # alberka.co.ke
ENV_PATH = r"C:\Users\ADMIN\.env"

# The public catalogue is TypeScript-typed. A manifest missing any of these
# fields used to produce a vehicle object that failed `tsc --noEmit`.
REQUIRED_SCALARS = {
    "m3": "",
    "heroVideo": "",
    "hubId": "",
    "exteriorGrade": "",
    "equipmentRemarks": "",
}
REQUIRED_LISTS = [
    "colors",
    "closerLookPoints",
    "editorialFeatures",
    "chapters",
    "gallery",
    "specifications",
    "workshopProtocol",
    "equipmentChecklist",
]
ALLOWED_CATEGORIES = {"suv", "hybrid", "van", "compact", "executive"}
ALLOWED_STATUSES = {"In Stock", "Cleared Port", "In Transit"}
ALLOWED_STEERING = {"RHD", "LHD"}


def normalize_manifest(vehicle: dict) -> list:
    """Fill fields required by the Vehicle interface and return any warnings."""
    warnings = []

    for key, default in REQUIRED_SCALARS.items():
        if key not in vehicle or vehicle[key] is None:
            vehicle[key] = default

    for key in REQUIRED_LISTS:
        if not isinstance(vehicle.get(key), list):
            vehicle[key] = []

    if not vehicle["heroImage"]:
        vehicle["heroImage"] = (
            vehicle["gallery"][0]["url"] if vehicle["gallery"] else "/car_hero.png"
        )

    if not vehicle["chapters"]:
        hero = vehicle["heroImage"]
        vehicle["chapters"] = [
            {
                "id": "overview",
                "tabLabel": "Overview",
                "eyebrow": f"STOCK {vehicle.get('stockNo', '')}".strip(),
                "title": vehicle["name"],
                "narrative": [
                    vehicle.get("essenceQuote") or vehicle.get("tagline") or "",
                    vehicle.get("description") or "",
                ],
                "imageUrl": hero,
                "highlights": [
                    {"label": "Year", "value": str(vehicle.get("year", ""))},
                    {"label": "Mileage", "value": f"{vehicle.get('mileageKm', '')} km"},
                    {"label": "Grade", "value": str(vehicle.get("auctionGrade", ""))},
                ],
            }
        ]

    category = str(vehicle.get("category", "")).lower()
    if category not in ALLOWED_CATEGORIES:
        warnings.append(
            f"category '{vehicle.get('category')}' is invalid; allowed: {', '.join(sorted(ALLOWED_CATEGORIES))}"
        )
    if vehicle.get("steering") not in ALLOWED_STEERING:
        warnings.append("steering must be 'RHD' or 'LHD'")
    if vehicle.get("status") not in ALLOWED_STATUSES:
        warnings.append(f"status '{vehicle.get('status')}' is invalid; allowed: {', '.join(sorted(ALLOWED_STATUSES))}")

    for key in ("id", "stockNo", "name", "priceKes", "year", "mileageKm"):
        if not vehicle.get(key):
            warnings.append(f"{key} is required")

    return warnings


def get_cloudflare_token() -> str:
    """Read Cloudflare token from ADMIN .env"""
    if not os.path.exists(ENV_PATH):
        return ""
    with open(ENV_PATH, "r", encoding="utf-8", errors="ignore") as f:
        for line in f:
            line = line.strip()
            if line.startswith("CLOUDFLARE_API_TOKEN="):
                return line.split("=", 1)[1].strip().strip("'\"")
    return ""


def init_sample_manifest(path: str):
    sample = {
        "id": "toyota-harrier-2020-hybrid",
        "stockNo": "ALB-HR20",
        "sbtStockId": "HR2020",
        "chassisNo": "AXUH80-001234",
        "modelCode": "6AA-AXUH80",
        "engineCode": "A25A-FXS (2.5L Hybrid)",
        "name": "Toyota Harrier 2.5 Hybrid G Package",
        "moniker": "Executive Luxury Hybrid Crossover",
        "essenceQuote": "Pristine 2020 Toyota Harrier Hybrid G with whisper-quiet Atkinson powertrain and executive cabin.",
        "kicker": "2020 Model · 2.5L Hybrid · Grade 4.5 · Mombasa Stock",
        "tagline": "Toyota Harrier 2020 · 2.5L Dynamic Force Hybrid · Luxury Japanese Import",
        "priceKes": 4450000,
        "originalPriceKes": 4750000,
        "discountPercent": 6,
        "hubId": "toyota-harrier",
        "priceUsd": 21000,
        "freightUsd": 2200,
        "vanningUsd": 0,
        "inspectionUsd": 250,
        "insuranceUsd": 200,
        "totalCifUsd": 23650,
        "inventoryLocation": "Ganjoni Showroom, Mombasa (Next to Ganjoni Primary School)",
        "sbtGrade": "G PACKAGE HYBRID",
        "year": 2020,
        "registrationMonth": "08",
        "manufactureYearMonth": "2020 / 08",
        "mileageKm": 48000,
        "steering": "RHD",
        "category": "suv",
        "bodyType": "SUV",
        "fuelType": "HYBRID",
        "transmission": "e-CVT",
        "drivetrain": "2WD",
        "doors": 5,
        "seats": 5,
        "engine": "2,487 cc A25A-FXS",
        "power": "218 HP",
        "torque": "221 Nm",
        "fuelEconomy": "21.6 km/L",
        "exteriorColor": "Pearl White",
        "colorCode": "070",
        "interiorColor": "Black Leather & Fabric",
        "locationYard": "Alberka Motors Showroom (Ganjoni, Mombasa)",
        "dimensions": "4.74m × 1.85m × 1.66m",
        "m3": "14.5 m³",
        "wheelbase": "2,690 mm",
        "groundClearance": "195 mm",
        "curbWeight": "1,680 kg",
        "grossWeight": "2,050 kg",
        "maxLoadingCapacity": "450 kg",
        "fuelTankCapacity": "55 Liters",
        "auctionGrade": "4.5",
        "auctionHall": "USS Tokyo / SBT Japan",
        "interiorGrade": "A",
        "inspectionStatus": "QISJ / JEVIC Export Approved",
        "status": "In Stock",
        "imagesDir": "",  # Folder containing vehicle images to copy into public/vehicles/<id>/
        "images": [],     # Or list of local image paths or URLs
        "m3": "14.5 m³",
        "heroVideo": "",
        "heroImage": "",
        "colors": [],
        "closerLookPoints": [],
        "editorialFeatures": [],
        "chapters": [],
        "gallery": [],
        "specifications": [],
        "workshopProtocol": [],
        "exteriorGrade": "",
        "equipmentChecklist": [
            {
                "category": "COMFORT & CONVENIENCE",
                "items": [
                    {"name": "ACC (Adaptive Cruise)", "active": True},
                    {"name": "Air Conditioner", "active": True},
                    {"name": "Audio Player", "active": True},
                    {"name": "Both Power Slide Door", "active": False},
                    {"name": "Cooler", "active": True},
                    {"name": "Cruise Control", "active": True},
                    {"name": "Double Air Conditioner", "active": True},
                    {"name": "Left Side Power Slide Door", "active": False},
                    {"name": "Navigation System", "active": True},
                    {"name": "Paddle Shift", "active": False},
                    {"name": "Power Back Door", "active": True},
                    {"name": "Power Seat", "active": True},
                    {"name": "Power Steering", "active": True},
                    {"name": "Power Window All", "active": True},
                    {"name": "Power Window Driver", "active": True},
                    {"name": "Power Window Front", "active": True},
                    {"name": "Push Start", "active": True},
                    {"name": "Steering Switch", "active": True}
                ]
            },
            {
                "category": "DRESS UP",
                "items": [
                    {"name": "Aero Front", "active": False},
                    {"name": "Aero Rear", "active": False},
                    {"name": "Aero Side", "active": False},
                    {"name": "Alloy Wheels", "active": True},
                    {"name": "Grill Guard", "active": False},
                    {"name": "Rear Spoiler", "active": True},
                    {"name": "Wood Combination Steering", "active": False}
                ]
            },
            {
                "category": "EXTERIOR",
                "items": [
                    {"name": "Carrier Base", "active": False},
                    {"name": "Roof Box", "active": False},
                    {"name": "Roof Carrier", "active": False},
                    {"name": "Roof Rails", "active": False},
                    {"name": "Sun Roof", "active": False},
                    {"name": "Double Sun Roof", "active": False},
                    {"name": "Glass Roof", "active": False},
                    {"name": "Fog Light", "active": True},
                    {"name": "HID Light", "active": False},
                    {"name": "LED Light", "active": True},
                    {"name": "High Roof", "active": False},
                    {"name": "New Shape", "active": True},
                    {"name": "Slide Glass", "active": False}
                ]
            },
            {
                "category": "SAFETY",
                "items": [
                    {"name": "ABS", "active": True},
                    {"name": "Air Bag", "active": True},
                    {"name": "Around View Monitor", "active": True},
                    {"name": "Back Camera", "active": True},
                    {"name": "Front Camera", "active": True},
                    {"name": "Side Camera", "active": True},
                    {"name": "Corner Sensor", "active": True},
                    {"name": "ESC", "active": True}
                ]
            },
            {
                "category": "OTHER & REMARKS",
                "items": [
                    {"name": "Auto Door", "active": False},
                    {"name": "Back Tire", "active": False},
                    {"name": "Just Low", "active": False},
                    {"name": "Half Leather Seat", "active": True},
                    {"name": "Leather Seat", "active": False},
                    {"name": "Same Tire", "active": True},
                    {"name": "Side Lift Up Seat", "active": False},
                    {"name": "Sloper", "active": False}
                ]
            }
        ],
        "equipmentRemarks": "5SEATS, RADAR CRUISE, LED HEADLIGHTS"
    }

    with open(path, "w", encoding="utf-8") as f:
        json.dump(sample, f, indent=2, ensure_ascii=False)
    print(f"[✓] Created sample manifest template: {path}")


def process_vehicle_images(vehicle: dict) -> list:
    """Copies images into public/vehicles/<id>/ and generates the gallery array"""
    vehicle_id = vehicle["id"]
    target_dir = os.path.join(PUBLIC_VEHICLES_DIR, vehicle_id)
    os.makedirs(target_dir, exist_ok=True)

    images_dir = vehicle.get("imagesDir")
    explicit_images = vehicle.get("images", [])

    # If the manifest already has a curated gallery and no new images to copy, preserve it
    if not images_dir and not explicit_images and vehicle.get("gallery"):
        return vehicle["gallery"]

    gallery = []
    files_to_copy = []
    if images_dir and os.path.isdir(images_dir):
        for fn in sorted(os.listdir(images_dir)):
            if fn.lower().endswith((".jpg", ".jpeg", ".png", ".webp")):
                files_to_copy.append(os.path.join(images_dir, fn))

    for p in explicit_images:
        if os.path.isfile(p):
            files_to_copy.append(p)
        elif p.startswith("http://") or p.startswith("https://") or p.startswith("/"):
            gallery.append({
                "title": f"{vehicle['name']} — Photographic Record",
                "description": f"Verified import at Mombasa showroom next to Ganjoni Primary School.",
                "url": p
            })

    for src_path in files_to_copy:
        fn = os.path.basename(src_path)
        dest_path = os.path.join(target_dir, fn)
        if os.path.abspath(src_path) != os.path.abspath(dest_path):
            shutil.copy2(src_path, dest_path)
        clean_name = re.sub(r"[-_]", " ", os.path.splitext(fn)[0]).title()
        gallery.append({
            "title": f"{vehicle['name']} — {clean_name}",
            "description": f"Verified condition view for stock ID {vehicle.get('sbtStockId', vehicle.get('stockNo', ''))}.",
            "url": f"/vehicles/{vehicle_id}/{fn}"
        })

    if not vehicle.get("heroImage") and gallery:
        vehicle["heroImage"] = gallery[0]["url"]

    vehicle["gallery"] = gallery
    return gallery


def ensure_vehicle_options(vehicle: dict):
    """Ensures options: SBTOptions exists to satisfy TypeScript interface"""
    if "options" not in vehicle or not isinstance(vehicle["options"], dict):
        # Infer from equipmentChecklist if present
        checklist_items = {}
        for cat in vehicle.get("equipmentChecklist", []):
            for item in cat.get("items", []):
                checklist_items[item["name"].lower()] = bool(item.get("active"))

        vehicle["options"] = {
            "pushStart": checklist_items.get("push start", True),
            "smartKey": checklist_items.get("push start", True),
            "powerWindows": checklist_items.get("power window all", True),
            "airConditioner": checklist_items.get("air conditioner", True),
            "powerSeats": checklist_items.get("power seat", False),
            "leatherSeats": checklist_items.get("leather seat", False),
            "sunroof": checklist_items.get("sun roof", False),
            "alloyWheels": checklist_items.get("alloy wheels", True),
            "abs": checklist_items.get("abs", True),
            "airbags": checklist_items.get("air bag", True),
            "backCamera": checklist_items.get("back camera", True),
            "camera360": checklist_items.get("around view monitor", False),
            "radarCruise": checklist_items.get("acc (adaptive cruise)", False),
            "laneAssist": False,
            "ledLights": checklist_items.get("led light", False),
            "navigation": checklist_items.get("navigation system", False),
            "audioPlayer": checklist_items.get("audio player", True),
            "fogLights": checklist_items.get("fog light", False),
            "rearSpoiler": checklist_items.get("rear spoiler", False),
            "doubleAc": checklist_items.get("double air conditioner", False),
            "powerBackDoor": checklist_items.get("power back door", False),
        }


def format_ts_vehicle(vehicle: dict) -> str:
    """Serializes vehicle dict into clean TypeScript object notation"""
    return json.dumps(vehicle, indent=2, ensure_ascii=False)


def insert_vehicle_into_vehicles_ts(vehicle: dict):
    """Inserts or replaces vehicle in src/data/vehicles.ts"""
    with open(VEHICLES_TS_PATH, "r", encoding="utf-8") as f:
        code = f.read()

    vid = vehicle["id"]
    id_pattern = rf"id:\s*['\"]{re.escape(vid)}['\"]"

    # Convert vehicle dict to JS-friendly formatted code
    v_json = json.dumps(vehicle, indent=4, ensure_ascii=False)
    # Convert quoted keys to unquoted where standard identifier
    v_code = re.sub(r'^\s*"([a-zA-Z_][a-zA-Z0-9_]*)":', r'    \1:', v_json, flags=re.MULTILINE)

    if re.search(id_pattern, code):
        print(f"[*] Vehicle ID '{vid}' already exists in vehicles.ts; updating...")
        # Find object boundary
        start_match = re.search(rf"\n\s*\{{\s*\n\s*id:\s*['\"]{re.escape(vid)}['\"]", code)
        if start_match:
            start_pos = start_match.start()
            # find next closing brace of this vehicle
            brace_depth = 0
            end_pos = start_pos
            for i in range(start_pos + 1, len(code)):
                if code[i] == '{':
                    brace_depth += 1
                elif code[i] == '}':
                    if brace_depth == 1:
                        end_pos = i + 1
                        break
                    brace_depth -= 1
            code = code[:start_pos] + "\n  " + v_code + code[end_pos:]
    else:
        print(f"[*] Appending vehicle '{vid}' into VEHICLES list...")
        array_end = code.rfind("];")
        if array_end != -1:
            code = code[:array_end].rstrip() + ",\n  " + v_code + "\n];\n"
        else:
            raise RuntimeError("Could not find closing '];' of VEHICLES array in vehicles.ts")

    with open(VEHICLES_TS_PATH, "w", encoding="utf-8") as f:
        f.write(code)
    print(f"[✓] src/data/vehicles.ts updated successfully with vehicle '{vid}'.")


def run_build():
    """Executes npm run build locally"""
    print("[*] Running npm run build...")
    res = subprocess.run(["npm.cmd", "run", "build"], cwd=ROOT_DIR, capture_output=True, text=True)
    if res.returncode != 0:
        print("[!] Build failed with output:")
        print(res.stderr or res.stdout)
        sys.exit(1)
    print("[✓] Build succeeded cleanly!")


def deploy_to_vps():
    """Deploys dist/ folder to remote VPS via SSH/SCP"""
    print(f"[*] Deploying {DIST_DIR} to {VPS_HOST}:{REMOTE_DIST_PATH}...")

    temp_tar = os.path.join(tempfile.gettempdir(), "alberka_dist.tar.gz")
    print(f"[*] Creating compressed archive {temp_tar}...")
    with tarfile.open(temp_tar, "w:gz") as tar:
        tar.add(DIST_DIR, arcname=".")

    remote_tar = "/tmp/alberka_dist.tar.gz"
    scp_cmd = [
        "scp.exe",
        "-i", VPS_KEY_PATH,
        "-o", "StrictHostKeyChecking=no",
        temp_tar,
        f"{VPS_USER}@{VPS_HOST}:{remote_tar}"
    ]
    print(f"[*] Uploading archive to {VPS_HOST}:{remote_tar}...")
    res = subprocess.run(scp_cmd, capture_output=True, text=True)
    if res.returncode != 0:
        print(f"[!] scp failed: {res.stderr}")
        sys.exit(1)

    remote_commands = (
        f"rm -rf {REMOTE_DIST_PATH} && mkdir -p {REMOTE_DIST_PATH} && "
        f"tar -xzf {remote_tar} -C {REMOTE_DIST_PATH} && rm -f {remote_tar} && "
        f"chown -R ec2-user:ec2-user {REMOTE_DIST_PATH} && "
        f"chmod -R 755 {REMOTE_DIST_PATH} && nginx -s reload"
    )
    ssh_cmd = [
        "ssh.exe",
        "-i", VPS_KEY_PATH,
        "-o", "StrictHostKeyChecking=no",
        f"{VPS_USER}@{VPS_HOST}",
        remote_commands
    ]
    print(f"[*] Extracting on VPS and reloading web server...")
    res = subprocess.run(ssh_cmd, capture_output=True, text=True)
    if res.returncode != 0:
        print(f"[!] ssh remote command failed: {res.stderr}")
    else:
        print(f"[✓] Deployment to {VPS_HOST} completed successfully!")

    if os.path.exists(temp_tar):
        os.remove(temp_tar)


def purge_cloudflare_cache():
    """Purges entire Cloudflare edge cache for alberka.co.ke"""
    token = get_cloudflare_token()
    if not token:
        print("[!] Cloudflare token not found in .env; skipping purge.")
        return

    print(f"[*] Purging Cloudflare edge cache for zone {CF_ZONE_ID} (alberka.co.ke)...")
    url = f"https://api.cloudflare.com/client/v4/zones/{CF_ZONE_ID}/purge_cache"
    data = json.dumps({"purge_everything": True}).encode("utf-8")
    req = urllib.request.Request(
        url,
        data=data,
        headers={"Authorization": f"Bearer {token}", "Content-Type": "application/json"},
        method="POST"
    )
    try:
        with urllib.request.urlopen(req) as resp:
            res_json = json.loads(resp.read().decode("utf-8"))
            if res_json.get("success"):
                print("[✓] Cloudflare cache purged successfully for alberka.co.ke!")
            else:
                print(f"[!] Cloudflare purge response: {res_json}")
    except Exception as e:
        print(f"[!] Cloudflare purge failed: {e}")


def main():
    parser = argparse.ArgumentParser(description="Alberka Motors Reusable Vehicle Upload Script")
    parser.add_argument("--init-manifest", help="Generate a sample manifest JSON file to fill out")
    parser.add_argument("--manifest", help="Path to completed vehicle manifest JSON")
    parser.add_argument("--build", action="store_true", help="Run local npm run build after ingestion")
    parser.add_argument("--deploy", action="store_true", help="Run the canonical deploy_site.py pipeline (build, upload, nginx, CMS sync)")
    parser.add_argument("--validate-only", action="store_true", help="Validate the manifest without modifying vehicles.ts")
    parser.add_argument("--purge-cf", action="store_true", help="Purge Cloudflare cache after deployment")

    args = parser.parse_args()

    if args.init_manifest:
        init_sample_manifest(args.init_manifest)
        return

    if not args.manifest:
        print("Please provide --manifest <json_file> or --init-manifest <json_file>.")
        parser.print_help()
        sys.exit(1)

    with open(args.manifest, "r", encoding="utf-8") as f:
        vehicle_data = json.load(f)

    warnings = normalize_manifest(vehicle_data)
    if warnings:
        print("[!] Manifest problems:")
        for warning in warnings:
            print(f"    - {warning}")
        if args.validate_only:
            sys.exit(1)
    else:
        print("[✓] Manifest validated against the Vehicle interface.")

    if args.validate_only:
        print("[✓] Validation only; vehicles.ts was not changed.")
        return

    # Process images and gallery
    process_vehicle_images(vehicle_data)

    # Ensure required TypeScript SBTOptions exist
    ensure_vehicle_options(vehicle_data)

    # Insert into vehicles.ts
    insert_vehicle_into_vehicles_ts(vehicle_data)

    if args.build:
        run_build()

    if args.deploy:
        # The canonical pipeline also uploads vehicles.ts to the VPS, runs the
        # create-only Payload vehicle sync and reloads nginx. The old in-script
        # scp deploy skipped those steps and left the CMS without the new car.
        deploy_script = os.path.join(ROOT_DIR, "scripts", "deploy_site.py")
        print("[*] Running the canonical deploy pipeline...")
        res = subprocess.run(
            [sys.executable, deploy_script], cwd=ROOT_DIR, capture_output=True, text=True
        )
        print(res.stdout)
        if res.returncode != 0:
            print(res.stderr)
            sys.exit(1)

    if args.purge_cf:
        purge_cloudflare_cache()

    print(f"\n[✓] All requested operations completed successfully for '{vehicle_data['id']}'!")


if __name__ == "__main__":
    main()
