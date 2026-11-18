#!/usr/bin/env python3
"""
scripts/sync_all_inventory.py
Synchronizes all live Alberka inventory in src/data/vehicles.ts:
- Suzuki Every 2019 (ALB-EV19) KES 1.05M
- Toyota Harrier GR Sport 2019 (ALB-HR19) KES 4.85M
- Toyota Harrier 2020 Grey 80-Series (ALB-HR20) KES 4.95M
- Volvo XC40 R-Design 2019 T4 AWD (ALB-XC40) KES 4.65M
- Subaru XV 2019 AWD (ALB-XV19) KES 3.15M
And ensures Prado 120 is completely removed.
"""
import json
import os
import re

ROOT_DIR = r"D:\alberka-motors"
VEHICLES_TS = os.path.join(ROOT_DIR, "src", "data", "vehicles.ts")

MANIFESTS = [
    os.path.join(ROOT_DIR, "harrier_2020_manifest.json"),
    os.path.join(ROOT_DIR, "volvo_xc40_manifest.json"),
    os.path.join(ROOT_DIR, "subaru_xv_manifest.json"),
]

def format_ts_vehicle(v: dict) -> str:
    v_json = json.dumps(v, indent=4, ensure_ascii=False)
    # Unquote object keys for idiomatic TypeScript
    v_code = re.sub(r'^\s*"([a-zA-Z_][a-zA-Z0-9_]*)":', r'    \1:', v_json, flags=re.MULTILINE)
    return v_code

def main():
    with open(VEHICLES_TS, "r", encoding="utf-8") as f:
        code = f.read()

    # 1. Ensure Prado is removed
    if "toyota-land-cruiser-prado-ax2877" in code:
        print("[*] Removing Prado 120...")
        prado_start = code.find("id: 'toyota-land-cruiser-prado-ax2877'")
        if prado_start == -1:
            prado_start = code.find('id: "toyota-land-cruiser-prado-ax2877"')
        if prado_start != -1:
            block_start = code.rfind("{\n", 0, prado_start)
            next_vehicle = code.find("id: 'suzuki-every-2019'", prado_start)
            if next_vehicle != -1:
                block_end = code.rfind("{\n", prado_start, next_vehicle)
                code = code[:block_start] + code[block_end:]
                print("[✓] Successfully excised Prado from vehicles.ts")

    # 2. Ingest manifests
    for manifest_path in MANIFESTS:
        if not os.path.exists(manifest_path):
            print(f"[!] Warning: manifest {manifest_path} not found")
            continue
        with open(manifest_path, "r", encoding="utf-8") as f:
            v_data = json.load(f)
        
        vid = v_data["id"]
        v_code = format_ts_vehicle(v_data)

        # Check if already present
        id_pattern = rf"id:\s*['\"]{re.escape(vid)}['\"]"
        if re.search(id_pattern, code):
            print(f"[*] Vehicle '{vid}' already exists in vehicles.ts; updating...")
            start_match = re.search(rf"\n\s*\{{\s*\n\s*id:\s*['\"]{re.escape(vid)}['\"]", code)
            if start_match:
                start_pos = start_match.start()
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
            print(f"[*] Appending vehicle '{vid}'...")
            array_end = code.rfind("];")
            if array_end != -1:
                code = code[:array_end].rstrip() + ",\n  " + v_code + "\n];\n"

    with open(VEHICLES_TS, "w", encoding="utf-8") as f:
        f.write(code)

    print("[✓] All vehicles synchronized in src/data/vehicles.ts!")

if __name__ == "__main__":
    main()
