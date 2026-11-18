import urllib.request
import re

url = "https://patmotorworld.co.ke/_next/static/chunks/app/(squeeze)/layout-7a6f97a0d7f625c9.js"
headers = {"User-Agent": "Mozilla/5.0"}
try:
    req = urllib.request.Request(url, headers=headers)
    with urllib.request.urlopen(req) as resp:
        content = resp.read().decode('utf-8', errors='ignore')
        if 'figma-carousel' in content:
            print("Found in layout chunk!")
            # find where figma-carousel is used
            idx = content.find('figma-carousel')
            print(content[max(0, idx-200):idx+1000])
except Exception as e:
    print(f"Error: {e}")
