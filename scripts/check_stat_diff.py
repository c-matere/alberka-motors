import os
from PIL import Image, ImageChops, ImageStat

extract_dir = r"D:\downloads\extracted_car_covers"
public_vehicles = r"D:\alberka-motors\public\vehicles"

pairs = [
    ("007_toyota-harrier-gr-sport-2019.jpg_96303515.jpg", r"D:\alberka-motors\public\vehicles\toyota-harrier-gr-sport-2019\hero-front-34.jpg"),
    ("008_toyota-harrier-2020-grey.jpg_8f4e94db.jpg", r"D:\alberka-motors\public\vehicles\toyota-harrier-2020-grey\hero-front-34.jpg"),
    ("009_subaru-xv-2019-black.jpg_ce368486.jpg", r"D:\alberka-motors\public\vehicles\subaru-xv-2019-black\hero-front-34.jpg"),
    ("010_volvo-xc40-r-design-2019.jpg_dbd187ba.jpg", r"D:\alberka-motors\public\vehicles\volvo-xc40-r-design-2019\hero-front-34.jpg"),
]

for new_f, old_p in pairs:
    new_p = os.path.join(extract_dir, new_f)
    im1 = Image.open(new_p)
    im2 = Image.open(old_p)
    diff = ImageChops.difference(im1, im2)
    stat = ImageStat.Stat(diff)
    print(f"{new_f}:")
    print(f"  Mean diff per channel (RGB): {stat.mean[:3]}")
    print(f"  Max diff per channel (RGB): {stat.extrema}")
