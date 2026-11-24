import os, zipfile, json, re

zip_path = r"D:\downloads\Nov 24 - 13_23.zip"
extract_dir = r"D:\downloads\extracted_car_covers"
os.makedirs(extract_dir, exist_ok=True)

with zipfile.ZipFile(zip_path, 'r') as z:
    z.extractall(extract_dir)
    extracted = z.namelist()

print(f"Extracted {len(extracted)} files to {extract_dir}:")
for f in extracted:
    p = os.path.join(extract_dir, f)
    print(f"  - {f} ({os.path.getsize(p):,} bytes)")

# Read vehicles.ts
vehicles_path = r"D:\alberka-motors\src\data\vehicles.ts"
with open(vehicles_path, 'r', encoding='utf-8') as vf:
    code = vf.read()

# Match vehicle blocks
blocks = re.findall(r"id:\s*['\"]([^'\"]+)['\"].*?name:\s*['\"]([^'\"]+)['\"].*?heroImage:\s*['\"]([^'\"]+)['\"]", code, re.DOTALL)
print("\nCurrent Vehicles in codebase:")
for vid, name, hero in blocks:
    print(f"  ID: {vid} | Name: {name} | Current Hero: {hero}")
