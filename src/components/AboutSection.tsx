import React from 'react';
import { ShieldCheck, Award, Globe, Users, ArrowRight, Building, CheckCircle2 } from 'lucide-react';
import { SkeletonImage } from './SkeletonImage';

interface AboutSectionProps {
  onExploreFleet: () => void;
  onExploreLocations: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onExploreFleet, onExploreLocations }) => {
  return (
    <section className="w-full bg-[#160a1d] py-20 sm:py-28 px-6 text-[#f5f5f7] border-t border-[rgba(197,168,128,0.18)]">
      <div className="max-w-[1400px] mx-auto space-y-20">
        
        {/* Section Header */}
        <div className="text-center max-w-[800px] mx-auto">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="h-[1px] w-6 bg-[rgba(197,168,128,0.4)]" />
            <span className="rr-eyebrow">
              ESTABLISHED 2000 // TWENTY-SIX YEARS OF PROVENANCE
            </span>
            <div className="h-[1px] w-6 bg-[rgba(197,168,128,0.4)]" />
          </div>
          <h1 className="rr-title-h1 text-[32px] sm:text-[46px] md:text-[54px] mb-4">
            TWENTY-SIX YEARS.<br />
            FOUR THOUSAND HANDOVERS.
          </h1>
          <p className="text-[#dfc7a5] font-['Cormorant_Garamond'] text-[18px] sm:text-[21px] italic leading-relaxed max-w-[700px] mx-auto">
            Founded in Mombasa in the year 2000, Alberka Motors was established to transcend commercial mediocrity: eliminating uncertainty, concealed structural compromises, and speculative broker margins surrounding imported Japanese motor cars.
          </p>
        </div>

        {/* Heritage Video Stage */}
        <div className="relative w-full mx-auto">
          <div className="w-full h-[380px] md:h-[480px] overflow-hidden relative bg-[#080809] border border-[rgba(197,168,128,0.3)]">
            <video autoPlay muted loop playsInline className="w-full h-full object-cover">
              <source src="https://videos.pexels.com/video-files/3571264/3571264-hd_1920_1080_30fps.mp4" type="video/mp4" />
              <img src="https://images.pexels.com/photos/33327689/pexels-photo-33327689.jpeg?auto=compress&cs=tinysrgb&w=1600" alt="Alberka Motors Heritage" className="w-full h-full object-cover" />
            </video>

            <div className="absolute inset-0 bg-gradient-to-t from-[#0f0714] via-[#0f0714]/30 to-transparent flex items-end p-8 sm:p-12">
              <div className="text-left text-[#f5f5f7] max-w-[650px]">
                <span className="font-['Cinzel'] text-[10px] text-[#c5a880] uppercase tracking-[0.25em] block mb-2">
                  CONTINUOUS PROVENANCE
                </span>
                <p className="font-['Cinzel'] text-[20px] sm:text-[26px] font-normal leading-snug text-[#f5f5f7] tracking-wider uppercase">
                  Serving Kenyan families, corporate leaders, and diplomatic missions since 2000.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-[#131316] border border-[rgba(197,168,128,0.35)] p-6 sm:p-8 max-w-[960px] mx-auto -mt-10 relative z-20 grid grid-cols-2 sm:grid-cols-4 gap-6 text-left">
            <div>
              <span className="font-['Cinzel'] text-[9.5px] text-[#8c8a94] uppercase tracking-wider block mb-1">FOUNDATION</span>
              <span className="font-['Cinzel'] text-[15px] text-[#f5f5f7]">Year 2000</span>
            </div>
            <div>
              <span className="font-['Cinzel'] text-[9.5px] text-[#8c8a94] uppercase tracking-wider block mb-1">CURATED HANDOVERS</span>
              <span className="font-['Cinzel'] text-[15px] text-[#f5f5f7]">4,000+ Marques</span>
            </div>
            <div>
              <span className="font-['Cinzel'] text-[9.5px] text-[#8c8a94] uppercase tracking-wider block mb-1">AUCTION GRADING</span>
              <span className="font-['Cinzel'] text-[15px] text-[#dfc7a5]">Grade 4.5+ Benchmark</span>
            </div>
            <div>
              <span className="font-['Cinzel'] text-[9.5px] text-[#8c8a94] uppercase tracking-wider block mb-1">WARRANTY</span>
              <span className="font-['Cinzel'] text-[15px] text-[#c5a880]">5,000 KM Written</span>
            </div>
          </div>
        </div>

        {/* Story Chapter 1: Direct Japanese Bidding */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center pt-8">
          <div className="space-y-4">
            <span className="rr-eyebrow block">AUCTION SOURCING DISCIPLINE</span>
            <h2 className="rr-title-h2 text-[26px] sm:text-[34px]">
              DIRECT AUCTION BIDDING.<br />NEVER THIRD-PARTY BROKERS.
            </h2>
            <p className="text-[14.5px] text-[#8c8a94] leading-relaxed font-light">
              Conventional commercial car lots in Kenya acquire stock through grey-market intermediaries who conceal cosmetic imperfections, roll back digital odometers, and bypass mechanical overhaul.
            </p>
            <p className="text-[14.5px] text-[#8c8a94] leading-relaxed font-light">
              Alberka Motors operates as an accredited direct bidder across Japan's premier auction houses: <strong className="text-[#dfc7a5] font-['Cinzel'] tracking-wider">USS TOKYO</strong>, <strong className="text-[#dfc7a5] font-['Cinzel'] tracking-wider">CAA CHUBU</strong>, and <strong className="text-[#dfc7a5] font-['Cinzel'] tracking-wider">TAA YOKOHAMA</strong>. Our Japanese inspectors physically examine each vehicle's undercarriage, chassis rails, and factory seam welds prior to submitting a single bid.
            </p>
            <div className="pt-2">
              <button
                onClick={onExploreFleet}
                className="btn-rr-solid !py-2.5 !px-5"
              >
                <span>EXPLORE VERIFIED INVENTORY</span>
                <ArrowRight className="w-3.5 h-3.5 ml-2" />
              </button>
            </div>
          </div>

          <div className="bg-[#131316] border border-[rgba(197,168,128,0.3)] p-8 space-y-6">
            <h3 className="font-['Cinzel'] text-[16px] text-[#f5f5f7] tracking-wider uppercase">The Alberka Motors Sourcing Covenant:</h3>
            <div className="space-y-4 text-[13.5px]">
              <div className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 bg-[#c5a880] shrink-0 mt-2" />
                <p className="text-[#8c8a94] font-light">
                  <strong className="text-[#f5f5f7] font-normal font-['Cinzel'] uppercase">Strict Grade 4.5 Minimum:</strong> Zero structural incident history, authentic factory paint depth verified, interior Grade A or B only.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 bg-[#c5a880] shrink-0 mt-2" />
                <p className="text-[#8c8a94] font-light">
                  <strong className="text-[#f5f5f7] font-normal font-['Cinzel'] uppercase">Authenticated Distance:</strong> Odometer readings verified by QISJ and JEVIC pre-export inspection certificates.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 bg-[#c5a880] shrink-0 mt-2" />
                <p className="text-[#8c8a94] font-light">
                  <strong className="text-[#f5f5f7] font-normal font-['Cinzel'] uppercase">Unfiltered Documentation:</strong> Original Japanese Export Certificate and official translated auction inspection sheet provided directly to the client.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Story Chapter 2: Coast to Capital Logistics */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center pt-10 border-t border-[rgba(197,168,128,0.18)]">
          <div className="order-2 md:order-1 overflow-hidden border border-[rgba(197,168,128,0.25)] bg-[#080809]">
            <SkeletonImage
              src="https://images.pexels.com/photos/16176579/pexels-photo-16176579.jpeg?auto=compress&cs=tinysrgb&w=1600"
              alt="Port of Mombasa Operations"
              containerClassName="w-full h-[280px] sm:h-[340px]"
            />
          </div>

          <div className="order-1 md:order-2 space-y-4">
            <span className="rr-eyebrow block">INTEGRATED LOGISTICAL ARCHITECTURE</span>
            <h2 className="rr-title-h2 text-[26px] sm:text-[34px]">
              MOMBASA ENTRY.<br />NAIROBI CONVENIENCE.
            </h2>
            <p className="text-[14.5px] text-[#8c8a94] leading-relaxed font-light">
              With our primary technical atelier located in Mombasa, our consignments roll directly off container vessels into our private workshop bays on Tangana Road. They never sit in unshaded bonded customs holding yards exposed to maritime salt corrosion.
            </p>
            <p className="text-[14.5px] text-[#8c8a94] leading-relaxed font-light">
              Vehicles destined for Nairobi clients are transported via enclosed flatbed carriers directly to our Westlands executive suite, arriving pristine and ready for immediate logbook conveyancing.
            </p>
            <div className="pt-2">
              <button
                onClick={onExploreLocations}
                className="btn-rr-ghost !py-2.5 !px-5"
              >
                <span>VIEW OUR SHOWROOM SUITES</span>
                <ArrowRight className="w-3.5 h-3.5 ml-2" />
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
