import React from 'react';
import { ShieldCheck, Award, Globe, Users, ArrowRight, Building, CheckCircle2 } from 'lucide-react';
import { SkeletonImage } from './SkeletonImage';

interface AboutSectionProps {
  onExploreFleet: () => void;
  onExploreLocations: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onExploreFleet, onExploreLocations }) => {
  return (
    <section className="w-full bg-[#09090b] py-16 sm:py-24 px-6 sm:px-10 text-[#f4f4f5] border-t border-[#27272a]">
      <div className="max-w-[1400px] mx-auto space-y-16">
        
        {/* Section Header */}
        <div className="text-center max-w-[780px] mx-auto">
          <span className="brand-eyebrow block mb-2">
            ABOUT ALBERKA MOTORS // ESTABLISHED 2000
          </span>
          <h1 className="text-[32px] sm:text-[46px] font-bold text-white tracking-tight mb-4">
            26 Years in Kenya.<br />Over 4,000 Happy Drivers.
          </h1>
          <p className="text-[16px] sm:text-[18px] text-[#a1a1aa] leading-relaxed">
            Founded in Mombasa in 2000, Alberka Motors was built on one straightforward rule: no hidden accident damage, no tampered odometers, and fair, transparent pricing.
          </p>
        </div>

        {/* Video Stage */}
        <div className="relative w-full mx-auto">
          <div className="w-full h-[360px] md:h-[460px] overflow-hidden relative bg-[#121215] border border-[#27272a] rounded-[4px]">
            <video autoPlay muted loop playsInline className="w-full h-full object-cover">
              <source src="https://videos.pexels.com/video-files/3571264/3571264-hd_1920_1080_30fps.mp4" type="video/mp4" />
              <img src="https://images.pexels.com/photos/33327689/pexels-photo-33327689.jpeg?auto=compress&cs=tinysrgb&w=1600" alt="Alberka Motors Heritage" className="w-full h-full object-cover" />
            </video>

            <div className="absolute inset-0 bg-gradient-to-t from-[#09090b] via-[#09090b]/30 to-transparent flex items-end p-6 sm:p-10">
              <div className="text-left text-white max-w-[650px]">
                <span className="font-mono text-[11px] text-[#ef4444] uppercase tracking-wider block mb-1 font-semibold">
                  REPUTATION BUILT ON TRUST
                </span>
                <p className="text-[20px] sm:text-[26px] font-bold text-white leading-snug">
                  Trusted by families, business owners, and corporate clients across Kenya since 2000.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-[#121215] border border-[#27272a] p-6 sm:p-8 max-w-[960px] mx-auto -mt-8 relative z-20 grid grid-cols-2 sm:grid-cols-4 gap-6 text-left rounded-[4px] shadow-2xl">
            <div>
              <span className="font-mono text-[10px] text-[#71717a] uppercase tracking-wider block mb-1">FOUNDED</span>
              <span className="text-[16px] font-bold text-white">Year 2000</span>
            </div>
            <div>
              <span className="font-mono text-[10px] text-[#71717a] uppercase tracking-wider block mb-1">CARS DELIVERED</span>
              <span className="text-[16px] font-bold text-white">4,000+ Vehicles</span>
            </div>
            <div>
              <span className="font-mono text-[10px] text-[#71717a] uppercase tracking-wider block mb-1">AUCTION QUALITY</span>
              <span className="text-[16px] font-bold text-white">Grade 4.5+ Average</span>
            </div>
            <div>
              <span className="font-mono text-[10px] text-[#71717a] uppercase tracking-wider block mb-1">WARRANTY</span>
              <span className="text-[16px] font-bold text-[#ef4444]">5,000 KM Written</span>
            </div>
          </div>
        </div>

        {/* Story Chapter 1: Direct Bidding */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center pt-6">
          <div className="space-y-4">
            <span className="brand-eyebrow block">HOW WE SOURCE CARS</span>
            <h2 className="text-[26px] sm:text-[34px] font-bold text-white tracking-tight leading-tight">
              Direct Auction Bidding in Japan.<br />Zero Middlemen.
            </h2>
            <p className="text-[15px] text-[#a1a1aa] leading-relaxed">
              Many car sellers buy from random brokers who roll back odometers or conceal previous accident repairs. We don't do that.
            </p>
            <p className="text-[15px] text-[#a1a1aa] leading-relaxed">
              Alberka Motors bids directly at Japan's top auction houses: <strong className="text-white">USS Tokyo</strong>, <strong className="text-white">CAA Chubu</strong>, and <strong className="text-white">TAA Yokohama</strong>. Our Japanese inspection agents physically check the engine, chassis, and body panels before we place a single bid.
            </p>
            <div className="pt-2">
              <button
                onClick={onExploreFleet}
                className="btn-crimson"
              >
                <span>Browse Inspected Cars</span>
                <ArrowRight className="w-4 h-4 ml-1.5" />
              </button>
            </div>
          </div>

          <div className="bg-[#121215] border border-[#27272a] p-6 sm:p-8 space-y-4 rounded-[4px]">
            <h3 className="text-[16px] font-bold text-white uppercase tracking-wider">The Alberka Quality Standard:</h3>
            <div className="space-y-4 text-[14px]">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-[#ef4444] shrink-0 mt-0.5" />
                <p className="text-[#a1a1aa]">
                  <strong className="text-white">Grade 4.5 Minimum:</strong> Clean bodywork, factory original paint depth, and immaculate interior.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-[#ef4444] shrink-0 mt-0.5" />
                <p className="text-[#a1a1aa]">
                  <strong className="text-white">Genuine Mileage:</strong> Every odometer reading is verified by official QISJ and JEVIC certificates.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-[#ef4444] shrink-0 mt-0.5" />
                <p className="text-[#a1a1aa]">
                  <strong className="text-white">Original Paperwork:</strong> You receive the original Japanese export certificate and translated auction sheet with your logbook.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Story Chapter 2: Coast to Nairobi */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center pt-8 border-t border-[#27272a]">
          <div className="order-2 md:order-1 overflow-hidden border border-[#27272a] bg-[#121215] rounded-[4px]">
            <SkeletonImage
              src="https://images.pexels.com/photos/16176579/pexels-photo-16176579.jpeg?auto=compress&cs=tinysrgb&w=1600"
              alt="Port of Mombasa Operations"
              containerClassName="w-full h-[260px] sm:h-[320px]"
            />
          </div>

          <div className="order-1 md:order-2 space-y-4">
            <span className="brand-eyebrow block">FROM SHIP TO ROAD</span>
            <h2 className="text-[26px] sm:text-[34px] font-bold text-white tracking-tight leading-tight">
              Mombasa Port Entry.<br />Nairobi Showroom Pickup.
            </h2>
            <p className="text-[15px] text-[#a1a1aa] leading-relaxed">
              Because our main technical workshop is right in Mombasa, our vehicles roll off container ships directly into our private workshop on Tangana Road. They are never left in dusty or exposed holding yards.
            </p>
            <p className="text-[15px] text-[#a1a1aa] leading-relaxed">
              For Nairobi clients, we transport your car via enclosed carrier to our Westlands branch, fully serviced, detailed, and ready for you to drive away.
            </p>
            <div className="pt-2">
              <button
                onClick={onExploreLocations}
                className="btn-ghost"
              >
                <span>Showroom Directions</span>
                <ArrowRight className="w-4 h-4 ml-1.5" />
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
