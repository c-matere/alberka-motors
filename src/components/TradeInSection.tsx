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
      a: 'Yes. We get an official settlement letter from your bank, pay off the loan balance directly, and apply whatever equity remains toward your new car.'
    },
    {
      q: 'How long is the trade-in valuation valid?',
      a: 'Online estimates give you a realistic range. When you bring the car to our Mombasa or Nairobi showroom for a quick 20-minute check, you get a written valuation valid for 7 days.'
    },
    {
      q: 'Can I trade in my old car against an incoming Japanese shipment?',
      a: 'Yes! Your trade-in value can be credited immediately to reserve any car currently on the ship coming to Mombasa.'
    },
    {
      q: 'What documents do I need to bring?',
      a: 'Just bring your original NTSA TIMS Logbook, your National ID or Passport, and KRA PIN certificate.'
    }
  ];

  return (
    <section className="w-full bg-[#09090b] py-16 sm:py-24 px-6 sm:px-10 text-[#f4f4f5] border-t border-[#27272a]">
      <div className="max-w-[1400px] mx-auto space-y-16">
        
        {/* Section Header */}
        <div className="text-center max-w-[780px] mx-auto">
          <span className="brand-eyebrow block mb-2">
            TRADE-IN & UPGRADE // MOMBASA & NAIROBI
          </span>
          <h1 className="text-[32px] sm:text-[46px] font-bold text-white tracking-tight mb-4">
            Trade In Your Old Car
          </h1>
          <p className="text-[16px] sm:text-[18px] text-[#a1a1aa] leading-relaxed">
            Turn your current car keys into immediate deposit equity. Avoid online classified headaches and tire-kickers. Upgrade into a clean Japanese import backed by our 5,000 km warranty.
          </p>
        </div>

        {/* Video Banner */}
        <div className="relative w-full mx-auto">
          <div className="w-full h-[320px] sm:h-[420px] md:h-[480px] overflow-hidden relative bg-[#121215] border border-[#27272a] rounded-[4px]">
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

            <div className="absolute inset-0 bg-gradient-to-t from-[#09090b] via-[#09090b]/30 to-transparent flex flex-col justify-end p-6 sm:p-10 text-white">
              <div className="inline-flex items-center gap-2 mb-1">
                <span className="w-1.5 h-1.5 rounded-full bg-red-600" />
                <span className="font-mono text-[11px] text-zinc-400 uppercase tracking-wider font-semibold">
                  TANGANA ROAD, MOMBASA // WESTLANDS, NAIROBI
                </span>
              </div>
              <p className="text-[20px] sm:text-[26px] font-bold text-white leading-snug max-w-[620px]">
                Quick 20-minute inspection. Full legal transfer. Drive away same day.
              </p>
            </div>

            <div className="absolute top-4 right-4 flex items-center gap-2 z-20">
              <button
                onClick={togglePlay}
                className="w-8 h-8 bg-[#09090b]/80 hover:bg-[#18181c] border border-[#27272a] flex items-center justify-center text-white transition-all cursor-pointer rounded-[3px]"
                title={isPlaying ? 'Pause' : 'Play'}
              >
                {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 ml-0.5" />}
              </button>
              <button
                onClick={toggleMute}
                className="w-8 h-8 bg-[#09090b]/80 hover:bg-[#18181c] border border-[#27272a] flex items-center justify-center text-white transition-all cursor-pointer rounded-[3px]"
                title={isMuted ? 'Unmute' : 'Mute'}
              >
                {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          <div className="bg-[#121215] border border-[#27272a] p-6 sm:p-8 max-w-[960px] mx-auto -mt-8 relative z-20 rounded-[4px] shadow-2xl">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-left">
              <div>
                <span className="font-mono text-[10px] text-[#71717a] uppercase tracking-wider block mb-1">INSPECTION TIME</span>
                <span className="text-[15px] font-bold text-white">20-Minute Check</span>
              </div>
              <div>
                <span className="font-mono text-[10px] text-[#71717a] uppercase tracking-wider block mb-1">PAPERWORK</span>
                <span className="text-[15px] font-bold text-white">Full NTSA TIMS Transfer</span>
              </div>
              <div>
                <span className="font-mono text-[10px] text-[#71717a] uppercase tracking-wider block mb-1">WARRANTY</span>
                <span className="text-[15px] font-bold text-white">5,000 KM on Upgraded Car</span>
              </div>
            </div>
          </div>
        </div>

        {/* Trade-In Calculator & Match Studio */}
        <div className="space-y-6">
          <div>
            <span className="brand-eyebrow block mb-1">INSTANT TRADE CALCULATOR</span>
            <h2 className="text-[26px] sm:text-[34px] font-bold text-white tracking-tight">
              Calculate Your Trade-In Value
            </h2>
            <p className="text-[15px] text-[#a1a1aa] mt-1 max-w-[600px]">
              Select your current car details below and match against any car in our showroom.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Your Current Vehicle Inputs (7 Cols) */}
            <div className="lg:col-span-7 bg-[#121215] border border-[#27272a] p-6 sm:p-8 space-y-6 rounded-[4px]">
              
              {/* Make & Model */}
              <div>
                <label className="text-[12px] font-mono uppercase text-[#a1a1aa] block mb-2 font-medium">
                  1. Current Car Make & Model
                </label>
                <input
                  type="text"
                  value={makeModel}
                  onChange={(e) => setMakeModel(e.target.value)}
                  placeholder="e.g. Toyota Fielder / Mazda CX-5 / Subaru Forester"
                  className="w-full px-4 py-2.5 bg-[#09090b] border border-[#27272a] rounded-[3px] text-[14px] text-white focus:outline-none focus:border-white focus:ring-1 focus:ring-white mb-3"
                />

                {/* Popular Models Pills */}
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[11px] text-[#71717a] font-mono mr-1">Popular:</span>
                  {popularModels.map((m) => (
                    <button
                      key={m}
                      type="button"
                      onClick={() => setMakeModel(m)}
                      className={`text-[11.5px] px-3 py-1 rounded-[2px] transition-all cursor-pointer ${
                        makeModel === m
                          ? 'bg-white text-zinc-950 font-bold'
                          : 'bg-[#18181c] text-[#a1a1aa] border border-[#27272a] hover:text-white'
                      }`}
                    >
                      {m}
                    </button>
                  ))}
                </div>
              </div>

              {/* Year */}
              <div>
                <label className="text-[12px] font-mono uppercase text-[#a1a1aa] block mb-2 font-medium">
                  2. Year of Manufacture
                </label>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                  {['2023', '2021', '2019', '2018', '2016', '2014'].map((yr) => (
                    <button
                      key={yr}
                      type="button"
                      onClick={() => setYearTier(yr)}
                      className={`py-2 text-[12px] font-mono rounded-[2px] transition-all cursor-pointer border ${
                        yearTier === yr
                          ? 'bg-white text-zinc-950 border-white font-bold'
                          : 'bg-[#09090b] text-[#a1a1aa] border-[#27272a] hover:text-white'
                      }`}
                    >
                      {yr === '2023' ? '2023+' : yr === '2014' ? '<2015' : yr}
                    </button>
                  ))}
                </div>
              </div>

              {/* Mileage */}
              <div>
                <label className="text-[12px] font-mono uppercase text-[#a1a1aa] block mb-2 font-medium">
                  3. Current Odometer Mileage
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
                      className={`p-3 text-left rounded-[2px] transition-all cursor-pointer border ${
                        mileageTier === m.id
                          ? 'bg-white text-zinc-950 border-white font-bold'
                          : 'bg-[#09090b] text-[#a1a1aa] border-[#27272a] hover:text-white'
                      }`}
                    >
                      <span className="block font-mono text-[12px] font-bold">{m.label}</span>
                      <span className={`block text-[10.5px] mt-0.5 ${mileageTier === m.id ? 'text-zinc-700' : 'text-[#71717a]'}`}>{m.desc}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Condition */}
              <div>
                <label className="text-[12px] font-mono uppercase text-[#a1a1aa] block mb-2 font-medium">
                  4. Vehicle Condition
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    {
                      id: 'excellent',
                      title: 'Excellent',
                      desc: 'Clean original paint, no accident history, full service record.'
                    },
                    {
                      id: 'good',
                      title: 'Good / Normal',
                      desc: 'Minor daily wear, good engine and gearbox condition.'
                    },
                    {
                      id: 'fair',
                      title: 'Needs Work',
                      desc: 'Paint scratches, dents, or suspension repairs needed.'
                    }
                  ].map((c) => (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => setConditionTier(c.id)}
                      className={`p-4 text-left rounded-[2px] transition-all cursor-pointer border flex flex-col justify-between ${
                        conditionTier === c.id
                          ? 'bg-[#18181c] text-white border-white'
                          : 'bg-[#09090b] text-[#a1a1aa] border-[#27272a] hover:text-white'
                      }`}
                    >
                      <div>
                        <span className="block text-[14px] font-bold text-white mb-1">{c.title}</span>
                        <p className="text-[12px] text-[#a1a1aa] leading-relaxed">{c.desc}</p>
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
            <div className="lg:col-span-5 bg-[#121215] border border-[#27272a] p-6 rounded-[4px] relative lg:sticky lg:top-[90px] space-y-5">
              
              <div>
                <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-300 block mb-1 font-semibold">
                  CHOOSE CAR TO UPGRADE TO:
                </span>
                <div className="relative mt-1">
                  <select
                    value={targetCarId}
                    onChange={(e) => setTargetCarId(e.target.value)}
                    className="w-full appearance-none px-4 py-2.5 pr-10 bg-[#09090b] border border-[#27272a] rounded-[3px] text-[13px] text-white focus:outline-none focus:border-white focus:ring-1 focus:ring-white cursor-pointer"
                  >
                    {vehicles.map((v) => (
                      <option key={v.id} value={v.id}>
                        {v.name} ({v.stockNo}) — KES {v.priceKes.toLocaleString()}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="w-4 h-4 text-[#a1a1aa] absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              {/* Target Car Preview */}
              <div className="w-full h-[180px] sm:h-[210px] overflow-hidden bg-[#09090b] relative rounded-[3px] border border-[#27272a]">
                <SkeletonImage
                  src={targetVehicle.heroImage}
                  alt={targetVehicle.name}
                  className="w-full h-full object-cover"
                  containerClassName="w-full h-full"
                />
                <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                  <span className="bg-zinc-900 border border-zinc-700 text-white px-2 py-0.5 text-[10px] font-bold rounded-[2px]">
                    Grade {targetVehicle.auctionGrade}
                  </span>
                </div>
                <div className="absolute bottom-2.5 left-2.5 right-2.5 bg-[#09090b]/95 px-3 py-2 border border-[#27272a] flex items-center justify-between rounded-[2px]">
                  <span className="text-[12px] font-bold text-white">{targetVehicle.name}</span>
                  <span className="font-mono text-[13px] font-bold text-white">KES {targetVehicle.priceKes.toLocaleString()}</span>
                </div>
              </div>

              {/* Equity Ratio Bar */}
              <div className="p-4 bg-[#18181c] border border-[#27272a] rounded-[3px] space-y-2.5">
                <div className="flex items-center justify-between text-[12px] font-mono">
                  <span className="text-[#a1a1aa]">Deposit Covered by Trade-In</span>
                  <span className="text-white font-bold">{animatedEquityPercent}% Covered</span>
                </div>
                <div className="w-full h-2 bg-[#09090b] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-white transition-all duration-300 ease-out"
                    style={{ width: `${animatedEquityPercent}%` }}
                  />
                </div>
                <div className="flex items-center justify-between font-mono text-[11px] text-[#71717a]">
                  <span>Your Credit: ~KES {animatedAvg.toLocaleString()}</span>
                  <span>Car Price: KES {targetVehicle.priceKes.toLocaleString()}</span>
                </div>
              </div>

              {/* Breakdown */}
              <div className="divide-y divide-[#27272a] text-[13px]">
                <div className="py-2 flex items-center justify-between">
                  <span className="text-[#a1a1aa]">Estimated Trade-in Credit</span>
                  <span className="font-mono font-bold text-white">
                    KES {animatedMin.toLocaleString()} – {animatedMax.toLocaleString()}
                  </span>
                </div>
                <div className="py-2 flex items-center justify-between">
                  <span className="text-[#a1a1aa]">Selected Car Price</span>
                  <span className="font-mono font-bold text-white">
                    KES {targetVehicle.priceKes.toLocaleString()}
                  </span>
                </div>
                <div className="py-2.5 flex items-baseline justify-between bg-[#18181c] px-3 -mx-3 mt-1 rounded-[2px]">
                  <div>
                    <span className="text-[11px] text-zinc-400 uppercase font-bold block">
                      Estimated Balance to Pay
                    </span>
                    <span className="font-mono text-[16px] font-bold text-white">
                      KES {animatedCashMin.toLocaleString()} – {animatedCashMax.toLocaleString()}
                    </span>
                  </div>
                  <span className="text-[11px] text-[#a1a1aa]">Bank financing available</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-2">
                <a
                  href={`https://wa.me/254714333888?text=Hello%20Alberka%20Motors,%20I%20checked%20the%20Trade-In%20value%20for%20my%20${encodeURIComponent(makeModel)}%20(${yearTier}).%20Estimated%20Credit:%20KES%20${valuation.min.toLocaleString()}%20-%20${valuation.max.toLocaleString()}.%20I%20am%20interested%20in%20upgrading%20to%20the%20${encodeURIComponent(targetVehicle.name)}%20(${targetVehicle.stockNo}).`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-white font-semibold w-full justify-center !py-3 text-[13px]"
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  <span>Lock in Valuation on WhatsApp</span>
                </a>

                {onSelectVehicle && (
                  <button
                    type="button"
                    onClick={() => onSelectVehicle(targetVehicle)}
                    className="btn-ghost w-full justify-center !py-2 text-[12px] cursor-pointer"
                  >
                    <span>View {targetVehicle.name} Details</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                  </button>
                )}
              </div>

            </div>

          </div>
        </div>

        {/* 3 Simple Steps */}
        <div>
          <div className="text-center max-w-[700px] mx-auto mb-12 space-y-2">
            <span className="brand-eyebrow block">HOW IT WORKS</span>
            <h2 className="text-[26px] sm:text-[34px] font-bold text-white tracking-tight">
              Trade In Your Car in 3 Easy Steps
            </h2>
            <p className="text-[15px] text-[#a1a1aa]">
              No back-and-forth arguments. No bounced checks. Transparent trade-ins in one visit.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#121215] border border-[#27272a] rounded-[4px] overflow-hidden flex flex-col justify-between">
              <div className="h-[200px] w-full overflow-hidden bg-[#09090b]">
                <img
                  src="https://images.pexels.com/photos/8986138/pexels-photo-8986138.jpeg?auto=compress&cs=tinysrgb&w=1600"
                  alt="20-Minute Mechanical Hoist Inspection"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6 space-y-2">
                <div className="inline-flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-600" />
                  <span className="text-[11px] font-mono text-zinc-400 uppercase font-bold">STEP 01</span>
                </div>
                <h3 className="text-[18px] font-bold text-white">20-Minute Check</h3>
                <p className="text-[14px] text-[#a1a1aa] leading-relaxed">
                  Drive into our Mombasa or Nairobi showroom. Our technician inspects your car on the hoist and runs a computer scan.
                </p>
              </div>
            </div>

            <div className="bg-[#121215] border border-[#27272a] rounded-[4px] overflow-hidden flex flex-col justify-between">
              <div className="h-[200px] w-full overflow-hidden bg-[#09090b]">
                <img
                  src="https://images.pexels.com/photos/33327689/pexels-photo-33327689.jpeg?auto=compress&cs=tinysrgb&w=1600"
                  alt="Certified Equity Lock"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6 space-y-2">
                <div className="inline-flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-600" />
                  <span className="text-[11px] font-mono text-zinc-400 uppercase font-bold">STEP 02</span>
                </div>
                <h3 className="text-[18px] font-bold text-white">Fair Written Offer</h3>
                <p className="text-[14px] text-[#a1a1aa] leading-relaxed">
                  You get a clear written valuation valid for 7 days. The full amount is credited directly toward your chosen showroom car.
                </p>
              </div>
            </div>

            <div className="bg-[#121215] border border-[#27272a] rounded-[4px] overflow-hidden flex flex-col justify-between">
              <div className="h-[200px] w-full overflow-hidden bg-[#09090b]">
                <img
                  src="https://images.pexels.com/photos/16176579/pexels-photo-16176579.jpeg?auto=compress&cs=tinysrgb&w=1600"
                  alt="Drive Away Same Day"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6 space-y-2">
                <div className="inline-flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-600" />
                  <span className="text-[11px] font-mono text-zinc-400 uppercase font-bold">STEP 03</span>
                </div>
                <h3 className="text-[18px] font-bold text-white">Drive Away Same Day</h3>
                <p className="text-[14px] text-[#a1a1aa] leading-relaxed">
                  We handle the NTSA TIMS logbook transfer on the spot. You collect your new Japanese import with its 5,000 km warranty.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* FAQs */}
        <div className="bg-[#121215] border border-[#27272a] p-6 sm:p-10 rounded-[4px] space-y-6">
          <div>
            <span className="brand-eyebrow mb-1 block">FREQUENTLY ASKED QUESTIONS</span>
            <h2 className="text-[24px] font-bold text-white">Common Questions About Trade-Ins</h2>
          </div>

          <div className="divide-y divide-[#27272a]">
            {faqs.map((faq, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <div key={idx} className="py-4">
                  <button
                    onClick={() => setActiveFaq(isOpen ? null : idx)}
                    className="w-full flex items-center justify-between text-left cursor-pointer group"
                  >
                    <span className="text-[15px] font-medium text-white group-hover:text-zinc-300 transition-colors">
                      {faq.q}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-[#a1a1aa] transition-transform duration-200 shrink-0 ml-4 ${
                        isOpen ? 'rotate-180 text-white' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <p className="mt-2.5 text-[14px] text-[#a1a1aa] leading-relaxed">
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
