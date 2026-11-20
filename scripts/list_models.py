import urllib.request, json

gemini_key = None
with open(r'C:\Users\ADMIN\.env', 'r', encoding='utf-8') as f:
    for line in f:
        if line.startswith('GEMINI_API_KEY='):
            gemini_key = line.strip().split('=', 1)[1].strip('"').strip("'")
            break

url = f'https://generativelanguage.googleapis.com/v1beta/models?key={gemini_key}'
try:
    with urllib.request.urlopen(url) as resp:
        res = json.loads(resp.read().decode('utf-8'))
    for m in res.get('models', []):
        name = m.get('name', '')
        if any(w in name for w in ['image', 'imagen', 'flash', '2.5', '3']):
            print(name, m.get('supportedGenerationMethods'))
except Exception as e:
    print('Error:', e)
