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
  const [dossierTab, setDossierTab] = useState<'auction' | 'specs' | 'features'>('auction');

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
        return;
      } catch (err: any) {
        if (err?.name === 'AbortError') return;
      }
    }

    copyToClipboard(shareUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
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
    <div className="w-full bg-transparent text-zinc-900 pb-16">
      
      {/* 1. FULL-WIDTH 3D COVER FLOW GALLERY */}
      <section className="figma-carousel-section w-full max-w-none flex flex-col justify-start pt-1 pb-4 overflow-hidden relative">
        
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
              className="bg-red-600 hover:bg-red-700 text-white text-xs font-bold py-1.5 px-3.5 rounded-full shadow-sm hover:shadow transition-all cursor-pointer whitespace-nowrap hidden sm:inline-flex items-center gap-1.5"
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
                      transformStr = 'translateX(calc(-1 * var(--figma-slide-offset, 360px))) scale(0.82)';
                      zIndexVal = 5;
                      opacityVal = 0.9;
                      pointerEventsVal = 'auto';
                    } else if (offset === 1) {
                      transformStr = 'translateX(calc(1 * var(--figma-slide-offset, 360px))) scale(0.82)';
                      zIndexVal = 5;
                      opacityVal = 0.9;
                      pointerEventsVal = 'auto';
                    } else if (offset === -2) {
                      transformStr = 'translateX(calc(-2 * var(--figma-slide-offset, 360px))) scale(0.68)';
                      zIndexVal = 2;
                      opacityVal = 0.6;
                      pointerEventsVal = 'auto';
                    } else if (offset === 2) {
                      transformStr = 'translateX(calc(2 * var(--figma-slide-offset, 360px))) scale(0.68)';
                      zIndexVal = 2;
                      opacityVal = 0.6;
                      pointerEventsVal = 'auto';
                    } else {
                      transformStr = `translateX(calc(${offset} * var(--figma-slide-offset, 360px))) scale(0.6)`;
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

      {/* 2. CONSOLIDATED EXECUTIVE DOSSIER & TECHNICAL MATRIX (BENTO COMPACT) */}
      <section className="relative w-full pt-4 pb-8 px-4 sm:px-8 text-center max-w-[1360px] mx-auto">
        <div className="relative z-10 space-y-4 max-w-[1240px] mx-auto text-left">
          
          {/* Header Card: Title, Badges, Quick Actions */}
          <div className="bg-white border border-zinc-200/90 rounded-2xl p-5 sm:p-6 shadow-xs space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2 text-[11px] font-mono uppercase tracking-wider text-zinc-500 font-semibold">
                  <span className="px-2 py-0.5 rounded bg-red-50 text-red-700 font-bold border border-red-200/80">
                    Direct Japanese Import
                  </span>
                  <span className="bg-zinc-100 border border-zinc-200/90 text-zinc-800 px-2 py-0.5 rounded font-mono font-bold">
                    Stock ID: {vehicle.sbtStockId || vehicle.stockNo}
                  </span>
                  <span className="bg-zinc-100 border border-zinc-200/90 text-zinc-700 px-2 py-0.5 rounded font-mono">
                    Code: {vehicle.modelCode || 'CBA-GRJ120W'}
                  </span>
                  <span className="text-zinc-400 hidden sm:inline">•</span>
                  <span className="hidden sm:inline">{vehicle.year} · {bodyTypeUpper}</span>
                </div>
                <h1 className="text-2xl sm:text-3xl md:text-3xl font-extrabold text-zinc-950 tracking-tight leading-tight">
                  {vehicle.year} {vehicleDisplayTitle.toUpperCase()}
                </h1>
                <p className="text-xs sm:text-sm text-zinc-600 font-normal">
                  {vehicle.tagline || vehicle.moniker}
                </p>
              </div>

              {/* Share & Print Buttons */}
              <div className="flex items-center gap-2 self-start sm:self-auto shrink-0">
                <button
                  onClick={handleShareVehicle}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium inline-flex items-center gap-1.5 transition-all cursor-pointer border shadow-2xs ${
                    copiedLink
                      ? 'bg-emerald-50 border-emerald-500 text-emerald-800 font-semibold'
                      : 'bg-zinc-50 hover:bg-zinc-100 border-zinc-200 text-zinc-700 hover:text-zinc-950'
                  }`}
                  title="Share vehicle link"
                >
                  {copiedLink ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[2.5]" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Share2 className="w-3.5 h-3.5 text-zinc-600" />
                      <span>Share</span>
                    </>
                  )}
                </button>

                <button
                  onClick={handleDownloadPhotoList}
                  className="px-3 py-1.5 bg-zinc-50 hover:bg-zinc-100 border border-zinc-200 text-zinc-700 hover:text-zinc-950 rounded-lg text-xs font-medium inline-flex items-center gap-1.5 transition-all cursor-pointer shadow-2xs"
                  title="Print or save vehicle specification dossier"
                >
                  <Download className="w-3.5 h-3.5 text-zinc-600" />
                  <span className="hidden sm:inline">Print Dossier</span>
                </button>
              </div>
            </div>

            {/* Price & Primary Specs Bento Split */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 pt-3 border-t border-zinc-100">
              
              {/* Left Column: Pricing & Purchase Actions (5 cols) */}
              <div className="lg:col-span-5 bg-zinc-50/80 border border-zinc-200/80 rounded-xl p-4 sm:p-5 flex flex-col justify-between space-y-3.5">
                <div className="space-y-1">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-wider font-semibold block">
                      DELIVERED CASH PRICE
                    </span>
                    <span className="inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-bold bg-red-600 text-white font-mono shadow-xs whitespace-nowrap shrink-0">
                      Save KES {pricing.savingsKes.toLocaleString()}
                    </span>
                  </div>

                  <div className="flex items-baseline gap-2 pt-0.5">
                    <span className="text-3xl sm:text-4xl font-extrabold text-red-600 font-mono tracking-tight leading-none">
                      KES {vehicle.priceKes.toLocaleString()}
                    </span>
                    {pricing.hasDiscount && (
                      <span className="text-xs font-mono text-zinc-400 line-through">
                        KES {pricing.originalPrice.toLocaleString()}
                      </span>
                    )}
                  </div>

                  <p className="text-[11px] text-zinc-600 leading-tight pt-1">
                    Includes KRA customs duty, port clearance, 100-point overhaul & Mombasa yard handover.
                  </p>
                </div>

                <div className="space-y-2 pt-1">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <button
                      onClick={() => onScheduleTestDrive(vehicle)}
                      className="bg-red-600 hover:bg-red-700 text-white font-bold py-2.5 px-3 rounded-xl text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-xs active:scale-98"
                    >
                      <Calendar className="w-3.5 h-3.5" />
                      <span>Book Test Drive</span>
                    </button>
                    <button
                      onClick={() => {
                        if (onOpenWhispers) onOpenWhispers(vehicle.id);
                      }}
                      className="bg-[#25D366] hover:bg-[#20ba59] text-white font-bold py-2.5 px-3 rounded-xl text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-xs active:scale-98"
                    >
                      <MessageCircle className="w-3.5 h-3.5 fill-white text-white" />
                      <span>Chat WhatsApp</span>
                    </button>
                  </div>

                  <button
                    onClick={() => setShowAuctionModal(true)}
                    className="w-full bg-white hover:bg-zinc-100 text-zinc-800 border border-zinc-200/90 font-bold py-2 px-3 rounded-xl text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-2xs"
                  >
                    <FileText className="w-3.5 h-3.5 text-red-600" />
                    <span>View Japanese Auction Sheet (Grade {vehicle.auctionGrade || '4.5'})</span>
                  </button>
                </div>
              </div>

              {/* Right Column: Key 6 Mechanical & Inspection Metrics (7 cols) */}
              <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                <div className="p-3 bg-white border border-zinc-200/80 rounded-xl space-y-0.5">
                  <span className="text-[10px] font-mono text-zinc-500 uppercase block font-semibold">Auction Grade</span>
                  <p className="text-base font-bold text-zinc-950 font-mono">Grade {vehicle.auctionGrade || '4.5'}</p>
                  <p className="text-[11px] text-zinc-500 truncate">{vehicle.auctionHall || 'USS Tokyo'} (Japan)</p>
                </div>

                <div className="p-3 bg-white border border-zinc-200/80 rounded-xl space-y-0.5">
                  <span className="text-[10px] font-mono text-zinc-500 uppercase block font-semibold">Mileage</span>
                  <p className="text-base font-bold text-zinc-950 font-mono">{vehicle.mileageKm.toLocaleString()} KM</p>
                  <p className="text-[11px] text-emerald-700 font-semibold truncate">JEVIC Certified</p>
                </div>

                <div className="p-3 bg-white border border-zinc-200/80 rounded-xl space-y-0.5">
                  <span className="text-[10px] font-mono text-zinc-500 uppercase block font-semibold">Drivetrain</span>
                  <p className="text-base font-bold text-zinc-950 truncate">{vehicle.drivetrain || '4WD'}</p>
                  <p className="text-[11px] text-zinc-500 truncate">{vehicle.transmission || 'Automatic'}</p>
                </div>

                <div className="p-3 bg-white border border-zinc-200/80 rounded-xl space-y-0.5">
                  <span className="text-[10px] font-mono text-zinc-500 uppercase block font-semibold">Engine</span>
                  <p className="text-base font-bold text-zinc-950 truncate">{vehicle.engine}</p>
                  <p className="text-[11px] text-zinc-500 truncate">{vehicle.power || vehicle.torque || 'Direct Injection'}</p>
                </div>

                <div className="p-3 bg-white border border-zinc-200/80 rounded-xl space-y-0.5">
                  <span className="text-[10px] font-mono text-zinc-500 uppercase block font-semibold">Fuel & Capacity</span>
                  <p className="text-base font-bold text-zinc-950 truncate">{vehicle.fuelType.toUpperCase()}</p>
                  <p className="text-[11px] text-zinc-500 truncate">{vehicle.seats || 5} Seats · {vehicle.doors || 5} Doors</p>
                </div>

                <div className="p-3 bg-white border border-zinc-200/80 rounded-xl space-y-0.5">
                  <span className="text-[10px] font-mono text-zinc-500 uppercase block font-semibold">Location</span>
                  <p className="text-base font-bold text-zinc-950 truncate">Mombasa Yard</p>
                  <p className="text-[11px] text-zinc-500 truncate">Ganjoni Showroom</p>
                </div>
              </div>
            </div>

            {/* Compact Specs Chip Strip */}
            <div className="pt-2 flex flex-wrap items-center gap-1.5 text-[11px] font-mono text-zinc-600 border-t border-zinc-100">
              <span className="font-bold text-zinc-700">SPEC SUMMARY:</span>
              <span className="bg-zinc-50 border border-zinc-200/70 px-2 py-0.5 rounded">Steering: RHD</span>
              <span className="bg-zinc-50 border border-zinc-200/70 px-2 py-0.5 rounded">Accident History: ZERO (No R-Grade)</span>
              <span className="bg-zinc-50 border border-zinc-200/70 px-2 py-0.5 rounded">Economy: {vehicle.fuelEconomy || '14.2 km/L'}</span>
              <span className="bg-zinc-50 border border-zinc-200/70 px-2 py-0.5 rounded">Dim: {vehicle.dimensions || '4.46m × 1.80m × 1.61m'}</span>
              <span className="bg-zinc-50 border border-zinc-200/70 px-2 py-0.5 rounded">Weight: {vehicle.curbWeight || '1,440 kg'}</span>
              <span className="bg-zinc-50 border border-zinc-200/70 px-2 py-0.5 rounded">Wheelbase: {vehicle.wheelbase || '2,665 mm'}</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. CLOSER LOOK: 4-POINT INSPECTION HIGHLIGHTS (COMPACT BENTO GRID) */}
      {vehicle.closerLookPoints && vehicle.closerLookPoints.length > 0 && (
        <section className="w-full bg-transparent py-8 sm:py-10 px-4 sm:px-8 border-t border-zinc-200/80">
          <div className="max-w-[1240px] mx-auto space-y-6 text-left">
            
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-1.5 font-mono text-[10.5px] text-red-600 uppercase font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-600" />
                  <span>CLOSER LOOK · 4 KEY ADVANTAGES</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-zinc-950 tracking-tight">
                  Engineered for Daily Life & Kenyan Roads
                </h2>
              </div>
              <p className="text-xs text-zinc-500 max-w-md sm:text-right">
                Click any highlight to inspect high-resolution mechanical detail in fullscreen.
              </p>
            </div>

            {/* 4-Card Responsive Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {vehicle.closerLookPoints.map((point, pIdx) => (
                <div
                  key={point.id || pIdx}
                  onClick={() => openPhotoByUrl(point.imageUrl, point.title, point.description)}
                  className="bg-white border border-zinc-200/90 rounded-2xl overflow-hidden shadow-2xs hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
                >
                  <div className="aspect-[16/10] w-full overflow-hidden relative bg-zinc-100">
                    <img
                      src={point.imageUrl}
                      alt={point.title}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-2.5 left-2.5 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-md border border-zinc-200/80 text-[10px] font-mono text-zinc-950 font-bold flex items-center gap-1.5 shadow-2xs">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse" />
                      <span>{point.metric}</span>
                    </div>
                    <div className="absolute bottom-2 right-2 bg-white/95 backdrop-blur-md p-1.5 rounded-md text-zinc-700 shadow-2xs opacity-0 group-hover:opacity-100 transition-opacity">
                      <ZoomIn className="w-3.5 h-3.5" />
                    </div>
                  </div>

                  <div className="p-4 space-y-2 flex-1 flex flex-col justify-between">
                    <div className="space-y-1">
                      <span className="font-mono text-[10px] font-bold text-red-600 uppercase tracking-wider block">
                        0{pIdx + 1} · {point.metricLabel || 'HIGHLIGHT'}
                      </span>
                      <h3 className="text-sm font-bold text-zinc-950 leading-snug group-hover:text-red-600 transition-colors">
                        {point.title}
                      </h3>
                      <p className="text-xs text-zinc-600 leading-relaxed line-clamp-3">
                        {point.description}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-zinc-100 flex items-center justify-between text-[11px] font-mono text-zinc-500">
                      <span>{point.subtitle}</span>
                      <span className="text-red-600 font-bold inline-flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                        <span>Inspect</span>
                        <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>
      )}

      {/* 4. HIGH-DENSITY TABBED TECHNICAL DOSSIER & JAPANESE INSPECTION ARCHIVE */}
      <section className="w-full bg-[#F8F9FB] py-8 sm:py-12 px-4 sm:px-8 border-t border-zinc-200 text-left">
        <div className="max-w-[1240px] mx-auto space-y-6">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-red-600 font-bold block mb-1">
                AUTHENTIC JAPANESE EXPORT ARCHIVE
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-zinc-950 tracking-tight">
                Factory Specifications & Japanese Inspection Dossier
              </h2>
            </div>

            {/* Dossier Tabs */}
            <div className="inline-flex items-center gap-1 bg-white p-1 rounded-xl border border-zinc-200/90 shadow-2xs self-start sm:self-auto">
              <button
                type="button"
                onClick={() => setDossierTab('auction')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer inline-flex items-center gap-1.5 ${
                  dossierTab === 'auction'
                    ? 'bg-red-50 text-red-700 border border-red-200/80 shadow-2xs'
                    : 'text-zinc-600 hover:text-zinc-950 hover:bg-zinc-50'
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Auction Sheet & Inspection</span>
              </button>

              <button
                type="button"
                onClick={() => setDossierTab('specs')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer inline-flex items-center gap-1.5 ${
                  dossierTab === 'specs'
                    ? 'bg-red-50 text-red-700 border border-red-200/80 shadow-2xs'
                    : 'text-zinc-600 hover:text-zinc-950 hover:bg-zinc-50'
                }`}
              >
                <Sliders className="w-3.5 h-3.5" />
                <span>Dimensions & Engine Specs</span>
              </button>

              <button
                type="button"
                onClick={() => setDossierTab('features')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer inline-flex items-center gap-1.5 ${
                  dossierTab === 'features'
                    ? 'bg-red-50 text-red-700 border border-red-200/80 shadow-2xs'
                    : 'text-zinc-600 hover:text-zinc-950 hover:bg-zinc-50'
                }`}
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Options Checklist</span>
              </button>
            </div>
          </div>

          {/* TAB 1: AUCTION SHEET & INSPECTION */}
          {dossierTab === 'auction' && (
            <div className="bg-white border border-zinc-200 rounded-2xl p-6 sm:p-7 shadow-xs space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-100">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 flex-1">
                  <div>
                    <span className="text-zinc-500 block text-[10px] font-mono uppercase font-bold">OVERALL AUCTION GRADE</span>
                    <span className="text-2xl font-black text-zinc-950 font-mono block mt-0.5">Grade {vehicle.auctionGrade || '4.5'}</span>
                  </div>
                  <div>
                    <span className="text-zinc-500 block text-[10px] font-mono uppercase font-bold">INTERIOR GRADE</span>
                    <span className="text-2xl font-black text-zinc-950 font-mono block mt-0.5">Grade {vehicle.interiorGrade || 'A'}</span>
                  </div>
                  <div>
                    <span className="text-zinc-500 block text-[10px] font-mono uppercase font-bold">ACCIDENT HISTORY</span>
                    <span className="text-2xl font-black text-emerald-700 font-mono block mt-0.5">ZERO (No R-Grade)</span>
                  </div>
                  <div>
                    <span className="text-zinc-500 block text-[10px] font-mono uppercase font-bold">ODOMETER CERTIFICATION</span>
                    <span className="text-2xl font-black text-zinc-950 font-mono block mt-0.5">JEVIC Genuine</span>
                  </div>
                </div>

                <button
                  onClick={() => setShowAuctionModal(true)}
                  className="bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 font-bold text-xs py-2.5 px-4 rounded-xl inline-flex items-center gap-2 shadow-2xs cursor-pointer self-start sm:self-auto shrink-0 transition-colors"
                >
                  <FileText className="w-4 h-4 text-red-600" />
                  <span>Inspect Original Japanese Sheet</span>
                </button>
              </div>

              <div className="space-y-2">
                <span className="font-mono text-[11px] font-bold text-zinc-500 uppercase tracking-wider block">
                  INSPECTOR REMARKS TRANSLATION (JAPANESE TO ENGLISH):
                </span>
                <div className="bg-zinc-50 border border-zinc-200/80 rounded-xl p-4 text-xs sm:text-sm text-zinc-700 space-y-2 leading-relaxed">
                  <p>• One registered Japanese corporate/private owner. Non-smoker cabin with original factory mats.</p>
                  <p>• Factory seating preserved with zero tears or excessive bolster wear. All seat adjusters operational.</p>
                  <p>• Clean undercarriage with zero coastal corrosion or fluid leaks. Factory exhaust and suspension boots fully intact.</p>
                  <p>• Air conditioning compressor confirmed ice-cold. Push-button start, smart key system, and reverse camera tested.</p>
                  <p>• Engine starts smoothly at idle; automatic transmission shifts seamlessly through all gear ratios.</p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: SPECIFICATIONS & DIMENSIONS */}
          {dossierTab === 'specs' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="bg-white border border-zinc-200 rounded-2xl p-5 sm:p-6 space-y-3 shadow-xs">
                <h3 className="text-sm font-bold text-zinc-950 border-b border-zinc-100 pb-2.5 flex items-center gap-2">
                  <FileCheck2 className="w-4 h-4 text-red-600" />
                  <span>Vehicle Identification</span>
                </h3>
                <div className="divide-y divide-zinc-100 text-xs">
                  <div className="py-2 flex justify-between items-center"><span className="text-zinc-500 font-mono">Make</span><span className="font-bold text-zinc-950">{make.toUpperCase()}</span></div>
                  <div className="py-2 flex justify-between items-center"><span className="text-zinc-500 font-mono">Model Code</span><span className="font-mono font-bold text-zinc-950">{vehicle.modelCode || 'CBA-GRJ120W'}</span></div>
                  <div className="py-2 flex justify-between items-center"><span className="text-zinc-500 font-mono">Exterior Color</span><span className="font-semibold text-zinc-950">{vehicle.exteriorColor?.toUpperCase() || 'BLACK'}</span></div>
                  <div className="py-2 flex justify-between items-center"><span className="text-zinc-500 font-mono">Body Type</span><span className="font-semibold text-zinc-950">{vehicle.bodyType?.toUpperCase() || 'SUV'}</span></div>
                  <div className="py-2 flex justify-between items-center"><span className="text-zinc-500 font-mono">Engine & Capacity</span><span className="font-bold text-zinc-950">{vehicle.engine}</span></div>
                  <div className="py-2 flex justify-between items-center"><span className="text-zinc-500 font-mono">Power & Torque</span><span className="font-mono text-zinc-800">{vehicle.power || '154 HP'} · {vehicle.torque || '196 Nm'}</span></div>
                </div>
              </div>

              <div className="bg-white border border-zinc-200 rounded-2xl p-5 sm:p-6 space-y-3 shadow-xs">
                <h3 className="text-sm font-bold text-zinc-950 border-b border-zinc-100 pb-2.5 flex items-center gap-2">
                  <Sliders className="w-4 h-4 text-red-600" />
                  <span>Dimensions & Weights</span>
                </h3>
                <div className="divide-y divide-zinc-100 text-xs">
                  <div className="py-2 flex justify-between items-center"><span className="text-zinc-500 font-mono">Dimensions (L × W × H)</span><span className="font-mono font-bold text-zinc-950">{vehicle.dimensions || '4.46m × 1.80m × 1.61m'}</span></div>
                  <div className="py-2 flex justify-between items-center"><span className="text-zinc-500 font-mono">Curb Weight</span><span className="font-mono font-bold text-zinc-950">{vehicle.curbWeight || '1,440 kg'}</span></div>
                  <div className="py-2 flex justify-between items-center"><span className="text-zinc-500 font-mono">Gross Vehicle Weight</span><span className="font-mono font-bold text-zinc-950">{vehicle.grossWeight || '1,940 kg'}</span></div>
                  <div className="py-2 flex justify-between items-center"><span className="text-zinc-500 font-mono">Wheelbase</span><span className="font-mono font-bold text-zinc-950">{vehicle.wheelbase || '2,665 mm'}</span></div>
                  <div className="py-2 flex justify-between items-center"><span className="text-zinc-500 font-mono">Fuel Economy</span><span className="font-mono font-bold text-zinc-950">{vehicle.fuelEconomy || '14.2 km/L'}</span></div>
                  <div className="py-2 flex justify-between items-center"><span className="text-zinc-500 font-mono">M3 Shipping Volume</span><span className="font-mono font-bold text-zinc-950">{vehicle.m3 || '12.92'} m³</span></div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: OPTIONS CHECKLIST */}
          {dossierTab === 'features' && (
            <div className="bg-white border border-zinc-200 rounded-2xl p-5 sm:p-6 shadow-xs space-y-4">
              <div className="flex flex-wrap gap-2 text-xs">
                {(() => {
                  const allItems = (vehicle.equipmentChecklist || []).flatMap((c) => c.items);
                  const displayItems = allItems.length > 0 ? allItems : [
                    { name: 'Air Conditioner', active: true },
                    { name: 'Power Steering', active: true },
                    { name: 'Power Windows', active: true },
                    { name: 'Anti-Lock Brakes (ABS)', active: true },
                    { name: 'Airbag (Driver & Passenger)', active: true },
                    { name: 'Side Airbags', active: true },
                    { name: 'Smart Key / Push Start', active: true },
                    { name: 'Navigation / Display Audio', active: true },
                    { name: 'Reverse Parking Camera', active: true },
                    { name: 'Alloy Wheels', active: true },
                    { name: 'Fog Lights', active: true },
                    { name: 'EyeSight Driver Assist / Pre-Crash', active: true },
                    { name: 'Adaptive Cruise Control', active: true },
                    { name: 'Lane Keep Assist', active: true },
                    { name: 'Electronic Stability Control (ESC)', active: true },
                  ];
                  return displayItems.map((opt, i) => (
                    <span
                      key={i}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border font-mono text-xs ${
                        opt.active
                          ? 'bg-zinc-50 text-zinc-900 border-zinc-200 font-semibold'
                          : 'bg-zinc-50/50 text-zinc-400 border-zinc-200/50 opacity-50 line-through'
                      }`}
                    >
                      {opt.active ? (
                        <Check className="w-3.5 h-3.5 text-red-600 stroke-[2.5] shrink-0" />
                      ) : (
                        <span className="w-1.5 h-1.5 rounded-full bg-zinc-300 shrink-0" />
                      )}
                      <span>{opt.name}</span>
                    </span>
                  ));
                })()}
              </div>

              <div className="pt-3 border-t border-zinc-100 flex items-center gap-2">
                <span className="font-mono text-xs text-zinc-500 uppercase font-bold">REMARKS:</span>
                <span className="bg-red-50 border border-red-200 text-red-700 px-2 py-0.5 rounded font-mono text-xs font-bold">
                  {vehicle.equipmentRemarks || `${vehicle.seats || 5} SEATS · 100% FACTORY ORIGINAL`}
                </span>
              </div>
            </div>
          )}

        </div>
      </section>

      {/* Showroom Physical Location & Google Maps Embed */}
      <section className="py-8 sm:py-10 px-4 sm:px-8 border-t border-zinc-200 bg-zinc-50 text-zinc-900">
        <div className="max-w-[1240px] mx-auto space-y-6 text-left">
          <div className="space-y-1">
            <span className="font-mono text-xs uppercase tracking-widest text-red-600 font-bold block">
              PHYSICAL SHOWROOM & INSPECTION BAY
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-zinc-950 tracking-tight">
              View & Test Drive in Mombasa
            </h2>
            <p className="text-xs sm:text-sm text-zinc-600 max-w-2xl">
              This {vehicle.year} {vehicle.name} is stationed at our flagship showroom next to Ganjoni Primary School, Mombasa. Put it on our workshop hoist, inspect its Japanese export dossier, or take it on an extended test drive.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            {/* Showroom Details Column */}
            <div className="lg:col-span-5 bg-white border border-zinc-200 rounded-2xl p-5 sm:p-6 flex flex-col justify-between space-y-5 shadow-xs">
              <div className="space-y-3.5">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-red-600 text-white flex items-center justify-center shrink-0 shadow-xs mt-0.5">
                    <MapPin className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono font-bold text-red-600 uppercase tracking-wider block">SHOWROOM ADDRESS</span>
                    <h3 className="text-base font-bold text-zinc-950 leading-snug">
                      Next to Ganjoni Primary School
                    </h3>
                    <p className="text-xs text-zinc-600 mt-0.5">
                      Mombasa, Kenya · Dedicated customer parking & handover bay on site
                    </p>
                  </div>
                </div>

                <div className="border-t border-zinc-100 pt-3 space-y-2.5 text-xs">
                  <div className="flex items-center gap-2 text-zinc-700 font-medium">
                    <Clock className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                    <span>Mon – Sat: 8:00 AM – 6:00 PM (Sundays by appointment)</span>
                  </div>
                  <div className="flex items-center gap-2 text-zinc-700 font-medium">
                    <Phone className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                    <span>Direct Helpline: 0180 423 075 (WhatsApp & Calls)</span>
                  </div>
                  <div className="flex items-center gap-2 text-zinc-800 font-semibold">
                    <CheckCircle2 className="w-3.5 h-3.5 text-red-600 shrink-0" />
                    <span>In-house 100-point inspection hoist available for viewing</span>
                  </div>
                </div>
              </div>

              <div className="pt-1 space-y-2">
                <a
                  href="https://maps.app.goo.gl/ALv491SA67CFww1f7"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2.5 px-4 rounded-xl text-xs inline-flex items-center justify-center gap-2 shadow-xs transition-all hover:scale-[1.01] active:scale-98 cursor-pointer"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Get Google Maps Directions</span>
                </a>
                <a
                  href={`https://wa.me/254180423075?text=Hello%20Alberka%20Enterprises,%20I%20would%20like%20to%20view%20the%20${encodeURIComponent(vehicle.year + ' ' + vehicle.name)}%20(Stock%20ID:%20${encodeURIComponent(vehicle.sbtStockId || vehicle.stockNo)})%20at%20your%20showroom%20next%20to%20Ganjoni%20Primary%20School,%20Mombasa.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-zinc-100 hover:bg-zinc-200 text-zinc-900 font-semibold py-2.5 px-4 rounded-xl text-xs inline-flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Book Viewing on WhatsApp</span>
                </a>
              </div>
            </div>

            {/* Interactive Google Maps Frame */}
            <div className="lg:col-span-7 bg-white border border-zinc-200 rounded-2xl overflow-hidden shadow-xs min-h-[260px] sm:min-h-[290px] relative">
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
      <section className="py-8 sm:py-12 px-4 sm:px-8 border-t border-zinc-200 bg-white text-zinc-900">
        <div className="max-w-[1520px] mx-auto space-y-6">
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
                  <span className="text-xs text-zinc-800 bg-zinc-100 border border-zinc-200 px-2 py-0.5 rounded font-mono font-bold">QISJ PASSED</span>
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
                  <span className="text-xs text-zinc-800 bg-zinc-100 border border-zinc-200 px-2 py-0.5 rounded font-mono font-bold">100% GENUINE</span>
                </div>
              </div>
            </div>

            {/* Vehicle Inspection Blueprint Matrix (Interactive Japanese Inspector Decoder) */}
            <div className="p-5 bg-zinc-50 border border-zinc-200/90 rounded-xl space-y-4">
              <div className="flex items-center justify-between border-b border-zinc-200 pb-2 text-xs font-mono">
                <span className="text-zinc-800 uppercase font-bold">
                  INTERACTIVE PANEL & CHASSIS INSPECTOR (JAPANESE STANDARD)
                </span>
                <span className="text-zinc-800 bg-zinc-100 border border-zinc-200 px-2.5 py-0.5 rounded font-bold">
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
                          ? 'bg-red-50 border-red-500 text-zinc-950 shadow-sm ring-1 ring-red-500/30'
                          : 'bg-white border-zinc-200 text-zinc-900 hover:bg-zinc-50'
                      }`}
                    >
                      <span className={`block font-bold text-xs ${isSelected ? 'text-red-700' : 'text-zinc-950'}`}>{pt.label}</span>
                      <span className={`text-[11px] block mt-1 ${isSelected ? 'text-zinc-700 font-medium' : 'text-zinc-600'}`}>{pt.code}</span>
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
