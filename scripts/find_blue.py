import os, re

color_keywords = ['blue', 'indigo', 'sky', 'cyan', '#2563eb', '#3b82f6', '#1d4ed8', '#0284c7', '#0ea5e9']

for root, dirs, files in os.walk(r'D:\alberka-motors\src'):
    for file in files:
        if file.endswith(('.tsx', '.ts', '.css')):
            path = os.path.join(root, file)
            with open(path, 'r', encoding='utf-8') as f:
                for idx, line in enumerate(f, 1):
                    for kw in color_keywords:
                        if kw in line.lower():
                            rel = os.path.relpath(path, r'D:\alberka-motors')
                            print(f"{rel}:{idx}: {line.strip()[:100]}")
                            break
