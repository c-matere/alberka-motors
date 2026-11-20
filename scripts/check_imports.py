import os
import re

src_dir = r"D:\alberka-motors\src"
react_hooks = ['useState', 'useEffect', 'useMemo', 'useCallback', 'useRef', 'useContext']

for root, _, files in os.walk(src_dir):
    for f in files:
        if f.endswith('.tsx') or f.endswith('.ts'):
            path = os.path.join(root, f)
            with open(path, 'r', encoding='utf-8') as fp:
                content = fp.read()
            for hook in react_hooks:
                # check if hook is used as a function call
                if re.search(r'\b' + hook + r'\s*\(', content):
                    # check if it is imported
                    if not re.search(r'\b' + hook + r'\b', content.split('\n')[0] + ' ' + content[:500]):
                        print(f"MISSING {hook} in {path}")
print("Check completed.")
