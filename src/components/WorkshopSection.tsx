import React, { useState } from 'react';
import {
  ShieldCheck,
  Droplet,
  Disc,
  Activity,
  BatteryCharging,
  Wind,
  Sparkles,
  CheckCircle2,
  Calendar,
  MessageCircle,
  FileCheck,
  ArrowRight
} from 'lucide-react';

export const WorkshopSection: React.FC = () => {
  const [activeStage, setActiveStage] = useState(0);
  const [bookingSubmitted, setBookingSubmitted] = useState(false);
  const [bookingData, setBookingData] = useState({
    name: '',
    phone: '',
    vehicleModel: '',
    serviceType: '100-Point Pre-Purchase Check',
    preferredDate: '',
  });

  const stages = [
    {
      id: 'fluids',
      icon: Droplet,
      title: 'Oil & Fluids Service',
      tagline: '100% Castrol EDGE Fully Synthetic',
      description: 'We drain and replace engine oil with factory-grade Castrol EDGE synthetic oil (0W-20 or 0W-16). Every car receives a fresh genuine OEM oil filter, fresh sump washer, radiator coolant top-up, and brake fluid boiling point safety certification.',
      checklist: [
        'Castrol EDGE Titanium fully synthetic engine oil',
        'Genuine OEM oil filter and fresh copper sump washer',
        'Brake fluid boiling point digitally tested for thermal safety',
        'Long-life radiator and hybrid inverter coolant replenished'
      ]
    },
    {
      id: 'brakes',
      icon: Disc,
      title: 'Brakes & Suspension',
      tagline: 'Micrometer Disc & Pad Thickness Testing',
      description: 'All four wheels are removed for digital micrometer measurements against factory tolerances. Any friction pad under 80% life is renewed immediately with OEM-spec ceramic pads. Caliper slide pins are cleaned and treated with high-temp grease.',
      checklist: [
        'Rotor disc thickness measured against manufacturer tolerances',
        'Brake friction pads renewed if under 80% wear threshold',
        'Electronic parking brake and handbrake torque holding test',
        'Suspension bushings, tie-rod ends, and shock absorbers checked'
      ]
    },
    {
      id: 'diagnostics',
      icon: Activity,
      title: 'Computer Diagnostics',
      tagline: 'Full OBD-II Electronic Scan',
      description: 'Factory diagnostic scanners (Toyota Techstream, Nissan Consult, Honda HDS) interrogate all onboard control modules. Engine management, transmission, hybrid system, ABS, and SRS airbags are verified 100% code-free.',
      checklist: [
        'Zero active or pending Diagnostic Trouble Codes (DTCs)',
        'Live air-fuel ratio and oxygen sensor performance sweep',
        'Variable valve timing (VVT-i) electronic test',
        'Electronic throttle body cleaned and idle baseline recalibrated'
      ]
    },
    {
      id: 'hybrid',
      icon: BatteryCharging,
      title: 'Hybrid & Battery Test',
      tagline: 'Cell-Level Voltage & Health Certification',
      description: 'For hybrid and e-POWER vehicles, high-voltage traction battery packs undergo dynamic load testing under acceleration. Individual block voltages are balanced and the internal cooling fan duct is cleaned to prevent thermal throttling in coastal heat.',
      checklist: [
        'High-voltage traction battery verified above 90% benchmark',
        'Battery cooling fan duct cleared of Japanese road lint',
        'Inverter high-voltage insulation and water pump tested',
        '12V auxiliary starter battery cold-cranking amp (CCA) certified'
      ]
    },
    {
      id: 'climate',
      icon: Wind,
      title: 'Air Conditioning & Filters',
      tagline: 'Sub-6°C Vent Output & Fresh Cabin Air',
      description: 'Engine air intake filter renewed for optimum combustion and fuel economy. Activated carbon cabin filter fitted to eliminate dust and pollen. Air conditioning compressor pressure and refrigerant levels tested to guarantee ice-cold performance.',
      checklist: [
        'Fresh OEM engine air filter installed',
        'New activated carbon cabin micro-filter fitted',
        'AC compressor pressure and R134a refrigerant charge tested',
        'Center vent output temperature confirmed below 6°C at maximum cooling'
      ]
    },
    {
      id: 'detailing',
      icon: Sparkles,
      title: 'Decontamination & Detailing',
      tagline: 'Deep Steam Extraction & Carnauba Sealant',
      description: 'After ocean transit from Yokohama or Kobe, each vehicle receives a multi-stage paint decontamination, clay bar smoothing, protective carnauba paint sealant, and deep steam extraction across all upholstery and floor carpets.',
      checklist: [
        'Multi-stage paint decontamination and industrial fallout removal',
        'Hand machine buff and protective paint sealant applied',
        'Deep steam extraction across seats, headliner, and carpets',
        'Matte UV conditioner applied to dashboard and weather seals'
      ]
    }
  ];

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = encodeURIComponent(
      `Hello Alberka Motors Workshop, my name is ${bookingData.name} (${bookingData.phone}). I would like to book a ${bookingData.serviceType} for my vehicle (${bookingData.vehicleModel}) on ${bookingData.preferredDate || 'the earliest available date'}.`
    );
    window.open(`https://wa.me/254714333888?text=${msg}`, '_blank');
    setBookingSubmitted(true);
  };

  return (
    <section className="w-full bg-transparent py-16 sm:py-24 px-4 sm:px-8 text-[#f4f4f5] relative">
      <div className="max-w-[1240px] mx-auto space-y-16 sm:space-y-20 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-[800px] mx-auto space-y-3">
          <div className="inline-flex items-center gap-2">
            <span className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-zinc-400">
              MOMBASA TECHNICAL WORKSHOP · TANGANA ROAD
            </span>
          </div>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold text-white tracking-[-0.035em] leading-[1.05]">
            Workshop Preparation & 5,000 KM Warranty
          </h1>
          <p className="text-base sm:text-lg text-zinc-400 leading-relaxed font-normal max-w-2xl mx-auto">
            We never outsource technical preparation. Every vehicle arriving from the Port of Mombasa undergoes an in-house 100-point mechanical overhaul before delivery.
          </p>
        </div>

        {/* Widescreen Workshop Stage */}
        <div className="space-y-8">
          <div className="w-full aspect-[16/9] sm:aspect-[21/9.5] max-h-[540px] overflow-hidden relative bg-black border border-white/[0.08] rounded-2xl shadow-[0_24px_60px_rgba(0,0,0,0.85)]">
            <video autoPlay muted loop playsInline className="w-full h-full object-cover">
              <source src="https://videos.pexels.com/video-files/5309381/5309381-hd_1920_1080_25fps.mp4" type="video/mp4" />
              <img src="https://images.pexels.com/photos/8986138/pexels-photo-8986138.jpeg?auto=compress&cs=tinysrgb&w=1600" alt="Workshop bay" className="w-full h-full object-cover" />
            </video>

            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-6 sm:p-10 pointer-events-none">
              <div className="text-left text-white max-w-[620px] space-y-1">
                <span className="font-mono text-[10px] text-zinc-400 uppercase tracking-widest block">
                  INSPECTION BAY 01
                </span>
                <p className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                  100-Point Pre-Delivery Overhaul & Signed Verification Certificate
                </p>
              </div>
            </div>
          </div>

          {/* Architectural Metric Matrix (Clean Hairline Dividers) */}
          <div className="border-y border-white/[0.08] py-8 grid grid-cols-2 sm:grid-cols-4 gap-6 text-left">
            <div>
              <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-wider block mb-1">SERVICE DURATION</span>
              <span className="text-base sm:text-lg font-bold text-white block">48-Hour Protocol</span>
              <span className="text-xs text-zinc-400">Zero rushed handovers</span>
            </div>
            <div>
              <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-wider block mb-1">ENGINE OIL</span>
              <span className="text-base sm:text-lg font-bold text-white block">Castrol Full Synthetic</span>
              <span className="text-xs text-zinc-400">OEM genuine filter</span>
            </div>
            <div>
              <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-wider block mb-1">WRITTEN WARRANTY</span>
              <span className="text-base sm:text-lg font-bold text-white block">5,000 KM Written</span>
              <span className="text-xs text-zinc-400">Engine & transmission</span>
            </div>
            <div>
              <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-wider block mb-1">INSPECTION MARKS</span>
              <span className="text-base sm:text-lg font-bold text-white block">100 Certified Points</span>
              <span className="text-xs text-zinc-400">Signed technician report</span>
            </div>
          </div>
        </div>

        {/* Interactive 6-Stage Protocol Explorer */}
        <div className="space-y-6">
          <div className="max-w-xl space-y-1.5 text-left">
            <span className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-zinc-400 font-semibold block">
              100-POINT CHECKLIST
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Pre-Handover Inspection Stages
            </h2>
            <p className="text-sm text-zinc-400">
              Select any stage below to inspect the checklist procedures executed before collection.
            </p>
          </div>

          {/* Stage Selector Minimalist Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {stages.map((st, i) => {
              const Icon = st.icon;
              const isActive = activeStage === i;
              return (
                <button
                  key={st.id}
                  onClick={() => setActiveStage(i)}
                  className={`p-4 text-left rounded-xl transition-all duration-300 cursor-pointer flex flex-col justify-between h-24 border ${
                    isActive
                      ? 'bg-zinc-900 border-white text-white shadow-lg'
                      : 'bg-[#0c0c0f] border-white/[0.08] text-zinc-400 hover:text-white hover:border-white/25'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-zinc-500'}`} />
                  <div>
                    <span className="font-mono text-[10px] text-zinc-500 block">0{i + 1}</span>
                    <span className="text-xs font-semibold leading-tight line-clamp-1">
                      {st.title}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Stage Detailed Breakdown */}
          <div className="relative bg-white/[0.03] backdrop-blur-[2px] p-6 sm:p-8 border border-white/[0.12] rounded-2xl space-y-6 text-left shadow-[0_16px_40px_rgba(0,0,0,0.35)]">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-white/[0.08]">
              <div>
                <div className="inline-flex items-center gap-2 mb-1">
                  <span className="font-mono text-[10px] text-zinc-400 uppercase tracking-widest font-semibold">
                    STAGE 0{activeStage + 1} OF 06
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">{stages[activeStage].title}</h3>
                <p className="text-xs sm:text-sm text-zinc-400 mt-0.5">{stages[activeStage].tagline}</p>
              </div>
              <div className="font-mono text-[10.5px] font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-md w-fit flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>MANDATORY HANDOVER PASS</span>
              </div>
            </div>

            <p className="text-sm text-zinc-300 leading-relaxed max-w-3xl">
              {stages[activeStage].description}
            </p>

            <div className="pt-2">
              <span className="font-mono text-[10.5px] uppercase tracking-wider text-zinc-400 block mb-3 font-semibold">
                EXECUTION PROCEDURES:
              </span>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {stages[activeStage].checklist.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-300">
                    <CheckCircle2 className="w-4 h-4 text-white shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 5,000 KM Warranty Section */}
        <div className="relative bg-[#0c0c0f] p-8 sm:p-10 border border-white/[0.08] rounded-2xl space-y-8 text-left">
          <div className="max-w-2xl space-y-1">
            <span className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-zinc-400 font-semibold block">
              WRITTEN WARRANTY
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              5,000 KM Dealer Written Warranty
            </h2>
            <p className="text-sm text-zinc-400 leading-relaxed">
              Every passenger car sold by Alberka Motors comes with a formal written warranty valid for 5,000 km or 90 days from handover.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6 border-t border-white/[0.08]">
            <div className="space-y-3">
              <h4 className="text-xs font-mono uppercase tracking-wider text-white font-bold flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-white" />
                Covered Mechanical Components
              </h4>
              <ul className="space-y-2 text-xs sm:text-sm text-zinc-400">
                <li>• Engine cylinder block, head, valves, pistons, and camshaft</li>
                <li>• Automatic transmission, torque converter, and CVT assembly</li>
                <li>• Hybrid electric drive motor, reduction gear, and inverter circuit</li>
                <li>• Starter motor, alternator charging system, and engine water pump</li>
              </ul>
            </div>

            <div className="space-y-3">
              <h4 className="text-xs font-mono uppercase tracking-wider text-white font-bold flex items-center gap-2">
                <FileCheck className="w-4 h-4 text-white" />
                Client Privileges
              </h4>
              <ul className="space-y-2 text-xs sm:text-sm text-zinc-400">
                <li>• Free 2,500 km intermediate fluid check at our Mombasa or Nairobi showroom</li>
                <li>• Direct WhatsApp support with our senior workshop technician</li>
                <li>• Priority access to genuine Japanese spare parts at dealer wholesale rates</li>
                <li>• Official inspection handover certificate signed by our head technician</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Service Booking Form */}
        <div className="relative bg-white/[0.03] backdrop-blur-[2px] p-8 sm:p-10 border border-white/[0.12] rounded-2xl space-y-6 text-left shadow-[0_16px_40px_rgba(0,0,0,0.35)] before:absolute before:inset-x-8 before:top-0 before:h-[1px] before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent">
          <div className="max-w-xl space-y-1">
            <span className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-zinc-400 font-semibold block">
              SCHEDULE APPOINTMENT
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">Book a Workshop Inspection</h3>
            <p className="text-xs sm:text-sm text-zinc-400">
              Open to Alberka owners and pre-purchase vehicle inspections in Mombasa.
            </p>
          </div>

          {bookingSubmitted ? (
            <div className="bg-zinc-900 border border-emerald-500/40 p-8 text-center text-white space-y-2 rounded-xl">
              <CheckCircle2 className="w-8 h-8 mx-auto mb-2 text-emerald-400" />
              <h4 className="text-lg font-bold">Booking Request Dispatched</h4>
              <p className="text-xs sm:text-sm text-zinc-400">Our Mombasa technical desk is opening your WhatsApp message now.</p>
            </div>
          ) : (
            <form onSubmit={handleBookingSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div>
                  <label className="text-[11px] font-mono uppercase text-zinc-400 block mb-1.5">Your Name</label>
                  <input
                    type="text"
                    required
                    value={bookingData.name}
                    onChange={(e) => setBookingData({ ...bookingData, name: e.target.value })}
                    placeholder="e.g. Samuel Karani"
                    className="w-full px-4 py-2.5 bg-black border border-white/15 rounded-lg text-[16px] sm:text-sm text-white focus:outline-none focus:border-white transition-colors"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-mono uppercase text-zinc-400 block mb-1.5">Phone Number (WhatsApp)</label>
                  <input
                    type="tel"
                    required
                    value={bookingData.phone}
                    onChange={(e) => setBookingData({ ...bookingData, phone: e.target.value })}
                    placeholder="07XX XXX XXX"
                    className="w-full px-4 py-2.5 bg-black border border-white/15 rounded-lg text-[16px] sm:text-sm font-mono text-white focus:outline-none focus:border-white transition-colors"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-mono uppercase text-zinc-400 block mb-1.5">Service Type</label>
                  <select
                    value={bookingData.serviceType}
                    onChange={(e) => setBookingData({ ...bookingData, serviceType: e.target.value })}
                    className="w-full px-4 py-2.5 bg-black border border-white/15 rounded-lg text-[16px] sm:text-sm text-white focus:outline-none focus:border-white transition-colors cursor-pointer"
                  >
                    <option value="100-Point Pre-Purchase Check">100-Point Pre-Purchase Check</option>
                    <option value="5,000 km Periodic Service">5,000 KM Routine Service</option>
                    <option value="Computerized OBD-II Diagnostic Scan">Computerized OBD-II Diagnostic Scan</option>
                    <option value="Hybrid Battery Health Assessment">Hybrid Battery Health Assessment</option>
                    <option value="Deep Steam Detailing & Polish">Deep Steam Detailing & Polish</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="text-[11px] font-mono uppercase text-zinc-400 block mb-1.5">Car Model & Reg</label>
                  <input
                    type="text"
                    required
                    value={bookingData.vehicleModel}
                    onChange={(e) => setBookingData({ ...bookingData, vehicleModel: e.target.value })}
                    placeholder="e.g. Toyota RAV4 (KDD 123X)"
                    className="w-full px-4 py-2.5 bg-black border border-white/15 rounded-lg text-[16px] sm:text-sm text-white focus:outline-none focus:border-white transition-colors"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-mono uppercase text-zinc-400 block mb-1.5">Preferred Date</label>
                  <input
                    type="date"
                    value={bookingData.preferredDate}
                    onChange={(e) => setBookingData({ ...bookingData, preferredDate: e.target.value })}
                    className="w-full px-4 py-2.5 bg-black border border-white/15 rounded-lg text-[16px] sm:text-sm font-mono text-white focus:outline-none focus:border-white transition-colors"
                  />
                </div>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                <button type="submit" className="btn-white py-3 px-6 text-xs sm:text-sm font-semibold w-full sm:w-auto inline-flex items-center justify-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>Send Booking via WhatsApp</span>
                </button>
                <span className="font-mono text-xs text-zinc-500">Mombasa Workshop: Mon – Sat: 8:00 AM – 6:00 PM</span>
              </div>
            </form>
          )}
        </div>

      </div>
    </section>
  );
};
