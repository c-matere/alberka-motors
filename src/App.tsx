import React, { useState, useEffect, useMemo } from 'react';
import { VEHICLES, Vehicle } from './data/vehicles';
import { useVehicles } from './hooks/useVehicles';
import { useCmsPages } from './hooks/useCmsPages';
import { useSiteSettings } from './hooks/useSiteSettings';
import { BlogPost, INITIAL_BLOG_POSTS } from './data/blogs';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { VehicleSbtListCard, VehicleSbtListCardSkeleton } from './components/VehicleSbtListCard';
import { VehicleStoryView } from './components/VehicleStoryView';
import { BlogPostView } from './components/BlogPostView';
import { InventorySection } from './components/InventorySection';
import { ModelHubView } from './components/ModelHubView';
import { WorkshopSection } from './components/WorkshopSection';
import { AboutSection } from './components/AboutSection';
import { LocationsSection } from './components/LocationsSection';
import { BlogSection } from './components/BlogSection';
import { SitemapSection } from './components/SitemapSection';
import { SearchModal } from './components/SearchModal';
import { FavoritesModal } from './components/FavoritesModal';
import { WhispersDrawer } from './components/WhispersDrawer';
import { MobileBottomDock } from './components/MobileBottomDock';
import { ScrollToTopButton } from './components/ScrollToTopButton';
import { FloatingWhatsAppButton } from './components/FloatingWhatsAppButton';
import { Footer } from './components/Footer';
import { HelpCenterModal } from './components/HelpCenterModal';
import { TestimonialSectionDemo } from './components/ui/demo';
import { ScrollRevealBox } from './components/ScrollRevealBox';
import { BlueprintBackground } from './components/BlueprintBackground';
import { SectionGradientFade } from './components/SectionGradientFade';
import { ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';

export function App() {
  const { vehicles, isCmsConnected, loading } = useVehicles();
  const { pages } = useCmsPages();
  const { settings } = useSiteSettings();
  const [currentView, setCurrentView] = useState<string>('overview');
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [selectedBlogPost, setSelectedBlogPost] = useState<BlogPost | null>(null);
  const [selectedHubId, setSelectedHubId] = useState<string | null>(null);
  const [testDriveTargetVehicle, setTestDriveTargetVehicle] = useState<Vehicle | null>(null);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [favoritesModalOpen, setFavoritesModalOpen] = useState(false);
  const [whispersDrawerOpen, setWhispersDrawerOpen] = useState(false);
  const [whispersVehicleId, setWhispersVehicleId] = useState<string | undefined>(undefined);
  const [helpCenterOpen, setHelpCenterOpen] = useState(false);
  const [helpCenterInitialTab, setHelpCenterInitialTab] = useState<'faq' | 'policies' | 'contact'>('faq');

  // Favorites state persisted in localStorage
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('alberka_favorites');
      return saved ? JSON.parse(saved) : ['volvo-xc40-r-design-2019', 'toyota-harrier-2020-grey', 'subaru-xv-2019-black', 'toyota-harrier-gr-sport-2019', 'suzuki-every-2019'];
    } catch {
      return ['volvo-xc40-r-design-2019', 'toyota-harrier-2020-grey', 'subaru-xv-2019-black', 'toyota-harrier-gr-sport-2019', 'suzuki-every-2019'];
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
      
      // Car detail page: #car-suzuki-every-2019
      if (hash.startsWith('car-')) {
        const carId = hash.replace('car-', '');
        const found = vehicles.find((v) => v.id === carId);
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

      // Model Hub page: #hub-mazda-cx-5
      if (hash.startsWith('hub-')) {
        const hubId = hash.replace('hub-', '');
        setSelectedHubId(hubId);
        setCurrentView('hub');
        setSelectedVehicle(null);
        setSelectedBlogPost(null);
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }

      // Section views: #overview, #inventory, #workshop, #trade-in, #blog, #about, #locations, #sitemap (with optional sub-target e.g. #about/anti-tampering-policy)
      const hashClean = hash.split('?')[0];
      const [mainSec, subId] = hashClean.split('/');

      if (['overview', 'inventory', 'workshop', 'trade-in', 'blog', 'about', 'locations', 'sitemap'].includes(mainSec)) {
        const targetView = (mainSec === 'locations' || mainSec === 'about') ? 'about' : mainSec === 'trade-in' ? 'inventory' : mainSec;
        setCurrentView(targetView);
        setSelectedVehicle(null);
        setSelectedBlogPost(null);
        setSelectedHubId(null);
        
        const targetElId = subId || (mainSec === 'locations' ? 'about-showroom-location' : null);
        if (targetElId) {
          setTimeout(() => {
            const el = document.getElementById(targetElId);
            if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }, 180);
        }
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [blogs, vehicles]);

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

  // Progressive Gaussian Blur Scroll Reveal for Sections
  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return;

    const timer = setTimeout(() => {
      const sections = document.querySelectorAll('main section');
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-visible');
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
      );

      sections.forEach((sec, idx) => {
        // Keep above-the-fold clear while applying progressive unblur to subsequent sections on scroll
        if (idx > 0 && !sec.classList.contains('is-visible')) {
          sec.classList.add('scroll-reveal');
          observer.observe(sec);
        }
      });
    }, 100);

    return () => clearTimeout(timer);
  }, [currentView, selectedVehicle, selectedBlogPost]);

  const handleNavigate = (view: string, param?: string) => {
    let targetView = view === 'trade-in' ? 'inventory' : view;
    if (targetView === 'locations') targetView = 'about';
    setCurrentView(targetView);
    setSelectedVehicle(null);
    setSelectedBlogPost(null);
    setSelectedHubId(null);
    window.location.hash = param ? `${targetView}/${param}` : targetView;

    if (param) {
      setTimeout(() => {
        const el = document.getElementById(param);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }, 150);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSelectHub = (hubId: string) => {
    setSelectedHubId(hubId);
    setCurrentView('hub');
    setSelectedVehicle(null);
    setSelectedBlogPost(null);
    window.location.hash = `hub-${hubId}`;
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
    setWhispersVehicleId(vehicle.id);
    setWhispersDrawerOpen(true);
  };

  const handleInquireVehicle = (vehicle: Vehicle) => {
    setWhispersVehicleId(vehicle.id);
    setWhispersDrawerOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f7f7f7] text-[#222222] relative font-sans">
      {/* Studio Blueprint & Atmospheric Canvas */}
      <BlueprintBackground />
      
      {/* Clean Single Top Navigation Bar */}
      <Navbar
        currentView={selectedVehicle ? 'inventory' : selectedBlogPost ? 'blog' : currentView}
        onNavigate={handleNavigate}
        favoritesCount={favorites.length}
        onOpenSearch={() => setSearchModalOpen(true)}
        onOpenFavorites={() => setFavoritesModalOpen(true)}
        onOpenWhispers={() => {
          setWhispersVehicleId(selectedVehicle?.id);
          setWhispersDrawerOpen(true);
        }}
      />

      {/* Main View Router */}
      <main key={selectedVehicle?.id || selectedBlogPost?.id || currentView} className="flex-1 view-enter pb-28 md:pb-0 relative z-10">
        {selectedVehicle ? (
          <VehicleStoryView
            vehicle={selectedVehicle}
            allVehicles={vehicles}
            onSelectVehicle={handleSelectVehicle}
            onBackToFleet={() => handleNavigate('inventory')}
            isFavorite={favorites.includes(selectedVehicle.id)}
            onToggleFavorite={handleToggleFavorite}
            onScheduleTestDrive={handleScheduleTestDrive}
            onOpenWhispers={(vid) => {
              setWhispersVehicleId(vid || selectedVehicle.id);
              setWhispersDrawerOpen(true);
            }}
          />
        ) : selectedBlogPost ? (
          <BlogPostView
            post={selectedBlogPost}
            allPosts={blogs}
            allVehicles={vehicles}
            onBackToJournal={() => handleNavigate('blog')}
            onSelectPost={handleSelectBlogPost}
            onSelectVehicle={handleSelectVehicle}
            onOpenWhispers={() => {
              setWhispersDrawerOpen(true);
            }}
          />
        ) : (
          <>
            {currentView === 'overview' && (
              <>
                {/* Hero Showcase */}
                <Hero
                  onExploreFleet={() => handleNavigate('inventory')}
                  onExploreWorkshop={() => handleNavigate('workshop')}
                  pageData={pages['overview']}
                />

                {/* In-Stock Fleet Runway (Direct Access from Hero) */}
                <section className="w-full bg-transparent py-16 sm:py-24 px-4 sm:px-8 relative border-t border-[#ebebeb]">
                  <div className="max-w-[1520px] mx-auto space-y-12 sm:space-y-16 relative z-10">
                    {/* Editorial Intro & Direct Actions (Cleanly Below the Fold) */}
                    <div className="max-w-3xl mx-auto text-center space-y-4">
                      <p className="text-[#6a6a6a] text-sm sm:text-base leading-relaxed">
                        From luxury executive crossovers to rugged symmetrical AWDs and ultra-efficient vans — browse, compare verified auction sheets, and drive away with confidence from Mombasa.
                      </p>
                      <div className="flex flex-wrap items-center justify-center gap-3 pt-1">
                        <button
                          onClick={() => handleNavigate('inventory')}
                          className="py-2.5 px-6 text-xs sm:text-sm rounded-full font-bold bg-[#ff385c] hover:bg-[#e00b41] text-white shadow-xs transition-all hover:scale-105 active:scale-95 inline-flex items-center gap-2 cursor-pointer"
                        >
                          <span>Explore Available Fleet</span>
                          <ArrowRight className="w-4 h-4" />
                        </button>
                        
                        <button
                          onClick={() => handleNavigate('workshop')}
                          className="py-2.5 px-5 text-xs sm:text-sm rounded-full font-semibold text-[#222222] hover:text-black border border-[#ebebeb] hover:border-[#dddddd] bg-white transition-all inline-flex items-center gap-2 cursor-pointer shadow-2xs hover:scale-105 active:scale-95"
                        >
                          <ShieldCheck className="w-4 h-4 text-[#ff385c]" />
                          <span>Our Workshop Standard</span>
                        </button>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-px after:bg-gradient-to-r after:from-[#dddddd] after:via-[#ebebeb] after:to-transparent">
                      <div>
                        <span className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-[#ff385c] block mb-2 font-bold">
                          AVAILABLE FLEET · MOMBASA SHOWROOM STOCK
                        </span>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#222222] tracking-[-0.035em]">
                          Vehicles in Stock
                        </h2>
                      </div>

                      <button
                        onClick={() => handleNavigate('inventory')}
                        className="!text-xs !py-2.5 !px-5 self-start sm:self-auto inline-flex items-center gap-2 shrink-0 cursor-pointer rounded-full border border-[#ebebeb] bg-white hover:bg-[#f7f7f7] text-[#222222] transition-colors"
                      >
                        <span>View Full Collection ({vehicles.length})</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Featured Vehicles List View */}
                    <div className="space-y-4 sm:space-y-5">
                      {loading ? (
                        [...Array(4)].map((_, i) => (
                          <VehicleSbtListCardSkeleton key={i} />
                        ))
                      ) : (
                        vehicles.map((vehicle) => (
                          <VehicleSbtListCard
                            key={vehicle.id}
                            vehicle={vehicle}
                            isFavorite={favorites.includes(vehicle.id)}
                            onToggleFavorite={handleToggleFavorite}
                            onSelect={handleSelectVehicle}
                            onInquire={handleInquireVehicle}
                          />
                        ))
                      )}
                    </div>
                  </div>
                </section>

                {/* Section Gradient Fade Transition */}
                <SectionGradientFade />

                {/* Open Architectural 3-Pillar Provenance Manifesto */}
                <section className="w-full bg-transparent py-20 sm:py-32 px-4 sm:px-8 relative">
                  <div className="max-w-[1240px] mx-auto space-y-16 sm:space-y-24 relative z-10">
                    <div className="max-w-2xl text-left">
                      <span className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-[#6a6a6a] block mb-3 font-semibold">
                        THE ALBERKA COVENANT
                      </span>
                      <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold text-[#222222] tracking-[-0.035em] leading-[1.05]">
                        Three Principles of Provenance.
                      </h2>
                      <p className="text-base sm:text-lg text-[#6a6a6a] mt-4 leading-relaxed font-normal">
                        Every vehicle we import into Kenya undergoes a disciplined, verified journey before keys are handed over.
                      </p>
                    </div>

                    {/* Clean Typographic Triptych with Hairline Dividers */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-0 lg:divide-x lg:divide-[#ebebeb] pt-4">
                      {/* Pillar 01 */}
                      <ScrollRevealBox delay={0}>
                        <div className="space-y-4 lg:pr-12 text-left">
                          <span className="font-mono text-xs text-[#6a6a6a] uppercase tracking-widest block font-semibold">
                            01 · DIRECT SOURCING
                          </span>
                          <h3 className="text-2xl sm:text-3xl font-bold text-[#222222] tracking-tight">
                            Tokyo Auction Selection
                          </h3>
                          <p className="text-sm sm:text-[15px] text-[#6a6a6a] leading-relaxed font-normal">
                            Handpicked directly at USS Tokyo and CAA lanes. Zero intermediaries, verified Japanese auction sheets, and guaranteed JEVIC mileage certificates.
                          </p>
                          <div className="pt-2">
                            <button
                              onClick={() => handleNavigate('about')}
                              className="text-xs font-semibold text-[#222222] hover:text-[#ff385c] inline-flex items-center gap-1.5 transition-colors cursor-pointer group"
                            >
                              <span>Our sourcing process</span>
                              <ArrowRight className="w-3.5 h-3.5 text-[#6a6a6a] group-hover:translate-x-1 transition-transform" />
                            </button>
                          </div>
                        </div>
                      </ScrollRevealBox>

                      {/* Pillar 02 */}
                      <ScrollRevealBox delay={75}>
                        <div className="space-y-4 lg:px-12 text-left pt-8 lg:pt-0 border-t lg:border-t-0 border-[#ebebeb]">
                          <span className="font-mono text-xs text-[#6a6a6a] uppercase tracking-widest block font-semibold">
                            02 · PREPARATION
                          </span>
                          <h3 className="text-2xl sm:text-3xl font-bold text-[#222222] tracking-tight">
                            100-Point Technical Overhaul
                          </h3>
                          <p className="text-sm sm:text-[15px] text-[#6a6a6a] leading-relaxed font-normal">
                            100-point pre-delivery inspection at Tangana Road. Castrol Edge synthetic lubricants, OEM filtration, full computerized diagnostics, and suspension recalibration.
                          </p>
                          <div className="pt-2">
                            <button
                              onClick={() => handleNavigate('workshop')}
                              className="text-xs font-semibold text-[#222222] hover:text-[#ff385c] inline-flex items-center gap-1.5 transition-colors cursor-pointer group"
                            >
                              <span>Workshop standards</span>
                              <ArrowRight className="w-3.5 h-3.5 text-[#6a6a6a] group-hover:translate-x-1 transition-transform" />
                            </button>
                          </div>
                        </div>
                      </ScrollRevealBox>

                      {/* Pillar 03 */}
                      <ScrollRevealBox delay={150}>
                        <div className="space-y-4 lg:pl-12 text-left pt-8 lg:pt-0 border-t lg:border-t-0 border-[#ebebeb]">
                          <span className="font-mono text-xs text-[#6a6a6a] uppercase tracking-widest block font-semibold">
                            03 · VERIFICATION
                          </span>
                          <h3 className="text-2xl sm:text-3xl font-bold text-[#222222] tracking-tight">
                            Japanese Export Dossier
                          </h3>
                          <p className="text-sm sm:text-[15px] text-[#6a6a6a] leading-relaxed font-normal">
                            Original Japanese export certificate, verified QISJ/JEVIC odometer certification, and translated auction inspection sheet delivered with your logbook.
                          </p>
                          <div className="pt-2">
                            <button
                              onClick={() => handleNavigate('about')}
                              className="text-xs font-semibold text-[#222222] hover:text-[#ff385c] inline-flex items-center gap-1.5 transition-colors cursor-pointer group"
                            >
                              <span>Verification standards</span>
                              <ArrowRight className="w-3.5 h-3.5 text-[#6a6a6a] group-hover:translate-x-1 transition-transform" />
                            </button>
                          </div>
                        </div>
                      </ScrollRevealBox>
                    </div>
                  </div>
                </section>

                {/* Verified Customer Testimonials Section */}
                <div id="customer-reviews" className="scroll-mt-24">
                  <TestimonialSectionDemo />
                </div>

                {/* Section Gradient Fade Transition */}
                <SectionGradientFade />

                {/* Official Showroom Dispatch */}
                <section className="w-full bg-transparent py-20 sm:py-32 px-4 sm:px-8 relative">
                  <div className="max-w-[1240px] mx-auto space-y-16 relative z-10">
                    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-px after:bg-gradient-to-r after:from-[#dddddd] after:via-[#ebebeb] after:to-transparent">
                      <div>
                        <span className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-[#ff385c] block mb-2 font-bold">
                          OFFICIAL SHOWROOM & WORKSHOP
                        </span>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#222222] tracking-[-0.035em]">
                          Visit Our Showroom
                        </h2>
                      </div>

                      <button
                        onClick={() => handleNavigate('locations')}
                        className="!text-xs !py-2.5 !px-5 self-start sm:self-auto inline-flex items-center gap-2 shrink-0 cursor-pointer rounded-full border border-[#ebebeb] bg-white hover:bg-[#f7f7f7] text-[#222222] transition-colors"
                      >
                        <span>Interactive Map & Directions</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="max-w-2xl text-left">
                      <ScrollRevealBox delay={0}>
                        <div className="space-y-4 bg-white border border-[#ebebeb] rounded-[16px] p-6 sm:p-8 shadow-[0_1px_2px_rgba(0,0,0,0.08),0_4px_12px_rgba(0,0,0,0.05)]">
                          <span className="font-mono text-xs text-[#222222] uppercase tracking-widest block font-semibold">
                            MOMBASA MAIN HUB
                          </span>
                          <h3 className="text-2xl sm:text-3xl font-semibold text-[#222222] tracking-tight">
                            Next to Ganjoni Primary School, Mombasa
                          </h3>
                          <p className="text-sm sm:text-base text-[#6a6a6a] leading-relaxed font-normal">
                            Featuring our dedicated customer showroom floor, hoist inspection bays, and certified Japanese import maintenance workshop.
                          </p>
                          <div className="pt-2 font-mono text-xs text-[#6a6a6a] space-y-1.5 border-t border-[#ebebeb]">
                            <p>Direct Phone / WhatsApp: <a href="tel:0180423075" className="text-[#222222] font-semibold hover:underline">0180 423 075</a></p>
                            <p>Showroom Hours: <span className="text-[#222222] font-medium">{settings.workingHours || 'Mon – Sat: 8:00 AM – 6:00 PM'}</span></p>
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
                vehicles={vehicles}
                favorites={favorites}
                onToggleFavorite={handleToggleFavorite}
                onSelectVehicle={handleSelectVehicle}
                onInquire={handleInquireVehicle}
                onCustomImportRequest={() => handleNavigate('about')}
                isLoading={loading}
                pageData={pages['inventory']}
              />
            )}

            {currentView === 'workshop' && <WorkshopSection pageData={pages['workshop']} />}

            {currentView === 'blog' && (
              <BlogSection
                blogs={blogs}
                onSelectPost={handleSelectBlogPost}
                onAddPost={handleAddBlogPost}
                onNavigateHome={() => handleNavigate('overview')}
                onNavigateInventory={() => handleNavigate('inventory')}
              />
            )}

            {(currentView === 'about' || currentView === 'locations') && (
              <AboutSection
                onExploreFleet={() => handleNavigate('inventory')}
                onExploreLocations={() => {
                  const el = document.getElementById('about-showroom-location');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                pageData={pages['about']}
                settings={settings}
                vehicles={vehicles}
              />
            )}

            {currentView === 'sitemap' && (
              <SitemapSection
                vehicles={vehicles}
                onNavigate={handleNavigate}
                onSelectVehicle={handleSelectVehicle}
              />
            )}
          </>
        )}
      </main>

      {/* Floating Scroll to Top Action Button */}
      <ScrollToTopButton />

      {/* Floating WhatsApp Action Button */}
      <FloatingWhatsAppButton
        onOpenWhispers={() => {
          setWhispersVehicleId(selectedVehicle?.id);
          setWhispersDrawerOpen(true);
        }}
      />

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
        onOpenWhispers={() => {
          setWhispersVehicleId(selectedVehicle?.id);
          setWhispersDrawerOpen(true);
        }}
      />

      {/* Footer */}
      <Footer
        vehicles={vehicles}
        onNavigate={handleNavigate}
        onSelectVehicle={handleSelectVehicle}
        onOpenHelpCenter={(tab) => {
          setHelpCenterInitialTab(tab || 'faq');
          setHelpCenterOpen(true);
        }}
        settings={settings}
      />

      {/* Help Center & Policies Modal */}
      <HelpCenterModal
        isOpen={helpCenterOpen}
        onClose={() => setHelpCenterOpen(false)}
        initialTab={helpCenterInitialTab}
        settings={settings}
      />

      {/* Search Palette */}
      <SearchModal
        isOpen={searchModalOpen}
        onClose={() => setSearchModalOpen(false)}
        vehicles={vehicles}
        onSelectVehicle={handleSelectVehicle}
      />

      {/* Favorites Modal */}
      <FavoritesModal
        isOpen={favoritesModalOpen}
        onClose={() => setFavoritesModalOpen(false)}
        favorites={favorites}
        vehicles={vehicles}
        onToggleFavorite={handleToggleFavorite}
        onSelectVehicle={handleSelectVehicle}
        onBrowseFleet={() => handleNavigate('inventory')}
      />

      {/* WhatsApp / Concierge Contact Drawer */}
      <WhispersDrawer
        isOpen={whispersDrawerOpen}
        onClose={() => {
          setWhispersDrawerOpen(false);
          setWhispersVehicleId(undefined);
        }}
        initialVehicleId={whispersVehicleId || selectedVehicle?.id}
        vehicles={vehicles}
        onSelectVehicle={handleSelectVehicle}
      />

    </div>
  );
}

export default App;

