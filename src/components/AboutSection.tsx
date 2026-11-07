import React from 'react';
import { ShieldCheck, Award, Globe, Users, ArrowRight, Building, CheckCircle2 } from 'lucide-react';
import { SkeletonImage } from './SkeletonImage';

interface AboutSectionProps {
  onExploreFleet: () => void;
  onExploreLocations: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onExploreFleet, onExploreLocations }) => {
  return (
    <section className="w-full bg-[#08090a] py-16 px-4 sm:px-6 text-[#d0d6e0] border-t border-[#23252a]">
      <div className="max-w-[1200px] mx-auto space-y-16">
        
        {/* Header */}
        <div className="text-center max-w-[680px] mx-auto">
          <span className="launch-status-label mb-2">
            Established 2000 // Mombasa & Nairobi
          </span>
          <h1 className="hero-display mb-3">
            Twenty-six years.<br />
            Four thousand handovers.
          </h1>
          <p className="text-[14px] sm:text-[15px] text-[#8a8f98] leading-relaxed">
            Founded in Mombasa in the year 2000, Alberka Motors was built to solve a single persistent problem in the Kenyan automotive landscape: eliminating uncertainty, hidden structural flaws, and broker markups surrounding imported Japanese vehicles.
          </p>
        </div>

        {/* Heritage Video Stage */}
        <div className="relative w-full mx-auto">
          <div className="w-full h-[360px] md:h-[460px] rounded-[12px] overflow-hidden relative bg-[#0f1011] border border-[#23252a]">
            <video autoPlay muted loop playsInline className="w-full h-full object-cover">
              <source src="https://videos.pexels.com/video-files/3571264/3571264-hd_1920_1080_30fps.mp4" type="video/mp4" />
              <img src="https://images.pexels.com/photos/33327689/pexels-photo-33327689.jpeg?auto=compress&cs=tinysrgb&w=1600" alt="Alberka Motors Heritage" className="w-full h-full object-cover" />
            </video>

            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-6 sm:p-8">
              <div className="text-left text-white max-w-[580px]">
                <span className="font-mono text-[11px] text-[#8a8f98] uppercase tracking-wider block mb-1">
                  Continuous Provenance
                </span>
                <p className="text-[18px] sm:text-[22px] font-medium leading-tight text-[#ffffff]">
                  Serving Kenyan families, corporate executives, and international missions since 2000.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-[#0f1011] border border-[#23252a] rounded-[12px] p-5 sm:p-6 max-w-[800px] mx-auto -mt-8 relative z-20 grid grid-cols-2 sm:grid-cols-4 gap-4 text-left shadow-xl">
            <div>
              <span className="font-mono text-[11px] text-[#8a8f98] uppercase tracking-wide block">Incorporation</span>
              <span className="text-[16px] font-medium text-[#ffffff]">Year 2000</span>
            </div>
            <div>
              <span className="font-mono text-[11px] text-[#8a8f98] uppercase tracking-wide block">Delivered Fleet</span>
              <span className="text-[16px] font-medium text-[#ffffff]">4,000+ Units</span>
            </div>
            <div>
              <span className="font-mono text-[11px] text-[#8a8f98] uppercase tracking-wide block">Auction Standard</span>
              <span className="text-[16px] font-medium text-[#ffffff]">Grade 4.5+ Only</span>
            </div>
            <div>
              <span className="font-mono text-[11px] text-[#8a8f98] uppercase tracking-wide block">Warranty</span>
              <span className="text-[16px] font-medium text-[#ffffff]">5,000 km Written</span>
            </div>
          </div>
        </div>

        {/* Story Chapter 1: Direct Auction Bidding vs Brokers */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center pt-6">
          <div className="space-y-3.5">
            <span className="launch-status-label mb-1">Auction Sourcing Standard</span>
            <h2 className="feature-heading">
              We bid directly.<br />Never third-party brokers.
            </h2>
            <p className="text-[14px] text-[#8a8f98] leading-relaxed">
              Most car dealerships in Kenya purchase from grey-market brokers who mask cosmetic defects, roll back digital odometers, and bypass mechanical fluid changes.
            </p>
            <p className="text-[14px] text-[#8a8f98] leading-relaxed">
              Alberka Motors operates as an accredited direct bidder across Japan's premier auction networks: <strong className="text-[#ffffff]">USS Tokyo</strong>, <strong className="text-[#ffffff]">CAA Chubu</strong>, and <strong className="text-[#ffffff]">TAA Yokohama</strong>. Our Japanese agents physically inspect every vehicle's underbody, chassis rails, and factory spot welds before placing a single bid.
            </p>
            <div className="pt-2">
              <button
                onClick={onExploreFleet}
                className="text-[#d0d6e0] hover:text-[#ffffff] flex items-center gap-1.5 text-[13px] font-normal transition-colors cursor-pointer"
              >
                <span>Explore verified auction inventory</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="bg-[#0f1011] border border-[#23252a] rounded-[12px] p-6 sm:p-8 space-y-4">
            <h3 className="text-[16px] font-medium text-[#ffffff]">The Alberka Motors 3-Point Sourcing Covenant:</h3>
            <div className="space-y-3 text-[13px]">
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#27a644] shrink-0 mt-0.5" />
                <p className="text-[#8a8f98]">
                  <strong className="text-[#ffffff]">Strict Grade 4.5 Minimum:</strong> No structural collisions, original factory paint depth verified, interior Grade A or B only.
                </p>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#27a644] shrink-0 mt-0.5" />
                <p className="text-[#8a8f98]">
                  <strong className="text-[#ffffff]">Authenticated Mileage:</strong> Odometer readings verified by QISJ and JEVIC pre-shipment inspection certificates.
                </p>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#27a644] shrink-0 mt-0.5" />
                <p className="text-[#8a8f98]">
                  <strong className="text-[#ffffff]">Unfiltered Documentation:</strong> Original Japanese Export Certificate and official translated auction inspection sheet provided to the buyer.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Story Chapter 2: Coast to Capital Logistics */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center pt-8 border-t border-[#23252a]">
          <div className="order-2 md:order-1 rounded-[12px] overflow-hidden border border-[#23252a]">
            <SkeletonImage
              src="https://images.pexels.com/photos/16176579/pexels-photo-16176579.jpeg?auto=compress&cs=tinysrgb&w=1600"
              alt="Port of Mombasa Operations"
              containerClassName="w-full h-[260px] sm:h-[320px]"
            />
          </div>

          <div className="order-1 md:order-2 space-y-3.5">
            <span className="launch-status-label mb-1">Integrated Infrastructure</span>
            <h2 className="feature-heading">
              Mombasa entry.<br />Nairobi convenience.
            </h2>
            <p className="text-[14px] text-[#8a8f98] leading-relaxed">
              With our primary technical facility located in Mombasa, our vehicles roll directly off container vessels into our workshop bays. They never sit in unshaded bonded customs yards exposed to maritime salt corrosion.
            </p>
            <p className="text-[14px] text-[#8a8f98] leading-relaxed">
              Vehicles ordered for Nairobi clients are transported via enclosed flatbed carriers directly to our Westlands showroom, arriving spotless and ready for immediate logbook handover.
            </p>
            <div className="pt-2">
              <button
                onClick={onExploreLocations}
                className="text-[#d0d6e0] hover:text-[#ffffff] flex items-center gap-1.5 text-[13px] font-normal transition-colors cursor-pointer"
              >
                <span>View our Mombasa & Nairobi showrooms</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
