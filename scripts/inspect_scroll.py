import os, re
from PIL import Image

# 1. Inspect khushi reference
im = Image.open(r'D:\alberka-motors\public\vehicles\khushi-reference.jpg')
print('Khushi reference size:', im.size)

# 2. Search for scroll listeners
for root, dirs, files in os.walk(r'D:\alberka-motors\src'):
    for f in files:
        if f.endswith(('.tsx', '.ts')):
            path = os.path.join(root, f)
            with open(path, 'r', encoding='utf-8') as fh:
                t = fh.read()
            if 'addEventListener' in t and 'scroll' in t:
                rel = os.path.relpath(path, r'D:\alberka-motors\src')
                print('Scroll addEventListener in:', rel)
            if 'useScroll' in t:
                rel = os.path.relpath(path, r'D:\alberka-motors\src')
                print('useScroll in:', rel)
