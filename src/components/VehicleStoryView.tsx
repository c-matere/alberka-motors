import React, { useState, useRef, useEffect } from 'react';
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
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
  Award
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
}> = ({ feature, sectionIndex, totalSections, vehicleName, stockNo }) => {
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const activeSlide: FeatureSlide =
    feature.slides[activeSlideIndex] || feature.slides[0];

  useEffect(() => {
    if (!isPlaying || feature.slides.length <= 1) return;
    const interval = setInterval(() => {
      setActiveSlideIndex((prev) => (prev + 1) % feature.slides.length);
    }, 5500);
    return () => clearInterval(interval);
  }, [isPlaying, feature.slides.length]);

  return (
    <section className="w-full bg-[#121215] border-b border-[#27272a] py-16 sm:py-24 px-6 sm:px-10">
      <div className="max-w-[1400px] mx-auto space-y-10">
        
        {/* Section Header */}
        <div className="space-y-3 max-w-[850px]">
          <div className="inline-flex items-center gap-2 font-mono text-[11px] text-[#ef4444] uppercase font-semibold">
            <span>FEATURE {sectionIndex + 1} OF {totalSections}</span>
            <span>·</span>
            <span className="text-[#a1a1aa]">{feature.badge}</span>
          </div>

          <h2 className="text-[28px] sm:text-[38px] font-bold text-white tracking-tight leading-tight">
            {feature.title}
          </h2>

          <p className="text-[16px] text-[#a1a1aa] leading-relaxed">
            {feature.lead}
          </p>
        </div>

        {/* 12-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          
          {/* Column 1: Rolls-Royce Style Media Showcase Slideshow */}
          <div className="lg:col-span-7 space-y-4">
            <div className="w-full h-[360px] sm:h-[440px] lg:h-[480px] overflow-hidden bg-black border border-zinc-800 rounded-xl relative group shadow-2xl">
              <SkeletonImage
                key={activeSlide.id || activeSlide.imageUrl}
                src={activeSlide.imageUrl}
                alt={activeSlide.title}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-103"
                containerClassName="w-full h-full"
              />

              {/* Rolls-Royce Slide Counter (01 / 04) & Metric */}
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none z-10">
                <div className="bg-black/80 backdrop-blur-md px-3 py-1.5 text-xs font-mono text-zinc-300 rounded-lg border border-zinc-800 flex items-center gap-1.5 shadow-md">
                  <span className="text-red-500 font-bold">{String(activeSlideIndex + 1).padStart(2, '0')}</span>
                  <span className="text-zinc-600">/</span>
                  <span className="text-zinc-400">{String(feature.slides.length).padStart(2, '0')}</span>
                </div>

                {activeSlide.metric && (
                  <div className="bg-black/85 backdrop-blur-md border border-zinc-800 px-3 py-1.5 flex items-center gap-2 rounded-lg shadow-md">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse" />
                    <span className="text-xs text-zinc-400 hidden xs:inline">{activeSlide.metricLabel}:</span>
                    <span className="text-xs font-mono font-bold text-white">{activeSlide.metric}</span>
                  </div>
                )}
              </div>

              {/* Bottom Scrim */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent flex items-end p-5 sm:p-7 pointer-events-none z-10">
                <div className="space-y-1.5 max-w-[560px]">
                  <span className="font-mono text-[11px] uppercase tracking-wider text-red-500 block font-semibold">
                    {activeSlide.subtitle}
                  </span>
                  <h3 className="text-lg sm:text-xl font-bold text-white leading-snug">
                    {activeSlide.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-300 line-clamp-2 leading-relaxed">
                    {activeSlide.description}
                  </p>
                </div>
              </div>

              {/* Hairline Side Arrows */}
              <button
                onClick={() =>
                  setActiveSlideIndex((prev) =>
                    prev === 0 ? feature.slides.length - 1 : prev - 1
                  )
                }
                className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/60 hover:bg-black/90 text-white border border-zinc-700/60 backdrop-blur-md flex items-center justify-center transition-all cursor-pointer z-20 hover:scale-105"
                title="Previous image"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() =>
                  setActiveSlideIndex((prev) => (prev + 1) % feature.slides.length)
                }
                className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/60 hover:bg-black/90 text-white border border-zinc-700/60 backdrop-blur-md flex items-center justify-center transition-all cursor-pointer z-20 hover:scale-105"
                title="Next image"
              >
                <ChevronRight className="w-4 h-4" />
              </button>

              {/* Rolls-Royce Animated Progress Bar */}
              <div className="absolute bottom-0 inset-x-0 h-1 bg-zinc-900/80 z-20">
                <div
                  className="h-full bg-red-600 transition-all duration-300"
                  style={{
                    width: `${((activeSlideIndex + 1) / feature.slides.length) * 100}%`,
                  }}
                />
              </div>
            </div>

            {/* Slide Navigation Dock with Thumbnails */}
            <div className="flex items-center justify-between gap-3 p-3 bg-zinc-900/80 border border-zinc-800 rounded-xl">
              <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-0.5">
                {feature.slides.map((s, idx) => {
                  const isActive = activeSlideIndex === idx;
                  return (
                    <button
                      key={s.id || idx}
                      onClick={() => setActiveSlideIndex(idx)}
                      className={`px-3 py-1.5 rounded-lg text-xs transition-all shrink-0 cursor-pointer border flex items-center gap-1.5 ${
                        isActive
                          ? 'bg-zinc-800 text-white font-semibold border-red-600'
                          : 'bg-zinc-950/80 text-zinc-400 hover:text-white border-zinc-800'
                      }`}
                    >
                      <span className={`font-mono text-[10px] ${isActive ? 'text-red-500 font-bold' : 'text-zinc-500'}`}>
                        {String(idx + 1).padStart(2, '0')}
                      </span>
                      <span>{s.title.split(' ')[0]} {s.title.split(' ')[1] || ''}</span>
                    </button>
                  );
                })}
              </div>

              <div className="flex items-center gap-1.5 shrink-0">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="w-8 h-8 rounded-full bg-zinc-950 border border-zinc-800 text-zinc-400 hover:text-white flex items-center justify-center cursor-pointer transition-colors"
                  title={isPlaying ? 'Pause slideshow' : 'Play slideshow'}
                >
                  {isPlaying ? (
                    <Pause className="w-3.5 h-3.5" />
                  ) : (
                    <Play className="w-3.5 h-3.5 ml-0.5 text-red-500" />
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Column 2: Narrative & Specs */}
          <div className="lg:col-span-5 space-y-6 text-left">
            <div className="space-y-3 text-[14.5px] text-[#a1a1aa] leading-relaxed">
              {feature.narrative.map((para, pIdx) => (
                <p key={pIdx} className="border-l-2 border-[#dc2626] pl-4">
                  {para}
                </p>
              ))}
            </div>

            <div className="pt-2">
              <span className="font-mono text-[11px] uppercase tracking-wider text-white block mb-3 font-semibold">
                KEY SPECIFICATIONS
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {feature.specs.map((spec, sIdx) => (
                  <div
                    key={sIdx}
                    className="p-3 bg-[#18181c] border border-[#27272a] rounded-[3px] space-y-0.5"
                  >
                    <span className="text-[11px] text-[#71717a] uppercase font-mono block">
                      {spec.label}
                    </span>
                    <span className="text-[13.5px] font-bold text-white block">
                      {spec.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-2">
              <a
                href={`https://wa.me/254714333888?text=Hello%20Alberka%20Motors,%20I%20have%20questions%20regarding%20the%20${encodeURIComponent(feature.title)}%20on%20the%20${encodeURIComponent(vehicleName)}%20(${stockNo}).`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-[13px] font-semibold text-[#ef4444] hover:text-white transition-colors cursor-pointer"
              >
                <span>Ask our workshop about this car</span>
                <ArrowRight className="w-4 h-4" />
              </a>
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
  const [bespokeTab, setBespokeTab] = useState<'exterior' | 'interior' | 'veneer' | 'acoustics'>('exterior');
  const [showAuctionModal, setShowAuctionModal] = useState(false);
  const [acousticMode, setAcousticMode] = useState<'off' | 'ambient' | 'sanctuary'>('off');
  const [copiedToast, setCopiedToast] = useState(false);

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
    { name: 'Cognac Saddle Napa', hex: '#8a5229', desc: 'Hand-selected European hides with organic plant tannins and French double-stitching.' },
    { name: 'Charles Blue & Grace White', hex: '#2c3e50', desc: 'Two-tone coastal palette engineered for equatorial heat resistance.' },
    { name: 'Obsidian Black', hex: '#161718', desc: 'Classic midnight black hides with precision red contrast embroidery.' },
    { name: 'Portland Atelier Charcoal', hex: '#4a4b4d', desc: 'Matte semi-aniline finish built for long-term family durability.' }
  ];

  const veneerFinishes = [
    { name: 'Royal Open-Pore Timber', desc: 'Naturally grained organic wood with matte zero-glare protective sealing.' },
    { name: 'Smoked Walnut Finish', desc: 'Dark cured walnut grain matched symmetrically across the center console.' },
    { name: 'Piano Black Lacquer', desc: 'Multi-layer hand-buffed lacquer giving a deep, reflective black surface.' },
    { name: 'Satin Anodized Aluminum', desc: 'Cool-to-the-touch precision metal trim with geometric knurling.' }
  ];

  const activeColor = vehicle.colors[selectedColorIndex] || vehicle.colors[0];
  const activeLeather = leatherHides[selectedLeatherIndex];
  const activeVeneer = veneerFinishes[selectedVeneerIndex];

  return (
    <div className="w-full bg-[#09090b] text-[#f4f4f5] pb-32">
      
      {/* 1. MODEL SWITCHER BAR */}
      <div className="w-full bg-[#121215]/95 backdrop-blur-md border-b border-[#27272a] py-2.5 px-6 sticky top-[72px] z-30 transition-all">
        <div className="max-w-[1440px] mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 overflow-x-auto no-scrollbar py-0.5 min-w-0">
            <button
              onClick={onBackToFleet}
              className="text-[12px] font-medium text-[#a1a1aa] hover:text-white flex items-center gap-1.5 cursor-pointer shrink-0 mr-2 px-3 py-1 bg-[#18181c] border border-[#27272a] rounded-[3px] transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Cars</span>
            </button>

            <span className="text-[11px] font-mono uppercase text-[#71717a] hidden lg:inline mr-1 shrink-0">
              SWITCH CAR:
            </span>
            <div className="flex items-center bg-[#18181c] border border-[#27272a] p-0.5 rounded-[3px] shrink-0">
              {allVehicles.map((v) => {
                const isCurrent = v.id === vehicle.id;
                return (
                  <button
                    key={v.id}
                    onClick={() => {
                      onSelectVehicle(v);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className={`px-3 py-1 text-[12px] rounded-[2px] transition-colors shrink-0 cursor-pointer ${
                      isCurrent
                        ? 'bg-[#dc2626] text-white font-bold'
                        : 'text-[#a1a1aa] hover:text-white'
                    }`}
                  >
                    {v.name.split(' ')[1]} {v.name.split(' ')[2] || ''}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex items-center gap-4 shrink-0">
            <div className="hidden sm:flex flex-col text-right font-mono">
              <span className="text-[10px] text-[#71717a] uppercase">CASH PRICE</span>
              <span className="text-[14px] font-bold text-white">
                KES {vehicle.priceKes.toLocaleString()}
              </span>
            </div>
            <button
              onClick={() => onScheduleTestDrive(vehicle)}
              className="btn-white !py-1.5 !px-4 text-[12px] whitespace-nowrap cursor-pointer font-semibold"
            >
              Book Test Drive
            </button>
          </div>
        </div>
      </div>

      {/* 2. HERO: PHOTO, COLOR & METRICS */}
      <section className="relative w-full pt-12 pb-16 px-6 text-center max-w-[1400px] mx-auto">
        <div className="relative z-10">
          
          <div className="inline-flex items-center gap-2 mb-3 px-3 py-1 bg-[#18181c] border border-[#27272a] rounded-full">
            <span className="w-2 h-2 rounded-full bg-[#dc2626]" />
            <span className="font-mono text-[11px] text-[#e4e4e7] uppercase font-semibold">
              {vehicle.status} · STOCK #{vehicle.stockNo}
            </span>
          </div>

          <h1 className="text-[34px] sm:text-[50px] md:text-[60px] font-bold text-white mb-3 max-w-[1100px] mx-auto tracking-tight">
            {vehicle.name}
          </h1>

          <p className="max-w-[760px] mx-auto text-[#a1a1aa] text-[17px] sm:text-[20px] leading-relaxed mb-10">
            "{vehicle.tagline}"
          </p>

          {/* Master Visual Canvas */}
          <div className="relative w-full max-w-[1100px] mx-auto mb-8">
            <div className="w-full h-[360px] sm:h-[480px] lg:h-[540px] overflow-hidden bg-[#121215] border border-[#27272a] rounded-[6px] relative">
              <SkeletonImage
                key={activeColor.name}
                src={activeColor.imageUrl}
                alt={`${vehicle.name} in ${activeColor.name}`}
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-103"
                containerClassName="w-full h-full"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#09090b] via-transparent to-transparent flex items-end p-6 sm:p-8">
                <div className="text-left text-white space-y-0.5">
                  <span className="font-mono text-[11px] text-[#ef4444] uppercase font-bold block">
                    COLOR OPTION
                  </span>
                  <p className="text-[18px] sm:text-[22px] font-bold text-white">
                    {activeColor.name} · Grade {vehicle.auctionGrade} Quality
                  </p>
                </div>
              </div>
            </div>

            {/* Color Switcher */}
            <div className="p-3.5 max-w-[440px] mx-auto -mt-6 relative z-20 flex items-center justify-between bg-[#121215] border border-[#27272a] rounded-[4px] shadow-2xl">
              <div className="text-left pl-2">
                <span className="text-[10px] text-[#71717a] uppercase font-mono block">Paint Finish</span>
                <span className="text-[13px] font-bold text-white truncate max-w-[180px] block">
                  {activeColor.name}
                </span>
              </div>

              <div className="flex items-center gap-2 pr-2">
                {vehicle.colors.map((c, idx) => {
                  const isSelected = selectedColorIndex === idx;
                  return (
                    <button
                      key={idx}
                      onClick={() => setSelectedColorIndex(idx)}
                      className={`w-7 h-7 rounded-full transition-all cursor-pointer relative flex items-center justify-center ${
                        isSelected ? 'ring-2 ring-[#dc2626] scale-110' : 'opacity-60 hover:opacity-100'
                      }`}
                      style={{ backgroundColor: c.hex }}
                      title={c.name}
                    >
                      {isSelected && (
                        <span className="w-2 h-2 rounded-full bg-white shadow-sm" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Metric Summary Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-[960px] mx-auto pt-6 text-left">
            <div className="bg-[#121215] border border-[#27272a] p-4 rounded-[3px]">
              <span className="text-[11px] font-mono text-[#71717a] uppercase block mb-1">Year & Mileage</span>
              <span className="font-mono text-[15px] font-bold text-white">{vehicle.year} · {vehicle.mileageKm.toLocaleString()} KM</span>
            </div>
            <div className="bg-[#121215] border border-[#27272a] p-4 rounded-[3px]">
              <span className="text-[11px] font-mono text-[#71717a] uppercase block mb-1">Auction Grade</span>
              <span className="font-mono text-[15px] font-bold text-[#ef4444]">{vehicle.auctionGrade} / {vehicle.interiorGrade}</span>
            </div>
            <div className="bg-[#121215] border border-[#27272a] p-4 rounded-[3px]">
              <span className="text-[11px] font-mono text-[#71717a] uppercase block mb-1">Drivetrain</span>
              <span className="text-[15px] font-bold text-white">{vehicle.drivetrain.split('(')[0]}</span>
            </div>
            <div className="bg-[#121215] border border-[#27272a] p-4 rounded-[3px]">
              <span className="text-[11px] font-mono text-[#71717a] uppercase block mb-1">Delivered Price</span>
              <span className="font-mono text-[15px] font-bold text-white">KES {vehicle.priceKes.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. CUSTOM SPECIFICATIONS SUITE */}
      <section className="w-full bg-[#121215] py-16 px-6 sm:px-10 border-y border-[#27272a]">
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
          <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar border-b border-[#27272a]">
            {[
              { id: 'exterior', label: '1. Exterior Colors', icon: Palette },
              { id: 'interior', label: '2. Seat Leather', icon: Armchair },
              { id: 'veneer', label: '3. Dashboard Trim', icon: Layers },
              { id: 'acoustics', label: '4. Cabin Quietness', icon: Volume2 },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = bespokeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setBespokeTab(tab.id as any)}
                  className={`flex items-center gap-2 py-3 px-4 text-[13px] font-medium transition-all shrink-0 cursor-pointer border-b-2 -mb-[1px] ${
                    isActive
                      ? 'border-[#dc2626] text-white bg-[#18181c]'
                      : 'border-transparent text-[#a1a1aa] hover:text-white'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-[#ef4444]' : 'text-[#71717a]'}`} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Tab Panes */}
          <div className="bg-[#18181c] p-6 sm:p-8 border border-[#27272a] rounded-[4px]">
            {bespokeTab === 'exterior' && (
              <div className="space-y-6">
                <div>
                  <span className="text-[11px] font-mono text-[#ef4444] uppercase font-bold block mb-1">
                    FACTORY JAPANESE ENAMEL
                  </span>
                  <h3 className="text-[20px] font-bold text-white">
                    {activeColor.name}
                  </h3>
                  <p className="text-[14px] text-[#a1a1aa] mt-1 max-w-[650px]">
                    Multi-coat clearcoat enamel with UV protective top layer calibrated for high-altitude sunlight and coastal sea air.
                  </p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {vehicle.colors.map((c, idx) => (
                    <div
                      key={idx}
                      onClick={() => setSelectedColorIndex(idx)}
                      className={`p-3.5 border rounded-[3px] transition-all cursor-pointer space-y-2 ${
                        selectedColorIndex === idx
                          ? 'border-[#dc2626] bg-[#121215]'
                          : 'border-[#27272a] bg-[#121215] hover:border-[#71717a]'
                      }`}
                    >
                      <div className="w-full h-10 rounded-[2px] border border-[#27272a] flex items-center justify-center" style={{ backgroundColor: c.hex }}>
                        {selectedColorIndex === idx && <CheckCircle2 className="w-5 h-5 text-white drop-shadow-md" />}
                      </div>
                      <span className="text-[12px] font-medium text-white block">{c.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {bespokeTab === 'interior' && (
              <div className="space-y-6">
                <div>
                  <span className="text-[11px] font-mono text-[#ef4444] uppercase font-bold block mb-1">
                    SEAT UPHOLSTERY & LEATHER
                  </span>
                  <h3 className="text-[20px] font-bold text-white">
                    {activeLeather.name}
                  </h3>
                  <p className="text-[14px] text-[#a1a1aa] mt-1 max-w-[650px]">
                    {activeLeather.desc}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {leatherHides.map((hide, idx) => (
                    <div
                      key={idx}
                      onClick={() => setSelectedLeatherIndex(idx)}
                      className={`p-4 border rounded-[3px] transition-all cursor-pointer space-y-2 ${
                        selectedLeatherIndex === idx
                          ? 'border-[#dc2626] bg-[#121215]'
                          : 'border-[#27272a] bg-[#121215] hover:border-[#71717a]'
                      }`}
                    >
                      <div className="w-full h-10 rounded-[2px] border border-[#27272a] flex items-center justify-center" style={{ backgroundColor: hide.hex }}>
                        {selectedLeatherIndex === idx && <CheckCircle2 className="w-5 h-5 text-white drop-shadow-md" />}
                      </div>
                      <span className="text-[12px] font-medium text-white block">{hide.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {bespokeTab === 'veneer' && (
              <div className="space-y-6">
                <div>
                  <span className="text-[11px] font-mono text-[#ef4444] uppercase font-bold block mb-1">
                    DASHBOARD & CONSOLE TRIM
                  </span>
                  <h3 className="text-[20px] font-bold text-white">
                    {activeVeneer.name}
                  </h3>
                  <p className="text-[14px] text-[#a1a1aa] mt-1 max-w-[650px]">
                    {activeVeneer.desc}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {veneerFinishes.map((veneer, idx) => (
                    <div
                      key={idx}
                      onClick={() => setSelectedVeneerIndex(idx)}
                      className={`p-4 border rounded-[3px] transition-all cursor-pointer space-y-2 ${
                        selectedVeneerIndex === idx
                          ? 'border-[#dc2626] bg-[#121215]'
                          : 'border-[#27272a] bg-[#121215] hover:border-[#71717a]'
                      }`}
                    >
                      <div className="w-full h-10 bg-[#27272a] rounded-[2px] flex items-center justify-center">
                        <span className="text-[10px] font-mono text-[#a1a1aa] uppercase">PREMIUM TRIM</span>
                      </div>
                      <span className="text-[12px] font-medium text-white block">{veneer.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {bespokeTab === 'acoustics' && (
              <div className="space-y-6">
                <div>
                  <span className="text-[11px] font-mono text-[#ef4444] uppercase font-bold block mb-1">
                    CABIN QUIETNESS BENCHMARK
                  </span>
                  <h3 className="text-[20px] font-bold text-white">
                    38 Decibels · Whisper-Quiet Drive
                  </h3>
                  <p className="text-[14px] text-[#a1a1aa] mt-1 max-w-[650px]">
                    Double-laminated acoustic glass, fluid-filled engine mounts, and injected sound-deadening foam keep road and traffic noise outside.
                  </p>
                </div>

                {/* Audio Simulator */}
                <div className="p-5 bg-[#121215] border border-[#27272a] rounded-[4px] space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <span className="text-[11px] font-mono text-[#ef4444] uppercase font-bold block">
                        AUDITORY COMPARISON
                      </span>
                      <h4 className="text-[15px] font-bold text-white">
                        Test Cabin Sound Isolation
                      </h4>
                      <p className="text-[13px] text-[#a1a1aa]">
                        Hear the contrast between noisy highway traffic and the quiet Alberka cabin.
                      </p>
                    </div>

                    <div className="flex items-end gap-1 h-8 px-3 py-1 bg-[#18181c] border border-[#27272a] rounded-[2px] shrink-0">
                      {[40, 75, 55, 90, 65, 35, 80, 50, 95, 60, 45, 70].map((height, i) => (
                        <div
                          key={i}
                          className={`w-1 transition-all duration-300 ${
                            acousticMode === 'ambient'
                              ? 'bg-[#ef4444]'
                              : acousticMode === 'sanctuary'
                              ? 'bg-white'
                              : 'bg-[#27272a]'
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
                      className={`text-[12px] font-medium px-4 py-2.5 rounded-[3px] transition-all flex items-center gap-2 cursor-pointer ${
                        acousticMode === 'ambient'
                          ? 'bg-[#ef4444] text-white font-bold'
                          : 'bg-[#18181c] text-[#ef4444] border border-[#ef4444]/40 hover:bg-[#ef4444]/10'
                      }`}
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                      <span>1. Outside Highway Noise (72 dB)</span>
                    </button>

                    <button
                      onClick={() => playAcousticSimulation('sanctuary')}
                      className={`text-[12px] font-medium px-4 py-2.5 rounded-[3px] transition-all flex items-center gap-2 cursor-pointer ${
                        acousticMode === 'sanctuary'
                          ? 'bg-white text-black font-bold'
                          : 'bg-[#18181c] text-white border border-[#27272a] hover:border-white'
                      }`}
                    >
                      <Sparkles className="w-3.5 h-3.5 text-[#ef4444]" />
                      <span>2. Alberka Quiet Cabin (38 dB)</span>
                    </button>

                    {acousticMode !== 'off' && (
                      <button
                        onClick={stopAcousticAudio}
                        className="text-[12px] px-3 py-2 text-[#a1a1aa] hover:text-white border border-[#27272a] rounded-[3px] flex items-center gap-1.5 cursor-pointer"
                      >
                        <VolumeX className="w-3.5 h-3.5" />
                        <span>Stop Audio</span>
                      </button>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
                  <div className="p-4 bg-[#121215] border border-[#27272a] rounded-[3px]">
                    <span className="text-[10px] font-mono text-[#71717a] uppercase block">IDLE NOISE LEVEL</span>
                    <span className="font-mono text-[22px] font-bold text-white block mt-0.5">38 dB</span>
                    <span className="text-[12px] text-[#a1a1aa] block">Equivalent to a quiet library</span>
                  </div>

                  <div className="p-4 bg-[#121215] border border-[#27272a] rounded-[3px]">
                    <span className="text-[10px] font-mono text-[#71717a] uppercase block">ACOUSTIC GLASS</span>
                    <span className="font-mono text-[22px] font-bold text-white block mt-0.5">6.0 MM</span>
                    <span className="text-[12px] text-[#a1a1aa] block">Double-pane laminate glass</span>
                  </div>

                  <div className="p-4 bg-[#121215] border border-[#27272a] rounded-[3px]">
                    <span className="text-[10px] font-mono text-[#71717a] uppercase block">ROAD SUSPENSION</span>
                    <span className="text-[18px] font-bold text-[#ef4444] block mt-1">SMOOTH DAMPING</span>
                    <span className="text-[12px] text-[#a1a1aa] block">Kenyan highway calibration</span>
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
                  {copiedToast ? <Check className="w-4 h-4 text-[#27a644]" /> : <Copy className="w-4 h-4" />}
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

      {/* 4. DEDICATED FEATURE SPREADS */}
      <div className="w-full">
        {vehicle.editorialFeatures.map((feat, idx) => (
          <EditorialFeatureSection
            key={feat.id}
            feature={feat}
            sectionIndex={idx}
            totalSections={vehicle.editorialFeatures.length}
            vehicleName={vehicle.name}
            stockNo={vehicle.stockNo}
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
              <FileText className="w-4 h-4 text-[#ef4444]" />
              <span>View Japanese Auction Sheet</span>
            </button>
          </div>

          {/* Technical Specs 4-Column Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 bg-[#121215] border border-[#27272a] rounded-[4px] space-y-1.5">
              <span className="text-[10.5px] font-mono text-[#71717a] uppercase block">Engine & Power</span>
              <p className="font-bold text-white text-[15px]">{vehicle.engine}</p>
              <p className="text-[13px] text-[#a1a1aa] font-mono">{vehicle.power} · {vehicle.torque}</p>
            </div>

            <div className="p-5 bg-[#121215] border border-[#27272a] rounded-[4px] space-y-1.5">
              <span className="text-[10.5px] font-mono text-[#71717a] uppercase block">Fuel & Efficiency</span>
              <p className="font-bold text-white text-[15px]">{vehicle.fuelType}</p>
              <p className="text-[13px] text-[#a1a1aa] font-mono">{vehicle.fuelEconomy}</p>
            </div>

            <div className="p-5 bg-[#121215] border border-[#27272a] rounded-[4px] space-y-1.5">
              <span className="text-[10.5px] font-mono text-[#71717a] uppercase block">Auction Provenance</span>
              <p className="font-bold text-white text-[15px]">{vehicle.auctionHall}</p>
              <p className="text-[13px] text-[#ef4444] font-mono font-bold">Grade {vehicle.auctionGrade} · Interior {vehicle.interiorGrade}</p>
            </div>

            <div className="p-5 bg-[#121215] border border-[#27272a] rounded-[4px] space-y-1.5">
              <span className="text-[10.5px] font-mono text-[#71717a] uppercase block">Warranty Protection</span>
              <p className="font-bold text-white text-[15px]">5,000 KM Written</p>
              <p className="text-[13px] text-[#a1a1aa]">Engine & Gearbox Included</p>
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
      {showAuctionModal && (
        <div className="fixed inset-0 z-50 bg-[#09090b]/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          <div className="max-w-[760px] w-full bg-[#121215] border border-[#27272a] p-6 sm:p-8 space-y-6 text-left my-auto rounded-[4px] shadow-2xl relative text-[#f4f4f5]">
            
            {/* Header & Close */}
            <div className="flex items-start justify-between border-b border-[#27272a] pb-4">
              <div>
                <div className="inline-flex items-center gap-2 mb-1">
                  <span className="font-mono text-[10px] text-[#ef4444] uppercase font-bold bg-[#18181c] px-2 py-0.5 rounded-[2px] border border-[#27272a]">
                    AUTHENTIC JAPANESE EXPORT SHEET
                  </span>
                  <span className="font-mono text-[11px] text-[#a1a1aa]">
                    LOT #{vehicle.stockNo.replace(/[^0-9]/g, '') || '7942'}
                  </span>
                </div>
                <h3 className="text-[20px] sm:text-[24px] font-bold text-white">
                  {vehicle.name} · {vehicle.stockNo}
                </h3>
                <p className="text-[13px] text-[#a1a1aa] mt-0.5">
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

            {/* Score Grid & Red Japanese Hanko Stamp */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 bg-[#18181c] border border-[#27272a] rounded-[3px] flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-mono text-[#71717a] uppercase block mb-1">OVERALL GRADE</span>
                  <span className="font-mono text-[32px] text-white font-bold block leading-none">{vehicle.auctionGrade}</span>
                  <span className="text-[11px] text-[#a1a1aa] mt-1 block">Pristine Original Condition</span>
                </div>
                <div className="mt-3 pt-2 border-t border-[#27272a] flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full border border-[#ef4444] flex items-center justify-center text-[#ef4444] text-[10px] font-bold">
                    合
                  </div>
                  <span className="text-[11px] text-[#ef4444] font-mono font-bold">USS VERIFIED</span>
                </div>
              </div>

              <div className="p-4 bg-[#18181c] border border-[#27272a] rounded-[3px] flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-mono text-[#71717a] uppercase block mb-1">INTERIOR GRADE</span>
                  <span className="font-mono text-[32px] text-white font-bold block leading-none">{vehicle.interiorGrade}</span>
                  <span className="text-[11px] text-[#a1a1aa] mt-1 block">Zero smoke, zero pet wear</span>
                </div>
                <div className="mt-3 pt-2 border-t border-[#27272a] flex items-center gap-2">
                  <span className="text-[11px] text-[#27a644] font-mono font-bold">QISJ PASSED</span>
                </div>
              </div>

              <div className="p-4 bg-[#18181c] border border-[#27272a] rounded-[3px] flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-mono text-[#71717a] uppercase block mb-1">VERIFIED ODOMETER</span>
                  <span className="font-mono text-[22px] text-white font-bold block leading-none mt-1">
                    {vehicle.mileageKm.toLocaleString()} KM
                  </span>
                  <span className="text-[11px] text-[#a1a1aa] mt-1 block">Certified Japanese JEVIC</span>
                </div>
                <div className="mt-3 pt-2 border-t border-[#27272a] flex items-center gap-2">
                  <span className="text-[11px] text-[#ef4444] font-mono font-bold">100% GENUINE</span>
                </div>
              </div>
            </div>

            {/* Vehicle Inspection Blueprint Matrix */}
            <div className="p-5 bg-[#18181c] border border-[#27272a] rounded-[3px] space-y-4">
              <div className="flex items-center justify-between border-b border-[#27272a] pb-2 text-[11px] font-mono">
                <span className="text-[#ef4444] uppercase font-bold">
                  PANEL & CHASSIS INSPECTION CODES (JAPANESE STANDARD)
                </span>
                <span className="text-[#27a644] font-bold">
                  FRAME DISTORTION: 0%
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-[12px] font-mono">
                <div className="p-2.5 bg-[#121215] border border-[#27272a] rounded-[2px]">
                  <span className="text-white block font-bold">FRONT BUMPER</span>
                  <span className="text-[#a1a1aa]">A1 · Clean hairline</span>
                </div>
                <div className="p-2.5 bg-[#121215] border border-[#27272a] rounded-[2px]">
                  <span className="text-white block font-bold">LEFT FLANK</span>
                  <span className="text-[#a1a1aa]">O · Factory original paint</span>
                </div>
                <div className="p-2.5 bg-[#121215] border border-[#27272a] rounded-[2px]">
                  <span className="text-white block font-bold">RIGHT FLANK</span>
                  <span className="text-[#a1a1aa]">O · Factory original paint</span>
                </div>
                <div className="p-2.5 bg-[#121215] border border-[#27272a] rounded-[2px]">
                  <span className="text-white block font-bold">PILLARS & ROOF</span>
                  <span className="text-[#27a644] font-bold">XX: NONE · Zero repair</span>
                </div>
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
        </div>
      )}

    </div>
  );
};
