import React, { useState, useRef, useEffect } from 'react';
import {
  ArrowLeft,
  Heart,
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
  Layers,
  Compass,
  ArrowRight
} from 'lucide-react';
import { Vehicle } from '../data/vehicles';
import { useAnimatedNumber } from '../hooks/useAnimations';

interface VehicleStoryViewProps {
  vehicle: Vehicle;
  allVehicles: Vehicle[];
  onSelectVehicle: (v: Vehicle) => void;
  onBackToFleet: () => void;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  onScheduleTestDrive: (v: Vehicle) => void;
}

export const VehicleStoryView: React.FC<VehicleStoryViewProps> = ({
  vehicle,
  allVehicles,
  onSelectVehicle,
  onBackToFleet,
  isFavorite,
  onToggleFavorite,
  onScheduleTestDrive,
}) => {
  // Active Chapter Tab (The Essence, Exterior Poise, The Sanctuary, Motive Force, Technical Specs)
  const [activeChapterIndex, setActiveChapterIndex] = useState(0);

  // Apple Color Finishes Switcher State
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);

  // Apple Closer Look Slider State
  const [activeCloserLookIndex, setActiveCloserLookIndex] = useState(0);
  const [isPlayingSlides, setIsPlayingSlides] = useState(true);

  // Japanese Auction Sheet Submodal
  const [showAuctionModal, setShowAuctionModal] = useState(false);

  // Asset Finance Calculator State
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

  // Animated Numbers for Slider Tweens
  const animatedMonthlyPayment = useAnimatedNumber(monthlyPayment, 350);
  const animatedDepositAmount = useAnimatedNumber(depositAmount, 350);

  // Auto-advance Apple closer look slides if playing
  useEffect(() => {
    if (!isPlayingSlides || vehicle.closerLookPoints.length <= 1) return;
    const timer = setInterval(() => {
      setActiveCloserLookIndex((prev) => (prev + 1) % vehicle.closerLookPoints.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [isPlayingSlides, vehicle.closerLookPoints.length]);

  const activeColor = vehicle.colors[selectedColorIndex] || vehicle.colors[0];
  const activeCloserLook = vehicle.closerLookPoints[activeCloserLookIndex] || vehicle.closerLookPoints[0];

  return (
    <div className="w-full bg-[#121215] text-white pb-24">
      
      {/* 1. APPLE IPHONE DUO STYLE VEHICLE SWITCHER TABS */}
      <div className="w-full bg-[#121215] border-b border-[#27272a] py-3 px-4 sticky top-[96px] z-30">
        <div className="max-w-[1240px] mx-auto flex items-center justify-between gap-4 overflow-x-auto no-scrollbar">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400 hidden sm:inline mr-1">
              Showroom Models:
            </span>
            <div className="flex items-center bg-[#27272a] p-1 rounded-full">
              {allVehicles.map((v) => {
                const isCurrent = v.id === vehicle.id;
                return (
                  <button
                    key={v.id}
                    onClick={() => {
                      onSelectVehicle(v);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className={`px-3 sm:px-4 py-1.5 rounded-full text-[12px] font-medium transition-all shrink-0 cursor-pointer ${
                      isCurrent
                        ? 'bg-[#121215] text-white shadow-xs font-semibold'
                        : 'text-white/70 hover:text-white'
                    }`}
                  >
                    {v.name.split(' ')[1]} {v.name.split(' ')[2] || ''}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <span className="text-[13px] font-semibold text-white hidden md:inline">
              KES {vehicle.priceKes.toLocaleString()}
            </span>
            <a
              href={`https://wa.me/254714333888?text=Hello%20Cars%20R%20Us,%20I%20am%20inquiring%20about%20the%20${encodeURIComponent(vehicle.name)}%20(${vehicle.stockNo}).`}
              target="_blank"
              rel="noopener noreferrer"
              className="pricing-blue-pill"
            >
              Inquire
            </a>
          </div>
        </div>
      </div>

      {/* 2. ROLLS-ROYCE MONUMENTAL OPENING & ESSENCE DECLARATION */}
      <section className="w-full pt-16 pb-16 px-6 text-center max-w-[1240px] mx-auto">
        
        {/* Bare Launch Orange status */}
        <span className="launch-status-label mb-2">
          {vehicle.status} · Stock #{vehicle.stockNo}
        </span>

        {/* Rolls-Royce Moniker Persona */}
        <p className="text-[13px] sm:text-[14px] font-semibold uppercase tracking-[0.25em] text-zinc-400 mb-3">
          {vehicle.moniker}
        </p>

        {/* Apple 80px / 600 Hero Headline */}
        <h1 className="hero-display mb-6">
          {vehicle.name}
        </h1>

        {/* Rolls-Royce Contemplative Quote */}
        <blockquote className="max-w-[720px] mx-auto text-zinc-400 text-[18px] sm:text-[21px] leading-relaxed italic mb-10 font-normal">
          "{vehicle.essenceQuote}"
        </blockquote>

        {/* Main Visual Event: Active Color Canvas with Edge-Free Render */}
        <div className="relative w-full max-w-[960px] mx-auto mb-6">
          <div className="w-full h-[400px] sm:h-[540px] rounded-[28px] overflow-hidden bg-[#121215] relative">
            <img
              key={activeColor.name}
              src={activeColor.imageUrl}
              alt={`${vehicle.name} in ${activeColor.name}`}
              className="w-full h-full object-cover animate-apple-fade transition-transform duration-700 hover:scale-102"
            />

            {/* Gradient Scrim */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent flex items-end p-8">
              <div className="text-left text-white">
                <span className="text-[11px] font-semibold uppercase tracking-widest text-white/80 block mb-1">
                  Commission Specification
                </span>
                <p className="text-[20px] font-semibold text-white drop-shadow-sm">
                  {activeColor.name} · Grade {vehicle.auctionGrade} Provenance
                </p>
              </div>
            </div>
          </div>

          {/* 3. APPLE STYLE INTERACTIVE COLOR FINISHES SWITCHER */}
          <div className="floating-capsule p-4 max-w-[440px] mx-auto -mt-8 relative z-20 flex items-center justify-between bg-[#121215] shadow-xs">
            <div className="text-left pl-2">
              <span className="text-[10px] text-zinc-400 uppercase font-semibold block">Factory Finish</span>
              <span className="text-[13px] font-semibold text-white truncate max-w-[200px] block">
                {activeColor.name}
              </span>
            </div>

            {/* Circular Color Swatches */}
            <div className="flex items-center gap-2.5 pr-2">
              {vehicle.colors.map((c, idx) => {
                const isSelected = selectedColorIndex === idx;
                return (
                  <button
                    key={idx}
                    onClick={() => setSelectedColorIndex(idx)}
                    className={`w-7 h-7 rounded-full transition-all cursor-pointer relative flex items-center justify-center ${
                      isSelected ? 'ring-2 ring-[#dc2626] ring-offset-2 scale-110' : 'opacity-85 hover:opacity-100'
                    }`}
                    style={{ backgroundColor: c.hex }}
                    title={c.name}
                  >
                    {isSelected && (
                      <span className="w-1.5 h-1.5 rounded-full bg-[#121215] shadow-xs"></span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* 4-Column Metric Summary Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-[840px] mx-auto pt-6 text-left">
          <div className="border-l-2 border-[#27272a] pl-4">
            <span className="text-[11px] text-zinc-400 uppercase block font-medium">Year & Mileage</span>
            <span className="text-[16px] font-semibold text-white">{vehicle.year} · {vehicle.mileageKm.toLocaleString()} km</span>
          </div>
          <div className="border-l-2 border-[#27272a] pl-4">
            <span className="text-[11px] text-zinc-400 uppercase block font-medium">Auction Condition</span>
            <span className="text-[16px] font-semibold text-[#dc2626]">{vehicle.auctionGrade} / {vehicle.interiorGrade}</span>
          </div>
          <div className="border-l-2 border-[#27272a] pl-4">
            <span className="text-[11px] text-zinc-400 uppercase block font-medium">Drivetrain</span>
            <span className="text-[16px] font-semibold text-white">{vehicle.drivetrain.split('(')[0]}</span>
          </div>
          <div className="border-l-2 border-[#27272a] pl-4">
            <span className="text-[11px] text-zinc-400 uppercase block font-medium">Delivered Price</span>
            <span className="text-[17px] font-semibold text-white">KES {vehicle.priceKes.toLocaleString()}</span>
          </div>
        </div>
      </section>


      {/* 4. APPLE IPHONE STYLE "TAKE A CLOSER LOOK" INTERACTIVE SLIDER */}
      <section className="w-full bg-[#121215] py-20 px-6">
        <div className="max-w-[1240px] mx-auto space-y-10">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="launch-status-label mb-1">Interactive Inspection</span>
              <h2 className="feature-heading">Take a closer look.</h2>
            </div>
            <p className="text-[14px] text-zinc-400 max-w-[380px]">
              Examine the bespoke engineering decisions that define this vehicle’s character and mechanical longevity.
            </p>
          </div>

          {/* Focal Point Slider Display */}
          <div className="apple-card p-6 sm:p-10 bg-[#121215] space-y-8">
            
            {/* Focal Point Tab Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
              {vehicle.closerLookPoints.map((pt, idx) => {
                const isActive = activeCloserLookIndex === idx;
                return (
                  <button
                    key={pt.id}
                    onClick={() => setActiveCloserLookIndex(idx)}
                    className={`px-4 py-2 rounded-full text-[13px] font-medium transition-all shrink-0 cursor-pointer ${
                      isActive
                        ? 'bg-[#1d1d1f] text-white shadow-xs'
                        : 'bg-[#121215] text-white hover:bg-[#27272a]'
                    }`}
                  >
                    {pt.title}
                  </button>
                );
              })}
            </div>

            {/* Slider Content Frame */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              <div className="lg:col-span-7 h-[340px] sm:h-[420px] rounded-[20px] overflow-hidden bg-[#121215] relative">
                <img
                  key={activeCloserLook.id}
                  src={activeCloserLook.imageUrl}
                  alt={activeCloserLook.title}
                  className="w-full h-full object-cover animate-apple-scale"
                />
                <div className="absolute top-4 left-4 bg-[#121215]/90 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-semibold text-white">
                  {activeCloserLook.subtitle}
                </div>
              </div>

              <div className="lg:col-span-5 space-y-6 text-left">
                <div>
                  <span className="text-[12px] font-semibold text-[#dc2626] uppercase tracking-wider block mb-1">
                    Focal Engineering
                  </span>
                  <h3 className="text-[26px] font-semibold text-white leading-snug">
                    {activeCloserLook.title}
                  </h3>
                  <p className="text-[15px] text-zinc-400 leading-relaxed mt-3">
                    {activeCloserLook.description}
                  </p>
                </div>

                <div className="pt-6 border-t border-[#27272a] flex items-center justify-between">
                  <div>
                    <span className="text-[11px] text-zinc-400 uppercase block font-medium">Key Indicator</span>
                    <span className="text-[14px] font-semibold text-white">{activeCloserLook.metricLabel}</span>
                  </div>
                  <span className="text-[28px] font-semibold text-[#dc2626]">
                    {activeCloserLook.metric}
                  </span>
                </div>
              </div>

            </div>

            {/* Carousel Navigation Pill Controls */}
            <div className="flex items-center justify-between pt-4 border-t border-[#121215]">
              <div className="flex items-center gap-2">
                {vehicle.closerLookPoints.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveCloserLookIndex(i)}
                    className={`h-1.5 rounded-full transition-all cursor-pointer ${
                      activeCloserLookIndex === i ? 'w-8 bg-[#dc2626]' : 'w-2 bg-[#27272a]'
                    }`}
                  />
                ))}
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() =>
                    setActiveCloserLookIndex((prev) =>
                      prev === 0 ? vehicle.closerLookPoints.length - 1 : prev - 1
                    )
                  }
                  className="w-8 h-8 rounded-full bg-[#121215] hover:bg-[#27272a] flex items-center justify-center text-white cursor-pointer"
                  title="Previous slide"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setIsPlayingSlides(!isPlayingSlides)}
                  className="w-8 h-8 rounded-full bg-[#121215] hover:bg-[#27272a] flex items-center justify-center text-white cursor-pointer"
                  title={isPlayingSlides ? 'Pause slides' : 'Play slides'}
                >
                  {isPlayingSlides ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 ml-0.5" />}
                </button>
                <button
                  onClick={() =>
                    setActiveCloserLookIndex((prev) => (prev + 1) % vehicle.closerLookPoints.length)
                  }
                  className="w-8 h-8 rounded-full bg-[#121215] hover:bg-[#27272a] flex items-center justify-center text-white cursor-pointer"
                  title="Next slide"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>

        </div>
      </section>


      {/* 5. ROLLS-ROYCE STORYTELLING CHAPTERS (Essence, Exterior, Sanctuary, Motive Force) */}
      <section className="w-full bg-[#121215] py-20 px-6">
        <div className="max-w-[1240px] mx-auto space-y-12">
          
          {/* Chapter Selector Tabs */}
          <div className="border-b border-[#27272a] flex items-center gap-8 overflow-x-auto no-scrollbar">
            {vehicle.chapters.map((chap, idx) => {
              const isActive = activeChapterIndex === idx;
              return (
                <button
                  key={chap.id}
                  onClick={() => setActiveChapterIndex(idx)}
                  className={`pb-4 text-[16px] font-medium transition-colors shrink-0 cursor-pointer relative ${
                    isActive ? 'text-white font-semibold' : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  <span>{chap.tabLabel}</span>
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#dc2626]" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Active Chapter Presentation */}
          {(() => {
            const chap = vehicle.chapters[activeChapterIndex] || vehicle.chapters[0];
            return (
              <div className="space-y-10 animate-in fade-in duration-300">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                  
                  <div className="lg:col-span-5 space-y-5 text-left">
                    <span className="launch-status-label">{chap.eyebrow}</span>
                    <h3 className="feature-heading">{chap.title}</h3>
                    <div className="space-y-4 text-[16px] text-zinc-400 leading-relaxed">
                      {chap.narrative.map((para, pIdx) => (
                        <p key={pIdx}>{para}</p>
                      ))}
                    </div>

                    <div className="pt-4 grid grid-cols-2 gap-4 border-t border-[#27272a]">
                      {chap.highlights.map((h, hIdx) => (
                        <div key={hIdx}>
                          <span className="text-[11px] text-zinc-400 uppercase block font-medium">{h.label}</span>
                          <span className="text-[14px] font-semibold text-white">{h.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="lg:col-span-7 h-[380px] sm:h-[460px] rounded-[24px] overflow-hidden bg-[#121215]">
                    {chap.videoUrl ? (
                      <video autoPlay muted loop playsInline className="w-full h-full object-cover">
                        <source src={chap.videoUrl} type="video/mp4" />
                        <img src={chap.imageUrl} alt={chap.title} className="w-full h-full object-cover" />
                      </video>
                    ) : (
                      <img src={chap.imageUrl} alt={chap.title} className="w-full h-full object-cover" />
                    )}
                  </div>

                </div>
              </div>
            );
          })()}

        </div>
      </section>


      {/* 6. TECHNICAL SPECIFICATIONS & AUCTION SHEET MODAL */}
      <section className="w-full bg-[#121215] py-20 px-6">
        <div className="max-w-[1240px] mx-auto space-y-10">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="launch-status-label mb-1">Engineering Archive</span>
              <h2 className="feature-heading">Technical Specifications.</h2>
            </div>

            <button
              onClick={() => setShowAuctionModal(true)}
              className="outlined-explore-pill cursor-pointer"
            >
              <FileText className="w-3.5 h-3.5 text-[#dc2626]" />
              <span>Inspect {vehicle.auctionHall} Auction Sheet</span>
            </button>
          </div>

          <div className="apple-card p-8 bg-[#121215] border border-[#27272a] divide-y divide-[#27272a]">
            {vehicle.specifications.map((group, idx) => (
              <div key={idx} className="py-6 first:pt-0 last:pb-0 grid grid-cols-1 md:grid-cols-3 gap-4">
                <span className="text-[15px] font-semibold text-white">{group.category}</span>
                <div className="md:col-span-2 space-y-2 text-[14px]">
                  {group.items.map((item, itemIdx) => (
                    <div key={itemIdx} className="flex justify-between py-1 border-b border-[#121215] last:border-0">
                      <span className="text-zinc-400">{item.label}</span>
                      <span className="text-white font-medium">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>


      {/* 7. ASSET FINANCING STUDIO & COMMISSION HANDOVER DESK */}
      <section className="w-full bg-[#121215] py-20 px-6">
        <div className="max-w-[1240px] mx-auto space-y-10">
          
          <div className="apple-card p-8 md:p-12 bg-[#121215] border border-[#27272a]">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#27272a]">
              <div>
                <span className="launch-status-label mb-1">Financial Acquisition</span>
                <h3 className="text-[24px] font-semibold text-white">Asset Finance Repayment Calculator</h3>
                <p className="text-[13px] text-zinc-400">Official pre-approved financing via NCBA Bank, Stanbic, and I&M Bank Kenya.</p>
              </div>
              <div className="text-left sm:text-right">
                <span className="text-[11px] text-zinc-400 uppercase block font-medium">Estimated Monthly Installment</span>
                <span className="text-[28px] font-semibold text-[#dc2626] transition-all">
                  KES {animatedMonthlyPayment.toLocaleString()}<span className="text-[14px] font-normal text-zinc-400">/mo</span>
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6">
              <div>
                <div className="flex justify-between text-[13px] mb-2">
                  <span className="font-medium text-white">Deposit Equity ({depositPercent}%)</span>
                  <span className="font-semibold text-[#dc2626] transition-all">KES {animatedDepositAmount.toLocaleString()}</span>
                </div>
                <input
                  type="range"
                  min="15"
                  max="60"
                  step="5"
                  value={depositPercent}
                  onChange={(e) => setDepositPercent(Number(e.target.value))}
                  className="w-full accent-[#dc2626] cursor-pointer"
                />
                <div className="flex justify-between text-[11px] text-zinc-400 mt-1">
                  <span>15%</span>
                  <span>35%</span>
                  <span>60%</span>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[13px] mb-2">
                  <span className="font-medium text-white">Loan Duration ({loanTenureMonths} Months / {loanTenureMonths / 12} Years)</span>
                  <span className="font-semibold text-[#dc2626]">{loanTenureMonths} Months</span>
                </div>
                <input
                  type="range"
                  min="12"
                  max="60"
                  step="12"
                  value={loanTenureMonths}
                  onChange={(e) => setLoanTenureMonths(Number(e.target.value))}
                  className="w-full accent-[#dc2626] cursor-pointer"
                />
                <div className="flex justify-between text-[11px] text-zinc-400 mt-1">
                  <span>1 Year</span>
                  <span>3 Years</span>
                  <span>5 Years</span>
                </div>
              </div>
            </div>
          </div>

          {/* Mombasa Pre-Delivery Protocol Stamp */}
          <div className="apple-card p-8 bg-[#0d0d10] border border-[#27272a]">
            <div className="flex items-center gap-3 mb-4 pb-4 border-b border-[#27272a]">
              <ShieldCheck className="w-6 h-6 text-[#dc2626]" />
              <div>
                <h4 className="text-[18px] font-semibold text-white">Mombasa 48-Hour Pre-Delivery Overhaul Stamp</h4>
                <p className="text-[12px] text-zinc-400">Certified on Tangana Road for Stock #{vehicle.stockNo}</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {vehicle.workshopProtocol.map((item, i) => (
                <div key={i} className="flex items-start gap-2.5 text-[13px] text-white">
                  <CheckCircle2 className="w-4 h-4 text-[#dc2626] shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Conversion Action Bar */}
          <div className="p-8 bg-[#121215] rounded-[24px] flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
            <div>
              <span className="launch-status-label mb-1">Immediate Availability</span>
              <h3 className="text-[22px] font-semibold text-white">
                Reserve {vehicle.name}
              </h3>
              <p className="text-[13px] text-zinc-400">
                Deliverable to your residence in Nairobi or Mombasa within 48 hours.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
              <button
                onClick={() => onScheduleTestDrive(vehicle)}
                className="outlined-explore-pill py-2.5 px-6 text-[13px] cursor-pointer w-full sm:w-auto"
              >
                <Calendar className="w-4 h-4" />
                <span>Book VIP Test Drive</span>
              </button>

              <a
                href={`https://wa.me/254714333888?text=Hello%20Cars%20R%20Us,%20I%20would%20like%20to%20reserve%20the%20${encodeURIComponent(vehicle.name)}%20(${vehicle.stockNo})%20priced%20at%20KES%20${vehicle.priceKes.toLocaleString()}.`}
                target="_blank"
                rel="noopener noreferrer"
                className="pricing-blue-pill-lg w-full sm:w-auto justify-center"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp Sales Concierge</span>
              </a>
            </div>
          </div>

        </div>
      </section>


      {/* 8. JAPANESE AUCTION SHEET MODAL */}
      {showAuctionModal && (
        <div className="fixed inset-0 z-60 bg-black/70 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#121215] rounded-[24px] max-w-[680px] w-full p-6 relative">
            <button
              onClick={() => setShowAuctionModal(false)}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-[#121215] cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>

            <span className="launch-status-label mb-1">Authentic Japanese Export Document</span>
            <h3 className="text-[22px] font-semibold text-white mb-1">
              {vehicle.auctionHall} Auction Sheet
            </h3>
            <p className="text-[13px] text-zinc-400 mb-6">
              Verified Odometer: {vehicle.mileageKm.toLocaleString()} KM · Overall Grade: {vehicle.auctionGrade} · Interior: {vehicle.interiorGrade}
            </p>

            <div className="bg-[#121215] rounded-[16px] p-6 text-[13px] font-mono space-y-2 border border-[#27272a]">
              <div className="flex justify-between border-b border-[#27272a] pb-1.5">
                <span className="text-zinc-400">Auction Hall:</span>
                <span className="font-semibold">{vehicle.auctionHall} (Japan)</span>
              </div>
              <div className="flex justify-between border-b border-[#27272a] pb-1.5">
                <span className="text-zinc-400">Stock Identification:</span>
                <span className="font-semibold">{vehicle.stockNo}</span>
              </div>
              <div className="flex justify-between border-b border-[#27272a] pb-1.5">
                <span className="text-zinc-400">Overall Inspection Score:</span>
                <span className="font-semibold text-[#dc2626]">{vehicle.auctionGrade}</span>
              </div>
              <div className="flex justify-between border-b border-[#27272a] pb-1.5">
                <span className="text-zinc-400">Interior / Exterior Score:</span>
                <span className="font-semibold">{vehicle.interiorGrade}</span>
              </div>
              <div className="flex justify-between border-b border-[#27272a] pb-1.5">
                <span className="text-zinc-400">Accident / Frame Damage:</span>
                <span className="font-semibold text-emerald-600">ZERO (Clean Original Pillars)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">QISJ Pre-Shipment Inspection:</span>
                <span className="font-semibold text-emerald-600">PASSED & AUTHENTICATED</span>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <a
                href={`https://wa.me/254714333888?text=Hello%20Cars%20R%20Us,%20please%20send%20the%20original%20scanned%20Japanese%20auction%20sheet%20PDF%20for%20${encodeURIComponent(vehicle.name)}%20(${vehicle.stockNo}).`}
                target="_blank"
                rel="noopener noreferrer"
                className="pricing-blue-pill"
              >
                Request Scanned Original PDF on WhatsApp
              </a>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
