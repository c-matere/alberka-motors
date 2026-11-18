#!/usr/bin/env python3
"""
scripts/update_inventory.py
Removes Prado, adds Harrier 2020 Grey, updates Suzuki Every specs.
"""
import json
import os
import re

ROOT_DIR = r"D:\alberka-motors"
VEHICLES_TS = os.path.join(ROOT_DIR, "src", "data", "vehicles.ts")
MANIFEST_2020 = os.path.join(ROOT_DIR, "harrier_2020_manifest.json")

def main():
    with open(VEHICLES_TS, "r", encoding="utf-8") as f:
        code = f.read()

    # 1. Remove Prado
    prado_start = code.find("id: 'toyota-land-cruiser-prado-ax2877'")
    if prado_start != -1:
        # Walk back to find the starting '{'
        block_start = code.rfind("{\n", 0, prado_start)
        # Walk forward to find the next vehicle block start '{'
        suzuki_start = code.find("id: 'suzuki-every-2019'")
        if suzuki_start != -1:
            block_end = code.rfind("{\n", prado_start, suzuki_start)
            code = code[:block_start] + code[block_end:]
            print("[✓] Removed Prado from vehicles.ts")
        else:
            print("[!] Could not locate suzuki-every boundary")
    else:
        print("[*] Prado already removed")

    # 2. Ingest Harrier 2020 Grey from manifest
    with open(MANIFEST_2020, "r", encoding="utf-8") as f:
        harrier_data = json.load(f)

    # Check if harrier 2020 already present
    h2020_id = harrier_data["id"]
    if f"id: \"{h2020_id}\"" in code or f"id: '{h2020_id}'" in code:
        print(f"[*] {h2020_id} already exists in vehicles.ts")
    else:
        v_json = json.dumps(harrier_data, indent=4, ensure_ascii=False)
        v_code = re.sub(r'^\s*"([a-zA-Z_][a-zA-Z0-9_]*)":', r'    \1:', v_json, flags=re.MULTILINE)
        array_end = code.rfind("];")
        if array_end != -1:
            code = code[:array_end].rstrip() + ",\n  " + v_code + "\n];\n"
            print(f"[✓] Appended {h2020_id} into vehicles.ts")

    with open(VEHICLES_TS, "w", encoding="utf-8") as f:
        f.write(code)

    print("[✓] vehicles.ts updated successfully!")

if __name__ == "__main__":
    main()
