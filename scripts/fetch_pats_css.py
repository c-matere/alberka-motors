import urllib.request
import re

base = "https://patmotorworld.co.ke"
headers = {"User-Agent": "Mozilla/5.0"}

css_files = ['/_next/static/css/842dba0bdd4a25ed.css', '/_next/static/css/05a3325d20034774.css']

for c in css_files:
    try:
        req = urllib.request.Request(base + c, headers=headers)
        with urllib.request.urlopen(req, timeout=10) as resp:
            content = resp.read().decode('utf-8', errors='ignore')
            print(f"Downloaded {c}: {len(content)} bytes")
            if 'figma-carousel' in content:
                print(f"FOUND 'figma-carousel' in {c}!")
                # Extract all rules containing figma
                rules = [part for part in content.split('}') if 'figma' in part]
                for r in rules:
                    print(r + '}')
    except Exception as e:
        print(f"Error downloading {c}: {e}")
