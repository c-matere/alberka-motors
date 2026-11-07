import React, { useState, useEffect } from 'react';
import { VEHICLES, Vehicle } from './data/vehicles';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { VehicleCard } from './components/VehicleCard';
import { ShowroomSlider } from './components/ShowroomSlider';
import { VehicleStoryView } from './components/VehicleStoryView';
import { InventorySection } from './components/InventorySection';
import { WorkshopSection } from './components/WorkshopSection';
import { TradeInSection } from './components/TradeInSection';
import { AboutSection } from './components/AboutSection';
import { LocationsSection } from './components/LocationsSection';
import { SitemapSection } from './components/SitemapSection';
import { SearchModal } from './components/SearchModal';
import { FavoritesModal } from './components/FavoritesModal';
import { WhispersDrawer } from './components/WhispersDrawer';
import { MobileBottomDock } from './components/MobileBottomDock';
import { Footer } from './components/Footer';
import { ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';

export function App() {
  const [currentView, setCurrentView] = useState<string>('overview');
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [testDriveTargetVehicle, setTestDriveTargetVehicle] = useState<Vehicle | null>(null);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [favoritesModalOpen, setFavoritesModalOpen] = useState(false);
  const [whispersDrawerOpen, setWhispersDrawerOpen] = useState(false);

  // Favorites state persisted in localStorage
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('alberka_favorites');
      return saved ? JSON.parse(saved) : ['toyota-rav4-adventure', 'toyota-harrier-hybrid'];
    } catch {
      return ['toyota-rav4-adventure', 'toyota-harrier-hybrid'];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('alberka_favorites', JSON.stringify(favorites));
    } catch {}
  }, [favorites]);

  // URL Hash Sync for Browser Navigation
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash.startsWith('car-')) {
        const carId = hash.replace('car-', '');
        const found = VEHICLES.find((v) => v.id === carId);
        if (found) {
          setSelectedVehicle(found);
          window.scrollTo({ top: 0, behavior: 'smooth' });
          return;
        }
      }
      if (['overview', 'inventory', 'workshop', 'trade-in', 'about', 'locations', 'sitemap'].includes(hash)) {
        setCurrentView(hash);
        setSelectedVehicle(null);
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleNavigate = (view: string) => {
    setCurrentView(view);
    setSelectedVehicle(null);
    window.location.hash = view;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectVehicle = (vehicle: Vehicle) => {
    setSelectedVehicle(vehicle);
    window.location.hash = `car-${vehicle.id}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleToggleFavorite = (id: string) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleScheduleTestDrive = (vehicle: Vehicle) => {
    setTestDriveTargetVehicle(vehicle);
    setSelectedVehicle(null);
    setCurrentView('locations');
    window.location.hash = 'locations';
    window.scrollTo({ top: 600, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#09090b] text-[#f4f4f5]">
      
      {/* Clean Single Top Navigation Bar */}
      <Navbar
        currentView={selectedVehicle ? 'inventory' : currentView}
        onNavigate={handleNavigate}
        favoritesCount={favorites.length}
        onOpenSearch={() => setSearchModalOpen(true)}
        onOpenFavorites={() => setFavoritesModalOpen(true)}
        onOpenWhispers={() => setWhispersDrawerOpen(true)}
      />

      {/* Main View Router */}
      <main key={selectedVehicle?.id || currentView} className="flex-1 view-enter pb-20 md:pb-0">
        {selectedVehicle ? (
          <VehicleStoryView
            vehicle={selectedVehicle}
            allVehicles={VEHICLES}
            onSelectVehicle={handleSelectVehicle}
            onBackToFleet={() => handleNavigate('inventory')}
            isFavorite={favorites.includes(selectedVehicle.id)}
            onToggleFavorite={handleToggleFavorite}
            onScheduleTestDrive={handleScheduleTestDrive}
            onOpenWhispers={() => setWhispersDrawerOpen(true)}
          />
        ) : (
          <>
            {currentView === 'overview' && (
              <>
                {/* Hero Showcase */}
                <Hero
                  onExploreFleet={() => handleNavigate('inventory')}
                  onExploreWorkshop={() => handleNavigate('workshop')}
                />

                {/* In-Stock Fleet Runway (Direct Access from Hero) */}
                <section className="w-full bg-[#09090b] py-14 sm:py-20 px-4 sm:px-8 border-b border-[#27272a]">
                  <div className="max-w-[1440px] mx-auto space-y-8">
                    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-2 border-b border-zinc-800/80">
                      <div className="space-y-1.5">
                        <div className="inline-flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-red-600" />
                          <span className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-zinc-400 font-medium">
                            MOMBASA DUTY-PAID & READY FOR DELIVERY
                          </span>
                        </div>
                        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight">
                          Verified Cars in Stock
                        </h2>
                        <p className="text-xs sm:text-sm text-zinc-400 max-w-2xl leading-relaxed">
                          Personally inspected at Japanese auctions, serviced with fresh Castrol fluids at our Mombasa workshop, and covered by a 5,000 km written warranty.
                        </p>
                      </div>

                      <button
                        onClick={() => handleNavigate('inventory')}
                        className="btn-ghost !text-xs !py-2.5 !px-4 self-start sm:self-auto inline-flex items-center gap-1.5 shrink-0"
                      >
                        <span>View All Cars ({VEHICLES.length})</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Compact 4-Card Responsive Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
                      {VEHICLES.map((vehicle) => (
                        <VehicleCard
                          key={vehicle.id}
                          vehicle={vehicle}
                          isFavorite={favorites.includes(vehicle.id)}
                          onToggleFavorite={handleToggleFavorite}
                          onSelect={handleSelectVehicle}
                        />
                      ))}
                    </div>
                  </div>
                </section>

                {/* Architectural 3-Pillar Proof Dossier */}
                <section className="w-full bg-[#0c0c0f] py-16 sm:py-24 px-4 sm:px-8 border-b border-[#27272a]">
                  <div className="max-w-[1440px] mx-auto space-y-12">
                    <div className="text-center max-w-[760px] mx-auto space-y-2">
                      <div className="inline-flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-600" />
                        <span className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-zinc-400 font-medium">
                          THE ALBERKA MOTORS STANDARD
                        </span>
                      </div>
                      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight">
                        Clean Japanese Cars. Honest Mileage. No Surprises.
                      </h2>
                      <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                        We eliminate the uncertainty of buying an imported car in Kenya with end-to-end dealer accountability.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 sm:gap-6">
                      {/* Pillar 01 */}
                      <div className="relative bg-[#0e0e11] hover:bg-[#121216] border border-zinc-800/90 hover:border-zinc-500/80 rounded-2xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 hover:shadow-[0_20px_40px_rgba(0,0,0,0.8)] before:absolute before:inset-x-6 before:top-0 before:h-[1px] before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent">
                        <div className="space-y-4">
                          <div className="flex items-center justify-between font-mono text-[10.5px]">
                            <span className="text-zinc-400 uppercase tracking-wider font-semibold">
                              AUCTION VERIFICATION // 01
                            </span>
                            <span className="bg-zinc-900 border border-zinc-800 text-zinc-300 px-2 py-0.5 rounded">
                              USS Tokyo & TAA
                            </span>
                          </div>
                          <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight leading-snug">
                            Bought directly in Japan. Never from middlemen.
                          </h3>
                          <p className="text-xs sm:text-[13px] text-zinc-400 leading-relaxed">
                            We personally bid on every car at premier Japanese auction houses. We check genuine auction grading sheets, verify export certificates, and guarantee authentic JEVIC odometers before shipping to Mombasa.
                          </p>
                          <div className="pt-2 border-t border-zinc-800/80 grid grid-cols-3 gap-2 text-left font-mono">
                            <div>
                              <span className="text-[9px] text-zinc-400 uppercase block">Standard</span>
                              <span className="text-xs font-bold text-white">Grade 4.5+</span>
                            </div>
                            <div className="border-l border-zinc-800/80 pl-2">
                              <span className="text-[9px] text-zinc-400 uppercase block">Odometer</span>
                              <span className="text-xs font-bold text-white">JEVIC Verified</span>
                            </div>
                            <div className="border-l border-zinc-800/80 pl-2">
                              <span className="text-[9px] text-zinc-400 uppercase block">Sheet</span>
                              <span className="text-xs font-bold text-white">Original Copy</span>
                            </div>
                          </div>
                        </div>
                        <div className="pt-5 mt-4 border-t border-zinc-800/60">
                          <button
                            onClick={() => handleNavigate('about')}
                            className="text-xs font-semibold text-zinc-300 hover:text-white inline-flex items-center gap-1.5 transition-colors cursor-pointer"
                          >
                            <span>How We Source in Japan</span>
                            <ArrowRight className="w-3.5 h-3.5 text-zinc-400" />
                          </button>
                        </div>
                      </div>

                      {/* Pillar 02 */}
                      <div className="relative bg-[#0e0e11] hover:bg-[#121216] border border-zinc-800/90 hover:border-zinc-500/80 rounded-2xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 hover:shadow-[0_20px_40px_rgba(0,0,0,0.8)] before:absolute before:inset-x-6 before:top-0 before:h-[1px] before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent">
                        <div className="space-y-4">
                          <div className="flex items-center justify-between font-mono text-[10.5px]">
                            <span className="text-zinc-400 uppercase tracking-wider font-semibold">
                              MOMBASA WORKSHOP // 02
                            </span>
                            <span className="bg-zinc-900 border border-zinc-800 text-zinc-300 px-2 py-0.5 rounded">
                              Tangana Road
                            </span>
                          </div>
                          <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight leading-snug">
                            Full pre-delivery service before handover.
                          </h3>
                          <p className="text-xs sm:text-[13px] text-zinc-400 leading-relaxed">
                            Every car goes straight to our dedicated Mombasa workshop. Our mechanics install fresh Castrol synthetic engine oil, replace oil and air filters, overhaul brakes, check suspension, and run computer diagnostics.
                          </p>
                          <div className="pt-2 border-t border-zinc-800/80 grid grid-cols-3 gap-2 text-left font-mono">
                            <div>
                              <span className="text-[9px] text-zinc-400 uppercase block">Engine Oil</span>
                              <span className="text-xs font-bold text-white">Castrol Synthetic</span>
                            </div>
                            <div className="border-l border-zinc-800/80 pl-2">
                              <span className="text-[9px] text-zinc-400 uppercase block">Filters</span>
                              <span className="text-xs font-bold text-white">Fresh OEM</span>
                            </div>
                            <div className="border-l border-zinc-800/80 pl-2">
                              <span className="text-[9px] text-zinc-400 uppercase block">Scan</span>
                              <span className="text-xs font-bold text-white">Computer OBD</span>
                            </div>
                          </div>
                        </div>
                        <div className="pt-5 mt-4 border-t border-zinc-800/60">
                          <button
                            onClick={() => handleNavigate('workshop')}
                            className="text-xs font-semibold text-zinc-300 hover:text-white inline-flex items-center gap-1.5 transition-colors cursor-pointer"
                          >
                            <span>Our 100-Point Workshop Checklist</span>
                            <ArrowRight className="w-3.5 h-3.5 text-zinc-400" />
                          </button>
                        </div>
                      </div>

                      {/* Pillar 03 */}
                      <div className="relative bg-[#0e0e11] hover:bg-[#121216] border border-zinc-800/90 hover:border-zinc-500/80 rounded-2xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 hover:shadow-[0_20px_40px_rgba(0,0,0,0.8)] before:absolute before:inset-x-6 before:top-0 before:h-[1px] before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent">
                        <div className="space-y-4">
                          <div className="flex items-center justify-between font-mono text-[10.5px]">
                            <span className="text-zinc-400 uppercase tracking-wider font-semibold">
                              DEALER ACCOUNTABILITY // 03
                            </span>
                            <span className="bg-emerald-950/60 border border-emerald-800 text-emerald-400 px-2 py-0.5 rounded font-bold">
                              5,000 KM Written
                            </span>
                          </div>
                          <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight leading-snug">
                            Written warranty covering engine & gearbox.
                          </h3>
                          <p className="text-xs sm:text-[13px] text-zinc-400 leading-relaxed">
                            You receive an official written warranty certificate upon collection. If any mechanical fault develops in the engine or transmission, our Mombasa technical team handles it directly with zero hassle.
                          </p>
                          <div className="pt-2 border-t border-zinc-800/80 grid grid-cols-3 gap-2 text-left font-mono">
                            <div>
                              <span className="text-[9px] text-zinc-400 uppercase block">Coverage</span>
                              <span className="text-xs font-bold text-emerald-400">5,000 KM</span>
                            </div>
                            <div className="border-l border-zinc-800/80 pl-2">
                              <span className="text-[9px] text-zinc-400 uppercase block">Components</span>
                              <span className="text-xs font-bold text-white">Engine & Gearbox</span>
                            </div>
                            <div className="border-l border-zinc-800/80 pl-2">
                              <span className="text-[9px] text-zinc-400 uppercase block">Support</span>
                              <span className="text-xs font-bold text-white">Direct Dealer</span>
                            </div>
                          </div>
                        </div>
                        <div className="pt-5 mt-4 border-t border-zinc-800/60">
                          <button
                            onClick={() => handleNavigate('workshop')}
                            className="text-xs font-semibold text-zinc-300 hover:text-white inline-flex items-center gap-1.5 transition-colors cursor-pointer"
                          >
                            <span>View Warranty Certificate Details</span>
                            <ArrowRight className="w-3.5 h-3.5 text-zinc-400" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Featured Cars Runway Carousel */}
                <section className="w-full bg-[#09090b] py-20 px-6 sm:px-10 overflow-hidden border-b border-[#27272a]">
                  <div className="max-w-[1400px] mx-auto">
                    <ShowroomSlider
                      vehicles={VEHICLES}
                      favorites={favorites}
                      onToggleFavorite={handleToggleFavorite}
                      onSelectVehicle={handleSelectVehicle}
                      onViewAll={() => handleNavigate('inventory')}
                    />
                  </div>
                </section>

                {/* Showrooms Overview (Mombasa & Nairobi) */}
                <section className="w-full bg-[#121215] py-20 px-4 sm:px-8">
                  <div className="max-w-[1440px] mx-auto space-y-12">
                    <div className="text-center max-w-[700px] mx-auto space-y-2">
                      <div className="inline-flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-600" />
                        <span className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-zinc-400 font-medium">
                          SHOWROOM LOCATIONS
                        </span>
                      </div>
                      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight">
                        Visit Us in Mombasa or Nairobi
                      </h2>
                      <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                        Drop by to test drive any car in stock, get an instant trade-in valuation, or chat with our team.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                      {/* Mombasa Card */}
                      <div className="relative bg-[#0e0e11] hover:bg-[#121216] p-7 sm:p-9 border border-zinc-800/90 hover:border-zinc-500/80 rounded-2xl flex flex-col justify-between space-y-6 transition-all duration-300 hover:shadow-[0_20px_40px_rgba(0,0,0,0.8)] before:absolute before:inset-x-6 before:top-0 before:h-[1px] before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent">
                        <div className="space-y-4">
                          <div className="inline-flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-red-600" />
                            <span className="font-mono text-[11px] text-zinc-400 uppercase tracking-wider block font-semibold">
                              MAIN SHOWROOM & WORKSHOP // MOMBASA
                            </span>
                          </div>
                          <h3 className="text-xl sm:text-2xl font-bold text-white">Mombasa Flagship</h3>
                          <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                            Tangana Road (Opposite AutoXpress / Near Railway Station), Majengo & Nyali Road.
                          </p>
                          <div className="text-xs text-zinc-300 pt-2 space-y-1 font-mono border-t border-zinc-800/80">
                            <p className="text-zinc-400">Phone: <span className="text-white">0714 333 888 / 0737 333 888</span></p>
                            <p className="text-zinc-400">Email: <span className="text-white">sales@alberkamotors.co.ke</span></p>
                          </div>
                        </div>
                        <div className="pt-2">
                          <button
                            onClick={() => handleNavigate('locations')}
                            className="btn-ghost !text-xs !py-2.5 !px-4 w-full sm:w-auto cursor-pointer"
                          >
                            <span>Mombasa Details & Map</span>
                            <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                          </button>
                        </div>
                      </div>

                      {/* Nairobi Card */}
                      <div className="relative bg-[#0e0e11] hover:bg-[#121216] p-7 sm:p-9 border border-zinc-800/90 hover:border-zinc-500/80 rounded-2xl flex flex-col justify-between space-y-6 transition-all duration-300 hover:shadow-[0_20px_40px_rgba(0,0,0,0.8)] before:absolute before:inset-x-6 before:top-0 before:h-[1px] before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent">
                        <div className="space-y-4">
                          <div className="inline-flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-red-600" />
                            <span className="font-mono text-[11px] text-zinc-400 uppercase tracking-wider block font-semibold">
                              NAIROBI SHOWROOM // WESTLANDS
                            </span>
                          </div>
                          <h3 className="text-xl sm:text-2xl font-bold text-white">Nairobi Westlands Hub</h3>
                          <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                            Mwanzi Road, Westlands, Nairobi. Easy access for city viewings and trade-in appraisals.
                          </p>
                          <div className="text-xs text-zinc-300 pt-2 space-y-1 font-mono border-t border-zinc-800/80">
                            <p className="text-zinc-400">Phone: <span className="text-white">0748 999 333</span></p>
                            <p className="text-zinc-400">Email: <span className="text-white">nairobi@alberkamotors.co.ke</span></p>
                          </div>
                        </div>
                        <div className="pt-2">
                          <button
                            onClick={() => handleNavigate('locations')}
                            className="btn-ghost !text-xs !py-2.5 !px-4 w-full sm:w-auto cursor-pointer"
                          >
                            <span>Nairobi Details & Map</span>
                            <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              </>
            )}

            {currentView === 'inventory' && (
              <InventorySection
                vehicles={VEHICLES}
                favorites={favorites}
                onToggleFavorite={handleToggleFavorite}
                onSelectVehicle={handleSelectVehicle}
                onCustomImportRequest={() => handleNavigate('about')}
              />
            )}

            {currentView === 'workshop' && <WorkshopSection />}

            {currentView === 'trade-in' && (
              <TradeInSection
                vehicles={VEHICLES}
                onSelectVehicle={handleSelectVehicle}
              />
            )}

            {currentView === 'about' && (
              <AboutSection
                onExploreFleet={() => handleNavigate('inventory')}
                onExploreLocations={() => handleNavigate('locations')}
              />
            )}

            {currentView === 'locations' && (
              <LocationsSection
                vehicles={VEHICLES}
                preselectedVehicle={testDriveTargetVehicle}
              />
            )}

            {currentView === 'sitemap' && (
              <SitemapSection
                vehicles={VEHICLES}
                onNavigate={handleNavigate}
                onSelectVehicle={handleSelectVehicle}
              />
            )}
          </>
        )}
      </main>

      {/* Mobile Bottom Dock */}
      <MobileBottomDock
        currentView={currentView}
        selectedVehicle={selectedVehicle}
        onNavigate={handleNavigate}
        onBackToInventory={() => handleNavigate('inventory')}
        favoritesCount={favorites.length}
        onOpenFavorites={() => setFavoritesModalOpen(true)}
        onOpenWhispers={() => setWhispersDrawerOpen(true)}
      />

      {/* Footer */}
      <Footer
        vehicles={VEHICLES}
        onNavigate={handleNavigate}
        onSelectVehicle={handleSelectVehicle}
      />

      {/* Search Palette */}
      <SearchModal
        isOpen={searchModalOpen}
        onClose={() => setSearchModalOpen(false)}
        vehicles={VEHICLES}
        onSelectVehicle={handleSelectVehicle}
      />

      {/* Favorites Modal */}
      <FavoritesModal
        isOpen={favoritesModalOpen}
        onClose={() => setFavoritesModalOpen(false)}
        favorites={favorites}
        vehicles={VEHICLES}
        onToggleFavorite={handleToggleFavorite}
        onSelectVehicle={handleSelectVehicle}
      />

      {/* WhatsApp / Concierge Contact Drawer */}
      <WhispersDrawer
        isOpen={whispersDrawerOpen}
        onClose={() => setWhispersDrawerOpen(false)}
        vehicles={VEHICLES}
        onSelectVehicle={handleSelectVehicle}
      />

    </div>
  );
}

export default App;

