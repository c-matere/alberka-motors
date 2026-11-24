import os, shutil

extract_dir = r"D:\downloads\extracted_car_covers"
public_vehicles = r"D:\alberka-motors\public\vehicles"

# 1. Update the car hero cover images
updates = [
    ("007_toyota-harrier-gr-sport-2019.jpg_96303515.jpg", "toyota-harrier-gr-sport-2019", "hero-front-34.jpg"),
    ("008_toyota-harrier-2020-grey.jpg_8f4e94db.jpg", "toyota-harrier-2020-grey", "hero-front-34.jpg"),
    ("009_subaru-xv-2019-black.jpg_ce368486.jpg", "subaru-xv-2019-black", "hero-front-34.jpg"),
    ("010_volvo-xc40-r-design-2019.jpg_dbd187ba.jpg", "volvo-xc40-r-design-2019", "hero-front-34.jpg"),
]

for src_name, car_dir, dest_name in updates:
    src_path = os.path.join(extract_dir, src_name)
    dest_path = os.path.join(public_vehicles, car_dir, dest_name)
    if os.path.exists(src_path):
        shutil.copy2(src_path, dest_path)
        # Also copy as cover.jpg for alternate reference
        shutil.copy2(src_path, os.path.join(public_vehicles, car_dir, "cover.jpg"))
        print(f"Updated {car_dir}/{dest_name} ({os.path.getsize(dest_path):,} bytes)")

# 2. Save all posters into public/vehicles/posters/
posters_dir = os.path.join(public_vehicles, "posters")
os.makedirs(posters_dir, exist_ok=True)

for f in os.listdir(extract_dir):
    if f.endswith('.html'): continue
    src = os.path.join(extract_dir, f)
    # clean filename
    clean_name = f.replace("…", "").replace("🖤", "").strip()
    dst = os.path.join(posters_dir, clean_name)
    shutil.copy2(src, dst)

print(f"\nAll {len(os.listdir(extract_dir))-1} assets archived to public/vehicles/posters/")
