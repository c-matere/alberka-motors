import React, { useState } from 'react';
import { Phone, Mail, Clock, Calendar, CheckCircle2, MessageCircle, ArrowRight } from 'lucide-react';
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
    location: 'Tangana Road Flagship',
    carName: preselectedVehicle?.name || vehicles[0]?.name || '',
    preferredDate: '',
    timeSlot: 'Morning (9:00 AM – 12:00 PM)',
  });
  const [bookingSuccess, setBookingSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = encodeURIComponent(
      `Hello Alberka Enterprises, my name is ${testDriveData.name} (${testDriveData.phone}). I would like to book a test drive for the ${testDriveData.carName} at your ${testDriveData.location} showroom on ${testDriveData.preferredDate || 'the earliest available date'} (${testDriveData.timeSlot}).`
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
            <span className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-zinc-600">
              {pageData?.badge || 'PHYSICAL HUBS · QUALITY JAPANESE IMPORTS'}
            </span>
          </div>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold text-zinc-950 tracking-[-0.035em] leading-[1.05]">
            {pageData?.heroTitle || 'Showrooms & Inspection Hubs'}
          </h1>
          <p className="text-base sm:text-lg text-zinc-600 leading-relaxed font-normal max-w-2xl mx-auto">
            {pageData?.heroSubtitle || 'Experience our verified collection in person, tour our technical workshop facilities, or receive an on-the-spot valuation for your trade-in.'}
          </p>
        </div>

        {/* Showrooms Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Main Showroom */}
          <div className="relative bg-white hover:bg-zinc-50/80 border border-zinc-200 hover:border-zinc-300 rounded-2xl p-8 sm:p-10 flex flex-col justify-between space-y-6 transition-all duration-400 hover:-translate-y-1 hover:shadow-[0_4px_24px_rgba(0,0,0,0.04)] before:absolute before:inset-x-8 before:top-0 before:h-[1px] before:bg-gradient-to-r before:from-transparent before:via-zinc-300 before:to-transparent text-left">
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-1">
                <div className="inline-flex items-center gap-2">
                  <span className="font-mono text-[10.5px] text-zinc-600 uppercase tracking-widest font-semibold">SHOWROOM FLAGSHIP</span>
                </div>
                <span className="text-[10px] font-mono bg-zinc-100 border border-zinc-200 text-zinc-600 px-2 py-0.5 rounded">
                  EST. 2000
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-zinc-950 tracking-tight">Main Showroom</h2>
              <p className="text-sm text-zinc-600 leading-relaxed">
                Tangana Road (Opposite AutoXpress / Near Railway Station), Majengo.<br />
                <span className="text-xs text-zinc-700 mt-1 block font-medium">Nyali Branch: Links Road, Nyali.</span>
              </p>

              <div className="space-y-3 py-5 border-y border-zinc-200 text-xs sm:text-sm">
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-zinc-600 shrink-0" />
                  <a href="tel:+254180423075" className="font-mono text-zinc-950 hover:text-zinc-700 transition-colors">0180 423 075</a>
                  <span className="text-zinc-600">/</span>
                  <a href="tel:+254180423075" className="font-mono text-zinc-950 hover:text-zinc-700 transition-colors">0180 423 075</a>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-zinc-600 shrink-0" />
                  <a href="mailto:sales@alberkaenterprises.co.ke" className="font-mono text-zinc-700 hover:text-zinc-950 transition-colors">sales@alberkaenterprises.co.ke</a>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-4 h-4 text-zinc-600 shrink-0" />
                  <span className="text-zinc-600">Mon – Sat: 8:00 AM – 6:00 PM (Sunday by appointment)</span>
                </div>
              </div>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="text-xs text-zinc-500 font-mono">100-Point workshop on site</span>
              <a
                href="https://wa.me/254180423075?text=Hello%20Alberka%20Enterprises,%20I%20would%20like%20to%20visit%20your%20Tangana%20Road%20showroom."
                target="_blank"
                rel="noopener noreferrer"
                className="btn-white py-2.5 px-5 text-xs font-semibold w-full sm:w-auto inline-flex items-center justify-center gap-1.5"
              >
                <span>WhatsApp Showroom</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Nairobi Hub */}
          <div className="relative bg-white hover:bg-zinc-50/80 border border-zinc-200 hover:border-zinc-300 rounded-2xl p-8 sm:p-10 flex flex-col justify-between space-y-6 transition-all duration-400 hover:-translate-y-1 hover:shadow-[0_4px_24px_rgba(0,0,0,0.04)] before:absolute before:inset-x-8 before:top-0 before:h-[1px] before:bg-gradient-to-r before:from-transparent before:via-zinc-300 before:to-transparent text-left">
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-1">
                <div className="inline-flex items-center gap-2">
                  <span className="font-mono text-[10.5px] text-zinc-600 uppercase tracking-widest font-semibold">EXECUTIVE SHOWROOM</span>
                </div>
                <span className="text-[10px] font-mono bg-zinc-100 border border-zinc-200 text-zinc-600 px-2 py-0.5 rounded">
                  WESTLANDS
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-zinc-950 tracking-tight">Westlands Executive Hub</h2>
              <p className="text-sm text-zinc-600 leading-relaxed">
                Mwanzi Road, Westlands (Opposite Westgate Mall Entrance).<br />
                <span className="text-xs text-zinc-700 mt-1 block font-medium">Customer Parking & Executive Handover Bay.</span>
              </p>

              <div className="space-y-3 py-5 border-y border-zinc-200 text-xs sm:text-sm">
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-zinc-600 shrink-0" />
                  <a href="tel:+254180423075" className="font-mono text-zinc-950 hover:text-zinc-700 transition-colors">0180 423 075</a>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-zinc-600 shrink-0" />
                  <a href="mailto:westlands@alberkaenterprises.co.ke" className="font-mono text-zinc-700 hover:text-zinc-950 transition-colors">nairobi@alberkamotors.co.ke</a>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-4 h-4 text-zinc-600 shrink-0" />
                  <span className="text-zinc-600">Mon – Sat: 8:30 AM – 6:00 PM (Sunday by appointment)</span>
                </div>
              </div>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="text-xs text-zinc-500 font-mono">Central Westlands Location</span>
              <a
                href="https://wa.me/254180423075?text=Hello%20Alberka%20Enterprises,%20I%20would%20like%20to%20visit%20your%20Westlands%20showroom."
                target="_blank"
                rel="noopener noreferrer"
                className="btn-white py-2.5 px-5 text-xs font-semibold w-full sm:w-auto inline-flex items-center justify-center gap-1.5"
              >
                <span>WhatsApp Westlands</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

        </div>

        {/* Test Drive Booking Form */}
        <div className="relative bg-zinc-50 p-8 sm:p-10 border border-zinc-200 rounded-2xl space-y-6 text-left before:absolute before:inset-x-8 before:top-0 before:h-[1px] before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent">
          <div className="max-w-xl space-y-1">
            <span className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-zinc-600 font-semibold block">
              VIP RESERVATION
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-zinc-950 tracking-tight">Schedule a Private Test Drive</h3>
            <p className="text-xs sm:text-sm text-zinc-600">
              Select your vehicle and showroom. We ensure the car is sanitized, fueled, and staged for your arrival.
            </p>
          </div>

          {bookingSuccess ? (
            <div className="bg-zinc-100 border border-emerald-500/40 p-8 text-center text-zinc-950 space-y-2 rounded-xl">
              <CheckCircle2 className="w-8 h-8 mx-auto mb-2 text-emerald-400" />
              <h4 className="text-lg font-bold">Appointment Scheduled</h4>
              <p className="text-xs sm:text-sm text-zinc-600">Our concierge is connecting with you on WhatsApp right now to confirm.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div>
                  <label className="text-[11px] font-mono uppercase text-zinc-600 block mb-1.5">Your Name</label>
                  <input
                    type="text"
                    required
                    value={testDriveData.name}
                    onChange={(e) => setTestDriveData({ ...testDriveData, name: e.target.value })}
                    placeholder="e.g. David Mwangi"
                    className="w-full px-4 py-2.5 bg-zinc-100 border border-zinc-200 rounded-lg text-sm text-zinc-950 focus:outline-none focus:border-white transition-colors"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-mono uppercase text-zinc-600 block mb-1.5">Phone (WhatsApp)</label>
                  <input
                    type="tel"
                    required
                    value={testDriveData.phone}
                    onChange={(e) => setTestDriveData({ ...testDriveData, phone: e.target.value })}
                    placeholder="07XX XXX XXX"
                    className="w-full px-4 py-2.5 bg-zinc-100 border border-zinc-200 rounded-lg text-sm font-mono text-zinc-950 focus:outline-none focus:border-white transition-colors"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-mono uppercase text-zinc-600 block mb-1.5">Showroom Location</label>
                  <select
                    value={testDriveData.location}
                    onChange={(e) => setTestDriveData({ ...testDriveData, location: e.target.value })}
                    className="w-full px-4 py-2.5 bg-zinc-100 border border-zinc-200 rounded-lg text-sm text-zinc-950 focus:outline-none focus:border-white transition-colors cursor-pointer"
                  >
                    <option value="Tangana Road Showroom">Tangana Road Flagship</option>
                    <option value="Nyali Branch">Nyali Branch</option>
                    <option value="Westlands Mwanzi Rd">Westlands Mwanzi Rd Hub</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div>
                  <label className="text-[11px] font-mono uppercase text-zinc-600 block mb-1.5">Vehicle of Interest</label>
                  <select
                    value={testDriveData.carName}
                    onChange={(e) => setTestDriveData({ ...testDriveData, carName: e.target.value })}
                    className="w-full px-4 py-2.5 bg-zinc-100 border border-zinc-200 rounded-lg text-sm text-zinc-950 focus:outline-none focus:border-white transition-colors cursor-pointer"
                  >
                    {vehicles.map((v) => (
                      <option key={v.id} value={v.name}>
                        {v.name} ({v.stockNo})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-[11px] font-mono uppercase text-zinc-600 block mb-1.5">Preferred Date</label>
                  <input
                    type="date"
                    value={testDriveData.preferredDate}
                    onChange={(e) => setTestDriveData({ ...testDriveData, preferredDate: e.target.value })}
                    className="w-full px-4 py-2.5 bg-zinc-100 border border-zinc-200 rounded-lg text-sm font-mono text-zinc-950 focus:outline-none focus:border-white transition-colors"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-mono uppercase text-zinc-600 block mb-1.5">Preferred Time Window</label>
                  <select
                    value={testDriveData.timeSlot}
                    onChange={(e) => setTestDriveData({ ...testDriveData, timeSlot: e.target.value })}
                    className="w-full px-4 py-2.5 bg-zinc-100 border border-zinc-200 rounded-lg text-sm text-zinc-950 focus:outline-none focus:border-white transition-colors cursor-pointer"
                  >
                    <option value="Morning (9:00 AM – 12:00 PM)">Morning (9:00 AM – 12:00 PM)</option>
                    <option value="Afternoon (1:00 PM – 4:00 PM)">Afternoon (1:00 PM – 4:00 PM)</option>
                    <option value="Late Afternoon (4:00 PM – 6:00 PM)">Late Afternoon (4:00 PM – 6:00 PM)</option>
                  </select>
                </div>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                <button type="submit" className="btn-white py-3 px-6 text-xs sm:text-sm font-semibold w-full sm:w-auto inline-flex items-center justify-center gap-2">
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
