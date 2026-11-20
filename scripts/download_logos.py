import urllib.request
import os

logos = {
    'toyota': 'https://www.sbtjapan.com/html/template/default/assets/img/logo_toyota.png',
    'nissan': 'https://www.sbtjapan.com/html/template/default/assets/img/logo_nissan.png',
    'subaru': 'https://www.sbtjapan.com/html/template/default/assets/img/logo_subaru.png',
    'suzuki': 'https://www.sbtjapan.com/html/template/default/assets/img/logo_suzuki.png',
    'volvo': 'https://www.sbtjapan.com/html/template/default/assets/img/logo_volvo.png',
    'mazda': 'https://www.sbtjapan.com/html/template/default/assets/img/logo_mazda.png',
    'honda': 'https://www.sbtjapan.com/html/template/default/assets/img/logo_honda.png',
    'mitsubishi': 'https://www.sbtjapan.com/html/template/default/assets/img/logo_mitsubishi.png',
    'lexus': 'https://www.sbtjapan.com/html/template/default/assets/img/logo_lexus.png',
    'mercedes': 'https://www.sbtjapan.com/html/template/default/assets/img/logo_mercedes.png',
    'bmw': 'https://www.sbtjapan.com/html/template/default/assets/img/logo_bmw.png',
    'volkswagen': 'https://www.sbtjapan.com/html/template/default/assets/img/logo_volkswagen.png',
    'audi': 'https://www.sbtjapan.com/html/template/default/assets/img/logo_audi.png',
    'landrover': 'https://www.sbtjapan.com/html/template/default/assets/img/logo_landrover.png',
}

out_dir = 'D:/alberka-motors/public/logos'
os.makedirs(out_dir, exist_ok=True)

headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'}

for name, url in logos.items():
    dest = os.path.join(out_dir, f'{name}.png')
    try:
        req = urllib.request.Request(url, headers=headers)
        with urllib.request.urlopen(req, timeout=10) as resp:
            data = resp.read()
            with open(dest, 'wb') as f:
                f.write(data)
            print(f"Downloaded {name}.png ({len(data)} bytes)")
    except Exception as e:
        print(f"Failed {name}: {e}")
