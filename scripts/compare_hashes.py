import os, hashlib
from PIL import Image

extract_dir = r"D:\downloads\extracted_car_covers"
public_vehicles = r"D:\alberka-motors\public\vehicles"

# Compare with existing files in public/vehicles
for f in os.listdir(extract_dir):
    p = os.path.join(extract_dir, f)
    h = hashlib.md5(open(p, 'rb').read()).hexdigest()
    print(f"Zip file: {f}")
    print(f"  MD5: {h}, Size: {os.path.getsize(p):,}")

print("\n--- Existing hero-front-34.jpg files ---")
for car in ['toyota-harrier-gr-sport-2019', 'toyota-harrier-2020-grey', 'subaru-xv-2019-black', 'volvo-xc40-r-design-2019', 'suzuki-every-2019']:
    cp = os.path.join(public_vehicles, car, 'hero-front-34.jpg')
    if os.path.exists(cp):
        ch = hashlib.md5(open(cp, 'rb').read()).hexdigest()
        im = Image.open(cp)
        print(f"{car}/hero-front-34.jpg:")
        print(f"  MD5: {ch}, Size: {os.path.getsize(cp):,}, Dims: {im.size}")
