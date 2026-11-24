import os, re
from PIL import Image

vehicles_path = r"D:\alberka-motors\src\data\vehicles.ts"
with open(vehicles_path, 'r', encoding='utf-8') as vf:
    code = vf.read()

# Find the main VEHICLES array definition
v_match = re.search(r"export const VEHICLES: Vehicle\[\] = \[(.*?)\];", code, re.DOTALL)
if v_match:
    v_content = v_match.group(1)
    # find all objects with id, name, heroImage
    matches = re.finditer(r"\{\s*id:\s*['\"]([^'\"]+)['\"].*?name:\s*['\"]([^'\"]+)['\"].*?heroImage:\s*['\"]([^'\"]+)['\"]", v_content, re.DOTALL)
    for m in matches:
        print(f"Vehicle: id='{m.group(1)}', name='{m.group(2)}', hero='{m.group(3)}'")
else:
    print("Could not find export const VEHICLES")

# Inspect the images extracted
extract_dir = r"D:\downloads\extracted_car_covers"
print("\nInspecting extracted images:")
for f in os.listdir(extract_dir):
    p = os.path.join(extract_dir, f)
    try:
        im = Image.open(p)
        print(f"  {f}: format={im.format}, size={im.size}, mode={im.mode}")
    except Exception as e:
        print(f"  {f}: error {e}")
