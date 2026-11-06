import React from 'react';
import { ShieldCheck, Award, Globe, Users, ArrowRight, Building, CheckCircle2 } from 'lucide-react';
import { SkeletonImage } from './SkeletonImage';

interface AboutSectionProps {
  onExploreFleet: () => void;
  onExploreLocations: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onExploreFleet, onExploreLocations }) => {
  return (
    <section className="w-full bg-[#121215] py-16 px-6">
      <div className="max-w-[1240px] mx-auto space-y-20">
        
        {/* Header */}
        <div className="text-center max-w-[760px] mx-auto">
          <span className="launch-status-label mb-2">
            Established 2000 · Mombasa & Nairobi
          </span>
          <h1 className="hero-display mb-4">
            Twenty-six years.<br />
            Four thousand handovers.
          </h1>
          <p className="text-[17px] md:text-[19px] text-zinc-400 leading-[1.47]" style={{ letterSpacing: '-0.374px' }}>
            Founded in Mombasa in the year 2000, Alberka Motors was built to solve a single persistent problem in the Kenyan automotive landscape: eliminating the uncertainty, hidden structural flaws, and broker markups surrounding imported Japanese vehicles.
          </p>
        </div>

        {/* Cinematic Heritage Video Stage */}
        <div className="relative w-full mx-auto">
          <div className="w-full h-[440px] md:h-[540px] rounded-[28px] overflow-hidden relative bg-[#121215]">
            <video autoPlay muted loop playsInline className="w-full h-full object-cover">
              <source src="https://videos.pexels.com/video-files/3571264/3571264-hd_1920_1080_30fps.mp4" type="video/mp4" />
              <img src="https://images.pexels.com/photos/33327689/pexels-photo-33327689.jpeg?auto=compress&cs=tinysrgb&w=1600" alt="Alberka Motors Heritage" className="w-full h-full object-cover" />
            </video>

            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-8">
              <div className="text-left text-white max-w-[620px]">
                <span className="text-[11px] font-semibold uppercase tracking-widest text-white/80">
                  Continuous Provenance
                </span>
                <p className="text-[22px] font-semibold leading-tight mt-1">
                  Serving Kenyan families, corporate executives, and international missions since 2000.
                </p>
              </div>
            </div>
          </div>

          <div className="floating-capsule p-6 max-w-[820px] mx-auto -mt-10 relative z-20 grid grid-cols-2 sm:grid-cols-4 gap-6 text-left bg-[#121215]">
            <div>
              <span className="text-[11px] text-zinc-400 uppercase tracking-wide block font-medium">Incorporation</span>
              <span className="text-[20px] font-semibold text-white">Year 2000</span>
            </div>
            <div>
              <span className="text-[11px] text-zinc-400 uppercase tracking-wide block font-medium">Delivered Fleet</span>
              <span className="text-[20px] font-semibold text-white">4,000+ Units</span>
            </div>
            <div>
              <span className="text-[11px] text-zinc-400 uppercase tracking-wide block font-medium">Auction Standard</span>
              <span className="text-[20px] font-bold text-white">Grade 4.5+ Only</span>
            </div>
            <div>
              <span className="text-[11px] text-zinc-400 uppercase tracking-wide block font-medium">Warranty</span>
              <span className="text-[20px] font-semibold text-white">5,000 km Written</span>
            </div>
          </div>
        </div>

        {/* Story Chapter 1: Direct Auction Bidding vs Brokers */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center pt-8">
          <div>
            <span className="launch-status-label mb-2">Auction Sourcing Standard</span>
            <h2 className="feature-heading mb-4">
              We bid directly.<br />Never third-party brokers.
            </h2>
            <p className="text-[16px] text-zinc-400 leading-relaxed mb-4">
              Most car dealerships in Kenya purchase from grey-market brokers who mask cosmetic defects, roll back digital odometers, and bypass mechanical fluid changes.
            </p>
            <p className="text-[16px] text-zinc-400 leading-relaxed mb-6">
              Alberka Motors operates as an accredited direct bidder across Japan's premier auction networks: <strong>USS Tokyo</strong>, <strong>CAA Chubu</strong>, and <strong>TAA Yokohama</strong>. Our Japanese agents physically inspect every vehicle's underbody, chassis rails, and factory spot welds before placing a single bid.
            </p>
            <button
              onClick={onExploreFleet}
              className="apple-blue-link cursor-pointer font-medium"
            >
              <span>Explore our verified auction inventory</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="apple-card p-8 bg-[#121215] border-0 space-y-4">
            <h3 className="text-[18px] font-semibold text-white mb-2">The Alberka Motors 3-Point Sourcing Covenant:</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <p className="text-[14px] text-white">
                  <strong>Strict Grade 4.5 Minimum:</strong> No structural collisions, original factory paint depth verified, interior Grade A or B only.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <p className="text-[14px] text-white">
                  <strong>Authenticated Mileage:</strong> Odometer readings verified by QISJ and JEVIC pre-shipment inspection certificates.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <p className="text-[14px] text-white">
                  <strong>Unfiltered Documentation:</strong> Original Japanese Export Certificate and official translated auction inspection sheet provided to the buyer.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Story Chapter 2: Coast to Capital Logistics */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center pt-8 border-t border-[#27272a]">
          <div className="order-2 md:order-1 apple-card overflow-hidden">
            <SkeletonImage
              src="https://images.pexels.com/photos/16176579/pexels-photo-16176579.jpeg?auto=compress&cs=tinysrgb&w=1600"
              alt="Port of Mombasa Operations"
              containerClassName="w-full h-[280px] sm:h-[360px]"
            />
          </div>

          <div className="order-1 md:order-2">
            <span className="launch-status-label mb-2">Integrated Infrastructure</span>
            <h2 className="feature-heading mb-4">
              Mombasa entry.<br />Nairobi convenience.
            </h2>
            <p className="text-[16px] text-zinc-400 leading-relaxed mb-4">
              With our primary technical facility located in Mombasa, our vehicles roll directly off container vessels into our workshop bays. They never sit in unshaded bonded customs yards exposed to maritime salt corrosion.
            </p>
            <p className="text-[16px] text-zinc-400 leading-relaxed mb-6">
              Vehicles ordered for Nairobi clients are transported via enclosed flatbed carriers directly to our Westlands showroom, arriving spotless and ready for immediate logbook handover.
            </p>
            <button
              onClick={onExploreLocations}
              className="apple-blue-link cursor-pointer font-medium"
            >
              <span>View our Mombasa & Nairobi showrooms</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
