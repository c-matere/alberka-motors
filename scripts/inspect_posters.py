import os
from PIL import Image

extract_dir = r"D:\downloads\extracted_car_covers"

posters = [
    "Toyota_Harrier_vintage_poster_ead3c595.jpg",
    "Toyota_Harrier_vintage_automotiv…_1511db97.jpg",
    "Subaru_Crosstrek_automotive_poster_25051205.jpg",
    "Subaru_Crosstrek_automotive_poster_668906b5.jpg",
    "Volvo_XC40_automotive_poster_b98eb152.jpg",
    "Volvo_SUV_automotive_poster_62e42884.jpg",
    "Modern_minimalist_automotive_poster_00d0d15b.jpg",
]

print("Posters in zip:")
for p in posters:
    full = os.path.join(extract_dir, p)
    if os.path.exists(full):
        im = Image.open(full)
        print(f"{p}: size={im.size}, mode={im.mode}")
