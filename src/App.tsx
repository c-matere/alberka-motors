import React, { useState, useEffect, useMemo } from 'react';
import { VEHICLES, Vehicle } from './data/vehicles';
import { useVehicles } from './hooks/useVehicles';
import { useCmsPages } from './hooks/useCmsPages';
import { useSiteSettings } from './hooks/useSiteSettings';
import { BlogPost, INITIAL_BLOG_POSTS } from './data/blogs';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import type { HeroSearchFilters } from './components/Hero';
import { Toaster, dynaura } from 'dynaura';
import { VehicleCard, VehicleCardSkeleton } from './components/VehicleCard';
import { VehicleSbtListCard, VehicleSbtListCardSkeleton } from './components/VehicleSbtListCard';
import { VehicleStoryView } from './components/VehicleStoryView';
import { BlogPostView } from './components/BlogPostView';
import { InventorySection } from './components/InventorySection';
import { ModelHubView } from './components/ModelHubView';
import { WorkshopSection } from './components/WorkshopSection';
import { ShowroomMapHub } from './components/ShowroomMapHub';
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
import {
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  Building2,
  MapPin,
  Car
} from 'lucide-react';

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
  const [heroFilters, setHeroFilters] = useState<HeroSearchFilters | null>(null);

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

      // Section views: #overview, #inventory, #workshop, #blog, #about, #locations, #sitemap (with optional sub-target e.g. #about/anti-tampering-policy)
      const hashClean = hash.split('?')[0];
      const [mainSec, subId] = hashClean.split('/');

      if (['overview', 'inventory', 'workshop', 'blog', 'about', 'locations', 'sitemap'].includes(mainSec)) {
        const targetView = (mainSec === 'locations' || mainSec === 'about') ? 'about' : mainSec;
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
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>('main section')
    ).filter((sec) => !sec.hasAttribute('data-no-reveal'));

    const reveal = (el: Element) => el.classList.add('is-visible');

    if (typeof IntersectionObserver === 'undefined') {
      sections.forEach(reveal);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            reveal(entry.target);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.05, rootMargin: '0px 0px -5% 0px' }
    );

    const raf = requestAnimationFrame(() => {
      sections.forEach((sec) => {
        if (sec.classList.contains('is-visible')) return;

        // Anything already on screen is shown instantly — no blur flash on load
        // or when a hash link jumps straight to a deep section.
        const rect = sec.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          reveal(sec);
          return;
        }

        sec.classList.add('scroll-reveal');
        observer.observe(sec);
      });
    });

    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
    };
  }, [currentView, selectedVehicle, selectedBlogPost]);

  const handleNavigate = (view: string, param?: string, keepFilters = false) => {
    if (!keepFilters) setHeroFilters(null);
    let targetView = view === 'locations' ? 'about' : view;
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
    const isAdding = !favorites.includes(id);
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
    dynaura.success({
      title: isAdding ? 'Saved to favorites' : 'Removed from favorites',
      description: isAdding
        ? 'Open the saved list from the heart icon in the header.'
        : 'The vehicle has been removed from your saved list.',
    });
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
    <div className="min-h-screen flex flex-col bg-[#f7f7f7] text-[#222222] relative font-sans w-full max-w-full overflow-x-clip">
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
      <main key={selectedVehicle?.id || selectedBlogPost?.id || currentView} className="flex-1 view-enter pb-28 md:pb-0 relative z-10 w-full max-w-full overflow-x-clip">
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
                  onSearchQuery={(filters) => {
                    setHeroFilters(filters);
                    handleNavigate('inventory', undefined, true);
                  }}
                  pageData={pages['overview']}
                />

                {/* Visual Category Discovery Bar (Sticky Airbnb Pill Bar) */}
                <div className="w-full bg-white border-y border-[#ebebeb] sticky top-20 z-20 shadow-2xs backdrop-blur-md bg-white/95">
                  <div className="max-w-[1520px] mx-auto px-4 sm:px-8 py-3 overflow-x-auto no-scrollbar flex items-center justify-start sm:justify-center gap-2 sm:gap-3 text-xs">
                    {[
                      { label: 'All Stock', tag: 'all', count: vehicles.length },
                      { label: 'Symmetrical AWD', tag: 'awd', count: vehicles.filter(v => v.drivetrain?.toLowerCase().includes('awd') || v.drivetrain?.toLowerCase().includes('4wd')).length },
                      { label: '7–8 Seater MPVs', tag: 'mpv', count: vehicles.filter(v => (v.seating && v.seating >= 7) || v.bodyType?.toLowerCase().includes('van')).length },
                      { label: 'Compact SUVs', tag: 'suv', count: vehicles.filter(v => v.bodyType?.toLowerCase().includes('suv') || v.bodyType?.toLowerCase().includes('crossover')).length },
                      { label: 'Hybrid & Fuel Savers', tag: 'hybrid', count: vehicles.filter(v => v.fuelType?.toLowerCase().includes('hybrid') || v.engine?.toLowerCase().includes('hybrid')).length },
                      { label: 'Under KES 2.5M', tag: 'budget', count: vehicles.filter(v => v.price < 2500000).length },
                      { label: 'Custom Tokyo Import', tag: 'tokyo-order', isSpecial: true },
                    ].map((cat, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          if (cat.isSpecial) {
                            const el = document.getElementById('custom-tokyo-import');
                            if (el) el.scrollIntoView({ behavior: 'smooth' });
                            else handleNavigate('about');
                          } else {
                            handleNavigate('inventory');
                          }
                        }}
                        className={`px-3.5 py-1.5 rounded-full font-medium transition-all shrink-0 cursor-pointer flex items-center gap-1.5 ${
                          idx === 0
                            ? 'bg-[#222222] text-white shadow-2xs'
                            : 'bg-[#f7f7f7] hover:bg-[#ebebeb] text-[#222222] border border-transparent hover:border-[#dddddd]'
                        }`}
                      >
                        <span>{cat.label}</span>
                        {cat.count !== undefined && cat.count > 0 && (
                          <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${idx === 0 ? 'bg-white/20 text-white' : 'bg-black/5 text-[#6a6a6a]'}`}>
                            {cat.count}
                          </span>
                        )}
                        {cat.isSpecial && (
                          <Sparkles className="w-3 h-3 text-[#DC2626]" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Curated In-Stock Fleet Runway (Airbnb 4-Card Grid) */}
                <section className="w-full bg-transparent py-12 sm:py-16 px-4 sm:px-8 relative">
                  <div className="max-w-[1520px] mx-auto space-y-8 relative z-10">
                    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-[#ebebeb]">
                      <div>
                        <span className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-[#DC2626] block mb-1.5 font-bold">
                          MOMBASA SHOWROOM · VERIFIED STOCK
                        </span>
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#222222] tracking-[-0.03em]">
                          Recently Landed in Mombasa
                        </h2>
                        <p className="text-xs sm:text-sm text-[#6a6a6a] mt-1 font-normal">
                          Duty-paid, original Japanese auction sheets, genuine QISJ/JEVIC odometers, and ready for handover.
                        </p>
                      </div>

                      <button
                        onClick={() => handleNavigate('inventory')}
                        className="text-xs py-2 px-4.5 self-start sm:self-auto inline-flex items-center gap-1.5 shrink-0 cursor-pointer rounded-full border border-[#ebebeb] bg-white hover:bg-[#f7f7f7] text-[#222222] font-semibold transition-all shadow-2xs hover:shadow-xs hover:border-[#dddddd]"
                      >
                        <span>View Full Collection ({vehicles.length})</span>
                        <ArrowRight className="w-3.5 h-3.5 text-[#6a6a6a]" />
                      </button>
                    </div>

                    {/* 4-Card Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                      {loading ? (
                        [...Array(4)].map((_, i) => (
                          <VehicleCardSkeleton key={i} />
                        ))
                      ) : (
                        vehicles.slice(0, 4).map((vehicle, idx) => (
                          <VehicleCard
                            key={vehicle.id}
                            vehicle={vehicle}
                            isFavorite={favorites.includes(vehicle.id)}
                            onToggleFavorite={handleToggleFavorite}
                            onSelect={handleSelectVehicle}
                            onInquire={handleInquireVehicle}
                            staggerIndex={idx}
                          />
                        ))
                      )}
                    </div>

                    <div className="text-center pt-2">
                      <button
                        onClick={() => handleNavigate('inventory')}
                        className="py-3 px-8 text-xs sm:text-sm rounded-full font-bold bg-[#222222] hover:bg-black text-white shadow-xs transition-all hover:scale-102 active:scale-98 inline-flex items-center gap-2 cursor-pointer"
                      >
                        <span>Explore All {vehicles.length} Vehicles in Stock</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </section>

                {/* Custom Japanese Auction Import Workflow */}
                <section id="custom-tokyo-import" className="w-full bg-[#fbfbfb] py-16 sm:py-24 px-4 sm:px-8 border-y border-[#ebebeb] relative">
                  <div className="max-w-[1520px] mx-auto space-y-12 sm:space-y-16 relative z-10">
                    <div className="max-w-2xl text-left">
                      <span className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-[#DC2626] block mb-2 font-bold">
                        DIRECT JAPANESE AUCTION SOURCING
                      </span>
                      <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#222222] tracking-[-0.035em]">
                        Can’t Find Your Exact Model? Import on Order.
                      </h2>
                      <p className="text-sm sm:text-base text-[#6a6a6a] mt-3 leading-relaxed">
                        Access over 150,000+ weekly live vehicles across USS Tokyo, USS Yokohama, CAA, and TAA lanes. We bid, inspect, ship to Mombasa, and clear KRA duty for you.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                      {[
                        {
                          step: '01',
                          title: 'Auction Lane Scout',
                          desc: 'Specify your exact chassis, grade (4.0+), mileage cap, and interior color across USS Tokyo & CAA.',
                          tag: '150,000+ Cars / Week',
                        },
                        {
                          step: '02',
                          title: 'Live Auction Translation',
                          desc: 'Our Tokyo partners translate the Japanese inspection sheet line-by-line and verify genuine JEVIC mileage.',
                          tag: 'Zero Accident Risk',
                        },
                        {
                          step: '03',
                          title: 'Ro-Ro Marine Freight',
                          desc: 'Insured Roll-on/Roll-off shipping from Yokohama/Nagoya directly to Kilindini Harbour, Mombasa in 28–35 days.',
                          tag: 'Port-to-Port Tracking',
                        },
                        {
                          step: '04',
                          title: 'KRA Clearance & Delivery',
                          desc: 'Full duty payment, NTSA number plates, 100-point workshop preparation, and Mombasa showroom handover.',
                          tag: 'Turnkey Handover',
                        },
                      ].map((card, i) => (
                        <div
                          key={i}
                          className="bg-white rounded-[16px] border border-[#ebebeb] p-6 text-left shadow-[0_1px_2px_rgba(0,0,0,0.08),0_4px_12px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.12)] hover:-translate-y-0.5 transition-all flex flex-col justify-between"
                        >
                          <div>
                            <div className="flex items-center justify-between mb-4">
                              <span className="font-mono text-2xl font-bold text-[#222222]/30">{card.step}</span>
                              <span className="text-[10px] font-mono font-medium px-2 py-0.5 rounded-full bg-[#f7f7f7] text-[#6a6a6a] border border-[#ebebeb]">
                                {card.tag}
                              </span>
                            </div>
                            <h3 className="text-lg font-bold text-[#222222] mb-2">{card.title}</h3>
                            <p className="text-xs sm:text-[13px] text-[#6a6a6a] leading-relaxed">{card.desc}</p>
                          </div>
                          <div className="pt-4 mt-4 border-t border-[#f0f0f0] flex items-center justify-between text-xs">
                            <span className="text-[#6a6a6a] font-mono text-[11px]">Direct from Japan</span>
                            <CheckCircle2 className="w-4 h-4 text-[#222222]" />
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Custom Sourcing Callout Banner */}
                    <div className="bg-white rounded-[16px] border border-[#ebebeb] p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 shadow-[0_1px_2px_rgba(0,0,0,0.08),0_4px_12px_rgba(0,0,0,0.05)]">
                      <div className="space-y-1.5 text-left">
                        <h4 className="text-lg sm:text-xl font-bold text-[#222222]">
                          Want an Instant CIF Mombasa & Duty Quote?
                        </h4>
                        <p className="text-xs sm:text-sm text-[#6a6a6a] max-w-xl">
                          Tell us the vehicle make, year, and target budget. Our import specialists calculate the current KRA CRSP duty schedule and deliver an all-inclusive quotation.
                        </p>
                      </div>

                      <div className="flex flex-wrap items-center gap-3 shrink-0">
                        <button
                          onClick={() => {
                            setWhispersVehicleId(undefined);
                            setWhispersDrawerOpen(true);
                          }}
                          className="py-2.5 px-6 rounded-full font-bold bg-[#222222] hover:bg-black text-white text-xs sm:text-sm shadow-xs transition-all hover:scale-102 active:scale-98 cursor-pointer inline-flex items-center gap-2"
                        >
                          <span>Request Tokyo Sourcing</span>
                          <ArrowRight className="w-4 h-4" />
                        </button>

                        <a
                          href="https://wa.me/254180423075?text=Hello%20Alberka%20Motors,%20I%20would%20like%20to%20request%20a%20Tokyo%20auction%20import%20quote."
                          target="_blank"
                          rel="noopener noreferrer"
                          className="py-2.5 px-5 rounded-full font-semibold border border-[#ebebeb] bg-[#f7f7f7] hover:bg-[#ebebeb] text-[#222222] text-xs sm:text-sm transition-all cursor-pointer inline-flex items-center gap-2"
                        >
                          <span>Chat on WhatsApp</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Open Architectural 3-Pillar Provenance Manifesto */}
                <section className="w-full bg-transparent py-16 sm:py-24 px-4 sm:px-8 relative">
                  <div className="max-w-[1240px] mx-auto space-y-12 sm:space-y-16 relative z-10">
                    <div className="max-w-2xl text-left">
                      <span className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-[#6a6a6a] block mb-3 font-semibold">
                        THE ALBERKA COVENANT
                      </span>
                      <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#222222] tracking-[-0.035em] leading-[1.05]">
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
                              className="text-xs font-semibold text-[#222222] hover:text-black inline-flex items-center gap-1.5 transition-colors cursor-pointer group"
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
                              className="text-xs font-semibold text-[#222222] hover:text-black inline-flex items-center gap-1.5 transition-colors cursor-pointer group"
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
                              className="text-xs font-semibold text-[#222222] hover:text-black inline-flex items-center gap-1.5 transition-colors cursor-pointer group"
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

                {/* Bank Financing Solutions */}
                <section className="w-full bg-white py-16 sm:py-24 px-4 sm:px-8 border-y border-[#ebebeb] relative">
                  <div className="max-w-[1520px] mx-auto space-y-12 relative z-10">
                    <div className="max-w-2xl text-left">
                      <span className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-[#DC2626] block mb-2 font-bold">
                        SEAMLESS ACQUISITION
                      </span>
                      <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#222222] tracking-[-0.035em]">
                        Flexible Ownership Pathways
                      </h2>
                      <p className="text-sm sm:text-base text-[#6a6a6a] mt-3 leading-relaxed">
                        Spread payments with Kenya’s leading asset financing banks, with rapid approvals and flexible repayment tenures.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 gap-6 sm:gap-8 max-w-3xl">
                      {/* Bank Asset Financing Module */}
                      <div className="bg-[#fbfbfb] rounded-[16px] border border-[#ebebeb] p-6 sm:p-8 flex flex-col justify-between text-left shadow-[0_1px_2px_rgba(0,0,0,0.08),0_4px_12px_rgba(0,0,0,0.05)]">
                        <div className="space-y-4">
                          <div className="w-10 h-10 rounded-full bg-white border border-[#ebebeb] flex items-center justify-center text-[#222222] shadow-2xs">
                            <Building2 className="w-5 h-5" />
                          </div>
                          <div>
                            <span className="font-mono text-[10.5px] uppercase text-[#6a6a6a] tracking-wider block mb-1 font-semibold">
                              APPROVED TIER-1 BANK FINANCING
                            </span>
                            <h3 className="text-xl sm:text-2xl font-bold text-[#222222]">
                              Up to 80% Asset Financing
                            </h3>
                          </div>
                          <p className="text-xs sm:text-sm text-[#6a6a6a] leading-relaxed">
                            Partnered with Kenya’s leading commercial banks for rapid loan processing, competitive interest rates, and flexible repayment tenures of up to 48 months.
                          </p>

                          <div className="pt-1">
                            <span className="text-[11px] font-mono text-[#6a6a6a] uppercase block mb-2 font-medium">
                              Approved Banking Partners:
                            </span>
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                              {['NCBA Bank', 'KCB Bank', 'Co-op Bank', 'Stanbic Bank'].map((bank, i) => (
                                <div key={i} className="bg-white border border-[#ebebeb] rounded-lg p-2.5 text-center shadow-2xs">
                                  <span className="text-xs font-bold text-[#222222] block">{bank}</span>
                                  <span className="text-[10px] text-[#6a6a6a]">Pre-approved</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          <p className="text-xs text-[#6a6a6a] leading-relaxed">
                            Salaried and business accounts eligible. Proforma invoice issued within 1 hour for immediate bank submission.
                          </p>
                        </div>

                        <div className="pt-6 mt-6 border-t border-[#ebebeb]">
                          <button
                            onClick={() => {
                              setWhispersVehicleId(undefined);
                              setWhispersDrawerOpen(true);
                            }}
                            className="py-2.5 px-6 rounded-full font-bold bg-[#222222] hover:bg-black text-white text-xs sm:text-sm shadow-xs transition-all hover:scale-102 active:scale-98 cursor-pointer inline-flex items-center gap-2"
                          >
                            <span>Request Bank Proforma Invoice</span>
                            <ArrowRight className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Verified Customer Testimonials Section */}
                <div id="customer-reviews" className="scroll-mt-24">
                  <TestimonialSectionDemo />
                </div>

                {/* Official Mombasa Showroom & Interactive Google Map Hub */}
                <ShowroomMapHub
                  settings={settings}
                  vehicles={vehicles}
                />
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
                initialFilters={heroFilters}
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

      {/* Single global notification island */}
      <Toaster
        position="top"
        queue
        maxQueue={4}
        theme={{
          background: '#171717',
          foreground: '#ffffff',
          muted: '#b4b4b4',
          ring: 'rgba(255, 255, 255, 0.14)',
          button: '#DC2626',
          success: '#22c55e',
          error: '#DC2626',
          warning: '#f59e0b',
          info: '#38bdf8',
        }}
      />

    </div>
  );
}

export default App;

