import os, urllib.request, json

# Read OpenAI API key
key = None
with open(r'C:\Users\ADMIN\.env', 'r', encoding='utf-8') as f:
    for line in f:
        if line.startswith('OPENAI_API_KEY='):
            key = line.strip().split('=', 1)[1].strip('"').strip("'")
            break

if not key:
    print('No OpenAI key found!')
    exit(1)

prompt = (
    "A stunning wide-angle commercial automotive studio photograph. "
    "In the center of the frame is a sleek modern Volvo XC40 compact luxury SUV in onyx black, "
    "facing forward-three-quarter towards the camera with sharp LED daytime running lights illuminated. "
    "The car is parked on an ultra-glossy reflective dark grey epoxy studio showroom floor, showing crisp mirror reflections of the vehicle. "
    "Directly on the clean architectural matte grey studio wall behind the car, mounted prominently at eye level, "
    "is a large, bold, polished metallic 3D dimensional emblem and lettering reading 'ALBERKA ENTERPRISES' with distinct physical depth, beveling, and subtle soft drop shadows. "
    "Professional automotive studio ceiling floodlights and softbox lighting illuminate the vehicle's curves and contours. "
    "Clean, prestigious, photorealistic, luxury automotive showroom aesthetic exactly like high-end dealership vehicle photography."
)

headers = {
    'Content-Type': 'application/json',
    'Authorization': f'Bearer {key}'
}

payload = {
    'model': 'dall-e-3',
    'prompt': prompt,
    'size': '1792x1024',
    'quality': 'hd',
    'n': 1
}

print('Calling DALL-E 3...')
req = urllib.request.Request(
    'https://api.openai.com/v1/images/generations',
    data=json.dumps(payload).encode('utf-8'),
    headers=headers
)

try:
    with urllib.request.urlopen(req) as resp:
        result = json.loads(resp.read().decode('utf-8'))
        img_url = result['data'][0]['url']
        print('Image generated! URL:', img_url[:80])
        urllib.request.urlretrieve(img_url, r'D:\alberka-motors\public\vehicles\volvo-showroom-hero.jpg')
        print('Saved to public/vehicles/volvo-showroom-hero.jpg successfully!')
except Exception as e:
    print('Error:', e)
