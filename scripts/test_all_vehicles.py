import json
import re

with open(r'D:\alberka-motors\src\data\vehicles.ts', 'r', encoding='utf-8') as f:
    code = f.read()

# Let's extract all vehicle ids
vehicle_ids = re.findall(r'id:\s*["\']([^"\']+)["\'],\s*stockNo:', code)
print("Vehicle IDs:", vehicle_ids)

for vid in vehicle_ids:
    pos1 = code.find(f'id: "{vid}"')
    # find next vehicle or end
    pos2 = len(code)
    for other_id in vehicle_ids:
        p = code.find(f'id: "{other_id}"', pos1 + 10)
        if p != -1 and p < pos2:
            pos2 = p
    v_text = code[pos1:pos2]

    # Find heroImage
    hero = re.search(r'heroImage:\s*["\']([^"\']+)["\']', v_text)
    hero_url = hero.group(1) if hero else ""

    # Find gallery urls
    gal_match = re.search(r'gallery:\s*\[([\s\S]*?)\]\s*,', v_text)
    gal_urls = re.findall(r'url:\s*["\']([^"\']+)["\']', gal_match.group(1)) if gal_match else []

    # Find closerLook urls
    cl_match = re.search(r'closerLookPoints:\s*\[([\s\S]*?)\]\s*,', v_text)
    cl_urls = re.findall(r'imageUrl:\s*["\']([^"\']+)["\']', cl_match.group(1)) if cl_match else []

    all_urls = [hero_url] + gal_urls + cl_urls
    unique = list(dict.fromkeys([u for u in all_urls if u]))

    print(f"\nVehicle: {vid}")
    print(f"  Gallery items in definition: {len(gal_urls)}")
    print(f"  Total unique images: {len(unique)}")
    if len(gal_urls) != len(unique):
        print(f"  Diff: {set(unique) - set(gal_urls)}")
