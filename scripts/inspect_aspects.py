import os
from PIL import Image

extract_dir = r"D:\downloads\extracted_car_covers"

print(f"{'Filename':<50} | {'Dimensions':<12} | {'Aspect':<8}")
print("-" * 75)
for f in sorted(os.listdir(extract_dir)):
    p = os.path.join(extract_dir, f)
    if os.path.isfile(p):
        try:
            im = Image.open(p)
            w, h = im.size
            aspect = f"{w/h:.2f}"
            print(f"{f[:48]:<50} | {f'{w}x{h}':<12} | {aspect:<8}")
        except Exception as e:
            print(f"{f[:48]:<50} | Error: {e}")
