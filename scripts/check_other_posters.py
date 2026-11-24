import os
from PIL import Image

extract_dir = r"D:\downloads\extracted_car_covers"

for f in ["Modern_minimalist_automotive_poster_00d0d15b.jpg", "Car_Poster_Design.jpg_81ec944b.jpg", "Luxury_Car_Aesthetics_🖤___0680cf5e.jpg", "011_1969-dodge-charger-r-t.jpg_2eb4c298.jpg"]:
    if os.path.exists(os.path.join(extract_dir, f)):
        im = Image.open(os.path.join(extract_dir, f))
        print(f"{f}: {im.size}")
