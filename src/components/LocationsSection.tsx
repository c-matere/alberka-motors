import React, { useState } from 'react';
import { Phone, Mail, Clock, Calendar, CheckCircle2, MessageCircle, MapPin, ArrowRight } from 'lucide-react';
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
      `Hello Alberka Motors, my name is ${testDriveData.name} (${testDriveData.phone}). I would like to book a test drive for the ${testDriveData.carName} at your ${testDriveData.location} showroom on ${testDriveData.preferredDate || 'the earliest available date'} (${testDriveData.timeSlot}).`
    );
    window.open(`https://wa.me/254714333888?text=${msg}`, '_blank');
    setBookingSuccess(true);
  };

  return (
    <section className="w-full bg-[#09090b] py-16 sm:py-24 px-6 sm:px-10 text-[#f4f4f5] border-t border-[#27272a]">
      <div className="max-w-[1400px] mx-auto space-y-16">
        
        {/* Section Header */}
        <div className="text-center max-w-[780px] mx-auto">
          <span className="brand-eyebrow block mb-2">
            MOMBASA & NAIROBI SHOWROOMS
          </span>
          <h1 className="text-[32px] sm:text-[46px] font-bold text-white tracking-tight mb-4">
            Visit Our Showrooms
          </h1>
          <p className="text-[16px] sm:text-[18px] text-[#a1a1aa] leading-relaxed">
            Come test drive any car in stock, see our workshop facilities, or get an on-the-spot valuation for your trade-in.
          </p>
        </div>

        {/* Showrooms Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Mombasa Flagship */}
          <div className="bg-[#121215] border border-[#27272a] p-8 sm:p-10 flex flex-col justify-between rounded-[4px]">
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-2">
                <div className="inline-flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-600" />
                  <span className="font-mono text-[11px] text-zinc-300 uppercase font-semibold">MOMBASA FLAGSHIP</span>
                </div>
                <span className="text-[11px] font-mono bg-[#18181c] border border-[#27272a] text-[#a1a1aa] px-2.5 py-0.5 rounded-[2px]">
                  EST. 2000
                </span>
              </div>
              <h2 className="text-[24px] sm:text-[28px] font-bold text-white">Mombasa Flagship</h2>
              <p className="text-[14.5px] text-[#a1a1aa] leading-relaxed">
                Tangana Road (Opposite AutoXpress / Near the Railway Station), Majengo, Mombasa Island.<br />
                <span className="text-[13px] text-white mt-1 block font-medium">Nyali Branch: Links Road, Nyali, Mombasa.</span>
              </p>

              <div className="space-y-3 py-5 border-y border-[#27272a] text-[14px]">
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-zinc-400" />
                  <a href="tel:+254714333888" className="font-mono text-white hover:text-zinc-300 transition-colors">0714 333 888</a>
                  <span className="text-[#71717a]">/</span>
                  <a href="tel:+254737333888" className="font-mono text-white hover:text-zinc-300 transition-colors">0737 333 888</a>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-zinc-400" />
                  <a href="mailto:sales@alberkamotors.co.ke" className="font-mono text-[#a1a1aa] hover:text-white transition-colors">sales@alberkamotors.co.ke</a>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-4 h-4 text-zinc-400" />
                  <span className="text-[13px] text-[#a1a1aa]">Mon – Sat: 8:00 AM – 6:00 PM (Sunday by appointment)</span>
                </div>
              </div>
            </div>

            <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="text-[12px] text-[#71717a] font-mono">Workshop inspection bays on site</span>
              <a
                href="https://wa.me/254714333888?text=Hello%20Alberka%20Motors%20Mombasa,%20I%20would%20like%20to%20visit%20your%20Tangana%20Road%20showroom."
                target="_blank"
                rel="noopener noreferrer"
                className="btn-white font-semibold w-full sm:w-auto"
              >
                <span>WhatsApp Mombasa Branch</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </a>
            </div>
          </div>

          {/* Nairobi Hub */}
          <div className="bg-[#121215] border border-[#27272a] p-8 sm:p-10 flex flex-col justify-between rounded-[4px]">
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-[11px] text-zinc-300 uppercase font-bold">NAIROBI BRANCH</span>
                <span className="text-[11px] font-mono bg-[#18181c] border border-[#27272a] text-[#a1a1aa] px-2.5 py-0.5 rounded-[2px]">
                  WESTLANDS
                </span>
              </div>
              <h2 className="text-[24px] sm:text-[28px] font-bold text-white">Nairobi Westlands Hub</h2>
              <p className="text-[14.5px] text-[#a1a1aa] leading-relaxed">
                Mwanzi Road, Westlands (Opposite Westgate Mall Entrance), Nairobi.<br />
                <span className="text-[13px] text-white mt-1 block font-medium">Customer Parking & Executive Handover Bay.</span>
              </p>

              <div className="space-y-3 py-5 border-y border-[#27272a] text-[14px]">
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-zinc-400" />
                  <a href="tel:+254748999333" className="font-mono text-white hover:text-zinc-300 transition-colors">0748 999 333</a>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-zinc-400" />
                  <a href="mailto:nairobi@alberkamotors.co.ke" className="font-mono text-[#a1a1aa] hover:text-white transition-colors">nairobi@alberkamotors.co.ke</a>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-4 h-4 text-zinc-400" />
                  <span className="text-[13px] text-[#a1a1aa]">Mon – Sat: 8:30 AM – 6:00 PM (Sunday by appointment)</span>
                </div>
              </div>
            </div>

            <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="text-[12px] text-[#71717a] font-mono">Central Westlands Location</span>
              <a
                href="https://wa.me/254748999333?text=Hello%20Alberka%20Motors%20Nairobi,%20I%20would%20like%20to%20visit%20your%20Westlands%20showroom."
                target="_blank"
                rel="noopener noreferrer"
                className="btn-white font-semibold w-full sm:w-auto"
              >
                <span>WhatsApp Nairobi Branch</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </a>
            </div>
          </div>

        </div>

        {/* Test Drive Booking Form */}
        <div className="bg-[#121215] border border-[#27272a] p-6 sm:p-10 rounded-[4px] space-y-6">
          <div className="max-w-[700px]">
            <span className="brand-eyebrow mb-1 block">BOOK A TEST DRIVE</span>
            <h3 className="text-[22px] sm:text-[26px] font-bold text-white tracking-tight">Book a Test Drive or Inspection</h3>
            <p className="text-[14.5px] text-[#a1a1aa] mt-1">
              Select your preferred car and showroom. We will have the car washed, fueled, and parked ready for your arrival.
            </p>
          </div>

          {bookingSuccess ? (
            <div className="bg-[#18181c] border border-[#27a644] p-8 text-center text-white space-y-2 rounded-[4px]">
              <CheckCircle2 className="w-8 h-8 mx-auto mb-2 text-[#27a644]" />
              <h4 className="text-[18px] font-bold">Booking Request Sent!</h4>
              <p className="text-[14px] text-[#a1a1aa]">Our team is connecting with you on WhatsApp right now to confirm your appointment.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div>
                  <label className="text-[12px] font-mono uppercase text-[#a1a1aa] block mb-1.5">Your Name</label>
                  <input
                    type="text"
                    required
                    value={testDriveData.name}
                    onChange={(e) => setTestDriveData({ ...testDriveData, name: e.target.value })}
                    placeholder="e.g. David Mwangi"
                    className="w-full px-4 py-2.5 bg-[#09090b] border border-[#27272a] rounded-[3px] text-[14px] text-white focus:outline-none focus:border-white focus:ring-1 focus:ring-white"
                  />
                </div>

                <div>
                  <label className="text-[12px] font-mono uppercase text-[#a1a1aa] block mb-1.5">Phone (WhatsApp)</label>
                  <input
                    type="tel"
                    required
                    value={testDriveData.phone}
                    onChange={(e) => setTestDriveData({ ...testDriveData, phone: e.target.value })}
                    placeholder="07XX XXX XXX"
                    className="w-full px-4 py-2.5 bg-[#09090b] border border-[#27272a] rounded-[3px] text-[14px] font-mono text-white focus:outline-none focus:border-white focus:ring-1 focus:ring-white"
                  />
                </div>

                <div>
                  <label className="text-[12px] font-mono uppercase text-[#a1a1aa] block mb-1.5">Showroom Location</label>
                  <select
                    value={testDriveData.location}
                    onChange={(e) => setTestDriveData({ ...testDriveData, location: e.target.value })}
                    className="w-full px-4 py-2.5 bg-[#09090b] border border-[#27272a] rounded-[3px] text-[13.5px] text-white focus:outline-none focus:border-white focus:ring-1 focus:ring-white cursor-pointer"
                  >
                    <option value="Mombasa — Tangana Road">Mombasa (Tangana Road Flagship)</option>
                    <option value="Mombasa — Nyali Branch">Mombasa (Nyali Branch)</option>
                    <option value="Nairobi — Westlands Mwanzi Rd">Nairobi (Westlands Mwanzi Rd)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div>
                  <label className="text-[12px] font-mono uppercase text-[#a1a1aa] block mb-1.5">Car Model</label>
                  <select
                    value={testDriveData.carName}
                    onChange={(e) => setTestDriveData({ ...testDriveData, carName: e.target.value })}
                    className="w-full px-4 py-2.5 bg-[#09090b] border border-[#27272a] rounded-[3px] text-[13.5px] text-white focus:outline-none focus:border-white focus:ring-1 focus:ring-white cursor-pointer"
                  >
                    {vehicles.map((v) => (
                      <option key={v.id} value={v.name}>
                        {v.name} ({v.stockNo})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-[12px] font-mono uppercase text-[#a1a1aa] block mb-1.5">Preferred Date</label>
                  <input
                    type="date"
                    value={testDriveData.preferredDate}
                    onChange={(e) => setTestDriveData({ ...testDriveData, preferredDate: e.target.value })}
                    className="w-full px-4 py-2.5 bg-[#09090b] border border-[#27272a] rounded-[3px] text-[14px] font-mono text-white focus:outline-none focus:border-white focus:ring-1 focus:ring-white"
                  />
                </div>

                <div>
                  <label className="text-[12px] font-mono uppercase text-[#a1a1aa] block mb-1.5">Time of Day</label>
                  <select
                    value={testDriveData.timeSlot}
                    onChange={(e) => setTestDriveData({ ...testDriveData, timeSlot: e.target.value })}
                    className="w-full px-4 py-2.5 bg-[#09090b] border border-[#27272a] rounded-[3px] text-[13.5px] text-white focus:outline-none focus:border-white focus:ring-1 focus:ring-white cursor-pointer"
                  >
                    <option value="Morning (9:00 AM – 12:00 PM)">Morning (9:00 AM – 12:00 PM)</option>
                    <option value="Afternoon (1:00 PM – 4:00 PM)">Afternoon (1:00 PM – 4:00 PM)</option>
                    <option value="Late Afternoon (4:00 PM – 6:00 PM)">Late Afternoon (4:00 PM – 6:00 PM)</option>
                  </select>
                </div>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                <button type="submit" className="btn-white font-semibold w-full sm:w-auto">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span>Confirm Test Drive on WhatsApp</span>
                </button>
                <span className="font-mono text-[12px] text-[#71717a]">Valid driver's license required for test drives</span>
              </div>
            </form>
          )}
        </div>

      </div>
    </section>
  );
};
