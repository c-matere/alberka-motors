import os
from PIL import Image

extract_dir = r"D:\downloads\extracted_car_covers"

files = sorted(os.listdir(extract_dir))
for f in files:
    if f.endswith('.html'): continue
    p = os.path.join(extract_dir, f)
    im = Image.open(p)
    print(f"File: {f}")
    print(f"  Size: {im.size}, Format: {im.format}")
