import urllib.request

images = [
  "/vehicles/toyota-harrier-gr-sport-2019/cockpit-panorama.jpg",
  "/vehicles/toyota-harrier-gr-sport-2019/dashboard-center.jpg",
  "/vehicles/toyota-harrier-gr-sport-2019/driver-cockpit.jpg",
  "/vehicles/toyota-harrier-gr-sport-2019/front-angle.jpg",
  "/vehicles/toyota-harrier-gr-sport-2019/front-direct.jpg",
  "/vehicles/toyota-harrier-gr-sport-2019/front-stance.jpg",
  "/vehicles/toyota-harrier-gr-sport-2019/hero-front-34.jpg",
  "/vehicles/toyota-harrier-gr-sport-2019/open-cargo-boot.jpg",
  "/vehicles/toyota-harrier-gr-sport-2019/rear-centered.jpg",
  "/vehicles/toyota-harrier-gr-sport-2019/rear-direct.jpg",
  "/vehicles/toyota-harrier-gr-sport-2019/rear-leather-seats.jpg",
  "/vehicles/toyota-harrier-gr-sport-2019/rear-profile.jpg",
  "/vehicles/toyota-harrier-gr-sport-2019/rear-stance.jpg",
  "/vehicles/toyota-harrier-gr-sport-2019/steering-controls.jpg",
  "/vehicles/toyota-harrier-gr-sport-2019/wheel-gr-alloy.jpg"
]

for img in images:
    url = f"https://alberka.co.ke{img}"
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    try:
        res = urllib.request.urlopen(req)
        print(f"200 OK: {img} ({res.headers.get('Content-Length')} bytes, type {res.headers.get('Content-Type')})")
    except Exception as e:
        print(f"FAILED: {img} -> {e}")
