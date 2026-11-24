import os, shutil

extract_dir = r"D:\downloads\extracted_car_covers"
public_vehicles = r"D:\alberka-motors\public\vehicles"

poster_map = {
    "toyota-harrier-gr-sport-2019": "Toyota_Harrier_vintage_poster_ead3c595.jpg",
    "toyota-harrier-2020-grey": "Toyota_Harrier_vintage_automotiv_1511db97.jpg",
    "subaru-xv-2019-black": "Subaru_Crosstrek_automotive_poster_25051205.jpg",
    "volvo-xc40-r-design-2019": "Volvo_XC40_automotive_poster_b98eb152.jpg",
}

for car, poster in poster_map.items():
    src = os.path.join(extract_dir, poster)
    dst = os.path.join(public_vehicles, car, "cover.jpg")
    if os.path.exists(src):
        shutil.copy2(src, dst)
        print(f"Copied {poster} -> {car}/cover.jpg ({os.path.getsize(dst):,} bytes)")
    else:
        # Check partial match
        matches = [f for f in os.listdir(extract_dir) if f.startswith(poster[:15])]
        if matches:
            shutil.copy2(os.path.join(extract_dir, matches[0]), dst)
            print(f"Copied {matches[0]} -> {car}/cover.jpg ({os.path.getsize(dst):,} bytes)")
