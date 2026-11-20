import json

with open(r'D:\alberka-motors\src\data\vehicles.ts', 'r', encoding='utf-8') as f:
    text = f.read()

# Let's check how many photos are in Harrier GR Sport in vehicles.ts
import re
harrier_text = text[text.find('id: "toyota-harrier-gr-sport-2019"'):text.find('id: "toyota-harrier-2020-grey"')]

# find gallery: [ ... ]
gallery_match = re.search(r'gallery:\s*\[([\s\S]*?)\]\s*,', harrier_text)
if gallery_match:
    items = re.findall(r'url:\s*["\']([^"\']+)["\']', gallery_match.group(1))
    titles = re.findall(r'title:\s*["\']([^"\']+)["\']', gallery_match.group(1))
    print(f"Harrier gallery items: {len(items)}")
    for t, u in zip(titles, items):
        print(f"  {t} -> {u}")
else:
    print("No gallery match found")
