import os
from PIL import Image

extract_dir = r"D:\downloads\extracted_car_covers"

# Print details of the posters
posters_to_check = [
    "Toyota_Harrier_vintage_poster_ead3c595.jpg",
    "Toyota_Harrier_vintage_automotiv_1511db97.jpg",
    "Subaru_Crosstrek_automotive_poster_25051205.jpg",
    "Subaru_Crosstrek_automotive_poster_668906b5.jpg",
    "Volvo_XC40_automotive_poster_b98eb152.jpg",
    "Volvo_SUV_automotive_poster_62e42884.jpg",
    "Automotive_poster_featuring_cros_44e4be07.jpg",
    "Modern_minimalist_automotive_poster_00d0d15b.jpg",
    "011_1969-dodge-charger-r-t.jpg_2eb4c298.jpg"
]

print("Poster details:")
for p in os.listdir(extract_dir):
    clean = p.replace("…", "").replace("🖤", "").strip()
    full = os.path.join(extract_dir, p)
    if os.path.isfile(full) and not p.endswith('.html'):
        im = Image.open(full)
        print(f"{clean:50} | Size: {im.size} | Mode: {im.mode}")
