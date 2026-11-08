import React from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { SkeletonImage } from './SkeletonImage';

interface AboutSectionProps {
  onExploreFleet: () => void;
  onExploreLocations: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onExploreFleet, onExploreLocations }) => {
  return (
    <section className="w-full bg-transparent py-16 sm:py-24 px-4 sm:px-8 text-[#f4f4f5] relative">
      {/* Soft black top & bottom gradient dissolves */}
      <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[#09090c] to-transparent pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#09090c] to-transparent pointer-events-none" />
      <div className="max-w-[1240px] mx-auto space-y-16 sm:space-y-20 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-[800px] mx-auto space-y-3">
          <div className="inline-flex items-center gap-2">
            <span className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-zinc-400">
              HERITAGE & PROVENANCE · ESTABLISHED 2000
            </span>
          </div>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold text-white tracking-[-0.035em] leading-[1.05]">
            26 Years in Kenya.<br />4,000+ Verified Imports.
          </h1>
          <p className="text-base sm:text-lg text-zinc-400 leading-relaxed font-normal max-w-2xl mx-auto">
            Founded in Mombasa in 2000, Alberka Motors was built on one strict standard: zero accident histories, zero mileage tampering, and transparent direct pricing.
          </p>
        </div>

        {/* Video Cinema Stage */}
        <div className="space-y-8">
          <div className="w-full aspect-[16/9] sm:aspect-[21/9.5] max-h-[520px] overflow-hidden relative bg-black border border-white/[0.08] rounded-2xl shadow-[0_24px_60px_rgba(0,0,0,0.85)]">
            <video autoPlay muted loop playsInline className="w-full h-full object-cover">
              <source src="https://videos.pexels.com/video-files/3571264/3571264-hd_1920_1080_30fps.mp4" type="video/mp4" />
              <img src="https://images.pexels.com/photos/33327689/pexels-photo-33327689.jpeg?auto=compress&cs=tinysrgb&w=1600" alt="Alberka Motors Heritage" className="w-full h-full object-cover" />
            </video>

            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-6 sm:p-10 pointer-events-none">
              <div className="text-left text-white max-w-[620px] space-y-1">
                <span className="font-mono text-[10px] text-zinc-400 uppercase tracking-widest block">
                  PROVENANCE ARCHIVE
                </span>
                <p className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                  Direct auction procurement from Tokyo, Yokohama, and Nagoya since 2000.
                </p>
              </div>
            </div>
          </div>

          {/* Architectural Metric Matrix (Hairline Dividers) */}
          <div className="border-y border-white/[0.08] py-8 grid grid-cols-2 sm:grid-cols-4 gap-6 text-left">
            <div>
              <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-wider block mb-1">FOUNDED</span>
              <span className="text-base sm:text-lg font-bold text-white block">Year 2000</span>
              <span className="text-xs text-zinc-400">26 years continuous operations</span>
            </div>
            <div>
              <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-wider block mb-1">CARS DELIVERED</span>
              <span className="text-base sm:text-lg font-bold text-white block">4,000+ Vehicles</span>
              <span className="text-xs text-zinc-400">Mombasa & Nairobi clients</span>
            </div>
            <div>
              <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-wider block mb-1">AUCTION QUALITY</span>
              <span className="text-base sm:text-lg font-bold text-white block">Grade 4.5+ Benchmark</span>
              <span className="text-xs text-zinc-400">USS Tokyo & CAA Chubu</span>
            </div>
            <div>
              <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-wider block mb-1">WARRANTY</span>
              <span className="text-base sm:text-lg font-bold text-white block">5,000 KM Written</span>
              <span className="text-xs text-zinc-400">Supported by in-house workshop</span>
            </div>
          </div>
        </div>

        {/* Chapter 1: Direct Japanese Bidding */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-4">
          <div className="lg:col-span-7 space-y-5 text-left">
            <span className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-zinc-400 font-semibold block">
              SOURCING PRINCIPLE
            </span>
            <h2 className="text-2xl sm:text-4xl font-bold text-white tracking-[-0.03em] leading-tight">
              Direct Japanese Auction Bidding.<br />Zero Intermediaries.
            </h2>
            <p className="text-sm sm:text-base text-zinc-300 leading-relaxed font-normal">
              Many importers purchase from third-party brokers where odometer rollback and disguised accident damage are commonplace. Alberka eliminates this risk at source.
            </p>
            <p className="text-sm sm:text-base text-zinc-400 leading-relaxed font-normal">
              We bid directly in the Tokyo, Yokohama, and Nagoya wholesale lanes via licensed auction accounts. Before every bid, our Japanese inspection partners conduct a physical 10-point check of structural rails, paint micron depth, and onboard electronics.
            </p>
            <div className="pt-2">
              <button
                onClick={onExploreFleet}
                className="btn-white py-3 px-6 text-xs sm:text-sm font-semibold inline-flex items-center gap-2"
              >
                <span>Browse Inspected Vehicles</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="lg:col-span-5 relative bg-[#0c0c0f] border border-white/[0.08] p-6 sm:p-8 rounded-2xl space-y-5 text-left before:absolute before:inset-x-8 before:top-0 before:h-[1px] before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent">
            <span className="font-mono text-xs text-white uppercase tracking-wider font-bold block">
              The Alberka Standard:
            </span>
            <div className="space-y-4 text-xs sm:text-sm">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-white shrink-0 mt-0.5" />
                <p className="text-zinc-300">
                  <strong className="text-white">Grade 4.5 Minimum:</strong> Pristine bodywork, factory paint depth, and flawless interior cabins.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-white shrink-0 mt-0.5" />
                <p className="text-zinc-300">
                  <strong className="text-white">Certified Genuine Mileage:</strong> Official QISJ and JEVIC Japanese certificates provided with every unit.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-white shrink-0 mt-0.5" />
                <p className="text-zinc-300">
                  <strong className="text-white">Original Export Dossier:</strong> Japanese export certificate and translated auction inspection sheet delivered with your logbook.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Chapter 2: Coast to Nairobi Logistics */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-8 border-t border-white/[0.08]">
          <div className="lg:col-span-5 order-2 lg:order-1 overflow-hidden border border-white/[0.08] rounded-2xl bg-black">
            <SkeletonImage
              src="https://images.pexels.com/photos/16176579/pexels-photo-16176579.jpeg?auto=compress&cs=tinysrgb&w=1600"
              alt="Port of Mombasa Operations"
              containerClassName="w-full aspect-[4/3] sm:h-[320px]"
            />
          </div>

          <div className="lg:col-span-7 order-1 lg:order-2 space-y-5 text-left">
            <span className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-zinc-400 font-semibold block">
              LOGISTICAL CONTINUITY
            </span>
            <h2 className="text-2xl sm:text-4xl font-bold text-white tracking-[-0.03em] leading-tight">
              Mombasa Port Entry.<br />Nairobi Showroom Handover.
            </h2>
            <p className="text-sm sm:text-base text-zinc-300 leading-relaxed font-normal">
              With our flagship technical workshop located directly in Mombasa on Tangana Road, vehicles roll off carrier vessels directly into our secured facility. They are never parked in unmonitored holding yards.
            </p>
            <p className="text-sm sm:text-base text-zinc-400 leading-relaxed font-normal">
              For Nairobi clients, each vehicle is transported via dedicated carrier to our Westlands hub, fully serviced, detailed, and ready for immediate city collection.
            </p>
            <div className="pt-2">
              <button
                onClick={onExploreLocations}
                className="btn-ghost py-3 px-6 text-xs sm:text-sm font-medium inline-flex items-center gap-2"
              >
                <span>View Showroom Locations</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
