import React, { useState, useEffect } from 'react';
import { VEHICLES, Vehicle } from './data/vehicles';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { VehicleCard } from './components/VehicleCard';
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
      <main key={selectedVehicle?.id || currentView} className="flex-1 view-enter pb-28 md:pb-0">
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
                <section className="w-full bg-[#09090b] py-20 sm:py-32 px-4 sm:px-8 border-b border-white/[0.07]">
                  <div className="max-w-[1240px] mx-auto space-y-12">
                    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-white/[0.07]">
                      <div>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-[-0.035em]">
                          Vehicles in Stock
                        </h2>
                      </div>

                      <button
                        onClick={() => handleNavigate('inventory')}
                        className="btn-ghost !text-xs !py-2.5 !px-4 self-start sm:self-auto inline-flex items-center gap-2 shrink-0"
                      >
                        <span>View All Vehicles ({VEHICLES.length})</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Expansive 2x2 Exhibition Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10">
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
                <section className="w-full bg-[#070709] py-20 sm:py-32 px-4 sm:px-8 border-b border-white/[0.07]">
                  <div className="max-w-[1240px] mx-auto space-y-16">
                    <div className="text-center max-w-[680px] mx-auto">
                      <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-[-0.035em]">
                        Three Principles of Provenance
                      </h2>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                      {/* Pillar 01 */}
                      <div className="relative bg-[#0c0c0f] hover:bg-[#111115] border border-white/[0.08] hover:border-white/25 rounded-2xl p-8 sm:p-10 flex flex-col justify-between transition-all duration-300 hover:shadow-[0_20px_40px_rgba(0,0,0,0.8)] before:absolute before:inset-x-8 before:top-0 before:h-[1px] before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent">
                        <div className="space-y-3">
                          <span className="font-mono text-xs text-zinc-400 uppercase tracking-widest block font-semibold">
                            01 PROVENANCE
                          </span>
                          <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight leading-snug">
                            Tokyo Auction Selection
                          </h3>
                          <p className="text-sm text-zinc-400 leading-relaxed">
                            Handpicked at USS Tokyo and CAA. Original Japanese auction sheets and verified JEVIC mileage certificates.
                          </p>
                        </div>
                        <div className="pt-6 mt-6 border-t border-white/[0.07]">
                          <button
                            onClick={() => handleNavigate('about')}
                            className="text-xs font-semibold text-zinc-300 hover:text-white inline-flex items-center gap-1.5 transition-colors cursor-pointer"
                          >
                            <span>Auction Process</span>
                            <ArrowRight className="w-3.5 h-3.5 text-zinc-400" />
                          </button>
                        </div>
                      </div>

                      {/* Pillar 02 */}
                      <div className="relative bg-[#0c0c0f] hover:bg-[#111115] border border-white/[0.08] hover:border-white/25 rounded-2xl p-8 sm:p-10 flex flex-col justify-between transition-all duration-300 hover:shadow-[0_20px_40px_rgba(0,0,0,0.8)] before:absolute before:inset-x-8 before:top-0 before:h-[1px] before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent">
                        <div className="space-y-3">
                          <span className="font-mono text-xs text-zinc-400 uppercase tracking-widest block font-semibold">
                            02 PREPARATION
                          </span>
                          <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight leading-snug">
                            Mombasa Workshop Overhaul
                          </h3>
                          <p className="text-sm text-zinc-400 leading-relaxed">
                            Complete pre-delivery service at Tangana Road. Castrol Edge synthetic oil, OEM filters, and full computerized diagnostics.
                          </p>
                        </div>
                        <div className="pt-6 mt-6 border-t border-white/[0.07]">
                          <button
                            onClick={() => handleNavigate('workshop')}
                            className="text-xs font-semibold text-zinc-300 hover:text-white inline-flex items-center gap-1.5 transition-colors cursor-pointer"
                          >
                            <span>Workshop Checklist</span>
                            <ArrowRight className="w-3.5 h-3.5 text-zinc-400" />
                          </button>
                        </div>
                      </div>

                      {/* Pillar 03 */}
                      <div className="relative bg-[#0c0c0f] hover:bg-[#111115] border border-white/[0.08] hover:border-white/25 rounded-2xl p-8 sm:p-10 flex flex-col justify-between transition-all duration-300 hover:shadow-[0_20px_40px_rgba(0,0,0,0.8)] before:absolute before:inset-x-8 before:top-0 before:h-[1px] before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent">
                        <div className="space-y-3">
                          <span className="font-mono text-xs text-zinc-400 uppercase tracking-widest block font-semibold">
                            03 WARRANTY
                          </span>
                          <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight leading-snug">
                            5,000 KM Written Warranty
                          </h3>
                          <p className="text-sm text-zinc-400 leading-relaxed">
                            Written dealer warranty covering engine and gearbox, supported directly by our Mombasa technical workshop.
                          </p>
                        </div>
                        <div className="pt-6 mt-6 border-t border-white/[0.07]">
                          <button
                            onClick={() => handleNavigate('workshop')}
                            className="text-xs font-semibold text-zinc-300 hover:text-white inline-flex items-center gap-1.5 transition-colors cursor-pointer"
                          >
                            <span>Warranty Terms</span>
                            <ArrowRight className="w-3.5 h-3.5 text-zinc-400" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Showrooms Overview (Mombasa & Nairobi) */}
                <section className="w-full bg-[#09090b] py-20 px-4 sm:px-8">
                  <div className="max-w-[1440px] mx-auto space-y-12">
                    <div className="text-center max-w-[700px] mx-auto">
                      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight">
                        Showrooms
                      </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                      {/* Mombasa Card */}
                      <div className="relative bg-[#0e0e11] hover:bg-[#121216] p-7 sm:p-9 border border-zinc-800/90 hover:border-zinc-500/80 rounded-2xl flex flex-col justify-between space-y-6 transition-all duration-300 hover:shadow-[0_20px_40px_rgba(0,0,0,0.8)] before:absolute before:inset-x-6 before:top-0 before:h-[1px] before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent">
                        <div className="space-y-4">
                          <div className="inline-flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-red-600" />
                            <span className="font-mono text-[11px] text-zinc-400 uppercase tracking-wider block font-semibold">
                              MOMBASA FLAGSHIP
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
                              NAIROBI WESTLANDS
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

