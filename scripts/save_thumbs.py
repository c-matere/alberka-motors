import os
from PIL import Image

extract_dir = r"D:\downloads\extracted_car_covers"

# Let's save small thumbnails into artifacts directory so we can see or describe them
artifacts_dir = r"C:\Users\ADMIN\.gemini\antigravity-cli\brain\8ae78a52-0d1f-484a-b9ae-b4fc3fd2296b"

for f in sorted(os.listdir(extract_dir)):
    if f.endswith('.html'): continue
    p = os.path.join(extract_dir, f)
    im = Image.open(p)
    # create thumbnail
    im.thumbnail((400, 400))
    clean_name = f.replace("…", "").replace("🖤", "").strip()
    thumb_path = os.path.join(artifacts_dir, f"thumb_{clean_name}")
    im.save(thumb_path, "JPEG")
    print(f"Saved thumb for {clean_name}")
