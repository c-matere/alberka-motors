import glob
import re

for filepath in glob.glob('D:/alberka-motors/src/**/*.tsx', recursive=True):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Check if MessageCircle is in the file
    if 'MessageCircle' in content:
        # Check if MessageCircle is imported
        imports = re.findall(r'import\s+\{([^}]+)\}\s+from\s+[\'"]lucide-react[\'"]', content)
        imported_symbols = set()
        for imp in imports:
            for symbol in imp.split(','):
                imported_symbols.add(symbol.strip())
        
        # Also check other import styles
        other_imports = re.findall(r'import\s+([A-Za-z0-9_]+)\s+from', content)
        for imp in other_imports:
            imported_symbols.add(imp.strip())
            
        if 'MessageCircle' not in imported_symbols:
            print(f"MISSING MessageCircle in {filepath}")
