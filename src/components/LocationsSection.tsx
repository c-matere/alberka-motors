import React, { useState } from 'react';
import { Phone, Mail, Clock, Calendar, CheckCircle2, MessageCircle, ArrowRight, Navigation } from 'lucide-react';
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
          <div className="relative bg-white border-2 border-zinc-200 hover:border-red-600/40 rounded-3xl p-8 sm:p-12 shadow-[0_12px_40px_rgba(0,0,0,0.06)] hover:shadow-2xl transition-all duration-300 text-left overflow-hidden group">
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-red-600 via-red-500 to-red-600" />
            
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-200 pb-5">
                <div>
                  <div className="inline-flex items-center gap-2 mb-1">
                    <span className="font-mono text-[11px] text-red-600 uppercase tracking-widest font-bold">ALBERKA ENTERPRISES LIMITED FLAGSHIP</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-red-600" />
                    <span className="font-mono text-[10.5px] text-zinc-500 uppercase">MOMBASA, KENYA</span>
                  </div>
                  <h2 className="text-2xl sm:text-4xl font-bold text-zinc-950 tracking-tight">Main Showroom & Inspection Bay</h2>
                </div>
                <span className="font-mono text-xs bg-red-50 border border-red-200 text-red-600 px-3 py-1 rounded-full font-bold self-start sm:self-center">
                  EST. 2000 · DIRECT IMPORTER
                </span>
              </div>

              {/* Address Highlight */}
              <div className="p-5 bg-zinc-50 border border-zinc-200 rounded-2xl flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-xl bg-red-600 text-white flex items-center justify-center shrink-0 shadow-md">
                  <Clock className="w-5 h-5 text-white" />
                </div>
                <div>
                  <span className="text-xs font-mono font-bold text-red-600 uppercase tracking-wider block mb-0.5">PHYSICAL ADDRESS</span>
                  <p className="text-base sm:text-lg font-bold text-zinc-950 leading-snug">
                    Next to Ganjoni Primary School, Mombasa, Kenya
                  </p>
                  <p className="text-xs text-zinc-600 mt-1">
                    Customer parking & executive handover bay on site. Direct access from port gates.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 text-xs sm:text-sm">
                <div className="p-4 bg-white border border-zinc-200 rounded-xl space-y-1">
                  <div className="flex items-center gap-2 text-zinc-500 font-mono text-xs">
                    <Phone className="w-3.5 h-3.5 text-red-600" />
                    <span>ENQUIRY HELPLINE</span>
                  </div>
                  <a href="tel:0180423075" className="font-mono text-base font-bold text-zinc-950 hover:text-red-600 block transition-colors">
                    0180 423 075
                  </a>
                  <span className="text-[11px] text-zinc-500 block">WhatsApp & Calls 24/7</span>
                </div>

                <div className="p-4 bg-white border border-zinc-200 rounded-xl space-y-1">
                  <div className="flex items-center gap-2 text-zinc-500 font-mono text-xs">
                    <Mail className="w-3.5 h-3.5 text-red-600" />
                    <span>EMAIL INQUIRIES</span>
                  </div>
                  <a href="mailto:sales@alberkamotors.co.ke" className="font-mono text-sm font-bold text-zinc-950 hover:text-red-600 block truncate transition-colors">
                    sales@alberkamotors.co.ke
                  </a>
                  <span className="text-[11px] text-zinc-500 block">Japanese Auction CIF Inquiries</span>
                </div>

                <div className="p-4 bg-white border border-zinc-200 rounded-xl space-y-1">
                  <div className="flex items-center gap-2 text-zinc-500 font-mono text-xs">
                    <Clock className="w-3.5 h-3.5 text-red-600" />
                    <span>OPERATING HOURS</span>
                  </div>
                  <span className="font-mono text-xs font-bold text-zinc-950 block">
                    Mon – Sat: 8:00 AM – 6:00 PM
                  </span>
                  <span className="text-[11px] text-zinc-500 block">Sundays by appointment</span>
                </div>
              </div>

              {/* Interactive Google Maps Frame */}
              <div className="pt-2">
                <div className="w-full h-72 sm:h-96 rounded-2xl overflow-hidden border border-zinc-200 shadow-sm relative">
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
                <a
                  href="https://maps.app.goo.gl/ALv491SA67CFww1f7"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-ghost !text-xs !py-3 !px-5 inline-flex items-center gap-2 w-full sm:w-auto justify-center cursor-pointer"
                >
                  <Navigation className="w-4 h-4 text-red-600" />
                  <span>Open in Google Maps App</span>
                </a>
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
        <div className="relative bg-white p-8 sm:p-12 border-2 border-zinc-200 rounded-3xl space-y-8 text-left shadow-lg">
          <div className="max-w-xl space-y-1">
            <span className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-red-600 font-bold block">
              VIP RESERVATION
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold text-zinc-950 tracking-tight">Schedule a Private Test Drive</h3>
            <p className="text-xs sm:text-sm text-zinc-600">
              Book a test drive at our showroom next to Ganjoni Primary School. We ensure the car is sanitized, fueled, and staged for your arrival.
            </p>
          </div>

          {bookingSuccess ? (
            <div className="bg-zinc-50 border border-zinc-300 p-8 text-center text-zinc-950 space-y-2 rounded-2xl">
              <CheckCircle2 className="w-10 h-10 mx-auto mb-2 text-red-600" />
              <h4 className="text-xl font-bold">Appointment Confirmed</h4>
              <p className="text-xs sm:text-sm text-zinc-600">Our concierge is connecting with you on WhatsApp right now to confirm your schedule.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div>
                  <label className="text-[11px] font-mono uppercase text-zinc-600 block mb-1.5 font-semibold">Your Name</label>
                  <input
                    type="text"
                    required
                    value={testDriveData.name}
                    onChange={(e) => setTestDriveData({ ...testDriveData, name: e.target.value })}
                    placeholder="e.g. David Mwangi"
                    className="w-full px-4 py-3 bg-white border border-zinc-300 rounded-xl text-sm text-zinc-950 placeholder:text-zinc-400 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 transition-colors"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-mono uppercase text-zinc-600 block mb-1.5 font-semibold">Phone (WhatsApp)</label>
                  <input
                    type="tel"
                    required
                    value={testDriveData.phone}
                    onChange={(e) => setTestDriveData({ ...testDriveData, phone: e.target.value })}
                    placeholder="07XX XXX XXX"
                    className="w-full px-4 py-3 bg-white border border-zinc-300 rounded-xl text-sm font-mono text-zinc-950 placeholder:text-zinc-400 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 transition-colors"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-mono uppercase text-zinc-600 block mb-1.5 font-semibold">Showroom Location</label>
                  <div className="w-full px-4 py-3 bg-zinc-50 border border-zinc-300 rounded-xl text-sm font-semibold text-zinc-950">
                    Next to Ganjoni Primary School, Mombasa
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div>
                  <label className="text-[11px] font-mono uppercase text-zinc-600 block mb-1.5 font-semibold">Vehicle of Interest</label>
                  <select
                    value={testDriveData.carName}
                    onChange={(e) => setTestDriveData({ ...testDriveData, carName: e.target.value })}
                    className="w-full px-4 py-3 bg-white border border-zinc-300 rounded-xl text-sm text-zinc-950 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 transition-colors cursor-pointer"
                  >
                    {vehicles.map((v) => (
                      <option key={v.id} value={v.name}>
                        {v.name} ({v.stockNo}) — Grade {v.auctionGrade}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-[11px] font-mono uppercase text-zinc-600 block mb-1.5 font-semibold">Preferred Date</label>
                  <input
                    type="date"
                    value={testDriveData.preferredDate}
                    onChange={(e) => setTestDriveData({ ...testDriveData, preferredDate: e.target.value })}
                    className="w-full px-4 py-3 bg-white border border-zinc-300 rounded-xl text-sm font-mono text-zinc-950 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 transition-colors"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-mono uppercase text-zinc-600 block mb-1.5 font-semibold">Preferred Time Window</label>
                  <select
                    value={testDriveData.timeSlot}
                    onChange={(e) => setTestDriveData({ ...testDriveData, timeSlot: e.target.value })}
                    className="w-full px-4 py-3 bg-white border border-zinc-300 rounded-xl text-sm text-zinc-950 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 transition-colors cursor-pointer"
                  >
                    <option value="Morning (9:00 AM – 12:00 PM)">Morning (9:00 AM – 12:00 PM)</option>
                    <option value="Afternoon (1:00 PM – 4:00 PM)">Afternoon (1:00 PM – 4:00 PM)</option>
                    <option value="Late Afternoon (4:00 PM – 6:00 PM)">Late Afternoon (4:00 PM – 6:00 PM)</option>
                  </select>
                </div>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                <button type="submit" className="btn-crimson py-3.5 px-8 text-xs sm:text-sm font-semibold w-full sm:w-auto inline-flex items-center justify-center gap-2 shadow-lg">
                  <Calendar className="w-4 h-4" />
                  <span>Confirm Test Drive on WhatsApp</span>
                </button>
                <span className="font-mono text-xs text-zinc-500">Valid driver's license required for test drive</span>
              </div>
            </form>
          )}
        </div>

      </div>
    </section>
  );
};
