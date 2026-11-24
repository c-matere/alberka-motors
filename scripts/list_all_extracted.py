import os
from PIL import Image

extract_dir = r"D:\downloads\extracted_car_covers"

print("All 17 files in zip:")
for i, f in enumerate(sorted(os.listdir(extract_dir))):
    if f.endswith('.html'): continue
    p = os.path.join(extract_dir, f)
    im = Image.open(p)
    print(f"[{i+1}] {f} ({im.size[0]}x{im.size[1]})")
