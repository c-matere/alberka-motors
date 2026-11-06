import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Calendar, CheckCircle2, MessageCircle, Navigation } from 'lucide-react';
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
      `Hello Alberka Motors, my name is ${testDriveData.name} (${testDriveData.phone}). I would like to schedule a VIP Test Drive for the ${testDriveData.carName} at your ${testDriveData.location} showroom on ${testDriveData.preferredDate || 'the next available date'} (${testDriveData.timeSlot}).`
    );
    window.open(`https://wa.me/254714333888?text=${msg}`, '_blank');
    setBookingSuccess(true);
  };

  return (
    <section className="w-full bg-[#121215] py-16 px-6">
      <div className="max-w-[1240px] mx-auto space-y-16">
        
        {/* Header */}
        <div className="text-center max-w-[680px] mx-auto">
          <span className="launch-status-label mb-2">
            Direct Showrooms & Service Centers
          </span>
          <h1 className="hero-display mb-4">
            Showroom Hubs.
          </h1>
          <p className="text-[17px] text-zinc-400 leading-[1.47]" style={{ letterSpacing: '-0.374px' }}>
            Visit our physical showrooms in Mombasa and Nairobi. Experience silent electric e-POWER acceleration, inspect vehicle undercarriages on our hydraulic hoists, and meet our senior team.
          </p>
        </div>

        {/* Showrooms Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Mombasa Flagship */}
          <div className="apple-card p-8 md:p-10 bg-[#121215] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="launch-status-label">Coast Operations Hub</span>
                <span className="text-[11px] font-semibold text-[#dc2626] bg-blue-50 px-2.5 py-0.5 rounded-full">
                  Main Workshop On-Site
                </span>
              </div>
              <h2 className="text-[26px] font-semibold text-white mb-2">Mombasa Flagship Showroom</h2>
              <p className="text-[14px] text-zinc-400 mb-6">
                Tangana Road (Opposite AutoXpress / Near the Railway Station), Majengo, Mombasa Island.<br />
                <span className="text-[13px] text-zinc-400 mt-1 block">Nyali Branch: Links Road, Nyali, Mombasa.</span>
              </p>

              <div className="space-y-3 py-6 border-y border-[#27272a] text-[13px]">
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-[#dc2626]" />
                  <a href="tel:+254714333888" className="font-medium hover:text-[#dc2626]">+254 714 333888</a>
                  <span className="text-[#27272a]">|</span>
                  <a href="tel:+254737333888" className="font-medium hover:text-[#dc2626]">+254 737 333888</a>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-[#dc2626]" />
                  <a href="mailto:sales@carsrus.co.ke" className="hover:text-[#dc2626]">sales@carsrus.co.ke</a>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-4 h-4 text-[#dc2626]" />
                  <span>Mon – Sat: 8:00 AM – 6:00 PM (Sunday by appointment)</span>
                </div>
              </div>
            </div>

            <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
              <span className="text-[12px] text-zinc-400">Hydraulic hoists & diagnostic bays</span>
              <a
                href="https://wa.me/254714333888?text=Hello%20Mombasa%20Showroom,%20I%20would%20like%20to%20visit."
                target="_blank"
                rel="noopener noreferrer"
                className="pricing-blue-pill w-full sm:w-auto"
              >
                Message Mombasa Desk
              </a>
            </div>
          </div>

          {/* Nairobi Capital Hub */}
          <div className="apple-card p-8 md:p-10 bg-[#121215] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="launch-status-label">Capital City Hub</span>
                <span className="text-[11px] font-semibold text-[#dc2626] bg-blue-50 px-2.5 py-0.5 rounded-full">
                  Westlands Prime
                </span>
              </div>
              <h2 className="text-[26px] font-semibold text-white mb-2">Nairobi Westlands Showroom</h2>
              <p className="text-[14px] text-zinc-400 mb-6">
                Mwanzi Road, Westlands (Directly opposite Westgate Mall Entrance), Nairobi.<br />
                <span className="text-[13px] text-zinc-400 mt-1 block">VIP Enclosed Handover Bay & Secure Customer Parking.</span>
              </p>

              <div className="space-y-3 py-6 border-y border-[#27272a] text-[13px]">
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-[#dc2626]" />
                  <a href="tel:+254748999333" className="font-medium hover:text-[#dc2626]">+254 748 999333</a>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-[#dc2626]" />
                  <a href="mailto:nairobi@carsrus.co.ke" className="hover:text-[#dc2626]">nairobi@carsrus.co.ke</a>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-4 h-4 text-[#dc2626]" />
                  <span>Mon – Sat: 8:30 AM – 6:00 PM (Sunday by appointment)</span>
                </div>
              </div>
            </div>

            <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
              <span className="text-[12px] text-zinc-400">Home & office delivery available</span>
              <a
                href="https://wa.me/254748999333?text=Hello%20Nairobi%20Showroom,%20I%20would%20like%20to%20visit%20Westlands."
                target="_blank"
                rel="noopener noreferrer"
                className="pricing-blue-pill w-full sm:w-auto"
              >
                Message Nairobi Desk
              </a>
            </div>
          </div>

        </div>

        {/* VIP Test Drive Booking Studio */}
        <div className="apple-card p-8 md:p-12 bg-[#121215]">
          <div className="max-w-[640px] mb-8">
            <span className="launch-status-label mb-1">VIP Service</span>
            <h3 className="text-[26px] font-semibold text-white">Schedule a Private Test Drive</h3>
            <p className="text-[14px] text-zinc-400 mt-1">
              Select your vehicle and preferred hub. We detail, fuel, and park your vehicle in our private customer bay prior to your arrival.
            </p>
          </div>

          {bookingSuccess ? (
            <div className="bg-emerald-50 border border-emerald-200 rounded-[16px] p-6 text-center text-emerald-800">
              <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto mb-2" />
              <h4 className="text-[18px] font-semibold">Test Drive Scheduled Successfully</h4>
              <p className="text-[13px] mt-1">Our concierge is connecting via WhatsApp with your gate entry pass.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-[13px] font-medium text-white mb-2">Full Name</label>
                  <input
                    type="text"
                    required
                    value={testDriveData.name}
                    onChange={(e) => setTestDriveData({ ...testDriveData, name: e.target.value })}
                    placeholder="e.g. David Mwangi"
                    className="w-full px-4 py-3 rounded-[12px] bg-[#121215] border border-[#27272a] text-[14px] text-white focus:outline-none focus:border-[#dc2626]"
                  />
                </div>

                <div>
                  <label className="block text-[13px] font-medium text-white mb-2">WhatsApp Contact</label>
                  <input
                    type="tel"
                    required
                    value={testDriveData.phone}
                    onChange={(e) => setTestDriveData({ ...testDriveData, phone: e.target.value })}
                    placeholder="07XX XXX XXX"
                    className="w-full px-4 py-3 rounded-[12px] bg-[#121215] border border-[#27272a] text-[14px] text-white focus:outline-none focus:border-[#dc2626]"
                  />
                </div>

                <div>
                  <label className="block text-[13px] font-medium text-white mb-2">Preferred Showroom Hub</label>
                  <select
                    value={testDriveData.location}
                    onChange={(e) => setTestDriveData({ ...testDriveData, location: e.target.value })}
                    className="w-full px-4 py-3 rounded-[12px] bg-[#121215] border border-[#27272a] text-[14px] text-white focus:outline-none focus:border-[#dc2626]"
                  >
                    <option value="Mombasa — Tangana Road">Mombasa (Tangana Road Flagship)</option>
                    <option value="Mombasa — Nyali Branch">Mombasa (Nyali Branch)</option>
                    <option value="Nairobi — Westlands Mwanzi Rd">Nairobi (Westlands Mwanzi Rd)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-[13px] font-medium text-white mb-2">Vehicle of Choice</label>
                  <select
                    value={testDriveData.carName}
                    onChange={(e) => setTestDriveData({ ...testDriveData, carName: e.target.value })}
                    className="w-full px-4 py-3 rounded-[12px] bg-[#121215] border border-[#27272a] text-[14px] text-white focus:outline-none focus:border-[#dc2626]"
                  >
                    {vehicles.map((v) => (
                      <option key={v.id} value={v.name}>
                        {v.name} ({v.stockNo})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[13px] font-medium text-white mb-2">Preferred Date</label>
                  <input
                    type="date"
                    value={testDriveData.preferredDate}
                    onChange={(e) => setTestDriveData({ ...testDriveData, preferredDate: e.target.value })}
                    className="w-full px-4 py-3 rounded-[12px] bg-[#121215] border border-[#27272a] text-[14px] text-white focus:outline-none focus:border-[#dc2626]"
                  />
                </div>

                <div>
                  <label className="block text-[13px] font-medium text-white mb-2">Preferred Time Window</label>
                  <select
                    value={testDriveData.timeSlot}
                    onChange={(e) => setTestDriveData({ ...testDriveData, timeSlot: e.target.value })}
                    className="w-full px-4 py-3 rounded-[12px] bg-[#121215] border border-[#27272a] text-[14px] text-white focus:outline-none focus:border-[#dc2626]"
                  >
                    <option value="Morning (9:00 AM – 12:00 PM)">Morning (9:00 AM – 12:00 PM)</option>
                    <option value="Afternoon (1:00 PM – 4:00 PM)">Afternoon (1:00 PM – 4:00 PM)</option>
                    <option value="Late Afternoon (4:00 PM – 6:00 PM)">Late Afternoon (4:00 PM – 6:00 PM)</option>
                  </select>
                </div>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                <button type="submit" className="pricing-blue-pill-lg w-full sm:w-auto cursor-pointer">
                  <Calendar className="w-4 h-4" />
                  <span>Confirm Test Drive Booking on WhatsApp</span>
                </button>
                <span className="text-[12px] text-zinc-400">Valid driver's license required on day of drive</span>
              </div>
            </form>
          )}
        </div>

      </div>
    </section>
  );
};
