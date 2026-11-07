import React, { useState } from 'react';
import { Phone, Mail, Clock, Calendar, CheckCircle2, MessageCircle } from 'lucide-react';
import { Vehicle } from '../data/vehicles';

interface LocationsSectionProps {
  vehicles: Vehicle[];
  preselectedVehicle?: Vehicle | null;
}

export const LocationsSection: React.FC<LocationsSectionProps> = ({
  vehicles,
  preselectedVehicle,
}) => {
  const [testDriveData, setTestDriveData] = useState({
    name: '',
    phone: '',
    location: 'Mombasa — Tangana Road',
    carName: preselectedVehicle?.name || vehicles[0]?.name || '',
    preferredDate: '',
    timeSlot: 'Morning (9:00 AM – 12:00 PM)',
  });
  const [bookingSuccess, setBookingSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = encodeURIComponent(
      `Salutations Alberka Motors, my name is ${testDriveData.name} (${testDriveData.phone}). I wish to arrange a private viewing and consultation for the ${testDriveData.carName} at your ${testDriveData.location} suite on ${testDriveData.preferredDate || 'the earliest available date'} (${testDriveData.timeSlot}).`
    );
    window.open(`https://wa.me/254714333888?text=${msg}`, '_blank');
    setBookingSuccess(true);
  };

  return (
    <section className="w-full bg-[#160a1d] py-20 sm:py-28 px-6 text-[#f5f5f7] border-t border-[rgba(197,168,128,0.18)]">
      <div className="max-w-[1400px] mx-auto space-y-20">
        
        {/* Section Header */}
        <div className="text-center max-w-[800px] mx-auto">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="h-[1px] w-6 bg-[rgba(197,168,128,0.4)]" />
            <span className="rr-eyebrow">
              PRIVATE SHOWROOM SUITES & ATELIERS
            </span>
            <div className="h-[1px] w-6 bg-[rgba(197,168,128,0.4)]" />
          </div>
          <h1 className="rr-title-h1 text-[32px] sm:text-[46px] md:text-[54px] mb-4">
            THE SHOWROOM SUITES.
          </h1>
          <p className="text-[#dfc7a5] font-['Cormorant_Garamond'] text-[18px] sm:text-[21px] italic leading-relaxed max-w-[700px] mx-auto">
            Experience our private hospitality in Mombasa and Nairobi. Sample the silent propulsion of Japanese e-POWER and hybrid engineering, inspect chassis undercarriages on our workshop hoists, and consult our senior curation directors.
          </p>
        </div>

        {/* Showrooms Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Mombasa Flagship */}
          <div className="bg-[#131316] border border-[rgba(197,168,128,0.25)] p-8 sm:p-10 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-2">
                <span className="rr-eyebrow">COASTAL ATELIER & HEADQUARTERS</span>
                <span className="font-['Cinzel'] text-[10px] text-[#c5a880] border border-[rgba(197,168,128,0.3)] px-2.5 py-0.5 uppercase">
                  MASTER WORKSHOP ON-SITE
                </span>
              </div>
              <h2 className="font-['Cinzel'] text-[22px] sm:text-[26px] text-[#f5f5f7] tracking-wider uppercase">Mombasa Flagship Atelier</h2>
              <p className="text-[14px] text-[#8c8a94] leading-relaxed font-light">
                Tangana Road (Opposite AutoXpress / Near the Railway Station), Majengo, Mombasa Island.<br />
                <span className="text-[12.5px] text-[#dfc7a5] font-['Cinzel'] mt-1 block">Nyali Suite: Links Road, Nyali, Mombasa.</span>
              </p>

              <div className="space-y-3 py-5 border-y border-[rgba(197,168,128,0.15)] text-[13.5px]">
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-[#c5a880]" />
                  <a href="tel:+254714333888" className="font-mono text-[#f5f5f7] hover:text-[#dfc7a5] transition-colors">+254 714 333888</a>
                  <span className="text-[rgba(197,168,128,0.3)]">//</span>
                  <a href="tel:+254737333888" className="font-mono text-[#f5f5f7] hover:text-[#dfc7a5] transition-colors">+254 737 333888</a>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-[#c5a880]" />
                  <a href="mailto:sales@alberkamotors.co.ke" className="font-mono text-[#8c8a94] hover:text-[#f5f5f7] transition-colors">sales@alberkamotors.co.ke</a>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-4 h-4 text-[#c5a880]" />
                  <span className="font-['Cinzel'] text-[11px] text-[#8c8a94] tracking-wider uppercase">Mon – Sat: 08:00 – 18:00 (Sunday by private appointment)</span>
                </div>
              </div>
            </div>

            <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="font-['Cinzel'] text-[10px] text-[#8c8a94] uppercase tracking-wider">Hydraulic Hoists & Diagnostics</span>
              <a
                href="https://wa.me/254714333888?text=Salutations%20Mombasa%20Atelier,%20I%20wish%20to%20reserve%20a%20visit."
                target="_blank"
                rel="noopener noreferrer"
                className="btn-rr-solid w-full sm:w-auto"
              >
                CONNECT WITH MOMBASA DESK
              </a>
            </div>
          </div>

          {/* Nairobi Capital Hub */}
          <div className="bg-[#131316] border border-[rgba(197,168,128,0.25)] p-8 sm:p-10 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-2">
                <span className="rr-eyebrow">CAPITAL CITY EXECUTIVE SUITE</span>
                <span className="font-['Cinzel'] text-[10px] text-[#c5a880] border border-[rgba(197,168,128,0.3)] px-2.5 py-0.5 uppercase">
                  WESTLANDS PRIME
                </span>
              </div>
              <h2 className="font-['Cinzel'] text-[22px] sm:text-[26px] text-[#f5f5f7] tracking-wider uppercase">Nairobi Westlands Suite</h2>
              <p className="text-[14px] text-[#8c8a94] leading-relaxed font-light">
                Mwanzi Road, Westlands (Directly opposite Westgate Mall Entrance), Nairobi.<br />
                <span className="text-[12.5px] text-[#dfc7a5] font-['Cinzel'] mt-1 block">VIP Enclosed Handover Bay & Secure Private Parking.</span>
              </p>

              <div className="space-y-3 py-5 border-y border-[rgba(197,168,128,0.15)] text-[13.5px]">
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-[#c5a880]" />
                  <a href="tel:+254748999333" className="font-mono text-[#f5f5f7] hover:text-[#dfc7a5] transition-colors">+254 748 999333</a>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-[#c5a880]" />
                  <a href="mailto:nairobi@alberkamotors.co.ke" className="font-mono text-[#8c8a94] hover:text-[#f5f5f7] transition-colors">nairobi@alberkamotors.co.ke</a>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-4 h-4 text-[#c5a880]" />
                  <span className="font-['Cinzel'] text-[11px] text-[#8c8a94] tracking-wider uppercase">Mon – Sat: 08:30 – 18:00 (Sunday by private appointment)</span>
                </div>
              </div>
            </div>

            <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="font-['Cinzel'] text-[10px] text-[#8c8a94] uppercase tracking-wider">Executive Handover & Delivery</span>
              <a
                href="https://wa.me/254748999333?text=Salutations%20Nairobi%20Suite,%20I%20wish%20to%20reserve%20a%20private%20viewing%20in%20Westlands."
                target="_blank"
                rel="noopener noreferrer"
                className="btn-rr-solid w-full sm:w-auto"
              >
                CONNECT WITH NAIROBI DESK
              </a>
            </div>
          </div>

        </div>

        {/* Private Viewing Booking Studio */}
        <div className="bg-[#131316] border border-[rgba(197,168,128,0.3)] p-8 sm:p-12 space-y-6">
          <div className="max-w-[700px]">
            <span className="rr-eyebrow mb-2 block">WHISPERS PRIVATE CONCIERGE</span>
            <h3 className="font-['Cinzel'] text-[24px] text-[#f5f5f7] tracking-wide uppercase">Schedule a Private Viewing & Test Drive</h3>
            <p className="text-[13.5px] text-[#8c8a94] mt-1 font-light">
              Select your marquee and preferred showroom suite. We detail, fuel, and park your vehicle in our private customer bay prior to your arrival.
            </p>
          </div>

          {bookingSuccess ? (
            <div className="bg-[#0f0714] border border-[#c5a880] p-8 text-center text-[#dfc7a5] space-y-2">
              <CheckCircle2 className="w-8 h-8 mx-auto mb-2 text-[#c5a880]" />
              <h4 className="font-['Cinzel'] text-[18px] tracking-wider uppercase">Viewing Scheduled Successfully</h4>
              <p className="text-[14px] text-[#8c8a94] font-light">Our concierge is connecting via WhatsApp with your private suite security pass.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="font-['Cinzel'] text-[10px] text-[#8c8a94] uppercase tracking-wider block mb-2">FULL NAME</label>
                  <input
                    type="text"
                    required
                    value={testDriveData.name}
                    onChange={(e) => setTestDriveData({ ...testDriveData, name: e.target.value })}
                    placeholder="E.G. DAVID MWANGI"
                    className="w-full px-4 py-2.5 bg-[#0f0714] border border-[rgba(197,168,128,0.25)] text-[12px] font-['Cinzel'] tracking-wider text-[#f5f5f7] focus:outline-none focus:border-[#dfc7a5]"
                  />
                </div>

                <div>
                  <label className="font-['Cinzel'] text-[10px] text-[#8c8a94] uppercase tracking-wider block mb-2">WHATSAPP CONTACT</label>
                  <input
                    type="tel"
                    required
                    value={testDriveData.phone}
                    onChange={(e) => setTestDriveData({ ...testDriveData, phone: e.target.value })}
                    placeholder="07XX XXX XXX"
                    className="w-full px-4 py-2.5 bg-[#0f0714] border border-[rgba(197,168,128,0.25)] text-[12px] font-mono tracking-wider text-[#f5f5f7] focus:outline-none focus:border-[#dfc7a5]"
                  />
                </div>

                <div>
                  <label className="font-['Cinzel'] text-[10px] text-[#8c8a94] uppercase tracking-wider block mb-2">PREFERRED SUITE</label>
                  <select
                    value={testDriveData.location}
                    onChange={(e) => setTestDriveData({ ...testDriveData, location: e.target.value })}
                    className="w-full px-4 py-2.5 bg-[#0f0714] border border-[rgba(197,168,128,0.25)] text-[11px] font-['Cinzel'] tracking-wider text-[#dfc7a5] focus:outline-none cursor-pointer"
                  >
                    <option value="Mombasa — Tangana Road">MOMBASA (TANGANA ROAD FLAGSHIP)</option>
                    <option value="Mombasa — Nyali Branch">MOMBASA (NYALI SUITE)</option>
                    <option value="Nairobi — Westlands Mwanzi Rd">NAIROBI (WESTLANDS MWANZI RD)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="font-['Cinzel'] text-[10px] text-[#8c8a94] uppercase tracking-wider block mb-2">MARQUE OF CHOICE</label>
                  <select
                    value={testDriveData.carName}
                    onChange={(e) => setTestDriveData({ ...testDriveData, carName: e.target.value })}
                    className="w-full px-4 py-2.5 bg-[#0f0714] border border-[rgba(197,168,128,0.25)] text-[11px] font-['Cinzel'] tracking-wider text-[#dfc7a5] focus:outline-none cursor-pointer"
                  >
                    {vehicles.map((v) => (
                      <option key={v.id} value={v.name}>
                        {v.name} ({v.stockNo})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="font-['Cinzel'] text-[10px] text-[#8c8a94] uppercase tracking-wider block mb-2">PREFERRED DATE</label>
                  <input
                    type="date"
                    value={testDriveData.preferredDate}
                    onChange={(e) => setTestDriveData({ ...testDriveData, preferredDate: e.target.value })}
                    className="w-full px-4 py-2.5 bg-[#0f0714] border border-[rgba(197,168,128,0.25)] text-[12px] font-mono tracking-wider text-[#dfc7a5] focus:outline-none focus:border-[#dfc7a5]"
                  />
                </div>

                <div>
                  <label className="font-['Cinzel'] text-[10px] text-[#8c8a94] uppercase tracking-wider block mb-2">TIME WINDOW</label>
                  <select
                    value={testDriveData.timeSlot}
                    onChange={(e) => setTestDriveData({ ...testDriveData, timeSlot: e.target.value })}
                    className="w-full px-4 py-2.5 bg-[#0f0714] border border-[rgba(197,168,128,0.25)] text-[11px] font-['Cinzel'] tracking-wider text-[#dfc7a5] focus:outline-none cursor-pointer"
                  >
                    <option value="Morning (9:00 AM – 12:00 PM)">MORNING (09:00 – 12:00)</option>
                    <option value="Afternoon (1:00 PM – 4:00 PM)">AFTERNOON (13:00 – 16:00)</option>
                    <option value="Late Afternoon (4:00 PM – 6:00 PM)">LATE AFTERNOON (16:00 – 18:00)</option>
                  </select>
                </div>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                <button type="submit" className="btn-rr-solid w-full sm:w-auto">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span>CONFIRM PRIVATE VIEWING ON WHATSAPP</span>
                </button>
                <span className="font-['Cinzel'] text-[10px] text-[#8c8a94] uppercase tracking-wider">Valid driving credentials required upon arrival</span>
              </div>
            </form>
          )}
        </div>

      </div>
    </section>
  );
};
