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
  Bookmark
} from 'lucide-react';
import { Vehicle, EditorialFeature, FeatureSlide } from '../data/vehicles';
import { useAnimatedNumber } from '../hooks/useAnimations';
import { SkeletonImage } from './SkeletonImage';

interface VehicleStoryViewProps {
  vehicle: Vehicle;
  allVehicles: Vehicle[];
  onSelectVehicle: (v: Vehicle) => void;
  onBackToFleet: () => void;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  onScheduleTestDrive: (v: Vehicle) => void;
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
}) => {
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const [showAuctionModal, setShowAuctionModal] = useState(false);

  const activeColor = vehicle.colors[selectedColorIndex] || vehicle.colors[0];

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
            <a
              href={`https://wa.me/254714333888?text=Salutations%20Alberka%20Motors.%20I%20wish%20to%20reserve%20a%20private%20inspection%20for%20the%20${encodeURIComponent(vehicle.name)}%20(${vehicle.stockNo}).`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-rr-solid !py-1.5 !px-4 !text-[10px] whitespace-nowrap"
            >
              INQUIRE / RESERVE
            </a>
          </div>
        </div>
      </div>

      {/* 2. MONUMENTAL HERO: ESSENCE, COLOR & METRICS */}
      <section className="w-full pt-16 pb-20 px-6 text-center max-w-[1400px] mx-auto">
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
              className="btn-rr-ghost !py-2.5 !px-5"
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
              className="btn-rr-solid"
            >
              <Calendar className="w-4 h-4 mr-2" />
              <span>BOOK PRIVATE VIEWING</span>
            </button>
            <a
              href={`https://wa.me/254714333888?text=Salutations%20Alberka%20Motors.%20I%20wish%20to%20arrange%20a%20private%20inspection%20and%20consultation%20for%20the%20${encodeURIComponent(vehicle.name)}%20(${vehicle.stockNo}).`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-rr-ghost"
            >
              <MessageCircle className="w-4 h-4 mr-2 text-[#c5a880]" />
              <span>DIRECT WHATSAPP CONCIERGE</span>
            </a>
          </div>
        </div>
      </section>

      {/* Auction Sheet Modal */}
      {showAuctionModal && (
        <div className="fixed inset-0 z-50 bg-[#080809]/95 backdrop-blur-md flex items-center justify-center p-6">
          <div className="max-w-[700px] w-full bg-[#131316] border border-[rgba(197,168,128,0.4)] p-8 space-y-6 text-left">
            <div className="flex items-center justify-between border-b border-[rgba(197,168,128,0.2)] pb-4">
              <div>
                <span className="rr-eyebrow block">AUTHENTIC JAPANESE INSPECTION</span>
                <h3 className="font-['Cinzel'] text-[20px] text-[#f5f5f7] mt-1">{vehicle.name} // {vehicle.stockNo}</h3>
              </div>
              <button
                onClick={() => setShowAuctionModal(false)}
                className="btn-rr-ghost !py-1 !px-3 !text-[11px]"
              >
                CLOSE
              </button>
            </div>

            <div className="space-y-4 font-mono text-[13px] text-[#8c8a94]">
              <div className="p-4 bg-[#0f0714] border border-[rgba(255,255,255,0.06)] space-y-2">
                <p><strong className="text-[#dfc7a5]">Auction Hall:</strong> {vehicle.auctionHall}</p>
                <p><strong className="text-[#dfc7a5]">Overall Grade:</strong> {vehicle.auctionGrade} (Pristine Original Condition)</p>
                <p><strong className="text-[#dfc7a5]">Interior Grade:</strong> {vehicle.interiorGrade}</p>
                <p><strong className="text-[#dfc7a5]">Verified Mileage:</strong> {vehicle.mileageKm.toLocaleString()} KM (Certified JEVIC / QISJ)</p>
                <p><strong className="text-[#dfc7a5]">Inspection Report:</strong> Zero chassis distortion, authentic factory body panels, genuine Japanese service record verified.</p>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <a
                href={`https://wa.me/254714333888?text=Salutations%20Alberka%20Motors.%20Please%20furnish%20the%20full%20Japanese%20auction%20sheet%20PDF%20for%20${encodeURIComponent(vehicle.name)}%20(${vehicle.stockNo}).`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-rr-solid"
              >
                REQUEST ORIGINAL PDF DOSSIER
              </a>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
