import os
from PIL import Image

extract_dir = r"D:\downloads\extracted_car_covers"

# Check the aspect ratio: all posters are vertical portrait (~3:4 or 9:16)
for name in ["Car_Poster_Design.jpg_81ec944b.jpg", "Modern_minimalist_automotive_poster_00d0d15b.jpg"]:
    p = os.path.join(extract_dir, name)
    im = Image.open(p)
    print(f"{name}: size={im.size}")
