import os
from PIL import Image

extract_dir = r"D:\downloads\extracted_car_covers"
public_vehicles = r"D:\alberka-motors\public\vehicles"

# Compare 007 with existing hero-front-34
def analyze_img(path):
    im = Image.open(path)
    # calculate average color
    im_small = im.resize((10, 10))
    pixels = list(im_small.getdata())
    avg_r = sum(p[0] for p in pixels) / len(pixels)
    avg_g = sum(p[1] for p in pixels) / len(pixels)
    avg_b = sum(p[2] for p in pixels) / len(pixels)
    return im.size, (round(avg_r), round(avg_g), round(avg_b))

pairs = [
    ("007_toyota-harrier-gr-sport-2019.jpg_96303515.jpg", "toyota-harrier-gr-sport-2019/hero-front-34.jpg"),
    ("008_toyota-harrier-2020-grey.jpg_8f4e94db.jpg", "toyota-harrier-2020-grey/hero-front-34.jpg"),
    ("009_subaru-xv-2019-black.jpg_ce368486.jpg", "subaru-xv-2019-black/hero-front-34.jpg"),
    ("010_volvo-xc40-r-design-2019.jpg_dbd187ba.jpg", "volvo-xc40-r-design-2019/hero-front-34.jpg"),
]

for new_f, old_rel in pairs:
    new_p = os.path.join(extract_dir, new_f)
    old_p = os.path.join(public_vehicles, old_rel)
    new_size, new_col = analyze_img(new_p)
    old_size, old_col = analyze_img(old_p)
    print(f"Comparing {new_f[:30]} with {old_rel}:")
    print(f"  New: size={new_size}, avg_color={new_col}, file_size={os.path.getsize(new_p):,}")
    print(f"  Old: size={old_size}, avg_color={old_col}, file_size={os.path.getsize(old_p):,}")

# Also check other images in zip
print("\nOther images in zip:")
for f in sorted(os.listdir(extract_dir)):
    if not any(f.startswith(prefix) for prefix in ["007", "008", "009", "010"]):
        p = os.path.join(extract_dir, f)
        s, c = analyze_img(p)
        print(f"  {f[:40]:<40} | size={s} | avg_col={c}")
