import urllib.request
import re

req = urllib.request.Request("https://alberka.co.ke", headers={'User-Agent': 'Mozilla/5.0'})
html = urllib.request.urlopen(req).read().decode('utf-8')
js_file = re.search(r'src="(/assets/index-[^"]+\.js)"', html).group(1)
print("JS file:", js_file)

req2 = urllib.request.Request("https://alberka.co.ke" + js_file, headers={'User-Agent': 'Mozilla/5.0'})
js_content = urllib.request.urlopen(req2).read().decode('utf-8')

# Search for toyota-harrier-gr-sport-2019 in JS bundle
pos = js_content.find('toyota-harrier-gr-sport-2019')
print("Position in JS bundle:", pos)

# Find all images for toyota-harrier-gr-sport-2019 in bundle
harrier_snippet = js_content[pos:pos+25000]
jpgs = re.findall(r'/vehicles/toyota-harrier-gr-sport-2019/[a-zA-Z0-9_\-\.]+\.jpg', harrier_snippet)
print(f"JPEGs found in Harrier snippet on live site ({len(jpgs)}):")
for j in sorted(set(jpgs)):
    print(" ", j)
