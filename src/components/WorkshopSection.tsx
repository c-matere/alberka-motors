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
      title: '1. Oil & Fluids Service',
      tagline: '100% Castrol Full Synthetic Oil',
      description: 'We never just top up fluids. We drain and replace the engine oil with high-grade Castrol Edge synthetic oil (0W-20 or 0W-16). We fit fresh genuine OEM oil filters, test brake fluid boiling point, and top up long-life radiator coolant.',
      checklist: [
        'Castrol EDGE Titanium fully synthetic engine oil',
        'Genuine OEM oil filter and fresh sump washer',
        'Brake fluid boiling point tested for heat safety',
        'Radiator & hybrid inverter coolant checked and topped up'
      ]
    },
    {
      id: 'brakes',
      icon: Disc,
      title: '2. Brakes & Suspension',
      tagline: 'Micrometer Disc & Pad Thickness Testing',
      description: 'We take all four wheels off to inspect brake discs and pads with digital micrometers. If brake pads have less than 80% life left, we fit brand new ceramic pads immediately. Caliper slide pins are cleaned and greased.',
      checklist: [
        'Brake disc thickness measured against factory limits',
        'Brake pads inspected; renewed if under 80% wear limit',
        'Electronic parking brake and handbrake holding test',
        'Suspension bushings, ball joints, and shock absorbers checked'
      ]
    },
    {
      id: 'diagnostics',
      icon: Activity,
      title: '3. Computer Diagnostics',
      tagline: 'Full OBD-II Health Scan',
      description: 'We connect factory diagnostic scanners (Toyota Techstream, Nissan Consult, Honda HDS) to test every onboard computer. We check the engine, transmission, hybrid system, ABS, and airbags for any hidden faults.',
      checklist: [
        'Zero active or historical fault codes (DTCs)',
        'Live oxygen sensor and fuel injection test',
        'VVT-i / variable valve timing live operational scan',
        'Electronic throttle body cleaned and idle recalibrated'
      ]
    },
    {
      id: 'hybrid',
      icon: BatteryCharging,
      title: '4. Hybrid & Battery Test',
      tagline: 'Cell-Level Voltage & Health Certification',
      description: 'For hybrid and e-POWER vehicles, our technicians test the high-voltage traction battery pack under acceleration. We ensure all cell blocks hold uniform voltage and clean the cooling fan duct to prevent overheating in Kenyan traffic.',
      checklist: [
        'Hybrid battery health verified above 90% benchmark',
        'Battery cooling fan and air intake filter cleaned',
        'Inverter high-voltage insulation and pump check',
        '12V starter battery CCA load tested for reliable starts'
      ]
    },
    {
      id: 'climate',
      icon: Wind,
      title: '5. Air Conditioning & Filters',
      tagline: 'Ice-Cold A/C & Fresh Cabin Air',
      description: 'We replace the engine air filter for better fuel consumption and install a brand new cabin AC filter. We pressure-test the AC compressor and gas levels so your air conditioning blows ice-cold even under hot coastal sun.',
      checklist: [
        'Brand new engine air filter installed',
        'New activated carbon cabin pollen filter installed',
        'AC compressor pressure and refrigerant gas test',
        'Vent output temperature tested below 6°C at max cooling'
      ]
    },
    {
      id: 'detailing',
      icon: Sparkles,
      title: '6. Full Car Wash & Polish',
      tagline: 'Interior Deep Cleaning & Paint Sealant',
      description: 'After sea transit from Japan, the vehicle gets a thorough multi-stage decontamination wash, clay bar paint smoothing, protective wax sealant, and deep steam extraction for all seats and carpets.',
      checklist: [
        'Thorough exterior wash and paint decontamination',
        'Machine wax polish for long-lasting paint shine',
        'Steam cleaning of all fabric and leather seats',
        'UV protectant applied to dashboard and rubber seals'
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
    <section className="w-full bg-[#09090b] py-16 sm:py-24 px-6 sm:px-10 text-[#f4f4f5] border-t border-[#27272a]">
      <div className="max-w-[1400px] mx-auto space-y-16">
        
        {/* Section Header */}
        <div className="text-center max-w-[780px] mx-auto">
          <span className="brand-eyebrow block mb-2">
            IN-HOUSE SERVICE CENTER // TANGANA ROAD, MOMBASA
          </span>
          <h1 className="text-[32px] sm:text-[46px] font-bold text-white tracking-tight mb-4">
            Our Mombasa Workshop & 5,000 KM Warranty
          </h1>
          <p className="text-[16px] sm:text-[18px] text-[#a1a1aa] leading-relaxed">
            We don't outsource mechanical checks. Every car cleared from the Port of Mombasa comes directly to our workshop for a full 100-point service and inspection before delivery.
          </p>
        </div>

        {/* Video & Workshop Highlights */}
        <div className="relative w-full mx-auto">
          <div className="w-full h-[360px] md:h-[480px] overflow-hidden relative bg-[#121215] border border-[#27272a] rounded-[4px]">
            <video autoPlay muted loop playsInline className="w-full h-full object-cover">
              <source src="https://videos.pexels.com/video-files/5309381/5309381-hd_1920_1080_25fps.mp4" type="video/mp4" />
              <img src="https://images.pexels.com/photos/8986138/pexels-photo-8986138.jpeg?auto=compress&cs=tinysrgb&w=1600" alt="Workshop bay" className="w-full h-full object-cover" />
            </video>

            <div className="absolute inset-0 bg-gradient-to-t from-[#09090b] via-[#09090b]/30 to-transparent flex items-end p-6 sm:p-10">
              <div className="text-left text-white max-w-[650px]">
                <span className="font-mono text-[11px] text-[#ef4444] uppercase tracking-wider block mb-1 font-semibold">
                  TANGANA ROAD FACILITY // MOMBASA
                </span>
                <p className="text-[20px] sm:text-[26px] font-bold text-white leading-snug">
                  100-Point Pre-Delivery Check with Written Inspection Certificate
                </p>
              </div>
            </div>
          </div>

          <div className="bg-[#121215] border border-[#27272a] p-6 sm:p-8 max-w-[960px] mx-auto -mt-8 relative z-20 grid grid-cols-2 sm:grid-cols-4 gap-6 text-left rounded-[4px] shadow-2xl">
            <div>
              <span className="font-mono text-[10px] text-[#71717a] uppercase tracking-wider block mb-1">SERVICE DURATION</span>
              <span className="text-[15px] font-bold text-white">48-Hour Protocol</span>
            </div>
            <div>
              <span className="font-mono text-[10px] text-[#71717a] uppercase tracking-wider block mb-1">ENGINE OIL</span>
              <span className="text-[15px] font-bold text-white">Castrol Full Synthetic</span>
            </div>
            <div>
              <span className="font-mono text-[10px] text-[#71717a] uppercase tracking-wider block mb-1">WRITTEN WARRANTY</span>
              <span className="text-[15px] font-bold text-[#ef4444]">5,000 KM Engine & Gearbox</span>
            </div>
            <div>
              <span className="font-mono text-[10px] text-[#71717a] uppercase tracking-wider block mb-1">INSPECTION MARKS</span>
              <span className="text-[15px] font-bold text-white">100 Certified Points</span>
            </div>
          </div>
        </div>

        {/* Interactive 6-Stage Protocol Explorer */}
        <div className="bg-[#121215] p-6 sm:p-10 border border-[#27272a] rounded-[4px] space-y-6">
          <div className="max-w-[700px]">
            <span className="brand-eyebrow mb-1 block">OUR 100-POINT CHECKLIST</span>
            <h2 className="text-[24px] sm:text-[30px] font-bold text-white tracking-tight">
              What We Check Before Handover
            </h2>
            <p className="text-[15px] text-[#a1a1aa] mt-1 leading-relaxed">
              Click any stage below to see what our technicians inspect, service, and replace before you collect your car.
            </p>
          </div>

          {/* Stage Selector Buttons */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {stages.map((st, i) => {
              const Icon = st.icon;
              const isActive = activeStage === i;
              return (
                <button
                  key={st.id}
                  onClick={() => setActiveStage(i)}
                  className={`p-4 text-left transition-all rounded-[3px] cursor-pointer flex flex-col justify-between h-[96px] ${
                    isActive
                      ? 'bg-[#18181c] border-2 border-[#dc2626]'
                      : 'bg-[#18181c] hover:bg-[#202025] border border-[#27272a]'
                  }`}
                >
                  <Icon className={`w-5 h-5 ${isActive ? 'text-[#ef4444]' : 'text-[#a1a1aa]'}`} />
                  <span className={`text-[12px] font-medium leading-tight ${isActive ? 'text-white' : 'text-[#a1a1aa]'}`}>
                    {st.title.split('. ')[1]}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Active Stage Detailed Breakdown */}
          <div className="bg-[#18181c] p-6 sm:p-8 border border-[#27272a] rounded-[3px] space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#27272a]">
              <div>
                <span className="font-mono text-[10.5px] text-[#ef4444] uppercase tracking-wider block font-semibold mb-0.5">
                  STAGE {activeStage + 1} OF 6
                </span>
                <h3 className="text-[22px] font-bold text-white">{stages[activeStage].title}</h3>
                <p className="text-[14px] text-[#d4d4d8] mt-0.5">{stages[activeStage].tagline}</p>
              </div>
              <span className="font-mono text-[11px] font-semibold text-[#27a644] bg-[#27a644]/10 border border-[#27a644]/30 px-3 py-1 rounded-[2px] w-fit">
                MANDATORY WORKSHOP PASS
              </span>
            </div>

            <p className="text-[14.5px] text-[#a1a1aa] leading-relaxed">
              {stages[activeStage].description}
            </p>

            <div className="pt-2">
              <span className="font-mono text-[11px] uppercase tracking-wider text-white block mb-3 font-semibold">
                CHECKLIST PROCEDURES:
              </span>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {stages[activeStage].checklist.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-[14px] text-[#e4e4e7]">
                    <CheckCircle2 className="w-4 h-4 text-[#ef4444] shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 5,000 KM Warranty Section */}
        <div className="bg-[#121215] p-6 sm:p-10 border border-[#27272a] rounded-[4px] space-y-6">
          <div className="max-w-[700px]">
            <span className="brand-eyebrow mb-1 block">WRITTEN WARRANTY</span>
            <h2 className="text-[24px] sm:text-[30px] font-bold text-white tracking-tight">
              Our 5,000 KM Written Warranty
            </h2>
            <p className="text-[15px] text-[#a1a1aa] mt-1 leading-relaxed">
              Every passenger car sold at Alberka Motors comes with a formal written warranty covering you for 5,000 km or 90 days from the handover date.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4 border-t border-[#27272a]">
            <div className="space-y-3">
              <h4 className="text-[15px] font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#ef4444]" />
                What Is Covered
              </h4>
              <ul className="space-y-2 text-[14px] text-[#a1a1aa]">
                <li>• Engine cylinder block, head, valves, pistons, and camshaft</li>
                <li>• Automatic transmission, torque converter, and CVT assembly</li>
                <li>• Hybrid electric drive motor, reduction gear, and inverter circuit</li>
                <li>• Starter motor, alternator charging system, and engine water pump</li>
              </ul>
            </div>

            <div className="space-y-3">
              <h4 className="text-[15px] font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <FileCheck className="w-4 h-4 text-[#ef4444]" />
                Customer Support
              </h4>
              <ul className="space-y-2 text-[14px] text-[#a1a1aa]">
                <li>• Free 2,500 km intermediate fluid check at our Mombasa or Nairobi showroom</li>
                <li>• Direct WhatsApp support from our workshop technical team</li>
                <li>• Direct access to genuine Japanese spare parts at fair dealer prices</li>
                <li>• Official inspection handover certificate signed by our head technician</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Service Booking Form */}
        <div className="bg-[#121215] p-6 sm:p-10 border border-[#27272a] rounded-[4px] space-y-6">
          <div className="max-w-[650px]">
            <span className="brand-eyebrow mb-1 block">BOOK SERVICE</span>
            <h3 className="text-[22px] font-bold text-white tracking-tight">Book a Workshop Appointment</h3>
            <p className="text-[14px] text-[#a1a1aa] mt-0.5">
              Available for Alberka clients and pre-purchase vehicle inspections in Mombasa.
            </p>
          </div>

          {bookingSubmitted ? (
            <div className="bg-[#18181c] border border-[#27a644] p-8 text-center text-white space-y-2 rounded-[4px]">
              <CheckCircle2 className="w-8 h-8 mx-auto mb-2 text-[#27a644]" />
              <h4 className="text-[18px] font-bold">Booking Request Sent!</h4>
              <p className="text-[14px] text-[#a1a1aa]">Our workshop team in Mombasa is opening your WhatsApp message right now.</p>
            </div>
          ) : (
            <form onSubmit={handleBookingSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div>
                  <label className="text-[12px] font-mono uppercase text-[#a1a1aa] block mb-1.5">Your Name</label>
                  <input
                    type="text"
                    required
                    value={bookingData.name}
                    onChange={(e) => setBookingData({ ...bookingData, name: e.target.value })}
                    placeholder="e.g. Samuel Karani"
                    className="w-full px-4 py-2.5 bg-[#09090b] border border-[#27272a] rounded-[3px] text-[14px] text-white focus:outline-none focus:border-[#dc2626]"
                  />
                </div>

                <div>
                  <label className="text-[12px] font-mono uppercase text-[#a1a1aa] block mb-1.5">Phone Number (WhatsApp)</label>
                  <input
                    type="tel"
                    required
                    value={bookingData.phone}
                    onChange={(e) => setBookingData({ ...bookingData, phone: e.target.value })}
                    placeholder="07XX XXX XXX"
                    className="w-full px-4 py-2.5 bg-[#09090b] border border-[#27272a] rounded-[3px] text-[14px] font-mono text-white focus:outline-none focus:border-[#dc2626]"
                  />
                </div>

                <div>
                  <label className="text-[12px] font-mono uppercase text-[#a1a1aa] block mb-1.5">Service Type</label>
                  <select
                    value={bookingData.serviceType}
                    onChange={(e) => setBookingData({ ...bookingData, serviceType: e.target.value })}
                    className="w-full px-4 py-2.5 bg-[#09090b] border border-[#27272a] rounded-[3px] text-[13.5px] text-white focus:outline-none focus:border-[#dc2626] cursor-pointer"
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
                  <label className="text-[12px] font-mono uppercase text-[#a1a1aa] block mb-1.5">Car Model & Reg</label>
                  <input
                    type="text"
                    required
                    value={bookingData.vehicleModel}
                    onChange={(e) => setBookingData({ ...bookingData, vehicleModel: e.target.value })}
                    placeholder="e.g. Toyota RAV4 (KDD 123X)"
                    className="w-full px-4 py-2.5 bg-[#09090b] border border-[#27272a] rounded-[3px] text-[14px] text-white focus:outline-none focus:border-[#dc2626]"
                  />
                </div>

                <div>
                  <label className="text-[12px] font-mono uppercase text-[#a1a1aa] block mb-1.5">Preferred Date</label>
                  <input
                    type="date"
                    value={bookingData.preferredDate}
                    onChange={(e) => setBookingData({ ...bookingData, preferredDate: e.target.value })}
                    className="w-full px-4 py-2.5 bg-[#09090b] border border-[#27272a] rounded-[3px] text-[14px] font-mono text-white focus:outline-none focus:border-[#dc2626]"
                  />
                </div>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                <button type="submit" className="btn-white font-semibold w-full sm:w-auto">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span>Send Booking via WhatsApp</span>
                </button>
                <span className="font-mono text-[12px] text-[#71717a]">Opening Hours: Mon – Sat: 8:00 AM – 6:00 PM</span>
              </div>
            </form>
          )}
        </div>

      </div>
    </section>
  );
};
