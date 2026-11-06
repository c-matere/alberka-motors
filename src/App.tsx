import React, { useState, useEffect } from 'react';
import { VEHICLES, Vehicle } from './data/vehicles';
import { Navbar } from './components/Navbar';
import { StickyLocalNav } from './components/StickyLocalNav';
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
import { Footer } from './components/Footer';
import { ArrowRight, ShieldCheck } from 'lucide-react';

export function App() {
  const [currentView, setCurrentView] = useState<string>('overview');
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [testDriveTargetVehicle, setTestDriveTargetVehicle] = useState<Vehicle | null>(null);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [favoritesModalOpen, setFavoritesModalOpen] = useState(false);

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
    <div className="min-h-screen flex flex-col bg-[#09090b] text-white">
      
      {/* 44px Global Store Navigation */}
      <Navbar
        currentView={selectedVehicle ? 'inventory' : currentView}
        onNavigate={handleNavigate}
        favoritesCount={favorites.length}
        onOpenSearch={() => setSearchModalOpen(true)}
        onOpenFavorites={() => setFavoritesModalOpen(true)}
      />

      {/* 52px Sticky Local Context Navigation */}
      <StickyLocalNav
        currentView={selectedVehicle ? 'vehicle-detail' : currentView}
        selectedVehicle={selectedVehicle}
        onNavigate={handleNavigate}
        onBackToInventory={() => handleNavigate('inventory')}
      />

      {/* Main View Router with Apple Cross-Fade Motion */}
      <main key={selectedVehicle?.id || currentView} className="flex-1 view-enter">
        {/* If an individual vehicle is selected, render the Rolls-Royce + Apple Storytelling Page */}
        {selectedVehicle ? (
          <VehicleStoryView
            vehicle={selectedVehicle}
            allVehicles={VEHICLES}
            onSelectVehicle={handleSelectVehicle}
            onBackToFleet={() => handleNavigate('inventory')}
            isFavorite={favorites.includes(selectedVehicle.id)}
            onToggleFavorite={handleToggleFavorite}
            onScheduleTestDrive={handleScheduleTestDrive}
          />
        ) : (
          <>
            {currentView === 'overview' && (
              <>
                {/* Hero Stage */}
                <Hero
                  onExploreFleet={() => handleNavigate('inventory')}
                  onExploreWorkshop={() => handleNavigate('workshop')}
                />

                {/* Highlights Stage (Studio Mist #f5f5f7 Backdrop, 28px shadowless cards) */}
                <section className="w-full bg-[#121215] py-24 px-6">
                  <div className="max-w-[1240px] mx-auto">
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
                      <div>
                        <span className="launch-status-label mb-2">The Alberka Motors Standard</span>
                        <h2 className="feature-heading">Get the highlights.</h2>
                      </div>
                      <button
                        onClick={() => handleNavigate('workshop')}
                        className="alberka-red-link cursor-pointer font-medium"
                      >
                        <span>Explore our Mombasa workshop standard</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
                      {/* Highlight Card 1 */}
                      <div className="apple-feature-card p-8 md:p-12 flex flex-col justify-between min-h-[480px]">
                        <div className="space-y-3">
                          <span className="text-[13px] font-semibold text-zinc-500 uppercase tracking-wider block">
                            Mechanical Integrity
                          </span>
                          <h3 className="text-[28px] md:text-[34px] font-semibold text-white leading-[1.12]" style={{ letterSpacing: '-0.5px' }}>
                            Serviced before you turn the key.
                          </h3>
                          <p className="text-[17px] text-zinc-400 leading-[1.47]" style={{ letterSpacing: '-0.374px' }}>
                            Every car enters our Mombasa workshop on Tangana Road for synthetic engine oil replacement, fresh OEM filters, brake pad checks, and computerized OBD-II diagnostics.
                          </p>
                        </div>
                        <div className="pt-8 mt-auto">
                          <img
                            src="https://images.pexels.com/photos/8986138/pexels-photo-8986138.jpeg?auto=compress&cs=tinysrgb&w=1600"
                            alt="Mombasa In-House Workshop"
                            className="w-full h-[240px] sm:h-[280px] object-cover rounded-[20px]"
                          />
                        </div>
                      </div>

                      {/* Highlight Card 2 */}
                      <div className="apple-feature-card p-8 md:p-12 flex flex-col justify-between min-h-[480px]">
                        <div className="space-y-3">
                          <span className="text-[13px] font-semibold text-zinc-500 uppercase tracking-wider block">
                            5,000 KM Warranty
                          </span>
                          <h3 className="text-[28px] md:text-[34px] font-semibold text-white leading-[1.12]" style={{ letterSpacing: '-0.5px' }}>
                            Nothing to worry about for 5,000 kilometers.
                          </h3>
                          <p className="text-[17px] text-zinc-400 leading-[1.47]" style={{ letterSpacing: '-0.374px' }}>
                            Drive from our showroom straight to your destination. Zero mechanic visits, zero immediate fluid costs, and complete post-delivery mechanical backing.
                          </p>
                        </div>
                        <div className="pt-8 mt-auto">
                          <img
                            src="https://images.pexels.com/photos/33327689/pexels-photo-33327689.jpeg?auto=compress&cs=tinysrgb&w=1600"
                            alt="Verified Handover"
                            className="w-full h-[240px] sm:h-[280px] object-cover rounded-[20px]"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Editorial Product Story (Gallery White #ffffff) */}
                <section className="w-full bg-[#09090b] py-24 px-6">
                  <div className="max-w-[1240px] mx-auto space-y-28">
                    
                    {/* Chapter 1: Sourcing & Auction Integrity */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
                      <div className="lg:col-span-5 space-y-4">
                        <span className="launch-status-label mb-1">Direct Auction Sourcing</span>
                        <h2 className="feature-heading">
                          Sourced at the source. Inspected in Japan.
                        </h2>
                        <p className="text-[17px] text-zinc-400 leading-[1.47]" style={{ letterSpacing: '-0.374px' }}>
                          Alberka Motors sources vehicles directly from prime Japanese auto auctions (USS Tokyo, TAA, CAA). We verify genuine mileage and auction grading sheets before any vehicle boards the vessel for Mombasa.
                        </p>
                        <div className="pt-2">
                          <button
                            onClick={() => handleNavigate('about')}
                            className="alberka-red-link cursor-pointer font-medium"
                          >
                            <span>Learn about our Japanese sourcing standard</span>
                            <ArrowRight className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                      <div className="lg:col-span-7">
                        <img
                          src="https://images.pexels.com/photos/16176579/pexels-photo-16176579.jpeg?auto=compress&cs=tinysrgb&w=1600"
                          alt="Japanese Auction Sourced Vehicle"
                          className="w-full h-auto object-cover rounded-[28px]"
                        />
                      </div>
                    </div>

                    {/* Chapter 2: The Mombasa In-House Workshop */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
                      <div className="lg:col-span-7 order-2 lg:order-1">
                        <img
                          src="https://images.pexels.com/photos/5309381/pexels-photo-5309381.jpeg?auto=compress&cs=tinysrgb&w=1600"
                          alt="Mombasa Garage Overhaul"
                          className="w-full h-auto object-cover rounded-[28px]"
                        />
                      </div>
                      <div className="lg:col-span-5 space-y-4 order-1 lg:order-2">
                        <span className="launch-status-label mb-1">In-House Mechanical Bays</span>
                        <h2 className="feature-heading">
                          A full pre-delivery service. On the house.
                        </h2>
                        <p className="text-[17px] text-zinc-400 leading-[1.47]" style={{ letterSpacing: '-0.374px' }}>
                          Our dedicated garage on Tangana Road performs full minor and major servicing. When you take delivery, your engine oil is fresh, your filters are brand new, and your brake pads are tested.
                        </p>
                        <div className="pt-2">
                          <button
                            onClick={() => handleNavigate('workshop')}
                            className="alberka-red-link cursor-pointer font-medium"
                          >
                            <span>View 100-point servicing checklist</span>
                            <ArrowRight className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>

                  </div>
                </section>

                {/* Featured Product Showcase Slides (Studio Mist #f5f5f7) */}
                <section className="w-full bg-[#121215] py-24 px-6 overflow-hidden">
                  <div className="max-w-[1240px] mx-auto">
                    <ShowroomSlider
                      vehicles={VEHICLES}
                      favorites={favorites}
                      onToggleFavorite={handleToggleFavorite}
                      onSelectVehicle={handleSelectVehicle}
                      onViewAll={() => handleNavigate('inventory')}
                    />
                  </div>
                </section>

                {/* Showrooms Overview Section */}
                <section className="w-full bg-[#09090b] py-24 px-6">
                  <div className="max-w-[1240px] mx-auto">
                    <div className="mb-14 text-center max-w-[680px] mx-auto">
                      <span className="launch-status-label mb-2">Direct Showrooms</span>
                      <h2 className="feature-heading">Visit us in Mombasa and Nairobi.</h2>
                      <p className="text-[17px] text-zinc-400 mt-3" style={{ letterSpacing: '-0.374px' }}>
                        Two physical locations supporting trade-in valuations, workshop servicing, and test drives.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
                      {/* Mombasa Card */}
                      <div className="bg-[#121215] p-8 rounded-[28px] flex flex-col justify-between">
                        <div className="space-y-3">
                          <span className="text-[12px] font-semibold text-zinc-400 uppercase">
                            Main Branch & Workshop // Est. 2000
                          </span>
                          <h3 className="text-[24px] font-semibold text-white">Mombasa Flagship Hub</h3>
                          <p className="text-[15px] text-zinc-400 leading-[1.47]">
                            Tangana Road (Opposite AutoXpress / Near the Railway Station), Majengo & Nyali Road.
                          </p>
                          <div className="text-[14px] text-zinc-400 pt-2 space-y-1">
                            <p><strong>Phone:</strong> +254 714 333888 / +254 737 333888</p>
                            <p><strong>Email:</strong> sales@alberkamotors.co.ke</p>
                          </div>
                        </div>
                        <div className="pt-6">
                          <button
                            onClick={() => handleNavigate('locations')}
                            className="pricing-blue-pill !py-2.5 !px-5 text-[14px] cursor-pointer"
                          >
                            Explore Mombasa Hub
                          </button>
                        </div>
                      </div>

                      {/* Nairobi Card */}
                      <div className="bg-[#121215] p-8 rounded-[28px] flex flex-col justify-between">
                        <div className="space-y-3">
                          <span className="text-[12px] font-semibold text-zinc-400 uppercase">
                            Capital Branch // Westlands
                          </span>
                          <h3 className="text-[24px] font-semibold text-white">Nairobi Westlands Hub</h3>
                          <p className="text-[15px] text-zinc-400 leading-[1.47]">
                            Mwanzi Road, Westlands, Nairobi. Convenient access for executive test drives and trade-ins.
                          </p>
                          <div className="text-[14px] text-zinc-400 pt-2 space-y-1">
                            <p><strong>Phone:</strong> +254 748 999333</p>
                            <p><strong>Email:</strong> nairobi@alberkamotors.co.ke</p>
                          </div>
                        </div>
                        <div className="pt-6">
                          <button
                            onClick={() => handleNavigate('locations')}
                            className="pricing-blue-pill !py-2.5 !px-5 text-[14px] cursor-pointer"
                          >
                            Explore Nairobi Hub
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

      {/* Global Apple Multi-Column Footer */}
      <Footer
        vehicles={VEHICLES}
        onNavigate={handleNavigate}
        onSelectVehicle={handleSelectVehicle}
      />

      {/* Instant Search Palette */}
      <SearchModal
        isOpen={searchModalOpen}
        onClose={() => setSearchModalOpen(false)}
        vehicles={VEHICLES}
        onSelectVehicle={handleSelectVehicle}
      />

      {/* Saved Favorites Drawer/Modal */}
      <FavoritesModal
        isOpen={favoritesModalOpen}
        onClose={() => setFavoritesModalOpen(false)}
        favorites={favorites}
        vehicles={VEHICLES}
        onToggleFavorite={handleToggleFavorite}
        onSelectVehicle={handleSelectVehicle}
      />

    </div>
  );
}

export default App;
