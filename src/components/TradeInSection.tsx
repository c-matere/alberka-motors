import React, { useState, useRef } from 'react';
import {
  Calculator,
  ArrowRight,
  CheckCircle2,
  Shield,
  FileText,
  MessageCircle,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Sparkles,
  ArrowUpRight,
  ChevronDown,
  Info
} from 'lucide-react';
import { Vehicle } from '../data/vehicles';
import { useAnimatedNumber } from '../hooks/useAnimations';

interface TradeInSectionProps {
  vehicles: Vehicle[];
  onSelectVehicle?: (vehicle: Vehicle) => void;
}

export const TradeInSection: React.FC<TradeInSectionProps> = ({ vehicles, onSelectVehicle }) => {
  const [makeModel, setMakeModel] = useState('Toyota Fielder 1.5G');
  const [yearTier, setYearTier] = useState('2018');
  const [mileageTier, setMileageTier] = useState('mid');
  const [conditionTier, setConditionTier] = useState('good');
  const [targetCarId, setTargetCarId] = useState(vehicles[0]?.id || '');
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  // Video State
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  // Selected Upgrade Target
  const targetVehicle = vehicles.find((v) => v.id === targetCarId) || vehicles[0];

  // Dynamic Valuation Algorithm
  const calculateValuation = () => {
    const y = parseInt(yearTier) || 2018;
    let baseMin = 1050000;
    let baseMax = 1350000;

    if (y >= 2022) {
      baseMin = 2400000;
      baseMax = 2950000;
    } else if (y >= 2020) {
      baseMin = 1950000;
      baseMax = 2400000;
    } else if (y >= 2018) {
      baseMin = 1450000;
      baseMax = 1850000;
    } else if (y >= 2015) {
      baseMin = 1150000;
      baseMax = 1450000;
    }

    if (mileageTier === 'low') {
      baseMin += 160000;
      baseMax += 220000;
    } else if (mileageTier === 'high') {
      baseMin -= 140000;
      baseMax -= 170000;
    } else if (mileageTier === 'max') {
      baseMin -= 220000;
      baseMax -= 260000;
    }

    if (conditionTier === 'excellent') {
      baseMin += 120000;
      baseMax += 180000;
    } else if (conditionTier === 'fair') {
      baseMin -= 120000;
      baseMax -= 150000;
    }

    return { min: baseMin, max: baseMax };
  };

  const valuation = calculateValuation();
  const avgTradeCredit = Math.round((valuation.min + valuation.max) / 2);
  const remainingCashMin = Math.max(0, targetVehicle.priceKes - valuation.max);
  const remainingCashMax = Math.max(0, targetVehicle.priceKes - valuation.min);
  const equityPercent = Math.min(100, Math.round((avgTradeCredit / targetVehicle.priceKes) * 100));

  // Fluid Apple Number Animations
  const animatedMin = useAnimatedNumber(valuation.min, 500);
  const animatedMax = useAnimatedNumber(valuation.max, 500);
  const animatedAvg = useAnimatedNumber(avgTradeCredit, 500);
  const animatedCashMin = useAnimatedNumber(remainingCashMin, 500);
  const animatedCashMax = useAnimatedNumber(remainingCashMax, 500);
  const animatedEquityPercent = useAnimatedNumber(equityPercent, 450);

  // Quick Model Selector Pills
  const popularModels = [
    'Toyota Fielder 1.5G',
    'Mazda CX-5 2.2D',
    'Subaru Forester XT',
    'Nissan X-Trail 20X',
    'Toyota Prado TX 2.7',
    'Honda Fit GP5'
  ];

  const faqs = [
    {
      q: 'Can I trade in a vehicle that still has an active bank loan or logbook financing?',
      a: 'Yes. Our documentation department will contact your financier to obtain an official settlement statement. We clear the outstanding bank balance directly and credit the remaining equity toward your chosen vehicle in our showroom.'
    },
    {
      q: 'How long is the preliminary trade-in valuation valid?',
      a: 'Online estimates are indicative based on current auction clearing values. Once our Mombasa or Nairobi workshop conducts the 20-minute mechanical hoist inspection, you receive a written binding valuation letter valid for 7 calendar days.'
    },
    {
      q: 'Do I have to take delivery of an upgrade vehicle on the same day?',
      a: 'Not necessarily. You can lock in your trade-in credit and apply it immediately to any ready showroom car, or hold the credit against an incoming Japanese vessel shipment currently at sea.'
    },
    {
      q: 'What paperwork do I need to bring for the appraisal?',
      a: 'Please bring your original NTSA TIMS Logbook, your National ID card / Passport copy, KRA PIN certificate, and any recent mechanical service history.'
    }
  ];

  return (
    <section className="w-full bg-[#121215] py-16 px-6 text-white">
      <div className="max-w-[1240px] mx-auto space-y-24">
        
        {/* 1. CINEMATIC HERO OPENING */}
        <div className="text-center max-w-[800px] mx-auto">
          <span className="launch-status-label mb-3">
            Equity Appraisal & Direct Upgrade · Mombasa & Nairobi
          </span>
          <h1 className="hero-display mb-6">
            The Exchange.
          </h1>
          <p className="text-[17px] md:text-[20px] text-zinc-400 leading-[1.47]" style={{ letterSpacing: '-0.374px' }}>
            Transform your current keys into instant deposit equity. Eliminate shady classifieds, tire kickers, and delayed paperwork. Drive away in Japanese perfection backed by our 5,000 km warranty.
          </p>
        </div>

        {/* 2. CINEMATIC HD VIDEO STAGE */}
        <div className="relative w-full mx-auto">
          <div className="w-full h-[320px] sm:h-[460px] md:h-[580px] rounded-[24px] sm:rounded-[28px] overflow-hidden relative bg-[#121215]">
            <video
              ref={videoRef}
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover"
              poster="https://images.pexels.com/photos/33327689/pexels-photo-33327689.jpeg?auto=compress&cs=tinysrgb&w=1600"
            >
              <source src="https://videos.pexels.com/video-files/3571264/3571264-hd_1920_1080_30fps.mp4" type="video/mp4" />
              <img
                src="https://images.pexels.com/photos/33327689/pexels-photo-33327689.jpeg?auto=compress&cs=tinysrgb&w=1600"
                alt="Alberka Motors Trade Exchange"
                className="w-full h-full object-cover"
              />
            </video>

            {/* Subtle Gradient Scrim & Quiet Typography */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent flex flex-col justify-end p-8 md:p-12 text-white">
              <span className="text-[12px] font-semibold tracking-wider uppercase text-white/80 mb-2">
                Tangana Road Mombasa · Westlands Nairobi
              </span>
              <p className="text-[20px] md:text-[26px] font-medium text-white/95 max-w-[620px] leading-tight">
                "A seamless 20-minute mechanical hoist appraisal. Full legal indemnity. Same-day handover."
              </p>
            </div>

            {/* Glass Video Play/Pause & Mute Controls */}
            <div className="absolute top-6 right-6 flex items-center gap-2 z-20">
              <button
                onClick={togglePlay}
                className="w-9 h-9 rounded-full bg-[#121215]/80 hover:bg-[#121215] backdrop-blur-md flex items-center justify-center text-white shadow-xs transition-all cursor-pointer"
                title={isPlaying ? 'Pause video' : 'Play video'}
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
              </button>
              <button
                onClick={toggleMute}
                className="w-9 h-9 rounded-full bg-[#121215]/80 hover:bg-[#121215] backdrop-blur-md flex items-center justify-center text-white shadow-xs transition-all cursor-pointer"
                title={isMuted ? 'Unmute' : 'Mute'}
              >
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Floating Apple Status Capsule */}
          <div className="floating-capsule p-6 sm:p-8 max-w-[880px] mx-auto -mt-10 relative z-20 flex flex-col sm:flex-row items-center justify-between gap-6 bg-[#121215] border border-[#27272a]">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full text-left">
              <div>
                <span className="text-[11px] text-zinc-400 uppercase tracking-wider block font-semibold">Hoist Evaluation</span>
                <span className="text-[16px] font-semibold text-white">20-Minute Protocol</span>
              </div>
              <div>
                <span className="text-[11px] text-zinc-400 uppercase tracking-wider block font-semibold">Legal Security</span>
                <span className="text-[16px] font-semibold text-[#dc2626]">100% NTSA TIMS Indemnity</span>
              </div>
              <div>
                <span className="text-[11px] text-zinc-400 uppercase tracking-wider block font-semibold">Handover Assurance</span>
                <span className="text-[16px] font-semibold text-white">5,000 km Written Warranty</span>
              </div>
            </div>
          </div>
        </div>

        {/* 3. THE SPLIT-SCREEN CINEMATIC TRADE-UP STUDIO */}
        <div className="space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="launch-status-label mb-2">Real-Time Appraisal Studio</span>
              <h2 className="feature-heading">Configure Your Upgrade.</h2>
            </div>
            <p className="text-[15px] text-zinc-400 max-w-[420px]">
              Adjust your current vehicle profile and match it in real time against any Grade 4.5+ vehicle in our showroom.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Your Current Vehicle Inputs (7 Cols) */}
            <div className="lg:col-span-7 apple-card p-6 sm:p-10 bg-[#121215] border-0 space-y-8">
              
              {/* Make & Model */}
              <div>
                <label className="block text-[13px] font-semibold text-white uppercase tracking-wider mb-2">
                  1. Current Vehicle Make & Model
                </label>
                <input
                  type="text"
                  value={makeModel}
                  onChange={(e) => setMakeModel(e.target.value)}
                  placeholder="e.g. Toyota Fielder / Mazda CX-5 / Subaru Forester"
                  className="w-full px-4 py-3.5 rounded-[16px] bg-[#121215] border border-[#27272a] text-[15px] text-white font-medium focus:outline-none focus:border-[#dc2626] transition-colors mb-3"
                />

                {/* Quick Model Pills */}
                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="text-[11px] text-zinc-400 mr-1">Popular:</span>
                  {popularModels.map((m) => (
                    <button
                      key={m}
                      type="button"
                      onClick={() => setMakeModel(m)}
                      className={`text-[11px] px-2.5 py-1 rounded-full border transition-all cursor-pointer ${
                        makeModel === m
                          ? 'bg-[#1d1d1f] text-white border-[#1d1d1f]'
                          : 'bg-[#121215] text-zinc-400 border-[#27272a] hover:border-[#1d1d1f]'
                      }`}
                    >
                      {m}
                    </button>
                  ))}
                </div>
              </div>

              {/* Year of Manufacture Segmented Pills */}
              <div>
                <label className="block text-[13px] font-semibold text-white uppercase tracking-wider mb-2">
                  2. Year of Manufacture
                </label>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                  {['2023', '2021', '2019', '2018', '2016', '2014'].map((yr) => (
                    <button
                      key={yr}
                      type="button"
                      onClick={() => setYearTier(yr)}
                      className={`py-2.5 rounded-[14px] text-[13px] font-medium transition-all cursor-pointer border ${
                        yearTier === yr
                          ? 'bg-[#1d1d1f] text-white border-[#1d1d1f] font-semibold'
                          : 'bg-[#121215] text-white border-[#27272a] hover:border-[#86868b]'
                      }`}
                    >
                      {yr === '2023' ? '2023+' : yr === '2014' ? '<2015' : yr}
                    </button>
                  ))}
                </div>
              </div>

              {/* Odometer Mileage */}
              <div>
                <label className="block text-[13px] font-semibold text-white uppercase tracking-wider mb-2">
                  3. Odometer Reading
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { id: 'low', label: '< 60,000 KM', desc: 'Low Mileage' },
                    { id: 'mid', label: '60k – 110k KM', desc: 'Average' },
                    { id: 'high', label: '110k – 160k KM', desc: 'High' },
                    { id: 'max', label: '160,000+ KM', desc: 'Commercial' },
                  ].map((m) => (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => setMileageTier(m.id)}
                      className={`p-3 rounded-[16px] text-left transition-all cursor-pointer border ${
                        mileageTier === m.id
                          ? 'bg-[#1d1d1f] text-white border-[#1d1d1f]'
                          : 'bg-[#121215] text-white border-[#27272a] hover:border-[#86868b]'
                      }`}
                    >
                      <span className="block text-[13px] font-semibold">{m.label}</span>
                      <span className={`block text-[11px] ${mileageTier === m.id ? 'text-white/70' : 'text-zinc-400'}`}>
                        {m.desc}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Cosmetic & Mechanical Condition */}
              <div>
                <label className="block text-[13px] font-semibold text-white uppercase tracking-wider mb-2">
                  4. Condition Rating
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    {
                      id: 'excellent',
                      title: 'Pristine Original',
                      desc: 'Factory paint, zero accident history, full agent service record.'
                    },
                    {
                      id: 'good',
                      title: 'Normal Wear',
                      desc: 'Minor cosmetic stone chips, solid engine compression, clean chassis rails.'
                    },
                    {
                      id: 'fair',
                      title: 'Needs Service',
                      desc: 'Scratches, bumper wear, or requires minor suspension/fluid overhaul.'
                    }
                  ].map((c) => (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => setConditionTier(c.id)}
                      className={`p-4 rounded-[18px] text-left transition-all cursor-pointer border flex flex-col justify-between ${
                        conditionTier === c.id
                          ? 'bg-[#1d1d1f] text-white border-[#1d1d1f]'
                          : 'bg-[#121215] text-white border-[#27272a] hover:border-[#86868b]'
                      }`}
                    >
                      <div>
                        <span className="block text-[14px] font-semibold mb-1">{c.title}</span>
                        <p className={`text-[12px] leading-relaxed ${conditionTier === c.id ? 'text-white/80' : 'text-zinc-400'}`}>
                          {c.desc}
                        </p>
                      </div>
                      <div className="mt-3 flex items-center justify-end">
                        <CheckCircle2 className={`w-4 h-4 ${conditionTier === c.id ? 'text-[#dc2626]' : 'text-transparent'}`} />
                      </div>
                    </button>
                  ))}
                </div>
              </div>

            </div>

            {/* Right Column: Live Cinematic Exchange Card (5 Cols) */}
            <div className="lg:col-span-5 apple-card p-6 sm:p-8 bg-[#121215] border border-[#27272a] sticky top-[110px] space-y-6">
              
              {/* Target Fleet Selector Header */}
              <div>
                <span className="launch-status-label mb-1">Target Upgrade Match</span>
                <div className="relative mt-2">
                  <select
                    value={targetCarId}
                    onChange={(e) => setTargetCarId(e.target.value)}
                    className="w-full appearance-none px-4 py-3 pr-10 rounded-[14px] bg-[#121215] border border-[#27272a] text-[14px] font-semibold text-white focus:outline-none focus:border-[#dc2626] cursor-pointer"
                  >
                    {vehicles.map((v) => (
                      <option key={v.id} value={v.id}>
                        {v.name} ({v.stockNo}) — KES {v.priceKes.toLocaleString()}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="w-4 h-4 text-zinc-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              {/* High-End Studio Photo of Selected Vehicle */}
              <div className="w-full h-[220px] sm:h-[260px] rounded-[22px] overflow-hidden bg-[#121215] relative group">
                <img
                  src={targetVehicle.heroImage}
                  alt={targetVehicle.name}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute top-3.5 left-3.5 flex items-center gap-2">
                  <span className="bg-[#121215]/95 backdrop-blur-md px-3 py-0.5 rounded-full text-[11px] font-semibold text-white shadow-xs">
                    {targetVehicle.auctionGrade}
                  </span>
                  <span className="bg-[#121215]/95 backdrop-blur-md px-3 py-0.5 rounded-full text-[11px] font-semibold text-[#dc2626] shadow-xs">
                    {targetVehicle.status}
                  </span>
                </div>
                <div className="absolute bottom-3.5 left-3.5 right-3.5 bg-black/60 backdrop-blur-md px-3.5 py-2 rounded-[14px] text-white flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-white/70 block uppercase font-medium">{targetVehicle.moniker}</span>
                    <span className="text-[13px] font-semibold">{targetVehicle.name}</span>
                  </div>
                  <span className="text-[13px] font-bold text-white">KES {targetVehicle.priceKes.toLocaleString()}</span>
                </div>
              </div>

              {/* Equity Appraisal Progress Bar */}
              <div className="p-4 bg-[#121215] rounded-[18px] space-y-3">
                <div className="flex items-center justify-between text-[12px]">
                  <span className="font-semibold text-white">Trade-In Equity Coverage</span>
                  <span className="font-bold text-[#dc2626] transition-all">{animatedEquityPercent}% Covered</span>
                </div>
                <div className="w-full h-2.5 bg-[#27272a] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#dc2626] rounded-full transition-all duration-500 ease-out"
                    style={{ width: `${animatedEquityPercent}%` }}
                  />
                </div>
                <div className="flex items-center justify-between text-[11px] text-zinc-400">
                  <span>Your Equity: ~KES {animatedAvg.toLocaleString()}</span>
                  <span>Target: KES {targetVehicle.priceKes.toLocaleString()}</span>
                </div>
              </div>

              {/* Financial Calculation Breakdown */}
              <div className="divide-y divide-[#27272a] text-[13px]">
                <div className="py-2.5 flex items-center justify-between">
                  <span className="text-zinc-400">Estimated Trade Credit Bracket</span>
                  <span className="font-semibold text-white">
                    KES {animatedMin.toLocaleString()} – {animatedMax.toLocaleString()}
                  </span>
                </div>
                <div className="py-2.5 flex items-center justify-between">
                  <span className="text-zinc-400">Target Vehicle Handover Price</span>
                  <span className="font-semibold text-white">
                    KES {targetVehicle.priceKes.toLocaleString()}
                  </span>
                </div>
                <div className="py-3 flex items-baseline justify-between bg-emerald-50/60 -mx-4 px-4 rounded-[12px] transition-colors">
                  <div>
                    <span className="text-[11px] font-semibold text-emerald-800 uppercase block">
                      Remaining Cash Balance Required
                    </span>
                    <span className="text-[18px] font-bold text-emerald-700">
                      KES {animatedCashMin.toLocaleString()} – {animatedCashMax.toLocaleString()}
                    </span>
                  </div>
                  <span className="text-[11px] font-medium text-emerald-700 bg-[#121215] px-2 py-0.5 rounded-full border border-emerald-200">
                    Net Balance
                  </span>
                </div>
              </div>

              {/* Conversion Buttons */}
              <div className="space-y-2.5 pt-2">
                <a
                  href={`https://wa.me/254714333888?text=Hello%20Cars%20R%20Us,%20I%20used%20your%20Trade-In%20Studio%20for%20my%20${encodeURIComponent(makeModel)}%20(${yearTier}).%20Preliminary%20Trade%20Credit:%20KES%20${valuation.min.toLocaleString()}%20-%20${valuation.max.toLocaleString()}.%20Upgrading%20to:%20${encodeURIComponent(targetVehicle.name)}%20(${targetVehicle.stockNo}).`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pricing-blue-pill-lg w-full justify-center !py-3.5 text-[14px]"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Lock In Valuation on WhatsApp</span>
                </a>

                {onSelectVehicle && (
                  <button
                    type="button"
                    onClick={() => onSelectVehicle(targetVehicle)}
                    className="outlined-explore-pill w-full justify-center !py-3 text-[13px] cursor-pointer"
                  >
                    <span>Inspect {targetVehicle.name} Story & Specs</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              <div className="text-center">
                <span className="text-[11px] text-zinc-400">
                  Binding formal certificate issued after 20-min mechanical hoist check.
                </span>
              </div>

            </div>

          </div>
        </div>

        {/* 4. THE 3 VISUAL STAGES OF THE EXCHANGE (CINEMATIC FILM STRIP) */}
        <div>
          <div className="text-center max-w-[680px] mx-auto mb-14">
            <span className="launch-status-label mb-2">The Handover Architecture</span>
            <h2 className="feature-heading">
              How the Trade Exchange Works.
            </h2>
            <p className="text-[16px] text-zinc-400 mt-3">
              No protracted negotiations. No dealing with unverified bank drafts. Complete handover in 3 structured phases.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Stage 1 */}
            <div className="apple-card bg-[#121215] border border-[#27272a] flex flex-col justify-between overflow-hidden">
              <div className="h-[220px] w-full overflow-hidden bg-[#121215]">
                <img
                  src="https://images.pexels.com/photos/8986138/pexels-photo-8986138.jpeg?auto=compress&cs=tinysrgb&w=1600"
                  alt="20-Minute Mechanical Hoist Inspection"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-8 space-y-3">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[12px] font-semibold text-[#dc2626] uppercase tracking-wider">Phase 01</span>
                  <span className="text-[11px] text-zinc-400 font-medium">Tangana Rd / Mwanzi Rd</span>
                </div>
                <h3 className="text-[22px] font-semibold text-white">
                  20-Minute Hoist Diagnostics
                </h3>
                <p className="text-[14px] text-zinc-400 leading-relaxed">
                  Drive into our Mombasa or Nairobi bays. Our senior engineer hoists your vehicle, measures brake rotor tolerances, inspects underbody chassis rails, and runs an OBD-II ECU diagnostic.
                </p>
              </div>
            </div>

            {/* Stage 2 */}
            <div className="apple-card bg-[#121215] border border-[#27272a] flex flex-col justify-between overflow-hidden">
              <div className="h-[220px] w-full overflow-hidden bg-[#121215]">
                <img
                  src="https://images.pexels.com/photos/33327689/pexels-photo-33327689.jpeg?auto=compress&cs=tinysrgb&w=1600"
                  alt="Certified Equity Lock"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-8 space-y-3">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[12px] font-semibold text-[#dc2626] uppercase tracking-wider">Phase 02</span>
                  <span className="text-[11px] text-zinc-400 font-medium">Binding for 7 Days</span>
                </div>
                <h3 className="text-[22px] font-semibold text-white">
                  Certified Equity Lock
                </h3>
                <p className="text-[14px] text-zinc-400 leading-relaxed">
                  Receive an official binding valuation letter. The agreed valuation amount is deducted directly from your selected Grade 4.5+ showroom vehicle with zero hidden broker margins.
                </p>
              </div>
            </div>

            {/* Stage 3 */}
            <div className="apple-card bg-[#121215] border border-[#27272a] flex flex-col justify-between overflow-hidden">
              <div className="h-[220px] w-full overflow-hidden bg-[#121215]">
                <img
                  src="https://images.pexels.com/photos/16176579/pexels-photo-16176579.jpeg?auto=compress&cs=tinysrgb&w=1600"
                  alt="Drive Away Same Day"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-8 space-y-3">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[12px] font-semibold text-[#dc2626] uppercase tracking-wider">Phase 03</span>
                  <span className="text-[11px] text-zinc-400 font-medium">5,000 KM Warranty</span>
                </div>
                <h3 className="text-[22px] font-semibold text-white">
                  Drive Away Same Day
                </h3>
                <p className="text-[14px] text-zinc-400 leading-relaxed">
                  Our legal desk completes NTSA TIMS logbook transfer and encumbrance release. You turn the key on your verified Japanese import, backed by our in-house 5,000 km warranty covenant.
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* 5. CINEMATIC TRANSPARENCY ACCORDION */}
        <div className="apple-card p-8 md:p-12 bg-[#121215] border-0">
          <div className="max-w-[720px] mb-8">
            <span className="launch-status-label mb-2">Clarity & Legal Indemnity</span>
            <h2 className="text-[26px] md:text-[32px] font-semibold text-white">
              Frequently Asked Questions.
            </h2>
            <p className="text-[15px] text-zinc-400 mt-2">
              Everything you need to know about trading your car at Alberka Motors Kenya.
            </p>
          </div>

          <div className="divide-y divide-[#27272a]">
            {faqs.map((faq, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <div key={idx} className="py-5">
                  <button
                    onClick={() => setActiveFaq(isOpen ? null : idx)}
                    className="w-full flex items-center justify-between text-left cursor-pointer group"
                  >
                    <span className="text-[17px] font-semibold text-white group-hover:text-[#dc2626] transition-colors">
                      {faq.q}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-zinc-400 transition-transform duration-300 shrink-0 ml-4 ${
                        isOpen ? 'rotate-180 text-[#dc2626]' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <p className="mt-3 text-[15px] text-zinc-400 leading-relaxed animate-in fade-in duration-200">
                      {faq.a}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
