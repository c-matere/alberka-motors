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
  Clock,
  MapPin,
  FileCheck
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
      title: '1. Fluid Overhaul',
      tagline: '100% Full Synthetic Castrol Specification',
      description: 'Unlike standard dealers who merely check the dipstick, we drain and replace the complete engine oil with high-grade full synthetic lubricants (0W-20 or 0W-16). Fresh OEM oil filter, brake fluid hydroscopic boiling point check, and coolant specific gravity verification.',
      checklist: [
        'Castrol EDGE Titanium 0W-20 / 0W-16 fully synthetic oil',
        'Genuine Toyota / Nissan OEM oil filter and crush washer replacement',
        'Brake fluid boiling point test (>230°C requirement)',
        'Inverter and radiator coolant concentration calibrated to -35°C'
      ]
    },
    {
      id: 'brakes',
      icon: Disc,
      title: '2. Brakes & Rotors',
      tagline: 'Micrometric Disc & Pad Verification',
      description: 'All 4 wheels removed. Digital vernier micrometer measurement of rotor disc runout to eradicate high-speed highway brake judder. Pad friction thickness measured: minimum 80% thickness required, otherwise fresh ceramic pads are fitted automatically.',
      checklist: [
        'Rotor thickness compared to factory minimum discard limit',
        'Caliper slide pins degreased and relubricated with high-temp synthetic grease',
        'Handbrake / electronic parking brake actuator holding force tested',
        'ABS hydraulic valve block actuation test'
      ]
    },
    {
      id: 'diagnostics',
      icon: Activity,
      title: '3. ECU Diagnostics',
      tagline: 'Factory OEM Software Module Health Scan',
      description: 'Full computerized interrogation using factory Toyota Techstream, Nissan Consult, and Honda HDS diagnostic software. Scans all electronic controllers: Engine ECM, Transmission TCM, Hybrid Inverter, ABS/VSC, and SRS Airbag modules for past or pending trouble codes.',
      checklist: [
        'Zero Diagnostic Trouble Codes (DTCs) confirmation',
        'Live data oxygen sensor switching speed & fuel trims',
        'Variable valve timing (VVT-i / VTC) target vs actual angle',
        'Electronic throttle body adaptation and idle reset'
      ]
    },
    {
      id: 'hybrid',
      icon: BatteryCharging,
      title: '4. Hybrid & Battery',
      tagline: 'Cell-Level Voltage Delta & Health Certification',
      description: 'High-voltage traction battery packs evaluated under full acceleration load. Delta voltage across individual block pairs must remain within 0.02V. 12V auxiliary starting battery conductance and CCA load tested at minimum 90% health.',
      checklist: [
        'Traction battery state-of-health (SOH) minimum 92% benchmark',
        'Cooling fan filter cleaned and duct obstruction cleared',
        'Inverter high-voltage insulation resistance measurement',
        'Alternator charging voltage tested under full electrical load (14.2V)'
      ]
    },
    {
      id: 'climate',
      icon: Wind,
      title: '5. Climate & Air',
      tagline: 'Ultrasonic Antibacterial Sterilization',
      description: 'Engine air filter replaced to maximize fuel economy. Interior AC pollen filter replaced with activated carbon filter. Ultrasonic evaporator core chemical misting to neutralize coastal tropical mold and bacteria, ensuring hospital-grade clean air.',
      checklist: [
        'New pleated engine intake air filtration element',
        'Activated carbon anti-allergen cabin filter installed',
        'AC compressor clutch gap and pressure manifold test (R134a/R1234yf)',
        'Vent outlet air temperature measured below 6°C at maximum cooling'
      ]
    },
    {
      id: 'detailing',
      icon: Sparkles,
      title: '6. Studio Detailing',
      tagline: '3-Stage Paint Sealant & Steam Extraction',
      description: 'After port transit and shipping, every vehicle undergoes multi-stage decontamination. Clay bar treatment removes embedded maritime industrial fallout, followed by a hydrophobic polymer wax sealant and deep steam upholstery extraction.',
      checklist: [
        'Iron fallout remover & clay bar paint surface decontamination',
        'Dual-action machine polish with hydrophobic sealant',
        'Hot steam extraction of all seat upholstery and carpet fibers',
        'UV protectant application to all exterior rubbers and engine plastics'
      ]
    }
  ];

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = encodeURIComponent(
      `Hello Alberka Motors Workshop, my name is ${bookingData.name} (${bookingData.phone}). I would like to schedule a ${bookingData.serviceType} for my vehicle (${bookingData.vehicleModel}) on ${bookingData.preferredDate || 'the earliest available date'}.`
    );
    window.open(`https://wa.me/254714333888?text=${msg}`, '_blank');
    setBookingSubmitted(true);
  };

  return (
    <section className="w-full bg-[#121215] py-16 px-6">
      <div className="max-w-[1240px] mx-auto space-y-20">
        
        {/* Header */}
        <div className="text-center max-w-[760px] mx-auto">
          <span className="launch-status-label mb-2">
            Tangana Road, Mombasa · Since 2000
          </span>
          <h1 className="hero-display mb-4">
            The In-House Workshop.
          </h1>
          <p className="text-[17px] text-zinc-400 leading-[1.47]" style={{ letterSpacing: '-0.374px' }}>
            We do not outsource mechanical servicing. Every vehicle cleared from the port of Mombasa enters our specialized mechanical facility for a mandatory 48-hour overhaul before handover.
          </p>
        </div>

        {/* Workshop Hero Video Stage */}
        <div className="relative w-full mx-auto">
          <div className="w-full h-[440px] md:h-[540px] rounded-[28px] overflow-hidden relative bg-[#121215]">
            <video autoPlay muted loop playsInline className="w-full h-full object-cover">
              <source src="https://videos.pexels.com/video-files/5309381/5309381-hd_1920_1080_25fps.mp4" type="video/mp4" />
              <img src="https://images.pexels.com/photos/8986138/pexels-photo-8986138.jpeg?auto=compress&cs=tinysrgb&w=1600" alt="Workshop bay" className="w-full h-full object-cover" />
            </video>

            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-8">
              <div className="text-left text-white max-w-[600px]">
                <span className="text-[11px] font-semibold uppercase tracking-widest text-white/80">
                  Engineering Facility · Tangana Road, Mombasa
                </span>
                <p className="text-[22px] font-semibold leading-tight mt-1">
                  100-Point Inspection Protocol with full written handover certificate.
                </p>
              </div>
            </div>
          </div>

          <div className="floating-capsule p-6 max-w-[800px] mx-auto -mt-10 relative z-20 grid grid-cols-2 sm:grid-cols-4 gap-6 text-left bg-[#121215]">
            <div>
              <span className="text-[11px] text-zinc-400 uppercase tracking-wide block font-medium">Standard Hours</span>
              <span className="text-[16px] font-semibold text-white">48-Hour Protocol</span>
            </div>
            <div>
              <span className="text-[11px] text-zinc-400 uppercase tracking-wide block font-medium">Engine Oil Standard</span>
              <span className="text-[16px] font-semibold text-white">100% Full Synthetic</span>
            </div>
            <div>
              <span className="text-[11px] text-zinc-400 uppercase tracking-wide block font-medium">Warranty Covenant</span>
              <span className="text-[16px] font-semibold text-white">5,000 km Written</span>
            </div>
            <div>
              <span className="text-[11px] text-zinc-400 uppercase tracking-wide block font-medium">Inspection Points</span>
              <span className="text-[16px] font-semibold text-white">100 Certified</span>
            </div>
          </div>
        </div>

        {/* Interactive 6-Stage Protocol Explorer */}
        <div className="bg-[#121215] p-8 md:p-12 rounded-[28px] border border-[#27272a]">
          <div className="max-w-[680px] mb-8">
            <span className="launch-status-label mb-1">Pre-Delivery Standard</span>
            <h2 className="text-[28px] sm:text-[34px] font-semibold text-white leading-tight">
              Interactive 100-Point Inspection Guide
            </h2>
            <p className="text-[15px] text-zinc-400 mt-1">
              Select a stage below to examine our exact procedures, testing thresholds, and replacement parts.
            </p>
          </div>

          {/* Stage Selector Pills */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 mb-8">
            {stages.map((st, i) => {
              const Icon = st.icon;
              const isActive = activeStage === i;
              return (
                <button
                  key={st.id}
                  onClick={() => setActiveStage(i)}
                  className={`p-3.5 rounded-[16px] text-left transition-all cursor-pointer flex flex-col justify-between h-[96px] ${
                    isActive
                      ? 'bg-[#18181c] shadow-xs border-2 border-white'
                      : 'bg-[#121215]/60 hover:bg-[#121215] border border-[#27272a]'
                  }`}
                >
                  <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-zinc-400'}`} />
                  <span className={`text-[12px] font-semibold ${isActive ? 'text-white' : 'text-zinc-400'}`}>
                    {st.title.split('. ')[1]}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Active Stage Detailed Breakdown */}
          <div className="bg-[#121215] p-8 rounded-[20px] border border-[#27272a] space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-[#121215]">
              <div>
                <span className="text-[11px] font-semibold text-zinc-400 uppercase tracking-widest">
                  Stage {activeStage + 1} of 6
                </span>
                <h3 className="text-[22px] font-semibold text-white">{stages[activeStage].title}</h3>
                <p className="text-[14px] text-zinc-400 font-medium">{stages[activeStage].tagline}</p>
              </div>
              <span className="inline-flex items-center gap-1.5 text-[12px] bg-emerald-950 text-emerald-400 border border-emerald-800 font-semibold px-3 py-1 rounded-full w-fit">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Mandatory Handover Pass
              </span>
            </div>

            <p className="text-[15px] text-zinc-400 leading-relaxed">
              {stages[activeStage].description}
            </p>

            <div className="pt-2">
              <span className="text-[12px] font-semibold text-white uppercase tracking-wider block mb-3">
                Laboratory & Workshop Verification Checklist:
              </span>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {stages[activeStage].checklist.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-[13px] text-white">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Warranty Covenant & Legal Terms */}
        <div className="apple-card p-8 md:p-12 bg-[#121215]">
          <div className="max-w-[700px] mb-8">
            <span className="launch-status-label mb-1">Peace of Mind</span>
            <h2 className="text-[30px] font-semibold text-white leading-snug">
              The 5,000 km Warranty Covenant.
            </h2>
            <p className="text-[15px] text-zinc-400 mt-2">
              Every retail passenger vehicle includes our formal written warranty backing you for 5,000 kilometers or 90 days from handover date.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6 border-t border-[#27272a]">
            <div className="space-y-4">
              <h4 className="text-[16px] font-semibold text-white flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-zinc-300" />
                Covered Systems
              </h4>
              <ul className="space-y-2 text-[14px] text-zinc-400">
                <li>• Engine cylinder block, head, valves, pistons, and camshaft assemblies</li>
                <li>• Automatic transmission, torque converter, and CVT belt/pulley assemblies</li>
                <li>• Hybrid electric drive motors, reduction gears, and inverter circuits</li>
                <li>• Engine starter motor, alternator charging system, and cooling water pump</li>
              </ul>
            </div>

            <div className="space-y-4">
              <h4 className="text-[16px] font-semibold text-white flex items-center gap-2">
                <FileCheck className="w-4 h-4 text-zinc-300" />
                Customer Assurance
              </h4>
              <ul className="space-y-2 text-[14px] text-zinc-400">
                <li>• Free intermediate 2,500 km fluid check at either Mombasa or Nairobi branch</li>
                <li>• WhatsApp priority line directly to our Master Diagnostic Technician</li>
                <li>• Direct access to genuine OEM Japanese spare parts at dealer trade discount</li>
                <li>• Full written handover inspection cert signed by the lead mechanic</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Book Workshop Service Form */}
        <div className="apple-card p-8 md:p-12 bg-[#0d0d10]">
          <div className="max-w-[620px] mb-8">
            <span className="launch-status-label mb-1">Service Desk</span>
            <h3 className="text-[24px] font-semibold text-white">Schedule an In-House Workshop Appointment</h3>
            <p className="text-[14px] text-zinc-400">
              Available for existing Alberka Motors vehicle owners and prospective pre-purchase inspection clients.
            </p>
          </div>

          {bookingSubmitted ? (
            <div className="bg-emerald-50 border border-emerald-200 rounded-[16px] p-6 text-center text-emerald-800">
              <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto mb-2" />
              <h4 className="text-[18px] font-semibold">Appointment Request Dispatched</h4>
              <p className="text-[13px] mt-1">Our Mombasa service coordinator is opening your WhatsApp ticket right now.</p>
            </div>
          ) : (
            <form onSubmit={handleBookingSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-[13px] font-medium text-white mb-2">Your Name</label>
                  <input
                    type="text"
                    required
                    value={bookingData.name}
                    onChange={(e) => setBookingData({ ...bookingData, name: e.target.value })}
                    placeholder="e.g. Samuel Karani"
                    className="w-full px-4 py-3 rounded-[12px] bg-[#121215] border border-[#27272a] text-[14px] text-white focus:outline-none focus:border-zinc-400"
                  />
                </div>

                <div>
                  <label className="block text-[13px] font-medium text-white mb-2">WhatsApp Phone</label>
                  <input
                    type="tel"
                    required
                    value={bookingData.phone}
                    onChange={(e) => setBookingData({ ...bookingData, phone: e.target.value })}
                    placeholder="07XX XXX XXX"
                    className="w-full px-4 py-3 rounded-[12px] bg-[#121215] border border-[#27272a] text-[14px] text-white focus:outline-none focus:border-zinc-400"
                  />
                </div>

                <div>
                  <label className="block text-[13px] font-medium text-white mb-2">Service Type</label>
                  <select
                    value={bookingData.serviceType}
                    onChange={(e) => setBookingData({ ...bookingData, serviceType: e.target.value })}
                    className="w-full px-4 py-3 rounded-[12px] bg-[#121215] border border-[#27272a] text-[14px] text-white focus:outline-none focus:border-zinc-400"
                  >
                    <option value="100-Point Pre-Purchase Check">100-Point Pre-Purchase Check</option>
                    <option value="5,000 km Periodic Service">5,000 km Periodic Service</option>
                    <option value="Computerized OBD-II Diagnostic Scan">Computerized OBD-II Diagnostic Scan</option>
                    <option value="Hybrid Battery Health Assessment">Hybrid Battery Health Assessment</option>
                    <option value="Studio Ceramic Paint Sealant">Studio Ceramic Paint Sealant</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[13px] font-medium text-white mb-2">Vehicle Model & Registration</label>
                  <input
                    type="text"
                    required
                    value={bookingData.vehicleModel}
                    onChange={(e) => setBookingData({ ...bookingData, vehicleModel: e.target.value })}
                    placeholder="e.g. Toyota RAV4 (KDD 123X)"
                    className="w-full px-4 py-3 rounded-[12px] bg-[#121215] border border-[#27272a] text-[14px] text-white focus:outline-none focus:border-zinc-400"
                  />
                </div>

                <div>
                  <label className="block text-[13px] font-medium text-white mb-2">Preferred Appointment Date</label>
                  <input
                    type="date"
                    value={bookingData.preferredDate}
                    onChange={(e) => setBookingData({ ...bookingData, preferredDate: e.target.value })}
                    className="w-full px-4 py-3 rounded-[12px] bg-[#121215] border border-[#27272a] text-[14px] text-white focus:outline-none focus:border-zinc-400"
                  />
                </div>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                <button type="submit" className="pricing-blue-pill-lg w-full sm:w-auto cursor-pointer">
                  <Calendar className="w-4 h-4" />
                  <span>Confirm Service Booking on WhatsApp</span>
                </button>
                <span className="text-[12px] text-zinc-400">Monday – Saturday: 8:00 AM – 6:00 PM</span>
              </div>
            </form>
          )}
        </div>

      </div>
    </section>
  );
};
