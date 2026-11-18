import urllib.request
import re

url = "https://patmotorworld.co.ke"
headers = {"User-Agent": "Mozilla/5.0"}
req = urllib.request.Request(url, headers=headers)

try:
    with urllib.request.urlopen(req, timeout=10) as resp:
        html = resp.read().decode('utf-8', errors='ignore')
        print(f"Fetched {len(html)} bytes")
        
        # Look for css links or carousel css
        css_links = re.findall(r'<link[^>]+href=["\']([^"\']+\.css[^"\']*)["\']', html)
        print("CSS links:", css_links)
        
        # Save HTML snippet of carousel
        if 'figma-carousel' in html:
            print("Found figma-carousel in HTML!")
            start = html.find('figma-carousel-section')
            print("Snippet:", html[max(0, start-100):start+1500])
        else:
            print("figma-carousel not in HTML directly, searching scripts or assets...")
            scripts = re.findall(r'<script[^>]+src=["\']([^"\']+)["\']', html)
            print("Scripts:", scripts[:5])
except Exception as e:
    print(f"Error: {e}")
