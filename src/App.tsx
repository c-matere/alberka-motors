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
import { MobileBottomDock } from './components/MobileBottomDock';
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
    <div className="min-h-screen flex flex-col bg-[#08090a] text-[#d0d6e0]">
      
      {/* 56px Global Linear Navigation */}
      <Navbar
        currentView={selectedVehicle ? 'inventory' : currentView}
        onNavigate={handleNavigate}
        favoritesCount={favorites.length}
        onOpenSearch={() => setSearchModalOpen(true)}
        onOpenFavorites={() => setFavoritesModalOpen(true)}
      />

      {/* 48px Sticky Local Context Navigation */}
      {!selectedVehicle && (
        <StickyLocalNav
          currentView={currentView}
          selectedVehicle={null}
          onNavigate={handleNavigate}
          onBackToInventory={() => handleNavigate('inventory')}
        />
      )}

      {/* Main View Router */}
      <main key={selectedVehicle?.id || currentView} className="flex-1 view-enter pb-20 md:pb-0">
        {/* If an individual vehicle is selected, render the Precision Editorial Story Page */}
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

                {/* Highlights Stage — Linear Carbon Card Grid */}
                <section className="w-full bg-[#08090a] py-20 px-6 border-b border-[#23252a]">
                  <div className="max-w-[1200px] mx-auto">
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
                      <div>
                        <span className="launch-status-label mb-2">The Alberka Motors Standard</span>
                        <h2 className="feature-heading">Verified Japanese Provenance.</h2>
                      </div>
                      <button
                        onClick={() => handleNavigate('workshop')}
                        className="text-[#d0d6e0] hover:text-[#ffffff] flex items-center gap-1.5 text-[13px] font-normal transition-colors cursor-pointer"
                      >
                        <span>Explore Mombasa workshop standard</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Highlight Card 1 */}
                      <div className="bg-[#0f1011] border border-[#23252a] rounded-[12px] p-6 sm:p-8 flex flex-col justify-between hover:border-[#383b3f] transition-all">
                        <div className="space-y-2.5">
                          <span className="font-mono text-[11px] text-[#8a8f98] uppercase tracking-wider block">
                            Mechanical Protocol // 01
                          </span>
                          <h3 className="text-[24px] sm:text-[28px] font-medium text-[#ffffff] leading-snug tracking-tight">
                            Serviced before you turn the key.
                          </h3>
                          <p className="text-[14px] text-[#8a8f98] leading-relaxed">
                            Every vehicle enters our in-house Mombasa facility on Tangana Road for Castrol synthetic lubrication, genuine OEM filtration, micrometer brake tests, and full OBD-II diagnostics.
                          </p>
                        </div>
                        <div className="pt-6 mt-auto">
                          <img
                            src="https://images.pexels.com/photos/8986138/pexels-photo-8986138.jpeg?auto=compress&cs=tinysrgb&w=1600"
                            alt="Mombasa In-House Workshop"
                            className="w-full h-[220px] sm:h-[260px] object-cover rounded-[8px] border border-[#23252a]"
                          />
                        </div>
                      </div>

                      {/* Highlight Card 2 */}
                      <div className="bg-[#0f1011] border border-[#23252a] rounded-[12px] p-6 sm:p-8 flex flex-col justify-between hover:border-[#383b3f] transition-all">
                        <div className="space-y-2.5">
                          <span className="font-mono text-[11px] text-[#8a8f98] uppercase tracking-wider block">
                            Warranty Covenant // 02
                          </span>
                          <h3 className="text-[24px] sm:text-[28px] font-medium text-[#ffffff] leading-snug tracking-tight">
                            5,000 KM written peace of mind.
                          </h3>
                          <p className="text-[14px] text-[#8a8f98] leading-relaxed">
                            Drive from our showroom straight to your destination. Zero unexpected mechanic visits, zero fluid replacement costs, and comprehensive post-delivery mechanical backing.
                          </p>
                        </div>
                        <div className="pt-6 mt-auto">
                          <img
                            src="https://images.pexels.com/photos/33327689/pexels-photo-33327689.jpeg?auto=compress&cs=tinysrgb&w=1600"
                            alt="Verified Handover"
                            className="w-full h-[220px] sm:h-[260px] object-cover rounded-[8px] border border-[#23252a]"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Editorial Product Story */}
                <section className="w-full bg-[#08090a] py-20 px-6 border-b border-[#23252a]">
                  <div className="max-w-[1200px] mx-auto space-y-20">
                    
                    {/* Chapter 1: Sourcing & Auction Integrity */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                      <div className="lg:col-span-5 space-y-3.5">
                        <span className="launch-status-label">Direct Auction Sourcing</span>
                        <h2 className="feature-heading">
                          Sourced at the source. Inspected in Japan.
                        </h2>
                        <p className="text-[14px] text-[#8a8f98] leading-relaxed">
                          Alberka Motors sources vehicles directly from prime Japanese auto auctions (USS Tokyo, TAA, CAA). We verify genuine mileage and auction grading sheets before any vehicle boards the vessel for Mombasa.
                        </p>
                        <div className="pt-2">
                          <button
                            onClick={() => handleNavigate('about')}
                            className="text-[#d0d6e0] hover:text-[#ffffff] flex items-center gap-1.5 text-[13px] font-normal transition-colors cursor-pointer"
                          >
                            <span>Learn about our Japanese sourcing standard</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                      <div className="lg:col-span-7">
                        <img
                          src="https://images.pexels.com/photos/16176579/pexels-photo-16176579.jpeg?auto=compress&cs=tinysrgb&w=1600"
                          alt="Japanese Auction Sourced Vehicle"
                          className="w-full h-auto object-cover rounded-[12px] border border-[#23252a]"
                        />
                      </div>
                    </div>

                    {/* Chapter 2: The Mombasa In-House Workshop */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                      <div className="lg:col-span-7 order-2 lg:order-1">
                        <img
                          src="https://images.pexels.com/photos/5309381/pexels-photo-5309381.jpeg?auto=compress&cs=tinysrgb&w=1600"
                          alt="Mombasa Garage Overhaul"
                          className="w-full h-auto object-cover rounded-[12px] border border-[#23252a]"
                        />
                      </div>
                      <div className="lg:col-span-5 space-y-3.5 order-1 lg:order-2">
                        <span className="launch-status-label">In-House Mechanical Bays</span>
                        <h2 className="feature-heading">
                          Full pre-delivery service on the house.
                        </h2>
                        <p className="text-[14px] text-[#8a8f98] leading-relaxed">
                          Our dedicated garage on Tangana Road performs full minor and major servicing. When you take delivery, your engine oil is fresh, your filters are brand new, and your brake pads are tested.
                        </p>
                        <div className="pt-2">
                          <button
                            onClick={() => handleNavigate('workshop')}
                            className="text-[#d0d6e0] hover:text-[#ffffff] flex items-center gap-1.5 text-[13px] font-normal transition-colors cursor-pointer"
                          >
                            <span>View 100-point servicing checklist</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>

                  </div>
                </section>

                {/* Featured Product Showcase Slides */}
                <section className="w-full bg-[#08090a] py-20 px-6 overflow-hidden border-b border-[#23252a]">
                  <div className="max-w-[1200px] mx-auto">
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
                <section className="w-full bg-[#08090a] py-20 px-6">
                  <div className="max-w-[1200px] mx-auto">
                    <div className="mb-12 text-center max-w-[620px] mx-auto">
                      <span className="launch-status-label mb-2">Direct Showrooms</span>
                      <h2 className="feature-heading">Visit us in Mombasa and Nairobi.</h2>
                      <p className="text-[14px] text-[#8a8f98] mt-2">
                        Two physical locations supporting trade-in valuations, workshop servicing, and test drives.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Mombasa Card */}
                      <div className="bg-[#0f1011] p-6 sm:p-8 rounded-[12px] border border-[#23252a] hover:border-[#383b3f] transition-all flex flex-col justify-between">
                        <div className="space-y-3">
                          <span className="font-mono text-[11px] text-[#8a8f98] uppercase tracking-wider block">
                            Main Branch & Workshop // Est. 2000
                          </span>
                          <h3 className="text-[20px] font-medium text-[#ffffff]">Mombasa Flagship Hub</h3>
                          <p className="text-[14px] text-[#8a8f98] leading-relaxed">
                            Tangana Road (Opposite AutoXpress / Near the Railway Station), Majengo & Nyali Road.
                          </p>
                          <div className="text-[13px] text-[#8a8f98] pt-2 space-y-1 font-mono">
                            <p>Phone: +254 714 333888 / +254 737 333888</p>
                            <p>Email: sales@alberkamotors.co.ke</p>
                          </div>
                        </div>
                        <div className="pt-6">
                          <button
                            onClick={() => handleNavigate('locations')}
                            className="btn-ghost !text-[13px] cursor-pointer"
                          >
                            Explore Mombasa Hub
                          </button>
                        </div>
                      </div>

                      {/* Nairobi Card */}
                      <div className="bg-[#0f1011] p-6 sm:p-8 rounded-[12px] border border-[#23252a] hover:border-[#383b3f] transition-all flex flex-col justify-between">
                        <div className="space-y-3">
                          <span className="font-mono text-[11px] text-[#8a8f98] uppercase tracking-wider block">
                            Capital Branch // Westlands
                          </span>
                          <h3 className="text-[20px] font-medium text-[#ffffff]">Nairobi Westlands Hub</h3>
                          <p className="text-[14px] text-[#8a8f98] leading-relaxed">
                            Mwanzi Road, Westlands, Nairobi. Convenient access for executive test drives and trade-ins.
                          </p>
                          <div className="text-[13px] text-[#8a8f98] pt-2 space-y-1 font-mono">
                            <p>Phone: +254 748 999333</p>
                            <p>Email: nairobi@alberkamotors.co.ke</p>
                          </div>
                        </div>
                        <div className="pt-6">
                          <button
                            onClick={() => handleNavigate('locations')}
                            className="btn-ghost !text-[13px] cursor-pointer"
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

      {/* Mobile-First Bottom Application Navigation Dock */}
      <MobileBottomDock
        currentView={currentView}
        selectedVehicle={selectedVehicle}
        onNavigate={handleNavigate}
        onBackToInventory={() => handleNavigate('inventory')}
        favoritesCount={favorites.length}
        onOpenFavorites={() => setFavoritesModalOpen(true)}
      />

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
