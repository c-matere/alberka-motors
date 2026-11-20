import urllib.request, json

gemini_key = None
with open(r'C:\Users\ADMIN\.env', 'r', encoding='utf-8') as f:
    for line in f:
        if line.startswith('GEMINI_API_KEY='):
            gemini_key = line.strip().split('=', 1)[1].strip('"').strip("'")
            break

url = f"https://generativelanguage.googleapis.com/v1beta/models/imagen-3.0-generate-002:predict?key={gemini_key}"

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

payload = {
    "instances": [
        {"prompt": prompt}
    ],
    "parameters": {
        "sampleCount": 1,
        "aspectRatio": "16:9",
        "outputOptions": {
            "mimeType": "image/jpeg"
        }
    }
}

req = urllib.request.Request(
    url,
    data=json.dumps(payload).encode('utf-8'),
    headers={"Content-Type": "application/json"}
)

try:
    print("Calling Imagen 3...")
    with urllib.request.urlopen(req) as resp:
        res = json.loads(resp.read().decode('utf-8'))
        import base64
        b64 = res['predictions'][0]['bytesBase64Encoded']
        img_data = base64.b64decode(b64)
        out_path = r'D:\alberka-motors\public\vehicles\volvo-showroom-hero.jpg'
        with open(out_path, 'wb') as f:
            f.write(img_data)
        print("Successfully generated and saved Imagen 3 image! Size:", len(img_data))
except Exception as e:
    print("Imagen 3 error:", e)
    if hasattr(e, 'read'):
        print(e.read().decode('utf-8'))
