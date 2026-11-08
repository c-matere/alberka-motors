import React, { useState, useRef, useEffect, useCallback } from 'react';
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
  Compass
} from 'lucide-react';
import { Vehicle, EditorialFeature, FeatureSlide } from '../data/vehicles';
import { SkeletonImage } from './SkeletonImage';

interface VehicleStoryViewProps {
  vehicle: Vehicle;
  allVehicles: Vehicle[];
  onSelectVehicle: (v: Vehicle) => void;
  onBackToFleet: () => void;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  onScheduleTestDrive: (v: Vehicle) => void;
  onOpenWhispers?: () => void;
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
    <section className="w-full bg-[#09090b] border-b border-white/[0.08] py-16 sm:py-24 px-4 sm:px-8">
      <div className="max-w-[1240px] mx-auto space-y-8 sm:space-y-10">
        
        {/* Section Header */}
        <div className="space-y-3 max-w-[850px] text-left">
          <div className="inline-flex items-center gap-2">
            <span className="font-mono text-[10.5px] text-zinc-400 uppercase tracking-[0.2em] font-medium">
              {String(sectionIndex + 1).padStart(2, '0')} OF {String(totalSections).padStart(2, '0')} — {feature.badge}
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-[-0.03em] leading-tight">
            {feature.title}
          </h2>

          <p className="text-sm sm:text-base text-zinc-400 leading-relaxed font-normal max-w-2xl">
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
            className="w-full aspect-[16/10] sm:aspect-[21/10] max-h-[580px] overflow-hidden bg-black border border-white/[0.08] rounded-2xl relative group shadow-[0_24px_60px_rgba(0,0,0,0.85)] select-none cursor-pointer"
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
              <div className="bg-black/80 backdrop-blur-md px-3 py-1.5 text-xs font-mono text-white rounded-lg border border-white/15 flex items-center gap-2 shadow-lg">
                <span className="font-bold">{String(activeSlideIndex + 1).padStart(2, '0')}</span>
                <span className="text-zinc-600">/</span>
                <span className="text-zinc-400">{String(feature.slides.length).padStart(2, '0')}</span>
                <span className="text-zinc-600 hidden sm:inline">·</span>
                <span className="text-zinc-300 hidden sm:inline truncate max-w-xs">{activeSlide.title}</span>
              </div>

              <div className="flex items-center gap-2 pointer-events-auto">
                {activeSlide.metric && (
                  <div className="bg-black/80 backdrop-blur-md border border-white/15 px-3 py-1.5 flex items-center gap-2 rounded-lg shadow-lg">
                    <span className="text-[10px] font-mono text-zinc-400 uppercase hidden xs:inline">{activeSlide.metricLabel}:</span>
                    <span className="text-xs font-mono font-bold text-white">{activeSlide.metric}</span>
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
                    className="bg-black/80 hover:bg-black text-zinc-300 hover:text-white p-2 rounded-lg border border-white/15 transition-colors cursor-pointer backdrop-blur-md shadow-lg"
                    title="Expand full-screen"
                  >
                    <Maximize2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>

            {/* Bottom Scrim with Slide Details */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent flex items-end p-5 sm:p-7 pointer-events-none z-10">
              <div className="space-y-1 max-w-2xl text-left">
                <span className="font-mono text-[10.5px] uppercase tracking-wider text-zinc-400 block font-medium">
                  {activeSlide.subtitle}
                </span>
                <h3 className="text-lg sm:text-xl font-bold text-white leading-snug">
                  {activeSlide.title}
                </h3>
                <p className="text-xs sm:text-sm text-zinc-300 line-clamp-2 leading-relaxed font-normal">
                  {activeSlide.description}
                </p>
              </div>
            </div>

            {/* Ambient Chevrons */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleSelectSlide(activeSlideIndex === 0 ? feature.slides.length - 1 : activeSlideIndex - 1);
              }}
              className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-black/70 hover:bg-black text-white border border-white/15 backdrop-blur-md flex items-center justify-center transition-all cursor-pointer z-20"
              title="Previous photo"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleSelectSlide((activeSlideIndex + 1) % feature.slides.length);
              }}
              className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-black/70 hover:bg-black text-white border border-white/15 backdrop-blur-md flex items-center justify-center transition-all cursor-pointer z-20"
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
                        ? 'bg-white/10 text-white border-white/40 shadow-lg'
                        : 'bg-[#0c0c0f] text-zinc-400 hover:text-white border-white/[0.08] hover:border-white/20'
                    }`}
                  >
                    <div className="w-12 h-9 rounded-lg overflow-hidden bg-black shrink-0 border border-white/10">
                      <img src={s.imageUrl} alt={s.title} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <span className={`font-mono text-[10px] block ${isActive ? 'text-white font-bold' : 'text-zinc-500'}`}>
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

            <div className="shrink-0 pl-2 border-l border-white/[0.08]">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-9 h-9 rounded-lg bg-[#0c0c0f] border border-white/[0.08] hover:border-white/20 text-zinc-400 hover:text-white flex items-center justify-center cursor-pointer transition-colors"
                title={isPlaying ? 'Pause slideshow' : 'Play slideshow'}
              >
                {isPlaying ? (
                  <Pause className="w-3.5 h-3.5 text-white" />
                ) : (
                  <Play className="w-3.5 h-3.5 ml-0.5 text-zinc-300" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Architectural Two-Column Dossier: Narrative & Specifications */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 pt-4 text-left border-t border-white/[0.08]">
          
          {/* Left Column: Narrative Prose */}
          <div className="lg:col-span-7 space-y-4">
            <span className="font-mono text-[10px] text-zinc-400 uppercase tracking-widest block font-medium">
              OVERVIEW & COMFORT
            </span>
            <div className="space-y-3.5 text-sm sm:text-[15px] text-zinc-300 leading-relaxed font-normal">
              {feature.narrative.map((para, pIdx) => (
                <p key={pIdx}>
                  {para}
                </p>
              ))}
            </div>

            <div className="pt-2">
              <a
                href={`https://wa.me/254714333888?text=Hello%20Alberka%20Motors,%20I%20have%20questions%20regarding%20the%20${encodeURIComponent(feature.title)}%20on%20the%20${encodeURIComponent(vehicleName)}%20(${stockNo}).`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-semibold text-zinc-300 hover:text-white transition-colors cursor-pointer pt-2 group"
              >
                <span>Ask our workshop about this car</span>
                <ArrowRight className="w-3.5 h-3.5 text-zinc-400 group-hover:text-white transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </div>

          {/* Right Column: Architectural Hairline Specification Matrix */}
          <div className="lg:col-span-5 space-y-2">
            <span className="font-mono text-[10.5px] text-zinc-400 uppercase tracking-widest block font-medium">
              KEY SPECIFICATIONS
            </span>
            <div className="border-t border-white/[0.08]">
              {feature.specs.map((spec, sIdx) => (
                <div
                  key={sIdx}
                  className="py-3 border-b border-white/[0.08] flex flex-col sm:flex-row sm:items-baseline justify-between gap-1.5"
                >
                  <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider shrink-0">
                    {spec.label}
                  </span>
                  <span className="text-xs sm:text-[13px] font-semibold text-white text-left sm:text-right">
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
}) => {
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const [selectedLeatherIndex, setSelectedLeatherIndex] = useState(0);
  const [selectedVeneerIndex, setSelectedVeneerIndex] = useState(0);
  const [bespokeTab, setBespokeTab] = useState<'exterior' | 'interior' | 'veneer' | 'acoustics' | 'kenya-road'>('exterior');
  const [routeMode, setRouteMode] = useState<'expressway' | 'mombasa' | 'rift-valley'>('expressway');
  const [selectedInspectorPoint, setSelectedInspectorPoint] = useState<string>('front');
  const [showAuctionModal, setShowAuctionModal] = useState(false);
  const [acousticMode, setAcousticMode] = useState<'off' | 'ambient' | 'sanctuary'>('off');
  const [copiedToast, setCopiedToast] = useState(false);
  const [modelDropdownOpen, setModelDropdownOpen] = useState(false);

  // Master Photographic Gallery & Lightbox state
  const [galleryFilter, setGalleryFilter] = useState<'all' | 'exterior' | 'interior' | 'details'>('all');
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);
  const [isGalleryLightboxOpen, setIsGalleryLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [isGalleryPlaying, setIsGalleryPlaying] = useState(false);
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

  const filteredPhotos = allPhotos.filter((p) => {
    if (galleryFilter === 'all') return true;
    return p.category === galleryFilter;
  });

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

  // Touch handlers for gallery viewport
  const handleTouchGalleryStart = (e: React.TouchEvent) => {
    setTouchGalleryStartX(e.touches[0].clientX);
  };

  const handleTouchGalleryEnd = (e: React.TouchEvent) => {
    if (touchGalleryStartX === null) return;
    const diff = touchGalleryStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) handleNextPhoto();
      else handlePrevPhoto();
    }
    setTouchGalleryStartX(null);
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

  // Web Audio Simulator
  const audioCtxRef = useRef<AudioContext | null>(null);
  const noiseNodeRef = useRef<AudioNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const filterNodeRef = useRef<BiquadFilterNode | null>(null);

  const stopAcousticAudio = () => {
    if (gainNodeRef.current && audioCtxRef.current) {
      gainNodeRef.current.gain.setTargetAtTime(0.0001, audioCtxRef.current.currentTime, 0.08);
      setTimeout(() => {
        try {
          noiseNodeRef.current?.disconnect();
          gainNodeRef.current?.disconnect();
          filterNodeRef.current?.disconnect();
        } catch (e) {}
        noiseNodeRef.current = null;
        gainNodeRef.current = null;
        filterNodeRef.current = null;
      }, 100);
    }
    setAcousticMode('off');
  };

  const playAcousticSimulation = (mode: 'ambient' | 'sanctuary') => {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioCtx();
      }
      if (audioCtxRef.current.state === 'suspended') {
        audioCtxRef.current.resume();
      }
      if (gainNodeRef.current) {
        try {
          noiseNodeRef.current?.disconnect();
          gainNodeRef.current?.disconnect();
          filterNodeRef.current?.disconnect();
        } catch (e) {}
      }
      const ctx = audioCtxRef.current;
      const bufferSize = ctx.sampleRate * 2;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);

      let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        b0 = 0.99886 * b0 + white * 0.0555179;
        b1 = 0.99332 * b1 + white * 0.0750759;
        b2 = 0.96900 * b2 + white * 0.1538520;
        b3 = 0.86650 * b3 + white * 0.3104856;
        b4 = 0.55000 * b4 + white * 0.5329522;
        b5 = -0.7616 * b5 - white * 0.0168980;
        data[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.08;
        b6 = white * 0.115926;
      }

      const noise = ctx.createBufferSource();
      noise.buffer = buffer;
      noise.loop = true;

      const filter = ctx.createBiquadFilter();
      const gain = ctx.createGain();

      if (mode === 'ambient') {
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(1400, ctx.currentTime);
        gain.gain.setValueAtTime(0.001, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.24, ctx.currentTime + 0.1);
      } else {
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(240, ctx.currentTime);
        gain.gain.setValueAtTime(0.001, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.05, ctx.currentTime + 0.1);
      }

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);
      noise.start();

      noiseNodeRef.current = noise;
      filterNodeRef.current = filter;
      gainNodeRef.current = gain;
      setAcousticMode(mode);
    } catch (err) {
      console.error('Audio simulation error:', err);
    }
  };

  useEffect(() => {
    return () => {
      try {
        audioCtxRef.current?.close();
      } catch (e) {}
    };
  }, []);

  const handleCopySpec = () => {
    const specText = `ALBERKA MOTORS SPECIFICATION:\nVehicle: ${vehicle.name} (${vehicle.stockNo})\nColor: ${activeColor.name}\nInterior: ${activeLeather.name}\nTrim: ${activeVeneer.name}\nHandover Price: KES ${vehicle.priceKes.toLocaleString()}\nInquiry via Alberka Motors Tangana Road Mombasa.`;
    navigator.clipboard?.writeText(specText);
    setCopiedToast(true);
    setTimeout(() => setCopiedToast(false), 3000);
  };

  const leatherHides = [
    { name: 'Warm Cognac Tan', hex: '#8a5229', desc: 'Soft premium tan leather with clean double-stitched seams.' },
    { name: 'Navy & Soft Cream', hex: '#2c3e50', desc: 'Two-tone finish designed to stay cool in Kenyan equatorial sunlight.' },
    { name: 'Obsidian Black Leather', hex: '#161718', desc: 'Durable black leather with subtle contrast stitching.' },
    { name: 'Charcoal Grey', hex: '#4a4b4d', desc: 'Matte easy-to-clean leather built for family durability.' }
  ];

  const veneerFinishes = [
    { name: 'Open-Pore Wood Trim', desc: 'Natural matte wood finish that prevents dashboard glare in bright sunlight.' },
    { name: 'Dark Walnut Wood', desc: 'Deep walnut woodgrain fitted cleanly along the center console and doors.' },
    { name: 'Gloss Piano Black', desc: 'Polished deep black finish for a modern, sleek appearance.' },
    { name: 'Brushed Aluminum', desc: 'Cool metallic trim with precision knurled control dials.' }
  ];

  const activeColor = vehicle.colors[selectedColorIndex] || vehicle.colors[0];
  const activeLeather = leatherHides[selectedLeatherIndex];
  const activeVeneer = veneerFinishes[selectedVeneerIndex];

  return (
    <div className="w-full bg-[#09090b] text-[#f4f4f5] pb-32">
      
      {/* 1. SLIM, UNCONGESTED MODEL SUB-BAR */}
      <div className="w-full bg-[#09090b]/95 backdrop-blur-md border-b border-zinc-800 h-12 px-4 sm:px-8 sticky top-16 z-30 transition-all flex items-center">
        <div className="max-w-[1440px] w-full mx-auto flex items-center justify-between gap-4">
          
          {/* Left: Back Link & Elegant Model Selector Dropdown */}
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <button
              onClick={onBackToFleet}
              className="text-xs font-medium text-zinc-400 hover:text-white flex items-center gap-1.5 cursor-pointer shrink-0 px-2.5 py-1.5 bg-zinc-900 border border-zinc-800 hover:border-zinc-700 rounded-md transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span className="hidden xs:inline">Back to</span>
              <span>Cars</span>
            </button>

            <span className="text-zinc-700 hidden sm:inline">|</span>

            {/* Model Dropdown Trigger */}
            <div className="relative">
              <button
                onClick={() => setModelDropdownOpen(!modelDropdownOpen)}
                className="flex items-center gap-2 px-3 py-1.5 bg-zinc-900 hover:bg-zinc-850 border border-zinc-800 hover:border-zinc-700 rounded-md text-xs font-semibold text-white transition-colors cursor-pointer"
                title="Switch vehicle"
              >
                <span className="font-mono text-zinc-400 text-[11px] hidden sm:inline">{vehicle.stockNo}</span>
                <span className="truncate max-w-[130px] sm:max-w-[200px]">{vehicle.name}</span>
                <ChevronDown className={`w-3.5 h-3.5 text-zinc-400 transition-transform ${modelDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Elegant Dropdown Menu */}
              {modelDropdownOpen && (
                <>
                  <div className="fixed inset-0 z-30" onClick={() => setModelDropdownOpen(false)} />
                  <div className="absolute left-0 top-full mt-2 w-72 sm:w-80 bg-zinc-950/98 backdrop-blur-xl border border-zinc-800 rounded-xl shadow-2xl p-2 z-40 space-y-1">
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
                            className={`w-full flex items-center justify-between p-2 rounded-lg text-left transition-colors cursor-pointer ${
                              isSelected ? 'bg-zinc-800 text-white' : 'hover:bg-zinc-900 text-zinc-300 hover:text-white'
                            }`}
                          >
                            <div className="flex items-center gap-2.5 min-w-0">
                              <div className="w-10 h-8 rounded bg-zinc-900 overflow-hidden shrink-0 border border-zinc-800">
                                <img src={v.heroImage} alt={v.name} className="w-full h-full object-cover" />
                              </div>
                              <div className="min-w-0">
                                <p className="text-xs font-bold truncate">{v.name}</p>
                                <span className="font-mono text-[10px] text-zinc-400">{v.stockNo} · {v.year}</span>
                              </div>
                            </div>
                            <div className="text-right shrink-0 pl-2">
                              <span className="font-mono text-xs font-bold text-white block">KES {(v.priceKes / 1000000).toFixed(2)}M</span>
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

          {/* Right: Cash Price & Primary Action */}
          <div className="flex items-center gap-3 sm:gap-4 shrink-0">
            <div className="hidden sm:flex flex-col text-right font-mono">
              <span className="text-[9.5px] text-zinc-400 uppercase tracking-wider">CASH PRICE</span>
              <span className="text-[13px] font-bold text-white">
                KES {vehicle.priceKes.toLocaleString()}
              </span>
            </div>
            <button
              onClick={() => onScheduleTestDrive(vehicle)}
              className="btn-white !py-1.5 !px-3.5 !text-xs whitespace-nowrap cursor-pointer font-semibold shadow-sm"
            >
              Book Test Drive
            </button>
          </div>

        </div>
      </div>

      {/* 2. HERO: PHOTO, COLOR & METRICS */}
      <section className="relative w-full pt-16 sm:pt-24 pb-20 px-4 sm:px-8 text-center max-w-[1360px] mx-auto">
        <div className="relative z-10 space-y-6">
          
          <div className="inline-flex items-center gap-2">
            <span className="font-mono text-[10.5px] text-zinc-400 uppercase tracking-[0.2em] font-medium">
              GRADE {vehicle.auctionGrade} · {vehicle.auctionHall}
            </span>
          </div>

          <h1 className="text-[38px] sm:text-[56px] md:text-[68px] font-bold text-white tracking-[-0.04em] leading-[1.05] max-w-[1000px] mx-auto">
            {vehicle.name}
          </h1>

          <p className="max-w-[680px] mx-auto text-zinc-400 text-base sm:text-lg leading-relaxed font-normal">
            {vehicle.tagline}
          </p>

          {/* Master Visual Canvas */}
          <div className="relative w-full max-w-[1140px] mx-auto pt-4">
            <div 
              onClick={() => openPhotoByUrl(activeColor.imageUrl)}
              className="w-full aspect-[16/10] sm:aspect-[21/10] max-h-[600px] overflow-hidden bg-black border border-white/[0.08] rounded-2xl relative shadow-[0_24px_60px_rgba(0,0,0,0.85)] cursor-pointer group select-none"
            >
              <SkeletonImage
                key={activeColor.name}
                src={activeColor.imageUrl}
                alt={`${vehicle.name} in ${activeColor.name}`}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-102"
                containerClassName="w-full h-full"
              />

              {/* Fullscreen Expand Action Pill */}
              <div className="absolute top-4 right-4 sm:top-6 sm:right-6 z-20">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    openPhotoByUrl(activeColor.imageUrl);
                  }}
                  className="bg-black/75 hover:bg-black text-white px-3 py-1.5 rounded-lg border border-white/15 text-xs font-mono flex items-center gap-1.5 transition-colors cursor-pointer backdrop-blur-md shadow-md"
                  title="Expand photo fullscreen"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Fullscreen</span>
                </button>
              </div>

              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-6 sm:p-8 pointer-events-none">
                <div className="text-left text-white space-y-0.5">
                  <span className="font-mono text-[10px] text-zinc-400 uppercase tracking-widest block">
                    PAINT FINISH
                  </span>
                  <p className="text-lg sm:text-xl font-bold text-white tracking-tight">
                    {activeColor.name}
                  </p>
                </div>
              </div>
            </div>

            {/* Color Swatch Selector */}
            <div className="flex items-center justify-center gap-3 pt-5">
              <span className="font-mono text-[11px] text-zinc-400 uppercase tracking-wider">
                {activeColor.name}
              </span>
              <div className="flex items-center gap-3">
                {vehicle.colors.map((c, idx) => {
                  const isSelected = selectedColorIndex === idx;
                  return (
                    <button
                      key={idx}
                      onClick={() => setSelectedColorIndex(idx)}
                      className={`w-6 h-6 rounded-full transition-all duration-300 cursor-pointer relative ${
                        isSelected 
                          ? 'ring-2 ring-white ring-offset-2 ring-offset-[#09090b] scale-125 shadow-lg' 
                          : 'opacity-40 hover:opacity-100 hover:scale-110'
                      }`}
                      style={{ backgroundColor: c.hex }}
                      title={c.name}
                    />
                  );
                })}
              </div>
            </div>

            {/* Architectural Metric Matrix (Hairline Dividers) */}
            <div className="border-y border-white/[0.08] py-6 max-w-[1100px] mx-auto mt-8 grid grid-cols-2 sm:grid-cols-4 gap-6 text-left">
              <div>
                <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest block mb-1">
                  YEAR & MILEAGE
                </span>
                <span className="font-mono text-base font-bold text-white">
                  {vehicle.year} · {vehicle.mileageKm.toLocaleString()} KM
                </span>
              </div>

              <div className="sm:border-l sm:border-white/[0.08] sm:pl-6">
                <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest block mb-1">
                  AUCTION GRADE
                </span>
                <span className="font-mono text-base font-bold text-white">
                  {vehicle.auctionGrade} ({vehicle.auctionHall})
                </span>
              </div>

              <div className="border-t sm:border-t-0 sm:border-l border-white/[0.08] pt-4 sm:pt-0 sm:pl-6">
                <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest block mb-1">
                  POWERTRAIN
                </span>
                <span className="text-base font-bold text-white truncate block">
                  {vehicle.drivetrain.split('(')[0]}
                </span>
              </div>

              <div className="border-t sm:border-t-0 sm:border-l border-white/[0.08] pt-4 sm:pt-0 sm:pl-6">
                <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest block mb-1">
                  DELIVERED CASH
                </span>
                <span className="font-mono text-base font-bold text-white">
                  KES {vehicle.priceKes.toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. CUSTOM SPECIFICATIONS SUITE */}
      <section className="w-full bg-[#121215] py-16 px-6 sm:px-10 border-y border-zinc-800">
        <div className="max-w-[1400px] mx-auto space-y-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-2">
              <span className="brand-eyebrow block">CUSTOM OPTIONS & SPECS</span>
              <h2 className="text-[26px] sm:text-[34px] font-bold text-white tracking-tight">
                Finishes & Cabin Comfort
              </h2>
            </div>
            <p className="text-[14.5px] text-[#a1a1aa] max-w-[480px]">
              Review the exterior enamel colors, interior leather finishes, and acoustic sound insulation available for this vehicle.
            </p>
          </div>

          {/* Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar border-b border-zinc-800">
            {[
              { id: 'exterior', label: '1. Exterior Colors', icon: Palette },
              { id: 'interior', label: '2. Seat Leather', icon: Armchair },
              { id: 'veneer', label: '3. Dashboard Trim', icon: Layers },
              { id: 'acoustics', label: '4. Cabin Quietness', icon: Volume2 },
              { id: 'kenya-road', label: '5. Kenyan Route Simulator', icon: Navigation },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = bespokeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setBespokeTab(tab.id as any)}
                  className={`flex items-center gap-2 py-3 px-4 text-xs font-semibold transition-all shrink-0 cursor-pointer border-b-2 -mb-[1px] ${
                    isActive
                      ? 'border-white text-white bg-zinc-900'
                      : 'border-transparent text-zinc-400 hover:text-white'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Tab Panes */}
          <div className="bg-zinc-900/60 p-6 sm:p-8 border border-zinc-800 rounded-xl">
            {bespokeTab === 'exterior' && (
              <div className="space-y-6">
                <div>
                  <span className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider font-semibold block mb-1">
                    FACTORY JAPANESE ENAMEL
                  </span>
                  <h3 className="text-xl font-bold text-white tracking-tight">
                    {activeColor.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-400 mt-1 max-w-xl leading-relaxed">
                    Multi-coat clearcoat enamel with UV protective top layer calibrated for high-altitude sunlight and coastal sea air.
                  </p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {vehicle.colors.map((c, idx) => (
                    <div
                      key={idx}
                      onClick={() => setSelectedColorIndex(idx)}
                      className={`p-3.5 border rounded-lg transition-all cursor-pointer space-y-2 ${
                        selectedColorIndex === idx
                          ? 'border-white bg-zinc-900 shadow-md'
                          : 'border-zinc-800 bg-zinc-950/60 hover:border-zinc-700'
                      }`}
                    >
                      <div className="w-full h-10 rounded border border-zinc-800 flex items-center justify-center" style={{ backgroundColor: c.hex }}>
                        {selectedColorIndex === idx && <CheckCircle2 className="w-5 h-5 text-white drop-shadow-md" />}
                      </div>
                      <span className="text-xs font-semibold text-white block">{c.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {bespokeTab === 'interior' && (
              <div className="space-y-6">
                <div>
                  <span className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider font-semibold block mb-1">
                    SEAT UPHOLSTERY & LEATHER
                  </span>
                  <h3 className="text-xl font-bold text-white tracking-tight">
                    {activeLeather.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-400 mt-1 max-w-xl leading-relaxed">
                    {activeLeather.desc}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {leatherHides.map((hide, idx) => (
                    <div
                      key={idx}
                      onClick={() => setSelectedLeatherIndex(idx)}
                      className={`p-4 border rounded-lg transition-all cursor-pointer space-y-2 ${
                        selectedLeatherIndex === idx
                          ? 'border-white bg-zinc-900 shadow-md'
                          : 'border-zinc-800 bg-zinc-950/60 hover:border-zinc-700'
                      }`}
                    >
                      <div className="w-full h-10 rounded border border-zinc-800 flex items-center justify-center" style={{ backgroundColor: hide.hex }}>
                        {selectedLeatherIndex === idx && <CheckCircle2 className="w-5 h-5 text-white drop-shadow-md" />}
                      </div>
                      <span className="text-xs font-semibold text-white block">{hide.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {bespokeTab === 'veneer' && (
              <div className="space-y-6">
                <div>
                  <span className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider font-semibold block mb-1">
                    DASHBOARD & CONSOLE TRIM
                  </span>
                  <h3 className="text-xl font-bold text-white tracking-tight">
                    {activeVeneer.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-400 mt-1 max-w-xl leading-relaxed">
                    {activeVeneer.desc}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {veneerFinishes.map((veneer, idx) => (
                    <div
                      key={idx}
                      onClick={() => setSelectedVeneerIndex(idx)}
                      className={`p-4 border rounded-lg transition-all cursor-pointer space-y-2 ${
                        selectedVeneerIndex === idx
                          ? 'border-white bg-zinc-900 shadow-md'
                          : 'border-zinc-800 bg-zinc-950/60 hover:border-zinc-700'
                      }`}
                    >
                      <div className="w-full h-10 bg-zinc-800 rounded flex items-center justify-center">
                        <span className="text-[10px] font-mono text-zinc-400 uppercase">PREMIUM TRIM</span>
                      </div>
                      <span className="text-xs font-semibold text-white block">{veneer.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {bespokeTab === 'acoustics' && (
              <div className="space-y-6">
                <div>
                  <span className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider font-semibold block mb-1">
                    CABIN QUIETNESS BENCHMARK
                  </span>
                  <h3 className="text-xl font-bold text-white tracking-tight">
                    38 Decibels · Whisper-Quiet Drive
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-400 mt-1 max-w-xl leading-relaxed">
                    Double-laminated acoustic glass, fluid-filled engine mounts, and injected sound-deadening foam keep road and traffic noise outside.
                  </p>
                </div>

                {/* Audio Simulator */}
                <div className="p-5 bg-black border border-zinc-800 rounded-lg space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <span className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider font-semibold block">
                        AUDITORY COMPARISON
                      </span>
                      <h4 className="text-sm font-bold text-white">
                        Test Cabin Sound Isolation
                      </h4>
                      <p className="text-xs text-zinc-400">
                        Hear the contrast between noisy highway traffic and the quiet Alberka cabin.
                      </p>
                    </div>

                    <div className="flex items-end gap-1 h-8 px-3 py-1 bg-zinc-900 border border-zinc-800 rounded shrink-0">
                      {[40, 75, 55, 90, 65, 35, 80, 50, 95, 60, 45, 70].map((height, i) => (
                        <div
                          key={i}
                          className={`w-1 transition-all duration-300 ${
                            acousticMode === 'ambient'
                              ? 'bg-zinc-400'
                              : acousticMode === 'sanctuary'
                              ? 'bg-white'
                              : 'bg-zinc-800'
                          }`}
                          style={{
                            height: acousticMode === 'ambient'
                              ? `${height}%`
                              : acousticMode === 'sanctuary'
                              ? `${Math.max(15, height * 0.28)}%`
                              : '15%'
                          }}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 pt-1">
                    <button
                      onClick={() => playAcousticSimulation('ambient')}
                      className={`text-xs font-semibold px-4 py-2.5 rounded-md transition-all flex items-center gap-2 cursor-pointer ${
                        acousticMode === 'ambient'
                          ? 'bg-zinc-800 text-white font-bold border border-zinc-600'
                          : 'bg-zinc-900 text-zinc-300 border border-zinc-800 hover:border-zinc-600'
                      }`}
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                      <span>1. Outside Highway Noise (72 dB)</span>
                    </button>

                    <button
                      onClick={() => playAcousticSimulation('sanctuary')}
                      className={`text-xs font-semibold px-4 py-2.5 rounded-md transition-all flex items-center gap-2 cursor-pointer ${
                        acousticMode === 'sanctuary'
                          ? 'bg-white text-zinc-950 font-bold'
                          : 'bg-zinc-900 text-white border border-zinc-800 hover:border-zinc-500'
                      }`}
                    >
                      <Sparkles className="w-3.5 h-3.5 text-zinc-400" />
                      <span>2. Alberka Quiet Cabin (38 dB)</span>
                    </button>

                    {acousticMode !== 'off' && (
                      <button
                        onClick={stopAcousticAudio}
                        className="text-xs px-3 py-2 text-zinc-400 hover:text-white border border-zinc-800 rounded-md flex items-center gap-1.5 cursor-pointer"
                      >
                        <VolumeX className="w-3.5 h-3.5" />
                        <span>Stop Audio</span>
                      </button>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
                  <div className="p-4 bg-zinc-900/60 border border-zinc-800 rounded-lg">
                    <span className="text-[10px] font-mono text-zinc-500 uppercase block">IDLE NOISE LEVEL</span>
                    <span className="font-mono text-xl font-bold text-white block mt-0.5">38 dB</span>
                    <span className="text-xs text-zinc-400 block">Equivalent to a quiet library</span>
                  </div>

                  <div className="p-4 bg-zinc-900/60 border border-zinc-800 rounded-lg">
                    <span className="text-[10px] font-mono text-zinc-500 uppercase block">ACOUSTIC GLASS</span>
                    <span className="font-mono text-xl font-bold text-white block mt-0.5">6.0 MM</span>
                    <span className="text-xs text-zinc-400 block">Double-pane laminate glass</span>
                  </div>

                  <div className="p-4 bg-zinc-900/60 border border-zinc-800 rounded-lg">
                    <span className="text-[10px] font-mono text-zinc-500 uppercase block">ROAD SUSPENSION</span>
                    <span className="text-base font-bold text-white block mt-1">SMOOTH DAMPING</span>
                    <span className="text-xs text-zinc-400 block">Kenyan highway calibration</span>
                  </div>
                </div>
              </div>
            )}

            {bespokeTab === 'kenya-road' && (
              <div className="space-y-6">
                <div>
                  <span className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider font-semibold block mb-1">
                    KENYAN OPERATING SUITABILITY · WORKSHOP PROTOCOL
                  </span>
                  <h3 className="text-xl font-bold text-white tracking-tight">
                    Route Simulation: {vehicle.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-400 mt-1 max-w-xl leading-relaxed">
                    Test how this vehicle's powertrain, clearance, and cooling respond across Kenya's three distinct driving environments.
                  </p>
                </div>

                {/* 3 Corridor Route Selector */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    {
                      id: 'expressway',
                      title: 'Nairobi Expressway & City',
                      corridor: 'Westlands · JKIA · Kilimani',
                      highlight: 'Stop-and-Go & 80 km/h Cruise',
                    },
                    {
                      id: 'mombasa',
                      title: 'Mombasa Coastal Highway',
                      corridor: 'Nyali · Port · SGR Corridor',
                      highlight: 'Tropical 34°C & Saline Air',
                    },
                    {
                      id: 'rift-valley',
                      title: 'Rift Valley & Upcountry',
                      corridor: 'Mai Mahiu · Nakuru · Naivasha',
                      highlight: 'Steep Gradients & Road Ruts',
                    },
                  ].map((route) => {
                    const isSelected = routeMode === route.id;
                    return (
                      <button
                        key={route.id}
                        onClick={() => setRouteMode(route.id as any)}
                        className={`p-4 rounded-xl border text-left transition-all cursor-pointer space-y-1.5 ${
                          isSelected
                            ? 'bg-zinc-900 border-white shadow-lg'
                            : 'bg-zinc-950/60 border-zinc-800 hover:border-zinc-700 text-zinc-400'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-mono text-[10px] uppercase tracking-wider text-zinc-400">
                            {route.corridor}
                          </span>
                          {isSelected && <span className="w-2 h-2 rounded-full bg-emerald-400" />}
                        </div>
                        <h4 className="text-sm font-bold text-white">{route.title}</h4>
                        <p className="text-[11px] text-zinc-400">{route.highlight}</p>
                      </button>
                    );
                  })}
                </div>

                {/* Dynamic Telemetry Matrix */}
                <div className="p-5 bg-black border border-zinc-800 rounded-xl space-y-5">
                  <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                    <div className="flex items-center gap-2">
                      <Gauge className="w-4 h-4 text-zinc-400" />
                      <span className="font-mono text-xs text-white uppercase tracking-wider font-semibold">
                        LIVE SIMULATED TELEMETRY
                      </span>
                    </div>
                    <span className="font-mono text-[11px] text-emerald-400">
                      CALIBRATED FOR KENYA
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <div className="p-3 bg-zinc-900/70 border border-zinc-800/80 rounded-lg">
                      <span className="font-mono text-[10px] text-zinc-400 uppercase block mb-1">
                        EST. CONSUMPTION
                      </span>
                      <span className="font-mono text-lg font-bold text-white block">
                        {routeMode === 'expressway'
                          ? (vehicle.fuelType.toLowerCase().includes('hybrid') || vehicle.fuelType.toLowerCase().includes('power') ? '21.4 Km/L' : '13.8 Km/L')
                          : routeMode === 'mombasa'
                          ? (vehicle.fuelType.toLowerCase().includes('hybrid') || vehicle.fuelType.toLowerCase().includes('power') ? '19.8 Km/L' : '15.2 Km/L')
                          : (vehicle.fuelType.toLowerCase().includes('hybrid') || vehicle.fuelType.toLowerCase().includes('power') ? '17.6 Km/L' : '12.4 Km/L')}
                      </span>
                      <span className="text-[10.5px] text-zinc-400 mt-0.5 block">
                        {routeMode === 'expressway' ? 'Regenerative braking active' : routeMode === 'mombasa' ? 'Aerodynamic continuous cruise' : 'Climbing gear torque hold'}
                      </span>
                    </div>

                    <div className="p-3 bg-zinc-900/70 border border-zinc-800/80 rounded-lg">
                      <span className="font-mono text-[10px] text-zinc-400 uppercase block mb-1">
                        CLEARANCE SAFETY
                      </span>
                      <span className="font-mono text-lg font-bold text-white block">
                        195 - 200 MM
                      </span>
                      <span className="text-[10.5px] text-zinc-400 mt-0.5 block">
                        {routeMode === 'rift-valley' ? '+45mm margin over severe ruts' : 'Zero scrape on suburban bumps'}
                      </span>
                    </div>

                    <div className="p-3 bg-zinc-900/70 border border-zinc-800/80 rounded-lg">
                      <span className="font-mono text-[10px] text-zinc-400 uppercase block mb-1">
                        CABIN NOISE LEVEL
                      </span>
                      <span className="font-mono text-lg font-bold text-white block">
                        {routeMode === 'expressway' ? '40 dB' : routeMode === 'mombasa' ? '43 dB' : '44 dB'}
                      </span>
                      <span className="text-[10.5px] text-zinc-400 mt-0.5 block">
                        Acoustic insulation sealed
                      </span>
                    </div>

                    <div className="p-3 bg-zinc-900/70 border border-zinc-800/80 rounded-lg">
                      <span className="font-mono text-[10px] text-zinc-400 uppercase block mb-1">
                        DRIVETRAIN RESPONSE
                      </span>
                      <span className="font-mono text-lg font-bold text-white block">
                        {vehicle.drivetrain.includes('AWD') ? 'Dynamic AWD' : 'Intelligent 2WD'}
                      </span>
                      <span className="text-[10.5px] text-zinc-400 mt-0.5 block">
                        {routeMode === 'rift-valley' ? 'Active torque split to rear wheels' : 'Smooth fuel-efficient forward pull'}
                      </span>
                    </div>
                  </div>

                  {/* Mechanical Technical Advice */}
                  <div className="p-4 bg-zinc-900/40 border border-zinc-800 rounded-lg text-left space-y-1">
                    <span className="font-mono text-[10px] text-zinc-400 uppercase tracking-widest block font-semibold">
                      ALBERKA WORKSHOP VERDICT:
                    </span>
                    <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                      {routeMode === 'expressway' &&
                        `In dense Nairobi traffic and highway merges, ${vehicle.name}'s powertrain excels with instantaneous throttle response. Regenerative braking captures energy during jams on Uhuru Highway, extending brake pad longevity by up to 40%.`}
                      {routeMode === 'mombasa' &&
                        `On the high-speed coastal corridor, ${vehicle.name}'s dual-fan tropicalized cooling matrix easily manages 34°C ambient humidity. Factory underbody sealant applied at our Mombasa facility prevents salt-mist oxidation along Nyali and Diani routes.`}
                      {routeMode === 'rift-valley' &&
                        `Climbing Mai Mahiu or handling unpaved access roads into Naivasha and Nanyuki, the suspension dampening absorbs washboard ripples smoothly. Generous ground clearance ensures the oil sump and catalytic converter remain safely shielded.`}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Action Bar */}
            <div className="mt-8 pt-6 border-t border-[#27272a] flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-left space-y-1">
                <span className="text-[11px] font-mono text-[#71717a] uppercase block">
                  SELECTED CONFIGURATION:
                </span>
                <p className="text-[14px] font-bold text-white">
                  {vehicle.name} · {activeColor.name} · {activeLeather.name}
                </p>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  onClick={handleCopySpec}
                  className="btn-ghost !text-[12px] !py-2.5 !px-4 cursor-pointer w-full sm:w-auto"
                >
                  {copiedToast ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  <span>{copiedToast ? 'Copied to Clipboard' : 'Copy Specs'}</span>
                </button>

                <a
                  href={`https://wa.me/254714333888?text=Hello%20Alberka%20Motors,%20I%20am%20interested%20in%20the%20${encodeURIComponent(vehicle.name)}%20(${vehicle.stockNo})%20with%20exterior%20${encodeURIComponent(activeColor.name)}%20and%20interior%20${encodeURIComponent(activeLeather.name)}.%20Please%20confirm%20availability%20for%20a%20test%20drive.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-white !py-2.5 !px-5 text-[13px] w-full sm:w-auto text-center font-semibold"
                >
                  <span>Inquire on WhatsApp</span>
                  <ArrowRight className="w-4 h-4 ml-1.5" />
                </a>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 3. CLOSER LOOK: 4-POINT INSPECTION HIGHLIGHTS */}
      {vehicle.closerLookPoints && vehicle.closerLookPoints.length > 0 && (
        <section className="w-full bg-[#09090b] py-16 sm:py-24 px-6 sm:px-10 border-t border-zinc-800">
          <div className="max-w-[1400px] mx-auto space-y-12">
            
            <div className="space-y-2 max-w-3xl">
              <div className="inline-flex items-center gap-2 font-mono text-[11px] text-zinc-400 uppercase font-semibold">
                <span>CLOSER LOOK // 4 KEY ADVANTAGES</span>
              </div>
              <h2 className="text-[28px] sm:text-[38px] font-bold text-white tracking-tight leading-tight">
                Engineered for Daily Life & Kenyan Roads
              </h2>
              <p className="text-[15px] sm:text-[16px] text-zinc-400 leading-relaxed">
                Key mechanical, comfort, and interior features handpicked for durability and effortless everyday driving.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {vehicle.closerLookPoints.map((point, pIdx) => (
                <div
                  key={point.id || pIdx}
                  onClick={() => openPhotoByUrl(point.imageUrl)}
                  className="bg-[#121215] border border-zinc-800 hover:border-zinc-500 rounded-xl overflow-hidden group transition-all duration-400 ease-out flex flex-col justify-between cursor-pointer shadow-lg hover:-translate-y-1.5 hover:shadow-2xl active:scale-[0.99]"
                >
                  <div className="w-full h-48 sm:h-52 overflow-hidden bg-black relative">
                    <img
                      src={point.imageUrl}
                      alt={point.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute top-3 left-3 bg-black/85 backdrop-blur-md px-2.5 py-1 rounded border border-zinc-800 text-[11px] font-mono text-white font-bold flex items-center gap-1.5 shadow-md">
                      <span>{point.metric}</span>
                    </div>
                  </div>

                  <div className="p-5 space-y-2 flex-1 flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider block mb-1">
                        {point.subtitle}
                      </span>
                      <h3 className="text-base font-bold text-white leading-snug">
                        {point.title}
                      </h3>
                      <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
                        {point.description}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-zinc-800/80 flex items-center justify-between text-xs text-zinc-400 font-mono">
                      <span>{point.metricLabel}</span>
                      <span className="text-white font-bold">{point.metric}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>
      )}

      {/* 4. THE MASTER PHOTOGRAPHIC GALLERY (ROLLS-ROYCE STYLE APERTURE) */}
      <section className="w-full bg-[#09090b] py-20 px-4 sm:px-8 border-t border-white/[0.08]">
        <div className="max-w-[1240px] mx-auto space-y-8 sm:space-y-10">
          
          {/* Gallery Header & Filter Controls */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 text-left">
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center gap-2">
                <span className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-zinc-400 font-medium">
                  PHOTOGRAPHIC ARCHIVE
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-[-0.03em] leading-tight">
                Authentic High-Resolution Gallery
              </h2>
              <p className="text-sm sm:text-base text-zinc-400 leading-relaxed font-normal">
                Direct auction photos, interior leather close-ups, and mechanical inspection shots showing the actual condition of this vehicle.
              </p>
            </div>

            {/* Filter Pills */}
            <div className="flex items-center gap-1.5 bg-black/60 backdrop-blur-md p-1 border border-white/[0.08] rounded-xl overflow-x-auto no-scrollbar shrink-0">
              {[
                { id: 'all', label: `All Photos (${allPhotos.length})` },
                { id: 'exterior', label: 'Exterior Stance' },
                { id: 'interior', label: 'Cabin & Seats' },
                { id: 'details', label: 'Details & Wheels' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => {
                    setGalleryFilter(tab.id as any);
                    setActivePhotoIndex(0);
                  }}
                  className={`px-3.5 py-1.5 text-xs font-mono rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                    galleryFilter === tab.id
                      ? 'bg-white text-zinc-950 font-bold shadow-sm'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Master 16:9 Theatrical Gallery Stage (Rolls-Royce Bespoke Aperture) */}
          <div className="relative w-full rounded-2xl overflow-hidden bg-black border border-white/[0.08] shadow-[0_24px_60px_rgba(0,0,0,0.85)]">
            <div 
              ref={stageRef}
              onTouchStart={handleTouchGalleryStart}
              onTouchEnd={handleTouchGalleryEnd}
              onClick={() => openLightboxWithIndex(activePhotoIndex)}
              className="relative w-full h-[360px] sm:h-[480px] md:h-[580px] overflow-hidden select-none cursor-pointer group"
            >
              <img
                key={currentPhoto.url}
                src={currentPhoto.url}
                alt={currentPhoto.title}
                className="w-full h-full object-cover scale-100 transition-transform duration-[6000ms] ease-out group-hover:scale-102"
              />

              {/* Scrim & Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/30 pointer-events-none" />

              {/* Top Bar Badges & Controls */}
              <div className="absolute top-4 left-4 right-4 sm:top-6 sm:left-6 sm:right-6 flex items-center justify-between z-20">
                <div className="flex items-center gap-2">
                  <div className="bg-black/80 backdrop-blur-md px-3 py-1.5 text-xs font-mono text-zinc-300 rounded-lg border border-white/15 flex items-center gap-2 shadow-lg">
                    <span className="text-white font-bold">{String(activePhotoIndex + 1).padStart(2, '0')}</span>
                    <span className="text-zinc-600">/</span>
                    <span className="text-zinc-400">{String(filteredPhotos.length).padStart(2, '0')}</span>
                  </div>
                  <span className="bg-black/80 backdrop-blur-md px-2.5 py-1.5 rounded-lg text-[11px] font-mono text-zinc-300 border border-white/15 hidden xs:inline shadow-lg">
                    {currentPhoto.tag}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsGalleryPlaying(!isGalleryPlaying);
                    }}
                    className="bg-black/80 hover:bg-black text-white p-2 sm:px-3 sm:py-1.5 rounded-lg border border-white/15 transition-all cursor-pointer backdrop-blur-md flex items-center gap-1.5 text-xs font-mono shadow-lg"
                    title={isGalleryPlaying ? 'Pause gallery slideshow' : 'Play gallery slideshow'}
                  >
                    {isGalleryPlaying ? (
                      <Pause className="w-3.5 h-3.5" />
                    ) : (
                      <Play className="w-3.5 h-3.5 ml-0.5 text-white" />
                    )}
                    <span className="hidden sm:inline">{isGalleryPlaying ? 'Pause' : 'Auto Play'}</span>
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      openLightboxWithIndex(activePhotoIndex);
                    }}
                    className="bg-black/80 hover:bg-black text-white p-2 sm:px-3 sm:py-1.5 rounded-lg border border-white/15 transition-all cursor-pointer backdrop-blur-md flex items-center gap-2 text-xs font-mono shadow-lg"
                    title="Expand Fullscreen Lightbox"
                  >
                    <Maximize2 className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Fullscreen</span>
                  </button>
                </div>
              </div>

              {/* Lower-Third Caption Card */}
              <div className="absolute bottom-4 sm:bottom-6 left-4 right-4 sm:left-8 sm:right-8 z-20 pointer-events-none">
                <div className="bg-black/80 backdrop-blur-xl border border-white/15 p-4 sm:p-5 rounded-xl max-w-2xl text-left space-y-1 shadow-2xl">
                  <span className="font-mono text-[10px] text-zinc-400 uppercase tracking-wider block font-semibold">
                    {vehicle.name} · {currentPhoto.tag}
                  </span>
                  <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
                    {currentPhoto.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-normal">
                    {currentPhoto.description}
                  </p>
                </div>
              </div>

              {/* Hairline Stage Controls */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handlePrevPhoto();
                }}
                className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/70 hover:bg-black text-white border border-white/15 flex items-center justify-center transition-all cursor-pointer z-20 backdrop-blur-md"
                title="Previous photo"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleNextPhoto();
                }}
                className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/70 hover:bg-black text-white border border-white/15 flex items-center justify-center transition-all cursor-pointer z-20 backdrop-blur-md"
                title="Next photo"
              >
                <ChevronRight className="w-5 h-5" />
              </button>

              {/* Animated Timing Progress Bar — Pure Crisp White */}
              <div className="absolute bottom-0 inset-x-0 h-[2px] bg-white/10 z-20">
                <div
                  className="h-full bg-white transition-all ease-linear"
                  style={{
                    width: `${isGalleryPlaying ? galleryProgress : ((activePhotoIndex + 1) / filteredPhotos.length) * 100}%`,
                    transitionDuration: isGalleryPlaying ? '50ms' : '200ms',
                  }}
                />
              </div>

            </div>

            {/* Filmstrip Runway Strip with Instant Stage Focus */}
            <div className="p-3 bg-zinc-950 border-t border-zinc-800/80 flex items-center gap-2.5 overflow-x-auto no-scrollbar">
              {filteredPhotos.map((photo, idx) => {
                const isActive = idx === activePhotoIndex;
                return (
                  <button
                    key={photo.id || idx}
                    onClick={() => handleSelectPhoto(idx)}
                    className={`h-16 w-24 sm:w-28 rounded-lg overflow-hidden border shrink-0 transition-all cursor-pointer relative ${
                      isActive
                        ? 'border-white ring-2 ring-white/50 scale-102'
                        : 'border-zinc-800 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={photo.url} alt={photo.title} className="w-full h-full object-cover" />
                    <span className="absolute bottom-1 left-1 bg-black/85 font-mono text-[9px] text-zinc-300 px-1 rounded">
                      0{idx + 1}
                    </span>
                  </button>
                );
              })}
            </div>

          </div>

        </div>
      </section>

      {/* 5. DEDICATED FEATURE SPREADS */}
      <div className="w-full">
        {vehicle.editorialFeatures.map((feat, idx) => (
          <EditorialFeatureSection
            key={feat.id}
            feature={feat}
            sectionIndex={idx}
            totalSections={vehicle.editorialFeatures.length}
            vehicleName={vehicle.name}
            stockNo={vehicle.stockNo}
            onOpenLightbox={(photo) => openPhotoByUrl(photo.url)}
          />
        ))}
      </div>

      {/* 5. TECHNICAL ARCHIVES & AUCTION SHEET */}
      <section className="w-full bg-[#09090b] py-20 px-6 sm:px-10 border-t border-[#27272a]">
        <div className="max-w-[1400px] mx-auto space-y-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
            <div className="space-y-2">
              <span className="brand-eyebrow block">FACTORY SPECS & INSPECTION</span>
              <h2 className="text-[26px] sm:text-[34px] font-bold text-white tracking-tight">
                Technical Specifications · {vehicle.name}
              </h2>
            </div>

            <button
              onClick={() => setShowAuctionModal(true)}
              className="btn-ghost !py-2.5 !px-4 text-[13px] cursor-pointer"
            >
              <FileText className="w-4 h-4 text-zinc-400" />
              <span>View Japanese Auction Sheet</span>
            </button>
          </div>

          {/* Technical Specs 4-Column Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 bg-[#121215] border border-zinc-800 rounded-lg space-y-1.5">
              <span className="text-[10.5px] font-mono text-zinc-500 uppercase block">Engine & Power</span>
              <p className="font-bold text-white text-[15px]">{vehicle.engine}</p>
              <p className="text-[13px] text-zinc-400 font-mono">{vehicle.power} · {vehicle.torque}</p>
            </div>

            <div className="p-5 bg-[#121215] border border-zinc-800 rounded-lg space-y-1.5">
              <span className="text-[10.5px] font-mono text-zinc-500 uppercase block">Fuel & Efficiency</span>
              <p className="font-bold text-white text-[15px]">{vehicle.fuelType}</p>
              <p className="text-[13px] text-zinc-400 font-mono">{vehicle.fuelEconomy}</p>
            </div>

            <div className="p-5 bg-[#121215] border border-zinc-800 rounded-lg space-y-1.5">
              <span className="text-[10.5px] font-mono text-zinc-500 uppercase block">Auction Provenance</span>
              <p className="font-bold text-white text-[15px]">{vehicle.auctionHall}</p>
              <p className="text-[13px] text-white font-mono font-bold">Grade {vehicle.auctionGrade} · Interior {vehicle.interiorGrade}</p>
            </div>

            <div className="p-5 bg-[#121215] border border-zinc-800 rounded-lg space-y-1.5">
              <span className="text-[10.5px] font-mono text-zinc-500 uppercase block">Warranty Protection</span>
              <p className="font-bold text-white text-[15px]">5,000 KM Written</p>
              <p className="text-[13px] text-zinc-400">Engine & Gearbox Included</p>
            </div>
          </div>

          {/* Action Bottom Bar */}
          <div className="p-8 bg-[#121215] border border-[#27272a] rounded-[4px] flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="space-y-1 text-left">
              <span className="text-[11px] font-mono text-[#71717a] uppercase block">
                DELIVERED HANDOVER PRICE
              </span>
              <span className="font-mono text-[26px] font-bold text-white">
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
                  if (onOpenWhispers) onOpenWhispers();
                }}
                className="btn-white !py-3 !px-5 text-[13px] cursor-pointer w-full sm:w-auto font-semibold"
              >
                <MessageCircle className="w-4 h-4 mr-1.5" />
                <span>Chat on WhatsApp</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Japanese Auction Sheet Dossier Modal */}
      {showAuctionModal && typeof document !== 'undefined' && createPortal(
        <div 
          className="fixed inset-0 z-[9999] bg-[#09090b]/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto animate-fadeIn"
          onClick={() => setShowAuctionModal(false)}
        >
          <div 
            className="max-w-[760px] w-full bg-[#121215] border border-[#27272a] p-6 sm:p-8 space-y-6 text-left my-auto rounded-[4px] shadow-2xl relative text-[#f4f4f5] animate-scaleIn"
            onClick={(e) => e.stopPropagation()}
          >
            
            {/* Header & Close */}
            <div className="flex items-start justify-between border-b border-[#27272a] pb-4">
              <div>
                <div className="inline-flex items-center gap-2 mb-1">
                  <span className="font-mono text-[10px] text-zinc-300 uppercase font-semibold bg-zinc-900 px-2 py-0.5 rounded border border-zinc-800">
                    AUTHENTIC JAPANESE EXPORT SHEET
                  </span>
                  <span className="font-mono text-[11px] text-zinc-400">
                    LOT #{vehicle.stockNo.replace(/[^0-9]/g, '') || '7942'}
                  </span>
                </div>
                <h3 className="text-[20px] sm:text-[24px] font-bold text-white tracking-tight">
                  {vehicle.name} · {vehicle.stockNo}
                </h3>
                <p className="text-[13px] text-zinc-400 mt-0.5">
                  Direct inspection document from {vehicle.auctionHall} (Japan). Authenticated via QISJ Pre-Shipment Inspection.
                </p>
              </div>

              <button
                onClick={() => setShowAuctionModal(false)}
                className="btn-ghost !py-1 !px-3 !text-[12px] cursor-pointer shrink-0"
              >
                Close
              </button>
            </div>

            {/* Score Grid & Authentic Japanese Hanko Stamp */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 bg-zinc-900/80 border border-zinc-800 rounded-lg flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-mono text-zinc-500 uppercase block mb-1">OVERALL GRADE</span>
                  <span className="font-mono text-[32px] text-white font-bold block leading-none">{vehicle.auctionGrade}</span>
                  <span className="text-[11px] text-zinc-400 mt-1 block">Pristine Original Condition</span>
                </div>
                <div className="mt-3 pt-2 border-t border-zinc-800 flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full border border-white/25 flex items-center justify-center text-white text-[10px] font-bold">
                    合
                  </div>
                  <span className="text-[11px] text-zinc-300 font-mono font-semibold">USS VERIFIED</span>
                </div>
              </div>

              <div className="p-4 bg-zinc-900/80 border border-zinc-800 rounded-lg flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-mono text-zinc-500 uppercase block mb-1">INTERIOR GRADE</span>
                  <span className="font-mono text-[32px] text-white font-bold block leading-none">{vehicle.interiorGrade}</span>
                  <span className="text-[11px] text-zinc-400 mt-1 block">Zero smoke, zero pet wear</span>
                </div>
                <div className="mt-3 pt-2 border-t border-zinc-800 flex items-center gap-2">
                  <span className="text-[11px] text-emerald-400 font-mono font-bold">QISJ PASSED</span>
                </div>
              </div>

              <div className="p-4 bg-zinc-900/80 border border-zinc-800 rounded-lg flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-mono text-zinc-500 uppercase block mb-1">VERIFIED ODOMETER</span>
                  <span className="font-mono text-[22px] text-white font-bold block leading-none mt-1">
                    {vehicle.mileageKm.toLocaleString()} KM
                  </span>
                  <span className="text-[11px] text-zinc-400 mt-1 block">Certified Japanese JEVIC</span>
                </div>
                <div className="mt-3 pt-2 border-t border-zinc-800 flex items-center gap-2">
                  <span className="text-[11px] text-zinc-300 font-mono font-semibold">100% GENUINE</span>
                </div>
              </div>
            </div>

            {/* Vehicle Inspection Blueprint Matrix (Interactive Japanese Inspector Decoder) */}
            <div className="p-5 bg-zinc-900/80 border border-zinc-800 rounded-lg space-y-4">
              <div className="flex items-center justify-between border-b border-zinc-800 pb-2 text-[11px] font-mono">
                <span className="text-zinc-300 uppercase font-semibold">
                  INTERACTIVE PANEL & CHASSIS INSPECTOR (JAPANESE STANDARD)
                </span>
                <span className="text-emerald-400 font-bold">
                  FRAME DISTORTION: 0%
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-[12px] font-mono">
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
                      className={`p-2.5 rounded-[4px] border text-left transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-zinc-800 border-white shadow-md'
                          : 'bg-[#121215] border-[#27272a] hover:border-zinc-700'
                      }`}
                    >
                      <span className="text-white block font-bold text-[11px]">{pt.label}</span>
                      <span className="text-zinc-400 text-[11px] block mt-0.5">{pt.code}</span>
                    </button>
                  );
                })}
              </div>

              <div className="p-3 bg-black/60 border border-zinc-800/80 rounded text-left">
                <span className="font-mono text-[10px] text-zinc-400 uppercase tracking-wider block font-semibold mb-1">
                  DECODED INSPECTION REPORT:
                </span>
                <p className="text-xs text-zinc-300 leading-relaxed font-mono">
                  {selectedInspectorPoint === 'front' && 'Front Bumper: Minor microscopic clearcoat hairline. Grille clips, radar sensor bracket, and fog housings original OEM.'}
                  {selectedInspectorPoint === 'left' && 'Left Flank: Factory clearcoat intact. Rocker panels and wheel arches free of corrosion or salt pit marks.'}
                  {selectedInspectorPoint === 'right' && 'Right Flank: Pristine reflection line. Zero parking indentation, glass etching matches chassis VIN.'}
                  {selectedInspectorPoint === 'roof' && 'Pillars & Roof: Laser alignment 100% square. Headliner shows zero sagging or water leak evidence.'}
                </p>
              </div>

              <p className="text-[13px] text-[#a1a1aa] leading-relaxed">
                <strong className="text-white">Inspector Notes:</strong> Regular maintenance records verified in Tokyo. Zero frame damage, zero rust. Brakes and steering certified ready for road use.
              </p>
            </div>

            {/* Action Bar */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="text-[12px] text-[#71717a] font-mono">
                Official PDF dispatched via WhatsApp.
              </span>

              <a
                href={`https://wa.me/254714333888?text=Hello%20Alberka%20Motors,%20please%20send%20me%20the%20original%20Japanese%20auction%20sheet%20PDF%20for%20the%20${encodeURIComponent(vehicle.name)}%20(${vehicle.stockNo})%20from%20${encodeURIComponent(vehicle.auctionHall)}.`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-white w-full sm:w-auto text-center font-semibold"
              >
                <span>Request Original PDF on WhatsApp</span>
                <ArrowRight className="w-4 h-4 ml-1.5" />
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
            className="h-14 sm:h-16 px-4 sm:px-8 border-b border-white/[0.08] flex items-center justify-between shrink-0"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 min-w-0">
              <span className="font-mono text-xs sm:text-sm text-white font-bold uppercase tracking-wider truncate">
                {vehicle.stockNo} · {vehicle.name}
              </span>
              <span className="text-zinc-600 hidden sm:inline">|</span>
              <span className="text-xs text-zinc-400 font-mono hidden md:inline truncate">
                {activeLightboxPhoto.title}
              </span>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <div className="bg-zinc-900 border border-zinc-800 px-3 py-1.5 rounded-md text-xs font-mono text-zinc-300">
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
              className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-black/70 hover:bg-black text-white border border-white/15 flex items-center justify-center transition-all cursor-pointer z-10 backdrop-blur-md"
              title="Previous photo (Left Arrow)"
            >
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
            <button
              onClick={handleNextLightbox}
              className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-black/70 hover:bg-black text-white border border-white/15 flex items-center justify-center transition-all cursor-pointer z-10 backdrop-blur-md"
              title="Next photo (Right Arrow)"
            >
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          </div>

          {/* Bottom Bar: Responsive & Zero-Scroll */}
          <div 
            className="shrink-0 border-t border-white/[0.08] bg-[#09090b]/95 px-4 sm:px-8 py-2.5 sm:py-3 flex flex-col sm:flex-row items-center justify-between gap-2.5"
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
                      ? 'border-white ring-2 ring-white/60 scale-105'
                      : 'border-white/15 opacity-50 hover:opacity-100'
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
                href={`https://wa.me/254714333888?text=Hello%20Alberka%20Motors,%20I%20am%20interested%20in%20the%20${encodeURIComponent(vehicle.name)}%20(${vehicle.stockNo})%20priced%20at%20KES%20${vehicle.priceKes.toLocaleString()}.`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-white !py-2 !px-4 text-xs font-semibold"
              >
                <MessageCircle className="w-3.5 h-3.5 mr-1.5" />
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
