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
import { SkeletonImage } from './SkeletonImage';

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
    <section className="w-full bg-[#08090a] py-16 px-4 sm:px-6 text-[#d0d6e0] border-t border-[#23252a]">
      <div className="max-w-[1200px] mx-auto space-y-16">
        
        {/* 1. HERO OPENING */}
        <div className="text-center max-w-[720px] mx-auto">
          <span className="launch-status-label mb-2">
            Equity Appraisal & Direct Upgrade · Mombasa & Nairobi
          </span>
          <h1 className="hero-display mb-3">
            The Exchange Studio.
          </h1>
          <p className="text-[14px] sm:text-[15px] text-[#8a8f98] leading-relaxed">
            Transform your current keys into instant deposit equity. Eliminate classifieds, tire kickers, and delayed paperwork. Drive away in verified Japanese provenance backed by our 5,000 km warranty.
          </p>
        </div>

        {/* 2. VIDEO STAGE */}
        <div className="relative w-full mx-auto">
          <div className="w-full h-[320px] sm:h-[420px] md:h-[480px] rounded-[12px] overflow-hidden relative bg-[#0f1011] border border-[#23252a]">
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
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6 sm:p-8 text-white">
              <span className="font-mono text-[11px] text-[#8a8f98] uppercase tracking-wider mb-1">
                Tangana Road Mombasa · Westlands Nairobi
              </span>
              <p className="text-[18px] md:text-[22px] font-medium text-[#ffffff] max-w-[580px] leading-tight">
                "A seamless 20-minute mechanical hoist appraisal. Full legal indemnity. Same-day handover."
              </p>
            </div>

            {/* Video Controls */}
            <div className="absolute top-4 right-4 flex items-center gap-1.5 z-20">
              <button
                onClick={togglePlay}
                className="w-8 h-8 rounded-[4px] bg-[#08090a]/80 hover:bg-[#08090a] border border-[#23252a] flex items-center justify-center text-[#d0d6e0] transition-all cursor-pointer"
                title={isPlaying ? 'Pause video' : 'Play video'}
              >
                {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 ml-0.5" />}
              </button>
              <button
                onClick={toggleMute}
                className="w-8 h-8 rounded-[4px] bg-[#08090a]/80 hover:bg-[#08090a] border border-[#23252a] flex items-center justify-center text-[#d0d6e0] transition-all cursor-pointer"
                title={isMuted ? 'Unmute' : 'Mute'}
              >
                {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          {/* Linear Capsule */}
          <div className="bg-[#0f1011] border border-[#23252a] rounded-[12px] p-5 sm:p-6 max-w-[800px] mx-auto -mt-8 relative z-20 shadow-xl">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full text-left">
              <div>
                <span className="font-mono text-[11px] text-[#8a8f98] uppercase tracking-wider block">Hoist Evaluation</span>
                <span className="text-[15px] font-medium text-[#ffffff]">20-Minute Protocol</span>
              </div>
              <div>
                <span className="font-mono text-[11px] text-[#8a8f98] uppercase tracking-wider block">Legal Security</span>
                <span className="text-[15px] font-medium text-[#ffffff]">100% NTSA TIMS Indemnity</span>
              </div>
              <div>
                <span className="font-mono text-[11px] text-[#8a8f98] uppercase tracking-wider block">Handover Assurance</span>
                <span className="text-[15px] font-medium text-[#ffffff]">5,000 km Written Warranty</span>
              </div>
            </div>
          </div>
        </div>

        {/* 3. SPLIT-SCREEN TRADE-UP STUDIO */}
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="launch-status-label mb-1">Real-Time Appraisal Studio</span>
              <h2 className="feature-heading">Configure Your Upgrade.</h2>
            </div>
            <p className="text-[14px] text-[#8a8f98] max-w-[420px]">
              Adjust your current vehicle profile and match it in real time against any Grade 4.5+ vehicle in our showroom.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* Left Column: Your Current Vehicle Inputs (7 Cols) */}
            <div className="lg:col-span-7 bg-[#0f1011] border border-[#23252a] rounded-[12px] p-6 sm:p-8 space-y-6">
              
              {/* Make & Model */}
              <div>
                <label className="block text-[12px] text-[#8a8f98] uppercase tracking-wider font-mono mb-2">
                  01 // Current Vehicle Make & Model
                </label>
                <input
                  type="text"
                  value={makeModel}
                  onChange={(e) => setMakeModel(e.target.value)}
                  placeholder="e.g. Toyota Fielder / Mazda CX-5 / Subaru Forester"
                  className="w-full px-3.5 py-2.5 rounded-[6px] bg-[#161718] border border-[#23252a] text-[14px] text-[#ffffff] focus:outline-none focus:border-[#383b3f] transition-colors mb-2.5"
                />

                {/* Quick Model Pills */}
                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="font-mono text-[11px] text-[#8a8f98] mr-1">Popular:</span>
                  {popularModels.map((m) => (
                    <button
                      key={m}
                      type="button"
                      onClick={() => setMakeModel(m)}
                      className={`text-[11px] px-2.5 py-0.5 rounded-[4px] border transition-all cursor-pointer ${
                        makeModel === m
                          ? 'bg-[#ffffff] text-[#08090a] border-[#ffffff] font-medium'
                          : 'bg-[#161718] text-[#8a8f98] border-[#23252a] hover:text-[#ffffff]'
                      }`}
                    >
                      {m}
                    </button>
                  ))}
                </div>
              </div>

              {/* Year of Manufacture Segmented Pills */}
              <div>
                <label className="block text-[12px] text-[#8a8f98] uppercase tracking-wider font-mono mb-2">
                  02 // Year of Manufacture
                </label>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                  {['2023', '2021', '2019', '2018', '2016', '2014'].map((yr) => (
                    <button
                      key={yr}
                      type="button"
                      onClick={() => setYearTier(yr)}
                      className={`py-2 rounded-[6px] text-[12px] font-mono transition-all cursor-pointer border ${
                        yearTier === yr
                          ? 'bg-[#161718] text-[#e4f222] border-[#e4f222]'
                          : 'bg-[#161718] text-[#8a8f98] border-[#23252a] hover:text-[#ffffff]'
                      }`}
                    >
                      {yr === '2023' ? '2023+' : yr === '2014' ? '<2015' : yr}
                    </button>
                  ))}
                </div>
              </div>

              {/* Odometer Mileage */}
              <div>
                <label className="block text-[12px] text-[#8a8f98] uppercase tracking-wider font-mono mb-2">
                  03 // Odometer Reading
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
                      className={`p-2.5 rounded-[6px] text-left transition-all cursor-pointer border ${
                        mileageTier === m.id
                          ? 'bg-[#161718] text-[#ffffff] border-[#e4f222]'
                          : 'bg-[#161718] text-[#8a8f98] border-[#23252a] hover:text-[#ffffff]'
                      }`}
                    >
                      <span className="block text-[12px] font-medium">{m.label}</span>
                      <span className="block font-mono text-[10px] text-[#8a8f98]">
                        {m.desc}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Cosmetic & Mechanical Condition */}
              <div>
                <label className="block text-[12px] text-[#8a8f98] uppercase tracking-wider font-mono mb-2">
                  04 // Condition Rating
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {[
                    {
                      id: 'excellent',
                      title: 'Pristine Original',
                      desc: 'Factory paint, zero accidents, agent service history.'
                    },
                    {
                      id: 'good',
                      title: 'Normal Wear',
                      desc: 'Minor cosmetic stone chips, solid engine compression.'
                    },
                    {
                      id: 'fair',
                      title: 'Needs Service',
                      desc: 'Scratches, bumper wear, or minor suspension overhaul needed.'
                    }
                  ].map((c) => (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => setConditionTier(c.id)}
                      className={`p-3.5 rounded-[6px] text-left transition-all cursor-pointer border flex flex-col justify-between ${
                        conditionTier === c.id
                          ? 'bg-[#161718] text-[#ffffff] border-[#e4f222]'
                          : 'bg-[#161718] text-[#8a8f98] border-[#23252a] hover:text-[#ffffff]'
                      }`}
                    >
                      <div>
                        <span className="block text-[13px] font-medium text-[#ffffff] mb-1">{c.title}</span>
                        <p className="text-[11px] text-[#8a8f98] leading-relaxed">
                          {c.desc}
                        </p>
                      </div>
                      <div className="mt-2.5 flex items-center justify-end">
                        <CheckCircle2 className={`w-3.5 h-3.5 ${conditionTier === c.id ? 'text-[#e4f222]' : 'text-transparent'}`} />
                      </div>
                    </button>
                  ))}
                </div>
              </div>

            </div>

            {/* Right Column: Live Cinematic Exchange Card (5 Cols) */}
            <div className="lg:col-span-5 bg-[#0f1011] border border-[#23252a] rounded-[12px] p-5 sm:p-6 relative lg:sticky lg:top-[70px] space-y-5">
              
              {/* Target Fleet Selector Header */}
              <div>
                <span className="launch-status-label mb-1">Target Upgrade Match</span>
                <div className="relative mt-1.5">
                  <select
                    value={targetCarId}
                    onChange={(e) => setTargetCarId(e.target.value)}
                    className="w-full appearance-none px-3.5 py-2.5 pr-10 rounded-[6px] bg-[#161718] border border-[#23252a] text-[13px] text-[#ffffff] focus:outline-none focus:border-[#383b3f] cursor-pointer"
                  >
                    {vehicles.map((v) => (
                      <option key={v.id} value={v.id}>
                        {v.name} ({v.stockNo}) — KES {v.priceKes.toLocaleString()}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="w-4 h-4 text-[#8a8f98] absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              {/* High-End Studio Photo of Selected Vehicle */}
              <div className="w-full h-[200px] sm:h-[220px] rounded-[8px] overflow-hidden bg-[#161718] relative group border border-[#23252a]">
                <SkeletonImage
                  src={targetVehicle.heroImage}
                  alt={targetVehicle.name}
                  className="transition-transform duration-700 ease-out group-hover:scale-105"
                  containerClassName="w-full h-full"
                />
                <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                  <span className="bg-[#08090a]/90 backdrop-blur-md px-2 py-0.5 rounded-[4px] font-mono text-[10px] text-[#ffffff] border border-[#23252a]">
                    Grade {targetVehicle.auctionGrade}
                  </span>
                  <span className="bg-[#08090a]/90 backdrop-blur-md px-2 py-0.5 rounded-[4px] font-mono text-[10px] text-[#8a8f98] border border-[#23252a]">
                    {targetVehicle.status}
                  </span>
                </div>
                <div className="absolute bottom-2.5 left-2.5 right-2.5 bg-[#08090a]/90 backdrop-blur-md px-3 py-1.5 rounded-[6px] border border-[#23252a] flex items-center justify-between">
                  <div>
                    <span className="text-[12px] font-medium text-[#ffffff]">{targetVehicle.name}</span>
                  </div>
                  <span className="font-mono text-[12px] text-[#e4f222]">KES {targetVehicle.priceKes.toLocaleString()}</span>
                </div>
              </div>

              {/* Equity Appraisal Progress Bar */}
              <div className="p-3.5 bg-[#161718] rounded-[6px] border border-[#23252a] space-y-2.5">
                <div className="flex items-center justify-between text-[12px]">
                  <span className="text-[#8a8f98]">Trade-In Equity Coverage</span>
                  <span className="font-mono text-[#e4f222]">{animatedEquityPercent}% Covered</span>
                </div>
                <div className="w-full h-1.5 bg-[#23252a] rounded-[2px] overflow-hidden">
                  <div
                    className="h-full bg-[#e4f222] rounded-[2px] transition-all duration-500 ease-out"
                    style={{ width: `${animatedEquityPercent}%` }}
                  />
                </div>
                <div className="flex items-center justify-between font-mono text-[11px] text-[#8a8f98]">
                  <span>Equity: ~KES {animatedAvg.toLocaleString()}</span>
                  <span>Target: KES {targetVehicle.priceKes.toLocaleString()}</span>
                </div>
              </div>

              {/* Financial Calculation Breakdown */}
              <div className="divide-y divide-[#23252a] text-[13px]">
                <div className="py-2 flex items-center justify-between">
                  <span className="text-[#8a8f98]">Estimated Trade Credit</span>
                  <span className="font-mono text-[#ffffff]">
                    KES {animatedMin.toLocaleString()} – {animatedMax.toLocaleString()}
                  </span>
                </div>
                <div className="py-2 flex items-center justify-between">
                  <span className="text-[#8a8f98]">Target Vehicle Price</span>
                  <span className="font-mono text-[#ffffff]">
                    KES {targetVehicle.priceKes.toLocaleString()}
                  </span>
                </div>
                <div className="py-2.5 flex items-baseline justify-between bg-[#161718] -mx-3 px-3 rounded-[6px] mt-1">
                  <div>
                    <span className="font-mono text-[10px] text-[#8a8f98] uppercase block">
                      Remaining Cash Balance Required
                    </span>
                    <span className="font-mono text-[16px] text-[#e4f222]">
                      KES {animatedCashMin.toLocaleString()} – {animatedCashMax.toLocaleString()}
                    </span>
                  </div>
                  <span className="font-mono text-[10px] text-[#8a8f98] border border-[#23252a] px-1.5 py-0.5 rounded-[4px]">
                    Net Balance
                  </span>
                </div>
              </div>

              {/* Conversion Buttons */}
              <div className="space-y-2 pt-1">
                <a
                  href={`https://wa.me/254714333888?text=Hello%20Alberka%20Motors,%20I%20used%20your%20Trade-In%20Studio%20for%20my%20${encodeURIComponent(makeModel)}%20(${yearTier}).%20Preliminary%20Trade%20Credit:%20KES%20${valuation.min.toLocaleString()}%20-%20${valuation.max.toLocaleString()}.%20Upgrading%20to:%20${encodeURIComponent(targetVehicle.name)}%20(${targetVehicle.stockNo}).`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary w-full justify-center !py-2.5 text-[13px]"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Lock In Valuation on WhatsApp</span>
                </a>

                {onSelectVehicle && (
                  <button
                    type="button"
                    onClick={() => onSelectVehicle(targetVehicle)}
                    className="btn-ghost w-full justify-center !py-2 text-[12px] cursor-pointer"
                  >
                    <span>Inspect {targetVehicle.name} Story & Specs</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              <div className="text-center">
                <span className="font-mono text-[10px] text-[#8a8f98]">
                  Binding formal certificate issued after 20-min mechanical hoist check.
                </span>
              </div>

            </div>

          </div>
        </div>

        {/* 4. THE 3 VISUAL STAGES OF THE EXCHANGE */}
        <div>
          <div className="text-center max-w-[620px] mx-auto mb-12">
            <span className="launch-status-label mb-2">The Handover Architecture</span>
            <h2 className="feature-heading">
              How the Trade Exchange Works.
            </h2>
            <p className="text-[14px] text-[#8a8f98] mt-2">
              No protracted negotiations. No dealing with unverified bank drafts. Complete handover in 3 structured phases.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Stage 1 */}
            <div className="bg-[#0f1011] border border-[#23252a] rounded-[12px] flex flex-col justify-between overflow-hidden hover:border-[#383b3f] transition-all">
              <div className="h-[200px] w-full overflow-hidden bg-[#161718]">
                <img
                  src="https://images.pexels.com/photos/8986138/pexels-photo-8986138.jpeg?auto=compress&cs=tinysrgb&w=1600"
                  alt="20-Minute Mechanical Hoist Inspection"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6 space-y-2.5">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-mono text-[11px] text-[#8a8f98] uppercase">Phase 01</span>
                  <span className="font-mono text-[11px] text-[#8a8f98]">Tangana Rd / Mwanzi Rd</span>
                </div>
                <h3 className="text-[18px] font-medium text-[#ffffff]">
                  20-Minute Hoist Diagnostics
                </h3>
                <p className="text-[13px] text-[#8a8f98] leading-relaxed">
                  Drive into our Mombasa or Nairobi bays. Our senior engineer hoists your vehicle, measures brake rotor tolerances, inspects underbody chassis rails, and runs an OBD-II diagnostic.
                </p>
              </div>
            </div>

            {/* Stage 2 */}
            <div className="bg-[#0f1011] border border-[#23252a] rounded-[12px] flex flex-col justify-between overflow-hidden hover:border-[#383b3f] transition-all">
              <div className="h-[200px] w-full overflow-hidden bg-[#161718]">
                <img
                  src="https://images.pexels.com/photos/33327689/pexels-photo-33327689.jpeg?auto=compress&cs=tinysrgb&w=1600"
                  alt="Certified Equity Lock"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6 space-y-2.5">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-mono text-[11px] text-[#8a8f98] uppercase">Phase 02</span>
                  <span className="font-mono text-[11px] text-[#8a8f98]">Binding 7 Days</span>
                </div>
                <h3 className="text-[18px] font-medium text-[#ffffff]">
                  Certified Equity Lock
                </h3>
                <p className="text-[13px] text-[#8a8f98] leading-relaxed">
                  Receive an official binding valuation letter. The agreed valuation amount is deducted directly from your selected Grade 4.5+ showroom vehicle with zero hidden broker margins.
                </p>
              </div>
            </div>

            {/* Stage 3 */}
            <div className="bg-[#0f1011] border border-[#23252a] rounded-[12px] flex flex-col justify-between overflow-hidden hover:border-[#383b3f] transition-all">
              <div className="h-[200px] w-full overflow-hidden bg-[#161718]">
                <img
                  src="https://images.pexels.com/photos/16176579/pexels-photo-16176579.jpeg?auto=compress&cs=tinysrgb&w=1600"
                  alt="Drive Away Same Day"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6 space-y-2.5">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-mono text-[11px] text-[#8a8f98] uppercase">Phase 03</span>
                  <span className="font-mono text-[11px] text-[#8a8f98]">5,000 KM Warranty</span>
                </div>
                <h3 className="text-[18px] font-medium text-[#ffffff]">
                  Drive Away Same Day
                </h3>
                <p className="text-[13px] text-[#8a8f98] leading-relaxed">
                  Our legal desk completes NTSA TIMS logbook transfer and encumbrance release. You turn the key on your verified Japanese import, backed by our in-house 5,000 km warranty covenant.
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* 5. TRANSPARENCY ACCORDION */}
        <div className="bg-[#0f1011] border border-[#23252a] rounded-[12px] p-6 sm:p-10">
          <div className="max-w-[640px] mb-6">
            <span className="launch-status-label mb-1">Clarity & Legal Indemnity</span>
            <h2 className="text-[22px] md:text-[26px] font-medium text-[#ffffff]">
              Frequently Asked Questions.
            </h2>
            <p className="text-[13px] text-[#8a8f98] mt-1.5">
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
                    <span className="text-[15px] font-normal text-[#ffffff] group-hover:text-[#d0d6e0] transition-colors">
                      {faq.q}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-[#8a8f98] transition-transform duration-200 shrink-0 ml-4 ${
                        isOpen ? 'rotate-180 text-[#ffffff]' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <p className="mt-2 text-[13px] text-[#8a8f98] leading-relaxed animate-in fade-in duration-200">
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
