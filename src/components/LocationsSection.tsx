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
    <section className="w-full bg-[#08090a] py-16 px-4 sm:px-6 text-[#d0d6e0] border-t border-[#23252a]">
      <div className="max-w-[1200px] mx-auto space-y-16">
        
        {/* Header */}
        <div className="text-center max-w-[680px] mx-auto">
          <span className="launch-status-label mb-2">
            Direct Showrooms & Service Centers
          </span>
          <h1 className="hero-display mb-3">
            Showroom Hubs.
          </h1>
          <p className="text-[14px] sm:text-[15px] text-[#8a8f98] leading-relaxed">
            Visit our physical showrooms in Mombasa and Nairobi. Experience silent electric e-POWER acceleration, inspect vehicle undercarriages on our hydraulic hoists, and meet our senior team.
          </p>
        </div>

        {/* Showrooms Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Mombasa Flagship */}
          <div className="bg-[#0f1011] border border-[#23252a] rounded-[12px] p-6 sm:p-8 flex flex-col justify-between hover:border-[#383b3f] transition-all">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="launch-status-label">Coast Operations Hub</span>
                <span className="text-[11px] font-mono text-[#8a8f98] bg-[#161718] px-2 py-0.5 rounded-[4px] border border-[#23252a]">
                  Main Workshop On-Site
                </span>
              </div>
              <h2 className="text-[20px] font-medium text-[#ffffff] mb-1.5">Mombasa Flagship Showroom</h2>
              <p className="text-[13px] text-[#8a8f98] mb-5 leading-relaxed">
                Tangana Road (Opposite AutoXpress / Near the Railway Station), Majengo, Mombasa Island.<br />
                <span className="text-[12px] text-[#8a8f98] mt-1 block">Nyali Branch: Links Road, Nyali, Mombasa.</span>
              </p>

              <div className="space-y-2.5 py-4 border-y border-[#23252a] text-[13px]">
                <div className="flex items-center gap-2.5">
                  <Phone className="w-3.5 h-3.5 text-[#8a8f98]" />
                  <a href="tel:+254714333888" className="font-mono text-[#ffffff] hover:text-[#e4f222] transition-colors">+254 714 333888</a>
                  <span className="text-[#383b3f]">/</span>
                  <a href="tel:+254737333888" className="font-mono text-[#ffffff] hover:text-[#e4f222] transition-colors">+254 737 333888</a>
                </div>
                <div className="flex items-center gap-2.5">
                  <Mail className="w-3.5 h-3.5 text-[#8a8f98]" />
                  <a href="mailto:sales@alberkamotors.co.ke" className="font-mono text-[#8a8f98] hover:text-[#ffffff] transition-colors">sales@alberkamotors.co.ke</a>
                </div>
                <div className="flex items-center gap-2.5">
                  <Clock className="w-3.5 h-3.5 text-[#8a8f98]" />
                  <span className="font-mono text-[12px] text-[#8a8f98]">Mon – Sat: 08:00 – 18:00 (Sunday by appointment)</span>
                </div>
              </div>
            </div>

            <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
              <span className="font-mono text-[11px] text-[#8a8f98]">Hydraulic hoists & diagnostic bays</span>
              <a
                href="https://wa.me/254714333888?text=Hello%20Mombasa%20Showroom,%20I%20would%20like%20to%20visit."
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary w-full sm:w-auto"
              >
                Message Mombasa Desk
              </a>
            </div>
          </div>

          {/* Nairobi Capital Hub */}
          <div className="bg-[#0f1011] border border-[#23252a] rounded-[12px] p-6 sm:p-8 flex flex-col justify-between hover:border-[#383b3f] transition-all">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="launch-status-label">Capital City Hub</span>
                <span className="text-[11px] font-mono text-[#8a8f98] bg-[#161718] px-2 py-0.5 rounded-[4px] border border-[#23252a]">
                  Westlands Prime
                </span>
              </div>
              <h2 className="text-[20px] font-medium text-[#ffffff] mb-1.5">Nairobi Westlands Showroom</h2>
              <p className="text-[13px] text-[#8a8f98] mb-5 leading-relaxed">
                Mwanzi Road, Westlands (Directly opposite Westgate Mall Entrance), Nairobi.<br />
                <span className="text-[12px] text-[#8a8f98] mt-1 block">VIP Enclosed Handover Bay & Secure Customer Parking.</span>
              </p>

              <div className="space-y-2.5 py-4 border-y border-[#23252a] text-[13px]">
                <div className="flex items-center gap-2.5">
                  <Phone className="w-3.5 h-3.5 text-[#8a8f98]" />
                  <a href="tel:+254748999333" className="font-mono text-[#ffffff] hover:text-[#e4f222] transition-colors">+254 748 999333</a>
                </div>
                <div className="flex items-center gap-2.5">
                  <Mail className="w-3.5 h-3.5 text-[#8a8f98]" />
                  <a href="mailto:nairobi@alberkamotors.co.ke" className="font-mono text-[#8a8f98] hover:text-[#ffffff] transition-colors">nairobi@alberkamotors.co.ke</a>
                </div>
                <div className="flex items-center gap-2.5">
                  <Clock className="w-3.5 h-3.5 text-[#8a8f98]" />
                  <span className="font-mono text-[12px] text-[#8a8f98]">Mon – Sat: 08:30 – 18:00 (Sunday by appointment)</span>
                </div>
              </div>
            </div>

            <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
              <span className="font-mono text-[11px] text-[#8a8f98]">Home & office delivery available</span>
              <a
                href="https://wa.me/254748999333?text=Hello%20Nairobi%20Showroom,%20I%20would%20like%20to%20visit%20Westlands."
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary w-full sm:w-auto"
              >
                Message Nairobi Desk
              </a>
            </div>
          </div>

        </div>

        {/* VIP Test Drive Booking Studio */}
        <div className="bg-[#0f1011] border border-[#23252a] rounded-[12px] p-6 sm:p-10">
          <div className="max-w-[580px] mb-6">
            <span className="launch-status-label mb-1">VIP Concierge</span>
            <h3 className="text-[20px] font-medium text-[#ffffff]">Schedule a Private Test Drive</h3>
            <p className="text-[13px] text-[#8a8f98] mt-1">
              Select your vehicle and preferred hub. We detail, fuel, and park your vehicle in our private customer bay prior to your arrival.
            </p>
          </div>

          {bookingSuccess ? (
            <div className="bg-[#27a644]/10 border border-[#27a644]/30 rounded-[6px] p-6 text-center text-[#27a644]">
              <CheckCircle2 className="w-7 h-7 mx-auto mb-2" />
              <h4 className="text-[16px] font-medium">Test Drive Scheduled Successfully</h4>
              <p className="text-[13px] mt-1 text-[#d0d6e0]">Our concierge is connecting via WhatsApp with your gate entry pass.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-[12px] text-[#8a8f98] mb-1.5">Full Name</label>
                  <input
                    type="text"
                    required
                    value={testDriveData.name}
                    onChange={(e) => setTestDriveData({ ...testDriveData, name: e.target.value })}
                    placeholder="e.g. David Mwangi"
                    className="w-full px-3.5 py-2 rounded-[6px] bg-[#161718] border border-[#23252a] text-[13px] text-[#ffffff] focus:outline-none focus:border-[#383b3f]"
                  />
                </div>

                <div>
                  <label className="block text-[12px] text-[#8a8f98] mb-1.5">WhatsApp Contact</label>
                  <input
                    type="tel"
                    required
                    value={testDriveData.phone}
                    onChange={(e) => setTestDriveData({ ...testDriveData, phone: e.target.value })}
                    placeholder="07XX XXX XXX"
                    className="w-full px-3.5 py-2 rounded-[6px] bg-[#161718] border border-[#23252a] text-[13px] text-[#ffffff] focus:outline-none focus:border-[#383b3f]"
                  />
                </div>

                <div>
                  <label className="block text-[12px] text-[#8a8f98] mb-1.5">Preferred Showroom Hub</label>
                  <select
                    value={testDriveData.location}
                    onChange={(e) => setTestDriveData({ ...testDriveData, location: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-[6px] bg-[#161718] border border-[#23252a] text-[13px] text-[#d0d6e0] focus:outline-none cursor-pointer"
                  >
                    <option value="Mombasa — Tangana Road">Mombasa (Tangana Road Flagship)</option>
                    <option value="Mombasa — Nyali Branch">Mombasa (Nyali Branch)</option>
                    <option value="Nairobi — Westlands Mwanzi Rd">Nairobi (Westlands Mwanzi Rd)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-[12px] text-[#8a8f98] mb-1.5">Vehicle of Choice</label>
                  <select
                    value={testDriveData.carName}
                    onChange={(e) => setTestDriveData({ ...testDriveData, carName: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-[6px] bg-[#161718] border border-[#23252a] text-[13px] text-[#d0d6e0] focus:outline-none cursor-pointer"
                  >
                    {vehicles.map((v) => (
                      <option key={v.id} value={v.name}>
                        {v.name} ({v.stockNo})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[12px] text-[#8a8f98] mb-1.5">Preferred Date</label>
                  <input
                    type="date"
                    value={testDriveData.preferredDate}
                    onChange={(e) => setTestDriveData({ ...testDriveData, preferredDate: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-[6px] bg-[#161718] border border-[#23252a] text-[13px] text-[#d0d6e0] focus:outline-none focus:border-[#383b3f]"
                  />
                </div>

                <div>
                  <label className="block text-[12px] text-[#8a8f98] mb-1.5">Preferred Time Window</label>
                  <select
                    value={testDriveData.timeSlot}
                    onChange={(e) => setTestDriveData({ ...testDriveData, timeSlot: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-[6px] bg-[#161718] border border-[#23252a] text-[13px] text-[#d0d6e0] focus:outline-none cursor-pointer"
                  >
                    <option value="Morning (9:00 AM – 12:00 PM)">Morning (09:00 – 12:00)</option>
                    <option value="Afternoon (1:00 PM – 4:00 PM)">Afternoon (13:00 – 16:00)</option>
                    <option value="Late Afternoon (4:00 PM – 6:00 PM)">Late Afternoon (16:00 – 18:00)</option>
                  </select>
                </div>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                <button type="submit" className="btn-primary w-full sm:w-auto cursor-pointer">
                  <Calendar className="w-4 h-4" />
                  <span>Confirm Test Drive Booking on WhatsApp</span>
                </button>
                <span className="font-mono text-[11px] text-[#8a8f98]">Valid driver's license required on day of drive</span>
              </div>
            </form>
          )}
        </div>

      </div>
    </section>
  );
};
