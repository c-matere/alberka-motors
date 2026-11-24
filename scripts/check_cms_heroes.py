import urllib.request, json

url = "https://alberka.co.ke/api/vehicles?limit=100"
req = urllib.request.Request(url, headers={
    "Accept": "application/json",
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"
})
with urllib.request.urlopen(req, timeout=10) as r:
    data = json.loads(r.read())

print(f"Total docs in CMS: {len(data.get('docs', []))}")
for doc in data.get('docs', []):
    print(f"Slug: {str(doc.get('slug')):30} | HeroImage: {doc.get('heroImage')}")
