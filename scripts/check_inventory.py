import re

with open(r'D:\alberka-motors\src\data\vehicles.ts', 'r', encoding='utf-8') as f:
    content = f.read()

ids = re.findall(r"id:\s*['\"]([^'\"]+)['\"]", content)
print("Vehicle IDs found in vehicles.ts:")
for i in ids:
    print(" -", i)

# Check for Prado 120 or ax2877
if 'ax2877' in content or 'prado-ax2877' in content:
    print("WARNING: Prado ax2877 still present!")
else:
    print("VERIFIED: Prado ax2877 completely excised.")
