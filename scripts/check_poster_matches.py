import os
from PIL import Image

extract_dir = r"D:\downloads\extracted_car_covers"

posters = [
    "Toyota_Harrier_vintage_poster_ead3c595.jpg",
    "Toyota_Harrier_vintage_automotiv…_1511db97.jpg",
    "Subaru_Crosstrek_automotive_poster_25051205.jpg",
    "Subaru_Crosstrek_automotive_poster_668906b5.jpg",
    "Automotive_poster_featuring_cros…_44e4be07.jpg",
    "Volvo_XC40_automotive_poster_b98eb152.jpg",
    "Volvo_SUV_automotive_poster_62e42884.jpg",
    "Modern_minimalist_automotive_poster_00d0d15b.jpg",
    "Car_Poster_Design.jpg_81ec944b.jpg",
    "Luxury_Car_Aesthetics_🖤___0680cf5e.jpg",
    "Porsche_GT3_RS_design_on_a561fd85.jpg",
    "011_1969-dodge-charger-r-t.jpg_2eb4c298.jpg",
]

for p in posters:
    full = os.path.join(extract_dir, p)
    if os.path.exists(full):
        im = Image.open(full)
        print(f"{p}: {im.size}")
    else:
        # Check partial match
        matches = [f for f in os.listdir(extract_dir) if f.startswith(p[:15])]
        for m in matches:
            im = Image.open(os.path.join(extract_dir, m))
            print(f"{m}: {im.size}")
