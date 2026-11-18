import urllib.request
import re

url = "https://patmotorworld.co.ke/_next/static/css/05a3325d20034774.css"
headers = {"User-Agent": "Mozilla/5.0"}

req = urllib.request.Request(url, headers=headers)
with urllib.request.urlopen(req) as resp:
    content = resp.read().decode('utf-8', errors='ignore')

# Find :root or color definitions
colors = re.findall(r'--color-[a-zA-Z0-9_-]+:[^;]+;', content)
print("Pats colors:")
for c in set(colors):
    print(" ", c)
