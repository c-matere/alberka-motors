"""Normalize all legacy Airbnb pink / generic reds to the Alberka crimson palette."""
from pathlib import Path

ROOT = Path(r"D:\alberka-motors\src")
REPLACEMENTS = {
    "#ff385c": "#DC2626",   # Airbnb Rausch pink -> Alberka crimson
    "#e00b41": "#B91C1C",   # hover dark -> Alberka crimson dark
    "#ef4444": "#DC2626",   # tailwind red-500 -> crimson
    "#fff1f3": "#FEF2F2",   # tailwind red-50 tint
    "#ffccd5": "#FECACA",   # tailwind red-200 border
    "text-red-400": "text-red-600",
}

changed = []
for path in ROOT.rglob("*"):
    if path.suffix.lower() not in {".tsx", ".ts", ".css"}:
        continue
    text = path.read_text(encoding="utf-8", errors="ignore")
    new = text
    for old, repl in REPLACEMENTS.items():
        new = new.replace(old, repl)
    if new != text:
        path.write_text(new, encoding="utf-8")
        changed.append(str(path.relative_to(ROOT)))

print(f"Normalized {len(changed)} files:")
for name in changed:
    print(" -", name)
