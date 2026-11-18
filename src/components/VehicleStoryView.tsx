import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { createPortal } from 'react-dom';
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
  Eye,
  Navigation,
  Gauge,
  Compass,
  Zap,
  MapPin,
  Clock,
  Phone,
  Share2,
  Download,
  FileCheck2
} from 'lucide-react';
import { Vehicle, EditorialFeature, FeatureSlide } from '../data/vehicles';
import { SkeletonImage } from './SkeletonImage';
import { SectionGradientFade } from './SectionGradientFade';
import { VehicleCard } from './VehicleCard';
import { getVehiclePricing, getVehicleHubId, getModelHub } from '../data/modelHubs';

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
    const shareTitle = `${vehicle.year} ${vehicle.name} · Alberka Motors Mombasa`;

    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({
          title: shareTitle,
          text: `Explore this verified Japanese import at Alberka Motors Mombasa: ${vehicle.name}`,
          url: shareUrl,
        });
        setCopiedLink(true);
        setTimeout(() => setCopiedLink(false), 2500);
        return;
      } catch (err: any) {
        if (err?.name === 'AbortError') return;
      }
    }

    copyToClipboard(shareUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handleViewPhotoList = () => {
    const el = document.getElementById('photo-list-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
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
    <div className="w-full bg-transparent text-zinc-900 pb-32">
      
      {/* 1. FULL-WIDTH 3D COVER FLOW GALLERY (OCCUPIES ABOVE THE FOLD ALONE) */}
      <section className="figma-carousel-section w-full max-w-none min-h-[calc(100vh-68px)] flex flex-col justify-between pt-2 pb-6 overflow-hidden relative">
        
        {/* Floating Top Control Strip (Summarized to give full space to the gallery) */}
        <div className="w-full max-w-[1520px] mx-auto px-3 sm:px-8 py-2 z-30 relative flex flex-wrap items-center justify-between gap-2 pointer-events-none">
          
          {/* Left Floating Group: Back Button & Vehicle Selector Dropdown */}
          <div className="flex items-center gap-1.5 sm:gap-2 pointer-events-auto">
            <button
              onClick={onBackToFleet}
              className="bg-white/95 hover:bg-white backdrop-blur-md border border-zinc-200/90 text-xs font-semibold text-zinc-700 hover:text-zinc-950 flex items-center gap-1.5 px-3 py-1.5 rounded-full shadow-sm hover:shadow transition-all cursor-pointer"
              title="Back to cars"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-zinc-600" />
              <span className="hidden xs:inline">Back</span>
            </button>

            {/* Model Dropdown Trigger */}
            <div className="relative">
              <button
                onClick={() => setModelDropdownOpen(!modelDropdownOpen)}
                className="bg-white/95 hover:bg-white backdrop-blur-md border border-zinc-200/90 flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 rounded-full text-xs font-bold text-zinc-950 shadow-sm hover:shadow transition-all cursor-pointer"
                title="Switch vehicle"
              >
                <span className="font-mono text-red-600 text-[11px] font-bold hidden sm:inline">{vehicle.stockNo}</span>
                <span className="truncate max-w-[125px] xs:max-w-[160px] sm:max-w-[200px]">{vehicle.name}</span>
                <ChevronDown className={`w-3.5 h-3.5 text-zinc-500 transition-transform ${modelDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Elegant Dropdown Menu */}
              {modelDropdownOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setModelDropdownOpen(false)} />
                  <div className="absolute left-0 top-full mt-2 w-72 sm:w-80 bg-white/98 backdrop-blur-2xl border border-zinc-200 rounded-2xl shadow-2xl p-2 z-50 space-y-1">
                    <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-wider px-3 py-1 block">
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
                              isSelected ? 'bg-red-600 text-white shadow-sm' : 'hover:bg-zinc-100 text-zinc-800'
                            }`}
                          >
                            <div className="flex items-center gap-2.5 min-w-0">
                              <div className="w-10 h-8 rounded bg-zinc-100 overflow-hidden shrink-0 border border-zinc-200/60">
                                <img src={v.heroImage} alt={v.name} className="w-full h-full object-cover" />
                              </div>
                              <div className="min-w-0">
                                <p className={`text-xs font-bold truncate ${isSelected ? 'text-white' : 'text-zinc-950'}`}>{v.name}</p>
                                <span className={`font-mono text-[10px] block ${isSelected ? 'text-white/80' : 'text-zinc-500'}`}>{v.stockNo} · {v.year}</span>
                              </div>
                            </div>
                            <div className="text-right shrink-0 pl-2">
                              <span className={`font-mono text-xs font-bold block ${isSelected ? 'text-white' : 'text-red-600'}`}>KES {(v.priceKes / 1000000).toFixed(2)}M</span>
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

          {/* Right Floating Group: Price & Test Drive & Fullscreen */}
          <div className="flex items-center gap-2 pointer-events-auto">
            <div className="bg-white/95 backdrop-blur-md border border-zinc-200/90 px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-sm font-mono text-xs">
              <span className="text-[10px] text-zinc-500 uppercase tracking-wider hidden sm:inline">CASH:</span>
              <span className="font-black text-red-600 text-xs sm:text-[13px]">
                KES {vehicle.priceKes.toLocaleString()}
              </span>
            </div>

            <button
              onClick={() => onScheduleTestDrive(vehicle)}
              className="bg-zinc-950 hover:bg-zinc-800 text-white text-xs font-bold py-1.5 px-3.5 rounded-full shadow-sm hover:shadow transition-all cursor-pointer whitespace-nowrap hidden sm:inline-flex items-center gap-1.5"
            >
              <span>Book Test Drive</span>
            </button>

            <button
              onClick={() => openLightboxWithIndex(activePhotoIndex)}
              className="bg-white/95 hover:bg-white backdrop-blur-md p-2 rounded-full border border-zinc-200/90 text-zinc-700 hover:text-red-600 shadow-sm transition-colors cursor-pointer"
              title="Fullscreen Lightbox"
            >
              <Maximize2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        <div 
          ref={stageRef}
          className="figma-carousel-viewport" 
          role="region" 
          aria-roledescription="carousel" 
          aria-label="Vehicle showcase carousel"
          style={{
            cursor: isGalleryDragging ? 'grabbing' : 'grab',
            touchAction: 'pan-y',
            userSelect: 'none',
          }}
          onPointerDown={handleGalleryPointerDown}
          onPointerMove={handleGalleryPointerMove}
          onPointerUp={handleGalleryPointerUp}
          onPointerCancel={handleGalleryPointerCancel}
        >
                <div className="figma-carousel-track">
                  {filteredPhotos.map((photo, idx) => {
                    const offset = idx - activePhotoIndex;
                    const total = filteredPhotos.length;
                    const isActive = offset === 0;

                    let transformStr = '';
                    let zIndexVal = 0;
                    let opacityVal = 0;
                    let pointerEventsVal: 'auto' | 'none' = 'none';

                    if (offset === 0) {
                      transformStr = 'translateX(0px) scale(1.15)';
                      zIndexVal = 10;
                      opacityVal = 1;
                      pointerEventsVal = 'auto';
                    } else if (offset === -1) {
                      transformStr = 'translateX(calc(-1 * var(--figma-slide-offset, 480px))) scale(0.82)';
                      zIndexVal = 5;
                      opacityVal = 0.9;
                      pointerEventsVal = 'auto';
                    } else if (offset === 1) {
                      transformStr = 'translateX(calc(1 * var(--figma-slide-offset, 480px))) scale(0.82)';
                      zIndexVal = 5;
                      opacityVal = 0.9;
                      pointerEventsVal = 'auto';
                    } else if (offset === -2) {
                      transformStr = 'translateX(calc(-2 * var(--figma-slide-offset, 480px))) scale(0.68)';
                      zIndexVal = 2;
                      opacityVal = 0.6;
                      pointerEventsVal = 'auto';
                    } else if (offset === 2) {
                      transformStr = 'translateX(calc(2 * var(--figma-slide-offset, 480px))) scale(0.68)';
                      zIndexVal = 2;
                      opacityVal = 0.6;
                      pointerEventsVal = 'auto';
                    } else {
                      transformStr = `translateX(calc(${offset} * var(--figma-slide-offset, 480px))) scale(0.6)`;
                      zIndexVal = 0;
                      opacityVal = 0;
                      pointerEventsVal = 'none';
                    }

                    return (
                      <div
                        key={photo.id || idx}
                        className={`figma-slide ${isActive ? 'active' : ''}`}
                        role="group"
                        aria-roledescription="slide"
                        aria-hidden={!isActive}
                        aria-label={`Slide ${idx + 1} of ${total}: ${photo.title}`}
                        onClick={() => {
                          if (galleryPointerMoved.current) return;
                          if (isActive) {
                            openLightboxWithIndex(idx);
                          } else {
                            handleSelectPhoto(idx);
                          }
                        }}
                        style={{
                          transform: transformStr,
                          zIndex: zIndexVal,
                          opacity: opacityVal,
                          pointerEvents: pointerEventsVal,
                          cursor: isActive ? 'zoom-in' : 'pointer'
                        }}
                      >
                        <div className="figma-slide-inner">
                          {/* Crisp single vehicle image without duplicate backdrop */}
                          <img
                            alt={photo.title}
                            className="figma-slide-img"
                            loading="lazy"
                            src={photo.url}
                            draggable={false}
                          />
                          <div className="figma-slide-overlay" />
                          <div className="figma-slide-content">
                            <h3 className="figma-slide-title">{photo.title}</h3>
                            <p className="figma-slide-label">
                              {photo.tag ? `${photo.tag} · ` : ''}{vehicle.year} {vehicle.name} · View {idx + 1} of {total}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Carousel Controls */}
              <div className="figma-carousel-controls">
                {/* Active Slide Counter & Section Label */}
                <div className="flex items-center gap-2">
                  <span className="figma-carousel-counter" aria-live="polite">
                    <span className="figma-counter-status">{`Slide ${activePhotoIndex + 1} of ${filteredPhotos.length}`}</span>
                    <span aria-hidden="true">{`${activePhotoIndex + 1} of ${filteredPhotos.length}`}</span>
                  </span>
                  <span className="text-zinc-300">·</span>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold font-mono uppercase tracking-wider bg-red-50 text-red-600 border border-red-200/80">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse" />
                    {currentPhoto.tag || (currentPhoto.category === 'interior' ? 'Cabin Interior' : currentPhoto.category === 'details' ? 'Details & Wheels' : 'Exterior Stance')}
                  </span>
                </div>

                {/* Section Filter Pills (Replacing the old <- -> buttons) */}
                <div className="figma-controls-group flex items-center gap-2.5" role="group" aria-label="Vehicle section filters">
                  <div className="inline-flex items-center gap-1 bg-white/95 backdrop-blur-md p-1 rounded-full border border-zinc-200/90 shadow-sm">
                    {[
                      { id: 'all', label: `All (${allPhotos.length})` },
                      { id: 'exterior', label: 'Exterior' },
                      { id: 'interior', label: 'Cabin' },
                      { id: 'details', label: 'Details' },
                    ].map((tab) => {
                      const targetIdx = tab.id === 'all'
                        ? 0
                        : allPhotos.findIndex((p) => p.category === tab.id);

                      const isCurrentSection =
                        (tab.id === 'all' && activePhotoIndex === 0) ||
                        (tab.id === currentPhoto.category);

                      return (
                        <button
                          key={tab.id}
                          type="button"
                          onClick={() => {
                            if (targetIdx !== -1) {
                              setActivePhotoIndex(targetIdx);
                              setGalleryProgress(0);
                            }
                          }}
                          className={`px-3.5 py-1.5 text-xs font-semibold rounded-full transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                            isCurrentSection
                              ? 'bg-red-600 text-white font-bold shadow-xs'
                              : 'text-zinc-600 hover:text-zinc-950 hover:bg-zinc-100'
                          }`}
                        >
                          {isCurrentSection && tab.id !== 'all' && (
                            <span className="w-1.5 h-1.5 rounded-full bg-white shrink-0 animate-pulse" />
                          )}
                          <span>{tab.label}</span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Play / Pause Toggle Button */}
                  <button 
                    type="button" 
                    className="figma-pause-btn" 
                    aria-label={isGalleryPlaying ? "Pause" : "Play"}
                    onClick={() => setIsGalleryPlaying(!isGalleryPlaying)}
                    title={isGalleryPlaying ? "Pause auto-scroll" : "Resume auto-scroll"}
                  >
                    <svg width="36" height="36" viewBox="0 0 36 36" className="figma-pause-ring">
                      <circle cx="18" cy="18" r="17.5" fill="none" stroke="currentColor" strokeWidth="1" className="text-zinc-200" />
                      <circle 
                        cx="18" 
                        cy="18" 
                        r="17" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="2" 
                        strokeDasharray="106.8" 
                        className="figma-pause-progress"
                        style={{ animationPlayState: isGalleryPlaying ? 'running' : 'paused' }} 
                      />
                    </svg>
                    {isGalleryPlaying ? (
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 14" className="figma-pause-icon">
                        <path fill="currentColor" d="M9.91 0h6.1v13.71h-6.1zM0 0h6.1v13.71H0z" />
                      </svg>
                    ) : (
                      <Play className="w-4 h-4 ml-0.5 text-red-600 fill-red-600 relative z-2" />
                    )}
                  </button>
                </div>
              </div>

              <div className="figma-carousel-bottom">
                <p className="figma-carousel-description">
                  {vehicle.tagline || 'From luxury sedans to rugged SUVs and electric pioneers — find the vehicle that matches your lifestyle. Browse, compare, and drive away with confidence.'}
                </p>
              </div>
            </section>

      {/* 3. DETAILED VEHICLE IDENTIFICATION & SPECS */}
      <section className="relative w-full pt-6 pb-12 sm:pb-16 px-4 sm:px-8 text-center max-w-[1360px] mx-auto">
        <div className="relative z-10 space-y-6">
          {/* Detailed Vehicle Identification Header */}
          <div className="text-left max-w-[1240px] mx-auto space-y-4 bg-white border border-zinc-200/90 rounded-2xl p-5 sm:p-7 shadow-[0_2px_8px_-1px_rgba(0,0,0,0.04)]">
            <div className="space-y-1.5">
              <div className="flex flex-wrap items-center gap-2 text-xs font-mono uppercase tracking-wider text-zinc-500 font-semibold">
                <span className="px-2 py-0.5 rounded bg-red-50 text-red-700 font-bold border border-red-200/80">
                  Direct Japanese Import
                </span>
                <span>{vehicle.manufactureYearMonth || `${vehicle.year}/12`}</span>
                <span>•</span>
                <span>{make.toUpperCase()}</span>
                <span>•</span>
                <span>{bodyTypeUpper}</span>
              </div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-zinc-950 tracking-tight leading-tight">
                {vehicle.manufactureYearMonth || `${vehicle.year}/12`} {vehicleDisplayTitle.toUpperCase()}
              </h1>
            </div>

            {/* Model Code, Year, Body Type, Stock ID & Location Badges */}
            <div className="flex flex-wrap items-center gap-2 text-xs font-mono pt-1">
              <span className="bg-zinc-950 text-white px-3 py-1 rounded-lg font-bold tracking-wider shadow-2xs">
                {vehicle.modelCode || 'CBA-GRJ120W'}
              </span>
              <span className="bg-zinc-100 border border-zinc-200/90 text-zinc-800 px-2.5 py-1 rounded-lg font-semibold">
                {vehicle.year}
              </span>
              <span className="bg-zinc-100 border border-zinc-200/90 text-zinc-800 px-2.5 py-1 rounded-lg font-semibold">
                {vehicle.bodyType || 'SUV'}
              </span>
              <span className="bg-red-50 border border-red-200 text-red-700 px-2.5 py-1 rounded-lg font-bold">
                Stock Id: {vehicle.sbtStockId || vehicle.stockNo}
              </span>
              <span className="bg-zinc-100 border border-zinc-200/90 text-zinc-800 px-3 py-1 rounded-lg flex items-center gap-1.5 font-medium">
                <MapPin className="w-3.5 h-3.5 text-red-600 shrink-0" />
                <span>Showroom Location: <strong className="text-zinc-950 font-bold">Next to Ganjoni Primary School, Mombasa</strong></span>
              </span>
            </div>

            {/* Actions Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-zinc-100">
              <div className="text-xs text-zinc-500 font-mono hidden sm:flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Verified Japanese Import · Ganjoni Showroom Mombasa</span>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={handleShareVehicle}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-medium inline-flex items-center gap-1.5 transition-all cursor-pointer border shadow-2xs ${
                    copiedLink
                      ? 'bg-emerald-50 border-emerald-300 text-emerald-800 font-semibold'
                      : 'bg-zinc-50 hover:bg-zinc-100 border-zinc-200 text-zinc-700 hover:text-zinc-950'
                  }`}
                  title="Share vehicle link"
                >
                  {copiedLink ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[2.5]" />
                      <span>Link Copied!</span>
                    </>
                  ) : (
                    <>
                      <Share2 className="w-3.5 h-3.5 text-zinc-600" />
                      <span>Share</span>
                    </>
                  )}
                </button>

                <button
                  onClick={handleViewPhotoList}
                  className="px-3.5 py-1.5 bg-zinc-50 hover:bg-zinc-100 border border-zinc-200 text-zinc-700 hover:text-zinc-950 rounded-lg text-xs font-medium inline-flex items-center gap-1.5 transition-all cursor-pointer shadow-2xs"
                  title="View full photographic gallery"
                >
                  <Eye className="w-3.5 h-3.5 text-zinc-600" />
                  <span>View photo list ({allPhotos.length})</span>
                </button>

                <button
                  onClick={handleDownloadPhotoList}
                  className="px-3.5 py-1.5 bg-zinc-50 hover:bg-zinc-100 border border-zinc-200 text-zinc-700 hover:text-zinc-950 rounded-lg text-xs font-medium inline-flex items-center gap-1.5 transition-all cursor-pointer shadow-2xs"
                  title="Download photo list & specification dossier"
                >
                  <Download className="w-3.5 h-3.5 text-zinc-600" />
                  <span>Download photo list</span>
                </button>
              </div>
            </div>
          </div>

          {/* Clean Apple-Style Specification Strip (Diffused soft shadows, no heavy badges) */}
            <div className="max-w-[1240px] mx-auto mt-8 bg-white border border-zinc-200/90 rounded-2xl p-6 sm:p-8 apple-card-shadow text-left">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 divide-y sm:divide-y-0 sm:divide-x divide-zinc-200">
                {/* 1: Year & Mileage */}
                <div className="space-y-1">
                  <span className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider block font-semibold">
                    Year & Mileage
                  </span>
                  <div className="text-xl sm:text-2xl font-bold text-zinc-950 font-mono">
                    {vehicle.year} · {vehicle.mileageKm.toLocaleString()} KM
                  </div>
                  <p className="text-xs text-zinc-600">
                    JEVIC Odometer Inspection Certified
                  </p>
                </div>

                {/* 2: Auction Grade & Hall */}
                <div className="sm:pl-6 space-y-1 pt-4 sm:pt-0">
                  <span className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider block font-semibold">
                    Auction Grade
                  </span>
                  <div className="text-xl sm:text-2xl font-bold text-zinc-950 font-mono">
                    Grade {vehicle.auctionGrade || '4.5'}
                  </div>
                  <p className="text-xs text-zinc-600 truncate">
                    {vehicle.auctionHall || 'USS Tokyo'} (Japan)
                  </p>
                </div>

                {/* 3: Powertrain & Transmission */}
                <div className="sm:pl-6 space-y-1 pt-4 sm:pt-0">
                  <span className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider block font-semibold">
                    Powertrain
                  </span>
                  <div className="text-xl sm:text-2xl font-bold text-zinc-950">
                    {vehicle.drivetrain}
                  </div>
                  <p className="text-xs text-zinc-600 truncate">
                    {vehicle.engine} · {vehicle.transmission}
                  </p>
                </div>

                {/* 4: Delivered Cash (Obvious price with 7% - 10% off sticker) */}
                <div className="sm:pl-6 space-y-1 pt-4 sm:pt-0">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider block font-semibold">
                      Delivered Cash
                    </span>
                    <span className="bg-red-600 text-white font-extrabold text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wider">
                      {pricing.discountPercent}% OFF
                    </span>
                  </div>
                  <div className="text-xs font-mono line-through text-gray-400">
                    KES {pricing.originalPrice.toLocaleString()}
                  </div>
                  <div className="text-2xl sm:text-[28px] font-black text-red-600 font-mono leading-none">
                    KES {pricing.currentPrice.toLocaleString()}
                  </div>
                  <p className="text-[11px] text-emerald-700 font-bold">
                    Save KES {pricing.savingsKes.toLocaleString()} · 100-Point Overhaul
                  </p>
                </div>
              </div>
            </div>

            {/* 8-Grid Primary Specs Strip */}
            <div className="max-w-[1240px] mx-auto mt-6 bg-white border border-zinc-200/90 rounded-2xl p-5 sm:p-6 shadow-[0_2px_8px_-1px_rgba(0,0,0,0.04)] text-left">
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 sm:gap-4 text-center">
                <div className="p-3 bg-zinc-50 rounded-xl border border-zinc-100">
                  <span className="text-[10px] font-mono text-zinc-500 uppercase block font-semibold">Mileage</span>
                  <span className="text-sm sm:text-base font-bold text-zinc-950 font-mono block mt-0.5">{vehicle.mileageKm.toLocaleString()}km</span>
                </div>
                <div className="p-3 bg-zinc-50 rounded-xl border border-zinc-100">
                  <span className="text-[10px] font-mono text-zinc-500 uppercase block font-semibold">Engine</span>
                  <span className="text-sm sm:text-base font-bold text-zinc-950 font-mono block mt-0.5">{vehicle.engine || '4,000cc'}</span>
                </div>
                <div className="p-3 bg-zinc-50 rounded-xl border border-zinc-100">
                  <span className="text-[10px] font-mono text-zinc-500 uppercase block font-semibold">Transmission</span>
                  <span className="text-sm sm:text-base font-bold text-zinc-950 font-mono block mt-0.5">AT</span>
                </div>
                <div className="p-3 bg-zinc-50 rounded-xl border border-zinc-100">
                  <span className="text-[10px] font-mono text-zinc-500 uppercase block font-semibold">Drive</span>
                  <span className="text-sm sm:text-base font-bold text-zinc-950 font-mono block mt-0.5">{vehicle.drivetrain || '4WD'}</span>
                </div>
                <div className="p-3 bg-zinc-50 rounded-xl border border-zinc-100">
                  <span className="text-[10px] font-mono text-zinc-500 uppercase block font-semibold">Steering</span>
                  <span className="text-sm sm:text-base font-bold text-zinc-950 font-mono block mt-0.5">RHD</span>
                </div>
                <div className="p-3 bg-zinc-50 rounded-xl border border-zinc-100">
                  <span className="text-[10px] font-mono text-zinc-500 uppercase block font-semibold">Fuel</span>
                  <span className="text-sm sm:text-base font-bold text-zinc-950 font-mono block mt-0.5">{vehicle.fuelType.toUpperCase() || 'PETROL'}</span>
                </div>
                <div className="p-3 bg-zinc-50 rounded-xl border border-zinc-100">
                  <span className="text-[10px] font-mono text-zinc-500 uppercase block font-semibold">Door</span>
                  <span className="text-sm sm:text-base font-bold text-zinc-950 font-mono block mt-0.5">{vehicle.doors || 5}</span>
                </div>
                <div className="p-3 bg-zinc-50 rounded-xl border border-zinc-100">
                  <span className="text-[10px] font-mono text-zinc-500 uppercase block font-semibold">Seats</span>
                  <span className="text-sm sm:text-base font-bold text-zinc-950 font-mono block mt-0.5">{vehicle.seats || 8}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

      {/* Section Gradient Fade Transition */}
      <SectionGradientFade />

      {/* 3. CLOSER LOOK: 4-POINT INSPECTION HIGHLIGHTS (RESTORED SECTION) */}
      {vehicle.closerLookPoints && vehicle.closerLookPoints.length > 0 && (
        <section className="w-full bg-[#f8f9fa] py-16 sm:py-24 px-4 sm:px-8 border-t border-zinc-200">
          <div className="max-w-[1240px] mx-auto space-y-12 text-left">
            
            <div className="space-y-2 max-w-3xl">
              <div className="inline-flex items-center gap-2 font-mono text-[11px] text-red-600 uppercase font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-red-600" />
                <span>CLOSER LOOK · 4 KEY ADVANTAGES</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-bold text-zinc-950 tracking-tight leading-tight">
                Engineered for Daily Life & Kenyan Roads
              </h2>
              <p className="text-sm sm:text-base text-zinc-600 leading-relaxed font-normal">
                Key mechanical, comfort, and interior features handpicked for durability and effortless everyday driving.
              </p>
            </div>

            {/* Individual Feature Rows: Image with Description Text Next to It */}
            <div className="space-y-12 sm:space-y-16">
              {vehicle.closerLookPoints.map((point, pIdx) => {
                const isEven = pIdx % 2 === 1;
                return (
                  <div
                    key={point.id || pIdx}
                    className={`flex flex-col lg:flex-row items-center gap-8 sm:gap-12 lg:gap-16 ${
                      isEven ? 'lg:flex-row-reverse' : ''
                    } bg-white p-6 sm:p-10 lg:p-12 rounded-3xl border border-zinc-200/90 shadow-[0_4px_24px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_36px_rgba(0,0,0,0.06)] transition-all duration-300`}
                  >
                    {/* Image Column */}
                    <div 
                      onClick={() => openPhotoByUrl(point.imageUrl)}
                      className="w-full lg:w-1/2 aspect-[4/3] rounded-2xl overflow-hidden bg-zinc-950 relative group cursor-pointer shadow-md shrink-0"
                    >
                      <img
                        src={point.imageUrl}
                        alt={point.title}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                      <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/20 text-xs font-mono text-white font-bold flex items-center gap-2 shadow-lg">
                        <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                        <span>{point.metric}</span>
                      </div>
                      <div className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-md px-3 py-1 rounded-md text-[11px] font-mono font-bold text-zinc-900 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity">
                        Click to enlarge
                      </div>
                    </div>

                    {/* Description Text Column Next to the Image */}
                    <div className="w-full lg:w-1/2 flex flex-col justify-center space-y-4 sm:space-y-5">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-bold text-red-600 uppercase tracking-widest bg-red-50 px-2.5 py-1 rounded-md border border-red-200/60">
                            0{pIdx + 1} · {point.metricLabel || 'HIGHLIGHT'}
                          </span>
                          <span className="font-mono text-xs text-zinc-500 font-semibold">
                            {point.metric}
                          </span>
                        </div>
                        <h3 className="text-2xl sm:text-3xl font-extrabold text-zinc-950 tracking-tight leading-snug">
                          {point.title}
                        </h3>
                        <p className="font-mono text-xs sm:text-sm text-zinc-500 font-semibold uppercase tracking-wider">
                          {point.subtitle}
                        </p>
                      </div>

                      <p className="text-sm sm:text-base text-zinc-700 leading-relaxed font-normal">
                        {point.description}
                      </p>

                      <div className="pt-4 border-t border-zinc-100 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-mono text-zinc-500 uppercase font-semibold">SPECIFICATION:</span>
                          <span className="text-xs sm:text-sm font-bold text-zinc-950 font-mono bg-zinc-100 px-3 py-1 rounded-lg">
                            {point.metric}
                          </span>
                        </div>
                        <button
                          onClick={() => openPhotoByUrl(point.imageUrl)}
                          className="text-xs font-bold text-red-600 hover:text-red-700 inline-flex items-center gap-1.5 cursor-pointer"
                        >
                          <span>View Detail</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>
        </section>
      )}

      {/* Complete Photographic Dossier Grid */}
      <section id="photo-list-section" className="py-16 sm:py-24 px-4 sm:px-8 border-t border-zinc-200 bg-white text-zinc-900">
        <div className="max-w-[1520px] mx-auto space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-red-600 font-bold block mb-1">
                COMPLETE INSPECTION DOSSIER · {allPhotos.length} HIGH-RES PHOTOGRAPHS
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-zinc-950 tracking-tight">
                Full Photographic Fleet Gallery
              </h2>
              <p className="text-xs sm:text-sm text-zinc-600 mt-1">
                Authentic, unedited photography of this {vehicle.year} {vehicle.name} from Japanese auction hall and Mombasa workshop.
              </p>
            </div>

            <button
              onClick={() => openLightboxWithIndex(0)}
              className="bg-zinc-950 hover:bg-zinc-800 text-white text-xs font-bold py-2.5 px-4 rounded-xl shadow-sm hover:shadow transition-all cursor-pointer inline-flex items-center gap-2 self-start sm:self-auto"
            >
              <Maximize2 className="w-3.5 h-3.5" />
              <span>Fullscreen Lightbox View</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {allPhotos.map((photo, idx) => (
              <div
                key={photo.id || idx}
                onClick={() => openLightboxWithIndex(idx)}
                className="group relative rounded-2xl overflow-hidden bg-zinc-900 border border-zinc-200/90 shadow-sm hover:shadow-xl hover:border-red-600/50 transition-all duration-300 cursor-pointer aspect-[4/3]"
              >
                <img
                  src={photo.url}
                  alt={photo.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
                <div className="absolute top-3 left-3">
                  <span className="bg-black/60 backdrop-blur-md text-white font-mono text-[10px] font-bold px-2 py-0.5 rounded-full border border-white/20">
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                </div>
                <div className="absolute top-3 right-3">
                  <span className="bg-white/90 backdrop-blur-md text-zinc-950 text-[10px] font-bold px-2 py-0.5 rounded-md border border-white/40">
                    {photo.tag}
                  </span>
                </div>
                <div className="absolute bottom-3 left-3 right-3">
                  <h4 className="text-white text-xs sm:text-sm font-bold truncate group-hover:text-red-400 transition-colors">
                    {photo.title}
                  </h4>
                  <p className="text-zinc-300 text-[11px] line-clamp-1 mt-0.5">
                    {photo.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section Gradient Fade Transition */}
      <SectionGradientFade />

      {/* 5. TECHNICAL ARCHIVES & AUCTION SHEET */}
      <section className="w-full bg-transparent relative py-20 px-6 sm:px-10">
        <div className="max-w-[1400px] mx-auto space-y-10 relative z-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
            <div className="space-y-2">
              <span className="brand-eyebrow block">FACTORY SPECS & INSPECTION</span>
              <h2 className="text-[26px] sm:text-[34px] font-bold text-zinc-950 tracking-tight">
                Technical Specifications · {vehicle.name}
              </h2>
            </div>

            <button
              onClick={() => setShowAuctionModal(true)}
              className="btn-ghost !py-2.5 !px-4 text-[13px] cursor-pointer"
            >
              <FileText className="w-4 h-4 text-zinc-600" />
              <span>View Japanese Auction Sheet</span>
            </button>
          </div>

          {/* Technical Specs 4-Column Grid with Crystalline Glassmorphism */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 bg-white backdrop-blur-[2px] border border-zinc-200 rounded-2xl space-y-1.5 shadow-[0_8px_30px_rgba(0,0,0,0.3)]">
              <span className="text-[10.5px] font-mono text-zinc-600 uppercase block">Engine & Power</span>
              <p className="font-bold text-zinc-950 text-[15px]">{vehicle.engine}</p>
              <p className="text-[13px] text-zinc-700 font-mono">{vehicle.power} · {vehicle.torque}</p>
            </div>

            <div className="p-5 bg-white backdrop-blur-[2px] border border-zinc-200 rounded-2xl space-y-1.5 shadow-[0_8px_30px_rgba(0,0,0,0.3)]">
              <span className="text-[10.5px] font-mono text-zinc-600 uppercase block">Fuel & Efficiency</span>
              <p className="font-bold text-zinc-950 text-[15px]">{vehicle.fuelType}</p>
              <p className="text-[13px] text-zinc-700 font-mono">{vehicle.fuelEconomy}</p>
            </div>

            <div className="p-5 bg-white backdrop-blur-[2px] border border-zinc-200 rounded-2xl space-y-1.5 shadow-[0_8px_30px_rgba(0,0,0,0.3)]">
              <span className="text-[10.5px] font-mono text-zinc-600 uppercase block">Auction Provenance</span>
              <p className="font-bold text-zinc-950 text-[15px]">{vehicle.auctionHall}</p>
              <p className="text-[13px] text-zinc-950 font-mono font-bold">Grade {vehicle.auctionGrade} · Interior {vehicle.interiorGrade}</p>
            </div>

            <div className="p-5 bg-white backdrop-blur-[2px] border border-zinc-200 rounded-2xl space-y-1.5 shadow-[0_8px_30px_rgba(0,0,0,0.3)]">
              <span className="text-[10.5px] font-mono text-zinc-600 uppercase block">Export Dossier</span>
              <p className="font-bold text-zinc-950 text-[15px]">QISJ & JEVIC</p>
              <p className="text-[13px] text-zinc-700">Genuine Odometer Verified</p>
            </div>
          </div>

          {/* Action Bottom Bar with Crystalline Glassmorphism */}
          <div className="p-8 bg-white backdrop-blur-[2px] border border-zinc-200 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-6 shadow-[0_8px_30px_rgba(0,0,0,0.3)]">
            <div className="space-y-1 text-left">
              <span className="text-[11px] font-mono text-[#71717a] uppercase block">
                DELIVERED HANDOVER PRICE
              </span>
              <span className="font-mono text-[26px] font-bold text-zinc-950">
                KES {vehicle.priceKes.toLocaleString()}
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
              <button
                onClick={() => onScheduleTestDrive(vehicle)}
                className="btn-ghost !py-3 !px-5 text-[13px] cursor-pointer w-full sm:w-auto"
              >
                <Calendar className="w-4 h-4 mr-1.5" />
                <span>Book Test Drive</span>
              </button>

              <button
                onClick={() => {
                  if (onOpenWhispers) onOpenWhispers(vehicle.id);
                }}
                className="bg-[#25D366] hover:bg-[#20ba59] text-white !py-3 !px-5 text-[13px] cursor-pointer w-full sm:w-auto font-bold rounded-lg inline-flex items-center justify-center gap-1.5 shadow-md hover:scale-[1.01] active:scale-98 transition-all"
              >
                <span className="animate-whatsapp-vibrate inline-flex items-center justify-center">
                  <MessageCircle className="w-4 h-4 text-white fill-white" />
                </span>
                <span>Chat on WhatsApp</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 6. JAPANESE AUCTION SHEET NOTES & TRANSLATION */}
      <section className="w-full bg-[#f8f9fa] py-16 sm:py-20 px-4 sm:px-8 border-t border-zinc-200 text-left">
        <div className="max-w-[1240px] mx-auto space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-red-600 font-bold block mb-1">
                JAPANESE AUCTION DOSSIER
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-zinc-950 tracking-tight">
                Auction Sheet Notes & Translation
              </h2>
              <p className="text-xs sm:text-sm text-zinc-600 mt-1">
                Official inspector condition report from {vehicle.auctionHall || 'USS Tokyo'} (Japan). File ref: inspect_en.jpg
              </p>
            </div>

            <button
              onClick={() => setShowAuctionModal(true)}
              className="bg-white hover:bg-zinc-100 text-zinc-900 border border-zinc-300 font-bold text-xs py-2.5 px-4 rounded-xl inline-flex items-center gap-2 shadow-sm cursor-pointer self-start sm:self-auto"
            >
              <FileText className="w-4 h-4 text-red-600" />
              <span>Inspect Original Japanese Sheet</span>
            </button>
          </div>

          <div className="bg-white border border-zinc-200 rounded-2xl p-6 sm:p-8 shadow-[0_2px_8px_-1px_rgba(0,0,0,0.04)] space-y-6">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pb-6 border-b border-zinc-100 text-xs font-mono">
              <div>
                <span className="text-zinc-500 block text-[10px] uppercase font-bold">OVERALL AUCTION GRADE</span>
                <span className="text-xl sm:text-2xl font-black text-zinc-950 block mt-0.5">Grade {vehicle.auctionGrade || '4.5'}</span>
              </div>
              <div>
                <span className="text-zinc-500 block text-[10px] uppercase font-bold">INTERIOR / CABIN GRADE</span>
                <span className="text-xl sm:text-2xl font-black text-zinc-950 block mt-0.5">Grade {vehicle.interiorGrade || 'A'}</span>
              </div>
              <div>
                <span className="text-zinc-500 block text-[10px] uppercase font-bold">ACCIDENT HISTORY</span>
                <span className="text-xl sm:text-2xl font-black text-emerald-600 block mt-0.5">ZERO (No R-Grade)</span>
              </div>
              <div>
                <span className="text-zinc-500 block text-[10px] uppercase font-bold">ODOMETER CERTIFICATION</span>
                <span className="text-xl sm:text-2xl font-black text-zinc-950 block mt-0.5">JEVIC Certified</span>
              </div>
            </div>

            <div className="space-y-3">
              <span className="font-mono text-[11px] font-bold text-zinc-500 uppercase tracking-wider block">
                INSPECTOR REMARKS TRANSLATION (JAPANESE TO ENGLISH):
              </span>
              <div className="bg-zinc-50 border border-zinc-200/80 rounded-xl p-4 text-xs sm:text-sm text-zinc-700 space-y-2 leading-relaxed">
                <p>• One registered Japanese corporate/private owner. Non-smoker cabin with original floor mats.</p>
                <p>• High-grade leather seating preserved in factory state with zero tears or excessive wear.</p>
                <p>• Clean undercarriage with zero coastal corrosion or oil leaks. Factory exhaust and suspension boots intact.</p>
                <p>• Air conditioning compressor and climate controls confirmed ice-cold. Push-button start and smart key system tested.</p>
                <p>• Engine starts smoothly at idle; automatic transmission shifts seamlessly through all gear ratios.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. VEHICLE DETAILS & SPECIFICATIONS TABLES */}
      <section className="w-full bg-white py-16 sm:py-20 px-4 sm:px-8 border-t border-zinc-200 text-left">
        <div className="max-w-[1240px] mx-auto space-y-10">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-red-600 font-bold block mb-1">
              SPECIFICATION DOSSIER
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-zinc-950 tracking-tight">
              Vehicle Details & Dimensions
            </h2>
            <p className="text-xs sm:text-sm text-zinc-600 mt-1">
              Technical factory benchmarks and Japanese export registration metrics.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Vehicle Details Table */}
            <div className="bg-zinc-50 border border-zinc-200 rounded-2xl p-6 sm:p-7 space-y-4 shadow-sm">
              <h3 className="text-base font-bold text-zinc-950 border-b border-zinc-200 pb-3 flex items-center gap-2">
                <FileCheck2 className="w-4 h-4 text-red-600" />
                <span>Vehicle Details</span>
              </h3>

              <div className="divide-y divide-zinc-200 text-xs sm:text-sm">
                <div className="py-2.5 flex justify-between items-center">
                  <span className="text-zinc-500 font-mono">Make</span>
                  <span className="font-bold text-zinc-950">{make.toUpperCase()}</span>
                </div>
                <div className="py-2.5 flex justify-between items-center">
                  <span className="text-zinc-500 font-mono">Model</span>
                  <span className="font-mono font-bold text-zinc-950">{vehicle.modelCode || 'CBA-GRJ120W'}</span>
                </div>
                <div className="py-2.5 flex justify-between items-center">
                  <span className="text-zinc-500 font-mono">Body color</span>
                  <span className="font-semibold text-zinc-950">{vehicle.exteriorColor?.toUpperCase() || 'WHITE'}</span>
                </div>
                <div className="py-2.5 flex justify-between items-center">
                  <span className="text-zinc-500 font-mono">Body Type</span>
                  <span className="font-semibold text-zinc-950">{vehicle.bodyType?.toUpperCase() || 'SUV'}</span>
                </div>
                <div className="py-2.5 flex justify-between items-center">
                  <span className="text-zinc-500 font-mono">Doors</span>
                  <span className="font-mono font-bold text-zinc-950">{vehicle.doors || 5}</span>
                </div>
                <div className="py-2.5 flex justify-between items-center">
                  <span className="text-zinc-500 font-mono">Seats</span>
                  <span className="font-mono font-bold text-zinc-950">{vehicle.seats || 8}</span>
                </div>
              </div>
            </div>

            {/* Specifications Table */}
            <div className="bg-zinc-50 border border-zinc-200 rounded-2xl p-6 sm:p-7 space-y-4 shadow-sm">
              <h3 className="text-base font-bold text-zinc-950 border-b border-zinc-200 pb-3 flex items-center gap-2">
                <Sliders className="w-4 h-4 text-red-600" />
                <span>Specifications</span>
              </h3>

              <div className="divide-y divide-zinc-200 text-xs sm:text-sm">
                <div className="py-2.5 flex justify-between items-center">
                  <span className="text-zinc-500 font-mono">Dimension</span>
                  <span className="font-mono font-bold text-zinc-950">{vehicle.dimensions || '4.76m × 1.88m × 1.85m'}</span>
                </div>
                <div className="py-2.5 flex justify-between items-center">
                  <span className="text-zinc-500 font-mono">M3 (Volume)</span>
                  <span className="font-mono font-bold text-zinc-950">{vehicle.m3 || '16.823'} m³</span>
                </div>
                <div className="py-2.5 flex justify-between items-center">
                  <span className="text-zinc-500 font-mono">Vehicle Weight</span>
                  <span className="font-mono font-bold text-zinc-950">{vehicle.curbWeight || '1,980 kg'}</span>
                </div>
                <div className="py-2.5 flex justify-between items-center">
                  <span className="text-zinc-500 font-mono">Gross Vehicle Weight</span>
                  <span className="font-mono font-bold text-zinc-950">{vehicle.grossWeight || '2,600 kg'}</span>
                </div>
                <div className="py-2.5 flex justify-between items-center">
                  <span className="text-zinc-500 font-mono">Max Loading Capacity</span>
                  <span className="font-mono font-bold text-zinc-950">{vehicle.maxLoadingCapacity || '— kg'}</span>
                </div>
                <div className="py-2.5 flex justify-between items-center">
                  <span className="text-zinc-500 font-mono">Wheelbase</span>
                  <span className="font-mono font-bold text-zinc-950">{vehicle.wheelbase || '2,790 mm'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. CAR OPTIONS CATEGORIZED CHECKLIST */}
      <section className="w-full bg-[#f8f9fa] py-16 sm:py-20 px-4 sm:px-8 border-t border-zinc-200 text-left">
        <div className="max-w-[1240px] mx-auto space-y-10">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-red-600 font-bold block mb-1">
              EQUIPMENT & ACCESSORIES
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-zinc-950 tracking-tight">
              Car Options & Features Checklist
            </h2>
            <p className="text-xs sm:text-sm text-zinc-600 mt-1">
              Verified factory and dealer-installed accessories on this Japanese import.
            </p>
          </div>

          <div className="space-y-6">
            {/* Comfort & Convenience */}
            {(() => {
              const comfort = vehicle.equipmentChecklist?.find((c) => c.category === 'COMFORT & CONVENIENCE') || {
                category: 'COMFORT & CONVENIENCE',
                items: [
                  { name: 'Air Conditioner', active: true },
                  { name: 'Audio Player', active: true },
                  { name: 'Power Steering', active: true },
                ],
              };
              return (
                <div className="bg-white border border-zinc-200 rounded-2xl p-6 sm:p-7 space-y-4 shadow-sm">
                  <span className="font-mono text-xs uppercase tracking-wider text-red-600 font-bold block">
                    {comfort.category}
                  </span>
                  <div className="flex flex-wrap gap-2 text-xs">
                    {comfort.items.map((opt, i) => (
                      <span
                        key={i}
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border font-mono text-xs transition-colors ${
                          opt.active
                            ? 'bg-emerald-50 text-emerald-950 border-emerald-300 font-semibold shadow-xs'
                            : 'bg-zinc-50 text-zinc-400 border-zinc-200/70 opacity-60 line-through'
                        }`}
                      >
                        {opt.active ? (
                          <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[2.5] shrink-0" />
                        ) : (
                          <span className="w-1.5 h-1.5 rounded-full bg-zinc-300 shrink-0" />
                        )}
                        <span>{opt.name}</span>
                      </span>
                    ))}
                  </div>
                </div>
              );
            })()}

            {/* Dress Up & Exterior */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Dress Up */}
              {(() => {
                const dressUp = vehicle.equipmentChecklist?.find((c) => c.category === 'DRESS UP') || {
                  category: 'DRESS UP',
                  items: [],
                };
                return (
                  <div className="bg-white border border-zinc-200 rounded-2xl p-6 sm:p-7 space-y-4 shadow-sm">
                    <span className="font-mono text-xs uppercase tracking-wider text-red-600 font-bold block">
                      {dressUp.category}
                    </span>
                    <div className="flex flex-wrap gap-2 text-xs">
                      {dressUp.items.map((opt, i) => (
                        <span
                          key={i}
                          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border font-mono text-xs transition-colors ${
                            opt.active
                              ? 'bg-emerald-50 text-emerald-950 border-emerald-300 font-semibold shadow-xs'
                              : 'bg-zinc-50 text-zinc-400 border-zinc-200/70 opacity-60 line-through'
                          }`}
                        >
                          {opt.active ? (
                            <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[2.5] shrink-0" />
                          ) : (
                            <span className="w-1.5 h-1.5 rounded-full bg-zinc-300 shrink-0" />
                          )}
                          <span>{opt.name}</span>
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })()}

              {/* Exterior */}
              {(() => {
                const exterior = vehicle.equipmentChecklist?.find((c) => c.category === 'EXTERIOR') || {
                  category: 'EXTERIOR',
                  items: [],
                };
                return (
                  <div className="bg-white border border-zinc-200 rounded-2xl p-6 sm:p-7 space-y-4 shadow-sm">
                    <span className="font-mono text-xs uppercase tracking-wider text-red-600 font-bold block">
                      {exterior.category}
                    </span>
                    <div className="flex flex-wrap gap-2 text-xs">
                      {exterior.items.map((opt, i) => (
                        <span
                          key={i}
                          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border font-mono text-xs transition-colors ${
                            opt.active
                              ? 'bg-emerald-50 text-emerald-950 border-emerald-300 font-semibold shadow-xs'
                              : 'bg-zinc-50 text-zinc-400 border-zinc-200/70 opacity-60 line-through'
                          }`}
                        >
                          {opt.active ? (
                            <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[2.5] shrink-0" />
                          ) : (
                            <span className="w-1.5 h-1.5 rounded-full bg-zinc-300 shrink-0" />
                          )}
                          <span>{opt.name}</span>
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })()}
            </div>

            {/* Safety & Other */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Safety */}
              {(() => {
                const safety = vehicle.equipmentChecklist?.find((c) => c.category === 'SAFETY') || {
                  category: 'SAFETY',
                  items: [],
                };
                return (
                  <div className="bg-white border border-zinc-200 rounded-2xl p-6 sm:p-7 space-y-4 shadow-sm">
                    <span className="font-mono text-xs uppercase tracking-wider text-red-600 font-bold block">
                      {safety.category}
                    </span>
                    <div className="flex flex-wrap gap-2 text-xs">
                      {safety.items.map((opt, i) => (
                        <span
                          key={i}
                          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border font-mono text-xs transition-colors ${
                            opt.active
                              ? 'bg-emerald-50 text-emerald-950 border-emerald-300 font-semibold shadow-xs'
                              : 'bg-zinc-50 text-zinc-400 border-zinc-200/70 opacity-60 line-through'
                          }`}
                        >
                          {opt.active ? (
                            <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[2.5] shrink-0" />
                          ) : (
                            <span className="w-1.5 h-1.5 rounded-full bg-zinc-300 shrink-0" />
                          )}
                          <span>{opt.name}</span>
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })()}

              {/* Other & Remarks */}
              {(() => {
                const other = vehicle.equipmentChecklist?.find((c) => c.category === 'OTHER & REMARKS') || {
                  category: 'OTHER & REMARKS',
                  items: [],
                };
                return (
                  <div className="bg-white border border-zinc-200 rounded-2xl p-6 sm:p-7 space-y-4 shadow-sm">
                    <span className="font-mono text-xs uppercase tracking-wider text-red-600 font-bold block">
                      {other.category}
                    </span>
                    <div className="flex flex-wrap gap-2 text-xs">
                      {other.items.map((opt, i) => (
                        <span
                          key={i}
                          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border font-mono text-xs transition-colors ${
                            opt.active
                              ? 'bg-emerald-50 text-emerald-950 border-emerald-300 font-semibold shadow-xs'
                              : 'bg-zinc-50 text-zinc-400 border-zinc-200/70 opacity-60 line-through'
                          }`}
                        >
                          {opt.active ? (
                            <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[2.5] shrink-0" />
                          ) : (
                            <span className="w-1.5 h-1.5 rounded-full bg-zinc-300 shrink-0" />
                          )}
                          <span>{opt.name}</span>
                        </span>
                      ))}
                    </div>

                    <div className="pt-3 border-t border-zinc-100 flex items-center gap-2">
                      <span className="font-mono text-xs text-zinc-500 uppercase font-bold">REMARKS:</span>
                      <span className="bg-red-50 border border-red-200 text-red-700 px-2 py-0.5 rounded font-mono text-xs font-bold">
                        {vehicle.equipmentRemarks || `${vehicle.seats || 4}SEATS, 350KG PAYLOAD`}
                      </span>
                      <span className="bg-zinc-100 border border-zinc-200 text-zinc-800 px-2 py-0.5 rounded font-mono text-xs font-semibold">
                        100% Verified Import
                      </span>
                    </div>
                  </div>
                );
              })()}
            </div>
          </div>
        </div>
      </section>

      {/* Showroom Physical Location & Google Maps Embed */}
      <section className="py-16 sm:py-20 px-4 sm:px-8 border-t border-zinc-200 bg-zinc-50 text-zinc-900">
        <div className="max-w-[1240px] mx-auto space-y-8 text-left">
          <div className="space-y-1">
            <span className="font-mono text-xs uppercase tracking-widest text-red-600 font-bold block">
              PHYSICAL SHOWROOM & INSPECTION BAY
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-zinc-950 tracking-tight">
              View & Test Drive in Mombasa
            </h2>
            <p className="text-xs sm:text-sm text-zinc-600 max-w-2xl">
              This {vehicle.year} {vehicle.name} is stationed at our flagship showroom next to Ganjoni Primary School, Mombasa. Put it on our workshop hoist, inspect its Japanese export dossier, or take it on an extended test drive.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Showroom Details Column */}
            <div className="lg:col-span-5 bg-white border border-zinc-200 rounded-2xl p-6 sm:p-8 flex flex-col justify-between space-y-6 shadow-sm">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-red-600 text-white flex items-center justify-center shrink-0 shadow-sm mt-0.5">
                    <MapPin className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <span className="text-[11px] font-mono font-bold text-red-600 uppercase tracking-wider block">SHOWROOM ADDRESS</span>
                    <h3 className="text-lg font-bold text-zinc-950 leading-snug">
                      Next to Ganjoni Primary School
                    </h3>
                    <p className="text-xs text-zinc-600 mt-0.5">
                      Mombasa, Kenya · Dedicated customer parking & handover bay on site
                    </p>
                  </div>
                </div>

                <div className="border-t border-zinc-100 pt-4 space-y-3 text-xs">
                  <div className="flex items-center gap-2.5 text-zinc-700 font-medium">
                    <Clock className="w-4 h-4 text-zinc-500 shrink-0" />
                    <span>Mon – Sat: 8:00 AM – 6:00 PM (Sundays by appointment)</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-zinc-700 font-medium">
                    <Phone className="w-4 h-4 text-zinc-500 shrink-0" />
                    <span>Direct Helpline: 0180 423 075 (WhatsApp & Calls)</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-emerald-700 font-semibold">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>In-house 100-point inspection hoist available for viewing</span>
                  </div>
                </div>
              </div>

              <div className="pt-2 space-y-2.5">
                <a
                  href="https://maps.app.goo.gl/ALv491SA67CFww1f7"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-5 rounded-xl text-xs sm:text-sm inline-flex items-center justify-center gap-2 shadow-sm transition-all hover:scale-[1.01] active:scale-98 cursor-pointer"
                >
                  <Navigation className="w-4 h-4" />
                  <span>Get Google Maps Directions</span>
                </a>
                <a
                  href={`https://wa.me/254180423075?text=Hello%20Alberka%20Enterprises,%20I%20would%20like%20to%20view%20the%20${encodeURIComponent(vehicle.year + ' ' + vehicle.name)}%20(Stock%20ID:%20${encodeURIComponent(vehicle.sbtStockId || vehicle.stockNo)})%20at%20your%20showroom%20next%20to%20Ganjoni%20Primary%20School,%20Mombasa.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-zinc-100 hover:bg-zinc-200 text-zinc-900 font-semibold py-2.5 px-5 rounded-xl text-xs inline-flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Book Viewing on WhatsApp</span>
                </a>
              </div>
            </div>

            {/* Interactive Google Maps Frame */}
            <div className="lg:col-span-7 bg-white border border-zinc-200 rounded-2xl overflow-hidden shadow-sm min-h-[340px] sm:min-h-[400px] relative">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m10!1m8!1m3!1d994.9464693737012!2d39.66370568422173!3d-4.064016499896472!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2ske!4v1795000396644!5m2!1sen!2ske"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: '340px' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
                title="Alberka Motors Showroom Location"
                className="w-full h-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Similar Vehicles in Stock — 4-Card Responsive Grid */}
      <section className="py-16 sm:py-24 px-4 sm:px-8 border-t border-zinc-200 bg-white text-zinc-900">
        <div className="max-w-[1520px] mx-auto space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-red-600 font-bold block mb-1">
                YOU MAY ALSO CONSIDER
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-zinc-950 tracking-tight">
                Similar Vehicles in Stock
              </h2>
              <p className="text-xs sm:text-sm text-zinc-600 mt-1">
                Inspected Japanese units with matching category and price bracket.
              </p>
            </div>
            
            <div className="flex items-center gap-3">
              {onSelectHub && currentModelHub && (
                <button
                  onClick={() => onSelectHub(currentModelHub.id)}
                  className="bg-red-50 hover:bg-red-100 text-red-700 font-bold text-xs py-2.5 px-4 rounded-lg border border-red-200 inline-flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <span>Explore All {currentModelHub.name} Units</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
              <button
                onClick={onBackToFleet}
                className="btn-ghost !text-xs !py-2.5 !px-4 inline-flex items-center gap-1.5 cursor-pointer"
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
          className="fixed inset-0 z-[9999] bg-zinc-950/70 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto animate-fadeIn"
          onClick={() => setShowAuctionModal(false)}
        >
          <div 
            className="max-w-[780px] w-full bg-white border border-zinc-200/90 p-6 sm:p-8 space-y-6 text-left my-auto rounded-2xl shadow-2xl relative text-zinc-900 animate-scaleIn"
            onClick={(e) => e.stopPropagation()}
          >
            
            {/* Header & Close */}
            <div className="flex items-start justify-between border-b border-zinc-200/90 pb-4">
              <div>
                <div className="inline-flex items-center gap-2 mb-1.5">
                  <span className="font-mono text-[10px] text-red-700 uppercase font-bold bg-red-50 px-2.5 py-0.5 rounded border border-red-200">
                    AUTHENTIC JAPANESE EXPORT SHEET
                  </span>
                  <span className="font-mono text-xs font-bold text-zinc-700 bg-zinc-100 px-2 py-0.5 rounded border border-zinc-200">
                    LOT #{vehicle.stockNo.replace(/[^0-9]/g, '') || '19'}
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-extrabold text-zinc-950 tracking-tight">
                  {vehicle.name} · {vehicle.stockNo}
                </h3>
                <p className="text-xs sm:text-sm text-zinc-600 mt-1">
                  Direct inspection document from {vehicle.auctionHall || 'CAA Tokyo / Direct Japanese Import'}. Authenticated via QISJ Pre-Shipment Inspection.
                </p>
              </div>

              <button
                onClick={() => setShowAuctionModal(false)}
                className="px-3.5 py-1.5 rounded-lg border border-zinc-200 text-xs font-mono text-zinc-800 bg-zinc-50 hover:bg-zinc-100 cursor-pointer shrink-0 font-semibold transition-colors"
              >
                Close
              </button>
            </div>

            {/* Score Grid & Authentic Japanese Hanko Stamp */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 bg-zinc-50 border border-zinc-200/90 rounded-xl flex flex-col justify-between shadow-2xs">
                <div>
                  <span className="text-[10px] font-mono text-zinc-500 uppercase font-bold block mb-1">OVERALL GRADE</span>
                  <span className="font-mono text-3xl sm:text-4xl text-zinc-950 font-extrabold block leading-none">{vehicle.auctionGrade || '4.0'}</span>
                  <span className="text-xs text-zinc-600 mt-1.5 block font-medium">Pristine Original Condition</span>
                </div>
                <div className="mt-3 pt-2.5 border-t border-zinc-200 flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full border border-red-500 bg-red-50 text-red-600 flex items-center justify-center text-xs font-bold font-serif">
                    合
                  </div>
                  <span className="text-xs text-zinc-800 font-mono font-bold">USS VERIFIED</span>
                </div>
              </div>

              <div className="p-4 bg-zinc-50 border border-zinc-200/90 rounded-xl flex flex-col justify-between shadow-2xs">
                <div>
                  <span className="text-[10px] font-mono text-zinc-500 uppercase font-bold block mb-1">INTERIOR GRADE</span>
                  <span className="font-mono text-3xl sm:text-4xl text-zinc-950 font-extrabold block leading-none">{vehicle.interiorGrade || 'B'}</span>
                  <span className="text-xs text-zinc-600 mt-1.5 block font-medium">Zero smoke, zero pet wear</span>
                </div>
                <div className="mt-3 pt-2.5 border-t border-zinc-200 flex items-center gap-2">
                  <span className="text-xs text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded font-mono font-bold">QISJ PASSED</span>
                </div>
              </div>

              <div className="p-4 bg-zinc-50 border border-zinc-200/90 rounded-xl flex flex-col justify-between shadow-2xs">
                <div>
                  <span className="text-[10px] font-mono text-zinc-500 uppercase font-bold block mb-1">VERIFIED ODOMETER</span>
                  <span className="font-mono text-2xl sm:text-3xl text-zinc-950 font-extrabold block leading-none mt-1">
                    {vehicle.mileageKm.toLocaleString()} KM
                  </span>
                  <span className="text-xs text-zinc-600 mt-1.5 block font-medium">Certified Japanese JEVIC</span>
                </div>
                <div className="mt-3 pt-2.5 border-t border-zinc-200 flex items-center gap-2">
                  <span className="text-xs text-blue-700 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded font-mono font-bold">100% GENUINE</span>
                </div>
              </div>
            </div>

            {/* Vehicle Inspection Blueprint Matrix (Interactive Japanese Inspector Decoder) */}
            <div className="p-5 bg-zinc-50 border border-zinc-200/90 rounded-xl space-y-4">
              <div className="flex items-center justify-between border-b border-zinc-200 pb-2 text-xs font-mono">
                <span className="text-zinc-800 uppercase font-bold">
                  INTERACTIVE PANEL & CHASSIS INSPECTOR (JAPANESE STANDARD)
                </span>
                <span className="text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded font-bold">
                  FRAME DISTORTION: 0%
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs font-mono">
                {[
                  { id: 'front', label: 'FRONT BUMPER', code: 'A1 · Clean hairline', detail: 'Code A1: Negligible scratch under 5cm. Factory plastic bumper clip pins intact, zero curb deformation.' },
                  { id: 'left', label: 'LEFT FLANK', code: 'O · Factory original', detail: 'Code O: Original factory paint verified. Digital micrometer paint thickness 112μm, zero re-sprays.' },
                  { id: 'right', label: 'RIGHT FLANK', code: 'O · Factory original', detail: 'Code O: Zero door dings, flawless panel alignment with factory door seams and weatherstripping.' },
                  { id: 'roof', label: 'PILLARS & ROOF', code: 'XX: NONE · Zero repair', detail: 'Code XX None: All A/B/C pillars and roof retain original factory robotic spot welds. Zero damage.' },
                ].map((pt) => {
                  const isSelected = selectedInspectorPoint === pt.id;
                  return (
                    <button
                      key={pt.id}
                      onClick={() => setSelectedInspectorPoint(pt.id)}
                      className={`p-3 rounded-lg border text-left transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-zinc-950 border-zinc-950 text-white shadow-sm'
                          : 'bg-white border-zinc-200 text-zinc-900 hover:bg-zinc-100'
                      }`}
                    >
                      <span className={`block font-bold text-xs ${isSelected ? 'text-white' : 'text-zinc-950'}`}>{pt.label}</span>
                      <span className={`text-[11px] block mt-1 ${isSelected ? 'text-zinc-300' : 'text-zinc-600'}`}>{pt.code}</span>
                    </button>
                  );
                })}
              </div>

              <div className="p-4 bg-white border border-zinc-200/90 rounded-lg text-left shadow-2xs">
                <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-wider block font-bold mb-1.5">
                  DECODED INSPECTION REPORT:
                </span>
                <p className="text-xs sm:text-sm text-zinc-800 leading-relaxed font-mono">
                  {selectedInspectorPoint === 'front' && 'Front Bumper: Minor microscopic clearcoat hairline. Grille clips, radar sensor bracket, and fog housings original OEM.'}
                  {selectedInspectorPoint === 'left' && 'Left Flank: Factory clearcoat intact. Rocker panels and wheel arches free of corrosion or salt pit marks.'}
                  {selectedInspectorPoint === 'right' && 'Right Flank: Pristine reflection line. Zero parking indentation, glass etching matches chassis VIN.'}
                  {selectedInspectorPoint === 'roof' && 'Pillars & Roof: Laser alignment 100% square. Headliner shows zero sagging or water leak evidence.'}
                </p>
              </div>

              <div className="p-3 bg-zinc-100 border border-zinc-200/80 rounded-lg text-left">
                <p className="text-xs sm:text-sm text-zinc-700 leading-relaxed font-mono">
                  <strong className="text-zinc-950 font-bold">Inspector Notes:</strong> Regular maintenance records verified in Tokyo. Zero frame damage, zero rust. Brakes and steering certified ready for road use.
                </p>
              </div>
            </div>

            {/* Action Bar */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="text-xs text-zinc-600 font-mono">
                Official PDF dispatched via WhatsApp.
              </span>

              <a
                href={`https://wa.me/254180423075?text=Hello%20Alberka%20Enterprises,%20please%20send%20me%20the%20original%20Japanese%20auction%20sheet%20PDF%20for%20the%20${encodeURIComponent(vehicle.year + ' ' + vehicle.name)}%20(Stock%20ID:%20${encodeURIComponent(vehicle.sbtStockId || vehicle.stockNo)})%20from%20${encodeURIComponent(vehicle.auctionHall || 'Direct Japanese Import')}.`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#25D366] hover:bg-[#20ba59] text-white w-full sm:w-auto text-center font-bold px-6 py-3.5 rounded-xl inline-flex items-center justify-center gap-2 shadow-md hover:scale-[1.01] active:scale-98 transition-all text-sm"
              >
                <span className="animate-whatsapp-vibrate inline-flex items-center justify-center">
                  <MessageCircle className="w-4 h-4 text-white fill-white" />
                </span>
                <span>Request Original PDF on WhatsApp</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </a>
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
                  className={`h-11 sm:h-12 w-16 sm:w-20 rounded overflow-hidden border shrink-0 transition-all cursor-pointer ${
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
                className="bg-[#25D366] hover:bg-[#20ba59] text-white !py-2 !px-4 text-xs font-bold rounded-lg inline-flex items-center gap-1.5 shadow-md hover:scale-[1.02] active:scale-98 transition-all"
              >
                <span className="animate-whatsapp-vibrate inline-flex items-center justify-center">
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
