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
      title: '1. Fluid Overhaul',
      tagline: '100% Full Synthetic Castrol Specification',
      description: 'Unlike standard commercial dealerships who merely inspect the dipstick, our coastal atelier drains and renews the complete engine lubrication with high-specification full synthetic oil (0W-20 or 0W-16). Fresh OEM filtration, brake fluid hydroscopic boiling point validation, and inverter coolant specific gravity calibration.',
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
      description: 'After port transit and maritime shipping, every vehicle undergoes multi-stage decontamination. Clay bar treatment removes embedded maritime industrial fallout, followed by a hydrophobic polymer wax sealant and deep steam upholstery extraction.',
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
      `Salutations Alberka Motors Workshop, my name is ${bookingData.name} (${bookingData.phone}). I would like to schedule a ${bookingData.serviceType} for my vehicle (${bookingData.vehicleModel}) on ${bookingData.preferredDate || 'the earliest available date'}.`
    );
    window.open(`https://wa.me/254714333888?text=${msg}`, '_blank');
    setBookingSubmitted(true);
  };

  return (
    <section className="w-full bg-[#160a1d] py-20 sm:py-28 px-6 text-[#f5f5f7] border-t border-[rgba(197,168,128,0.18)]">
      <div className="max-w-[1400px] mx-auto space-y-20">
        
        {/* Section Header */}
        <div className="text-center max-w-[800px] mx-auto">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="h-[1px] w-6 bg-[rgba(197,168,128,0.4)]" />
            <span className="rr-eyebrow">
              TANGANA ROAD ATELIER // MOMBASA // EST. 2000
            </span>
            <div className="h-[1px] w-6 bg-[rgba(197,168,128,0.4)]" />
          </div>
          <h1 className="rr-title-h1 text-[32px] sm:text-[46px] md:text-[54px] mb-4">
            THE ARCHITECTURE OF MECHANICAL PERFECTION.
          </h1>
          <p className="text-[#dfc7a5] font-['Cormorant_Garamond'] text-[18px] sm:text-[21px] italic leading-relaxed max-w-[680px] mx-auto">
            We never outsource mechanical commissioning. Every motor car cleared from the port of Mombasa enters our specialized mechanical facility for a mandatory 48-hour overhaul before private handover.
          </p>
        </div>

        {/* Workshop Hero Video Stage */}
        <div className="relative w-full mx-auto">
          <div className="w-full h-[400px] md:h-[520px] overflow-hidden relative bg-[#080809] border border-[rgba(197,168,128,0.3)]">
            <video autoPlay muted loop playsInline className="w-full h-full object-cover">
              <source src="https://videos.pexels.com/video-files/5309381/5309381-hd_1920_1080_25fps.mp4" type="video/mp4" />
              <img src="https://images.pexels.com/photos/8986138/pexels-photo-8986138.jpeg?auto=compress&cs=tinysrgb&w=1600" alt="Workshop bay" className="w-full h-full object-cover" />
            </video>

            <div className="absolute inset-0 bg-gradient-to-t from-[#0f0714] via-[#0f0714]/40 to-transparent flex items-end p-8 sm:p-12">
              <div className="text-left text-[#f5f5f7] max-w-[700px]">
                <span className="font-['Cinzel'] text-[10px] text-[#c5a880] uppercase tracking-[0.25em] block mb-2">
                  TANGANA ROAD COASTAL ATELIER // MOMBASA
                </span>
                <p className="font-['Cinzel'] text-[20px] sm:text-[26px] font-normal leading-snug text-[#f5f5f7] tracking-wider uppercase">
                  100-Point Verification Protocol with written handover certificate.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-[#131316] border border-[rgba(197,168,128,0.35)] p-6 sm:p-8 max-w-[960px] mx-auto -mt-10 relative z-20 grid grid-cols-2 sm:grid-cols-4 gap-6 text-left">
            <div>
              <span className="font-['Cinzel'] text-[9.5px] text-[#8c8a94] uppercase tracking-wider block mb-1">ATELIER DURATION</span>
              <span className="font-['Cinzel'] text-[14px] text-[#f5f5f7]">48-Hour Protocol</span>
            </div>
            <div>
              <span className="font-['Cinzel'] text-[9.5px] text-[#8c8a94] uppercase tracking-wider block mb-1">LUBRICATION CODE</span>
              <span className="font-['Cinzel'] text-[14px] text-[#f5f5f7]">Castrol Full Synthetic</span>
            </div>
            <div>
              <span className="font-['Cinzel'] text-[9.5px] text-[#8c8a94] uppercase tracking-wider block mb-1">WARRANTY COVENANT</span>
              <span className="font-['Cinzel'] text-[14px] text-[#c5a880]">5,000 KM Written</span>
            </div>
            <div>
              <span className="font-['Cinzel'] text-[9.5px] text-[#8c8a94] uppercase tracking-wider block mb-1">INSPECTION MARKS</span>
              <span className="font-['Cinzel'] text-[14px] text-[#f5f5f7]">100 Certified Points</span>
            </div>
          </div>
        </div>

        {/* Interactive 6-Stage Protocol Explorer */}
        <div className="bg-[#131316] p-8 sm:p-12 border border-[rgba(197,168,128,0.25)] space-y-8">
          <div className="max-w-[700px]">
            <span className="rr-eyebrow mb-2 block">PRE-DELIVERY DISCIPLINE</span>
            <h2 className="font-['Cinzel'] text-[24px] sm:text-[30px] text-[#f5f5f7] tracking-wide uppercase">
              The 100-Point Atelier Inspection Protocol
            </h2>
            <p className="text-[14.5px] text-[#8c8a94] mt-2 leading-relaxed font-light">
              Select a stage below to examine our exact procedures, testing thresholds, and OEM component renewals.
            </p>
          </div>

          {/* Stage Selector Buttons (Hard 0px edges) */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {stages.map((st, i) => {
              const Icon = st.icon;
              const isActive = activeStage === i;
              return (
                <button
                  key={st.id}
                  onClick={() => setActiveStage(i)}
                  className={`p-3.5 text-left transition-all duration-400 cursor-pointer flex flex-col justify-between h-[90px] ${
                    isActive
                      ? 'bg-[#0f0714] border border-[#c5a880]'
                      : 'bg-[#0f0714] hover:bg-[#160a1d] border border-[rgba(255,255,255,0.06)]'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-[#c5a880]' : 'text-[#8c8a94]'}`} />
                  <span className={`font-['Cinzel'] text-[11px] tracking-wider uppercase ${isActive ? 'text-[#dfc7a5]' : 'text-[#8c8a94]'}`}>
                    {st.title.split('. ')[1]}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Active Stage Detailed Breakdown */}
          <div className="bg-[#0f0714] p-8 border border-[rgba(197,168,128,0.2)] space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-[rgba(197,168,128,0.15)]">
              <div>
                <span className="font-['Cinzel'] text-[10px] text-[#c5a880] uppercase tracking-widest block mb-1">
                  STAGE 0{activeStage + 1} OF 06
                </span>
                <h3 className="font-['Cinzel'] text-[22px] text-[#f5f5f7] tracking-wider uppercase">{stages[activeStage].title}</h3>
                <p className="font-['Cormorant_Garamond'] text-[16px] italic text-[#dfc7a5]">{stages[activeStage].tagline}</p>
              </div>
              <span className="font-['Cinzel'] text-[10px] tracking-widest text-[#c5a880] border border-[rgba(197,168,128,0.3)] px-3 py-1 uppercase">
                MANDATORY ATELIER PASS
              </span>
            </div>

            <p className="text-[14.5px] text-[#8c8a94] leading-relaxed font-light">
              {stages[activeStage].description}
            </p>

            <div className="pt-2">
              <span className="font-['Cinzel'] text-[10px] uppercase tracking-[0.2em] text-[#c5a880] block mb-4">
                LABORATORY VERIFICATION CRITERIA:
              </span>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {stages[activeStage].checklist.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-[13.5px] text-[#f5f5f7] font-light">
                    <span className="w-1.5 h-1.5 bg-[#c5a880] shrink-0 mt-2" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 5,000 KM Warranty Covenant */}
        <div className="bg-[#131316] p-8 sm:p-12 border border-[rgba(197,168,128,0.25)] space-y-8">
          <div className="max-w-[700px]">
            <span className="rr-eyebrow mb-2 block">PEACE OF MIND</span>
            <h2 className="font-['Cinzel'] text-[24px] sm:text-[30px] text-[#f5f5f7] tracking-wide uppercase">
              The 5,000 KM Warranty Covenant.
            </h2>
            <p className="text-[#dfc7a5] font-['Cormorant_Garamond'] text-[17px] italic mt-2 leading-relaxed">
              Every retail passenger motor car includes our formal written warranty backing you for 5,000 kilometers or 90 days from handover date.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6 border-t border-[rgba(197,168,128,0.15)]">
            <div className="space-y-4">
              <h4 className="font-['Cinzel'] text-[14px] text-[#f5f5f7] tracking-wider uppercase flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#c5a880]" />
                COVERED SYSTEMS
              </h4>
              <ul className="space-y-2.5 text-[13.5px] text-[#8c8a94] font-light">
                <li>• Engine cylinder block, head, valves, pistons, and camshaft assemblies</li>
                <li>• Automatic transmission, torque converter, and CVT belt/pulley assemblies</li>
                <li>• Hybrid electric drive motors, reduction gears, and inverter circuits</li>
                <li>• Engine starter motor, alternator charging system, and cooling water pump</li>
              </ul>
            </div>

            <div className="space-y-4">
              <h4 className="font-['Cinzel'] text-[14px] text-[#f5f5f7] tracking-wider uppercase flex items-center gap-2">
                <FileCheck className="w-4 h-4 text-[#c5a880]" />
                CLIENT ASSURANCE
              </h4>
              <ul className="space-y-2.5 text-[13.5px] text-[#8c8a94] font-light">
                <li>• Complimentary intermediate 2,500 km fluid check at either Mombasa or Nairobi suite</li>
                <li>• Priority WhatsApp direct connection to our Master Diagnostic Technician</li>
                <li>• Guaranteed access to genuine OEM Japanese spare parts at atelier cost</li>
                <li>• Complete written handover inspection cert signed by the lead engineer</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Schedule Service Form */}
        <div className="bg-[#131316] p-8 sm:p-12 border border-[rgba(197,168,128,0.3)] space-y-6">
          <div className="max-w-[650px]">
            <span className="rr-eyebrow mb-2 block">ATELIER DESK</span>
            <h3 className="font-['Cinzel'] text-[22px] text-[#f5f5f7] tracking-wide uppercase">Schedule an Atelier Appointment</h3>
            <p className="text-[13.5px] text-[#8c8a94] mt-1 font-light">
              Available for existing Alberka Motors clientele and prospective pre-purchase inspection inquiries.
            </p>
          </div>

          {bookingSubmitted ? (
            <div className="bg-[#0f0714] border border-[#c5a880] p-8 text-center text-[#dfc7a5] space-y-2">
              <CheckCircle2 className="w-8 h-8 mx-auto mb-2 text-[#c5a880]" />
              <h4 className="font-['Cinzel'] text-[18px] tracking-wider uppercase">Appointment Request Dispatched</h4>
              <p className="text-[14px] text-[#8c8a94] font-light">Our Mombasa atelier coordinator is opening your WhatsApp ticket immediately.</p>
            </div>
          ) : (
            <form onSubmit={handleBookingSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="font-['Cinzel'] text-[10px] text-[#8c8a94] uppercase tracking-wider block mb-2">CLIENT NAME</label>
                  <input
                    type="text"
                    required
                    value={bookingData.name}
                    onChange={(e) => setBookingData({ ...bookingData, name: e.target.value })}
                    placeholder="E.G. SAMUEL KARANI"
                    className="w-full px-4 py-2.5 bg-[#0f0714] border border-[rgba(197,168,128,0.25)] text-[12px] font-['Cinzel'] tracking-wider text-[#f5f5f7] focus:outline-none focus:border-[#dfc7a5]"
                  />
                </div>

                <div>
                  <label className="font-['Cinzel'] text-[10px] text-[#8c8a94] uppercase tracking-wider block mb-2">WHATSAPP PHONE</label>
                  <input
                    type="tel"
                    required
                    value={bookingData.phone}
                    onChange={(e) => setBookingData({ ...bookingData, phone: e.target.value })}
                    placeholder="07XX XXX XXX"
                    className="w-full px-4 py-2.5 bg-[#0f0714] border border-[rgba(197,168,128,0.25)] text-[12px] font-mono tracking-wider text-[#f5f5f7] focus:outline-none focus:border-[#dfc7a5]"
                  />
                </div>

                <div>
                  <label className="font-['Cinzel'] text-[10px] text-[#8c8a94] uppercase tracking-wider block mb-2">SERVICE TYPE</label>
                  <select
                    value={bookingData.serviceType}
                    onChange={(e) => setBookingData({ ...bookingData, serviceType: e.target.value })}
                    className="w-full px-4 py-2.5 bg-[#0f0714] border border-[rgba(197,168,128,0.25)] text-[11px] font-['Cinzel'] tracking-wider text-[#dfc7a5] focus:outline-none cursor-pointer"
                  >
                    <option value="100-Point Pre-Purchase Check">100-POINT PRE-PURCHASE CHECK</option>
                    <option value="5,000 km Periodic Service">5,000 KM PERIODIC SERVICE</option>
                    <option value="Computerized OBD-II Diagnostic Scan">COMPUTERIZED OBD-II DIAGNOSTIC SCAN</option>
                    <option value="Hybrid Battery Health Assessment">HYBRID BATTERY HEALTH ASSESSMENT</option>
                    <option value="Studio Ceramic Paint Sealant">STUDIO CERAMIC PAINT SEALANT</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="font-['Cinzel'] text-[10px] text-[#8c8a94] uppercase tracking-wider block mb-2">MARQUE & REGISTRATION</label>
                  <input
                    type="text"
                    required
                    value={bookingData.vehicleModel}
                    onChange={(e) => setBookingData({ ...bookingData, vehicleModel: e.target.value })}
                    placeholder="E.G. TOYOTA RAV4 (KDD 123X)"
                    className="w-full px-4 py-2.5 bg-[#0f0714] border border-[rgba(197,168,128,0.25)] text-[12px] font-['Cinzel'] tracking-wider text-[#f5f5f7] focus:outline-none focus:border-[#dfc7a5]"
                  />
                </div>

                <div>
                  <label className="font-['Cinzel'] text-[10px] text-[#8c8a94] uppercase tracking-wider block mb-2">PREFERRED APPOINTMENT DATE</label>
                  <input
                    type="date"
                    value={bookingData.preferredDate}
                    onChange={(e) => setBookingData({ ...bookingData, preferredDate: e.target.value })}
                    className="w-full px-4 py-2.5 bg-[#0f0714] border border-[rgba(197,168,128,0.25)] text-[12px] font-mono tracking-wider text-[#dfc7a5] focus:outline-none focus:border-[#dfc7a5]"
                  />
                </div>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                <button type="submit" className="btn-rr-solid w-full sm:w-auto">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span>CONFIRM SERVICE BOOKING ON WHATSAPP</span>
                </button>
                <span className="font-mono text-[11px] text-[#8c8a94]">MON – SAT: 08:00 – 18:00 EAT</span>
              </div>
            </form>
          )}
        </div>

      </div>
    </section>
  );
};
