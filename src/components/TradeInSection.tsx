import React, { useState, useRef } from 'react';
import {
  ArrowRight,
  CheckCircle2,
  MessageCircle,
  Play,
  Pause,
  Volume2,
  VolumeX,
  ChevronDown
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

  const targetVehicle = vehicles.find((v) => v.id === targetCarId) || vehicles[0];

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

  const animatedMin = useAnimatedNumber(valuation.min, 400);
  const animatedMax = useAnimatedNumber(valuation.max, 400);
  const animatedAvg = useAnimatedNumber(avgTradeCredit, 400);
  const animatedCashMin = useAnimatedNumber(remainingCashMin, 400);
  const animatedCashMax = useAnimatedNumber(remainingCashMax, 400);
  const animatedEquityPercent = useAnimatedNumber(equityPercent, 400);

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
      q: 'Can I trade in a car that is currently under bank financing?',
      a: 'Yes. We obtain an official settlement letter from your financial institution, disburse the outstanding loan balance directly, and credit all remaining equity towards your chosen vehicle.'
    },
    {
      q: 'How long is the trade-in valuation valid?',
      a: 'Our online calculator provides a realistic estimate. Following a 20-minute mechanical hoist check at our Mombasa or Nairobi showroom, you receive a written appraisal valid for 7 days.'
    },
    {
      q: 'Can I trade in against an incoming Japanese shipment?',
      a: 'Yes. Your verified trade-in equity can be allocated immediately as a reservation deposit on any vessel currently in transit to Mombasa.'
    },
    {
      q: 'Which documentation is required at appraisal?',
      a: 'Original NTSA TIMS Logbook, your National ID or Passport, and KRA PIN certificate.'
    }
  ];

  return (
    <section className="w-full bg-transparent py-16 sm:py-24 px-4 sm:px-8 text-[#f4f4f5] border-t border-white/[0.08]">
      <div className="max-w-[1240px] mx-auto space-y-16 sm:space-y-20">
        
        {/* Section Header */}
        <div className="text-center max-w-[800px] mx-auto space-y-3">
          <div className="inline-flex items-center gap-2">
            <span className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-zinc-400">
              EQUITY CONVERSION · MOMBASA & NAIROBI
            </span>
          </div>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold text-white tracking-[-0.035em] leading-[1.05]">
            Trade In Your Current Vehicle
          </h1>
          <p className="text-base sm:text-lg text-zinc-400 leading-relaxed font-normal max-w-2xl mx-auto">
            Convert your existing car keys into immediate deposit equity. Avoid private classified friction and upgrade directly into an inspected Japanese import backed by our 5,000 km warranty.
          </p>
        </div>

        {/* Video Cinema Banner */}
        <div className="space-y-8">
          <div className="w-full aspect-[16/9] sm:aspect-[21/9.5] max-h-[500px] overflow-hidden relative bg-black border border-white/[0.08] rounded-2xl shadow-[0_24px_60px_rgba(0,0,0,0.85)]">
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
                alt="Alberka Motors Trade In"
                className="w-full h-full object-cover"
              />
            </video>

            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6 sm:p-10 text-white pointer-events-none">
              <span className="font-mono text-[10px] text-zinc-400 uppercase tracking-widest block mb-1">
                APPRAISAL PROTOCOL
              </span>
              <p className="text-xl sm:text-2xl font-bold text-white leading-tight max-w-xl">
                20-minute hoist check. Direct NTSA transfer. Same-day handover.
              </p>
            </div>

            <div className="absolute top-4 right-4 flex items-center gap-2 z-20">
              <button
                onClick={togglePlay}
                className="w-8 h-8 bg-black/75 hover:bg-black border border-white/15 flex items-center justify-center text-white transition-all cursor-pointer rounded-lg backdrop-blur-md"
                title={isPlaying ? 'Pause' : 'Play'}
              >
                {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 ml-0.5" />}
              </button>
              <button
                onClick={toggleMute}
                className="w-8 h-8 bg-black/75 hover:bg-black border border-white/15 flex items-center justify-center text-white transition-all cursor-pointer rounded-lg backdrop-blur-md"
                title={isMuted ? 'Unmute' : 'Mute'}
              >
                {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          {/* Architectural Metric Matrix (Hairline Dividers) */}
          <div className="border-y border-white/[0.08] py-8 grid grid-cols-1 sm:grid-cols-3 gap-6 text-left">
            <div>
              <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-wider block mb-1">INSPECTION TIME</span>
              <span className="text-base sm:text-lg font-bold text-white block">20-Minute Check</span>
              <span className="text-xs text-zinc-400">Hoist & diagnostic scan</span>
            </div>
            <div>
              <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-wider block mb-1">DOCUMENTATION</span>
              <span className="text-base sm:text-lg font-bold text-white block">Full NTSA TIMS Transfer</span>
              <span className="text-xs text-zinc-400">Handled directly on site</span>
            </div>
            <div>
              <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-wider block mb-1">WARRANTY CONTINUITY</span>
              <span className="text-base sm:text-lg font-bold text-white block">5,000 KM Written</span>
              <span className="text-xs text-zinc-400">Applied to your new vehicle</span>
            </div>
          </div>
        </div>

        {/* Trade-In Calculator & Match Studio */}
        <div className="space-y-6">
          <div className="max-w-xl space-y-1.5 text-left">
            <span className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-zinc-400 font-semibold block">
              VALUATION STUDIO
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Calculate Your Trade-In Value
            </h2>
            <p className="text-sm text-zinc-400">
              Select your current car specifications to calculate immediate deposit credit against our verified showroom stock.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Your Current Vehicle Inputs (7 Cols) */}
            <div className="lg:col-span-7 relative bg-[#0c0c0f] border border-white/[0.08] p-6 sm:p-8 space-y-6 rounded-2xl text-left">
              
              {/* Make & Model */}
              <div>
                <label className="text-[11px] font-mono uppercase text-zinc-400 block mb-2 font-medium">
                  01. Current Vehicle Model
                </label>
                <input
                  type="text"
                  value={makeModel}
                  onChange={(e) => setMakeModel(e.target.value)}
                  placeholder="e.g. Toyota Fielder / Mazda CX-5 / Subaru Forester"
                  className="w-full px-4 py-2.5 bg-black border border-white/15 rounded-lg text-[16px] sm:text-sm text-white focus:outline-none focus:border-white transition-colors mb-3"
                />

                {/* Popular Models Chips */}
                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="text-[10px] text-zinc-500 font-mono mr-1 uppercase">Sample:</span>
                  {popularModels.map((m) => (
                    <button
                      key={m}
                      type="button"
                      onClick={() => setMakeModel(m)}
                      className={`text-xs px-2.5 py-1 rounded-md transition-all cursor-pointer border ${
                        makeModel === m
                          ? 'bg-white text-zinc-950 font-bold border-white'
                          : 'bg-black text-zinc-400 border-white/10 hover:text-white hover:border-white/25'
                      }`}
                    >
                      {m}
                    </button>
                  ))}
                </div>
              </div>

              {/* Year */}
              <div>
                <label className="text-[11px] font-mono uppercase text-zinc-400 block mb-2 font-medium">
                  02. Year of Manufacture
                </label>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                  {['2023', '2021', '2019', '2018', '2016', '2014'].map((yr) => (
                    <button
                      key={yr}
                      type="button"
                      onClick={() => setYearTier(yr)}
                      className={`py-2 text-xs font-mono rounded-lg transition-all cursor-pointer border ${
                        yearTier === yr
                          ? 'bg-white text-zinc-950 border-white font-bold'
                          : 'bg-black text-zinc-400 border-white/10 hover:text-white hover:border-white/25'
                      }`}
                    >
                      {yr === '2023' ? '2023+' : yr === '2014' ? '<2015' : yr}
                    </button>
                  ))}
                </div>
              </div>

              {/* Mileage */}
              <div>
                <label className="text-[11px] font-mono uppercase text-zinc-400 block mb-2 font-medium">
                  03. Odometer Mileage
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { id: 'low', label: '< 60,000 KM', desc: 'Low Mileage' },
                    { id: 'mid', label: '60k – 110k KM', desc: 'Average' },
                    { id: 'high', label: '110k – 160k KM', desc: 'Active Use' },
                    { id: 'max', label: '160,000+ KM', desc: 'High Mileage' },
                  ].map((m) => (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => setMileageTier(m.id)}
                      className={`p-3 text-left rounded-lg transition-all cursor-pointer border ${
                        mileageTier === m.id
                          ? 'bg-white text-zinc-950 border-white font-bold'
                          : 'bg-black text-zinc-400 border-white/10 hover:text-white hover:border-white/25'
                      }`}
                    >
                      <span className="block font-mono text-xs font-bold">{m.label}</span>
                      <span className={`block text-[10px] mt-0.5 ${mileageTier === m.id ? 'text-zinc-700' : 'text-zinc-500'}`}>{m.desc}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Condition */}
              <div>
                <label className="text-[11px] font-mono uppercase text-zinc-400 block mb-2 font-medium">
                  04. Overall Condition
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    {
                      id: 'excellent',
                      title: 'Pristine',
                      desc: 'Original paint, zero accident history, full service history.'
                    },
                    {
                      id: 'good',
                      title: 'Normal Wear',
                      desc: 'Minor daily patina, sound mechanical and transmission state.'
                    },
                    {
                      id: 'fair',
                      title: 'Needs Service',
                      desc: 'Exterior scratches, suspension or minor wear present.'
                    }
                  ].map((c) => (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => setConditionTier(c.id)}
                      className={`p-4 text-left rounded-xl transition-all cursor-pointer border flex flex-col justify-between ${
                        conditionTier === c.id
                          ? 'bg-zinc-900 text-white border-white shadow-md'
                          : 'bg-black text-zinc-400 border-white/10 hover:text-white hover:border-white/25'
                      }`}
                    >
                      <div>
                        <span className="block text-sm font-bold text-white mb-1">{c.title}</span>
                        <p className="text-xs text-zinc-400 leading-relaxed">{c.desc}</p>
                      </div>
                      <div className="mt-3 flex items-center justify-end">
                        <CheckCircle2 className={`w-4 h-4 ${conditionTier === c.id ? 'text-white' : 'text-transparent'}`} />
                      </div>
                    </button>
                  ))}
                </div>
              </div>

            </div>

            {/* Right Column: Live Match Card (5 Cols) */}
            <div className="lg:col-span-5 bg-[#0c0c0f] border border-white/[0.08] p-6 rounded-2xl lg:sticky lg:top-[90px] space-y-5 text-left">
              
              <div>
                <span className="text-[10.5px] font-mono uppercase tracking-wider text-zinc-400 block mb-1.5 font-semibold">
                  SELECT TARGET UPGRADE:
                </span>
                <div className="relative">
                  <select
                    value={targetCarId}
                    onChange={(e) => setTargetCarId(e.target.value)}
                    className="w-full appearance-none px-4 py-2.5 pr-10 bg-black border border-white/15 rounded-lg text-[16px] sm:text-sm text-white focus:outline-none focus:border-white transition-colors cursor-pointer"
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

              {/* Target Car Preview */}
              <div className="w-full aspect-[16/10] overflow-hidden bg-black relative rounded-xl border border-white/10">
                <SkeletonImage
                  src={targetVehicle.heroImage}
                  alt={targetVehicle.name}
                  className="w-full h-full object-cover"
                  containerClassName="w-full h-full"
                />
                <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                  <span className="bg-black/80 backdrop-blur-md border border-white/15 text-white px-2 py-0.5 text-[10px] font-bold rounded">
                    Grade {targetVehicle.auctionGrade}
                  </span>
                </div>
                <div className="absolute bottom-2.5 left-2.5 right-2.5 bg-black/85 backdrop-blur-md px-3 py-2 border border-white/10 flex items-center justify-between rounded-lg">
                  <span className="text-xs font-bold text-white truncate mr-2">{targetVehicle.name}</span>
                  <span className="font-mono text-xs font-bold text-white shrink-0">KES {targetVehicle.priceKes.toLocaleString()}</span>
                </div>
              </div>

              {/* Equity Ratio Bar */}
              <div className="p-4 bg-zinc-950 border border-white/[0.08] rounded-xl space-y-2.5">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-zinc-400">Equity Covered by Trade-In</span>
                  <span className="text-white font-bold">{animatedEquityPercent}% Covered</span>
                </div>
                <div className="w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-white transition-all duration-300 ease-out"
                    style={{ width: `${animatedEquityPercent}%` }}
                  />
                </div>
                <div className="flex items-center justify-between font-mono text-[10.5px] text-zinc-500">
                  <span>Credit: ~KES {animatedAvg.toLocaleString()}</span>
                  <span>Vehicle: KES {targetVehicle.priceKes.toLocaleString()}</span>
                </div>
              </div>

              {/* Breakdown */}
              <div className="divide-y divide-white/[0.08] text-xs sm:text-sm">
                <div className="py-2.5 flex items-center justify-between">
                  <span className="text-zinc-400">Estimated Trade-In Credit</span>
                  <span className="font-mono font-bold text-white">
                    KES {animatedMin.toLocaleString()} – {animatedMax.toLocaleString()}
                  </span>
                </div>
                <div className="py-2.5 flex items-center justify-between">
                  <span className="text-zinc-400">Target Vehicle Price</span>
                  <span className="font-mono font-bold text-white">
                    KES {targetVehicle.priceKes.toLocaleString()}
                  </span>
                </div>
                <div className="py-3 flex items-baseline justify-between bg-zinc-900/60 px-3 -mx-3 mt-1 rounded-lg">
                  <div>
                    <span className="text-[10.5px] text-zinc-400 uppercase font-bold block">
                      Estimated Balance to Pay
                    </span>
                    <span className="font-mono text-sm sm:text-base font-bold text-white">
                      KES {animatedCashMin.toLocaleString()} – {animatedCashMax.toLocaleString()}
                    </span>
                  </div>
                  <span className="text-[11px] text-zinc-400">Bank finance eligible</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-2">
                <a
                  href={`https://wa.me/254714333888?text=Hello%20Alberka%20Motors,%20I%20checked%20the%20Trade-In%20value%20for%20my%20${encodeURIComponent(makeModel)}%20(${yearTier}).%20Estimated%20Credit:%20KES%20${valuation.min.toLocaleString()}%20-%20${valuation.max.toLocaleString()}.%20I%20am%20interested%20in%20upgrading%20to%20the%20${encodeURIComponent(targetVehicle.name)}%20(${targetVehicle.stockNo}).`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-white py-3 text-xs sm:text-sm font-semibold w-full justify-center inline-flex items-center gap-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Lock In Appraisal on WhatsApp</span>
                </a>

                {onSelectVehicle && (
                  <button
                    type="button"
                    onClick={() => onSelectVehicle(targetVehicle)}
                    className="btn-ghost w-full justify-center py-2 text-xs cursor-pointer inline-flex items-center gap-1.5"
                  >
                    <span>View {targetVehicle.name} Details</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

            </div>

          </div>
        </div>

        {/* 3 Simple Steps */}
        <div className="space-y-8">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-zinc-400 font-semibold block">
              TRANSACTION FLOW
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Trade In Your Car in 3 Steps
            </h2>
            <p className="text-sm text-zinc-400">
              Zero classified haggling. Direct dealer conveyancing in a single visit.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            <div className="relative bg-[#0c0c0f] hover:bg-[#111115] border border-white/[0.08] hover:border-white/25 rounded-2xl overflow-hidden flex flex-col justify-between transition-all duration-400 hover:-translate-y-1 hover:shadow-xl before:absolute before:inset-x-6 before:top-0 before:h-[1px] before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent">
              <div className="aspect-[16/10] w-full overflow-hidden bg-black">
                <img
                  src="https://images.pexels.com/photos/8986138/pexels-photo-8986138.jpeg?auto=compress&cs=tinysrgb&w=1600"
                  alt="20-Minute Mechanical Hoist Inspection"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6 space-y-2">
                <div className="inline-flex items-center gap-2">
                  <span className="text-[10px] font-mono text-zinc-400 uppercase font-bold">STEP 01</span>
                </div>
                <h3 className="text-lg font-bold text-white">20-Minute Hoist Check</h3>
                <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                  Drive into Mombasa or Nairobi. Our technician conducts a hoist inspection and electronic diagnostic scan.
                </p>
              </div>
            </div>

            <div className="relative bg-[#0c0c0f] hover:bg-[#111115] border border-white/[0.08] hover:border-white/25 rounded-2xl overflow-hidden flex flex-col justify-between transition-all duration-400 hover:-translate-y-1 hover:shadow-xl before:absolute before:inset-x-6 before:top-0 before:h-[1px] before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent">
              <div className="aspect-[16/10] w-full overflow-hidden bg-black">
                <img
                  src="https://images.pexels.com/photos/33327689/pexels-photo-33327689.jpeg?auto=compress&cs=tinysrgb&w=1600"
                  alt="Certified Equity Lock"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6 space-y-2">
                <div className="inline-flex items-center gap-2">
                  <span className="text-[10px] font-mono text-zinc-400 uppercase font-bold">STEP 02</span>
                </div>
                <h3 className="text-lg font-bold text-white">Written Valuation Offer</h3>
                <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                  Receive a written appraisal valid for 7 days. The full valuation credits directly towards your new car.
                </p>
              </div>
            </div>

            <div className="relative bg-[#0c0c0f] hover:bg-[#111115] border border-white/[0.08] hover:border-white/25 rounded-2xl overflow-hidden flex flex-col justify-between transition-all duration-400 hover:-translate-y-1 hover:shadow-xl before:absolute before:inset-x-6 before:top-0 before:h-[1px] before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent">
              <div className="aspect-[16/10] w-full overflow-hidden bg-black">
                <img
                  src="https://images.pexels.com/photos/16176579/pexels-photo-16176579.jpeg?auto=compress&cs=tinysrgb&w=1600"
                  alt="Drive Away Same Day"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6 space-y-2">
                <div className="inline-flex items-center gap-2">
                  <span className="text-[10px] font-mono text-zinc-400 uppercase font-bold">STEP 03</span>
                </div>
                <h3 className="text-lg font-bold text-white">Drive Away Same Day</h3>
                <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                  We complete the NTSA TIMS logbook transfer on the spot. Collect your fresh Japanese import with warranty.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* FAQs */}
        <div className="relative bg-[#0c0c0f] border border-white/[0.08] p-8 sm:p-10 rounded-2xl space-y-6 text-left before:absolute before:inset-x-8 before:top-0 before:h-[1px] before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent">
          <div>
            <span className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-zinc-400 font-semibold block mb-1">
              QUESTIONS & ANSWERS
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">Trade-In Guidelines</h2>
          </div>

          <div className="divide-y divide-white/[0.08]">
            {faqs.map((faq, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <div key={idx} className="py-4">
                  <button
                    onClick={() => setActiveFaq(isOpen ? null : idx)}
                    className="w-full flex items-center justify-between text-left cursor-pointer group"
                  >
                    <span className="text-sm sm:text-base font-medium text-white group-hover:text-zinc-300 transition-colors">
                      {faq.q}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-zinc-400 transition-transform duration-200 shrink-0 ml-4 ${
                        isOpen ? 'rotate-180 text-white' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <p className="mt-2 text-xs sm:text-sm text-zinc-400 leading-relaxed max-w-3xl">
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
