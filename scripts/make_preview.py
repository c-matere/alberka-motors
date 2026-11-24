import os
from PIL import Image

extract_dir = r"D:\downloads\extracted_car_covers"

# Let's inspect some sample pixels or metadata or write an HTML preview to see what each image looks like
html = ["<html><body style='background:#111;color:#fff;font-family:sans-serif;'>"]
html.append("<h1>Images in Nov 24 - 13_23.zip</h1>")
html.append("<div style='display:flex;flex-wrap:wrap;gap:20px;'>")

for f in sorted(os.listdir(extract_dir)):
    p = os.path.join(extract_dir, f)
    if os.path.isfile(p):
        im = Image.open(p)
        w, h = im.size
        html.append(f"<div style='border:1px solid #444;padding:10px;max-width:320px;'>")
        html.append(f"<img src='file:///{p.replace(os.sep, '/')}' style='max-width:300px;max-height:300px;display:block;' />")
        html.append(f"<p style='font-size:12px;word-break:break-all;'><b>{f}</b><br>{w}x{h}</p>")
        html.append("</div>")

html.append("</div></body></html>")

preview_path = os.path.join(extract_dir, "preview.html")
with open(preview_path, 'w', encoding='utf-8') as hf:
    hf.write("\n".join(html))

print(f"Preview HTML written to {preview_path}")
