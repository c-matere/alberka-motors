import os
import hashlib

upload_dir = r"C:\Users\ADMIN\.gemini\antigravity-cli\brain\8ae78a52-0d1f-484a-b9ae-b4fc3fd2296b\.user_uploaded"
harrier_dir = r"D:\alberka-motors\public\vehicles\toyota-harrier-gr-sport-2019"

# Find all upload files matching 1795003479709 (Harrier GR Sport batch)
harrier_uploads = [f for f in os.listdir(upload_dir) if "1795003479709" in f]
print(f"Total uploaded files in batch 1795003479709: {len(harrier_uploads)}")

for u in sorted(harrier_uploads):
    u_path = os.path.join(upload_dir, u)
    u_size = os.path.getsize(u_path)
    with open(u_path, 'rb') as f:
        u_hash = hashlib.md5(f.read()).hexdigest()
    
    # Check match in public/vehicles/toyota-harrier-gr-sport-2019
    match_name = None
    for h in os.listdir(harrier_dir):
        h_path = os.path.join(harrier_dir, h)
        if os.path.getsize(h_path) == u_size:
            with open(h_path, 'rb') as f2:
                if hashlib.md5(f2.read()).hexdigest() == u_hash:
                    match_name = h
                    break
    print(f"  {u} ({u_size} bytes) -> {match_name}")
