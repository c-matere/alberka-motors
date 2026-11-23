import React from 'react';
import { ArrowRight, CheckCircle2, Clock, Phone, Mail, MessageCircle, Navigation, MapPin, Compass, ShieldCheck } from 'lucide-react';
import { SkeletonImage } from './SkeletonImage';
import { CmsPage, CmsSiteSettings } from '../services/cmsContent';
import { Vehicle } from '../data/vehicles';
import { TeamDesk } from '../data/team';
import { LocationImage } from '../data/location';
import { ShowroomMapHub } from './ShowroomMapHub';
import { TeamSection } from './TeamSection';

interface AboutSectionProps {
  onExploreFleet: () => void;
  onExploreLocations?: () => void;
  pageData?: CmsPage;
  settings?: CmsSiteSettings;
  vehicles?: Vehicle[];
  teamMembers?: TeamDesk[];
  locationPhotos?: LocationImage[];
}

export const AboutSection: React.FC<AboutSectionProps> = ({
  onExploreFleet,
  onExploreLocations,
  pageData,
  settings,
  vehicles = [],
  teamMembers,
  locationPhotos,
}) => {
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
                <span className="font-mono text-[9.5px] sm:text-xs text-red-600 uppercase tracking-widest block font-bold">
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
                <CheckCircle2 className="w-4 h-4 text-[#DC2626] shrink-0 mt-0.5" />
                <p className="text-[#222222]">
                  <strong className="text-[#222222]">Grade 4.5 Minimum:</strong> Pristine bodywork, factory paint depth, and flawless interior cabins.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-[#DC2626] shrink-0 mt-0.5" />
                <p className="text-[#222222]">
                  <strong className="text-[#222222]">Certified Genuine Mileage:</strong> Official QISJ and JEVIC Japanese certificates provided with every unit.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-[#DC2626] shrink-0 mt-0.5" />
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

        {/* The desks behind the standard, and how to reach them */}
        <TeamSection settings={settings} members={teamMembers} />

        {/* Official Mombasa Showroom & Workshop Hub */}
        <ShowroomMapHub settings={settings} vehicles={vehicles} photos={locationPhotos} />

        {/* Anti-Tampering Mileage Policy & CSR Governance */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-12 border-t border-[#ebebeb] text-left">
          {/* Anti-Tampering Mileage Policy */}
          <div id="anti-tampering-policy" className="bg-white border border-[#ebebeb] hover:border-[#dddddd] rounded-[16px] p-6 sm:p-8 space-y-4 shadow-[0_1px_2px_rgba(0,0,0,0.08),0_4px_12px_rgba(0,0,0,0.05)] scroll-mt-24 relative overflow-hidden">
            <div className="flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-full bg-[#f7f7f7] border border-[#ebebeb] flex items-center justify-center text-[#222222] shrink-0">
                <CheckCircle2 className="w-4 h-4 text-[#DC2626]" />
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
