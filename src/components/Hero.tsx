import React, { useState } from 'react';
import {
  Search,
  ArrowRight,
  ShieldCheck,
  Repeat,
  Gauge,
  Headphones
} from 'lucide-react';
import { CmsPage } from '../services/cmsContent';

// Single source of truth for the hero backdrop. Drop a replacement image into
// /public/vehicles/ and change this one line to swap the showroom scene.
const HERO_BACKGROUND = '/vehicles/hero-new.jpg';

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
    <section
      data-no-reveal="true"
      className="relative w-full overflow-hidden bg-[#0a0a0c] text-white select-none"
      style={{ minHeight: 'calc(100dvh - 5rem)' }}
    >
      {/* ── 1. FULL-BLEED SHOWROOM BACKGROUND ─────────────────────────── */}
      <div className="absolute inset-0 z-0">
        {/* Primary showroom photo — brightened so the scene reads clearly */}
        <img
          src={HERO_BACKGROUND}
          alt="Alberka Enterprises Luxury Showroom"
          className="w-full h-full object-cover object-center scale-[1.06]"
          style={{ filter: 'brightness(1.06) contrast(1.03) saturate(1.02) blur(2px)' }}
          loading="eager"
          fetchPriority="high"
        />

        {/* Lighter scrims: enough contrast for type without flattening the photo */}
        {/* Bottom-heavy dark gradient for trust pillars */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/15" />
        {/* Soft top shade behind the kicker */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-transparent" />
        {/* Subtle vignette */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 120% 100% at 50% 45%, transparent 45%, rgba(0,0,0,0.4) 100%)',
          }}
        />
      </div>

      {/* ── 2. CENTER HERO CONTENT ─────────────────────────────────────── */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 sm:px-8 pt-28 sm:pt-32 pb-8 sm:pb-10 min-h-[inherit]"
        style={{ minHeight: 'calc(100dvh - 5rem)' }}
      >
        <div className="max-w-4xl w-full mx-auto space-y-5 sm:space-y-7 flex flex-col items-center">

          {/* Kicker badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white/90">
            <span className="w-1.5 h-1.5 rounded-full bg-[#DC2626]" />
            <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.25em] font-bold">
              Quality Cars. Trusted Service.
            </span>
          </div>

          {/* DRIVE / Excellence — deliberately overlapping editorial stack */}
          <div className="text-center leading-none relative">
            <span
              className="block font-black uppercase tracking-tighter text-white relative z-[1]"
              style={{ fontSize: 'clamp(3.5rem, 10vw, 9rem)', lineHeight: 0.92 }}
            >
              DRIVE
            </span>
            <span
              className="block font-serif italic font-normal text-[#DC2626] relative z-[2]"
              style={{
                fontSize: 'clamp(3.8rem, 11vw, 10rem)',
                lineHeight: 0.92,
                letterSpacing: '-0.035em',
                marginTop: 'clamp(-3.5rem, -4vw, -1rem)',
                textShadow: '0 6px 28px rgba(0,0,0,0.55), 0 0 30px rgba(220,38,38,0.28)',
              }}
            >
              Excellence
            </span>
          </div>

          {/* Subheadline */}
          <p className="text-sm sm:text-base md:text-lg text-white/80 max-w-lg mx-auto font-normal leading-relaxed">
            Premium Japanese imports. Verified provenance. Unmatched value.
            <span className="block mt-0.5 text-white/60 text-xs sm:text-sm">
              Your next car is here in Mombasa.
            </span>
          </p>

          {/* ── AIRBNB SEARCH BAR ───────────────────────────────────── */}
          <div className="w-full max-w-3xl mx-auto pt-1">
            <form
              onSubmit={handleExecuteSearch}
              className="bg-white/96 backdrop-blur-xl rounded-full shadow-[0_20px_60px_rgba(0,0,0,0.55)] border border-white/30 p-1.5 sm:p-2 text-[#222222] flex items-center transition-all hover:shadow-[0_28px_70px_rgba(0,0,0,0.65)]"
            >
              {/* Make / Model */}
              <div className="flex-1 px-4 sm:px-6 py-2 border-r border-[#ebebeb] text-left min-w-0">
                <span className="text-[9.5px] sm:text-[10.5px] font-bold text-[#222222] uppercase tracking-wider block">
                  Make / Model
                </span>
                <input
                  type="text"
                  value={searchMake}
                  onChange={(e) => setSearchMake(e.target.value)}
                  placeholder="Toyota, Subaru, Volvo..."
                  className="w-full text-xs sm:text-sm font-medium text-[#222222] placeholder:text-[#aaa] bg-transparent outline-none truncate mt-0.5"
                />
              </div>

              {/* Body Type */}
              <div className="hidden sm:block flex-1 px-4 sm:px-6 py-2 border-r border-[#ebebeb] text-left">
                <span className="text-[9.5px] sm:text-[10.5px] font-bold text-[#222222] uppercase tracking-wider block">
                  Body Type
                </span>
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="w-full text-xs sm:text-sm font-medium text-[#222222] bg-transparent outline-none cursor-pointer mt-0.5"
                >
                  <option value="">Any Body Type</option>
                  <option value="suv">SUV &amp; Crossover</option>
                  <option value="awd">Symmetrical AWD</option>
                  <option value="van">7–8 Seater Van</option>
                  <option value="hybrid">Hybrid &amp; Fuel Saver</option>
                </select>
              </div>

              {/* Budget */}
              <div className="hidden md:block flex-1 px-4 sm:px-6 py-2 text-left">
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

              {/* Search CTA */}
              <button
                type="submit"
                className="ml-1 px-5 sm:px-7 py-3 sm:py-3.5 rounded-full bg-[#DC2626] hover:bg-[#B91C1C] text-white flex items-center gap-2 shrink-0 font-bold shadow-lg transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer text-sm"
                title="Search Inventory"
              >
                <Search className="w-4 h-4 stroke-[2.5]" />
                <span className="hidden sm:inline">Search</span>
              </button>
            </form>

            {/* Quick links under search bar */}
            <div className="pt-3 flex items-center justify-center gap-5 text-xs text-white/65">
              <button
                onClick={onExploreFleet}
                className="hover:text-white transition-colors inline-flex items-center gap-1 cursor-pointer"
              >
                <span className="underline underline-offset-4">Browse all inventory</span>
                <ArrowRight className="w-3 h-3" />
              </button>
              <span className="opacity-40">·</span>
              <button
                onClick={onExploreWorkshop}
                className="hover:text-white transition-colors underline underline-offset-4 cursor-pointer"
              >
                Custom Tokyo Auction Order
              </button>
            </div>
          </div>

        </div>

        {/* ── 3. BOTTOM TRUST PILLARS — matches Velocity reference ─────── */}
        <div className="w-full max-w-[1440px] mx-auto mt-10 sm:mt-12 pt-6 border-t border-white/15">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 text-left px-0 sm:px-4">

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-white/10 border border-white/15 flex items-center justify-center shrink-0 mt-0.5">
                <ShieldCheck className="w-4.5 h-4.5 text-emerald-400" />
              </div>
              <div>
                <h4 className="text-xs sm:text-[13px] font-bold text-white uppercase tracking-wider">Quality Assured</h4>
                <p className="text-[11px] sm:text-xs text-white/65 mt-0.5 leading-snug">
                  Every vehicle inspected for your peace of mind.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-white/10 border border-white/15 flex items-center justify-center shrink-0 mt-0.5">
                <Gauge className="w-4.5 h-4.5 text-[#DC2626]" />
              </div>
              <div>
                <h4 className="text-xs sm:text-[13px] font-bold text-white uppercase tracking-wider">Finance Made Easy</h4>
                <p className="text-[11px] sm:text-xs text-white/65 mt-0.5 leading-snug">
                  Flexible options tailored to your budget.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-white/10 border border-white/15 flex items-center justify-center shrink-0 mt-0.5">
                <Repeat className="w-4.5 h-4.5 text-amber-400" />
              </div>
              <div>
                <h4 className="text-xs sm:text-[13px] font-bold text-white uppercase tracking-wider">Trade-In Welcome</h4>
                <p className="text-[11px] sm:text-xs text-white/65 mt-0.5 leading-snug">
                  Get top value for your current vehicle.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-white/10 border border-white/15 flex items-center justify-center shrink-0 mt-0.5">
                <Headphones className="w-4.5 h-4.5 text-cyan-400" />
              </div>
              <div>
                <h4 className="text-xs sm:text-[13px] font-bold text-white uppercase tracking-wider">Aftersales Support</h4>
                <p className="text-[11px] sm:text-xs text-white/65 mt-0.5 leading-snug">
                  We're here long after you drive away.
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
