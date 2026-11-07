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
    <section className="w-full bg-[#08090a] py-16 px-4 sm:px-6 text-[#d0d6e0] border-t border-[#23252a]">
      <div className="max-w-[1200px] mx-auto space-y-16">
        
        {/* Header */}
        <div className="text-center max-w-[680px] mx-auto">
          <span className="launch-status-label mb-2">
            Tangana Road, Mombasa // Established 2000
          </span>
          <h1 className="hero-display mb-3">
            The In-House Workshop.
          </h1>
          <p className="text-[14px] sm:text-[15px] text-[#8a8f98] leading-relaxed">
            We do not outsource mechanical servicing. Every vehicle cleared from the port of Mombasa enters our specialized mechanical facility for a mandatory 48-hour overhaul before handover.
          </p>
        </div>

        {/* Workshop Hero Video Stage */}
        <div className="relative w-full mx-auto">
          <div className="w-full h-[380px] md:h-[480px] rounded-[12px] overflow-hidden relative bg-[#0f1011] border border-[#23252a]">
            <video autoPlay muted loop playsInline className="w-full h-full object-cover">
              <source src="https://videos.pexels.com/video-files/5309381/5309381-hd_1920_1080_25fps.mp4" type="video/mp4" />
              <img src="https://images.pexels.com/photos/8986138/pexels-photo-8986138.jpeg?auto=compress&cs=tinysrgb&w=1600" alt="Workshop bay" className="w-full h-full object-cover" />
            </video>

            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-6 sm:p-8">
              <div className="text-left text-white max-w-[580px]">
                <span className="font-mono text-[11px] text-[#8a8f98] uppercase tracking-wider block mb-1">
                  Engineering Facility · Tangana Road, Mombasa
                </span>
                <p className="text-[18px] sm:text-[22px] font-medium leading-tight text-[#ffffff]">
                  100-Point Inspection Protocol with full written handover certificate.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-[#0f1011] border border-[#23252a] rounded-[12px] p-6 max-w-[800px] mx-auto -mt-8 relative z-20 grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 text-left shadow-xl">
            <div>
              <span className="font-mono text-[11px] text-[#8a8f98] uppercase tracking-wide block">Standard Hours</span>
              <span className="text-[15px] font-medium text-[#ffffff]">48-Hour Protocol</span>
            </div>
            <div>
              <span className="font-mono text-[11px] text-[#8a8f98] uppercase tracking-wide block">Engine Lubrication</span>
              <span className="text-[15px] font-medium text-[#ffffff]">Castrol Full Synthetic</span>
            </div>
            <div>
              <span className="font-mono text-[11px] text-[#8a8f98] uppercase tracking-wide block">Warranty Covenant</span>
              <span className="text-[15px] font-medium text-[#ffffff]">5,000 km Written</span>
            </div>
            <div>
              <span className="font-mono text-[11px] text-[#8a8f98] uppercase tracking-wide block">Checklist Items</span>
              <span className="text-[15px] font-medium text-[#ffffff]">100 Certified</span>
            </div>
          </div>
        </div>

        {/* Interactive 6-Stage Protocol Explorer */}
        <div className="bg-[#0f1011] p-6 sm:p-10 rounded-[12px] border border-[#23252a]">
          <div className="max-w-[640px] mb-8">
            <span className="launch-status-label mb-1">Pre-Delivery Standard</span>
            <h2 className="text-[24px] sm:text-[28px] font-medium text-[#ffffff] leading-tight">
              Interactive 100-Point Inspection Guide
            </h2>
            <p className="text-[14px] text-[#8a8f98] mt-1.5 leading-relaxed">
              Select a stage below to examine our exact procedures, testing thresholds, and replacement parts.
            </p>
          </div>

          {/* Stage Selector Buttons */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 mb-6">
            {stages.map((st, i) => {
              const Icon = st.icon;
              const isActive = activeStage === i;
              return (
                <button
                  key={st.id}
                  onClick={() => setActiveStage(i)}
                  className={`p-3 rounded-[6px] text-left transition-all cursor-pointer flex flex-col justify-between h-[84px] ${
                    isActive
                      ? 'bg-[#161718] border border-[#e4f222] shadow-xs'
                      : 'bg-transparent hover:bg-[#161718] border border-[#23252a]'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-[#e4f222]' : 'text-[#8a8f98]'}`} />
                  <span className={`text-[12px] font-normal ${isActive ? 'text-[#ffffff] font-medium' : 'text-[#8a8f98]'}`}>
                    {st.title.split('. ')[1]}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Active Stage Detailed Breakdown */}
          <div className="bg-[#161718] p-6 sm:p-8 rounded-[8px] border border-[#23252a] space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-[#23252a]">
              <div>
                <span className="font-mono text-[11px] text-[#8a8f98] uppercase tracking-wider block">
                  Stage {activeStage + 1} of 6
                </span>
                <h3 className="text-[20px] font-medium text-[#ffffff]">{stages[activeStage].title}</h3>
                <p className="text-[13px] text-[#8a8f98] font-normal">{stages[activeStage].tagline}</p>
              </div>
              <span className="inline-flex items-center gap-1.5 text-[11px] font-mono bg-[#27a644]/10 text-[#27a644] border border-[#27a644]/30 px-2.5 py-1 rounded-[4px] w-fit">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Mandatory Pass
              </span>
            </div>

            <p className="text-[14px] text-[#d0d6e0] leading-relaxed">
              {stages[activeStage].description}
            </p>

            <div className="pt-2">
              <span className="font-mono text-[11px] text-[#8a8f98] uppercase tracking-wider block mb-3">
                Laboratory & Workshop Verification Checklist:
              </span>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                {stages[activeStage].checklist.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-[13px] text-[#d0d6e0]">
                    <CheckCircle2 className="w-4 h-4 text-[#27a644] shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Warranty Covenant & Legal Terms */}
        <div className="bg-[#0f1011] p-6 sm:p-10 rounded-[12px] border border-[#23252a]">
          <div className="max-w-[640px] mb-6">
            <span className="launch-status-label mb-1">Peace of Mind</span>
            <h2 className="text-[24px] sm:text-[28px] font-medium text-[#ffffff] leading-snug">
              The 5,000 km Warranty Covenant.
            </h2>
            <p className="text-[14px] text-[#8a8f98] mt-2 leading-relaxed">
              Every retail passenger vehicle includes our formal written warranty backing you for 5,000 kilometers or 90 days from handover date.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6 border-t border-[#23252a]">
            <div className="space-y-3.5">
              <h4 className="text-[15px] font-medium text-[#ffffff] flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#8a8f98]" />
                Covered Systems
              </h4>
              <ul className="space-y-2 text-[13px] text-[#8a8f98]">
                <li>• Engine cylinder block, head, valves, pistons, and camshaft assemblies</li>
                <li>• Automatic transmission, torque converter, and CVT belt/pulley assemblies</li>
                <li>• Hybrid electric drive motors, reduction gears, and inverter circuits</li>
                <li>• Engine starter motor, alternator charging system, and cooling water pump</li>
              </ul>
            </div>

            <div className="space-y-3.5">
              <h4 className="text-[15px] font-medium text-[#ffffff] flex items-center gap-2">
                <FileCheck className="w-4 h-4 text-[#8a8f98]" />
                Customer Assurance
              </h4>
              <ul className="space-y-2 text-[13px] text-[#8a8f98]">
                <li>• Free intermediate 2,500 km fluid check at either Mombasa or Nairobi branch</li>
                <li>• WhatsApp priority line directly to our Master Diagnostic Technician</li>
                <li>• Direct access to genuine OEM Japanese spare parts at dealer trade discount</li>
                <li>• Full written handover inspection cert signed by the lead mechanic</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Book Workshop Service Form */}
        <div className="bg-[#0f1011] p-6 sm:p-10 rounded-[12px] border border-[#23252a]">
          <div className="max-w-[580px] mb-6">
            <span className="launch-status-label mb-1">Service Desk</span>
            <h3 className="text-[20px] font-medium text-[#ffffff]">Schedule an In-House Workshop Appointment</h3>
            <p className="text-[13px] text-[#8a8f98] mt-1">
              Available for existing Alberka Motors vehicle owners and prospective pre-purchase inspection clients.
            </p>
          </div>

          {bookingSubmitted ? (
            <div className="bg-[#27a644]/10 border border-[#27a644]/30 rounded-[6px] p-6 text-center text-[#27a644]">
              <CheckCircle2 className="w-7 h-7 mx-auto mb-2" />
              <h4 className="text-[16px] font-medium">Appointment Request Dispatched</h4>
              <p className="text-[13px] mt-1 text-[#d0d6e0]">Our Mombasa service coordinator is opening your WhatsApp ticket right now.</p>
            </div>
          ) : (
            <form onSubmit={handleBookingSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-[12px] text-[#8a8f98] mb-1.5">Your Name</label>
                  <input
                    type="text"
                    required
                    value={bookingData.name}
                    onChange={(e) => setBookingData({ ...bookingData, name: e.target.value })}
                    placeholder="e.g. Samuel Karani"
                    className="w-full px-3.5 py-2 rounded-[6px] bg-[#161718] border border-[#23252a] text-[13px] text-[#ffffff] focus:outline-none focus:border-[#383b3f]"
                  />
                </div>

                <div>
                  <label className="block text-[12px] text-[#8a8f98] mb-1.5">WhatsApp Phone</label>
                  <input
                    type="tel"
                    required
                    value={bookingData.phone}
                    onChange={(e) => setBookingData({ ...bookingData, phone: e.target.value })}
                    placeholder="07XX XXX XXX"
                    className="w-full px-3.5 py-2 rounded-[6px] bg-[#161718] border border-[#23252a] text-[13px] text-[#ffffff] focus:outline-none focus:border-[#383b3f]"
                  />
                </div>

                <div>
                  <label className="block text-[12px] text-[#8a8f98] mb-1.5">Service Type</label>
                  <select
                    value={bookingData.serviceType}
                    onChange={(e) => setBookingData({ ...bookingData, serviceType: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-[6px] bg-[#161718] border border-[#23252a] text-[13px] text-[#d0d6e0] focus:outline-none cursor-pointer"
                  >
                    <option value="100-Point Pre-Purchase Check">100-Point Pre-Purchase Check</option>
                    <option value="5,000 km Periodic Service">5,000 km Periodic Service</option>
                    <option value="Computerized OBD-II Diagnostic Scan">Computerized OBD-II Diagnostic Scan</option>
                    <option value="Hybrid Battery Health Assessment">Hybrid Battery Health Assessment</option>
                    <option value="Studio Ceramic Paint Sealant">Studio Ceramic Paint Sealant</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[12px] text-[#8a8f98] mb-1.5">Vehicle Model & Registration</label>
                  <input
                    type="text"
                    required
                    value={bookingData.vehicleModel}
                    onChange={(e) => setBookingData({ ...bookingData, vehicleModel: e.target.value })}
                    placeholder="e.g. Toyota RAV4 (KDD 123X)"
                    className="w-full px-3.5 py-2 rounded-[6px] bg-[#161718] border border-[#23252a] text-[13px] text-[#ffffff] focus:outline-none focus:border-[#383b3f]"
                  />
                </div>

                <div>
                  <label className="block text-[12px] text-[#8a8f98] mb-1.5">Preferred Appointment Date</label>
                  <input
                    type="date"
                    value={bookingData.preferredDate}
                    onChange={(e) => setBookingData({ ...bookingData, preferredDate: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-[6px] bg-[#161718] border border-[#23252a] text-[13px] text-[#d0d6e0] focus:outline-none focus:border-[#383b3f]"
                  />
                </div>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                <button type="submit" className="btn-primary w-full sm:w-auto cursor-pointer">
                  <Calendar className="w-4 h-4" />
                  <span>Confirm Service Booking on WhatsApp</span>
                </button>
                <span className="font-mono text-[11px] text-[#8a8f98]">Mon – Sat: 08:00 – 18:00</span>
              </div>
            </form>
          )}
        </div>

      </div>
    </section>
  );
};
