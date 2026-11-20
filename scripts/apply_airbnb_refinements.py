import os

# 1. Update VehicleStoryView.tsx
v_path = r"D:\alberka-motors\src\components\VehicleStoryView.tsx"
with open(v_path, "r", encoding="utf-8") as f:
    v_lines = f.readlines()

start_idx = None
end_idx = None

for i, line in enumerate(v_lines):
    if "{/* 3. CLOSER LOOK: 4-POINT INSPECTION HIGHLIGHTS" in line:
        start_idx = i
    if "{/* Showroom Physical Location & Google Maps Embed */}" in line:
        end_idx = i
        break

print(f"Removing lines {start_idx+1} to {end_idx} in VehicleStoryView.tsx")
assert start_idx is not None and end_idx is not None

# The new Showroom Location & Similar Vehicles replacement matching Airbnb styling
new_middle = """      {/* Showroom Physical Location & Google Maps Embed ("Where you'll be") */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 border-t border-[#ebebeb] bg-[#f7f7f7] text-[#222222]">
        <div className="max-w-[1280px] mx-auto space-y-6 text-left">
          <div className="space-y-1">
            <span className="text-[11px] uppercase tracking-wider text-[#6a6a6a] font-medium block">
              PHYSICAL SHOWROOM & INSPECTION BAY
            </span>
            <h2 className="text-xl sm:text-2xl font-semibold text-[#222222] tracking-tight">
              Where you'll view & test drive
            </h2>
            <p className="text-xs sm:text-sm text-[#6a6a6a] max-w-2xl">
              This {vehicle.year} {vehicle.name} is stationed at our flagship showroom next to Ganjoni Primary School, Mombasa. Put it on our workshop hoist, inspect its Japanese export dossier, or take it on an extended test drive.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            {/* Showroom Details Column */}
            <div className="lg:col-span-5 bg-white border border-[#ebebeb] rounded-[16px] p-5 sm:p-6 flex flex-col justify-between space-y-5 shadow-xs">
              <div className="space-y-3.5">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#f7f7f7] border border-[#ebebeb] text-[#ff385c] flex items-center justify-center shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4 text-[#ff385c]" />
                  </div>
                  <div>
                    <span className="text-[10.5px] uppercase tracking-wider text-[#6a6a6a] font-medium block">SHOWROOM LOCATION</span>
                    <h3 className="text-base font-semibold text-[#222222] leading-snug">
                      Next to Ganjoni Primary School
                    </h3>
                    <p className="text-xs text-[#6a6a6a] mt-0.5">
                      Archbishop Makarios Rd, Mombasa, Kenya · Dedicated customer parking & handover bay on site
                    </p>
                  </div>
                </div>

                <div className="border-t border-[#ebebeb] pt-3 space-y-2.5 text-xs">
                  <div className="flex items-center gap-2 text-[#222222] font-medium">
                    <Clock className="w-3.5 h-3.5 text-[#6a6a6a] shrink-0" />
                    <span>Mon – Sat: 8:00 AM – 6:00 PM (Sundays by appointment)</span>
                  </div>
                  <div className="flex items-center gap-2 text-[#222222] font-medium">
                    <Phone className="w-3.5 h-3.5 text-[#6a6a6a] shrink-0" />
                    <span>Direct Helpline: 0180 423 075 (WhatsApp & Calls)</span>
                  </div>
                  <div className="flex items-center gap-2 text-[#222222] font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#ff385c] shrink-0" />
                    <span>In-house 100-point inspection hoist available for viewing</span>
                  </div>
                </div>
              </div>

              <div className="pt-1 space-y-2">
                <a
                  href="https://maps.app.goo.gl/ALv491SA67CFww1f7"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-[#222222] hover:bg-[#000000] text-white font-medium py-2.5 px-4 rounded-xl text-xs inline-flex items-center justify-center gap-2 shadow-xs transition-all cursor-pointer"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Get Google Maps Directions</span>
                </a>
                <a
                  href={`https://wa.me/254180423075?text=Hello%20Alberka%20Enterprises,%20I%20would%20like%20to%20view%20the%20${encodeURIComponent(vehicle.year + ' ' + vehicle.name)}%20(Stock%20ID:%20${encodeURIComponent(vehicle.sbtStockId || vehicle.stockNo)})%20at%20your%20showroom%20next%20to%20Ganjoni%20Primary%20School,%20Mombasa.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-white hover:bg-[#f7f7f7] border border-[#ebebeb] text-[#222222] font-medium py-2.5 px-4 rounded-xl text-xs inline-flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <MessageCircle className="w-3.5 h-3.5 fill-[#25D366] text-[#25D366]" />
                  <span>Book Viewing on WhatsApp</span>
                </a>
              </div>
            </div>

            {/* Interactive Google Maps Frame */}
            <div className="lg:col-span-7 bg-white border border-[#ebebeb] rounded-[16px] overflow-hidden shadow-xs min-h-[260px] sm:min-h-[290px] relative">
              <iframe
                src="https://maps.google.com/maps?q=-4.064257,39.663731+(Alberka+Enterprises+Limited)&t=k&z=19&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: '260px' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
                title="Alberka Enterprises Limited Showroom Location"
                className="w-full h-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Similar Vehicles in Stock — 4-Card Responsive Grid */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 border-t border-[#ebebeb] bg-white text-[#222222]">
        <div className="max-w-[1280px] mx-auto space-y-6 text-left">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-[11px] uppercase tracking-wider text-[#6a6a6a] font-medium block mb-1">
                YOU MAY ALSO CONSIDER
              </span>
              <h2 className="text-xl sm:text-2xl font-semibold text-[#222222] tracking-tight">
                Similar vehicles in stock
              </h2>
              <p className="text-xs sm:text-sm text-[#6a6a6a] mt-1">
                Inspected Japanese units with matching category and price bracket.
              </p>
            </div>
            
            <div className="flex items-center gap-3">
              {onSelectHub && currentModelHub && (
                <button
                  onClick={() => onSelectHub(currentModelHub.id)}
                  className="bg-[#f7f7f7] hover:bg-[#ebebeb] text-[#222222] font-medium text-xs py-2 px-3.5 rounded-full border border-[#ebebeb] inline-flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <span>Explore All {currentModelHub.name} Units</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
              <button
                onClick={onBackToFleet}
                className="border border-[#222222] hover:bg-[#f7f7f7] text-[#222222] text-xs py-2 px-4 rounded-full font-medium inline-flex items-center gap-1.5 cursor-pointer transition-colors"
              >
                <span>Full Showroom</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {similarVehicles.map((simVehicle: Vehicle, idx: number) => (
              <VehicleCard
                key={simVehicle.id}
                vehicle={simVehicle}
                isFavorite={false}
                onToggleFavorite={onToggleFavorite}
                onSelect={(v) => {
                  onSelectVehicle(v);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                staggerIndex={idx}
              />
            ))}
          </div>
        </div>
      </section>
"""

# Find where Similar Vehicles ends (right before Japanese Auction Sheet Dossier Modal)
modal_idx = None
for i in range(end_idx, len(v_lines)):
    if "{/* Japanese Auction Sheet Dossier Modal */}" in v_lines[i]:
        modal_idx = i
        break

assert modal_idx is not None
print(f"Replacing lines {start_idx+1} to {modal_idx} with new sections")

final_lines = v_lines[:start_idx] + [new_middle + "\n"] + v_lines[modal_idx:]
with open(v_path, "w", encoding="utf-8") as f:
    f.writelines(final_lines)

print("[✓] VehicleStoryView.tsx updated cleanly!")

# 2. Update index.html to load Plus Jakarta Sans
html_path = r"D:\alberka-motors\index.html"
with open(html_path, "r", encoding="utf-8") as f:
    html_content = f.read()

# Replace Inter with Plus Jakarta Sans and update body class
html_content = html_content.replace(
    'family=Inter:ital,opsz,wght@0,14..32,300..800;1,14..32,300..800&family=JetBrains+Mono:wght@400;500;600;700',
    'family=Plus+Jakarta+Sans:ital,wght@0,300..800;1,300..800&family=JetBrains+Mono:wght@400;500;600;700'
)
html_content = html_content.replace(
    '<html lang="en" class="scroll-smooth bg-[#f8f9fa] text-[#18181b]">',
    '<html lang="en" class="scroll-smooth bg-[#f7f7f7] text-[#222222]">'
)
html_content = html_content.replace(
    '<body class="bg-[#f8f9fa] text-[#18181b] antialiased selection:bg-red-600 selection:text-white">',
    '<body class="bg-[#f7f7f7] text-[#222222] antialiased selection:bg-[#ff385c] selection:text-white font-sans">'
)

with open(html_path, "w", encoding="utf-8") as f:
    f.write(html_content)

print("[✓] index.html updated with Plus Jakarta Sans font!")

# 3. Update src/index.css
css_path = r"D:\alberka-motors\src\index.css"
with open(css_path, "r", encoding="utf-8") as f:
    css_content = f.read()

css_content = css_content.replace(
    "--font-sans: 'Inter', -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, sans-serif;",
    "--font-sans: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, Helvetica, Arial, sans-serif;"
)
css_content = css_content.replace(
    "--font-display: 'Inter', -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, sans-serif;",
    "--font-display: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, Helvetica, Arial, sans-serif;"
)

with open(css_path, "w", encoding="utf-8") as f:
    f.write(css_content)

print("[✓] src/index.css updated with Plus Jakarta Sans!")
