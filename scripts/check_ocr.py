import os
from PIL import Image

extract_dir = r"D:\downloads\extracted_car_covers"

try:
    import pytesseract
    has_tess = True
except ImportError:
    has_tess = False

print(f"pytesseract available: {has_tess}")

# If no tesseract, let's inspect the files and their properties
for f in sorted(os.listdir(extract_dir)):
    if f.endswith('.html'): continue
    p = os.path.join(extract_dir, f)
    im = Image.open(p)
    print(f"{f[:45]:45} | Size: {im.size} | Aspect: {im.size[0]/im.size[1]:.2f}")
