with open(r'D:\alberka-motors\src\data\vehicles.ts', 'r', encoding='utf-8') as f:
    text = f.read()

import re

# Extract toyota-harrier-gr-sport-2019 block
start = text.find('id: "toyota-harrier-gr-sport-2019"')
end = text.find('id: "toyota-harrier-2020-grey"')
block = text[start:end]

# Extract heroImage
hero_m = re.search(r'heroImage:\s*["\']([^"\']+)["\']', block)
hero_image = hero_m.group(1) if hero_m else None

# Extract colors
colors_m = re.findall(r'imageUrl:\s*["\']([^"\']+)["\']', block[:block.find('gallery:')])

# Extract gallery
gal_block = block[block.find('gallery:'):block.find('closerLookPoints:')]
gallery_urls = re.findall(r'url:\s*["\']([^"\']+)["\']', gal_block)
gallery_titles = re.findall(r'title:\s*["\']([^"\']+)["\']', gal_block)

print(f"Hero Image: {hero_image}")
print(f"Colors: {colors_m}")
print(f"Gallery count: {len(gallery_urls)}")

# Now simulate allPhotos in VehicleStoryView.tsx:
all_photos = []
all_photos.append(hero_image)
all_photos.extend(colors_m)
all_photos.extend(gallery_urls)

unique_photos = []
for p in all_photos:
    if p not in unique_photos:
        unique_photos.append(p)

print(f"Total Unique in allPhotos: {len(unique_photos)}")
for idx, p in enumerate(unique_photos):
    print(f" {idx+1}. {p}")
