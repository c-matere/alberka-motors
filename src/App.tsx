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

                {/* Why Alberka Motors Feature Highlights */}
                <section className="w-full bg-[#09090b] py-20 px-6 sm:px-10 border-b border-[#27272a]">
                  <div className="max-w-[1400px] mx-auto space-y-12">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                      <div className="space-y-2">
                        <span className="brand-eyebrow block">WHY BUY FROM ALBERKA</span>
                        <h2 className="text-[28px] sm:text-[38px] font-bold text-white tracking-tight">
                          Clean Japanese Cars. Honest Mileage. No Surprises.
                        </h2>
                      </div>
                      <button
                        onClick={() => handleNavigate('workshop')}
                        className="btn-ghost self-start md:self-auto cursor-pointer"
                      >
                        <span>Our Mombasa Workshop</span>
                        <ArrowRight className="w-4 h-4 ml-1" />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {/* Highlight Card 1 */}
                      <div className="bg-[#121215] border border-[#27272a] hover:border-zinc-600 transition-colors p-8 sm:p-10 flex flex-col justify-between space-y-8 rounded-[4px]">
                        <div className="space-y-3">
                          <span className="font-mono text-[11px] text-zinc-400 uppercase tracking-wider block font-semibold">
                            WORKSHOP STANDARD // 01
                          </span>
                          <h3 className="text-[24px] sm:text-[28px] font-bold text-white tracking-tight">
                            Serviced before you drive home.
                          </h3>
                          <p className="text-[15px] text-[#a1a1aa] leading-relaxed">
                            Every car goes straight to our Tangana Road workshop in Mombasa for Castrol synthetic oil, fresh OEM filters, suspension checks, and full computerized diagnostics.
                          </p>
                        </div>
                        <div className="overflow-hidden border border-[#27272a] bg-[#09090b] rounded-[2px]">
                          <img
                            src="https://images.pexels.com/photos/8986138/pexels-photo-8986138.jpeg?auto=compress&cs=tinysrgb&w=1600"
                            alt="Mombasa In-House Workshop"
                            className="w-full h-[240px] sm:h-[280px] object-cover hover:scale-103 transition-transform duration-500"
                          />
                        </div>
                      </div>

                      {/* Highlight Card 2 */}
                      <div className="bg-[#121215] border border-[#27272a] hover:border-zinc-600 transition-colors p-8 sm:p-10 flex flex-col justify-between space-y-8 rounded-[4px]">
                        <div className="space-y-3">
                          <span className="font-mono text-[11px] text-zinc-400 uppercase tracking-wider block font-semibold">
                            PEACE OF MIND // 02
                          </span>
                          <h3 className="text-[24px] sm:text-[28px] font-bold text-white tracking-tight">
                            5,000 KM written warranty.
                          </h3>
                          <p className="text-[15px] text-[#a1a1aa] leading-relaxed">
                            You get a written warranty covering engine and transmission. Drive off with total confidence knowing your car has zero mechanical shortcuts.
                          </p>
                        </div>
                        <div className="overflow-hidden border border-[#27272a] bg-[#09090b] rounded-[2px]">
                          <img
                            src="https://images.pexels.com/photos/33327689/pexels-photo-33327689.jpeg?auto=compress&cs=tinysrgb&w=1600"
                            alt="Verified Handover"
                            className="w-full h-[240px] sm:h-[280px] object-cover hover:scale-103 transition-transform duration-500"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Sourcing & Workshop Chapters */}
                <section className="w-full bg-[#121215] py-20 px-6 sm:px-10 border-b border-[#27272a]">
                  <div className="max-w-[1400px] mx-auto space-y-24">
                    
                    {/* Chapter 1: Sourcing */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                      <div className="lg:col-span-5 space-y-5">
                        <span className="brand-eyebrow block">DIRECT JAPANESE AUCTIONS</span>
                        <h2 className="text-[28px] sm:text-[38px] font-bold text-white tracking-tight leading-tight">
                          Bought directly in Japan.<br />Never from middlemen.
                        </h2>
                        <p className="text-[15px] text-[#a1a1aa] leading-relaxed">
                          We personally select every vehicle from major Japanese auction houses (USS Tokyo, TAA, CAA). We verify genuine mileage certificates and auction sheets before anything is shipped to Mombasa.
                        </p>
                        <div className="pt-2">
                          <button
                            onClick={() => handleNavigate('about')}
                            className="btn-ghost cursor-pointer"
                          >
                            <span>How We Source Our Cars</span>
                            <ArrowRight className="w-4 h-4 ml-2" />
                          </button>
                        </div>
                      </div>
                      <div className="lg:col-span-7 overflow-hidden border border-[#27272a] bg-[#09090b] rounded-[4px]">
                        <img
                          src="https://images.pexels.com/photos/16176579/pexels-photo-16176579.jpeg?auto=compress&cs=tinysrgb&w=1600"
                          alt="Japanese Auction Sourced Vehicle"
                          className="w-full h-auto object-cover hover:scale-103 transition-transform duration-500"
                        />
                      </div>
                    </div>

                    {/* Chapter 2: The Mombasa Workshop */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                      <div className="lg:col-span-7 order-2 lg:order-1 overflow-hidden border border-[#27272a] bg-[#09090b] rounded-[4px]">
                        <img
                          src="https://images.pexels.com/photos/5309381/pexels-photo-5309381.jpeg?auto=compress&cs=tinysrgb&w=1600"
                          alt="Mombasa Garage Overhaul"
                          className="w-full h-auto object-cover hover:scale-103 transition-transform duration-500"
                        />
                      </div>
                      <div className="lg:col-span-5 space-y-5 order-1 lg:order-2">
                        <span className="brand-eyebrow block">MOMBASA WORKSHOP</span>
                        <h2 className="text-[28px] sm:text-[38px] font-bold text-white tracking-tight leading-tight">
                          Full pre-delivery service included.
                        </h2>
                        <p className="text-[15px] text-[#a1a1aa] leading-relaxed">
                          No extra fees for basic servicing. When you buy from Alberka Motors, your engine oil is fresh, your filters are new, and your brakes and hybrid battery are road-tested.
                        </p>
                        <div className="pt-2">
                          <button
                            onClick={() => handleNavigate('workshop')}
                            className="btn-crimson cursor-pointer"
                          >
                            <span>See Our 100-Point Checklist</span>
                            <ArrowRight className="w-4 h-4 ml-2" />
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
                <section className="w-full bg-[#121215] py-20 px-6 sm:px-10">
                  <div className="max-w-[1400px] mx-auto space-y-14">
                    <div className="text-center max-w-[700px] mx-auto space-y-3">
                      <span className="brand-eyebrow block">SHOWROOM LOCATIONS</span>
                      <h2 className="text-[28px] sm:text-[38px] font-bold text-white tracking-tight">
                        Visit Us in Mombasa or Nairobi
                      </h2>
                      <p className="text-[16px] text-[#a1a1aa]">
                        Drop by to test drive any car in stock, get an instant trade-in valuation, or chat with our team.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {/* Mombasa Card */}
                      <div className="bg-[#18181c] p-8 sm:p-10 border border-[#27272a] flex flex-col justify-between space-y-6 rounded-[4px]">
                        <div className="space-y-3">
                          <div className="inline-flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-red-600" />
                            <span className="font-mono text-[11px] text-zinc-400 uppercase tracking-wider block font-semibold">
                              MAIN SHOWROOM & WORKSHOP // MOMBASA
                            </span>
                          </div>
                          <h3 className="text-[22px] font-bold text-white">Mombasa Flagship</h3>
                          <p className="text-[14.5px] text-[#a1a1aa] leading-relaxed">
                            Tangana Road (Opposite AutoXpress / Near Railway Station), Majengo & Nyali Road.
                          </p>
                          <div className="text-[13px] text-[#d4d4d8] pt-2 space-y-1 font-mono">
                            <p>Phone: 0714 333 888 / 0737 333 888</p>
                            <p>Email: sales@alberkamotors.co.ke</p>
                          </div>
                        </div>
                        <div className="pt-4">
                          <button
                            onClick={() => handleNavigate('locations')}
                            className="btn-ghost w-full sm:w-auto cursor-pointer"
                          >
                            <span>Mombasa Details & Map</span>
                            <ArrowRight className="w-4 h-4 ml-1.5" />
                          </button>
                        </div>
                      </div>

                      {/* Nairobi Card */}
                      <div className="bg-[#18181c] p-8 sm:p-10 border border-[#27272a] flex flex-col justify-between space-y-6 rounded-[4px]">
                        <div className="space-y-3">
                          <div className="inline-flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-red-600" />
                            <span className="font-mono text-[11px] text-zinc-400 uppercase tracking-wider block font-semibold">
                              NAIROBI SHOWROOM // WESTLANDS
                            </span>
                          </div>
                          <h3 className="text-[22px] font-bold text-white">Nairobi Westlands Hub</h3>
                          <p className="text-[14.5px] text-[#a1a1aa] leading-relaxed">
                            Mwanzi Road, Westlands, Nairobi. Easy access for city viewings and trade-in appraisals.
                          </p>
                          <div className="text-[13px] text-[#d4d4d8] pt-2 space-y-1 font-mono">
                            <p>Phone: 0748 999 333</p>
                            <p>Email: nairobi@alberkamotors.co.ke</p>
                          </div>
                        </div>
                        <div className="pt-4">
                          <button
                            onClick={() => handleNavigate('locations')}
                            className="btn-ghost w-full sm:w-auto cursor-pointer"
                          >
                            <span>Nairobi Details & Map</span>
                            <ArrowRight className="w-4 h-4 ml-1.5" />
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

