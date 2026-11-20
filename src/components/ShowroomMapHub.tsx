import React, { useState } from 'react';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Navigation,
  Compass,
  MessageCircle,
  ArrowRight,
  CheckCircle2,
  Calendar,
  ShieldCheck
} from 'lucide-react';
import { Vehicle } from '../data/vehicles';

interface ShowroomMapHubProps {
  settings?: {
    phone?: string;
    email?: string;
    workingHours?: string;
    whatsappNumber?: string;
  };
  vehicles?: Vehicle[];
  onOpenWhispers?: () => void;
}

export const ShowroomMapHub: React.FC<ShowroomMapHubProps> = ({
  settings,
  vehicles = [],
  onOpenWhispers,
}) => {
  const [testDriveData, setTestDriveData] = useState({
    name: '',
    phone: '',
    carName: vehicles[0]?.name || 'Toyota Harrier',
    timeSlot: 'Morning (9:00 AM – 12:00 PM)',
  });
  const [bookingSuccess, setBookingSuccess] = useState(false);

  const handleTestDriveSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 1. Submit lead to CMS backend
    try {
      fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: testDriveData.name.trim(),
          phone: testDriveData.phone.trim(),
          vehicleName: testDriveData.carName,
          type: 'test-drive',
          notes: `Showroom: Next to Ganjoni Primary School, Mombasa | Preferred Slot: ${testDriveData.timeSlot}`,
        }),
      }).catch((err) => console.warn('Lead capture:', err));
    } catch {}

    // 2. Open WhatsApp confirmation
    const message = encodeURIComponent(
      `Hello Alberka Enterprises,\n\nI would like to schedule a Private Test Drive:\n• Name: ${testDriveData.name}\n• Phone: ${testDriveData.phone}\n• Vehicle: ${testDriveData.carName}\n• Location: Next to Ganjoni Primary School, Mombasa\n• Preferred Slot: ${testDriveData.timeSlot}`
    );
    window.open(`https://wa.me/254180423075?text=${message}`, '_blank');
    setBookingSuccess(true);
  };

  return (
    <section id="about-showroom-location" className="w-full bg-[#f7f7f7] py-16 sm:py-24 px-4 sm:px-8 border-t border-[#ebebeb]">
      <div className="max-w-[1520px] mx-auto space-y-10 text-left">
        
        {/* Section Heading */}
        <div className="space-y-1.5">
          <span className="text-[11px] font-semibold text-[#6a6a6a] uppercase tracking-wider block">
            WHERE YOU'LL VIEW & TEST DRIVE
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-[#222222] tracking-tight">
            Visit Our Mombasa Showroom
          </h2>
          <p className="text-xs sm:text-sm text-[#6a6a6a] max-w-2xl leading-relaxed">
            Experience our curated Japanese fleet in person, inspect units on our workshop hoist, or meet our team directly next to Ganjoni Primary School in Mombasa.
          </p>
        </div>

        {/* Showroom Hub Main Card */}
        <div className="relative bg-white border border-[#ebebeb] hover:border-[#dddddd] rounded-[16px] p-6 sm:p-8 shadow-[0_1px_2px_rgba(0,0,0,0.08),0_4px_12px_rgba(0,0,0,0.05)] text-left overflow-hidden space-y-6">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#ebebeb] pb-5">
            <div>
              <div className="inline-flex items-center gap-2 mb-1">
                <span className="text-xs font-semibold text-[#222222] uppercase tracking-wider">ALBERKA FLAGSHIP</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#DC2626]" />
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
              <MapPin className="w-4 h-4 text-[#DC2626]" />
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

          {/* Contact & Hours 3-Grid */}
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

          {/* Interactive Google Maps Frame with Floating Pin Capsule */}
          <div className="pt-1">
            <div className="w-full h-80 sm:h-[420px] rounded-[16px] overflow-hidden border border-[#ebebeb] shadow-[0_1px_2px_rgba(0,0,0,0.08),0_4px_12px_rgba(0,0,0,0.05)] relative">
              <div className="absolute top-3.5 left-3.5 z-10 bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-full border border-black/5 shadow-md flex items-center gap-2 text-xs font-medium text-[#222222] pointer-events-none">
                <MapPin className="w-3.5 h-3.5 text-[#DC2626]" />
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

          {/* Directions & Action Bar */}
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

        {/* Test Drive Reservation Form */}
        <div id="test-drive-booking" className="relative bg-white p-6 sm:p-8 border border-[#ebebeb] rounded-[16px] space-y-6 text-left shadow-[0_1px_2px_rgba(0,0,0,0.08),0_4px_12px_rgba(0,0,0,0.05)] scroll-mt-24">
          <div className="max-w-xl space-y-1">
            <span className="text-[11px] font-semibold text-[#6a6a6a] uppercase tracking-wider block">
              VIP RESERVATION
            </span>
            <h3 className="text-xl sm:text-2xl font-semibold text-[#222222] tracking-tight">Schedule a Private Test Drive</h3>
            <p className="text-xs sm:text-sm text-[#6a6a6a] leading-relaxed">
              Book a test drive at our showroom next to Ganjoni Primary School. We ensure the car is sanitized, fueled, and staged on our hoist for your arrival.
            </p>
          </div>

          {bookingSuccess ? (
            <div className="bg-[#f7f7f7] border border-[#ebebeb] p-8 text-center text-[#222222] space-y-2 rounded-[14px]">
              <CheckCircle2 className="w-10 h-10 mx-auto mb-2 text-[#DC2626]" />
              <h4 className="text-lg font-semibold">Appointment Confirmed</h4>
              <p className="text-xs sm:text-sm text-[#6a6a6a]">Our showroom concierge is connecting with you on WhatsApp right now to confirm your schedule.</p>
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
                    {vehicles.length > 0 ? (
                      vehicles.map((v) => (
                        <option key={v.id} value={v.name}>
                          {v.year} {v.name} · KES {(v.priceKes / 1000000).toFixed(2)}M
                        </option>
                      ))
                    ) : (
                      <>
                        <option>Toyota Harrier 2020</option>
                        <option>Volvo XC40 R-Design</option>
                        <option>Subaru XV 2.0i-L</option>
                      </>
                    )}
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
                  Free mechanical overview on hoist · Zero obligation · Instant WhatsApp confirmation
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
    </section>
  );
};
