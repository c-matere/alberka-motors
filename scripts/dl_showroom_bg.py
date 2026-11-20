"""
Download a luxury automotive dark showroom background from Unsplash.
"""
import urllib.request, sys

# Dark luxury car showroom / dealership interior - high quality
# Multiple options to try
urls = [
    # Dark dealership showroom floor, ambient lighting, no cars
    ("https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=2000&q=85&auto=format&fit=crop", "flagship-hero.jpg"),
    # Dark automotive showroom interior
    ("https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=2000&q=85&auto=format&fit=crop", "showroom-bg-dark.jpg"),
    # Luxury car showroom at night
    ("https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=2000&q=85&auto=format&fit=crop", "showroom-bg-night.jpg"),
]

for url, name in urls:
    out = rf"D:\alberka-motors\public\vehicles\{name}"
    print(f"Downloading {name}...")
    try:
        req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
        with urllib.request.urlopen(req, timeout=30) as r:
            data = r.read()
        with open(out, "wb") as f:
            f.write(data)
        print(f"  Saved {len(data):,} bytes to {out}")
    except Exception as e:
        print(f"  Failed: {e}")
