#!/usr/bin/env python3
"""
scripts/upload_vehicle.py

Reusable vehicle ingestion and deployment script for Alberka Motors.
Ingests future vehicles with images, technical specifications, dynamic equipment
checklist, builds the frontend, and optionally deploys to VPS and purges Cloudflare cache.

Usage:
  # Initialize a sample manifest template:
  python scripts/upload_vehicle.py --init-manifest new_vehicle.json

  # Ingest from manifest:
  python scripts/upload_vehicle.py --manifest new_vehicle.json --build

  # Ingest, build, deploy to VPS and purge Cloudflare cache:
  python scripts/upload_vehicle.py --manifest new_vehicle.json --build --deploy --purge-cf
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

    gallery = []
    images_dir = vehicle.get("imagesDir")
    explicit_images = vehicle.get("images", [])

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
    """Deploys dist/ folder to remote VPS via SSH/SFTP"""
    print(f"[*] Deploying {DIST_DIR} to {VPS_HOST}:{REMOTE_DIST_PATH}...")
    import paramiko

    k = paramiko.RSAKey.from_private_key_file(VPS_KEY_PATH)
    ssh = paramiko.SSHClient()
    ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
    ssh.connect(VPS_HOST, username=VPS_USER, pkey=k, timeout=20)

    temp_tar = os.path.join(tempfile.gettempdir(), "alberka_dist.tar.gz")
    with tarfile.open(temp_tar, "w:gz") as tar:
        tar.add(DIST_DIR, arcname=".")

    sftp = ssh.open_sftp()
    remote_tar = "/tmp/alberka_dist.tar.gz"
    sftp.put(temp_tar, remote_tar)
    sftp.close()

    cmd = (
        f"rm -rf {REMOTE_DIST_PATH} && mkdir -p {REMOTE_DIST_PATH} && "
        f"tar -xzf {remote_tar} -C {REMOTE_DIST_PATH} && rm -f {remote_tar} && "
        f"chown -R ec2-user:ec2-user {REMOTE_DIST_PATH}"
    )
    stdin, stdout, stderr = ssh.exec_command(cmd)
    stdout.read()
    err = stderr.read().decode("utf-8")
    if err:
        print(f"[!] Remote warning/stderr: {err}")
    ssh.close()
    if os.path.exists(temp_tar):
        os.remove(temp_tar)
    print(f"[✓] Deployment to {VPS_HOST} completed successfully!")


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
    parser.add_argument("--deploy", action="store_true", help="Deploy built dist to VPS (169.58.169.64)")
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

    # Process images and gallery
    process_vehicle_images(vehicle_data)

    # Insert into vehicles.ts
    insert_vehicle_into_vehicles_ts(vehicle_data)

    if args.build or args.deploy:
        run_build()

    if args.deploy:
        deploy_to_vps()

    if args.purge_cf:
        purge_cloudflare_cache()

    print(f"\n[✓] All requested operations completed successfully for '{vehicle_data['id']}'!")


if __name__ == "__main__":
    main()
