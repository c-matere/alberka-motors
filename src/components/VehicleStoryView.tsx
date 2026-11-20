import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { dynaura } from 'dynaura';
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Play,
  Pause,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  MessageCircle,
  FileText,
  Sliders,
  Sparkles,
  ArrowRight,
  Cpu,
  Armchair,
  Bookmark,
  Volume2,
  VolumeX,
  Layers,
  Palette,
  Copy,
  Check,
  Award,
  Maximize2,
  X,
  ZoomIn,
  Navigation,
  Gauge,
  Compass,
  Zap,
  MapPin,
  Clock,
  Phone,
  Share2,
  Download,
  FileCheck2,
  Search
} from 'lucide-react';
import { Vehicle, EditorialFeature, FeatureSlide } from '../data/vehicles';
import { SkeletonImage } from './SkeletonImage';
import { SectionGradientFade } from './SectionGradientFade';
import { VehicleCard } from './VehicleCard';
import { getVehiclePricing, getVehicleHubId, getModelHub } from '../data/modelHubs';

const AUCTION_PANEL_POINTS = [
  {
    id: 'front',
    label: 'FRONT BUMPER',
    code: 'A1 · Clean hairline',
    detail: 'Auction code A1 records a minor surface hairline below the threshold for repair. OEM grille, bracket and lamp housings remain in place with no curb deformation.',
  },
  {
    id: 'left',
    label: 'LEFT FLANK',
    code: 'O · Factory original',
    detail: 'Auction code O records original factory paint on the left doors and quarter panel. No re-spray entry is listed on the inspection sheet.',
  },
  {
    id: 'right',
    label: 'RIGHT FLANK',
    code: 'O · Factory original',
    detail: 'Auction code O records original factory paint on the right side. Panel gaps and weatherstripping are noted as undisturbed.',
  },
  {
    id: 'roof',
    label: 'PILLARS & ROOF',
    code: 'XX · No repair',
    detail: 'Auction code XX records no corrosion, welding or replacement on the A/B/C pillars or roof. Factory spot welds remain visible.',
  },
] as const;

interface VehicleStoryViewProps {
  vehicle: Vehicle;
  allVehicles: Vehicle[];
  onSelectVehicle: (v: Vehicle) => void;
  onBackToFleet: () => void;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  onScheduleTestDrive: (v: Vehicle) => void;
  onOpenWhispers?: (vehicleId?: string) => void;
  onSelectHub?: (hubId: string) => void;
}

/**
 * EditorialFeatureSection
 * In-depth vehicle chapter (Seats, Transmission, Cockpit, Safety)
 */
const EditorialFeatureSection: React.FC<{
  feature: EditorialFeature;
  sectionIndex: number;
  totalSections: number;
  vehicleName: string;
  stockNo: string;
  onOpenLightbox?: (photo: { url: string; title: string; desc?: string }) => void;
}> = ({ feature, sectionIndex, totalSections, vehicleName, stockNo, onOpenLightbox }) => {
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  const activeSlide: FeatureSlide =
    feature.slides[activeSlideIndex] || feature.slides[0];

  useEffect(() => {
    if (!isPlaying || feature.slides.length <= 1) return;
    const intervalMs = 50;
    const step = (intervalMs / 5500) * 100;
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setActiveSlideIndex((curr) => (curr + 1) % feature.slides.length);
          return 0;
        }
        return prev + step;
      });
    }, intervalMs);
    return () => clearInterval(timer);
  }, [isPlaying, feature.slides.length]);

  const handleSelectSlide = (idx: number) => {
    setActiveSlideIndex(idx);
    setProgress(0);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) handleSelectSlide((activeSlideIndex + 1) % feature.slides.length);
      else handleSelectSlide(activeSlideIndex === 0 ? feature.slides.length - 1 : activeSlideIndex - 1);
    }
    setTouchStartX(null);
  };

  return (
    <section className="w-full bg-transparent relative py-16 sm:py-24 px-4 sm:px-8">
      <div className="max-w-[1240px] mx-auto space-y-8 sm:space-y-10 relative z-10">
        
        {/* Section Header */}
        <div className="space-y-3 max-w-[850px] text-left">
          <div className="inline-flex items-center gap-2">
            <span className="font-mono text-[10.5px] text-zinc-600 uppercase tracking-[0.2em] font-medium">
              {String(sectionIndex + 1).padStart(2, '0')} OF {String(totalSections).padStart(2, '0')} — {feature.badge}
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-zinc-950 tracking-[-0.03em] leading-tight">
            {feature.title}
          </h2>

          <p className="text-sm sm:text-base text-zinc-600 leading-relaxed font-normal max-w-2xl">
            {feature.lead}
          </p>
        </div>

        {/* Master Theatrical Stage */}
        <div className="space-y-4">
          <div 
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            onClick={() => onOpenLightbox && onOpenLightbox({
              url: activeSlide.imageUrl,
              title: `${feature.title} — ${activeSlide.title}`,
              desc: activeSlide.description
            })}
            className="w-full aspect-[16/10] sm:aspect-[21/10] max-h-[580px] overflow-hidden bg-black border border-zinc-200/90 rounded-2xl relative group shadow-[0_20px_48px_-12px_rgba(0,0,0,0.07),0_1px_3px_rgba(0,0,0,0.04)] ring-1 ring-zinc-950/[0.04] select-none cursor-pointer"
          >
            <SkeletonImage
              key={activeSlide.id || activeSlide.imageUrl}
              src={activeSlide.imageUrl}
              alt={activeSlide.title}
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-102"
              containerClassName="w-full h-full"
            />

            {/* Top Bar: Slide Counter & Metric Badge */}
            <div className="absolute top-4 left-4 right-4 sm:top-6 sm:left-6 sm:right-6 flex items-center justify-between z-20 pointer-events-none">
              <div className="bg-white/95 backdrop-blur-md px-3 py-1.5 text-xs font-mono text-zinc-900 rounded-lg border border-zinc-200/90 flex items-center gap-2 shadow-md">
                <span className="font-bold text-zinc-950">{String(activeSlideIndex + 1).padStart(2, '0')}</span>
                <span className="text-zinc-400">/</span>
                <span className="text-zinc-600 font-medium">{String(feature.slides.length).padStart(2, '0')}</span>
                <span className="text-zinc-300 hidden sm:inline">·</span>
                <span className="text-zinc-800 font-medium hidden sm:inline truncate max-w-xs">{activeSlide.title}</span>
              </div>

              <div className="flex items-center gap-2 pointer-events-auto">
                {activeSlide.metric && (
                  <div className="bg-white/95 backdrop-blur-md border border-zinc-200/90 px-3 py-1.5 flex items-center gap-2 rounded-lg shadow-md">
                    <span className="text-[10px] font-mono text-zinc-600 uppercase hidden xs:inline">{activeSlide.metricLabel}:</span>
                    <span className="text-xs font-mono font-bold text-zinc-950">{activeSlide.metric}</span>
                  </div>
                )}

                {onOpenLightbox && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpenLightbox({
                        url: activeSlide.imageUrl,
                        title: `${feature.title} — ${activeSlide.title}`,
                        desc: activeSlide.description
                      });
                    }}
                    className="bg-white/95 hover:bg-white text-zinc-950 p-2 rounded-lg border border-zinc-200/90 transition-colors cursor-pointer backdrop-blur-md shadow-md"
                    title="Expand full-screen"
                  >
                    <Maximize2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>

            {/* Ambient Chevrons */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleSelectSlide(activeSlideIndex === 0 ? feature.slides.length - 1 : activeSlideIndex - 1);
              }}
              className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/95 hover:bg-white text-zinc-950 border border-zinc-200/90 backdrop-blur-md flex items-center justify-center transition-all cursor-pointer z-20 shadow-md"
              title="Previous photo"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleSelectSlide((activeSlideIndex + 1) % feature.slides.length);
              }}
              className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/95 hover:bg-white text-zinc-950 border border-zinc-200/90 backdrop-blur-md flex items-center justify-center transition-all cursor-pointer z-20 shadow-md"
              title="Next photo"
            >
              <ChevronRight className="w-4 h-4" />
            </button>

            {/* Animated Progress Bar */}
            <div className="absolute bottom-0 inset-x-0 h-[2px] bg-white/10 z-20">
              <div
                className="h-full bg-white transition-all ease-linear"
                style={{
                  width: `${isPlaying ? progress : ((activeSlideIndex + 1) / feature.slides.length) * 100}%`,
                  transitionDuration: isPlaying ? '50ms' : '200ms',
                }}
              />
            </div>
          </div>

          {/* Interactive Photographic Thumbnails Strip (Full Titles & Real Images) */}
          <div className="flex items-center justify-between gap-3 pt-1">
            <div className="flex items-center gap-2.5 overflow-x-auto no-scrollbar py-1">
              {feature.slides.map((s, idx) => {
                const isActive = activeSlideIndex === idx;
                return (
                  <button
                    key={s.id || idx}
                    onClick={() => handleSelectSlide(idx)}
                    className={`p-1.5 pr-3.5 rounded-xl text-left transition-all shrink-0 cursor-pointer border flex items-center gap-2.5 ${
                      isActive
                        ? 'bg-white/10 text-zinc-950 border-white/40 shadow-lg'
                        : 'bg-zinc-50 text-zinc-600 hover:text-zinc-950 border-zinc-200 hover:border-white/20'
                    }`}
                  >
                    <div className="w-12 h-9 rounded-lg overflow-hidden bg-black shrink-0 border border-zinc-200">
                      <img src={s.imageUrl} alt={s.title} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <span className={`font-mono text-[10px] block ${isActive ? 'text-zinc-950 font-bold' : 'text-zinc-500'}`}>
                        0{idx + 1}
                      </span>
                      <span className="text-xs font-semibold whitespace-nowrap block">
                        {s.title}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="shrink-0 pl-2 border-l border-zinc-200">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-9 h-9 rounded-lg bg-zinc-50 border border-zinc-200 hover:border-white/20 text-zinc-600 hover:text-zinc-950 flex items-center justify-center cursor-pointer transition-colors"
                title={isPlaying ? 'Pause slideshow' : 'Play slideshow'}
              >
                {isPlaying ? (
                  <Pause className="w-3.5 h-3.5 text-zinc-950" />
                ) : (
                  <Play className="w-3.5 h-3.5 ml-0.5 text-zinc-700" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Architectural Two-Column Dossier: Narrative & Specifications */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 pt-4 text-left border-t border-zinc-200">
          
          {/* Left Column: Narrative Prose */}
          <div className="lg:col-span-7 space-y-4">
            <span className="font-mono text-[10px] text-zinc-600 uppercase tracking-widest block font-medium">
              OVERVIEW & COMFORT
            </span>
            <div className="space-y-3.5 text-sm sm:text-[15px] text-zinc-700 leading-relaxed font-normal">
              {feature.narrative.map((para, pIdx) => (
                <p key={pIdx}>
                  {para}
                </p>
              ))}
            </div>

            <div className="pt-2">
              <a
                href={`https://wa.me/254180423075?text=Hello%20Alberka%20Enterprises,%20I%20have%20questions%20regarding%20the%20${encodeURIComponent(feature.title)}%20on%20the%20${encodeURIComponent(vehicleName)}%20(${stockNo}).`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-semibold text-zinc-700 hover:text-zinc-950 transition-colors cursor-pointer pt-2 group"
              >
                <span>Ask our workshop about this car</span>
                <ArrowRight className="w-3.5 h-3.5 text-zinc-600 group-hover:text-zinc-950 transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </div>

          {/* Right Column: Architectural Hairline Specification Matrix */}
          <div className="lg:col-span-5 space-y-2">
            <span className="font-mono text-[10.5px] text-zinc-600 uppercase tracking-widest block font-medium">
              KEY SPECIFICATIONS
            </span>
            <div className="border-t border-zinc-200">
              {feature.specs.map((spec, sIdx) => (
                <div
                  key={sIdx}
                  className="py-3 border-b border-zinc-200 flex flex-col sm:flex-row sm:items-baseline justify-between gap-1.5"
                >
                  <span className="text-xs font-mono text-zinc-600 uppercase tracking-wider shrink-0">
                    {spec.label}
                  </span>
                  <span className="text-xs sm:text-[13px] font-semibold text-zinc-950 text-left sm:text-right">
                    {spec.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export const VehicleStoryView: React.FC<VehicleStoryViewProps> = ({
  vehicle,
  allVehicles,
  onSelectVehicle,
  onBackToFleet,
  isFavorite,
  onToggleFavorite,
  onScheduleTestDrive,
  onOpenWhispers,
  onSelectHub,
}) => {
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const [selectedInspectorPoint, setSelectedInspectorPoint] = useState<string>('front');
  const [showAuctionModal, setShowAuctionModal] = useState(false);
  const selectedPanel = AUCTION_PANEL_POINTS.find((p) => p.id === selectedInspectorPoint) || AUCTION_PANEL_POINTS[0];
  const [modelDropdownOpen, setModelDropdownOpen] = useState(false);

  const hubId = getVehicleHubId(vehicle);
  const currentModelHub = getModelHub(hubId);
  const pricing = getVehiclePricing(vehicle);
  const [copiedLink, setCopiedLink] = useState(false);

  const make = vehicle.name.split(' ')[0] || 'TOYOTA';
  const bodyTypeUpper = (vehicle.bodyType || 'SUV').toUpperCase();

  // Deduplicate grade in title if already included in vehicle.name
  const vehicleDisplayTitle = useMemo(() => {
    let base = vehicle.name.trim();
    const grade = (vehicle.sbtGrade || '').trim();
    if (grade && !base.toLowerCase().includes(grade.toLowerCase())) {
      base = `${base} ${grade}`;
    }
    return base;
  }, [vehicle.name, vehicle.sbtGrade]);

  const copyToClipboard = (text: string): boolean => {
    // 1. Try modern clipboard API if supported and in secure context
    if (typeof navigator !== 'undefined' && navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(text).catch(() => {});
      return true;
    }

    // 2. Fallback using execCommand with a temporary off-screen textarea (works on HTTP)
    try {
      const textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.style.position = 'fixed';
      textarea.style.left = '-9999px';
      textarea.style.top = '-9999px';
      textarea.setAttribute('readonly', '');
      document.body.appendChild(textarea);
      textarea.select();
      textarea.setSelectionRange(0, 99999);
      const successful = document.execCommand('copy');
      document.body.removeChild(textarea);
      if (successful) return true;
    } catch (e) {
      console.warn('execCommand copy failed', e);
    }

    // 3. Fallback prompt for any restricted environment
    try {
      window.prompt('Copy vehicle link to clipboard:', text);
      return true;
    } catch {
      return false;
    }
  };

  const handleShareVehicle = async () => {
    const shareUrl = window.location.href;
    const shareTitle = `${vehicle.year} ${vehicle.name} · Alberka Enterprises Limited Mombasa`;

    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({
          title: shareTitle,
          text: `Explore this verified Japanese import at Alberka Enterprises Limited Mombasa: ${vehicle.name}`,
          url: shareUrl,
        });
        setCopiedLink(true);
        setTimeout(() => setCopiedLink(false), 2500);
        dynaura.success({ title: 'Shared', description: 'Vehicle link sent successfully.' });
        return;
      } catch (err: any) {
        if (err?.name === 'AbortError') return;
      }
    }

    copyToClipboard(shareUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
    dynaura.success({ title: 'Link copied', description: 'Vehicle link is ready to share.' });
  };

  const handleDownloadPhotoList = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  const similarVehicles = useMemo(() => {
    return allVehicles
      .filter((v) => v.id !== vehicle.id)
      .sort((a, b) => {
        const scoreA = (a.category === vehicle.category ? 3 : 0) + (a.bodyType === vehicle.bodyType ? 2 : 0) - Math.abs(a.priceKes - vehicle.priceKes) / 1000000;
        const scoreB = (b.category === vehicle.category ? 3 : 0) + (b.bodyType === vehicle.bodyType ? 2 : 0) - Math.abs(b.priceKes - vehicle.priceKes) / 1000000;
        return scoreB - scoreA;
      })
      .slice(0, 4);
  }, [allVehicles, vehicle]);

  // Master Photographic Gallery & Lightbox state
  const [galleryFilter, setGalleryFilter] = useState<'all' | 'exterior' | 'interior' | 'details'>('all');
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);
  const [isGalleryLightboxOpen, setIsGalleryLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [isGalleryPlaying, setIsGalleryPlaying] = useState(true);
  const [galleryProgress, setGalleryProgress] = useState(0);
  const [touchGalleryStartX, setTouchGalleryStartX] = useState<number | null>(null);

  const activeThumbRef = useRef<HTMLButtonElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);

  // Compile full photo suite for the active car (including colors, gallery, closer look & features)
  const allPhotos = [
    {
      id: 'hero-front',
      title: `${vehicle.name} — Front Stance`,
      category: 'exterior' as const,
      tag: 'Front Stance',
      description: `Original Japanese auction condition. Chrome styling and clean bodywork from ${vehicle.auctionHall}.`,
      url: vehicle.heroImage,
    },
    ...vehicle.colors.map((c, idx) => ({
      id: `color-${idx}`,
      title: `${vehicle.name} — ${c.name}`,
      category: 'exterior' as const,
      tag: 'Exterior Color',
      description: `Factory Japanese enamel in ${c.name}.`,
      url: c.imageUrl,
    })),
    ...vehicle.gallery.map((g, idx) => {
      const isInterior =
        g.title.toLowerCase().includes('cockpit') ||
        g.title.toLowerCase().includes('interior') ||
        g.title.toLowerCase().includes('seat') ||
        g.title.toLowerCase().includes('lounge') ||
        g.title.toLowerCase().includes('saddle');
      const isDetail =
        g.title.toLowerCase().includes('wheel') ||
        g.title.toLowerCase().includes('grille') ||
        g.title.toLowerCase().includes('tail') ||
        g.title.toLowerCase().includes('tailgate') ||
        g.title.toLowerCase().includes('lamp') ||
        g.title.toLowerCase().includes('glass');
      return {
        id: `gallery-${idx}`,
        title: g.title,
        category: (isInterior ? 'interior' : isDetail ? 'details' : 'exterior') as 'exterior' | 'interior' | 'details',
        tag: isInterior ? 'Cabin Interior' : isDetail ? 'Details & Wheels' : 'Exterior Stance',
        description: g.description,
        url: g.url,
      };
    }),
    ...(vehicle.closerLookPoints || []).map((p, idx) => {
      const isInterior =
        p.title.toLowerCase().includes('seat') ||
        p.title.toLowerCase().includes('cockpit') ||
        p.title.toLowerCase().includes('leather');
      const isDetail =
        p.title.toLowerCase().includes('engine') ||
        p.title.toLowerCase().includes('drive') ||
        p.title.toLowerCase().includes('tailgate');
      return {
        id: `closer-${p.id || idx}`,
        title: `${p.title} (${p.metric})`,
        category: (isInterior ? 'interior' : isDetail ? 'details' : 'exterior') as 'exterior' | 'interior' | 'details',
        tag: 'Closer Look',
        description: p.description,
        url: p.imageUrl,
      };
    }),
    ...vehicle.editorialFeatures.flatMap((f) =>
      f.slides.map((s, idx) => ({
        id: `${f.id}-${idx}`,
        title: `${f.title} — ${s.title}`,
        category: (f.id === 'seats' || f.id === 'infotainment' ? 'interior' : 'details') as 'exterior' | 'interior' | 'details',
        tag: f.id === 'seats' || f.id === 'infotainment' ? 'Cabin Interior' : 'Engineering',
        description: s.description,
        url: s.imageUrl,
      }))
    ),
  ].filter((item, index, self) => index === self.findIndex((t) => t.url === item.url));

  // The 3D Cover Flow carousel always holds ALL photos so no pictures are ever hidden!
  const filteredPhotos = allPhotos;

  // Reset gallery position whenever vehicle changes
  useEffect(() => {
    setActivePhotoIndex(0);
    setGalleryProgress(0);
  }, [vehicle.id]);

  const currentPhoto = filteredPhotos[activePhotoIndex] || filteredPhotos[0] || allPhotos[0];
  const activeLightboxPhoto = allPhotos[lightboxIndex] || allPhotos[0];

  const handleNextPhoto = useCallback(() => {
    setActivePhotoIndex((prev) => (prev + 1) % filteredPhotos.length);
    setGalleryProgress(0);
  }, [filteredPhotos.length]);

  const handlePrevPhoto = useCallback(() => {
    setActivePhotoIndex((prev) => (prev - 1 + filteredPhotos.length) % filteredPhotos.length);
    setGalleryProgress(0);
  }, [filteredPhotos.length]);

  const handleSelectPhoto = (idx: number) => {
    setActivePhotoIndex(idx);
    setGalleryProgress(0);
    stageRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  };

  const handleNextLightbox = useCallback(() => {
    setLightboxIndex((prev) => (prev + 1) % allPhotos.length);
  }, [allPhotos.length]);

  const handlePrevLightbox = useCallback(() => {
    setLightboxIndex((prev) => (prev - 1 + allPhotos.length) % allPhotos.length);
  }, [allPhotos.length]);

  const openPhotoByUrl = (url: string, title?: string, desc?: string) => {
    const clean = (u: string) => u.replace(/^\.\//, '/');
    let idx = allPhotos.findIndex((p) => clean(p.url) === clean(url) || p.url.includes(url) || url.includes(p.url));
    if (idx === -1) {
      allPhotos.push({
        id: `custom-${Date.now()}`,
        title: title || vehicle.name,
        category: 'exterior',
        tag: 'Detail',
        description: desc || vehicle.tagline,
        url,
      });
      idx = allPhotos.length - 1;
    }
    setLightboxIndex(idx);
    setIsGalleryLightboxOpen(true);
  };

  const openLightboxWithIndex = (idx: number) => {
    const targetUrl = filteredPhotos[idx]?.url;
    let targetIdx = allPhotos.findIndex((p) => p.url === targetUrl);
    if (targetIdx === -1) targetIdx = idx;
    setLightboxIndex(targetIdx);
    setIsGalleryLightboxOpen(true);
  };

  // Master Gallery Autoplay with Rolls-Royce timing
  useEffect(() => {
    if (!isGalleryPlaying || isGalleryLightboxOpen || filteredPhotos.length <= 1) return;
    const intervalMs = 50;
    const step = (intervalMs / 5000) * 100;
    const timer = setInterval(() => {
      setGalleryProgress((prev) => {
        if (prev >= 100) {
          handleNextPhoto();
          return 0;
        }
        return prev + step;
      });
    }, intervalMs);
    return () => clearInterval(timer);
  }, [isGalleryPlaying, isGalleryLightboxOpen, filteredPhotos.length, handleNextPhoto]);

  // Pointer (Mouse + Touch) drag swipe handlers for 3D cover flow gallery
  const [isGalleryDragging, setIsGalleryDragging] = useState(false);
  const galleryPointerStartX = useRef<number | null>(null);
  const galleryPointerMoved = useRef(false);

  const handleGalleryPointerDown = (e: React.PointerEvent) => {
    if (e.button !== 0 && e.pointerType === 'mouse') return;
    galleryPointerStartX.current = e.clientX;
    galleryPointerMoved.current = false;
    setIsGalleryDragging(true);
  };

  const handleGalleryPointerMove = (e: React.PointerEvent) => {
    if (galleryPointerStartX.current === null) return;
    const diff = galleryPointerStartX.current - e.clientX;
    if (Math.abs(diff) > 8) {
      galleryPointerMoved.current = true;
    }
  };

  const handleGalleryPointerUp = (e: React.PointerEvent) => {
    if (galleryPointerStartX.current === null) return;
    const diff = galleryPointerStartX.current - e.clientX;
    const SWIPE_THRESHOLD = 35;
    if (Math.abs(diff) >= SWIPE_THRESHOLD) {
      if (diff > 0) handleNextPhoto();
      else handlePrevPhoto();
    }
    galleryPointerStartX.current = null;
    setIsGalleryDragging(false);
    setTimeout(() => {
      galleryPointerMoved.current = false;
    }, 60);
  };

  const handleGalleryPointerCancel = () => {
    galleryPointerStartX.current = null;
    setIsGalleryDragging(false);
    galleryPointerMoved.current = false;
  };

  // Bulletproof body scroll lock (Clean & Reliable)
  useEffect(() => {
    if (isGalleryLightboxOpen || showAuctionModal) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isGalleryLightboxOpen, showAuctionModal]);

  // Auto-scroll active thumbnail into center view in lightbox
  useEffect(() => {
    if (isGalleryLightboxOpen && activeThumbRef.current) {
      activeThumbRef.current.scrollIntoView({
        behavior: 'smooth',
        inline: 'center',
        block: 'nearest',
      });
    }
  }, [lightboxIndex, isGalleryLightboxOpen]);

  // Keyboard navigation & ESC
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsGalleryLightboxOpen(false);
        setShowAuctionModal(false);
        setModelDropdownOpen(false);
      }
      if (isGalleryLightboxOpen) {
        if (e.key === 'ArrowRight') handleNextLightbox();
        if (e.key === 'ArrowLeft') handlePrevLightbox();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isGalleryLightboxOpen, handleNextLightbox, handlePrevLightbox]);

  const activeColor = vehicle.colors[selectedColorIndex] || vehicle.colors[0];

  return (
    <div className="w-full max-w-full overflow-x-clip bg-transparent text-zinc-900 pb-16">
      
      {/* AIRBNB SIGNATURE ITEM PAGE SHOWCASE */}
      <section className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-12 overflow-x-clip">
        
        {/* 1. Header Bar: Title, Back & Actions */}
        <div className="w-full pb-4 space-y-2.5 text-left">
          {/* Top Navigation & Utility Actions */}
          <div className="flex flex-wrap items-center justify-between gap-y-2.5 gap-x-4">
            <div className="flex items-center gap-2 min-w-0 flex-1 sm:flex-initial">
              <button
                onClick={onBackToFleet}
                className="inline-flex items-center gap-1.5 text-xs font-medium text-[#6a6a6a] hover:text-[#222222] transition-colors cursor-pointer group shrink-0"
              >
                <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
                <span className="hidden xs:inline">Show all cars</span>
                <span className="xs:hidden">All cars</span>
              </button>

              <span className="text-[#ebebeb] shrink-0">/</span>

              {/* Quick Car Selector Trigger */}
              <div className="relative min-w-0">
                <button
                  onClick={() => setModelDropdownOpen(!modelDropdownOpen)}
                  className="bg-white hover:bg-[#f7f7f7] border border-[#ebebeb] flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-full text-xs font-medium text-[#222222] transition-colors cursor-pointer max-w-full"
                  title="Switch car"
                >
                  <span className="text-[#DC2626] font-mono text-[11px] font-semibold shrink-0">{vehicle.stockNo}</span>
                  <span className="truncate max-w-[95px] sm:max-w-[180px]">{vehicle.name}</span>
                  <ChevronDown className={`w-3.5 h-3.5 text-[#6a6a6a] transition-transform shrink-0 ${modelDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Dropdown Menu */}
                {modelDropdownOpen && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setModelDropdownOpen(false)} />
                    <div className="absolute left-0 top-full mt-2 w-72 sm:w-80 max-w-[calc(100vw-32px)] bg-white border border-[#ebebeb] rounded-2xl shadow-xl p-2 z-50 space-y-1">
                      <span className="text-[10px] text-[#6a6a6a] uppercase tracking-wider px-3 py-1 block font-medium">
                        SWITCH TO ANOTHER CAR
                      </span>
                      <div className="max-h-72 overflow-y-auto space-y-1">
                        {allVehicles.map((v) => {
                          const isSelected = v.id === vehicle.id;
                          return (
                            <button
                              key={v.id}
                              onClick={() => {
                                onSelectVehicle(v);
                                setModelDropdownOpen(false);
                                window.scrollTo({ top: 0, behavior: 'smooth' });
                              }}
                              className={`w-full flex items-center justify-between p-2 rounded-xl text-left transition-colors cursor-pointer ${
                                isSelected ? 'bg-[#DC2626] text-white' : 'hover:bg-[#f7f7f7] text-[#222222]'
                              }`}
                            >
                              <div className="flex items-center gap-2.5 min-w-0">
                                <div className="w-10 h-8 rounded-lg bg-[#f7f7f7] overflow-hidden shrink-0 border border-[#ebebeb]">
                                  <img src={v.heroImage} alt={v.name} className="w-full h-full object-cover" />
                                </div>
                                <div className="min-w-0">
                                  <p className={`text-xs font-semibold truncate ${isSelected ? 'text-white' : 'text-[#222222]'}`}>{v.name}</p>
                                  <span className={`text-[10px] block ${isSelected ? 'text-white/80' : 'text-[#6a6a6a]'}`}>{v.stockNo} · {v.year}</span>
                                </div>
                              </div>
                              <div className="text-right shrink-0 pl-2">
                                <span className={`text-xs font-semibold block ${isSelected ? 'text-white' : 'text-[#DC2626]'}`}>KES {(v.priceKes / 1000000).toFixed(2)}M</span>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Right-Aligned Share & Save buttons */}
            <div className="flex items-center gap-2 shrink-0 ml-auto sm:ml-0">
              <button
                onClick={handleShareVehicle}
                className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 text-xs font-medium text-[#222222] hover:bg-white rounded-full transition-colors cursor-pointer underline underline-offset-4"
              >
                {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5" />}
                <span>{copiedLink ? 'Link copied' : 'Share'}</span>
              </button>

              <button
                onClick={() => onToggleFavorite(vehicle.id)}
                className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 text-xs font-medium text-[#222222] hover:bg-white rounded-full transition-colors cursor-pointer underline underline-offset-4"
              >
                <Bookmark className={`w-3.5 h-3.5 ${isFavorite ? 'fill-[#DC2626] text-[#DC2626]' : 'text-[#222222]'}`} />
                <span>{isFavorite ? 'Saved' : 'Save'}</span>
              </button>
            </div>
          </div>

          {/* Listing Title */}
          <h1 className="text-2xl sm:text-3xl font-semibold text-[#222222] tracking-tight pt-1">
            {vehicle.year} {vehicleDisplayTitle}
          </h1>

          {/* Subtitle / Metadata strip */}
          <div className="flex flex-wrap items-center gap-2 text-xs text-[#6a6a6a]">
            <span className="font-semibold text-[#222222] inline-flex items-center gap-1">
              ★ Grade {vehicle.auctionGrade || '4.5'}
            </span>
            <span>·</span>
            <span>{vehicle.mileageKm.toLocaleString()} KM</span>
            <span>·</span>
            <button
              onClick={() => setShowAuctionModal(true)}
              className="underline text-[#222222] hover:text-[#DC2626] font-medium transition-colors cursor-pointer"
            >
              {vehicle.auctionHall || 'USS Tokyo'} Verified
            </button>
            <span>·</span>
            <span>Stock #{vehicle.sbtStockId || vehicle.stockNo}</span>
            <span>·</span>
            <span className="text-[#222222] font-medium">Mombasa Yard Handover</span>
          </div>
        </div>

        {/* 2. Airbnb Signature 5-Photo Bento Grid */}
        <div className="relative mb-8 rounded-[16px] overflow-hidden select-none">
          {/* Desktop Mosaic Bento Grid (5 Photos) */}
          <div className="hidden md:grid grid-cols-4 grid-rows-2 gap-2 h-[420px] lg:h-[460px]">
            {/* 1. Big Hero Left Photo (Spans 2 cols, 2 rows) */}
            <div 
              onClick={() => openLightboxWithIndex(0)}
              className="col-span-2 row-span-2 relative cursor-pointer overflow-hidden group bg-[#f7f7f7]"
            >
              <img
                src={allPhotos[0]?.url || vehicle.heroImage}
                alt={`${vehicle.name} Main View`}
                className="w-full h-full object-cover group-hover:scale-102 group-hover:brightness-95 transition-all duration-300"
              />
            </div>

            {/* 2. Top-Mid Photo */}
            <div 
              onClick={() => openLightboxWithIndex(1)}
              className="col-span-1 row-span-1 relative cursor-pointer overflow-hidden group bg-[#f7f7f7]"
            >
              <img
                src={allPhotos[1]?.url || allPhotos[0]?.url}
                alt={`${vehicle.name} Cockpit View`}
                className="w-full h-full object-cover group-hover:scale-102 group-hover:brightness-95 transition-all duration-300"
              />
            </div>

            {/* 3. Top-Right Photo */}
            <div 
              onClick={() => openLightboxWithIndex(2)}
              className="col-span-1 row-span-1 relative cursor-pointer overflow-hidden group bg-[#f7f7f7]"
            >
              <img
                src={allPhotos[2]?.url || allPhotos[0]?.url}
                alt={`${vehicle.name} Rear Profile`}
                className="w-full h-full object-cover group-hover:scale-102 group-hover:brightness-95 transition-all duration-300"
              />
            </div>

            {/* 4. Bottom-Mid Photo */}
            <div 
              onClick={() => openLightboxWithIndex(3)}
              className="col-span-1 row-span-1 relative cursor-pointer overflow-hidden group bg-[#f7f7f7]"
            >
              <img
                src={allPhotos[3]?.url || allPhotos[0]?.url}
                alt={`${vehicle.name} Interior Cabin`}
                className="w-full h-full object-cover group-hover:scale-102 group-hover:brightness-95 transition-all duration-300"
              />
            </div>

            {/* 5. Bottom-Right Photo with "Show all photos" floating pill button */}
            <div 
              onClick={() => openLightboxWithIndex(4)}
              className="col-span-1 row-span-1 relative cursor-pointer overflow-hidden group bg-[#f7f7f7]"
            >
              <img
                src={allPhotos[4]?.url || allPhotos[0]?.url}
                alt={`${vehicle.name} Engine Bay / Details`}
                className="w-full h-full object-cover group-hover:scale-102 group-hover:brightness-95 transition-all duration-300"
              />

              {/* Floating "Show all photos" button */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  openLightboxWithIndex(0);
                }}
                className="absolute bottom-4 right-4 bg-white hover:bg-[#f7f7f7] text-[#222222] border border-[#222222] font-semibold text-xs px-3.5 py-2 rounded-lg shadow-sm flex items-center gap-2 transition-all cursor-pointer hover:scale-102 active:scale-98"
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Show all {allPhotos.length} photos</span>
              </button>
            </div>
          </div>

          {/* Mobile Responsive 4:3 Carousel Stage */}
          <div className="md:hidden relative aspect-[4/3] bg-[#f7f7f7] overflow-hidden rounded-[16px]">
            <img
              src={currentPhoto.url}
              alt={vehicle.name}
              className="w-full h-full object-cover cursor-zoom-in"
              onClick={() => openLightboxWithIndex(activePhotoIndex)}
            />
            {/* Previous Image Arrow */}
            <button
              type="button"
              aria-label="Previous image"
              onClick={(e) => {
                e.stopPropagation();
                handlePrevPhoto();
              }}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/90 hover:bg-white text-[#222222] rounded-full flex items-center justify-center shadow-md transition-all cursor-pointer border border-[#ebebeb]"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            {/* Next Image Arrow */}
            <button
              type="button"
              aria-label="Next image"
              onClick={(e) => {
                e.stopPropagation();
                handleNextPhoto();
              }}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/90 hover:bg-white text-[#222222] rounded-full flex items-center justify-center shadow-md transition-all cursor-pointer border border-[#ebebeb]"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
            {/* Counter Badge */}
            <div className="absolute bottom-3 left-3 bg-white/95 text-[#222222] px-3 py-1 rounded-full text-xs font-semibold shadow-sm border border-[#ebebeb]">
              {activePhotoIndex + 1} / {allPhotos.length}
            </div>
            {/* Fullscreen Button */}
            <button
              onClick={() => openLightboxWithIndex(activePhotoIndex)}
              className="absolute bottom-3 right-3 bg-white/95 text-[#222222] px-3 py-1 rounded-full text-xs font-semibold shadow-sm border border-[#ebebeb] flex items-center gap-1.5"
            >
              <Maximize2 className="w-3.5 h-3.5 text-[#DC2626]" />
              <span>Photos</span>
            </button>
          </div>
        </div>

        {/* 3. Two-Column Asymmetrical Layout (60% Left Content / 40% Right Sticky Reserve Card) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* LEFT COLUMN: Deep Automotive Story & Provenance (lg:col-span-7) */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            {/* Importer Provenance Row */}
            <div className="flex items-center justify-between pb-6 border-b border-[#ebebeb]">
              <div className="space-y-1">
                <h2 className="text-xl font-semibold text-[#222222]">
                  Directly Imported & Verified by Alberka Enterprises
                </h2>
                <p className="text-xs text-[#6a6a6a]">
                  Tokyo Wholesale Auction Partner · 7+ Years Provenance · Ganjoni Mombasa Showroom
                </p>
              </div>
              <div className="w-12 h-12 rounded-full bg-[#f7f7f7] border border-[#ebebeb] flex items-center justify-center text-[#DC2626] font-bold text-sm shrink-0 shadow-xs">
                AE
              </div>
            </div>

            {/* Key Highlights / Value Reassurance Strip */}
            <div className="space-y-4 py-2 border-b border-[#ebebeb] pb-6">
              <div className="flex items-start gap-4">
                <Award className="w-5 h-5 text-[#222222] shrink-0 mt-0.5" />
                <div className="space-y-0.5">
                  <h3 className="text-sm font-semibold text-[#222222]">
                    Verified Japanese Auction Grade {vehicle.auctionGrade || '4.5'}
                  </h3>
                  <p className="text-xs text-[#6a6a6a] leading-relaxed">
                    Authenticated {vehicle.auctionHall || 'USS Tokyo'} inspection sheet confirming pristine panels and zero undisclosed chassis repair.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <ShieldCheck className="w-5 h-5 text-[#222222] shrink-0 mt-0.5" />
                <div className="space-y-0.5">
                  <h3 className="text-sm font-semibold text-[#222222]">
                    100-Point Pre-Export JEVIC Audit
                  </h3>
                  <p className="text-xs text-[#6a6a6a] leading-relaxed">
                    Rigorous radiation check, structural weld assessment, and odometer certification prior to shipping.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <MapPin className="w-5 h-5 text-[#222222] shrink-0 mt-0.5" />
                <div className="space-y-0.5">
                  <h3 className="text-sm font-semibold text-[#222222]">
                    Physical Handover at Ganjoni Showroom, Mombasa
                  </h3>
                  <p className="text-xs text-[#6a6a6a] leading-relaxed">
                    Test drive and inspect on-site next to Ganjoni Primary School, Archbishop Makarios Rd.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Clock className="w-5 h-5 text-[#222222] shrink-0 mt-0.5" />
                <div className="space-y-0.5">
                  <h3 className="text-sm font-semibold text-[#222222]">
                    Zero Clearing Delays & KRA Duty Inclusive
                  </h3>
                  <p className="text-xs text-[#6a6a6a] leading-relaxed">
                    Delivered price includes all import duties, port handling, KRA clearance, and registration guidance.
                  </p>
                </div>
              </div>
            </div>

            {/* About this Vehicle */}
            <div className="space-y-3 py-2 border-b border-[#ebebeb] pb-6">
              <h2 className="text-lg font-semibold text-[#222222]">
                About this vehicle
              </h2>
              <p className="text-sm text-[#222222] leading-relaxed font-normal">
                {vehicle.tagline || vehicle.moniker}. This {vehicle.year} {vehicle.name} has been hand-selected from Japanese wholesale auctions for optimal mechanical durability and high resale retention on Kenyan roads.
              </p>
            </div>

            {/* 6 Key Mechanical & Inspection Metrics */}
            <div className="space-y-3 py-2 border-b border-[#ebebeb] pb-6">
              <h2 className="text-lg font-semibold text-[#222222]">
                Key specifications & condition
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <div className="p-3 bg-white border border-[#ebebeb] rounded-[12px] space-y-0.5">
                  <span className="text-[10px] text-[#6a6a6a] uppercase block font-medium">Auction Grade</span>
                  <p className="text-sm font-semibold text-[#222222]">Grade {vehicle.auctionGrade || '4.5'}</p>
                  <p className="text-[11px] text-[#6a6a6a] truncate">{vehicle.auctionHall || 'USS Tokyo'}</p>
                </div>

                <div className="p-3 bg-white border border-[#ebebeb] rounded-[12px] space-y-0.5">
                  <span className="text-[10px] text-[#6a6a6a] uppercase block font-medium">Mileage</span>
                  <p className="text-sm font-semibold text-[#222222]">{vehicle.mileageKm.toLocaleString()} KM</p>
                  <p className="text-[11px] text-[#6a6a6a] truncate">JEVIC Certified</p>
                </div>

                <div className="p-3 bg-white border border-[#ebebeb] rounded-[12px] space-y-0.5">
                  <span className="text-[10px] text-[#6a6a6a] uppercase block font-medium">Drivetrain</span>
                  <p className="text-sm font-semibold text-[#222222] truncate">{vehicle.drivetrain || '4WD'}</p>
                  <p className="text-[11px] text-[#6a6a6a] truncate">{vehicle.transmission || 'Automatic'}</p>
                </div>

                <div className="p-3 bg-white border border-[#ebebeb] rounded-[12px] space-y-0.5">
                  <span className="text-[10px] text-[#6a6a6a] uppercase block font-medium">Engine</span>
                  <p className="text-sm font-semibold text-[#222222] truncate">{vehicle.engine}</p>
                  <p className="text-[11px] text-[#6a6a6a] truncate">{vehicle.power || 'Direct Injection'}</p>
                </div>

                <div className="p-3 bg-white border border-[#ebebeb] rounded-[12px] space-y-0.5">
                  <span className="text-[10px] text-[#6a6a6a] uppercase block font-medium">Fuel & Capacity</span>
                  <p className="text-sm font-semibold text-[#222222] truncate">{vehicle.fuelType.toUpperCase()}</p>
                  <p className="text-[11px] text-[#6a6a6a] truncate">{vehicle.seats || 5} Seats · {vehicle.doors || 5} Doors</p>
                </div>

                <div className="p-3 bg-white border border-[#ebebeb] rounded-[12px] space-y-0.5">
                  <span className="text-[10px] text-[#6a6a6a] uppercase block font-medium">Location</span>
                  <p className="text-sm font-semibold text-[#222222] truncate">Mombasa Yard</p>
                  <p className="text-[11px] text-[#6a6a6a] truncate">Ganjoni Showroom</p>
                </div>
              </div>
            </div>

            {/* View Japanese Auction Sheet Trigger */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 bg-[#f7f7f7] border border-[#ebebeb] rounded-[14px]">
              <div className="flex items-center gap-3 min-w-0">
                <FileText className="w-5 h-5 text-[#DC2626] shrink-0" />
                <div className="min-w-0">
                  <h4 className="text-xs font-semibold text-[#222222]">Original Japanese Auction Sheet</h4>
                  <p className="text-[11px] text-[#6a6a6a]">Inspect the unedited USS Tokyo inspection sheet with inspector markings</p>
                </div>
              </div>
              <button
                onClick={() => setShowAuctionModal(true)}
                className="bg-white hover:bg-[#f7f7f7] border border-[#222222] text-[#222222] px-3.5 py-1.5 rounded-full text-xs font-medium cursor-pointer transition-colors shrink-0 self-start sm:self-auto"
              >
                View Sheet
              </button>
            </div>

            {/* Opening Times & Sales Desks */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              {/* Card 1: Opening Times */}
              <div className="bg-white rounded-[14px] border border-[#ebebeb] p-4 sm:p-5">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-semibold text-[#222222]">Opening Times</h3>
                  <span className="text-[11px] text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full font-medium">Open now</span>
                </div>
                <div className="space-y-1.5 text-xs">
                  <div className="flex justify-between py-1 border-b border-[#ebebeb]/60">
                    <span className="text-[#6a6a6a]">Mon - Fri:</span>
                    <span className="font-medium text-[#222222]">8:00 AM - 5:30 PM</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-[#ebebeb]/60">
                    <span className="text-[#6a6a6a]">Saturday:</span>
                    <span className="font-medium text-[#222222]">9:00 AM - 2:00 PM</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-[#6a6a6a]">Sunday:</span>
                    <span className="font-medium text-[#222222]">Closed (By Appt)</span>
                  </div>
                </div>
              </div>

              {/* Card 2: Concierge Desk */}
              <div className="bg-white rounded-[14px] border border-[#ebebeb] p-4 sm:p-5">
                <h3 className="text-sm font-semibold text-[#222222] mb-3">Direct Concierge</h3>
                <div className="space-y-2.5 text-xs">
                  <div className="flex items-center justify-between py-1 border-b border-[#ebebeb]/60">
                    <div>
                      <p className="font-medium text-[#222222]">Showroom Desk</p>
                      <span className="text-[11px] text-[#6a6a6a]">0786 000 040</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <a href="tel:+254786000040" className="w-7 h-7 rounded-full bg-[#f7f7f7] hover:bg-[#ebebeb] border border-[#ebebeb] text-[#222222] flex items-center justify-center">
                        <Phone className="w-3 h-3" />
                      </a>
                      <a href={`https://wa.me/254786000040?text=${encodeURIComponent(`Hi, I'm interested in ${vehicle.year} ${vehicle.name} (Stock: ${vehicle.sbtStockId || vehicle.stockNo}).`)}`} target="_blank" rel="noopener noreferrer" className="w-7 h-7 rounded-full bg-emerald-600 text-white flex items-center justify-center">
                        <MessageCircle className="w-3.5 h-3.5 fill-white text-white" />
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center justify-between py-1">
                    <div>
                      <p className="font-medium text-[#222222]">Japan Orders Desk</p>
                      <span className="text-[11px] text-[#6a6a6a]">0180 423 075</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <a href="tel:+254180423075" className="w-7 h-7 rounded-full bg-[#f7f7f7] hover:bg-[#ebebeb] border border-[#ebebeb] text-[#222222] flex items-center justify-center">
                        <Phone className="w-3 h-3" />
                      </a>
                      <a href={`https://wa.me/254180423075?text=${encodeURIComponent(`Hi, I'm interested in ${vehicle.year} ${vehicle.name} (Stock: ${vehicle.sbtStockId || vehicle.stockNo}).`)}`} target="_blank" rel="noopener noreferrer" className="w-7 h-7 rounded-full bg-emerald-600 text-white flex items-center justify-center">
                        <MessageCircle className="w-3.5 h-3.5 fill-white text-white" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: Authentic Airbnb Sticky Floating Reserve Card (lg:col-span-5) */}
          <div className="lg:col-span-5 sticky top-24 space-y-4">
            <div className="bg-white border border-[#ebebeb] rounded-[16px] p-6 shadow-[0_6px_16px_rgba(0,0,0,0.1)] space-y-4 text-left">
              
              {/* Price & Rating Header */}
              <div className="flex items-baseline justify-between gap-2">
                <div>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-2xl sm:text-3xl font-semibold text-[#222222] tracking-tight">
                      KES {vehicle.priceKes.toLocaleString()}
                    </span>
                    <span className="text-xs text-[#6a6a6a]">delivered</span>
                  </div>
                  {pricing.hasDiscount && (
                    <span className="text-xs text-[#6a6a6a] line-through block mt-0.5">
                      KES {pricing.originalPrice.toLocaleString()}
                    </span>
                  )}
                </div>

                <div className="text-right">
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#222222]">
                    ★ Grade {vehicle.auctionGrade || '4.5'}
                  </span>
                  <span className="text-[11px] text-[#6a6a6a] block underline cursor-pointer" onClick={() => setShowAuctionModal(true)}>
                    USS Tokyo
                  </span>
                </div>
              </div>

              {/* Segmented Reservation Box */}
              <div className="border border-[#222222] rounded-[10px] overflow-hidden text-xs">
                <div className="grid grid-cols-2 border-b border-[#222222]">
                  <div className="p-2.5 border-r border-[#222222]">
                    <span className="text-[9px] uppercase tracking-wider text-[#222222] font-bold block">
                      HANDOVER YARD
                    </span>
                    <span className="text-[#222222] font-medium block truncate">Mombasa Showroom</span>
                  </div>
                  <div className="p-2.5">
                    <span className="text-[9px] uppercase tracking-wider text-[#222222] font-bold block">
                      DELIVERY STATUS
                    </span>
                    <span className="text-[#222222] font-medium block truncate">Ready / Available</span>
                  </div>
                </div>
                <div className="p-2.5">
                  <span className="text-[9px] uppercase tracking-wider text-[#222222] font-bold block">
                    PAYMENT OPTIONS
                  </span>
                  <span className="text-[#222222] font-medium block">Direct Cash / SACCO / Bank Finance</span>
                </div>
              </div>

              {/* Rausch CTA Action */}
              <div className="space-y-2 pt-1">
                <button
                  onClick={() => {
                    if (onOpenWhispers) onOpenWhispers(vehicle.id);
                  }}
                  className="w-full bg-[#DC2626] hover:bg-[#B91C1C] text-white font-medium py-3.5 px-4 rounded-xl text-sm flex items-center justify-center gap-2 shadow-xs transition-colors cursor-pointer active:scale-98"
                >
                  <MessageCircle className="w-4 h-4 fill-white text-white" />
                  <span>Reserve Vehicle on WhatsApp</span>
                </button>

                <button
                  onClick={() => onScheduleTestDrive(vehicle)}
                  className="w-full bg-white hover:bg-[#f7f7f7] text-[#222222] border border-[#ebebeb] hover:border-[#dddddd] font-medium py-2.5 px-4 rounded-xl text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Calendar className="w-3.5 h-3.5 text-[#DC2626]" />
                  <span>Book Showroom Test Drive</span>
                </button>
              </div>

              {/* Reassurance Microcopy */}
              <p className="text-center text-xs text-[#6a6a6a]">
                You won't be charged yet · Free Japanese provenance dossier
              </p>

              {/* Transparent Cost Breakdown Table */}
              <div className="pt-4 border-t border-[#ebebeb] space-y-2.5 text-xs">
                <div className="flex justify-between text-[#6a6a6a]">
                  <span className="underline">CIF Tokyo Port to Mombasa</span>
                  <span>KES {Math.round(vehicle.priceKes * 0.68).toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-[#6a6a6a]">
                  <span className="underline">KRA Customs Duty & Port Charges</span>
                  <span>KES {Math.round(vehicle.priceKes * 0.27).toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-[#6a6a6a]">
                  <span className="underline">100-Point Overhaul & Handover</span>
                  <span>KES {Math.round(vehicle.priceKes * 0.05).toLocaleString()}</span>
                </div>
                <div className="pt-2 border-t border-[#ebebeb] flex justify-between font-semibold text-[#222222] text-sm">
                  <span>Total Delivered Price</span>
                  <span>KES {vehicle.priceKes.toLocaleString()}</span>
                </div>
              </div>

              {/* Share & Print Buttons */}
              <div className="pt-2 border-t border-[#ebebeb] flex items-center justify-between text-xs">
                <button
                  onClick={handleShareVehicle}
                  className="text-[#6a6a6a] hover:text-[#222222] inline-flex items-center gap-1.5 cursor-pointer font-medium"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Share</span>
                </button>
                <button
                  onClick={handleDownloadPhotoList}
                  className="text-[#6a6a6a] hover:text-[#222222] inline-flex items-center gap-1.5 cursor-pointer font-medium"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Print Dossier</span>
                </button>
              </div>

            </div>
          </div>

        </div>

      </section>

      {/* Showroom Physical Location & Google Maps Embed ("Where you'll be") */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 border-t border-[#ebebeb] bg-[#f7f7f7] text-[#222222] overflow-x-clip">
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
                  <div className="w-10 h-10 rounded-full bg-[#f7f7f7] border border-[#ebebeb] text-[#DC2626] flex items-center justify-center shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4 text-[#DC2626]" />
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
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#DC2626] shrink-0" />
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
                  <MessageCircle className="w-3.5 h-3.5 fill-[#222222] text-[#222222]" />
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
      <section className="py-12 px-4 sm:px-6 lg:px-8 border-t border-[#ebebeb] bg-white text-[#222222] overflow-x-clip">
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

      {/* Japanese Auction Sheet Dossier Modal */}
      {showAuctionModal && typeof document !== 'undefined' && createPortal(
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="auction-sheet-title"
          className="fixed inset-0 z-[9999] bg-zinc-950/75 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto animate-fadeIn"
          onClick={() => setShowAuctionModal(false)}
        >
          <div
            className="max-w-[820px] w-full border border-[#E5E0D6] p-7 sm:p-10 space-y-5 text-left my-auto rounded-[18px] relative animate-scaleIn"
            style={{
              background: '#FAF8F5',
              backgroundImage: 'radial-gradient(#E4DFD5 0.7px, transparent 0.7px)',
              backgroundSize: '24px 24px',
              boxShadow: '0 24px 80px rgba(0,0,0,0.38)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Archival paper details: punch holes + folded dog-ear */}
            <div aria-hidden="true" className="absolute left-3.5 top-1/2 -translate-y-1/2 flex flex-col gap-9">
              {[0, 1, 2].map((hole) => (
                <span key={hole} className="w-2.5 h-2.5 rounded-full bg-[#E9E4D9] shadow-[inset_0_1px_2px_rgba(0,0,0,0.22)]" />
              ))}
            </div>
            <div
              aria-hidden="true"
              className="absolute top-0 right-0 w-11 h-11 rounded-tr-[18px]"
              style={{
                background: 'linear-gradient(225deg, #EDE9E0 0%, #FFFFFF 52%, #D8D2C4 100%)',
                clipPath: 'polygon(100% 0, 0 0, 100% 100%)',
                boxShadow: '-2px 2px 4px rgba(0,0,0,0.10)',
              }}
            />

            <div className="pl-5 sm:pl-7 space-y-5">
            {/* Header & Close */}
            <div className="flex items-start justify-between gap-4 border-b border-[#E5E0D6] pb-4">
              <div className="space-y-1.5">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-mono text-[9.5px] uppercase tracking-[0.18em] font-bold text-[#BE123C]">
                    Japanese Export Inspection Record
                  </span>
                  <span className="font-mono text-[10px] font-bold text-[#6B6459] bg-[#F1EDE4] border border-[#E5E0D6] px-2 py-0.5 rounded">
                    LOT #{vehicle.stockNo.replace(/[^0-9]/g, '') || '19'}
                  </span>
                </div>
                <h3 id="auction-sheet-title" className="text-xl sm:text-2xl font-extrabold text-[#171717] tracking-tight leading-tight">
                  Auction Inspection Sheet
                </h3>
                <p className="font-mono text-[10.5px] sm:text-[11px] text-[#6B6459]">
                  {vehicle.name} · Stock {vehicle.stockNo} · Chassis {vehicle.chassisNo}
                </p>
                <p className="text-xs text-[#575047] leading-relaxed max-w-lg">
                  Direct from {vehicle.auctionHall || 'CAA Tokyo / Direct Japanese Import'}. Third-party verification recorded before shipment to Mombasa.
                </p>
              </div>

              <div className="flex items-start gap-3 shrink-0">
                <div
                  aria-hidden="true"
                  className="w-12 h-12 rounded-[3px] border-[2.5px] border-[#BE123C]/85 text-[#BE123C]/90 flex flex-col items-center justify-center font-serif text-[15px] font-bold leading-none rotate-[-8deg]"
                  style={{ filter: 'blur(0.25px)' }}
                >
                  <span>検</span>
                  <span>済</span>
                </div>
                <button
                  onClick={() => setShowAuctionModal(false)}
                  aria-label="Close inspection sheet"
                  className="w-9 h-9 rounded-full border border-[#E5E0D6] bg-white/80 text-[#171717] hover:bg-white cursor-pointer shrink-0 flex items-center justify-center transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Grade strip */}
            <div className="grid grid-cols-1 sm:grid-cols-3 rounded-2xl bg-white/85 border border-[#E5E0D6] divide-y sm:divide-y-0 sm:divide-x divide-[#E5E0D6] overflow-hidden">
              {[
                { label: 'OVERALL GRADE', value: vehicle.auctionGrade || '4.0', note: 'Japanese auction scale · 1 to 6', large: true },
                { label: 'INTERIOR GRADE', value: vehicle.interiorGrade || 'B', note: 'No smoke or pet wear recorded', large: true },
                { label: 'VERIFIED ODOMETER', value: `${vehicle.mileageKm.toLocaleString()} KM`, note: 'JEVIC certified reading', large: false },
              ].map((grade) => (
                <div key={grade.label} className="p-4 sm:p-5">
                  <span className="font-mono text-[9.5px] uppercase tracking-[0.14em] font-bold text-[#6B6459] block mb-1.5">{grade.label}</span>
                  <span className={`font-mono text-[#171717] font-extrabold block leading-none ${grade.large ? 'text-3xl sm:text-4xl' : 'text-xl sm:text-2xl mt-1'}`}>
                    {grade.value}
                  </span>
                  <span className="text-[11px] text-[#6B6459] mt-2 block">{grade.note}</span>
                </div>
              ))}
            </div>

            {/* Verification chain */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#F0F7F2] border border-[#CFE6D6] text-[9.5px] font-mono font-bold text-[#15803D] uppercase tracking-wider">
                <CheckCircle2 className="w-3 h-3" />
                {vehicle.auctionHall?.split(' / ')[0] || 'Japanese Auction'} Verified
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#F0F7F2] border border-[#CFE6D6] text-[9.5px] font-mono font-bold text-[#15803D] uppercase tracking-wider">
                <CheckCircle2 className="w-3 h-3" />
                QISJ Pre-Shipment
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#F0F7F2] border border-[#CFE6D6] text-[9.5px] font-mono font-bold text-[#15803D] uppercase tracking-wider">
                <CheckCircle2 className="w-3 h-3" />
                JEVIC Odometer
              </span>
            </div>

            {/* Panel & chassis code decoder */}
            <div className="p-4 sm:p-5 bg-white/85 border border-[#E5E0D6] rounded-2xl space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#E5E0D6] pb-3">
                <span className="font-mono text-[10px] uppercase tracking-[0.14em] font-bold text-[#171717]">
                  Panel & Chassis Code Decoder
                </span>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#F0F7F2] border border-[#CFE6D6] text-[9.5px] font-mono font-bold text-[#15803D] uppercase tracking-wider">
                  <CheckCircle2 className="w-3 h-3" />
                  Frame distortion 0%
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
                {AUCTION_PANEL_POINTS.map((pt) => {
                  const isSelected = selectedInspectorPoint === pt.id;
                  return (
                    <button
                      key={pt.id}
                      type="button"
                      aria-pressed={isSelected}
                      onClick={() => setSelectedInspectorPoint(pt.id)}
                      className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                        isSelected
                          ? 'border-[#171717] bg-white shadow-[inset_0_-3px_0_#15803D]'
                          : 'border-[#E5E0D6] bg-[#FBF9F5] hover:border-[#BDB5A8]'
                      }`}
                    >
                      <span className={`block font-mono font-bold text-[10.5px] ${isSelected ? 'text-[#171717]' : 'text-[#3F3A33]'}`}>
                        {pt.label}
                      </span>
                      <span className={`font-mono text-[10.5px] block mt-1 ${isSelected ? 'text-[#15803D]' : 'text-[#6B6459]'}`}>
                        {pt.code}
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="p-4 bg-white border border-[#E5E0D6] border-l-[3px] border-l-[#15803D] rounded-xl text-left">
                <span className="font-mono text-[9.5px] uppercase tracking-[0.14em] font-bold text-[#6B6459] block mb-1.5">
                  Decoded code · {selectedPanel.label}
                </span>
                <p className="text-xs sm:text-[13px] text-[#3F3A33] leading-relaxed">
                  {selectedPanel.detail}
                </p>
              </div>

              <div className="p-3.5 bg-[#F1EDE4] border border-[#E5E0D6] rounded-xl text-left">
                <span className="font-mono text-[9.5px] uppercase tracking-[0.14em] font-bold text-[#6B6459] block mb-1.5">
                  Inspector's note · translated from Japanese
                </span>
                <p className="text-xs sm:text-[13px] text-[#575047] leading-relaxed">
                  Maintenance records verified in Tokyo. No structural damage or corrosion listed. Brakes and steering checked before shipment.
                </p>
              </div>
            </div>

            {/* Action bar */}
            <div className="pt-1 flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="text-[11px] text-[#6B6459] font-mono">
                Original PDF available on request.
              </span>

              <a
                href={`https://wa.me/254180423075?text=Hello%20Alberka%20Enterprises,%20please%20send%20me%20the%20original%20Japanese%20auction%20sheet%20PDF%20for%20the%20${encodeURIComponent(vehicle.year + ' ' + vehicle.name)}%20(Stock%20ID:%20${encodeURIComponent(vehicle.sbtStockId || vehicle.stockNo)})%20from%20${encodeURIComponent(vehicle.auctionHall || 'Direct Japanese Import')}.`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#DC2626] hover:bg-[#B91C1C] text-white w-full sm:w-auto text-center font-semibold px-6 py-3.5 rounded-full inline-flex items-center justify-center gap-2 shadow-sm hover:scale-[1.01] active:scale-98 transition-all text-sm"
              >
                <span className="inline-flex items-center justify-center">
                  <MessageCircle className="w-4 h-4 text-white fill-white" />
                </span>
                <span>Request Original PDF on WhatsApp</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </a>
            </div>

            </div>
          </div>
        </div>,
        document.body
      )}

      {/* Rolls-Royce Bespoke Fullscreen Gallery Lightbox Modal (Guaranteed Viewport Portal) */}
      {isGalleryLightboxOpen && typeof document !== 'undefined' && createPortal(
        <div 
          className="fixed inset-0 z-[9999] w-full h-full bg-black/98 backdrop-blur-2xl flex flex-col overflow-hidden select-none animate-fadeIn"
          onClick={() => setIsGalleryLightboxOpen(false)}
        >
          {/* Top Bar: Fixed slim height */}
          <div 
            className="h-14 sm:h-16 px-4 sm:px-8 border-b border-zinc-200 flex items-center justify-between shrink-0"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 min-w-0">
              <span className="font-mono text-xs sm:text-sm text-white font-bold uppercase tracking-wider truncate">
                {vehicle.stockNo} · {vehicle.name}
              </span>
              <span className="text-zinc-600 hidden sm:inline">|</span>
              <span className="text-xs text-zinc-300 font-mono hidden md:inline truncate">
                {activeLightboxPhoto.title}
              </span>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <div className="bg-zinc-900 border border-zinc-800 px-3 py-1.5 rounded-md text-xs font-mono text-zinc-400">
                <span className="text-white font-bold">{String(lightboxIndex + 1).padStart(2, '0')}</span>
                <span className="text-zinc-600"> / </span>
                <span className="text-zinc-400">{String(allPhotos.length).padStart(2, '0')}</span>
              </div>
              <button
                onClick={() => setIsGalleryLightboxOpen(false)}
                className="p-2 bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-zinc-300 hover:text-white rounded-md cursor-pointer transition-colors"
                title="Close fullscreen view (Esc)"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Center Stage: Constrained Zero-Scroll Media Viewer */}
          <div 
            className="flex-1 min-h-0 w-full relative flex items-center justify-center p-3 sm:p-6 overflow-hidden select-none"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              key={activeLightboxPhoto.url}
              src={activeLightboxPhoto.url}
              alt={activeLightboxPhoto.title}
              className="max-h-[72vh] sm:max-h-[78vh] max-w-[95vw] w-auto h-auto object-contain rounded-xl shadow-2xl transition-all duration-300 pointer-events-none"
            />

            {/* Hairline Nav Controls */}
            <button
              onClick={handlePrevLightbox}
              className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-black/70 hover:bg-black text-white border border-zinc-700 hover:border-zinc-500 flex items-center justify-center transition-all cursor-pointer z-10 backdrop-blur-md"
              title="Previous photo (Left Arrow)"
            >
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
            <button
              onClick={handleNextLightbox}
              className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-black/70 hover:bg-black text-white border border-zinc-700 hover:border-zinc-500 flex items-center justify-center transition-all cursor-pointer z-10 backdrop-blur-md"
              title="Next photo (Right Arrow)"
            >
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          </div>

          {/* Bottom Bar: Responsive & Zero-Scroll */}
          <div 
            className="shrink-0 border-t border-zinc-800/80 bg-[#09090b]/95 px-4 sm:px-8 py-2.5 sm:py-3 flex flex-col sm:flex-row items-center justify-between gap-2.5"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar w-full sm:w-auto py-1">
              {allPhotos.map((p, idx) => (
                <button
                  key={p.id || idx}
                  ref={lightboxIndex === idx ? activeThumbRef : undefined}
                  onClick={() => setLightboxIndex(idx)}
                  className={`h-14 sm:h-16 aspect-[3/4] rounded-lg overflow-hidden border shrink-0 transition-all cursor-pointer ${
                    lightboxIndex === idx
                      ? 'border-white ring-2 ring-white/50 scale-105'
                      : 'border-zinc-800 opacity-50 hover:opacity-100'
                  }`}
                >
                  <img src={p.url} alt={p.title} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>

            <div className="flex items-center justify-between sm:justify-end gap-4 w-full sm:w-auto shrink-0">
              <div className="text-left sm:text-right font-mono">
                <span className="text-[9px] sm:text-[10px] text-zinc-400 uppercase tracking-wider block">DELIVERED PRICE</span>
                <span className="text-sm sm:text-base font-bold text-white">
                  KES {vehicle.priceKes.toLocaleString()}
                </span>
              </div>

              <a
                href={`https://wa.me/254180423075?text=Hello%20Alberka%20Enterprises,%20I%20am%20interested%20in%20the%20${encodeURIComponent(vehicle.year + ' ' + vehicle.name)}%20(Stock%20ID:%20${encodeURIComponent(vehicle.sbtStockId || vehicle.stockNo)})%20priced%20at%20KES%20${vehicle.priceKes.toLocaleString()}.`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#222222] hover:bg-black text-white !py-2.5 !px-5 text-xs font-semibold rounded-full inline-flex items-center gap-1.5 shadow-sm hover:scale-[1.02] active:scale-98 transition-all"
              >
                <span className="inline-flex items-center justify-center">
                  <MessageCircle className="w-3.5 h-3.5 text-white fill-white" />
                </span>
                <span>Inquire on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>,
        document.body
      )}

    </div>
  );
};
