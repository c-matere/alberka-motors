with open(r'D:\alberka-motors\src\components\VehicleStoryView.tsx', 'r', encoding='utf-8') as f:
    lines = f.readlines()

for i, line in enumerate(lines):
    # Check for flex items without wrap or min-w-0 that might overflow
    if 'flex ' in line and 'justify-between' in line and 'flex-wrap' not in line:
        print(f"Line {i+1}: {line.strip()[:100]}")
