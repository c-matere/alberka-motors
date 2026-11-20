import React, { useState } from 'react';
import {
  Search,
  ArrowRight,
  ShieldCheck,
  Repeat,
  Gauge,
  Headphones,
  Sparkles
} from 'lucide-react';
import { CmsPage } from '../services/cmsContent';

export interface HeroProps {
  onExploreFleet: () => void;
  onExploreWorkshop: () => void;
  onSearchQuery?: (q: string) => void;
  pageData?: CmsPage;
}

export const Hero: React.FC<HeroProps> = ({
  onExploreFleet,
  onExploreWorkshop,
  onSearchQuery,
  pageData,
}) => {
  const [searchMake, setSearchMake] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [selectedBudget, setSelectedBudget] = useState('');

  const handleExecuteSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (onSearchQuery) {
      const q = [searchMake, selectedType, selectedBudget].filter(Boolean).join(' ');
      onSearchQuery(q);
    }
    onExploreFleet();
  };

  return (
    <section className="relative w-full bg-white pt-2 sm:pt-4 pb-8 sm:pb-14 px-3 sm:px-6 lg:px-8">
      <div className="max-w-[1520px] mx-auto">
        
        {/* Main Hero Card Container with Rounded Corners (1:1 Reference Style) */}
        <div className="relative w-full rounded-[24px] sm:rounded-[32px] overflow-hidden min-h-[600px] sm:min-h-[660px] lg:min-h-[740px] flex flex-col justify-between p-5 sm:p-8 lg:p-12 text-white shadow-[0_20px_50px_rgba(0,0,0,0.2)] border border-black/10 select-none">
          
          {/* Background Image Layer with Ambient Zoom & Studio Gradients */}
          <div className="absolute inset-0 z-0">
            <img
              src="/vehicles/luxury-showroom-hero.jpg"
              alt="Alberka Enterprises Luxury Showroom"
              className="w-full h-full object-cover object-center scale-102"
              loading="eager"
            />
            
            {/* Cinematic Gradient Overlays for High Contrast & Text Legibility */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/92 via-black/45 to-black/60" />
            <div className="absolute inset-0 bg-radial from-transparent via-black/20 to-black/70" />
          </div>

          {/* 1. TOP OVERLAY: Floating Airbnb-Style Search Bar */}
          <div className="relative z-10 w-full max-w-4xl mx-auto pt-1 sm:pt-2">
            <form
              onSubmit={handleExecuteSearch}
              className="bg-white/95 backdrop-blur-xl rounded-full shadow-[0_16px_36px_rgba(0,0,0,0.35)] border border-white/40 p-1.5 sm:p-2 text-[#222222] flex items-center justify-between transition-all hover:shadow-[0_20px_45px_rgba(0,0,0,0.45)]"
            >
              {/* Segment 1: Make / Model */}
              <div className="flex-1 px-3.5 sm:px-6 py-1.5 sm:py-2 border-r border-[#ebebeb] text-left min-w-0">
                <span className="text-[9.5px] sm:text-[10.5px] font-bold text-[#222222] uppercase tracking-wider block">
                  Make / Model
                </span>
                <input
                  type="text"
                  value={searchMake}
                  onChange={(e) => setSearchMake(e.target.value)}
                  placeholder="Toyota, Subaru, Volvo..."
                  className="w-full text-xs sm:text-sm font-medium text-[#222222] placeholder:text-[#6a6a6a] bg-transparent outline-none truncate mt-0.5"
                />
              </div>

              {/* Segment 2: Body Type (Hidden on very small screens, visible sm+) */}
              <div className="hidden sm:block flex-1 px-4 sm:px-6 py-1.5 sm:py-2 border-r border-[#ebebeb] text-left">
                <span className="text-[9.5px] sm:text-[10.5px] font-bold text-[#222222] uppercase tracking-wider block">
                  Body Type
                </span>
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="w-full text-xs sm:text-sm font-medium text-[#222222] bg-transparent outline-none cursor-pointer mt-0.5"
                >
                  <option value="">Any Body Type</option>
                  <option value="suv">SUV & Crossover</option>
                  <option value="awd">Symmetrical AWD</option>
                  <option value="van">7–8 Seater Van</option>
                  <option value="hybrid">Hybrid & Fuel Saver</option>
                </select>
              </div>

              {/* Segment 3: Budget Range (Hidden on small screens, visible md+) */}
              <div className="hidden md:block flex-1 px-4 sm:px-6 py-1.5 sm:py-2 text-left">
                <span className="text-[9.5px] sm:text-[10.5px] font-bold text-[#222222] uppercase tracking-wider block">
                  Budget
                </span>
                <select
                  value={selectedBudget}
                  onChange={(e) => setSelectedBudget(e.target.value)}
                  className="w-full text-xs sm:text-sm font-medium text-[#222222] bg-transparent outline-none cursor-pointer mt-0.5"
                >
                  <option value="">Any Price Tier</option>
                  <option value="2500000">Under KES 2.5M</option>
                  <option value="3500000">Under KES 3.5M</option>
                  <option value="4500000">Under KES 4.5M</option>
                  <option value="luxury">KES 4.5M+ (Executive)</option>
                </select>
              </div>

              {/* Red / Rausch Action Button */}
              <button
                type="submit"
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#ff385c] hover:bg-[#e00b41] text-white flex items-center justify-center shrink-0 shadow-md transition-all hover:scale-105 active:scale-95 cursor-pointer ml-1"
                title="Search Fleet"
                aria-label="Search fleet"
              >
                <Search className="w-4 h-4 sm:w-5 sm:h-5 text-white stroke-[2.5]" />
              </button>
            </form>
          </div>

          {/* 2. CENTER CONTENT: Headline & Primary Actions (1:1 Reference Typography) */}
          <div className="relative z-10 my-auto py-10 sm:py-16 text-center max-w-3xl mx-auto space-y-5">
            {/* Kicker */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white/90 shadow-2xs">
              <span className="w-1.5 h-1.5 rounded-full bg-[#ff385c]" />
              <span className="font-mono text-[10px] sm:text-[11.5px] uppercase tracking-[0.25em] font-bold">
                Quality Cars. Trusted Service.
              </span>
            </div>

            {/* Main Headline: Modern Sans Bold + Elegant Script Serif Italic */}
            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[0.95] text-white drop-shadow-md">
              DRIVE{' '}
              <span className="font-serif italic font-normal text-white/95">
                Excellence
              </span>
            </h1>

            {/* Subheadline */}
            <p className="text-xs sm:text-base md:text-lg text-white/85 max-w-xl mx-auto font-normal leading-relaxed drop-shadow-sm">
              Premium Japanese imports. Verified provenance. Unmatched value.
              <span className="block mt-0.5 text-white/70 text-xs sm:text-sm">Your next car is here in Mombasa.</span>
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-3">
              <button
                onClick={onExploreFleet}
                className="py-3 sm:py-3.5 px-7 sm:px-8 text-xs sm:text-sm rounded-full font-bold bg-white hover:bg-[#f7f7f7] text-[#222222] shadow-[0_10px_25px_rgba(0,0,0,0.3)] transition-all hover:scale-105 active:scale-95 inline-flex items-center gap-2 cursor-pointer"
              >
                <span>BROWSE INVENTORY</span>
                <ArrowRight className="w-4 h-4 text-[#222222]" />
              </button>

              <button
                onClick={onExploreWorkshop}
                className="py-3 sm:py-3.5 px-6 sm:px-7 text-xs sm:text-sm rounded-full font-semibold bg-black/40 hover:bg-black/60 text-white backdrop-blur-md border border-white/25 transition-all hover:scale-105 active:scale-95 inline-flex items-center gap-2 cursor-pointer shadow-sm"
              >
                <ShieldCheck className="w-4 h-4 text-[#ff385c]" />
                <span>TOKYO AUCTION SOURCING</span>
              </button>
            </div>
          </div>

          {/* 3. BOTTOM DOCKED: 4 Trust Pillars (Direct from Reference Design) */}
          <div className="relative z-10 w-full pt-6 border-t border-white/15">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 text-left">
              
              {/* Pillar 1 */}
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-full bg-white/10 border border-white/15 flex items-center justify-center shrink-0 text-white mt-0.5 shadow-2xs">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-[13px] font-bold text-white uppercase tracking-wider">
                    Quality Assured
                  </h4>
                  <p className="text-[11px] sm:text-xs text-white/70 mt-0.5 leading-snug">
                    Every vehicle is inspected for your peace of mind.
                  </p>
                </div>
              </div>

              {/* Pillar 2 */}
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-full bg-white/10 border border-white/15 flex items-center justify-center shrink-0 text-white mt-0.5 shadow-2xs">
                  <Gauge className="w-4 h-4 text-[#ff385c]" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-[13px] font-bold text-white uppercase tracking-wider">
                    Finance Made Easy
                  </h4>
                  <p className="text-[11px] sm:text-xs text-white/70 mt-0.5 leading-snug">
                    Flexible options tailored to your budget.
                  </p>
                </div>
              </div>

              {/* Pillar 3 */}
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-full bg-white/10 border border-white/15 flex items-center justify-center shrink-0 text-white mt-0.5 shadow-2xs">
                  <Repeat className="w-4 h-4 text-amber-400" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-[13px] font-bold text-white uppercase tracking-wider">
                    Trade-In Welcome
                  </h4>
                  <p className="text-[11px] sm:text-xs text-white/70 mt-0.5 leading-snug">
                    Get top value for your current vehicle.
                  </p>
                </div>
              </div>

              {/* Pillar 4 */}
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-full bg-white/10 border border-white/15 flex items-center justify-center shrink-0 text-white mt-0.5 shadow-2xs">
                  <Headphones className="w-4 h-4 text-cyan-400" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-[13px] font-bold text-white uppercase tracking-wider">
                    Aftersales Support
                  </h4>
                  <p className="text-[11px] sm:text-xs text-white/70 mt-0.5 leading-snug">
                    We're here long after you drive away.
                  </p>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default Hero;
