import urllib.request, re

url = 'https://patmotorworld.co.ke'
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
html = urllib.request.urlopen(req).read().decode('utf-8', errors='ignore')
chunks = re.findall(r'static/chunks/[^\"]+\.js', html)
print('Chunks found:', len(chunks))
for c in chunks:
    try:
        data = urllib.request.urlopen('https://patmotorworld.co.ke/_next/' + c).read().decode('utf-8', errors='ignore')
        if 'figma-carousel' in data:
            print('FOUND IN CHUNK:', c)
            start = data.find('figma-carousel')
            print(data[max(0, start-100):start+1200])
            break
    except Exception as e:
        pass
