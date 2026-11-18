#!/usr/bin/env python3
"""
scripts/deploy_site.py
Builds the project, uploads dist to 169.58.169.64, reloads nginx, and purges Cloudflare edge cache.
"""
import os
import sys
import subprocess
import tarfile
import tempfile
import json
import urllib.request

ROOT_DIR = r"D:\alberka-motors"
DIST_DIR = os.path.join(ROOT_DIR, "dist")
VPS_HOST = "169.58.169.64"
VPS_USER = "root"
VPS_KEY_PATH = r"C:\Users\ADMIN\.ssh\smart_team.pem"
REMOTE_DIST_PATH = "/home/ec2-user/alberka-motors/dist"
CF_ZONE_ID = "35b136dc268c7a8ad91b149b8c325e8c"

def get_cloudflare_token():
    env_path = r"C:\Users\ADMIN\.env"
    if os.path.exists(env_path):
        with open(env_path, "r", encoding="utf-8") as f:
            for line in f:
                if line.startswith("CLOUDFLARE_API_TOKEN=") or line.startswith("CLOUDFLARE_PURGE_API_TOKEN="):
                    return line.strip().split("=", 1)[1].strip('"').strip("'")
    return None

def build():
    print("[*] Running npm run build...")
    res = subprocess.run(["npm.cmd", "run", "build"], cwd=ROOT_DIR, capture_output=True, text=True)
    if res.returncode != 0:
        print("[!] Build failed:")
        print(res.stderr or res.stdout)
        sys.exit(1)
    print("[✓] Build succeeded cleanly!")

def deploy():
    print(f"[*] Creating archive from {DIST_DIR}...")
    temp_tar = os.path.join(tempfile.gettempdir(), "alberka_dist.tar.gz")
    with tarfile.open(temp_tar, "w:gz") as tar:
        tar.add(DIST_DIR, arcname=".")

    remote_tar = "/tmp/alberka_dist.tar.gz"
    print(f"[*] Uploading {temp_tar} to {VPS_HOST}:{remote_tar} via scp...")
    scp_cmd = [
        "scp.exe",
        "-i", VPS_KEY_PATH,
        "-o", "StrictHostKeyChecking=no",
        temp_tar,
        f"{VPS_USER}@{VPS_HOST}:{remote_tar}"
    ]
    res = subprocess.run(scp_cmd, capture_output=True, text=True)
    if res.returncode != 0:
        print(f"[!] scp failed: {res.stderr}")
        sys.exit(1)

    print("[*] Extracting dist and reloading nginx on VPS...")
    remote_commands = (
        f"rm -rf {REMOTE_DIST_PATH} && mkdir -p {REMOTE_DIST_PATH} && "
        f"tar -xzf {remote_tar} -C {REMOTE_DIST_PATH} && rm -f {remote_tar} && "
        f"chown -R ec2-user:ec2-user {REMOTE_DIST_PATH} && "
        f"chmod -R 755 {REMOTE_DIST_PATH} && nginx -s reload"
    )
    ssh_cmd = [
        "ssh.exe",
        "-i", VPS_KEY_PATH,
        "-o", "StrictHostKeyChecking=no",
        f"{VPS_USER}@{VPS_HOST}",
        remote_commands
    ]
    res = subprocess.run(ssh_cmd, capture_output=True, text=True)
    if res.returncode != 0:
        print(f"[!] ssh remote command failed: {res.stderr}")
        sys.exit(1)
    print(f"[✓] Deployment to {VPS_HOST} completed successfully!")

    if os.path.exists(temp_tar):
        os.remove(temp_tar)

def purge_cf():
    token = get_cloudflare_token()
    if not token:
        print("[!] Cloudflare token not found; skipping purge.")
        return
    print(f"[*] Purging Cloudflare edge cache for zone {CF_ZONE_ID} (alberka.co.ke)...")
    url = f"https://api.cloudflare.com/client/v4/zones/{CF_ZONE_ID}/purge_cache"
    data = json.dumps({"purge_everything": True}).encode("utf-8")
    req = urllib.request.Request(
        url,
        data=data,
        headers={"Authorization": f"Bearer {token}", "Content-Type": "application/json"},
        method="POST"
    )
    try:
        with urllib.request.urlopen(req) as resp:
            res_json = json.loads(resp.read().decode("utf-8"))
            if res_json.get("success"):
                print("[✓] Cloudflare cache purged successfully for alberka.co.ke!")
            else:
                print(f"[!] Cloudflare purge response: {res_json}")
    except Exception as e:
        print(f"[!] Cloudflare purge failed: {e}")

if __name__ == "__main__":
    build()
    deploy()
    purge_cf()
    print("\n[✓] FULL DEPLOYMENT PIPELINE COMPLETE!")
