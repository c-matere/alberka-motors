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
import { StarlightCanopy } from './StarlightCanopy';

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
 * Rolls-Royce Split-Screen Atelier Spread — Master Craftsmanship & Engineering Chapter
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
    <section className="w-full bg-[#0f0714] border-b border-[rgba(197,168,128,0.18)] py-20 sm:py-28 px-6">
      <div className="max-w-[1400px] mx-auto space-y-12">
        
        {/* Section Header: Aristocratic Chapter Kicker + Display Heading + Lead */}
        <div className="space-y-4 max-w-[960px]">
          <div className="inline-flex items-center gap-3">
            <span className="font-['Cinzel'] text-[11px] uppercase tracking-[0.25em] text-[#c5a880]">
              CHAPTER 0{sectionIndex + 1} // 0{totalSections}
            </span>
            <span className="text-[rgba(197,168,128,0.4)]">//</span>
            <span className="font-['Cinzel'] text-[11px] uppercase tracking-[0.2em] text-[#8c8a94]">
              {feature.badge}
            </span>
          </div>

          <h2 className="font-['Cinzel'] text-[28px] sm:text-[38px] lg:text-[44px] font-normal text-[#f5f5f7] tracking-[0.14em] leading-[1.15] uppercase">
            {feature.title}
          </h2>

          <p className="text-[#dfc7a5] font-['Cormorant_Garamond'] text-[18px] sm:text-[21px] italic leading-[1.6]">
            {feature.lead}
          </p>
        </div>

        {/* 12-Column Asymmetric Atelier Spread (7 cols image / 5 cols editorial) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Column 1: Cinematic Slide Showcase (7 cols, 0px radius, hairline border) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="w-full h-[360px] sm:h-[460px] lg:h-[500px] overflow-hidden bg-[#080809] border border-[rgba(197,168,128,0.3)] relative group">
              <SkeletonImage
                key={activeSlide.id || activeSlide.imageUrl}
                src={activeSlide.imageUrl}
                alt={activeSlide.title}
                className="transition-transform duration-700 ease-out group-hover:scale-104"
                containerClassName="w-full h-full"
              />

              {/* Floating Slide Counter & Key Metric */}
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none z-10">
                <span className="bg-[#0f0714]/85 backdrop-blur-md border border-[rgba(197,168,128,0.25)] px-3 py-1 text-[10px] font-['Cinzel'] tracking-widest text-[#dfc7a5] uppercase">
                  SLIDE {activeSlideIndex + 1} OF {feature.slides.length}
                </span>

                {activeSlide.metric && (
                  <div className="bg-[#0f0714]/90 backdrop-blur-md border border-[rgba(197,168,128,0.3)] px-3 py-1 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-[#c5a880]" />
                    <span className="text-[10px] font-['Cinzel'] tracking-wider text-[#8c8a94] hidden xs:inline">{activeSlide.metricLabel}:</span>
                    <span className="text-[12px] font-mono text-[#f5f5f7]">{activeSlide.metric}</span>
                  </div>
                )}
              </div>

              {/* Rolls-Royce Bottom Scrim */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0f0714] via-[#0f0714]/40 to-transparent flex items-end p-6 sm:p-8 pointer-events-none z-10">
                <div className="space-y-2 max-w-[600px]">
                  <span className="font-['Cinzel'] text-[10px] uppercase tracking-[0.25em] text-[#c5a880] block">
                    {activeSlide.subtitle}
                  </span>
                  <h3 className="font-['Cinzel'] text-[19px] sm:text-[22px] font-normal text-[#f5f5f7] leading-snug tracking-[0.12em] uppercase">
                    {activeSlide.title}
                  </h3>
                  <p className="text-[13.5px] text-[#8c8a94] line-clamp-2 leading-[1.6] font-light">
                    {activeSlide.description}
                  </p>
                </div>
              </div>
            </div>

            {/* Slide Navigation Dock (Hard 0px edges) */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 p-3 bg-[#131316] border border-[rgba(197,168,128,0.2)]">
              <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
                {feature.slides.map((s, idx) => {
                  const isActive = activeSlideIndex === idx;
                  return (
                    <button
                      key={s.id || idx}
                      onClick={() => setActiveSlideIndex(idx)}
                      className={`px-3 py-1 text-[11px] font-['Cinzel'] tracking-wider transition-all shrink-0 cursor-pointer ${
                        isActive
                          ? 'bg-[#c5a880] text-[#0f0714] font-medium'
                          : 'bg-[#0f0714] text-[#8c8a94] hover:text-[#f5f5f7] border border-[rgba(255,255,255,0.06)]'
                      }`}
                    >
                      <span>{s.title.split(' ')[0]} {s.title.split(' ')[1] || ''}</span>
                    </button>
                  );
                })}
              </div>

              <div className="flex items-center justify-end gap-1.5 shrink-0">
                <button
                  onClick={() =>
                    setActiveSlideIndex((prev) =>
                      prev === 0 ? feature.slides.length - 1 : prev - 1
                    )
                  }
                  className="w-8 h-8 bg-[#0f0714] hover:bg-[#160a1d] border border-[rgba(197,168,128,0.2)] flex items-center justify-center text-[#c5a880] hover:text-[#dfc7a5] cursor-pointer"
                  title="Previous Slide"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="w-8 h-8 bg-[#0f0714] hover:bg-[#160a1d] border border-[rgba(197,168,128,0.2)] flex items-center justify-center text-[#8c8a94] hover:text-[#f5f5f7] cursor-pointer"
                  title={isPlaying ? 'Pause Slideshow' : 'Play Slideshow'}
                >
                  {isPlaying ? (
                    <Pause className="w-3.5 h-3.5" />
                  ) : (
                    <Play className="w-3.5 h-3.5 ml-0.5" />
                  )}
                </button>

                <button
                  onClick={() =>
                    setActiveSlideIndex((prev) => (prev + 1) % feature.slides.length)
                  }
                  className="w-8 h-8 bg-[#0f0714] hover:bg-[#160a1d] border border-[rgba(197,168,128,0.2)] flex items-center justify-center text-[#c5a880] hover:text-[#dfc7a5] cursor-pointer"
                  title="Next Slide"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Column 2: In-Depth Engineering Narrative & Specs (5 cols) */}
          <div className="lg:col-span-5 space-y-6 text-left">
            <div className="space-y-4 text-[14.5px] text-[#8c8a94] leading-[1.7] font-light">
              {feature.narrative.map((para, pIdx) => (
                <p key={pIdx} className="border-l border-[rgba(197,168,128,0.3)] pl-4">
                  {para}
                </p>
              ))}
            </div>

            <div className="pt-2">
              <span className="font-['Cinzel'] text-[11px] uppercase tracking-[0.2em] text-[#c5a880] block mb-3">
                ENGINEERING SPECIFICATIONS
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {feature.specs.map((spec, sIdx) => (
                  <div
                    key={sIdx}
                    className="p-3.5 bg-[#131316] border border-[rgba(255,255,255,0.06)] hover:border-[rgba(197,168,128,0.3)] space-y-1 transition-colors"
                  >
                    <span className="font-['Cinzel'] text-[9.5px] text-[#8c8a94] uppercase tracking-wider block">
                      {spec.label}
                    </span>
                    <span className="font-['Cinzel'] text-[13px] text-[#f5f5f7] leading-snug block">
                      {spec.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4">
              <a
                href={`https://wa.me/254714333888?text=Salutations%20Alberka%20Motors.%20I%20wish%20to%20consult%20the%20atelier%20regarding%20the%20${encodeURIComponent(feature.title)}%20on%20the%20${encodeURIComponent(vehicleName)}%20(${stockNo}).`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-['Cinzel'] text-[12px] tracking-[0.18em] text-[#dfc7a5] hover:text-[#ffffff] group cursor-pointer transition-colors"
              >
                <span>CONSULT ATELIER ENGINEERS</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
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

  // Web Audio Acoustic Sanctuary Simulator
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
    const specText = `ALBERKA MOTORS BESPOKE COMMISSION:\nMarque: ${vehicle.name} (${vehicle.stockNo})\nExterior Enamel: ${activeColor.name}\nSanctuary Hide: ${activeLeather.name}\nArchitectural Veneer: ${activeVeneer.name}\nAcoustic Standard: 38 dB Whispers Isolation\nHandover Valuation: KES ${vehicle.priceKes.toLocaleString()}\nInquiry via Alberka Atelier Tangana Road Mombasa.`;
    navigator.clipboard?.writeText(specText);
    setCopiedToast(true);
    setTimeout(() => setCopiedToast(false), 3000);
  };

  // Bespoke Leather Palette
  const leatherHides = [
    { name: 'Cognac Saddle Napa', hex: '#8a5229', desc: 'Hand-selected European hides treated with organic plant tannins and French double-stitching.' },
    { name: 'Charles Blue & Grace White', hex: '#2c3e50', desc: 'Two-tone maritime palette reflecting coastal Mombasa trade winds.' },
    { name: 'Obsidian Black & Spirit Gold', hex: '#161718', desc: 'Monochrome midnight hides punctuated with metallic Rose Gold perimeter embroidery.' },
    { name: 'Portland Atelier Charcoal', hex: '#4a4b4d', desc: 'Matte semi-aniline finish engineered for durability under equatorial sunlight.' }
  ];

  // Bespoke Veneer & Architectural Panelling
  const veneerFinishes = [
    { name: 'Royal Open-Pore Mimosa', desc: 'Naturally grained timber sustainably sourced with zero synthetic lacquer, revealing true organic grain.' },
    { name: 'Smoked Crown Walnut', desc: 'Slow-cured dark walnut woodbook matched across the center console with hairline metallic inlay.' },
    { name: 'Piano Black Grand Lacquer', desc: 'Six layers of hand-buffed lacquer creating a mirror-like nocturnal obsidian surface.' },
    { name: 'Satin Anodized Aluminum', desc: 'Aircraft-grade cold-to-touch metal trim milled with geometric micro-guilloché knurling.' }
  ];

  const activeColor = vehicle.colors[selectedColorIndex] || vehicle.colors[0];
  const activeLeather = leatherHides[selectedLeatherIndex];
  const activeVeneer = veneerFinishes[selectedVeneerIndex];

  return (
    <div className="w-full bg-[#160a1d] text-[#f5f5f7] pb-32">
      
      {/* 1. MODEL SWITCHER HORIZON BAR (Rolls-Royce Nocturnal Glass) */}
      <div className="w-full bg-[#0f0714]/92 backdrop-blur-md border-b border-[rgba(197,168,128,0.18)] py-2.5 px-6 sticky top-[64px] z-30 transition-all">
        <div className="max-w-[1500px] mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 overflow-x-auto no-scrollbar py-0.5 min-w-0">
            <button
              onClick={onBackToFleet}
              className="font-['Cinzel'] text-[11px] tracking-[0.2em] text-[#8c8a94] hover:text-[#dfc7a5] flex items-center gap-1.5 cursor-pointer shrink-0 mr-2 px-3 py-1 bg-[#131316] border border-[rgba(197,168,128,0.2)] hover:border-[rgba(197,168,128,0.5)] transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span className="hidden xs:inline">FLEET</span>
            </button>

            <span className="font-['Cinzel'] text-[10px] uppercase tracking-[0.25em] text-[#c5a880] hidden lg:inline mr-2 shrink-0">
              MARQUES:
            </span>
            <div className="flex items-center bg-[#131316] border border-[rgba(255,255,255,0.06)] p-0.5 shrink-0">
              {allVehicles.map((v) => {
                const isCurrent = v.id === vehicle.id;
                return (
                  <button
                    key={v.id}
                    onClick={() => {
                      onSelectVehicle(v);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className={`px-3 py-1 font-['Cinzel'] text-[11px] tracking-wider transition-colors shrink-0 cursor-pointer ${
                      isCurrent
                        ? 'bg-[#c5a880] text-[#0f0714] font-medium'
                        : 'text-[#8c8a94] hover:text-[#f5f5f7]'
                    }`}
                  >
                    {v.name.split(' ')[1]} {v.name.split(' ')[2] || ''}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex items-center gap-4 shrink-0">
            <div className="hidden sm:flex flex-col text-right">
              <span className="font-['Cinzel'] text-[9px] tracking-widest text-[#8c8a94]">ACQUISITION</span>
              <span className="font-mono text-[13px] text-[#f5f5f7]">
                KES {vehicle.priceKes.toLocaleString()}
              </span>
            </div>
            <button
              onClick={() => onScheduleTestDrive(vehicle)}
              className="btn-rr-solid !py-1.5 !px-4 !text-[10px] whitespace-nowrap cursor-pointer"
            >
              INQUIRE / RESERVE
            </button>
          </div>
        </div>
      </div>

      {/* 2. MONUMENTAL HERO: ESSENCE, COLOR & METRICS */}
      <section className="relative w-full pt-16 pb-20 px-6 text-center max-w-[1400px] mx-auto overflow-hidden">
        
        {/* Starlight Constellation Layer */}
        <StarlightCanopy density={35} />

        <div className="relative z-10">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="h-[1px] w-6 bg-[rgba(197,168,128,0.4)]" />
            <span className="rr-eyebrow">
              {vehicle.status} // ATELIER STOCK #{vehicle.stockNo}
            </span>
            <div className="h-[1px] w-6 bg-[rgba(197,168,128,0.4)]" />
          </div>

          <p className="font-['Cinzel'] text-[12px] uppercase tracking-[0.25em] text-[#c5a880] mb-3">
            {vehicle.moniker}
          </p>

          <h1 className="rr-title-hero text-[34px] sm:text-[52px] md:text-[64px] mb-6 max-w-[1100px] mx-auto">
            {vehicle.name}
          </h1>

          <blockquote className="max-w-[800px] mx-auto text-[#dfc7a5] font-['Cormorant_Garamond'] text-[19px] sm:text-[23px] italic leading-[1.6] mb-12">
            "{vehicle.essenceQuote}"
          </blockquote>

          {/* Master Visual Canvas (0px Radius, Hairline Metallic Inlay) */}
          <div className="relative w-full max-w-[1100px] mx-auto mb-8">
            <div className="w-full h-[380px] sm:h-[500px] lg:h-[560px] overflow-hidden bg-[#080809] border border-[rgba(197,168,128,0.3)] relative">
              <SkeletonImage
                key={activeColor.name}
                src={activeColor.imageUrl}
                alt={`${vehicle.name} in ${activeColor.name}`}
                className="transition-transform duration-700 hover:scale-103"
                containerClassName="w-full h-full"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#0f0714] via-transparent to-transparent flex items-end p-6 sm:p-10">
                <div className="text-left text-[#f5f5f7] space-y-1">
                  <span className="font-['Cinzel'] text-[10px] uppercase tracking-[0.25em] text-[#c5a880] block">
                    BESPOKE COMMISSION HUE
                  </span>
                  <p className="font-['Cinzel'] text-[18px] sm:text-[22px] font-normal text-[#f5f5f7] tracking-wider">
                    {activeColor.name} // GRADE {vehicle.auctionGrade} PROVENANCE
                  </p>
                </div>
              </div>
            </div>

            {/* Color Switcher Bar (Hard 0px edges) */}
            <div className="p-4 max-w-[480px] mx-auto -mt-8 relative z-20 flex items-center justify-between bg-[#131316] border border-[rgba(197,168,128,0.35)]">
              <div className="text-left pl-2">
                <span className="font-['Cinzel'] text-[9.5px] text-[#8c8a94] uppercase tracking-wider block">BESPOKE FINISH</span>
                <span className="font-['Cinzel'] text-[13px] text-[#f5f5f7] truncate max-w-[200px] block">
                  {activeColor.name}
                </span>
              </div>

              <div className="flex items-center gap-2.5 pr-2">
                {vehicle.colors.map((c, idx) => {
                  const isSelected = selectedColorIndex === idx;
                  return (
                    <button
                      key={idx}
                      onClick={() => setSelectedColorIndex(idx)}
                      className={`w-7 h-7 transition-all cursor-pointer relative flex items-center justify-center ${
                        isSelected ? 'ring-2 ring-[#c5a880] scale-110' : 'opacity-60 hover:opacity-100'
                      }`}
                      style={{ backgroundColor: c.hex }}
                      title={c.name}
                    >
                      {isSelected && (
                        <span className="w-1.5 h-1.5 bg-[#0f0714]" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* 4-Column Metric Summary Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-[960px] mx-auto pt-8 text-left">
            <div className="border-l border-[rgba(197,168,128,0.3)] pl-4">
              <span className="font-['Cinzel'] text-[9.5px] text-[#8c8a94] uppercase tracking-wider block mb-1">CHRONOLOGY & DISTANCE</span>
              <span className="font-mono text-[14px] text-[#f5f5f7]">{vehicle.year} // {vehicle.mileageKm.toLocaleString()} KM</span>
            </div>
            <div className="border-l border-[rgba(197,168,128,0.3)] pl-4">
              <span className="font-['Cinzel'] text-[9.5px] text-[#8c8a94] uppercase tracking-wider block mb-1">AUCTION SCORE</span>
              <span className="font-['Cinzel'] text-[14px] text-[#dfc7a5]">{vehicle.auctionGrade} / {vehicle.interiorGrade}</span>
            </div>
            <div className="border-l border-[rgba(197,168,128,0.3)] pl-4">
              <span className="font-['Cinzel'] text-[9.5px] text-[#8c8a94] uppercase tracking-wider block mb-1">POWERTRAIN ARCHITECTURE</span>
              <span className="font-mono text-[14px] text-[#f5f5f7]">{vehicle.drivetrain.split('(')[0]}</span>
            </div>
            <div className="border-l border-[rgba(197,168,128,0.3)] pl-4">
              <span className="font-['Cinzel'] text-[9.5px] text-[#8c8a94] uppercase tracking-wider block mb-1">ACQUISITION VALUE</span>
              <span className="font-mono text-[14px] text-[#c5a880]">KES {vehicle.priceKes.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2.5 BESPOKE ATELIER COMMISSIONING SUITE (New Interactive Haute Couture Customizer) */}
      <section className="w-full bg-[#131316] py-20 px-6 border-y border-[rgba(197,168,128,0.25)]">
        <div className="max-w-[1400px] mx-auto space-y-10">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-2">
              <span className="rr-eyebrow block">ATELIER CUSTOMIZATION SUITE</span>
              <h2 className="rr-title-h2 text-[26px] sm:text-[34px]">
                TAILOR YOUR SANCTUARY.
              </h2>
            </div>
            <p className="text-[#dfc7a5] font-['Cormorant_Garamond'] text-[18px] italic max-w-[500px]">
              Every Goodwood atelier bespoke vehicle is born from the interplay of fine metals, organic timber, and hand-tailored leather hides.
            </p>
          </div>

          {/* Configurator Navigation Strip */}
          <div className="grid grid-cols-2 md:grid-cols-4 border border-[rgba(197,168,128,0.25)] bg-[#0f0714]">
            <button
              onClick={() => setBespokeTab('exterior')}
              className={`p-4 flex items-center justify-center gap-2.5 font-['Cinzel'] text-[11px] tracking-widest uppercase transition-all cursor-pointer ${
                bespokeTab === 'exterior'
                  ? 'bg-[#160a1d] text-[#dfc7a5] border-b-2 border-[#c5a880]'
                  : 'text-[#8c8a94] hover:text-[#f5f5f7]'
              }`}
            >
              <Palette className="w-4 h-4 text-[#c5a880]" />
              <span>EXTERIOR ENAMEL</span>
            </button>

            <button
              onClick={() => setBespokeTab('interior')}
              className={`p-4 flex items-center justify-center gap-2.5 font-['Cinzel'] text-[11px] tracking-widest uppercase transition-all cursor-pointer ${
                bespokeTab === 'interior'
                  ? 'bg-[#160a1d] text-[#dfc7a5] border-b-2 border-[#c5a880]'
                  : 'text-[#8c8a94] hover:text-[#f5f5f7]'
              }`}
            >
              <Armchair className="w-4 h-4 text-[#c5a880]" />
              <span>LEATHER SANCTUARY</span>
            </button>

            <button
              onClick={() => setBespokeTab('veneer')}
              className={`p-4 flex items-center justify-center gap-2.5 font-['Cinzel'] text-[11px] tracking-widest uppercase transition-all cursor-pointer ${
                bespokeTab === 'veneer'
                  ? 'bg-[#160a1d] text-[#dfc7a5] border-b-2 border-[#c5a880]'
                  : 'text-[#8c8a94] hover:text-[#f5f5f7]'
              }`}
            >
              <Layers className="w-4 h-4 text-[#c5a880]" />
              <span>ARCHITECTURAL VENEER</span>
            </button>

            <button
              onClick={() => setBespokeTab('acoustics')}
              className={`p-4 flex items-center justify-center gap-2.5 font-['Cinzel'] text-[11px] tracking-widest uppercase transition-all cursor-pointer ${
                bespokeTab === 'acoustics'
                  ? 'bg-[#160a1d] text-[#dfc7a5] border-b-2 border-[#c5a880]'
                  : 'text-[#8c8a94] hover:text-[#f5f5f7]'
              }`}
            >
              <Volume2 className="w-4 h-4 text-[#c5a880]" />
              <span>ACOUSTIC SHIELD (38 dB)</span>
            </button>
          </div>

          {/* Configurator Active Panel */}
          <div className="bg-[#0f0714] border border-[rgba(197,168,128,0.2)] p-8 sm:p-10">
            {bespokeTab === 'exterior' && (
              <div className="space-y-6">
                <div>
                  <span className="font-['Cinzel'] text-[10px] text-[#c5a880] uppercase tracking-widest block mb-1">
                    HAND-POLISHED FACTORY ENAMELS
                  </span>
                  <h3 className="font-['Cinzel'] text-[20px] text-[#f5f5f7] uppercase tracking-wider">
                    {activeColor.name}
                  </h3>
                  <p className="text-[13.5px] text-[#8c8a94] font-light mt-1 max-w-[680px]">
                    Multi-coat Japanese lacquer infused with mica pearls, cured at controlled coastal temperatures to achieve profound optical depth.
                  </p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {vehicle.colors.map((c, idx) => (
                    <div
                      key={idx}
                      onClick={() => setSelectedColorIndex(idx)}
                      className={`p-4 border transition-all cursor-pointer space-y-2 ${
                        selectedColorIndex === idx
                          ? 'border-[#c5a880] bg-[#160a1d]'
                          : 'border-[rgba(255,255,255,0.06)] bg-[#131316] hover:border-[rgba(197,168,128,0.3)]'
                      }`}
                    >
                      <div className="w-full h-12 border border-[rgba(255,255,255,0.1)] flex items-center justify-center" style={{ backgroundColor: c.hex }}>
                        {selectedColorIndex === idx && <CheckCircle2 className="w-5 h-5 text-white drop-shadow-md" />}
                      </div>
                      <span className="font-['Cinzel'] text-[11px] text-[#f5f5f7] block truncate">{c.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {bespokeTab === 'interior' && (
              <div className="space-y-6">
                <div>
                  <span className="font-['Cinzel'] text-[10px] text-[#c5a880] uppercase tracking-widest block mb-1">
                    SANCTUARY LEATHER SPECIFICATION
                  </span>
                  <h3 className="font-['Cinzel'] text-[20px] text-[#f5f5f7] uppercase tracking-wider">
                    {activeLeather.name}
                  </h3>
                  <p className="text-[13.5px] text-[#8c8a94] font-light mt-1 max-w-[680px]">
                    {activeLeather.desc}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {leatherHides.map((hide, idx) => (
                    <div
                      key={idx}
                      onClick={() => setSelectedLeatherIndex(idx)}
                      className={`p-4 border transition-all cursor-pointer space-y-2 ${
                        selectedLeatherIndex === idx
                          ? 'border-[#c5a880] bg-[#160a1d]'
                          : 'border-[rgba(255,255,255,0.06)] bg-[#131316] hover:border-[rgba(197,168,128,0.3)]'
                      }`}
                    >
                      <div className="w-full h-10 border border-[rgba(255,255,255,0.1)] flex items-center justify-center" style={{ backgroundColor: hide.hex }}>
                        {selectedLeatherIndex === idx && <CheckCircle2 className="w-5 h-5 text-white drop-shadow-md" />}
                      </div>
                      <span className="font-['Cinzel'] text-[11px] text-[#f5f5f7] block">{hide.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {bespokeTab === 'veneer' && (
              <div className="space-y-6">
                <div>
                  <span className="font-['Cinzel'] text-[10px] text-[#c5a880] uppercase tracking-widest block mb-1">
                    NATURAL TIMBER & METALLIC ARCHITECTURE
                  </span>
                  <h3 className="font-['Cinzel'] text-[20px] text-[#f5f5f7] uppercase tracking-wider">
                    {activeVeneer.name}
                  </h3>
                  <p className="text-[13.5px] text-[#8c8a94] font-light mt-1 max-w-[680px]">
                    {activeVeneer.desc}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {veneerFinishes.map((veneer, idx) => (
                    <div
                      key={idx}
                      onClick={() => setSelectedVeneerIndex(idx)}
                      className={`p-4 border transition-all cursor-pointer space-y-2 ${
                        selectedVeneerIndex === idx
                          ? 'border-[#c5a880] bg-[#160a1d]'
                          : 'border-[rgba(255,255,255,0.06)] bg-[#131316] hover:border-[rgba(197,168,128,0.3)]'
                      }`}
                    >
                      <div className="w-full h-10 bg-[#261230] border border-[rgba(197,168,128,0.2)] flex items-center justify-center">
                        <span className="font-['Cinzel'] text-[9px] text-[#c5a880] uppercase tracking-widest">ATELIER CRAFT</span>
                      </div>
                      <span className="font-['Cinzel'] text-[11px] text-[#f5f5f7] block">{veneer.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {bespokeTab === 'acoustics' && (
              <div className="space-y-6">
                <div>
                  <span className="font-['Cinzel'] text-[10px] text-[#c5a880] uppercase tracking-widest block mb-1">
                    THE ARCHITECTURE OF SILENCE // ACOUSTIC SANCTUARY
                  </span>
                  <h3 className="font-['Cinzel'] text-[20px] text-[#f5f5f7] uppercase tracking-wider">
                    38 DECIBELS // WHISPER-QUIET TRAJECTORY
                  </h3>
                  <p className="text-[13.5px] text-[#8c8a94] font-light mt-1 max-w-[680px]">
                    Engineered with 6-mm double-laminated acoustic glass, fluid-filled engine subframe mounts, and sound-absorption foam injected directly into the chassis pillars.
                  </p>
                </div>

                {/* Interactive Audio Resonance Simulator */}
                <div className="p-6 bg-[#0f0714] border border-[rgba(197,168,128,0.3)] space-y-5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <span className="font-['Cinzel'] text-[9.5px] text-[#c5a880] uppercase tracking-widest block mb-0.5">
                        INTERACTIVE AUDITORY DEMONSTRATION
                      </span>
                      <h4 className="font-['Cinzel'] text-[15px] text-[#f5f5f7] tracking-wider uppercase">
                        Acoustic Damping Resonance Simulator
                      </h4>
                      <p className="text-[12px] text-[#8c8a94] font-light mt-0.5">
                        Experience the direct contrast between standard coastal traffic noise and Alberka Whispers sanctuary isolation.
                      </p>
                    </div>

                    {/* Animated Equalizer Waveform */}
                    <div className="flex items-end gap-1 h-8 px-3 py-1 bg-[#131316] border border-[rgba(197,168,128,0.2)] shrink-0">
                      {[40, 75, 55, 90, 65, 35, 80, 50, 95, 60, 45, 70].map((height, i) => (
                        <div
                          key={i}
                          className={`w-1 transition-all duration-300 ${
                            acousticMode === 'ambient'
                              ? 'bg-[#eb5757]'
                              : acousticMode === 'sanctuary'
                              ? 'bg-[#c5a880]'
                              : 'bg-[#27252c]'
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

                  {/* Audio Controls */}
                  <div className="flex flex-wrap items-center gap-3 pt-2">
                    <button
                      onClick={() => playAcousticSimulation('ambient')}
                      className={`font-['Cinzel'] text-[11px] px-4 py-2.5 uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer ${
                        acousticMode === 'ambient'
                          ? 'bg-[#eb5757] text-[#080809] font-medium'
                          : 'bg-[#131316] text-[#eb5757] border border-[#eb5757]/40 hover:bg-[#eb5757]/10'
                      }`}
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                      <span>1. RAW COASTAL TRAFFIC (72 dB)</span>
                    </button>

                    <button
                      onClick={() => playAcousticSimulation('sanctuary')}
                      className={`font-['Cinzel'] text-[11px] px-4 py-2.5 uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer ${
                        acousticMode === 'sanctuary'
                          ? 'bg-[#c5a880] text-[#080809] font-medium'
                          : 'bg-[#131316] text-[#dfc7a5] border border-[rgba(197,168,128,0.4)] hover:bg-[#c5a880]/10'
                      }`}
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>2. ALBERKA SANCTUARY ISOLATION (38 dB)</span>
                    </button>

                    {acousticMode !== 'off' && (
                      <button
                        onClick={stopAcousticAudio}
                        className="font-['Cinzel'] text-[10px] px-3 py-2 text-[#8c8a94] hover:text-[#f5f5f7] border border-[rgba(255,255,255,0.1)] hover:border-[rgba(255,255,255,0.3)] transition-colors flex items-center gap-1.5 cursor-pointer uppercase tracking-wider"
                      >
                        <VolumeX className="w-3.5 h-3.5" />
                        <span>DISENGAGE AUDIT</span>
                      </button>
                    )}
                  </div>

                  <p className="text-[11px] text-[#8c8a94] font-mono">
                    {acousticMode === 'ambient' && '▶ SIMULATING: Uninsulated exterior environment with harsh coastal airflow and open diesel resonance (72 dB).'}
                    {acousticMode === 'sanctuary' && '▶ ENGAGED: 34 dB high-frequency attenuation active. 6-mm double-pane acoustic laminate dampening engaged (38 dB).'}
                    {acousticMode === 'off' && 'Select an acoustic mode above to engage real-time browser frequency audition.'}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-2">
                  <div className="p-5 bg-[#131316] border border-[rgba(197,168,128,0.2)] space-y-1">
                    <span className="font-['Cinzel'] text-[10px] text-[#8c8a94] uppercase tracking-wider block">IDLE CABIN ACOUSTICS</span>
                    <span className="font-mono text-[24px] text-[#c5a880] block">38 dB</span>
                    <span className="text-[11px] text-[#8c8a94] font-light block">Equivalent to a private Mayfair library</span>
                  </div>

                  <div className="p-5 bg-[#131316] border border-[rgba(197,168,128,0.2)] space-y-1">
                    <span className="font-['Cinzel'] text-[10px] text-[#8c8a94] uppercase tracking-wider block">ACOUSTIC GLAZING</span>
                    <span className="font-mono text-[24px] text-[#dfc7a5] block">6.0 MM</span>
                    <span className="text-[11px] text-[#8c8a94] font-light block">Dual-pane acoustic barrier laminate</span>
                  </div>

                  <div className="p-5 bg-[#131316] border border-[rgba(197,168,128,0.2)] space-y-1">
                    <span className="font-['Cinzel'] text-[10px] text-[#8c8a94] uppercase tracking-wider block">MAGIC CARPET RIDE</span>
                    <span className="font-['Cinzel'] text-[18px] text-[#f5f5f7] block mt-1">PLANAR TUNING</span>
                    <span className="text-[11px] text-[#8c8a94] font-light block">Frequency-selective hydraulic damping</span>
                  </div>
                </div>
              </div>
            )}

            {/* Atelier Specification Summary & Commission Action */}
            <div className="mt-8 pt-6 border-t border-[rgba(197,168,128,0.2)] flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="text-left space-y-1">
                <span className="font-['Cinzel'] text-[9.5px] text-[#8c8a94] uppercase tracking-wider block">
                  COMMISSION SUMMARY:
                </span>
                <p className="font-['Cinzel'] text-[12.5px] text-[#dfc7a5] tracking-wider uppercase">
                  {vehicle.name} // {activeColor.name} // {activeLeather.name} // {activeVeneer.name}
                </p>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  onClick={handleCopySpec}
                  className="font-['Cinzel'] text-[11px] tracking-[0.16em] uppercase px-4 py-3 bg-[#131316] hover:bg-[#1c1a22] text-[#dfc7a5] border border-[rgba(197,168,128,0.3)] hover:border-[#dfc7a5] transition-all flex items-center justify-center gap-2 cursor-pointer w-full sm:w-auto"
                >
                  {copiedToast ? <Check className="w-3.5 h-3.5 text-[#27a644]" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedToast ? 'SPECIFICATION COPIED' : 'COPY SPECIFICATION'}</span>
                </button>

                <a
                  href={`https://wa.me/254714333888?text=Salutations%20Alberka%20Motors.%20I%20have%20tailored%20a%20bespoke%20commission%20for%20the%20${encodeURIComponent(vehicle.name)}%20(${vehicle.stockNo}):%20Exterior:%20${encodeURIComponent(activeColor.name)},%20Leather:%20${encodeURIComponent(activeLeather.name)},%20Veneer:%20${encodeURIComponent(activeVeneer.name)}.%20Please%20advise%20on%20availability%20and%20private%20viewing.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-rr-solid w-full sm:w-auto text-center"
                >
                  <span>TRANSMIT TO WHISPERS</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-2" />
                </a>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 3. DEDICATED EDITORIAL FEATURE SPREADS */}
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

      {/* 4. TECHNICAL SPECIFICATIONS & PROVENANCE ARCHIVE */}
      <section className="w-full bg-[#160a1d] py-24 px-6 border-t border-[rgba(197,168,128,0.18)]">
        <div className="max-w-[1400px] mx-auto space-y-12">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
            <div className="space-y-2">
              <span className="rr-eyebrow block">
                ENGINEERING DOSSIER & PROVENANCE
              </span>
              <h2 className="rr-title-h2 text-[26px] sm:text-[34px]">
                TECHNICAL ARCHIVES // {vehicle.name}
              </h2>
            </div>

            <button
              onClick={() => setShowAuctionModal(true)}
              className="btn-rr-ghost !py-2.5 !px-5 cursor-pointer"
            >
              <FileText className="w-3.5 h-3.5 text-[#c5a880]" />
              <span>INSPECT JAPANESE AUCTION SHEET</span>
            </button>
          </div>

          {/* Technical Specs 4-Column Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 bg-[#131316] border border-[rgba(255,255,255,0.06)] space-y-2">
              <span className="font-['Cinzel'] text-[10px] text-[#8c8a94] uppercase tracking-widest block">POWERTRAIN & ENGINE</span>
              <p className="font-mono text-[13px] text-[#f5f5f7]">{vehicle.engine}</p>
              <p className="font-mono text-[12px] text-[#8c8a94]">{vehicle.power} // {vehicle.torque}</p>
            </div>

            <div className="p-5 bg-[#131316] border border-[rgba(255,255,255,0.06)] space-y-2">
              <span className="font-['Cinzel'] text-[10px] text-[#8c8a94] uppercase tracking-widest block">TRANSMISSION & DRIVE</span>
              <p className="font-mono text-[13px] text-[#f5f5f7]">{vehicle.transmission}</p>
              <p className="font-mono text-[12px] text-[#8c8a94]">{vehicle.drivetrain}</p>
            </div>

            <div className="p-5 bg-[#131316] border border-[rgba(255,255,255,0.06)] space-y-2">
              <span className="font-['Cinzel'] text-[10px] text-[#8c8a94] uppercase tracking-widest block">AUCTION HALL & PROVENANCE</span>
              <p className="font-['Cinzel'] text-[13px] text-[#dfc7a5]">{vehicle.auctionHall}</p>
              <p className="font-mono text-[12px] text-[#8c8a94]">Grade {vehicle.auctionGrade} // Interior {vehicle.interiorGrade}</p>
            </div>

            <div className="p-5 bg-[#131316] border border-[rgba(255,255,255,0.06)] space-y-2">
              <span className="font-['Cinzel'] text-[10px] text-[#8c8a94] uppercase tracking-widest block">WARRANTY & LOCATION</span>
              <p className="font-['Cinzel'] text-[13px] text-[#c5a880]">5,000 KM Master Covenant</p>
              <p className="font-mono text-[12px] text-[#8c8a94]">{vehicle.status}</p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. WHISPERS PRIVATE CONCIERGE & TEST DRIVE DRAWER */}
      <section className="w-full bg-[#0f0714] py-24 px-6 border-t border-[rgba(197,168,128,0.2)]">
        <div className="max-w-[900px] mx-auto text-center space-y-8">
          <span className="rr-eyebrow">
            WHISPERS PRIVATE CONSULTATION
          </span>
          <h2 className="rr-title-h1 text-[30px] sm:text-[44px]">
            SCHEDULE PRIVATE VIEWING.
          </h2>
          <p className="text-[#dfc7a5] font-['Cormorant_Garamond'] text-[19px] sm:text-[22px] italic leading-relaxed max-w-[650px] mx-auto">
            Experience the serene trajectory of the {vehicle.name} at our Tangana Road coastal atelier in Mombasa or our private executive suite in Westlands, Nairobi.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <button
              onClick={() => onScheduleTestDrive(vehicle)}
              className="btn-rr-solid cursor-pointer"
            >
              <Calendar className="w-4 h-4 mr-2" />
              <span>BOOK PRIVATE VIEWING</span>
            </button>
            <button
              onClick={() => {
                if (onOpenWhispers) onOpenWhispers();
                else window.open(`https://wa.me/254714333888?text=Salutations%20Alberka%20Motors.%20I%20wish%20to%20arrange%20a%20private%20inspection%20for%20the%20${encodeURIComponent(vehicle.name)}%20(${vehicle.stockNo}).`, '_blank');
              }}
              className="btn-rr-ghost cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 mr-2 text-[#c5a880]" />
              <span>WHISPERS CONCIERGE</span>
            </button>
          </div>
        </div>
      </section>

      {/* Japanese Auction Sheet Dossier Modal */}
      {showAuctionModal && (
        <div className="fixed inset-0 z-50 bg-[#080809]/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          <div className="max-w-[760px] w-full bg-[#131316] border border-[rgba(197,168,128,0.4)] p-6 sm:p-8 space-y-6 text-left my-auto shadow-2xl relative">
            
            {/* Header & Close */}
            <div className="flex items-start justify-between border-b border-[rgba(197,168,128,0.2)] pb-4">
              <div>
                <div className="inline-flex items-center gap-2 mb-1">
                  <span className="font-['Cinzel'] text-[9.5px] text-[#c5a880] uppercase tracking-widest bg-[#160a1d] px-2 py-0.5 border border-[rgba(197,168,128,0.25)]">
                    ORIGINAL JAPANESE EXPORT DOSSIER
                  </span>
                  <span className="font-mono text-[10px] text-[#8c8a94]">
                    LOT #{vehicle.stockNo.replace(/[^0-9]/g, '') || '7942'}
                  </span>
                </div>
                <h3 className="font-['Cinzel'] text-[20px] sm:text-[22px] text-[#f5f5f7] tracking-wider uppercase">
                  {vehicle.name} // {vehicle.stockNo}
                </h3>
                <p className="text-[12px] text-[#8c8a94] font-light mt-0.5">
                  Direct provenance archive from {vehicle.auctionHall} (Japan). Authenticated via QISJ Pre-Shipment Inspection.
                </p>
              </div>

              <button
                onClick={() => setShowAuctionModal(false)}
                className="btn-rr-ghost !py-1 !px-3 !text-[11px] cursor-pointer shrink-0"
              >
                CLOSE
              </button>
            </div>

            {/* Score Grid & Authentic Red Japanese Hanko Seal */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 bg-[#0f0714] border border-[rgba(197,168,128,0.25)] relative overflow-hidden flex flex-col justify-between">
                <div>
                  <span className="font-['Cinzel'] text-[9px] text-[#8c8a94] uppercase tracking-widest block mb-1">OVERALL GRADE</span>
                  <span className="font-mono text-[32px] text-[#c5a880] font-semibold block leading-none">{vehicle.auctionGrade}</span>
                  <span className="text-[10.5px] text-[#dfc7a5] font-light mt-1 block">Pristine Original Condition</span>
                </div>
                {/* Traditional Japanese Hanko Stamp */}
                <div className="mt-3 pt-2 border-t border-[rgba(197,168,128,0.15)] flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full border border-[#eb5757] flex items-center justify-center text-[#eb5757] text-[10px] font-bold font-serif shrink-0">
                    合
                  </div>
                  <span className="text-[10px] text-[#eb5757] font-mono tracking-wider">USS VERIFIED</span>
                </div>
              </div>

              <div className="p-4 bg-[#0f0714] border border-[rgba(197,168,128,0.25)] flex flex-col justify-between">
                <div>
                  <span className="font-['Cinzel'] text-[9px] text-[#8c8a94] uppercase tracking-widest block mb-1">INTERIOR GRADE</span>
                  <span className="font-mono text-[32px] text-[#dfc7a5] font-semibold block leading-none">{vehicle.interiorGrade}</span>
                  <span className="text-[10.5px] text-[#8c8a94] font-light mt-1 block">Zero smoke, zero pet wear</span>
                </div>
                <div className="mt-3 pt-2 border-t border-[rgba(197,168,128,0.15)] flex items-center gap-2">
                  <span className="text-[10px] text-[#27a644] font-mono">QISJ PASS</span>
                </div>
              </div>

              <div className="p-4 bg-[#0f0714] border border-[rgba(197,168,128,0.25)] flex flex-col justify-between">
                <div>
                  <span className="font-['Cinzel'] text-[9px] text-[#8c8a94] uppercase tracking-widest block mb-1">VERIFIED ODOMETER</span>
                  <span className="font-mono text-[22px] text-[#f5f5f7] font-semibold block leading-none mt-1">
                    {vehicle.mileageKm.toLocaleString()}
                  </span>
                  <span className="text-[10.5px] text-[#8c8a94] font-light mt-1 block">Certified Japanese JEVIC</span>
                </div>
                <div className="mt-3 pt-2 border-t border-[rgba(197,168,128,0.15)] flex items-center gap-2">
                  <span className="text-[10px] text-[#c5a880] font-mono">100% GENUINE</span>
                </div>
              </div>
            </div>

            {/* Vehicle Inspection Blueprint Matrix */}
            <div className="p-5 bg-[#0f0714] border border-[rgba(255,255,255,0.06)] space-y-4">
              <div className="flex items-center justify-between border-b border-[rgba(255,255,255,0.06)] pb-2">
                <span className="font-['Cinzel'] text-[10px] text-[#c5a880] uppercase tracking-widest">
                  PANEL & CHASSIS INSPECTION CODES (JAPANESE STANDARD)
                </span>
                <span className="font-mono text-[10px] text-[#8c8a94]">
                  FRAME DISTORTION: 0%
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-[11.5px] font-mono">
                <div className="p-2.5 bg-[#131316] border border-[rgba(255,255,255,0.04)]">
                  <span className="text-[#c5a880] block font-bold">FRONT BUMPER</span>
                  <span className="text-[#8c8a94]">A1 · Micro hairline touch</span>
                </div>
                <div className="p-2.5 bg-[#131316] border border-[rgba(255,255,255,0.04)]">
                  <span className="text-[#c5a880] block font-bold">LEFT FLANK</span>
                  <span className="text-[#8c8a94]">O · Original factory enamel</span>
                </div>
                <div className="p-2.5 bg-[#131316] border border-[rgba(255,255,255,0.04)]">
                  <span className="text-[#c5a880] block font-bold">RIGHT FLANK</span>
                  <span className="text-[#8c8a94]">O · Original factory enamel</span>
                </div>
                <div className="p-2.5 bg-[#131316] border border-[rgba(255,255,255,0.04)]">
                  <span className="text-[#c5a880] block font-bold">PILLARS & ROOF</span>
                  <span className="text-[#27a644]">XX: NONE · Zero repair</span>
                </div>
              </div>

              <p className="text-[11.5px] text-[#8c8a94] font-light leading-relaxed">
                <strong className="text-[#dfc7a5] font-normal">Inspector Notes:</strong> Engine bay shows meticulous Tokyo dealer maintenance record. Zero rust or salt-air exposure. All 4 tires maintain &gt;6.5mm tread depth. Suspension bushings and steering rack certified flawless.
              </p>
            </div>

            {/* Action Bar */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="text-[11px] text-[#8c8a94] font-mono">
                Official PDF dispatched via encrypted WhatsApp channel.
              </span>

              <a
                href={`https://wa.me/254714333888?text=Salutations%20Alberka%20Motors.%20Please%20furnish%20the%20original%20high-resolution%20Japanese%20auction%20sheet%20PDF%20for%20${encodeURIComponent(vehicle.name)}%20(${vehicle.stockNo})%20from%20${encodeURIComponent(vehicle.auctionHall)}.`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-rr-solid w-full sm:w-auto text-center"
              >
                <span>REQUEST ORIGINAL PDF VIA WHISPERS</span>
                <ArrowRight className="w-3.5 h-3.5 ml-2" />
              </a>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
