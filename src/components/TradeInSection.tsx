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

  const animatedMin = useAnimatedNumber(valuation.min, 500);
  const animatedMax = useAnimatedNumber(valuation.max, 500);
  const animatedAvg = useAnimatedNumber(avgTradeCredit, 500);
  const animatedCashMin = useAnimatedNumber(remainingCashMin, 500);
  const animatedCashMax = useAnimatedNumber(remainingCashMax, 500);
  const animatedEquityPercent = useAnimatedNumber(equityPercent, 450);

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
      q: 'Can I exchange a motor car currently under active bank logbook financing?',
      a: 'Yes. Our legal conveyancing desk communicates directly with your financier to procure an official settlement statement. We clear the outstanding balance directly and apply all residual equity towards your chosen showroom marque.'
    },
    {
      q: 'For what duration is the preliminary appraisal binding?',
      a: 'Online figures reflect live clearing values. Upon completion of our 20-minute hydraulic hoist evaluation at our Mombasa or Nairobi atelier, you receive a written binding valuation letter valid for 7 calendar days.'
    },
    {
      q: 'May I reserve a maritime consignment currently at sea using my exchange equity?',
      a: 'Certainly. Your trade equity can be credited immediately against any incoming Japanese vessel shipment currently bound for the Port of Mombasa.'
    },
    {
      q: 'What legal documentation is required for the appraisal ceremony?',
      a: 'Please present your original NTSA TIMS Logbook, National Identification or Passport, KRA PIN certificate, and any verified Japanese or local maintenance records.'
    }
  ];

  return (
    <section className="w-full bg-[#160a1d] py-20 sm:py-28 px-6 text-[#f5f5f7] border-t border-[rgba(197,168,128,0.18)]">
      <div className="max-w-[1400px] mx-auto space-y-20">
        
        {/* 1. HERO OPENING */}
        <div className="text-center max-w-[800px] mx-auto">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="h-[1px] w-6 bg-[rgba(197,168,128,0.4)]" />
            <span className="rr-eyebrow">
              EQUITY APPRAISAL & BESPOKE UPGRADE // MOMBASA & NAIROBI
            </span>
            <div className="h-[1px] w-6 bg-[rgba(197,168,128,0.4)]" />
          </div>
          <h1 className="rr-title-h1 text-[32px] sm:text-[46px] md:text-[54px] mb-4">
            THE BESPOKE EXCHANGE ATELIER.
          </h1>
          <p className="text-[#dfc7a5] font-['Cormorant_Garamond'] text-[18px] sm:text-[21px] italic leading-relaxed max-w-[700px] mx-auto">
            Convert your current motor car keys into immediate deposit equity. Eliminate retail friction, tire-kickers, and prolonged classifieds. Transition seamlessly into verified Japanese provenance backed by our 5,000 km warranty covenant.
          </p>
        </div>

        {/* 2. VIDEO STAGE (Zero Radius, Hairline Rose Gold Inlay) */}
        <div className="relative w-full mx-auto">
          <div className="w-full h-[360px] sm:h-[440px] md:h-[500px] overflow-hidden relative bg-[#080809] border border-[rgba(197,168,128,0.3)]">
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

            {/* Gradient Scrim & Aristocratic Typography */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0f0714] via-[#0f0714]/30 to-transparent flex flex-col justify-end p-8 sm:p-12 text-[#f5f5f7]">
              <span className="font-['Cinzel'] text-[10px] text-[#c5a880] uppercase tracking-[0.25em] mb-2">
                TANGANA ROAD ATELIER // WESTLANDS PRIVATE SUITE
              </span>
              <p className="font-['Cinzel'] text-[18px] sm:text-[24px] font-normal leading-snug text-[#f5f5f7] tracking-wider uppercase max-w-[650px]">
                "A pristine 20-minute hoist appraisal. Full legal indemnity. Same-day handover."
              </p>
            </div>

            {/* Video Controls */}
            <div className="absolute top-4 right-4 flex items-center gap-2 z-20">
              <button
                onClick={togglePlay}
                className="w-8 h-8 bg-[#0f0714]/80 hover:bg-[#160a1d] border border-[rgba(197,168,128,0.3)] flex items-center justify-center text-[#c5a880] transition-all cursor-pointer"
                title={isPlaying ? 'Pause motion' : 'Play motion'}
              >
                {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 ml-0.5" />}
              </button>
              <button
                onClick={toggleMute}
                className="w-8 h-8 bg-[#0f0714]/80 hover:bg-[#160a1d] border border-[rgba(197,168,128,0.3)] flex items-center justify-center text-[#c5a880] transition-all cursor-pointer"
                title={isMuted ? 'Unmute' : 'Mute'}
              >
                {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          {/* Hard 0px Capsule Strip */}
          <div className="bg-[#131316] border border-[rgba(197,168,128,0.35)] p-6 sm:p-8 max-w-[960px] mx-auto -mt-10 relative z-20">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-left">
              <div>
                <span className="font-['Cinzel'] text-[9.5px] text-[#8c8a94] uppercase tracking-wider block mb-1">HOIST EVALUATION</span>
                <span className="font-['Cinzel'] text-[14px] text-[#f5f5f7]">20-Minute Protocol</span>
              </div>
              <div>
                <span className="font-['Cinzel'] text-[9.5px] text-[#8c8a94] uppercase tracking-wider block mb-1">LEGAL CONVEYANCING</span>
                <span className="font-['Cinzel'] text-[14px] text-[#f5f5f7]">100% NTSA TIMS Indemnity</span>
              </div>
              <div>
                <span className="font-['Cinzel'] text-[9.5px] text-[#8c8a94] uppercase tracking-wider block mb-1">HANDOVER COVENANT</span>
                <span className="font-['Cinzel'] text-[14px] text-[#c5a880]">5,000 KM Written Warranty</span>
              </div>
            </div>
          </div>
        </div>

        {/* 3. SPLIT-SCREEN TRADE-UP ATELIER */}
        <div className="space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-2">
              <span className="rr-eyebrow block">REAL-TIME APPRAISAL ATELIER</span>
              <h2 className="rr-title-h2 text-[26px] sm:text-[34px]">
                CONFIGURE YOUR UPGRADE.
              </h2>
            </div>
            <p className="text-[14px] text-[#8c8a94] max-w-[460px] font-light">
              Calibrate your current vehicle profile and match it in real time against any Grade 4.5+ marque in our showroom repository.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Your Current Vehicle Inputs (7 Cols) */}
            <div className="lg:col-span-7 bg-[#131316] border border-[rgba(197,168,128,0.25)] p-6 sm:p-8 space-y-6">
              
              {/* Make & Model */}
              <div>
                <label className="font-['Cinzel'] text-[10px] text-[#c5a880] uppercase tracking-wider block mb-2">
                  01 // CURRENT MOTOR CAR MAKE & MODEL
                </label>
                <input
                  type="text"
                  value={makeModel}
                  onChange={(e) => setMakeModel(e.target.value)}
                  placeholder="E.G. TOYOTA FIELDER / MAZDA CX-5 / SUBARU FORESTER"
                  className="w-full px-4 py-2.5 bg-[#0f0714] border border-[rgba(197,168,128,0.25)] text-[12px] font-['Cinzel'] tracking-wider text-[#f5f5f7] focus:outline-none focus:border-[#dfc7a5] mb-3"
                />

                {/* Quick Model Pills */}
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-['Cinzel'] text-[10px] text-[#8c8a94] mr-1 uppercase">FREQUENT:</span>
                  {popularModels.map((m) => (
                    <button
                      key={m}
                      type="button"
                      onClick={() => setMakeModel(m)}
                      className={`text-[10px] font-['Cinzel'] tracking-wider px-3 py-1 border transition-all cursor-pointer ${
                        makeModel === m
                          ? 'bg-[#c5a880] text-[#0f0714] border-[#c5a880] font-medium'
                          : 'bg-[#0f0714] text-[#8c8a94] border-[rgba(255,255,255,0.06)] hover:text-[#f5f5f7]'
                      }`}
                    >
                      {m}
                    </button>
                  ))}
                </div>
              </div>

              {/* Year of Manufacture Segmented Pills */}
              <div>
                <label className="font-['Cinzel'] text-[10px] text-[#c5a880] uppercase tracking-wider block mb-2">
                  02 // YEAR OF MANUFACTURE
                </label>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                  {['2023', '2021', '2019', '2018', '2016', '2014'].map((yr) => (
                    <button
                      key={yr}
                      type="button"
                      onClick={() => setYearTier(yr)}
                      className={`py-2 text-[11px] font-mono transition-all cursor-pointer border ${
                        yearTier === yr
                          ? 'bg-[#0f0714] text-[#c5a880] border-[#c5a880]'
                          : 'bg-[#0f0714] text-[#8c8a94] border-[rgba(255,255,255,0.06)] hover:text-[#f5f5f7]'
                      }`}
                    >
                      {yr === '2023' ? '2023+' : yr === '2014' ? '<2015' : yr}
                    </button>
                  ))}
                </div>
              </div>

              {/* Odometer Mileage */}
              <div>
                <label className="font-['Cinzel'] text-[10px] text-[#c5a880] uppercase tracking-wider block mb-2">
                  03 // ODOMETER DISTANCE
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { id: 'low', label: '< 60,000 KM', desc: 'Minimal Use' },
                    { id: 'mid', label: '60k – 110k KM', desc: 'Standard' },
                    { id: 'high', label: '110k – 160k KM', desc: 'Active' },
                    { id: 'max', label: '160,000+ KM', desc: 'Extensive' },
                  ].map((m) => (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => setMileageTier(m.id)}
                      className={`p-3 text-left transition-all cursor-pointer border ${
                        mileageTier === m.id
                          ? 'bg-[#0f0714] text-[#f5f5f7] border-[#c5a880]'
                          : 'bg-[#0f0714] text-[#8c8a94] border-[rgba(255,255,255,0.06)] hover:text-[#f5f5f7]'
                      }`}
                    >
                      <span className="block font-mono text-[11px] font-medium">{m.label}</span>
                      <span className="block font-['Cinzel'] text-[9px] text-[#8c8a94] tracking-wider uppercase mt-0.5">
                        {m.desc}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Cosmetic & Mechanical Condition */}
              <div>
                <label className="font-['Cinzel'] text-[10px] text-[#c5a880] uppercase tracking-wider block mb-2">
                  04 // MECHANICAL & COSMETIC CONDITION
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    {
                      id: 'excellent',
                      title: 'Pristine Original',
                      desc: 'Factory paintwork, zero incident history, agent service dossier.'
                    },
                    {
                      id: 'good',
                      title: 'Normal Patina',
                      desc: 'Minor cosmetic stone chips, sound engine compression.'
                    },
                    {
                      id: 'fair',
                      title: 'Requires Service',
                      desc: 'Clearcoat wear, bumper stone chips, or minor suspension renewal needed.'
                    }
                  ].map((c) => (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => setConditionTier(c.id)}
                      className={`p-4 text-left transition-all cursor-pointer border flex flex-col justify-between ${
                        conditionTier === c.id
                          ? 'bg-[#0f0714] text-[#f5f5f7] border-[#c5a880]'
                          : 'bg-[#0f0714] text-[#8c8a94] border-[rgba(255,255,255,0.06)] hover:text-[#f5f5f7]'
                      }`}
                    >
                      <div>
                        <span className="block font-['Cinzel'] text-[12px] font-normal text-[#f5f5f7] uppercase mb-1">{c.title}</span>
                        <p className="text-[11px] text-[#8c8a94] leading-relaxed font-light">
                          {c.desc}
                        </p>
                      </div>
                      <div className="mt-3 flex items-center justify-end">
                        <CheckCircle2 className={`w-3.5 h-3.5 ${conditionTier === c.id ? 'text-[#c5a880]' : 'text-transparent'}`} />
                      </div>
                    </button>
                  ))}
                </div>
              </div>

            </div>

            {/* Right Column: Live Cinematic Exchange Card (5 Cols) */}
            <div className="lg:col-span-5 bg-[#131316] border border-[rgba(197,168,128,0.3)] p-6 relative lg:sticky lg:top-[80px] space-y-6">
              
              <div>
                <span className="rr-eyebrow mb-1 block">TARGET MARQUE MATCH</span>
                <div className="relative mt-2">
                  <select
                    value={targetCarId}
                    onChange={(e) => setTargetCarId(e.target.value)}
                    className="w-full appearance-none px-4 py-2.5 pr-10 bg-[#0f0714] border border-[rgba(197,168,128,0.25)] text-[12px] font-['Cinzel'] tracking-wider text-[#f5f5f7] focus:outline-none focus:border-[#dfc7a5] cursor-pointer"
                  >
                    {vehicles.map((v) => (
                      <option key={v.id} value={v.id}>
                        {v.name} ({v.stockNo}) — KES {v.priceKes.toLocaleString()}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="w-4 h-4 text-[#8c8a94] absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              {/* Photo of Selected Vehicle */}
              <div className="w-full h-[200px] sm:h-[230px] overflow-hidden bg-[#080809] relative group border border-[rgba(197,168,128,0.2)]">
                <SkeletonImage
                  src={targetVehicle.heroImage}
                  alt={targetVehicle.name}
                  className="transition-transform duration-700 ease-out group-hover:scale-105"
                  containerClassName="w-full h-full"
                />
                <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                  <span className="bg-[#0f0714]/90 backdrop-blur-md px-2.5 py-0.5 font-['Cinzel'] text-[9.5px] text-[#dfc7a5] border border-[rgba(197,168,128,0.25)]">
                    GRADE {targetVehicle.auctionGrade}
                  </span>
                  <span className="bg-[#0f0714]/90 backdrop-blur-md px-2.5 py-0.5 font-['Cinzel'] text-[9.5px] text-[#8c8a94] border border-[rgba(255,255,255,0.06)]">
                    {targetVehicle.status}
                  </span>
                </div>
                <div className="absolute bottom-2.5 left-2.5 right-2.5 bg-[#0f0714]/95 backdrop-blur-md px-3.5 py-2 border border-[rgba(197,168,128,0.2)] flex items-center justify-between">
                  <div>
                    <span className="font-['Cinzel'] text-[11px] text-[#f5f5f7] uppercase tracking-wider">{targetVehicle.name}</span>
                  </div>
                  <span className="font-mono text-[12px] text-[#c5a880]">KES {targetVehicle.priceKes.toLocaleString()}</span>
                </div>
              </div>

              {/* Equity Progress Bar */}
              <div className="p-4 bg-[#0f0714] border border-[rgba(197,168,128,0.2)] space-y-3">
                <div className="flex items-center justify-between text-[11px] font-['Cinzel'] tracking-wider">
                  <span className="text-[#8c8a94]">TRADE EQUITY RATIO</span>
                  <span className="text-[#c5a880]">{animatedEquityPercent}% COVERED</span>
                </div>
                <div className="w-full h-1.5 bg-[#160a1d] overflow-hidden">
                  <div
                    className="h-full bg-[#c5a880] transition-all duration-500 ease-out"
                    style={{ width: `${animatedEquityPercent}%` }}
                  />
                </div>
                <div className="flex items-center justify-between font-mono text-[10.5px] text-[#8c8a94]">
                  <span>Credit: ~KES {animatedAvg.toLocaleString()}</span>
                  <span>Target: KES {targetVehicle.priceKes.toLocaleString()}</span>
                </div>
              </div>

              {/* Financial Calculation Breakdown */}
              <div className="divide-y divide-[rgba(197,168,128,0.15)] text-[13px]">
                <div className="py-2.5 flex items-center justify-between">
                  <span className="font-['Cinzel'] text-[10px] text-[#8c8a94] uppercase tracking-wider">ESTIMATED TRADE CREDIT</span>
                  <span className="font-mono text-[#f5f5f7]">
                    KES {animatedMin.toLocaleString()} – {animatedMax.toLocaleString()}
                  </span>
                </div>
                <div className="py-2.5 flex items-center justify-between">
                  <span className="font-['Cinzel'] text-[10px] text-[#8c8a94] uppercase tracking-wider">TARGET ACQUISITION VALUE</span>
                  <span className="font-mono text-[#f5f5f7]">
                    KES {targetVehicle.priceKes.toLocaleString()}
                  </span>
                </div>
                <div className="py-3 flex items-baseline justify-between bg-[#0f0714] -mx-3 px-3 mt-1">
                  <div>
                    <span className="font-['Cinzel'] text-[9.5px] text-[#c5a880] uppercase tracking-wider block">
                      REMAINING CASH BALANCE REQUIRED
                    </span>
                    <span className="font-mono text-[16px] text-[#dfc7a5]">
                      KES {animatedCashMin.toLocaleString()} – {animatedCashMax.toLocaleString()}
                    </span>
                  </div>
                  <span className="font-mono text-[10px] text-[#8c8a94] border border-[rgba(197,168,128,0.3)] px-2 py-0.5">
                    Net Balance
                  </span>
                </div>
              </div>

              {/* Conversion Buttons */}
              <div className="space-y-3 pt-2">
                <a
                  href={`https://wa.me/254714333888?text=Salutations%20Alberka%20Motors.%20I%20used%20your%20Trade-In%20Atelier%20for%20my%20${encodeURIComponent(makeModel)}%20(${yearTier}).%20Preliminary%20Trade%20Credit:%20KES%20${valuation.min.toLocaleString()}%20-%20${valuation.max.toLocaleString()}.%20Upgrading%20to:%20${encodeURIComponent(targetVehicle.name)}%20(${targetVehicle.stockNo}).`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-rr-solid w-full justify-center !py-3 text-[11px]"
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  <span>LOCK IN VALUATION ON WHATSAPP</span>
                </a>

                {onSelectVehicle && (
                  <button
                    type="button"
                    onClick={() => onSelectVehicle(targetVehicle)}
                    className="btn-rr-ghost w-full justify-center !py-2.5 text-[11px] cursor-pointer"
                  >
                    <span>INSPECT {targetVehicle.name} DOSSIER</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                  </button>
                )}
              </div>

              <div className="text-center">
                <span className="font-['Cinzel'] text-[9px] text-[#8c8a94] tracking-widest uppercase">
                  Binding formal certificate issued after 20-min mechanical check.
                </span>
              </div>

            </div>

          </div>
        </div>

        {/* 4. THE 3 PHASES OF THE EXCHANGE */}
        <div>
          <div className="text-center max-w-[700px] mx-auto mb-16 space-y-2">
            <span className="rr-eyebrow block">THE HANDOVER ARCHITECTURE</span>
            <h2 className="rr-title-h2 text-[26px] sm:text-[34px]">
              HOW THE TRADE EXCHANGE OPERATES.
            </h2>
            <p className="text-[#dfc7a5] font-['Cormorant_Garamond'] text-[17px] italic">
              No protracted negotiations. No dealing with unverified bank drafts. Complete handover in 3 structured phases.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Phase 1 */}
            <div className="bg-[#131316] border border-[rgba(197,168,128,0.25)] flex flex-col justify-between overflow-hidden">
              <div className="h-[220px] w-full overflow-hidden bg-[#080809]">
                <img
                  src="https://images.pexels.com/photos/8986138/pexels-photo-8986138.jpeg?auto=compress&cs=tinysrgb&w=1600"
                  alt="20-Minute Mechanical Hoist Inspection"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6 space-y-3">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-['Cinzel'] text-[10px] text-[#c5a880] uppercase tracking-widest">PHASE 01</span>
                  <span className="font-['Cinzel'] text-[10px] text-[#8c8a94] uppercase">TANGANA RD / MWANZI RD</span>
                </div>
                <h3 className="font-['Cinzel'] text-[18px] text-[#f5f5f7] tracking-wider uppercase">
                  20-Minute Hoist Diagnostics
                </h3>
                <p className="text-[13.5px] text-[#8c8a94] leading-relaxed font-light">
                  Drive into our Mombasa or Nairobi bays. Our senior engineer hoists your motor car, measures brake rotor tolerances, inspects underbody chassis rails, and runs an OBD-II diagnostic.
                </p>
              </div>
            </div>

            {/* Phase 2 */}
            <div className="bg-[#131316] border border-[rgba(197,168,128,0.25)] flex flex-col justify-between overflow-hidden">
              <div className="h-[220px] w-full overflow-hidden bg-[#080809]">
                <img
                  src="https://images.pexels.com/photos/33327689/pexels-photo-33327689.jpeg?auto=compress&cs=tinysrgb&w=1600"
                  alt="Certified Equity Lock"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6 space-y-3">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-['Cinzel'] text-[10px] text-[#c5a880] uppercase tracking-widest">PHASE 02</span>
                  <span className="font-['Cinzel'] text-[10px] text-[#8c8a94] uppercase">BINDING 7 DAYS</span>
                </div>
                <h3 className="font-['Cinzel'] text-[18px] text-[#f5f5f7] tracking-wider uppercase">
                  Certified Equity Lock
                </h3>
                <p className="text-[13.5px] text-[#8c8a94] leading-relaxed font-light">
                  Receive an official binding valuation letter. The agreed valuation amount is deducted directly from your selected Grade 4.5+ showroom marque with zero hidden broker margins.
                </p>
              </div>
            </div>

            {/* Phase 3 */}
            <div className="bg-[#131316] border border-[rgba(197,168,128,0.25)] flex flex-col justify-between overflow-hidden">
              <div className="h-[220px] w-full overflow-hidden bg-[#080809]">
                <img
                  src="https://images.pexels.com/photos/16176579/pexels-photo-16176579.jpeg?auto=compress&cs=tinysrgb&w=1600"
                  alt="Drive Away Same Day"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6 space-y-3">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-['Cinzel'] text-[10px] text-[#c5a880] uppercase tracking-widest">PHASE 03</span>
                  <span className="font-['Cinzel'] text-[10px] text-[#8c8a94] uppercase">5,000 KM WARRANTY</span>
                </div>
                <h3 className="font-['Cinzel'] text-[18px] text-[#f5f5f7] tracking-wider uppercase">
                  Drive Away Same Day
                </h3>
                <p className="text-[13.5px] text-[#8c8a94] leading-relaxed font-light">
                  Our legal desk completes NTSA TIMS logbook conveyancing and encumbrance release. You turn the key on your verified Japanese import, backed by our in-house 5,000 km warranty covenant.
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* 5. FREQUENTLY ASKED QUESTIONS */}
        <div className="bg-[#131316] border border-[rgba(197,168,128,0.25)] p-8 sm:p-12 space-y-6">
          <div className="max-w-[700px]">
            <span className="rr-eyebrow mb-1 block">LEGAL CONVEYANCING & CLARITY</span>
            <h2 className="font-['Cinzel'] text-[24px] text-[#f5f5f7] tracking-wider uppercase">
              Frequently Addressed Inquiries.
            </h2>
            <p className="text-[13.5px] text-[#8c8a94] mt-2 font-light">
              Essential knowledge regarding trading your motor car at Alberka Motors Kenya.
            </p>
          </div>

          <div className="divide-y divide-[rgba(197,168,128,0.15)]">
            {faqs.map((faq, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <div key={idx} className="py-5">
                  <button
                    onClick={() => setActiveFaq(isOpen ? null : idx)}
                    className="w-full flex items-center justify-between text-left cursor-pointer group"
                  >
                    <span className="font-['Cinzel'] text-[14px] text-[#f5f5f7] group-hover:text-[#dfc7a5] transition-colors uppercase tracking-wider">
                      {faq.q}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-[#c5a880] transition-transform duration-300 shrink-0 ml-4 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <p className="mt-3 text-[14px] text-[#8c8a94] leading-relaxed font-light">
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
