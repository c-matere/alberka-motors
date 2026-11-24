import os
from PIL import Image

extract_dir = r"D:\downloads\extracted_car_covers"

# Let's inspect each poster and print basic stats
for f in sorted(os.listdir(extract_dir)):
    if f.endswith('.html'): continue
    clean = f.replace("…", "").replace("🖤", "").strip()
    p = os.path.join(extract_dir, f)
    im = Image.open(p)
    # Get color of top, middle, bottom
    top_pixel = im.getpixel((im.size[0]//2, 50))
    mid_pixel = im.getpixel((im.size[0]//2, im.size[1]//2))
    bot_pixel = im.getpixel((im.size[0]//2, im.size[1]-50))
    print(f"{clean:48} | Size: {im.size} | Top: {top_pixel[:3]} | Mid: {mid_pixel[:3]} | Bot: {bot_pixel[:3]}")
