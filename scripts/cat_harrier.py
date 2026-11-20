with open(r'D:\alberka-motors\src\data\vehicles.ts', 'r', encoding='utf-8') as f:
    code = f.read()

# Let's categorize Harrier photos exactly like VehicleStoryView.tsx
import re
start = code.find('id: "toyota-harrier-gr-sport-2019"')
end = code.find('id: "toyota-harrier-2020-grey"')
v_text = code[start:end]

gal_match = re.search(r'gallery:\s*\[([\s\S]*?)\]\s*,', v_text)
gal_items = re.findall(r'title:\s*["\']([^"\']+)["\'][\s\S]*?url:\s*["\']([^"\']+)["\']', gal_match.group(1))

ext, int_c, det = [], [], []

for title, url in gal_items:
    t = title.lower()
    isInterior = 'cockpit' in t or 'interior' in t or 'seat' in t or 'lounge' in t or 'saddle' in t
    isDetail = 'wheel' in t or 'grille' in t or 'tail' in t or 'tailgate' in t or 'lamp' in t or 'glass' in t
    if isInterior:
        int_c.append((title, url))
    elif isDetail:
        det.append((title, url))
    else:
        ext.append((title, url))

print(f"Total: {len(gal_items)}")
print(f"Exterior ({len(ext)}): {[x[0] for x in ext]}")
print(f"Cabin ({len(int_c)}): {[x[0] for x in int_c]}")
print(f"Details ({len(det)}): {[x[0] for x in det]}")
