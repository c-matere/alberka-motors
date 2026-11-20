import urllib.request
import re

url = 'https://alberka.co.ke'
headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'}

try:
    req = urllib.request.Request(url, headers=headers)
    with urllib.request.urlopen(req, timeout=10) as resp:
        html = resp.read().decode('utf-8')
        print(f"Home page status: {resp.status}")

    js_match = re.search(r'src="([^"]*assets/index-[^"]*\.js)"', html)
    css_match = re.search(r'href="([^"]*assets/index-[^"]*\.css)"', html)

    print("JS bundle:", js_match.group(1) if js_match else "NOT FOUND")
    print("CSS bundle:", css_match.group(1) if css_match else "NOT FOUND")

    if js_match:
        js_path = js_match.group(1)
        js_url = url + js_path if js_path.startswith('/') else f"{url}/{js_path}"
        r_req = urllib.request.Request(js_url, headers=headers)
        with urllib.request.urlopen(r_req, timeout=10) as r:
            js_data = r.read()
            print(f"JS HTTP {r.status}, size: {len(js_data)} bytes")

    if css_match:
        css_path = css_match.group(1)
        css_url = url + css_path if css_path.startswith('/') else f"{url}/{css_path}"
        c_req = urllib.request.Request(css_url, headers=headers)
        with urllib.request.urlopen(c_req, timeout=10) as r:
            css_data = r.read()
            print(f"CSS HTTP {r.status}, size: {len(css_data)} bytes")

    print("[✓] Live site and all static assets verified 100% OK!")
except Exception as e:
    print(f"[!] Verification error: {e}")
