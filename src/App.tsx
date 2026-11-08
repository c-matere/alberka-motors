import React, { useState, useEffect } from 'react';
import { VEHICLES, Vehicle } from './data/vehicles';
import { BlogPost, INITIAL_BLOG_POSTS } from './data/blogs';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { VehicleCard } from './components/VehicleCard';
import { VehicleStoryView } from './components/VehicleStoryView';
import { BlogPostView } from './components/BlogPostView';
import { InventorySection } from './components/InventorySection';
import { WorkshopSection } from './components/WorkshopSection';
import { TradeInSection } from './components/TradeInSection';
import { AboutSection } from './components/AboutSection';
import { LocationsSection } from './components/LocationsSection';
import { BlogSection } from './components/BlogSection';
import { SitemapSection } from './components/SitemapSection';
import { SearchModal } from './components/SearchModal';
import { FavoritesModal } from './components/FavoritesModal';
import { WhispersDrawer } from './components/WhispersDrawer';
import { MobileBottomDock } from './components/MobileBottomDock';
import { ScrollToTopButton } from './components/ScrollToTopButton';
import { Footer } from './components/Footer';
import { ScrollRevealBox } from './components/ScrollRevealBox';
import { BlueprintBackground } from './components/BlueprintBackground';
import { SectionGradientFade } from './components/SectionGradientFade';
import { ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';

export function App() {
  const [currentView, setCurrentView] = useState<string>('overview');
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [selectedBlogPost, setSelectedBlogPost] = useState<BlogPost | null>(null);
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

  // Blogs state persisted in localStorage
  const [blogs, setBlogs] = useState<BlogPost[]>(() => {
    try {
      const saved = localStorage.getItem('alberka_blogs');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {}
    return INITIAL_BLOG_POSTS;
  });

  useEffect(() => {
    try {
      localStorage.setItem('alberka_blogs', JSON.stringify(blogs));
    } catch {}
  }, [blogs]);

  // URL Hash Sync for Browser Navigation
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      
      // Car detail page: #car-toyota-harrier-hybrid
      if (hash.startsWith('car-')) {
        const carId = hash.replace('car-', '');
        const found = VEHICLES.find((v) => v.id === carId);
        if (found) {
          setSelectedVehicle(found);
          setSelectedBlogPost(null);
          window.scrollTo({ top: 0, behavior: 'smooth' });
          return;
        }
      }

      // Blog detail item page: #blog-uss-tokyo-auction-sheet-guide
      if (hash.startsWith('blog-')) {
        const blogSlug = hash.replace('blog-', '');
        const foundBlog = blogs.find((b) => b.slug === blogSlug || b.id === blogSlug);
        if (foundBlog) {
          setSelectedBlogPost(foundBlog);
          setSelectedVehicle(null);
          window.scrollTo({ top: 0, behavior: 'smooth' });
          return;
        }
      }

      // Section views: #overview, #inventory, #workshop, #trade-in, #blog, #about, #locations, #sitemap
      if (['overview', 'inventory', 'workshop', 'trade-in', 'blog', 'about', 'locations', 'sitemap'].includes(hash)) {
        setCurrentView(hash);
        setSelectedVehicle(null);
        setSelectedBlogPost(null);
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [blogs]);

  // Global Keyboard Shortcuts (Cmd+K / Ctrl+K search, Escape modal dismissal, Slash shortcut)
  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setSearchModalOpen((prev) => !prev);
        return;
      }
      if (e.key === '/' && !['INPUT', 'TEXTAREA', 'SELECT'].includes((e.target as HTMLElement)?.tagName)) {
        e.preventDefault();
        setSearchModalOpen(true);
        return;
      }
      if (e.key === 'Escape') {
        setSearchModalOpen(false);
        setFavoritesModalOpen(false);
        setWhispersDrawerOpen(false);
      }
    };

    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, []);

  const handleNavigate = (view: string) => {
    setCurrentView(view);
    setSelectedVehicle(null);
    setSelectedBlogPost(null);
    window.location.hash = view;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectVehicle = (vehicle: Vehicle) => {
    setSelectedVehicle(vehicle);
    setSelectedBlogPost(null);
    window.location.hash = `car-${vehicle.id}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectBlogPost = (post: BlogPost) => {
    setSelectedBlogPost(post);
    setSelectedVehicle(null);
    window.location.hash = `blog-${post.slug}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAddBlogPost = (newPost: BlogPost) => {
    setBlogs((prev) => [newPost, ...prev]);
  };

  const handleToggleFavorite = (id: string) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleScheduleTestDrive = (vehicle: Vehicle) => {
    setTestDriveTargetVehicle(vehicle);
    setSelectedVehicle(null);
    setSelectedBlogPost(null);
    setCurrentView('locations');
    window.location.hash = 'locations';
    window.scrollTo({ top: 600, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#09090b] text-[#f4f4f5] relative">
      {/* Studio Blueprint & Atmospheric Canvas */}
      <BlueprintBackground />
      
      {/* Clean Single Top Navigation Bar */}
      <Navbar
        currentView={selectedVehicle ? 'inventory' : selectedBlogPost ? 'blog' : currentView}
        onNavigate={handleNavigate}
        favoritesCount={favorites.length}
        onOpenSearch={() => setSearchModalOpen(true)}
        onOpenFavorites={() => setFavoritesModalOpen(true)}
        onOpenWhispers={() => setWhispersDrawerOpen(true)}
      />

      {/* Main View Router */}
      <main key={selectedVehicle?.id || selectedBlogPost?.id || currentView} className="flex-1 view-enter pb-28 md:pb-0 relative z-10">
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
        ) : selectedBlogPost ? (
          <BlogPostView
            post={selectedBlogPost}
            allPosts={blogs}
            allVehicles={VEHICLES}
            onBackToJournal={() => handleNavigate('blog')}
            onSelectPost={handleSelectBlogPost}
            onSelectVehicle={handleSelectVehicle}
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
                <section className="w-full bg-transparent py-24 sm:py-36 px-4 sm:px-8 relative">
                  {/* Atmospheric Top & Bottom Black Gradient Fades */}
                  <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[#09090c] to-transparent pointer-events-none" />
                  <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#09090c] to-transparent pointer-events-none" />

                  <div className="max-w-[1240px] mx-auto space-y-12 sm:space-y-16 relative z-10">
                    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-px after:bg-gradient-to-r after:from-white/15 after:via-white/5 after:to-transparent">
                      <div>
                        <span className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-zinc-400 block mb-2">
                          AVAILABLE FLEET · MOMBASA & NAIROBI
                        </span>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-[-0.035em]">
                          Vehicles in Stock
                        </h2>
                      </div>

                      <button
                        onClick={() => handleNavigate('inventory')}
                        className="btn-ghost !text-xs !py-2.5 !px-5 self-start sm:self-auto inline-flex items-center gap-2 shrink-0 cursor-pointer"
                      >
                        <span>View Full Collection ({VEHICLES.length})</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Expansive 2x2 Exhibition Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12">
                      {VEHICLES.map((vehicle, idx) => (
                        <VehicleCard
                          key={vehicle.id}
                          vehicle={vehicle}
                          isFavorite={favorites.includes(vehicle.id)}
                          onToggleFavorite={handleToggleFavorite}
                          onSelect={handleSelectVehicle}
                          staggerIndex={idx}
                        />
                      ))}
                    </div>
                  </div>
                </section>

                {/* Section Gradient Fade Transition */}
                <SectionGradientFade />

                {/* Open Architectural 3-Pillar Provenance Manifesto */}
                <section className="w-full bg-[#070709]/40 backdrop-blur-[2px] py-28 sm:py-40 px-4 sm:px-8 relative">
                  {/* Atmospheric Top & Bottom Black Gradient Fades */}
                  <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[#09090c] to-transparent pointer-events-none" />
                  <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#09090c] to-transparent pointer-events-none" />

                  <div className="max-w-[1240px] mx-auto space-y-16 sm:space-y-24 relative z-10">
                    <div className="max-w-2xl text-left">
                      <span className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-zinc-400 block mb-3">
                        THE ALBERKA COVENANT
                      </span>
                      <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold text-white tracking-[-0.035em] leading-[1.05]">
                        Three Principles of Provenance.
                      </h2>
                      <p className="text-base sm:text-lg text-zinc-400 mt-4 leading-relaxed font-normal">
                        Every vehicle we import into Kenya undergoes a disciplined, verified journey before keys are handed over.
                      </p>
                    </div>

                    {/* Clean Typographic Triptych with Hairline Dividers */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-0 lg:divide-x lg:divide-white/[0.08] pt-4">
                      {/* Pillar 01 */}
                      <ScrollRevealBox delay={0}>
                        <div className="space-y-4 lg:pr-12 text-left">
                          <span className="font-mono text-xs text-zinc-400 uppercase tracking-widest block font-semibold">
                            01 · DIRECT SOURCING
                          </span>
                          <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                            Tokyo Auction Selection
                          </h3>
                          <p className="text-sm sm:text-[15px] text-zinc-400 leading-relaxed font-normal">
                            Handpicked directly at USS Tokyo and CAA lanes. Zero intermediaries, verified Japanese auction sheets, and guaranteed JEVIC mileage certificates.
                          </p>
                          <div className="pt-2">
                            <button
                              onClick={() => handleNavigate('about')}
                              className="text-xs font-semibold text-zinc-300 hover:text-white inline-flex items-center gap-1.5 transition-colors cursor-pointer group"
                            >
                              <span>Our sourcing process</span>
                              <ArrowRight className="w-3.5 h-3.5 text-zinc-400 group-hover:translate-x-1 transition-transform" />
                            </button>
                          </div>
                        </div>
                      </ScrollRevealBox>

                      {/* Pillar 02 */}
                      <ScrollRevealBox delay={75}>
                        <div className="space-y-4 lg:px-12 text-left pt-8 lg:pt-0 border-t lg:border-t-0 border-white/[0.08]">
                          <span className="font-mono text-xs text-zinc-400 uppercase tracking-widest block font-semibold">
                            02 · PREPARATION
                          </span>
                          <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                            Mombasa Technical Overhaul
                          </h3>
                          <p className="text-sm sm:text-[15px] text-zinc-400 leading-relaxed font-normal">
                            100-point pre-delivery inspection at Tangana Road. Castrol Edge synthetic lubricants, OEM filtration, full computerized diagnostics, and suspension recalibration.
                          </p>
                          <div className="pt-2">
                            <button
                              onClick={() => handleNavigate('workshop')}
                              className="text-xs font-semibold text-zinc-300 hover:text-white inline-flex items-center gap-1.5 transition-colors cursor-pointer group"
                            >
                              <span>Workshop standards</span>
                              <ArrowRight className="w-3.5 h-3.5 text-zinc-400 group-hover:translate-x-1 transition-transform" />
                            </button>
                          </div>
                        </div>
                      </ScrollRevealBox>

                      {/* Pillar 03 */}
                      <ScrollRevealBox delay={150}>
                        <div className="space-y-4 lg:pl-12 text-left pt-8 lg:pt-0 border-t lg:border-t-0 border-white/[0.08]">
                          <span className="font-mono text-xs text-zinc-400 uppercase tracking-widest block font-semibold">
                            03 · INTEGRITY
                          </span>
                          <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                            5,000 KM Written Warranty
                          </h3>
                          <p className="text-sm sm:text-[15px] text-zinc-400 leading-relaxed font-normal">
                            Written dealer warranty covering engine and drivetrain, backed directly by our in-house Mombasa mechanical team and Nairobi partner stations.
                          </p>
                          <div className="pt-2">
                            <button
                              onClick={() => handleNavigate('workshop')}
                              className="text-xs font-semibold text-zinc-300 hover:text-white inline-flex items-center gap-1.5 transition-colors cursor-pointer group"
                            >
                              <span>Warranty terms</span>
                              <ArrowRight className="w-3.5 h-3.5 text-zinc-400 group-hover:translate-x-1 transition-transform" />
                            </button>
                          </div>
                        </div>
                      </ScrollRevealBox>
                    </div>
                  </div>
                </section>

                {/* Section Gradient Fade Transition */}
                <SectionGradientFade />

                {/* Serene Showrooms Dispatch (Mombasa & Nairobi) */}
                <section className="w-full bg-transparent py-28 sm:py-36 px-4 sm:px-8 relative">
                  {/* Atmospheric Top & Bottom Black Gradient Fades */}
                  <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[#09090c] to-transparent pointer-events-none" />
                  <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#09090c] to-transparent pointer-events-none" />

                  <div className="max-w-[1240px] mx-auto space-y-16 relative z-10">
                    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-px after:bg-gradient-to-r after:from-white/15 after:via-white/5 after:to-transparent">
                      <div>
                        <span className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-zinc-400 block mb-2">
                          PRIVATE APPOINTMENTS & INSPECTIONS
                        </span>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-[-0.035em]">
                          Our Showrooms
                        </h2>
                      </div>

                      <button
                        onClick={() => handleNavigate('locations')}
                        className="btn-ghost !text-xs !py-2.5 !px-5 self-start sm:self-auto inline-flex items-center gap-2 shrink-0 cursor-pointer"
                      >
                        <span>Interactive Maps & Directions</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 sm:gap-16 text-left">
                      {/* Mombasa */}
                      <ScrollRevealBox delay={0}>
                        <div className="space-y-4">
                          <span className="font-mono text-xs text-zinc-400 uppercase tracking-widest block font-semibold">
                            MOMBASA FLAGSHIP & WORKSHOP
                          </span>
                          <h3 className="text-2xl sm:text-3xl font-bold text-white">
                            Tangana Road, Majengo
                          </h3>
                          <p className="text-sm sm:text-base text-zinc-400 leading-relaxed font-normal">
                            Opposite AutoXpress / Near Railway Station. Featuring our primary showroom floor, hoist inspection bays, and dedicated Japanese import workshop.
                          </p>
                          <div className="pt-2 font-mono text-xs text-zinc-400 space-y-1">
                            <p>Direct: <span className="text-white">0714 333 888 / 0737 333 888</span></p>
                            <p>Hours: <span className="text-zinc-300">Mon - Sat · 8:00 AM - 6:00 PM</span></p>
                          </div>
                        </div>
                      </ScrollRevealBox>

                      {/* Nairobi */}
                      <ScrollRevealBox delay={75}>
                        <div className="space-y-4">
                          <span className="font-mono text-xs text-zinc-400 uppercase tracking-widest block font-semibold">
                            NAIROBI CONSULTATION SALON
                          </span>
                          <h3 className="text-2xl sm:text-3xl font-bold text-white">
                            Mwanzi Road, Westlands
                          </h3>
                          <p className="text-sm sm:text-base text-zinc-400 leading-relaxed font-normal">
                            Centrally situated in Westlands for convenient private viewings, trade-in valuations, and concierge vehicle deliveries across Nairobi.
                          </p>
                          <div className="pt-2 font-mono text-xs text-zinc-400 space-y-1">
                            <p>Direct: <span className="text-white">0748 999 333</span></p>
                            <p>Hours: <span className="text-zinc-300">Mon - Sat · 8:30 AM - 5:30 PM</span></p>
                          </div>
                        </div>
                      </ScrollRevealBox>
                    </div>
                  </div>
                </section>

                {/* Section Gradient Fade Transition into Footer */}
                <SectionGradientFade />
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

            {currentView === 'blog' && (
              <BlogSection
                blogs={blogs}
                onSelectPost={handleSelectBlogPost}
                onAddPost={handleAddBlogPost}
                onNavigateHome={() => handleNavigate('overview')}
                onNavigateInventory={() => handleNavigate('inventory')}
              />
            )}

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

      {/* Floating Scroll to Top Action Button */}
      <ScrollToTopButton />

      {/* Mobile Bottom Dock */}
      <MobileBottomDock
        currentView={selectedBlogPost ? 'blog' : currentView}
        selectedVehicle={selectedVehicle}
        selectedBlogPost={selectedBlogPost}
        onNavigate={handleNavigate}
        onBackToInventory={() => handleNavigate('inventory')}
        onBackToJournal={() => handleNavigate('blog')}
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
        onBrowseFleet={() => handleNavigate('inventory')}
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

