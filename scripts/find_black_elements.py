import os
import re

src_dir = r"D:\alberka-motors\src"
targets = ['bg-zinc-950', 'bg-zinc-900', 'bg-black', 'bg-zinc-850', 'bg-zinc-800']

findings = []

for root, _, files in os.walk(src_dir):
    for f in files:
        if f.endswith('.tsx') or f.endswith('.ts'):
            path = os.path.join(root, f)
            with open(path, 'r', encoding='utf-8') as fp:
                lines = fp.readlines()
            for i, line in enumerate(lines):
                for t in targets:
                    if t in line:
                        # Exclude text color or dark mode background if any, but report all classes with buttons/pills/badges
                        findings.append((path, i + 1, line.strip()))

for path, line_no, content in findings:
    rel = os.path.relpath(path, src_dir)
    print(f"{rel}:{line_no} -> {content[:100]}")
