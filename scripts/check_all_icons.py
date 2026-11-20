import glob
import re

lucide_icons = [
    'Calendar', 'Gauge', 'Cpu', 'Sliders', 'Compass', 'Fuel', 'Palette', 'MapPin',
    'Heart', 'ArrowRight', 'ShieldCheck', 'FileText', 'Camera', 'CheckCircle2', 'Sparkles',
    'MessageCircle', 'Phone', 'Mail', 'Clock', 'ChevronLeft', 'ChevronRight', 'ChevronDown',
    'Play', 'Pause', 'Volume2', 'VolumeX', 'Maximize2', 'X', 'Search', 'Filter', 'Award',
    'Globe', 'DollarSign', 'Ship', 'FileCheck2', 'SlidersHorizontal', 'Navigation', 'Bookmark'
]

for filepath in glob.glob('D:/alberka-motors/src/**/*.tsx', recursive=True):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Find all imported symbols
    imported_symbols = set()
    imports = re.findall(r'import\s+\{([^}]+)\}\s+from', content)
    for imp in imports:
        for s in imp.split(','):
            # handle 'Foo as Bar'
            parts = s.strip().split(' as ')
            imported_symbols.add(parts[-1].strip())
            
    other_imports = re.findall(r'import\s+([A-Za-z0-9_]+)\s+from', content)
    for imp in other_imports:
        imported_symbols.add(imp.strip())
        
    # Find JSX usages
    jsx_tags = set(re.findall(r'<([A-Z][a-zA-Z0-9]+)', content))
    
    for tag in jsx_tags:
        if tag in lucide_icons and tag not in imported_symbols:
            print(f"Missing icon import '{tag}' in: {filepath}")
