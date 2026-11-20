import urllib.request
import re

req = urllib.request.Request(
    'https://www.sbtjapan.com/used-cars/search',
    headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'}
)

try:
    with urllib.request.urlopen(req, timeout=10) as resp:
        html = resp.read().decode('utf-8', errors='ignore')
        print('Fetched length:', len(html))
        with open('scripts/sbt_sample.html', 'w', encoding='utf-8') as f:
            f.write(html)
        print('Saved to scripts/sbt_sample.html')
except Exception as e:
    print('Error:', e)
