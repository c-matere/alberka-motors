with open(r'D:\alberka-motors\src\components\BlueprintBackground.tsx', 'r', encoding='utf-8') as f:
    code = f.read()

new_code = code.replace('#0284c7', '#dc2626')

with open(r'D:\alberka-motors\src\components\BlueprintBackground.tsx', 'w', encoding='utf-8') as f:
    f.write(new_code)

print("Replaced all #0284c7 with #dc2626 in BlueprintBackground.tsx")
