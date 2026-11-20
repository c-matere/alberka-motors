import urllib.request
import re

url = 'https://www.sbtjapan.com/'
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'})
with urllib.request.urlopen(req, timeout=15) as resp:
    html = resp.read().decode('utf-8', errors='ignore')

# Search for brand / maker logo images
img_srcs = re.findall(r'<img[^>]+src="([^">]+)"[^>]*alt="([^">]*)"', html)
brand_logos = []
for src, alt in img_srcs:
    if any(b in (src + alt).lower() for b in ['toyota', 'nissan', 'honda', 'subaru', 'suzuki', 'mazda', 'volvo', 'brand', 'maker']):
        brand_logos.append((alt, src))

print("Found brand logos on homepage:", len(brand_logos))
for alt, src in brand_logos[:25]:
    print(f"  {alt}: {src}")
