import React, { useState } from 'react';
import { Phone, Mail, Clock, Calendar, CheckCircle2, MessageCircle, ArrowRight, Navigation, Compass } from 'lucide-react';
import { Vehicle } from '../data/vehicles';
import { CmsPage, CmsSiteSettings } from '../services/cmsContent';

interface LocationsSectionProps {
  vehicles: Vehicle[];
  preselectedVehicle?: Vehicle | null;
  pageData?: CmsPage;
  settings?: CmsSiteSettings;
}

export const LocationsSection: React.FC<LocationsSectionProps> = ({
  vehicles,
  preselectedVehicle,
  pageData,
  settings,
}) => {
  const [testDriveData, setTestDriveData] = useState({
    name: '',
    phone: '',
    location: 'Alberka Enterprises Limited (Next to Ganjoni Primary School)',
    carName: preselectedVehicle?.name || vehicles[0]?.name || '',
    preferredDate: '',
    timeSlot: 'Morning (9:00 AM – 12:00 PM)',
  });
  const [bookingSuccess, setBookingSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = encodeURIComponent(
      `Hello Alberka Enterprises, my name is ${testDriveData.name} (${testDriveData.phone}). I would like to book a private test drive for the ${testDriveData.carName} at your showroom next to Ganjoni Primary School, Mombasa on ${testDriveData.preferredDate || 'the earliest available date'} (${testDriveData.timeSlot}).`
    );
    window.open(`https://wa.me/254180423075?text=${msg}`, '_blank');
    setBookingSuccess(true);
  };

  return (
    <section className="w-full bg-transparent py-16 sm:py-24 px-4 sm:px-8 text-zinc-900 relative">
      <div className="max-w-[1240px] mx-auto space-y-16 sm:space-y-20 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-[800px] mx-auto space-y-3">
          <div className="inline-flex items-center gap-2">
            <span className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-red-600 font-bold">
              {pageData?.badge || 'OFFICIAL SHOWROOM · QUALITY JAPANESE IMPORTS'}
            </span>
          </div>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold text-zinc-950 tracking-[-0.035em] leading-[1.05]">
            {pageData?.heroTitle || 'Our Showroom & Workshop Hub'}
          </h1>
          <p className="text-base sm:text-lg text-zinc-600 leading-relaxed font-normal max-w-2xl mx-auto">
            {pageData?.heroSubtitle || 'Visit our flagship showroom next to Ganjoni Primary School in Mombasa. Experience our verified Japanese collection in person, tour our technical workshop hoist, or test drive your vehicle.'}
          </p>
        </div>

        {/* Flagship Showroom Card (Single Official Showroom) */}
        <div className="max-w-4xl mx-auto">
          <div className="relative bg-white border border-[#ebebeb] hover:border-[#dddddd] rounded-[14px] p-6 sm:p-10 shadow-xs hover:shadow-sm transition-all duration-300 text-left overflow-hidden group">
            <div className="absolute top-0 left-0 right-0 h-1 bg-[#ff385c]" />
            
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#ebebeb] pb-5">
                <div>
                  <div className="inline-flex items-center gap-2 mb-1">
                    <span className="font-mono text-[11px] text-[#ff385c] uppercase tracking-widest font-bold">ALBERKA ENTERPRISES LIMITED FLAGSHIP</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#ff385c]" />
                    <span className="font-mono text-[10.5px] text-[#6a6a6a] uppercase">MOMBASA, KENYA</span>
                  </div>
                  <h2 className="text-2xl sm:text-4xl font-bold text-[#222222] tracking-tight">Main Showroom & Inspection Bay</h2>
                </div>
                <span className="font-mono text-xs bg-[#fff1f3] border border-[#ffccd5] text-[#ff385c] px-3 py-1 rounded-full font-bold self-start sm:self-center">
                  EST. 2000 · DIRECT IMPORTER
                </span>
              </div>

              {/* Address Highlight */}
              <div className="p-4 sm:p-5 bg-[#f7f7f7] border border-[#ebebeb] rounded-[12px] flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-full bg-[#ff385c] text-white flex items-center justify-center shrink-0 shadow-xs">
                  <Clock className="w-4 h-4 text-white" />
                </div>
                <div>
                  <span className="text-[11px] font-mono font-bold text-[#ff385c] uppercase tracking-wider block mb-0.5">PHYSICAL ADDRESS</span>
                  <p className="text-base sm:text-lg font-bold text-[#222222] leading-snug">
                    Next to Ganjoni Primary School, Mombasa, Kenya
                  </p>
                  <p className="text-xs text-[#6a6a6a] mt-1">
                    Customer parking & executive handover bay on site. Direct access from port gates.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-2 text-xs sm:text-sm">
                <div className="p-4 bg-white border border-[#ebebeb] rounded-[12px] space-y-1">
                  <div className="flex items-center gap-2 text-[#6a6a6a] font-mono text-xs">
                    <Phone className="w-3.5 h-3.5 text-[#ff385c]" />
                    <span>ENQUIRY HELPLINE</span>
                  </div>
                  <a href="tel:0180423075" className="font-mono text-base font-bold text-[#222222] hover:text-[#ff385c] block transition-colors">
                    0180 423 075
                  </a>
                  <span className="text-[11px] text-[#6a6a6a] block">WhatsApp & Calls 24/7</span>
                </div>

                <div className="p-4 bg-white border border-[#ebebeb] rounded-[12px] space-y-1">
                  <div className="flex items-center gap-2 text-[#6a6a6a] font-mono text-xs">
                    <Mail className="w-3.5 h-3.5 text-[#ff385c]" />
                    <span>EMAIL INQUIRIES</span>
                  </div>
                  <a href="mailto:sales@alberkamotors.co.ke" className="font-mono text-sm font-bold text-[#222222] hover:text-[#ff385c] block truncate transition-colors">
                    sales@alberkamotors.co.ke
                  </a>
                  <span className="text-[11px] text-[#6a6a6a] block">Japanese Auction CIF Inquiries</span>
                </div>

                <div className="p-4 bg-white border border-[#ebebeb] rounded-[12px] space-y-1">
                  <div className="flex items-center gap-2 text-[#6a6a6a] font-mono text-xs">
                    <Clock className="w-3.5 h-3.5 text-[#ff385c]" />
                    <span>OPERATING HOURS</span>
                  </div>
                  <span className="font-mono text-xs font-bold text-[#222222] block">
                    Mon – Sat: 8:00 AM – 6:00 PM
                  </span>
                  <span className="text-[11px] text-[#6a6a6a] block">Sundays by appointment</span>
                </div>
              </div>

              {/* Interactive Google Maps Frame */}
              <div className="pt-2">
                <div className="w-full h-72 sm:h-96 rounded-[12px] overflow-hidden border border-[#ebebeb] shadow-xs relative">
                  <iframe
                    src="https://maps.google.com/maps?q=-4.064257,39.663731+(Alberka+Enterprises+Limited)&t=k&z=19&ie=UTF8&iwloc=&output=embed"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="strict-origin-when-cross-origin"
                    title="Alberka Enterprises Limited Showroom Location"
                    className="w-full h-full"
                  />
                </div>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-zinc-200">
                <div className="flex flex-wrap items-center gap-2.5 w-full sm:w-auto">
                  <a
                    href="https://maps.app.goo.gl/ALv491SA67CFww1f7"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-ghost !text-xs !py-3 !px-4 inline-flex items-center gap-2 cursor-pointer flex-1 sm:flex-none justify-center"
                  >
                    <Navigation className="w-4 h-4 text-red-600" />
                    <span>Get Directions</span>
                  </a>
                  <a
                    href="https://www.google.com/maps/@?api=1&map_action=pano&viewpoint=-4.064257,39.663731"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-ghost !text-xs !py-3 !px-4 inline-flex items-center gap-2 cursor-pointer flex-1 sm:flex-none justify-center"
                    title="Launch Street View on Google Maps"
                  >
                    <Compass className="w-4 h-4 text-zinc-700" />
                    <span>Street View 360°</span>
                  </a>
                </div>
                <a
                  href={`https://wa.me/254180423075?text=${encodeURIComponent('Hello Alberka Enterprises, I would like directions to visit your showroom next to Ganjoni Primary School, Mombasa.')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 text-xs sm:text-sm rounded-xl shadow-md transition-all hover:scale-105 active:scale-95 inline-flex items-center justify-center gap-2 cursor-pointer w-full sm:w-auto"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp Showroom Desk</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Test Drive Booking Form */}
        <div className="relative bg-white p-6 sm:p-10 border border-[#ebebeb] rounded-[14px] space-y-8 text-left shadow-xs">
          <div className="max-w-xl space-y-1">
            <span className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-[#ff385c] font-bold block">
              VIP RESERVATION
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold text-[#222222] tracking-tight">Schedule a Private Test Drive</h3>
            <p className="text-xs sm:text-sm text-[#6a6a6a]">
              Book a test drive at our showroom next to Ganjoni Primary School. We ensure the car is sanitized, fueled, and staged for your arrival.
            </p>
          </div>

          {bookingSuccess ? (
            <div className="bg-[#f7f7f7] border border-[#ebebeb] p-8 text-center text-[#222222] space-y-2 rounded-[12px]">
              <CheckCircle2 className="w-10 h-10 mx-auto mb-2 text-[#ff385c]" />
              <h4 className="text-xl font-bold">Appointment Confirmed</h4>
              <p className="text-xs sm:text-sm text-[#6a6a6a]">Our concierge is connecting with you on WhatsApp right now to confirm your schedule.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div>
                  <label className="text-[11px] font-mono uppercase text-[#6a6a6a] block mb-1.5 font-semibold">Your Name</label>
                  <input
                    type="text"
                    required
                    value={testDriveData.name}
                    onChange={(e) => setTestDriveData({ ...testDriveData, name: e.target.value })}
                    placeholder="e.g. David Mwangi"
                    className="w-full px-4 py-2.5 bg-[#f7f7f7] border border-[#ebebeb] rounded-xl text-sm text-[#222222] placeholder:text-[#c1c1c1] focus:outline-none focus:border-[#222222] focus:bg-white transition-colors"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-mono uppercase text-[#6a6a6a] block mb-1.5 font-semibold">Phone (WhatsApp)</label>
                  <input
                    type="tel"
                    required
                    value={testDriveData.phone}
                    onChange={(e) => setTestDriveData({ ...testDriveData, phone: e.target.value })}
                    placeholder="07XX XXX XXX"
                    className="w-full px-4 py-2.5 bg-[#f7f7f7] border border-[#ebebeb] rounded-xl text-sm font-mono text-[#222222] placeholder:text-[#c1c1c1] focus:outline-none focus:border-[#222222] focus:bg-white transition-colors"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-mono uppercase text-[#6a6a6a] block mb-1.5 font-semibold">Showroom Location</label>
                  <div className="w-full px-4 py-2.5 bg-[#f7f7f7] border border-[#ebebeb] rounded-xl text-sm font-semibold text-[#222222]">
                    Next to Ganjoni Primary School, Mombasa
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div>
                  <label className="text-[11px] font-mono uppercase text-[#6a6a6a] block mb-1.5 font-semibold">Vehicle of Interest</label>
                  <select
                    value={testDriveData.carName}
                    onChange={(e) => setTestDriveData({ ...testDriveData, carName: e.target.value })}
                    className="w-full px-4 py-2.5 bg-[#f7f7f7] border border-[#ebebeb] rounded-xl text-sm text-[#222222] focus:outline-none focus:border-[#222222] focus:bg-white transition-colors cursor-pointer"
                  >
                    {vehicles.map((v) => (
                      <option key={v.id} value={v.name}>
                        {v.name} ({v.stockNo}) — Grade {v.auctionGrade}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-[11px] font-mono uppercase text-[#6a6a6a] block mb-1.5 font-semibold">Preferred Date</label>
                  <input
                    type="date"
                    value={testDriveData.preferredDate}
                    onChange={(e) => setTestDriveData({ ...testDriveData, preferredDate: e.target.value })}
                    className="w-full px-4 py-2.5 bg-[#f7f7f7] border border-[#ebebeb] rounded-xl text-sm font-mono text-[#222222] focus:outline-none focus:border-[#222222] focus:bg-white transition-colors"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-mono uppercase text-[#6a6a6a] block mb-1.5 font-semibold">Preferred Time Window</label>
                  <select
                    value={testDriveData.timeSlot}
                    onChange={(e) => setTestDriveData({ ...testDriveData, timeSlot: e.target.value })}
                    className="w-full px-4 py-2.5 bg-[#f7f7f7] border border-[#ebebeb] rounded-xl text-sm text-[#222222] focus:outline-none focus:border-[#222222] focus:bg-white transition-colors cursor-pointer"
                  >
                    <option value="Morning (9:00 AM – 12:00 PM)">Morning (9:00 AM – 12:00 PM)</option>
                    <option value="Afternoon (1:00 PM – 4:00 PM)">Afternoon (1:00 PM – 4:00 PM)</option>
                    <option value="Late Afternoon (4:00 PM – 6:00 PM)">Late Afternoon (4:00 PM – 6:00 PM)</option>
                  </select>
                </div>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                <button type="submit" className="py-3 px-7 text-xs sm:text-sm font-bold w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-[#ff385c] hover:bg-[#e00b41] text-white shadow-xs transition-all hover:scale-105 active:scale-95 cursor-pointer">
                  <Calendar className="w-4 h-4" />
                  <span>Confirm Test Drive on WhatsApp</span>
                </button>
                <span className="font-mono text-xs text-[#6a6a6a]">Valid driver's license required for test drive</span>
              </div>
            </form>
          )}
        </div>

      </div>
    </section>
  );
};
