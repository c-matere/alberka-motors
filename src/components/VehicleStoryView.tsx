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
  Armchair
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
 * Linear Midnight Precision Instrument — Core System Spread
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
    }, 4500);
    return () => clearInterval(interval);
  }, [isPlaying, feature.slides.length]);

  const renderFeatureIcon = () => {
    switch (feature.id) {
      case 'seats':
        return <Armchair className="w-3.5 h-3.5 text-[#e4f222]" />;
      case 'transmission':
        return <Cpu className="w-3.5 h-3.5 text-[#e4f222]" />;
      case 'infotainment':
        return <Sliders className="w-3.5 h-3.5 text-[#e4f222]" />;
      case 'safety':
        return <ShieldCheck className="w-3.5 h-3.5 text-[#e4f222]" />;
      default:
        return <Sparkles className="w-3.5 h-3.5 text-[#e4f222]" />;
    }
  };

  return (
    <section className="w-full bg-[#08090a] border-b border-[#23252a] py-20 px-4 sm:px-6">
      <div className="max-w-[1200px] mx-auto space-y-10">
        
        {/* Section Header: Linear 4px badge + Monolithic Headline + Lead */}
        <div className="space-y-3 max-w-[900px]">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-[4px] bg-[#0f1011] border border-[#23252a] text-[11px] font-mono uppercase tracking-wider text-[#8a8f98]">
            {renderFeatureIcon()}
            <span>0{sectionIndex + 1} / 0{totalSections} · {feature.badge}</span>
          </div>

          <h2 className="text-[26px] sm:text-[36px] lg:text-[40px] font-[510] text-white tracking-[-0.022em] leading-[1.12]">
            {feature.title}
          </h2>

          <p className="text-[15px] sm:text-[16px] text-[#d0d6e0] leading-[1.6] font-normal">
            {feature.lead}
          </p>
        </div>

        {/* 12-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          
          {/* Column 1: Cinematic Slide Showcase (7 cols, 12px radius, #0f1011) */}
          <div className="lg:col-span-7 space-y-3">
            <div className="w-full h-[340px] sm:h-[440px] lg:h-[480px] rounded-[12px] overflow-hidden bg-[#0f1011] border border-[#23252a] relative group">
              <SkeletonImage
                key={activeSlide.id || activeSlide.imageUrl}
                src={activeSlide.imageUrl}
                alt={activeSlide.title}
                className="transition-transform duration-500 ease-out group-hover:scale-102"
                containerClassName="w-full h-full"
              />

              {/* Floating Badges */}
              <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between pointer-events-none z-10">
                <span className="bg-[#08090a]/80 backdrop-blur-md border border-[#23252a] px-2.5 py-1 rounded-[4px] text-[11px] font-mono text-[#d0d6e0]">
                  Slide {activeSlideIndex + 1} of {feature.slides.length}
                </span>

                {activeSlide.metric && (
                  <div className="bg-[#08090a]/90 backdrop-blur-md border border-[#23252a] px-2.5 py-1 rounded-[4px] flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#e4f222]" />
                    <span className="text-[11px] font-mono text-[#8a8f98] hidden xs:inline">{activeSlide.metricLabel}:</span>
                    <span className="text-[12px] font-mono font-[510] text-white">{activeSlide.metric}</span>
                  </div>
                )}
              </div>

              {/* Bottom Scrim */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#08090a]/95 via-[#08090a]/40 to-transparent flex items-end p-5 sm:p-7 pointer-events-none z-10">
                <div className="space-y-1.5 max-w-[540px]">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-[#8a8f98] block">
                    {activeSlide.subtitle}
                  </span>
                  <h3 className="text-[18px] sm:text-[21px] font-[510] text-white leading-snug tracking-[-0.012em]">
                    {activeSlide.title}
                  </h3>
                  <p className="text-[13px] sm:text-[14px] text-[#d0d6e0] line-clamp-2 leading-[1.5]">
                    {activeSlide.description}
                  </p>
                </div>
              </div>
            </div>

            {/* Slide Navigation Dock (Linear 8px radius) */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 p-2 bg-[#0f1011] border border-[#23252a] rounded-[8px]">
              <div className="flex items-center gap-1 overflow-x-auto no-scrollbar py-0.5">
                {feature.slides.map((s, idx) => {
                  const isActive = activeSlideIndex === idx;
                  return (
                    <button
                      key={s.id || idx}
                      onClick={() => setActiveSlideIndex(idx)}
                      className={`px-2.5 py-1 rounded-[4px] text-[12px] font-mono transition-colors shrink-0 cursor-pointer ${
                        isActive
                          ? 'bg-[#ffffff] text-[#08090a] font-[510]'
                          : 'bg-[#161718] text-[#8a8f98] hover:text-[#d0d6e0] hover:bg-[#23252a]'
                      }`}
                    >
                      <span>{s.title.split(' ')[0]} {s.title.split(' ')[1] || ''}</span>
                    </button>
                  );
                })}
              </div>

              <div className="flex items-center justify-end gap-1 shrink-0">
                <button
                  onClick={() =>
                    setActiveSlideIndex((prev) =>
                      prev === 0 ? feature.slides.length - 1 : prev - 1
                    )
                  }
                  className="w-7 h-7 rounded-[4px] bg-[#161718] hover:bg-[#23252a] flex items-center justify-center text-[#d0d6e0] hover:text-white cursor-pointer"
                  title="Previous slide"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="w-7 h-7 rounded-[4px] bg-[#161718] hover:bg-[#23252a] flex items-center justify-center text-[#d0d6e0] hover:text-white cursor-pointer"
                  title={isPlaying ? 'Pause slideshow' : 'Play slideshow'}
                >
                  {isPlaying ? (
                    <Pause className="w-3 h-3" />
                  ) : (
                    <Play className="w-3 h-3 ml-0.5" />
                  )}
                </button>

                <button
                  onClick={() =>
                    setActiveSlideIndex((prev) => (prev + 1) % feature.slides.length)
                  }
                  className="w-7 h-7 rounded-[4px] bg-[#161718] hover:bg-[#23252a] flex items-center justify-center text-[#d0d6e0] hover:text-white cursor-pointer"
                  title="Next slide"
                >
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Column 2: In-Depth Engineering Narrative & Specs (5 cols) */}
          <div className="lg:col-span-5 space-y-5 text-left">
            <div className="space-y-3.5 text-[14px] sm:text-[15px] text-[#8a8f98] leading-[1.6]">
              {feature.narrative.map((para, pIdx) => (
                <p key={pIdx} className="border-l border-[#23252a] pl-3.5">
                  {para}
                </p>
              ))}
            </div>

            <div className="pt-2">
              <span className="text-[11px] font-mono uppercase tracking-wider text-[#8a8f98] block mb-2.5">
                Engineering Specifications
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {feature.specs.map((spec, sIdx) => (
                  <div
                    key={sIdx}
                    className="p-3 rounded-[8px] bg-[#0f1011] border border-[#23252a] space-y-0.5 hover:border-[#383b3f] transition-colors"
                  >
                    <span className="text-[10px] text-[#8a8f98] font-mono uppercase tracking-wider block">
                      {spec.label}
                    </span>
                    <span className="text-[13px] font-[510] text-white leading-snug block">
                      {spec.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-2">
              <a
                href={`https://wa.me/254714333888?text=Hello%20Alberka%20Motors,%20I%20am%20inquiring%20about%20the%20${encodeURIComponent(feature.title)}%20on%20the%20${encodeURIComponent(vehicleName)}%20(${stockNo}).`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-[13px] text-[#d0d6e0] hover:text-white font-normal group cursor-pointer transition-colors"
              >
                <span>Consult engineering concierge</span>
                <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
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
  const [depositPercent, setDepositPercent] = useState(25);
  const [loanTenureMonths, setLoanTenureMonths] = useState(48);

  const depositAmount = (vehicle.priceKes * depositPercent) / 100;
  const loanPrincipal = vehicle.priceKes - depositAmount;
  const annualInterestRate = 0.135;
  const monthlyRate = annualInterestRate / 12;
  const monthlyPayment = Math.round(
    (loanPrincipal * monthlyRate * Math.pow(1 + monthlyRate, loanTenureMonths)) /
      (Math.pow(1 + monthlyRate, loanTenureMonths) - 1)
  );

  const animatedMonthlyPayment = useAnimatedNumber(monthlyPayment, 350);
  const animatedDepositAmount = useAnimatedNumber(depositAmount, 350);

  const activeColor = vehicle.colors[selectedColorIndex] || vehicle.colors[0];

  return (
    <div className="w-full bg-[#08090a] text-[#d0d6e0] pb-24">
      
      {/* 1. MODEL SWITCHER HORIZON BAR (Linear 56px, #08090a, 1px border) */}
      <div className="w-full bg-[#08090a]/90 backdrop-blur-md border-b border-[#23252a] py-2 px-3 sm:px-4 sticky top-[56px] z-30 transition-all">
        <div className="max-w-[1200px] mx-auto flex items-center justify-between gap-2 sm:gap-4">
          <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar py-0.5 min-w-0">
            <button
              onClick={onBackToFleet}
              className="text-[12px] text-[#8a8f98] hover:text-white flex items-center gap-1 cursor-pointer shrink-0 mr-1 sm:mr-2 px-2.5 py-1 rounded-[6px] bg-[#161718] border border-[#23252a] hover:border-[#383b3f] transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span className="hidden xs:inline font-mono">Fleet</span>
            </button>

            <span className="text-[11px] font-mono uppercase tracking-wider text-[#8a8f98] hidden lg:inline mr-1 shrink-0">
              Models:
            </span>
            <div className="flex items-center bg-[#0f1011] border border-[#23252a] p-0.5 rounded-[6px] shrink-0">
              {allVehicles.map((v) => {
                const isCurrent = v.id === vehicle.id;
                return (
                  <button
                    key={v.id}
                    onClick={() => {
                      onSelectVehicle(v);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className={`px-3 py-1 rounded-[4px] text-[12px] font-mono transition-colors shrink-0 cursor-pointer ${
                      isCurrent
                        ? 'bg-[#ffffff] text-[#08090a] font-[510]'
                        : 'text-[#8a8f98] hover:text-[#d0d6e0]'
                    }`}
                  >
                    {v.name.split(' ')[1]} {v.name.split(' ')[2] || ''}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <span className="text-[13px] font-mono font-[510] text-white hidden md:inline">
              KES {vehicle.priceKes.toLocaleString()}
            </span>
            <a
              href={`https://wa.me/254714333888?text=Hello%20Alberka%20Motors,%20I%20am%20inquiring%20about%20the%20${encodeURIComponent(vehicle.name)}%20(${vehicle.stockNo}).`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary !py-1 !px-3 text-[12px] !rounded-[6px] whitespace-nowrap font-[510]"
            >
              Inquire
            </a>
          </div>
        </div>
      </div>

      {/* 2. MONUMENTAL HERO: ESSENCE, COLOR & METRICS */}
      <section className="w-full pt-12 pb-16 px-4 sm:px-6 text-center max-w-[1200px] mx-auto">
        <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-[4px] bg-[#0f1011] border border-[#23252a] text-[11px] font-mono text-[#8a8f98] uppercase tracking-wider mb-3">
          <span className="w-1.5 h-1.5 rounded-full bg-[#e4f222]" />
          <span>{vehicle.status} · Stock #{vehicle.stockNo}</span>
        </div>

        <p className="text-[12px] font-mono uppercase tracking-[0.2em] text-[#8a8f98] mb-2">
          {vehicle.moniker}
        </p>

        <h1 className="hero-display text-[32px] sm:text-[48px] md:text-[58px] mb-4 text-white max-w-[900px] mx-auto">
          {vehicle.name}
        </h1>

        <blockquote className="max-w-[720px] mx-auto text-[#8a8f98] text-[15px] sm:text-[17px] leading-[1.6] italic mb-8 font-normal">
          "{vehicle.essenceQuote}"
        </blockquote>

        {/* Master Visual Canvas (Linear 12px radius, #0f1011, 1px border) */}
        <div className="relative w-full max-w-[980px] mx-auto mb-6">
          <div className="w-full h-[360px] sm:h-[480px] lg:h-[520px] rounded-[12px] overflow-hidden bg-[#0f1011] border border-[#23252a] relative">
            <SkeletonImage
              key={activeColor.name}
              src={activeColor.imageUrl}
              alt={`${vehicle.name} in ${activeColor.name}`}
              className="transition-transform duration-500 hover:scale-102"
              containerClassName="w-full h-full"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-[#08090a]/90 via-transparent to-transparent flex items-end p-5 sm:p-7">
              <div className="text-left text-white space-y-1">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#8a8f98] block">
                  Commission Specification
                </span>
                <p className="text-[17px] sm:text-[20px] font-[510] text-white tracking-[-0.012em]">
                  {activeColor.name} · Grade {vehicle.auctionGrade} Provenance
                </p>
              </div>
            </div>
          </div>

          {/* Color Switcher Capsule (Linear 12px radius) */}
          <div className="p-3 max-w-[420px] mx-auto -mt-6 relative z-20 flex items-center justify-between bg-[#0f1011] border border-[#23252a] rounded-[12px] shadow-xl">
            <div className="text-left pl-2">
              <span className="text-[10px] text-[#8a8f98] font-mono uppercase block">Factory Finish</span>
              <span className="text-[13px] font-[510] text-white truncate max-w-[180px] block">
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
                    className={`w-6 h-6 rounded-full transition-transform cursor-pointer relative flex items-center justify-center ${
                      isSelected ? 'ring-2 ring-[#e4f222] ring-offset-2 ring-offset-[#08090a] scale-110' : 'opacity-70 hover:opacity-100'
                    }`}
                    style={{ backgroundColor: c.hex }}
                    title={c.name}
                  >
                    {isSelected && (
                      <span className="w-1.5 h-1.5 rounded-full bg-black shadow-xs" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* 4-Column Metric Summary Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-[880px] mx-auto pt-6 text-left">
          <div className="border-l border-[#23252a] pl-3.5">
            <span className="text-[10px] text-[#8a8f98] font-mono uppercase block">Year & Mileage</span>
            <span className="text-[15px] font-[510] text-white">{vehicle.year} · {vehicle.mileageKm.toLocaleString()} km</span>
          </div>
          <div className="border-l border-[#23252a] pl-3.5">
            <span className="text-[10px] text-[#8a8f98] font-mono uppercase block">Auction Score</span>
            <span className="text-[15px] font-[510] text-white">{vehicle.auctionGrade} / {vehicle.interiorGrade}</span>
          </div>
          <div className="border-l border-[#23252a] pl-3.5">
            <span className="text-[10px] text-[#8a8f98] font-mono uppercase block">Drivetrain</span>
            <span className="text-[15px] font-[510] text-white">{vehicle.drivetrain.split('(')[0]}</span>
          </div>
          <div className="border-l border-[#23252a] pl-3.5">
            <span className="text-[10px] text-[#8a8f98] font-mono uppercase block">Delivered Price</span>
            <span className="text-[15px] font-[510] text-white">KES {vehicle.priceKes.toLocaleString()}</span>
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

      {/* 4. TECHNICAL SPECIFICATIONS & PROVENANCE */}
      <section className="w-full bg-[#08090a] py-20 px-4 sm:px-6">
        <div className="max-w-[1200px] mx-auto space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[4px] bg-[#0f1011] border border-[#23252a] text-[11px] font-mono uppercase tracking-wider text-[#8a8f98] mb-2">
                <FileText className="w-3.5 h-3.5 text-[#e4f222]" />
                <span>Engineering Archive & Provenance</span>
              </span>
              <h2 className="text-[26px] sm:text-[32px] font-[510] text-white tracking-[-0.022em]">
                Technical Specifications & Provenance.
              </h2>
            </div>

            <button
              onClick={() => setShowAuctionModal(true)}
              className="btn-ghost !text-[12px] !py-1.5 !px-3 cursor-pointer"
            >
              <FileText className="w-3.5 h-3.5 text-[#8a8f98]" />
              <span>Inspect {vehicle.auctionHall} Auction Sheet</span>
            </button>
          </div>

          <div className="p-5 sm:p-7 bg-[#0f1011] rounded-[12px] border border-[#23252a] divide-y divide-[#23252a]">
            {vehicle.specifications.map((group, idx) => (
              <div key={idx} className="py-5 first:pt-0 last:pb-0 grid grid-cols-1 md:grid-cols-3 gap-3">
                <span className="text-[14px] font-[510] text-white">{group.category}</span>
                <div className="md:col-span-2 space-y-1.5 text-[13px]">
                  {group.items.map((item, itemIdx) => (
                    <div key={itemIdx} className="flex justify-between py-1 border-b border-[#161718] last:border-0">
                      <span className="text-[#8a8f98]">{item.label}</span>
                      <span className="text-[#d0d6e0] font-mono">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. ASSET FINANCING & WORKSHOP OVERHAUL STAMP */}
      <section className="w-full bg-[#08090a] py-20 px-4 sm:px-6 border-t border-[#23252a]">
        <div className="max-w-[1200px] mx-auto space-y-8">
          <div className="p-5 sm:p-8 bg-[#0f1011] rounded-[12px] border border-[#23252a]">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-[#23252a]">
              <div>
                <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-[4px] bg-[#161718] border border-[#23252a] text-[10px] font-mono uppercase tracking-wider text-[#8a8f98] mb-1.5">
                  <span>Financial Acquisition</span>
                </span>
                <h3 className="text-[20px] sm:text-[22px] font-[510] text-white">Asset Finance Calculator</h3>
                <p className="text-[13px] text-[#8a8f98] mt-0.5">Official pre-approved financing via NCBA Bank, Stanbic Bank, and I&M Bank Kenya.</p>
              </div>
              <div className="text-left sm:text-right">
                <span className="text-[10px] font-mono text-[#8a8f98] uppercase block">Monthly Installment</span>
                <span className="text-[24px] sm:text-[26px] font-[510] text-[#e4f222]">
                  KES {animatedMonthlyPayment.toLocaleString()}<span className="text-[13px] font-normal text-[#8a8f98]">/mo</span>
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-5">
              <div>
                <div className="flex justify-between text-[12px] mb-2 font-mono">
                  <span className="text-[#d0d6e0]">Deposit Equity ({depositPercent}%)</span>
                  <span className="text-white font-[510]">KES {animatedDepositAmount.toLocaleString()}</span>
                </div>
                <input
                  type="range"
                  min="15"
                  max="60"
                  step="5"
                  value={depositPercent}
                  onChange={(e) => setDepositPercent(Number(e.target.value))}
                  className="w-full accent-[#e4f222] cursor-pointer"
                />
                <div className="flex justify-between text-[10px] font-mono text-[#8a8f98] mt-1">
                  <span>15%</span>
                  <span>35%</span>
                  <span>60%</span>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[12px] mb-2 font-mono">
                  <span className="text-[#d0d6e0]">Tenure ({loanTenureMonths} Months / {loanTenureMonths / 12} Yrs)</span>
                  <span className="text-white font-[510]">{loanTenureMonths} Months</span>
                </div>
                <input
                  type="range"
                  min="12"
                  max="60"
                  step="12"
                  value={loanTenureMonths}
                  onChange={(e) => setLoanTenureMonths(Number(e.target.value))}
                  className="w-full accent-[#e4f222] cursor-pointer"
                />
                <div className="flex justify-between text-[10px] font-mono text-[#8a8f98] mt-1">
                  <span>1 Year</span>
                  <span>3 Years</span>
                  <span>5 Years</span>
                </div>
              </div>
            </div>
          </div>

          {/* Mombasa Pre-Delivery Protocol Stamp */}
          <div className="p-5 sm:p-6 bg-[#0f1011] rounded-[12px] border border-[#23252a]">
            <div className="flex items-center gap-3 mb-4 pb-3 border-b border-[#23252a]">
              <ShieldCheck className="w-5 h-5 text-[#e4f222]" />
              <div>
                <h4 className="text-[16px] font-[510] text-white">Mombasa 48-Hour Pre-Delivery Overhaul Stamp</h4>
                <p className="text-[11px] font-mono text-[#8a8f98]">Certified on Tangana Road for Stock #{vehicle.stockNo}</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {vehicle.workshopProtocol.map((item, i) => (
                <div key={i} className="flex items-start gap-2 text-[13px] text-[#d0d6e0]">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#e4f222] shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Conversion Action Bar */}
          <div className="p-6 bg-[#0f1011] rounded-[12px] border border-[#23252a] flex flex-col sm:flex-row items-center justify-between gap-5 text-center sm:text-left">
            <div>
              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-[4px] bg-[#161718] border border-[#23252a] text-[10px] font-mono uppercase tracking-wider text-[#8a8f98] mb-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#e4f222]" />
                <span>Immediate Availability</span>
              </span>
              <h3 className="text-[20px] font-[510] text-white tracking-[-0.012em]">
                Reserve {vehicle.name}
              </h3>
              <p className="text-[13px] text-[#8a8f98] mt-0.5">
                Deliverable to your residence in Nairobi or Mombasa within 48 hours.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-2.5 w-full sm:w-auto">
              <button
                onClick={() => onScheduleTestDrive(vehicle)}
                className="btn-ghost !text-[13px] !py-2 !px-4 cursor-pointer w-full sm:w-auto"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>VIP Test Drive</span>
              </button>

              <a
                href={`https://wa.me/254714333888?text=Hello%20Alberka%20Motors,%20I%20would%20like%20to%20reserve%20the%20${encodeURIComponent(vehicle.name)}%20(${vehicle.stockNo})%20priced%20at%20KES%20${vehicle.priceKes.toLocaleString()}.`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary !text-[13px] !py-2 !px-5 w-full sm:w-auto justify-center font-[510]"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>WhatsApp Concierge</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 6. AUCTION SHEET MODAL */}
      {showAuctionModal && (
        <div className="fixed inset-0 z-60 bg-[#08090a]/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#0f1011] rounded-[12px] max-w-[640px] w-full p-6 sm:p-7 relative border border-[#23252a] shadow-2xl">
            <button
              onClick={() => setShowAuctionModal(false)}
              className="absolute top-4 right-4 p-1.5 rounded-[4px] hover:bg-white/5 cursor-pointer text-[#8a8f98] hover:text-white"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>

            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-[4px] bg-[#161718] border border-[#23252a] text-[10px] font-mono uppercase tracking-wider text-[#8a8f98] mb-1.5">
              <span>Authentic Japanese Export Document</span>
            </span>
            <h3 className="text-[20px] font-[510] text-white mb-1">
              {vehicle.auctionHall} Auction Sheet
            </h3>
            <p className="text-[12px] font-mono text-[#8a8f98] mb-5">
              Odometer: {vehicle.mileageKm.toLocaleString()} KM · Overall: {vehicle.auctionGrade} · Interior: {vehicle.interiorGrade}
            </p>

            <div className="bg-[#161718] rounded-[8px] p-5 text-[12px] font-mono space-y-2 border border-[#23252a]">
              <div className="flex justify-between border-b border-[#23252a] pb-1.5">
                <span className="text-[#8a8f98]">Auction Hall:</span>
                <span className="text-white font-[510]">{vehicle.auctionHall} (Japan)</span>
              </div>
              <div className="flex justify-between border-b border-[#23252a] pb-1.5">
                <span className="text-[#8a8f98]">Stock ID:</span>
                <span className="text-white font-[510]">{vehicle.stockNo}</span>
              </div>
              <div className="flex justify-between border-b border-[#23252a] pb-1.5">
                <span className="text-[#8a8f98]">Overall Inspection:</span>
                <span className="text-white font-[510]">{vehicle.auctionGrade}</span>
              </div>
              <div className="flex justify-between border-b border-[#23252a] pb-1.5">
                <span className="text-[#8a8f98]">Interior / Exterior:</span>
                <span className="text-white font-[510]">{vehicle.interiorGrade}</span>
              </div>
              <div className="flex justify-between border-b border-[#23252a] pb-1.5">
                <span className="text-[#8a8f98]">Accident / Frame Damage:</span>
                <span className="text-[#27a644] font-[510]">ZERO (Clean Original Pillars)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#8a8f98]">QISJ Pre-Shipment:</span>
                <span className="text-[#27a644] font-[510]">PASSED & AUTHENTICATED</span>
              </div>
            </div>

            <div className="mt-5 flex justify-end">
              <a
                href={`https://wa.me/254714333888?text=Hello%20Alberka%20Motors,%20please%20send%20the%20original%20scanned%20Japanese%20auction%20sheet%20PDF%20for%20${encodeURIComponent(vehicle.name)}%20(${vehicle.stockNo}).`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary !text-[12px] !py-2 !px-4 font-[510]"
              >
                Request Scanned Original PDF
              </a>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
