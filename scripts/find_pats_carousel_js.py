import urllib.request
import re

url = "https://patmotorworld.co.ke"
headers = {"User-Agent": "Mozilla/5.0"}
req = urllib.request.Request(url, headers=headers)
html = urllib.request.urlopen(req).read().decode('utf-8', errors='ignore')

scripts = re.findall(r'src=["\']([^"\']+\.js[^"\']*)["\']', html)
for s in scripts:
    s_url = s if s.startswith('http') else "https://patmotorworld.co.ke" + s
    try:
        req_s = urllib.request.Request(s_url, headers=headers)
        data = urllib.request.urlopen(req_s).read().decode('utf-8', errors='ignore')
        if 'figma-carousel' in data:
            print(f"FOUND in {s}!")
            idx = data.find('figma-carousel')
            print(data[max(0, idx-100):idx+800])
            break
    except Exception as e:
        pass
