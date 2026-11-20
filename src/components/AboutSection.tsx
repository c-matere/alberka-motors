import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, Clock, Phone, Mail, MessageCircle, Navigation, MapPin, Compass, ShieldCheck } from 'lucide-react';
import { SkeletonImage } from './SkeletonImage';
import { CmsPage, CmsSiteSettings } from '../services/cmsContent';
import { Vehicle } from '../data/vehicles';

interface AboutSectionProps {
  onExploreFleet: () => void;
  onExploreLocations?: () => void;
  pageData?: CmsPage;
  settings?: CmsSiteSettings;
  vehicles?: Vehicle[];
}

export const AboutSection: React.FC<AboutSectionProps> = ({
  onExploreFleet,
  onExploreLocations,
  pageData,
  settings,
  vehicles = [],
}) => {
  const [testDriveData, setTestDriveData] = useState({
    name: '',
    phone: '',
    carName: vehicles[0]?.name || 'Toyota Land Cruiser Prado TX',
    preferredDate: '',
    timeSlot: 'Morning (9:00 AM – 12:00 PM)',
  });
  const [bookingSuccess, setBookingSuccess] = useState(false);

  const handleTestDriveSubmit = (e: React.FormEvent) => {
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
        <div id="about-provenance" className="text-center max-w-[800px] mx-auto space-y-3 scroll-mt-24">
          <div className="inline-flex items-center gap-2">
            <span className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-zinc-600">
              {pageData?.badge || 'HERITAGE & PROVENANCE · ESTABLISHED 2000'}
            </span>
          </div>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold text-zinc-950 tracking-[-0.035em] leading-[1.05]">
            {pageData?.heroTitle || (
              <>26 Years in Kenya.<br />4,000+ Verified Imports.</>
            )}
          </h1>
          <p className="text-base sm:text-lg text-zinc-600 leading-relaxed font-normal max-w-2xl mx-auto">
            {pageData?.heroSubtitle || 'Founded in 2000, Alberka Enterprises was built on one strict standard: zero accident histories, zero mileage tampering, and transparent direct pricing.'}
          </p>
        </div>

        {/* Video Cinema Stage — Mobile Responsive Aspect Ratio */}
        <div className="space-y-8">
          <div className="w-full aspect-[16/10] sm:aspect-[16/9] lg:aspect-[21/9] min-h-[320px] sm:min-h-[440px] md:min-h-[520px] max-h-[620px] overflow-hidden relative bg-zinc-950 border border-zinc-200 rounded-2xl shadow-xl">
            <video autoPlay muted loop playsInline preload="metadata" className="w-full h-full object-cover">
              <source src="/videos/port-container-shipping.mp4" type="video/mp4" />
            </video>

            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/20 flex items-end p-4 sm:p-8 md:p-10 pointer-events-none">
              <div className="text-left text-white max-w-[620px] space-y-1.5 drop-shadow-md">
                <span className="font-mono text-[9.5px] sm:text-xs text-red-400 uppercase tracking-widest block font-bold">
                  PROVENANCE ARCHIVE · KILINDINI HARBOUR
                </span>
                <p className="text-lg xs:text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight leading-snug">
                  Direct auction procurement from Tokyo & ocean container port clearance in Mombasa.
                </p>
              </div>
            </div>
          </div>

          {/* Architectural Metric Matrix (Hairline Dividers) */}
          <div className="border-y border-zinc-200 py-8 grid grid-cols-2 sm:grid-cols-4 gap-6 text-left">
            <div>
              <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-wider block mb-1">FOUNDED</span>
              <span className="text-base sm:text-lg font-bold text-zinc-950 block">Year 2000</span>
              <span className="text-xs text-zinc-600">26 years continuous operations</span>
            </div>
            <div>
              <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-wider block mb-1">CARS DELIVERED</span>
              <span className="text-base sm:text-lg font-bold text-zinc-950 block">4,000+ Vehicles</span>
              <span className="text-xs text-zinc-600">Kenya clients</span>
            </div>
            <div>
              <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-wider block mb-1">AUCTION QUALITY</span>
              <span className="text-base sm:text-lg font-bold text-zinc-950 block">Grade 4.5+ Benchmark</span>
              <span className="text-xs text-zinc-600">USS Tokyo & CAA Chubu</span>
            </div>
            <div>
              <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-wider block mb-1">ODOMETER AUDIT</span>
              <span className="text-base sm:text-lg font-bold text-zinc-950 block">100% Genuine</span>
              <span className="text-xs text-zinc-600">QISJ & JEVIC Export Certified</span>
            </div>
          </div>
        </div>

        {/* Chapter 1: Direct Japanese Bidding */}
        <div id="why-choose-alberka" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-4 scroll-mt-24">
          <div className="lg:col-span-7 space-y-5 text-left">
            <span className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-zinc-600 font-semibold block">
              SOURCING PRINCIPLE
            </span>
            <h2 className="text-2xl sm:text-4xl font-bold text-zinc-950 tracking-[-0.03em] leading-tight">
              Direct Japanese Auction Bidding.<br />Zero Intermediaries.
            </h2>
            <p className="text-sm sm:text-base text-zinc-700 leading-relaxed font-normal">
              Many importers purchase from third-party brokers where odometer rollback and disguised accident damage are commonplace. Alberka eliminates this risk at source.
            </p>
            <p className="text-sm sm:text-base text-zinc-600 leading-relaxed font-normal">
              We bid directly in the Tokyo, Yokohama, and Nagoya wholesale lanes via licensed auction accounts. Before every bid, our Japanese inspection partners conduct a physical 10-point check of structural rails, paint micron depth, and onboard electronics.
            </p>
            <div className="pt-2">
              <button
                onClick={onExploreFleet}
                className="bg-[#222222] hover:bg-black text-white font-medium py-3 px-6 text-xs sm:text-sm inline-flex items-center gap-2 rounded-full shadow-sm hover:shadow transition-all cursor-pointer"
              >
                <span>Explore Available Fleet</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="lg:col-span-5 relative bg-white border border-[#ebebeb] shadow-xs p-6 sm:p-8 rounded-[14px] space-y-5 text-left">
            <span className="font-mono text-xs text-[#222222] uppercase tracking-wider font-bold block">
              The Alberka Standard:
            </span>
            <div className="space-y-4 text-xs sm:text-sm">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-[#ff385c] shrink-0 mt-0.5" />
                <p className="text-[#222222]">
                  <strong className="text-[#222222]">Grade 4.5 Minimum:</strong> Pristine bodywork, factory paint depth, and flawless interior cabins.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-[#ff385c] shrink-0 mt-0.5" />
                <p className="text-[#222222]">
                  <strong className="text-[#222222]">Certified Genuine Mileage:</strong> Official QISJ and JEVIC Japanese certificates provided with every unit.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-[#ff385c] shrink-0 mt-0.5" />
                <p className="text-[#222222]">
                  <strong className="text-[#222222]">Original Export Dossier:</strong> Japanese export certificate and translated auction inspection sheet delivered with your logbook.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Chapter 2: Coast to Nairobi Logistics */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-8 border-t border-zinc-200">
          <div className="lg:col-span-5 order-2 lg:order-1 overflow-hidden border border-zinc-200/90 rounded-2xl bg-zinc-950 aspect-[4/3] sm:h-[320px] relative shadow-md group">
            <video
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            >
              <source src="/videos/flatbed-delivery.mp4" type="video/mp4" />
            </video>
            <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-xs px-2.5 py-1 rounded-md text-[10.5px] font-mono text-zinc-950 font-bold border border-zinc-200/80 flex items-center gap-1.5 shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse" />
              <span>NATIONWIDE FLATBED CARRIER TRANSIT</span>
            </div>
          </div>

          <div className="lg:col-span-7 order-1 lg:order-2 space-y-5 text-left">
            <span className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-zinc-600 font-semibold block">
              LOGISTICAL CONTINUITY
            </span>
            <h2 className="text-2xl sm:text-4xl font-bold text-zinc-950 tracking-[-0.03em] leading-tight">
              Direct Port Entry.<br />Nationwide Showroom Handover.
            </h2>
            <p className="text-sm sm:text-base text-zinc-700 leading-relaxed font-normal">
              With our flagship showroom and technical workshop located directly next to Ganjoni Primary School in Mombasa, vehicles roll off carrier vessels directly into our secured facility. They are never parked in unmonitored holding yards.
            </p>
            <p className="text-sm sm:text-base text-zinc-600 leading-relaxed font-normal">
              Each vehicle is transported via dedicated carrier, fully serviced, detailed, and ready for immediate collection or door-to-door delivery across Kenya.
            </p>
            <div className="pt-2">
              <a
                href="#about-showroom-location"
                className="btn-ghost py-3 px-6 text-xs sm:text-sm font-medium inline-flex items-center gap-2"
              >
                <span>View Showroom Location</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Official Mombasa Showroom & Workshop Hub */}
        <div id="about-showroom-location" className="space-y-8 pt-12 border-t border-[#ebebeb]">
          <div className="text-left space-y-1.5">
            <span className="text-[11px] font-semibold text-[#6a6a6a] uppercase tracking-wider block">
              WHERE YOU'LL VIEW & TEST DRIVE
            </span>
            <h2 className="text-2xl sm:text-3xl font-semibold text-[#222222] tracking-tight">
              Visit Our Mombasa Showroom
            </h2>
            <p className="text-sm text-[#6a6a6a] max-w-2xl leading-relaxed">
              Experience our curated Japanese fleet in person, inspect units on our workshop hoist, or meet our team directly next to Ganjoni Primary School in Mombasa.
            </p>
          </div>

          <div className="relative bg-white border border-[#ebebeb] hover:border-[#dddddd] rounded-[16px] p-6 sm:p-8 shadow-[0_1px_2px_rgba(0,0,0,0.08),0_4px_12px_rgba(0,0,0,0.05)] text-left overflow-hidden space-y-6">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#ebebeb] pb-5">
              <div>
                <div className="inline-flex items-center gap-2 mb-1">
                  <span className="text-xs font-semibold text-[#222222] uppercase tracking-wider">ALBERKA FLAGSHIP</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#ff385c]" />
                  <span className="text-[11px] text-[#6a6a6a] uppercase font-mono">MOMBASA, KENYA</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-semibold text-[#222222] tracking-tight">Main Showroom & Inspection Bay</h3>
              </div>
              <span className="font-mono text-xs bg-[#f7f7f7] border border-[#ebebeb] text-[#222222] px-3 py-1 rounded-full font-medium self-start sm:self-center">
                EST. 2000 · DIRECT IMPORTER
              </span>
            </div>

            {/* Address Highlight */}
            <div className="p-4 sm:p-5 bg-[#f7f7f7] border border-[#ebebeb] rounded-[12px] flex items-start gap-3.5">
              <div className="w-9 h-9 rounded-full bg-white border border-[#ebebeb] text-[#222222] flex items-center justify-center shrink-0 shadow-2xs">
                <MapPin className="w-4 h-4 text-[#ff385c]" />
              </div>
              <div>
                <span className="text-[11px] font-semibold text-[#6a6a6a] uppercase tracking-wider block mb-0.5">PHYSICAL ADDRESS</span>
                <p className="text-base sm:text-lg font-semibold text-[#222222] leading-snug">
                  Next to Ganjoni Primary School, Archbishop Makarios Rd, Mombasa, Kenya
                </p>
                <p className="text-xs text-[#6a6a6a] mt-1">
                  Customer parking & executive handover bay on site. Direct access from port gates.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-1 text-xs sm:text-sm">
              <div className="p-4 bg-white border border-[#ebebeb] rounded-[12px] space-y-1">
                <div className="flex items-center gap-2 text-[#6a6a6a] font-mono text-xs">
                  <Phone className="w-3.5 h-3.5 text-[#222222]" />
                  <span>ENQUIRY HELPLINE</span>
                </div>
                <a href="tel:0180423075" className="font-mono text-base font-semibold text-[#222222] hover:underline block transition-colors">
                  {settings?.phone || '0180 423 075'}
                </a>
                <span className="text-[11px] text-[#6a6a6a] block">WhatsApp & Calls 24/7</span>
              </div>

              <div className="p-4 bg-white border border-[#ebebeb] rounded-[12px] space-y-1">
                <div className="flex items-center gap-2 text-[#6a6a6a] font-mono text-xs">
                  <Mail className="w-3.5 h-3.5 text-[#222222]" />
                  <span>EMAIL INQUIRIES</span>
                </div>
                <a href="mailto:sales@alberkamotors.co.ke" className="font-mono text-sm font-semibold text-[#222222] hover:underline block truncate transition-colors">
                  {settings?.email || 'sales@alberkamotors.co.ke'}
                </a>
                <span className="text-[11px] text-[#6a6a6a] block">Japanese Auction CIF Inquiries</span>
              </div>

              <div className="p-4 bg-white border border-[#ebebeb] rounded-[12px] space-y-1">
                <div className="flex items-center gap-2 text-[#6a6a6a] font-mono text-xs">
                  <Clock className="w-3.5 h-3.5 text-[#222222]" />
                  <span>OPERATING HOURS</span>
                </div>
                <span className="font-mono text-xs font-semibold text-[#222222] block">
                  {settings?.workingHours || 'Mon – Sat: 8:00 AM – 6:00 PM'}
                </span>
                <span className="text-[11px] text-[#6a6a6a] block">Sundays by appointment</span>
              </div>
            </div>

            {/* Interactive Google Maps Frame with Airbnb Floating Pin Capsule */}
            <div className="pt-1">
              <div className="w-full h-80 sm:h-[420px] rounded-[16px] overflow-hidden border border-[#ebebeb] shadow-[0_1px_2px_rgba(0,0,0,0.08),0_4px_12px_rgba(0,0,0,0.05)] relative">
                <div className="absolute top-3.5 left-3.5 z-10 bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-full border border-black/5 shadow-md flex items-center gap-2 text-xs font-medium text-[#222222] pointer-events-none">
                  <MapPin className="w-3.5 h-3.5 text-[#ff385c]" />
                  <span>Next to Ganjoni Primary School, Mombasa</span>
                </div>
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

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[#ebebeb]">
              <div className="flex flex-wrap items-center gap-2.5 w-full sm:w-auto">
                <a
                  href="https://maps.app.goo.gl/ALv491SA67CFww1f7"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white hover:bg-[#f7f7f7] border border-[#ebebeb] hover:border-[#dddddd] text-[#222222] font-medium py-2.5 px-4 rounded-full text-xs inline-flex items-center gap-2 cursor-pointer transition-all shadow-2xs"
                >
                  <Navigation className="w-3.5 h-3.5 text-[#222222]" />
                  <span>Get Directions</span>
                </a>
                <a
                  href="https://www.google.com/maps/@?api=1&map_action=pano&viewpoint=-4.064257,39.663731"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white hover:bg-[#f7f7f7] border border-[#ebebeb] hover:border-[#dddddd] text-[#222222] font-medium py-2.5 px-4 rounded-full text-xs inline-flex items-center gap-2 cursor-pointer transition-all shadow-2xs"
                  title="Launch Street View on Google Maps"
                >
                  <Compass className="w-3.5 h-3.5 text-[#6a6a6a]" />
                  <span>Street View 360°</span>
                </a>
              </div>
              <a
                href={`https://wa.me/${settings?.whatsappNumber || '254180423075'}?text=${encodeURIComponent('Hello Alberka Enterprises, I would like directions to visit your showroom next to Ganjoni Primary School, Mombasa.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#222222] hover:bg-black text-white font-medium py-2.5 px-5 text-xs sm:text-sm rounded-full shadow-sm hover:shadow transition-all inline-flex items-center justify-center gap-2 cursor-pointer w-full sm:w-auto"
              >
                <MessageCircle className="w-4 h-4 text-white fill-white" />
                <span>WhatsApp Showroom Desk</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Test Drive Reservation */}
          <div id="test-drive-booking" className="relative bg-white p-6 sm:p-8 border border-[#ebebeb] rounded-[16px] space-y-6 text-left shadow-[0_1px_2px_rgba(0,0,0,0.08),0_4px_12px_rgba(0,0,0,0.05)] scroll-mt-24">
            <div className="max-w-xl space-y-1">
              <span className="text-[11px] font-semibold text-[#6a6a6a] uppercase tracking-wider block">
                VIP RESERVATION
              </span>
              <h3 className="text-xl sm:text-2xl font-semibold text-[#222222] tracking-tight">Schedule a Private Test Drive</h3>
              <p className="text-xs sm:text-sm text-[#6a6a6a] leading-relaxed">
                Book a test drive at our showroom next to Ganjoni Primary School. We ensure the car is sanitized, fueled, and staged for your arrival.
              </p>
            </div>

            {bookingSuccess ? (
              <div className="bg-[#f7f7f7] border border-[#ebebeb] p-8 text-center text-[#222222] space-y-2 rounded-[14px]">
                <CheckCircle2 className="w-10 h-10 mx-auto mb-2 text-[#ff385c]" />
                <h4 className="text-lg font-semibold">Appointment Confirmed</h4>
                <p className="text-xs sm:text-sm text-[#6a6a6a]">Our concierge is connecting with you on WhatsApp right now to confirm your schedule.</p>
              </div>
            ) : (
              <form onSubmit={handleTestDriveSubmit} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="text-xs font-medium text-[#222222] block mb-1.5">Your Name</label>
                    <input
                      type="text"
                      required
                      value={testDriveData.name}
                      onChange={(e) => setTestDriveData({ ...testDriveData, name: e.target.value })}
                      placeholder="e.g. David Mwangi"
                      className="w-full px-3.5 py-2.5 bg-white border border-[#ebebeb] hover:border-[#dddddd] rounded-lg text-sm text-[#222222] placeholder:text-[#b0b0b0] focus:outline-none focus:border-[#222222] focus:ring-1 focus:ring-[#222222] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-medium text-[#222222] block mb-1.5">Phone (WhatsApp)</label>
                    <input
                      type="tel"
                      required
                      value={testDriveData.phone}
                      onChange={(e) => setTestDriveData({ ...testDriveData, phone: e.target.value })}
                      placeholder="07XX XXX XXX"
                      className="w-full px-3.5 py-2.5 bg-white border border-[#ebebeb] hover:border-[#dddddd] rounded-lg text-sm font-mono text-[#222222] placeholder:text-[#b0b0b0] focus:outline-none focus:border-[#222222] focus:ring-1 focus:ring-[#222222] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-medium text-[#222222] block mb-1.5">Showroom Location</label>
                    <div className="w-full px-3.5 py-2.5 bg-[#f7f7f7] border border-[#ebebeb] rounded-lg text-sm font-medium text-[#222222]">
                      Next to Ganjoni Primary School, Mombasa
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-medium text-[#222222] block mb-1.5">Vehicle to Inspect</label>
                    <select
                      value={testDriveData.carName}
                      onChange={(e) => setTestDriveData({ ...testDriveData, carName: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-white border border-[#ebebeb] hover:border-[#dddddd] rounded-lg text-sm font-medium text-[#222222] focus:outline-none focus:border-[#222222] focus:ring-1 focus:ring-[#222222] transition-colors cursor-pointer"
                    >
                      {vehicles.map((v) => (
                        <option key={v.id} value={v.name}>
                          {v.year} {v.name} · KES {(v.priceKes / 1000000).toFixed(2)}M
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-medium text-[#222222] block mb-1.5">Preferred Timing</label>
                    <select
                      value={testDriveData.timeSlot}
                      onChange={(e) => setTestDriveData({ ...testDriveData, timeSlot: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-white border border-[#ebebeb] hover:border-[#dddddd] rounded-lg text-sm font-medium text-[#222222] focus:outline-none focus:border-[#222222] focus:ring-1 focus:ring-[#222222] transition-colors cursor-pointer"
                    >
                      <option>Morning (9:00 AM – 12:00 PM)</option>
                      <option>Afternoon (1:00 PM – 4:00 PM)</option>
                      <option>Late Afternoon (4:00 PM – 6:00 PM)</option>
                    </select>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                  <span className="text-xs text-[#6a6a6a] font-mono">
                    Free mechanical overview · Zero obligation · Instant confirmation
                  </span>
                  <button
                    type="submit"
                    className="w-full sm:w-auto bg-[#222222] hover:bg-black text-white font-medium py-3 px-6 rounded-full shadow-sm hover:shadow transition-all active:scale-[0.98] cursor-pointer text-xs sm:text-sm inline-flex items-center justify-center gap-2"
                  >
                    <span>Confirm Test Drive Booking</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Anti-Tampering Mileage Policy & CSR Governance */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-12 border-t border-[#ebebeb] text-left">
          {/* Anti-Tampering Mileage Policy */}
          <div id="anti-tampering-policy" className="bg-white border border-[#ebebeb] hover:border-[#dddddd] rounded-[16px] p-6 sm:p-8 space-y-4 shadow-[0_1px_2px_rgba(0,0,0,0.08),0_4px_12px_rgba(0,0,0,0.05)] scroll-mt-24 relative overflow-hidden">
            <div className="flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-full bg-[#f7f7f7] border border-[#ebebeb] flex items-center justify-center text-[#222222] shrink-0">
                <CheckCircle2 className="w-4 h-4 text-[#ff385c]" />
              </span>
              <div>
                <span className="font-mono text-[10px] text-[#6a6a6a] uppercase tracking-widest font-semibold block">
                  LEGAL BUYER PROTECTION
                </span>
                <h3 className="text-lg sm:text-xl font-semibold text-[#222222]">
                  Anti-Tampering Mileage Policy
                </h3>
              </div>
            </div>

            <p className="text-xs sm:text-[13px] text-[#6a6a6a] leading-relaxed font-normal">
              Odometer fraud is the single largest consumer abuse in the imported car market. Alberka operates an audited zero-tolerance protocol:
            </p>

            <ul className="space-y-2.5 text-xs text-[#222222]">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#222222] shrink-0 mt-0.5" />
                <span><strong>QISJ / JEVIC Verification:</strong> Official Japanese inspection certificates verified against Japan Ministry of Land, Infrastructure, Transport and Tourism records.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#222222] shrink-0 mt-0.5" />
                <span><strong>Original Massha-sho Export Dossier:</strong> You receive the physical Japanese deregistration certificate stating historical mileage at previous road inspection (Shaken).</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#222222] shrink-0 mt-0.5" />
                <span><strong>100% Refund Guarantee:</strong> If mileage rollback is proven on any unit delivered by Alberka, you receive a full 100% refund of your purchase price.</span>
              </li>
            </ul>
          </div>

          {/* CSR & Community Road Safety Policy */}
          <div id="csr-policy" className="bg-white border border-[#ebebeb] hover:border-[#dddddd] rounded-[16px] p-6 sm:p-8 space-y-4 shadow-[0_1px_2px_rgba(0,0,0,0.08),0_4px_12px_rgba(0,0,0,0.05)] scroll-mt-24 relative overflow-hidden">
            <div className="flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-full bg-[#f7f7f7] border border-[#ebebeb] flex items-center justify-center text-[#222222] shrink-0">
                <ShieldCheck className="w-4 h-4 text-[#222222]" />
              </span>
              <div>
                <span className="font-mono text-[10px] text-[#6a6a6a] uppercase tracking-widest font-semibold block">
                  COMMUNITY & SUSTAINABILITY
                </span>
                <h3 className="text-lg sm:text-xl font-semibold text-[#222222]">
                  Corporate Social Responsibility (CSR)
                </h3>
              </div>
            </div>

            <p className="text-xs sm:text-[13px] text-[#6a6a6a] leading-relaxed font-normal">
              Our 26-year legacy in Mombasa is rooted in responsible citizenship, mechanical safety, and community empowerment:
            </p>

            <ul className="space-y-2.5 text-xs text-[#222222]">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#222222] shrink-0 mt-0.5" />
                <span><strong>Mombasa Highway Road Safety:</strong> Every unit undergoes a rigorous 100-point brake, steering, and suspension overhaul to guarantee zero highway mechanical failures.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-zinc-950 shrink-0 mt-0.5" />
                <span><strong>KS 1515:2000 Eco-Emissions Audit:</strong> Strict adherence to Kenya Bureau of Standards clean air emissions regulations and Japanese catalytic converter verification.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-zinc-950 shrink-0 mt-0.5" />
                <span><strong>Technical Youth Apprenticeships:</strong> Training local Mombasa automotive mechanics in hybrid powertrain diagnostics and computerized OBD telemetry.</span>
              </li>
            </ul>
          </div>
        </div>

      </div>
    </section>
  );
};
