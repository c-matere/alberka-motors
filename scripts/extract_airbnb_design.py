import json

transcript_path = r"C:\Users\ADMIN\.gemini\antigravity-cli\brain\8ae78a52-0d1f-484a-b9ae-b4fc3fd2296b\.system_generated\logs\transcript_full.jsonl"

with open(transcript_path, 'r', encoding='utf-8') as f:
    for i, line in enumerate(f):
        if "Airbnb — Style Reference" in line:
            data = json.loads(line)
            # Find the text in content
            content = data.get("content", "")
            with open("D:/alberka-motors/AIRBNB_DESIGN.md", "w", encoding="utf-8") as out:
                out.write(content)
            print(f"Found on line {i}, wrote to D:/alberka-motors/AIRBNB_DESIGN.md (length: {len(content)})")
            break
