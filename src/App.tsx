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
import { WhispersDrawer } from './components/WhispersDrawer';
import { MobileBottomDock } from './components/MobileBottomDock';
import { Footer } from './components/Footer';
import { ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';

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
    <div className="min-h-screen flex flex-col bg-[#160a1d] text-[#f5f5f7]">
      
      {/* 64px Invisible Header / Nocturnal Frosted Glass on Scroll */}
      <Navbar
        currentView={selectedVehicle ? 'inventory' : currentView}
        onNavigate={handleNavigate}
        favoritesCount={favorites.length}
        onOpenSearch={() => setSearchModalOpen(true)}
        onOpenFavorites={() => setFavoritesModalOpen(true)}
        onOpenWhispers={() => setWhispersDrawerOpen(true)}
      />

      {/* 48px Sticky Context Navigation Bar */}
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
        {/* If an individual vehicle is selected, render the Rolls-Royce Atelier Story View */}
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
                {/* 21:9 Ethereal Hero Stage */}
                <Hero
                  onExploreFleet={() => handleNavigate('inventory')}
                  onExploreWorkshop={() => handleNavigate('workshop')}
                />

                {/* The Architecture of Perfection — Split Highlight Panels */}
                <section className="w-full bg-[#160a1d] py-24 px-6 border-b border-[rgba(197,168,128,0.18)]">
                  <div className="max-w-[1400px] mx-auto space-y-12">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                      <div className="space-y-2">
                        <span className="rr-eyebrow block">THE ALBERKA PRESTIGE CHARTER</span>
                        <h2 className="rr-title-h2 text-[26px] sm:text-[36px]">
                          AUTHENTICATED JAPANESE PROVENANCE.
                        </h2>
                      </div>
                      <button
                        onClick={() => handleNavigate('workshop')}
                        className="btn-rr-ghost !py-2.5 !px-5"
                      >
                        <span>EXPLORE TANGANA ROAD ATELIER</span>
                        <ArrowRight className="w-3.5 h-3.5 ml-2" />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {/* Highlight Card 1 */}
                      <div className="bg-[#131316] border border-[rgba(197,168,128,0.25)] p-8 sm:p-10 flex flex-col justify-between space-y-8">
                        <div className="space-y-3">
                          <span className="font-['Cinzel'] text-[10px] text-[#c5a880] uppercase tracking-widest block">
                            MECHANICAL COVENANT // 01
                          </span>
                          <h3 className="font-['Cinzel'] text-[24px] sm:text-[28px] font-normal text-[#f5f5f7] tracking-wider uppercase">
                            Overhauled before handover.
                          </h3>
                          <p className="text-[14.5px] text-[#8c8a94] leading-relaxed font-light">
                            Every motor car enters our private facility on Tangana Road for Castrol synthetic lubrication, genuine OEM filtration, micrometer brake tests, and full computerized OBD-II diagnostics.
                          </p>
                        </div>
                        <div className="overflow-hidden border border-[rgba(197,168,128,0.2)] bg-[#080809]">
                          <img
                            src="https://images.pexels.com/photos/8986138/pexels-photo-8986138.jpeg?auto=compress&cs=tinysrgb&w=1600"
                            alt="Mombasa In-House Workshop"
                            className="w-full h-[240px] sm:h-[280px] object-cover hover:scale-103 transition-transform duration-700"
                          />
                        </div>
                      </div>

                      {/* Highlight Card 2 */}
                      <div className="bg-[#131316] border border-[rgba(197,168,128,0.25)] p-8 sm:p-10 flex flex-col justify-between space-y-8">
                        <div className="space-y-3">
                          <span className="font-['Cinzel'] text-[10px] text-[#c5a880] uppercase tracking-widest block">
                            WARRANTY CHARTER // 02
                          </span>
                          <h3 className="font-['Cinzel'] text-[24px] sm:text-[28px] font-normal text-[#f5f5f7] tracking-wider uppercase">
                            5,000 KM written peace of mind.
                          </h3>
                          <p className="text-[14.5px] text-[#8c8a94] leading-relaxed font-light">
                            Depart from our showroom directly onto the open highway. Zero unexpected mechanic visits, zero fluid replacement costs, and comprehensive post-delivery mechanical backing.
                          </p>
                        </div>
                        <div className="overflow-hidden border border-[rgba(197,168,128,0.2)] bg-[#080809]">
                          <img
                            src="https://images.pexels.com/photos/33327689/pexels-photo-33327689.jpeg?auto=compress&cs=tinysrgb&w=1600"
                            alt="Verified Handover"
                            className="w-full h-[240px] sm:h-[280px] object-cover hover:scale-103 transition-transform duration-700"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Editorial Split-Screen Atelier Spread */}
                <section className="w-full bg-[#0f0714] py-24 px-6 border-b border-[rgba(197,168,128,0.18)]">
                  <div className="max-w-[1400px] mx-auto space-y-24">
                    
                    {/* Chapter 1: Sourcing & Auction Integrity */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                      <div className="lg:col-span-5 space-y-4">
                        <span className="rr-eyebrow block">DIRECT AUCTION SOURCING</span>
                        <h2 className="rr-title-h2 text-[26px] sm:text-[36px]">
                          SOURCED AT THE ORIGIN.<br />INSPECTED IN JAPAN.
                        </h2>
                        <p className="text-[14.5px] text-[#8c8a94] leading-relaxed font-light">
                          Alberka Motors curates vehicles directly from Japan's leading auto auctions (USS Tokyo, TAA, CAA). We verify genuine mileage and auction grading sheets before any vehicle embarks upon maritime transit for Mombasa.
                        </p>
                        <div className="pt-2">
                          <button
                            onClick={() => handleNavigate('about')}
                            className="btn-rr-ghost !py-2.5 !px-5"
                          >
                            <span>THE JAPANESE BIDDING PROTOCOL</span>
                            <ArrowRight className="w-3.5 h-3.5 ml-2" />
                          </button>
                        </div>
                      </div>
                      <div className="lg:col-span-7 overflow-hidden border border-[rgba(197,168,128,0.25)] bg-[#080809]">
                        <img
                          src="https://images.pexels.com/photos/16176579/pexels-photo-16176579.jpeg?auto=compress&cs=tinysrgb&w=1600"
                          alt="Japanese Auction Sourced Vehicle"
                          className="w-full h-auto object-cover hover:scale-103 transition-transform duration-700"
                        />
                      </div>
                    </div>

                    {/* Chapter 2: The Mombasa In-House Workshop */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                      <div className="lg:col-span-7 order-2 lg:order-1 overflow-hidden border border-[rgba(197,168,128,0.25)] bg-[#080809]">
                        <img
                          src="https://images.pexels.com/photos/5309381/pexels-photo-5309381.jpeg?auto=compress&cs=tinysrgb&w=1600"
                          alt="Mombasa Garage Overhaul"
                          className="w-full h-auto object-cover hover:scale-103 transition-transform duration-700"
                        />
                      </div>
                      <div className="lg:col-span-5 space-y-4 order-1 lg:order-2">
                        <span className="rr-eyebrow block">IN-HOUSE MECHANICAL BAYS</span>
                        <h2 className="rr-title-h2 text-[26px] sm:text-[36px]">
                          FULL PRE-DELIVERY SERVICE ON THE HOUSE.
                        </h2>
                        <p className="text-[14.5px] text-[#8c8a94] leading-relaxed font-light">
                          Our dedicated facility on Tangana Road performs full minor and major servicing. When you take delivery, your engine lubrication is fresh, your filters are brand new, and your brake pads are tested.
                        </p>
                        <div className="pt-2">
                          <button
                            onClick={() => handleNavigate('workshop')}
                            className="btn-rr-solid !py-2.5 !px-5"
                          >
                            <span>VIEW 100-POINT CHECKLIST</span>
                            <ArrowRight className="w-3.5 h-3.5 ml-2" />
                          </button>
                        </div>
                      </div>
                    </div>

                  </div>
                </section>

                {/* Featured Runway Carousel */}
                <section className="w-full bg-[#160a1d] py-24 px-6 overflow-hidden border-b border-[rgba(197,168,128,0.18)]">
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

                {/* Showroom Suites Overview */}
                <section className="w-full bg-[#0f0714] py-24 px-6">
                  <div className="max-w-[1400px] mx-auto space-y-16">
                    <div className="text-center max-w-[700px] mx-auto space-y-2">
                      <span className="rr-eyebrow block">DIRECT SHOWROOM SUITES</span>
                      <h2 className="rr-title-h2 text-[26px] sm:text-[36px]">
                        VISIT US IN MOMBASA AND NAIROBI.
                      </h2>
                      <p className="text-[#dfc7a5] font-['Cormorant_Garamond'] text-[17px] italic">
                        Two physical sanctuaries supporting trade-in appraisals, workshop servicing, and private test viewings.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {/* Mombasa Card */}
                      <div className="bg-[#131316] p-8 sm:p-10 border border-[rgba(197,168,128,0.25)] flex flex-col justify-between space-y-6">
                        <div className="space-y-3">
                          <span className="font-['Cinzel'] text-[10px] text-[#c5a880] uppercase tracking-widest block">
                            MAIN BRANCH & WORKSHOP // EST. 2000
                          </span>
                          <h3 className="font-['Cinzel'] text-[22px] text-[#f5f5f7] tracking-wider uppercase">Mombasa Flagship Hub</h3>
                          <p className="text-[14px] text-[#8c8a94] leading-relaxed font-light">
                            Tangana Road (Opposite AutoXpress / Near Railway Station), Majengo & Nyali Road.
                          </p>
                          <div className="text-[13px] text-[#8c8a94] pt-2 space-y-1 font-mono">
                            <p>Phone: +254 714 333888 / +254 737 333888</p>
                            <p>Email: sales@alberkamotors.co.ke</p>
                          </div>
                        </div>
                        <div className="pt-4">
                          <button
                            onClick={() => handleNavigate('locations')}
                            className="btn-rr-ghost w-full sm:w-auto"
                          >
                            <span>EXPLORE MOMBASA HUB</span>
                            <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                          </button>
                        </div>
                      </div>

                      {/* Nairobi Card */}
                      <div className="bg-[#131316] p-8 sm:p-10 border border-[rgba(197,168,128,0.25)] flex flex-col justify-between space-y-6">
                        <div className="space-y-3">
                          <span className="font-['Cinzel'] text-[10px] text-[#c5a880] uppercase tracking-widest block">
                            CAPITAL BRANCH // WESTLANDS
                          </span>
                          <h3 className="font-['Cinzel'] text-[22px] text-[#f5f5f7] tracking-wider uppercase">Nairobi Westlands Hub</h3>
                          <p className="text-[14px] text-[#8c8a94] leading-relaxed font-light">
                            Mwanzi Road, Westlands, Nairobi. Convenient access for executive viewings and trade-ins.
                          </p>
                          <div className="text-[13px] text-[#8c8a94] pt-2 space-y-1 font-mono">
                            <p>Phone: +254 748 999333</p>
                            <p>Email: nairobi@alberkamotors.co.ke</p>
                          </div>
                        </div>
                        <div className="pt-4">
                          <button
                            onClick={() => handleNavigate('locations')}
                            className="btn-rr-ghost w-full sm:w-auto"
                          >
                            <span>EXPLORE NAIROBI HUB</span>
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

      {/* Mobile-First Bottom Application Navigation Dock */}
      <MobileBottomDock
        currentView={currentView}
        selectedVehicle={selectedVehicle}
        onNavigate={handleNavigate}
        onBackToInventory={() => handleNavigate('inventory')}
        favoritesCount={favorites.length}
        onOpenFavorites={() => setFavoritesModalOpen(true)}
        onOpenWhispers={() => setWhispersDrawerOpen(true)}
      />

      {/* Global Aristocratic Multi-Column Footer */}
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

      {/* Curated Dossier Modal */}
      <FavoritesModal
        isOpen={favoritesModalOpen}
        onClose={() => setFavoritesModalOpen(false)}
        favorites={favorites}
        vehicles={VEHICLES}
        onToggleFavorite={handleToggleFavorite}
        onSelectVehicle={handleSelectVehicle}
      />

      {/* Whispers Private Concierge Drawer */}
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
