"""
Generate Alberka Motors showroom hero image using Gemini image generation.
Volvo XC40 in a luxury automotive showroom with Alberka 3D logo on wall.
"""
import os, sys, json, base64, urllib.request, urllib.error

# Read API key
key = None
with open(r'C:\Users\ADMIN\.env', 'r', encoding='utf-8') as f:
    for line in f:
        if line.startswith('GEMINI_API_KEY='):
            key = line.strip().split('=', 1)[1].strip('"').strip("'")
            break

if not key:
    print('ERROR: No GEMINI_API_KEY found!')
    sys.exit(1)

print(f'Using Gemini key: {key[:12]}...{key[-4:]}')

prompt = (
    "Professional wide-angle luxury automotive showroom photograph. "
    "A sleek black Volvo XC40 R-Design SUV faces the camera in a proud three-quarter front stance, "
    "positioned on a glossy dark charcoal epoxy showroom floor with crisp mirror reflections underneath. "
    "The showroom is elegant, modern, with floor-to-ceiling glass windows revealing a city skyline at dusk. "
    "On the pristine matte grey architectural wall directly behind the car, mounted high and prominently, "
    "is a large three-dimensional polished brushed silver metallic wall sign reading 'ALBERKA ENTERPRISES' "
    "with deep physical embossed beveled letterforms, real physical depth and subtle drop shadows — "
    "exactly like a premium luxury car dealership branded showroom wall. "
    "Dramatic overhead track lighting casts warm amber rim light on the vehicle curves. "
    "Deep blacks, rich reflections, editorial automotive photography. 16:9 landscape orientation. "
    "No text overlays. No people. Photorealistic, ultra-high quality."
)

# Try multiple models in order
models = [
    "gemini-3.1-flash-image",
    "gemini-3.0-flash-image",
    "gemini-2.5-flash-image",
    "gemini-3.1-flash-image-preview",
    "gemini-3-pro-image",
]

output_path = r"D:\alberka-motors\public\vehicles\volvo-showroom-hero.jpg"

for model in models:
    url = f"https://generativelanguage.googleapis.com/v1beta/models/{model}:generateContent?key={key}"
    payload = json.dumps({
        "contents": [{"parts": [{"text": prompt}]}],
        "generationConfig": {
            "responseModalities": ["TEXT", "IMAGE"]
        }
    }).encode('utf-8')
    
    req = urllib.request.Request(url, data=payload, headers={"Content-Type": "application/json"}, method="POST")
    
    print(f'\nTrying model: {model}')
    try:
        with urllib.request.urlopen(req, timeout=120) as resp:
            data = json.loads(resp.read())
        
        # Find image part
        parts = data.get('candidates', [{}])[0].get('content', {}).get('parts', [])
        image_data = None
        for part in parts:
            if 'inlineData' in part:
                image_data = part['inlineData']['data']
                mime = part['inlineData'].get('mimeType', 'image/jpeg')
                print(f'Got image! mimeType={mime}, size={len(image_data)} chars (base64)')
                break
        
        if image_data:
            img_bytes = base64.b64decode(image_data)
            with open(output_path, 'wb') as f:
                f.write(img_bytes)
            print(f'SUCCESS! Saved to: {output_path} ({len(img_bytes):,} bytes)')
            sys.exit(0)
        else:
            # Print text parts if any
            for part in parts:
                if 'text' in part:
                    print(f'Text response: {part["text"][:200]}')
            print(f'No image in response from {model}')
            
    except urllib.error.HTTPError as e:
        body = e.read().decode('utf-8', errors='replace')
        print(f'HTTP {e.code}: {body[:300]}')
    except Exception as ex:
        print(f'Error: {ex}')

print('\nAll models exhausted. Image generation failed.')
sys.exit(1)
