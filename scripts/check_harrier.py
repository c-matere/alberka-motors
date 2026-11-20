import re

with open(r'D:\alberka-motors\src\data\vehicles.ts', 'r', encoding='utf-8') as f:
    text = f.read()

harrier_block = text[text.find('toyota-harrier-gr-sport-2019'):text.find('toyota-harrier-2020-grey')]

gallery_urls = re.findall(r'url:\s*["\']([^"\']+)["\']', harrier_block)
print(f"Gallery URLs found: {len(gallery_urls)}")
for u in gallery_urls:
    print(" -", u)

image_urls = re.findall(r'imageUrl:\s*["\']([^"\']+)["\']', harrier_block)
print(f"\nImage URLs found: {len(image_urls)}")
for u in image_urls:
    print(" -", u)
