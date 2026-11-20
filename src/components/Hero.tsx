import React, { useEffect, useRef, useState } from 'react';
import {
  Search,
  ArrowRight,
  ShieldCheck,
  FileCheck2,
  Gauge,
  Headphones,
  ChevronDown,
  Check
} from 'lucide-react';
import { CmsPage } from '../services/cmsContent';

// Single source of truth for the hero backdrop. Drop a replacement image into
// /public/vehicles/ and change this one line to swap the showroom scene.
const HERO_BACKGROUND = '/vehicles/hero-new.jpg';

type DropdownOption = { value: string; label: string };

const BODY_TYPE_OPTIONS: DropdownOption[] = [
  { value: '', label: 'Any Body Type' },
  { value: 'suv', label: 'SUV & Crossover' },
  { value: 'awd', label: 'Symmetrical AWD' },
  { value: 'van', label: '7–8 Seater Van' },
  { value: 'hybrid', label: 'Hybrid & Fuel Saver' },
];

const BUDGET_OPTIONS: DropdownOption[] = [
  { value: '', label: 'Any Price Tier' },
  { value: '2500000', label: 'Under KES 2.5M' },
  { value: '3500000', label: 'Under KES 3.5M' },
  { value: '4500000', label: 'Under KES 4.5M' },
  { value: 'luxury', label: 'KES 4.5M+ (Executive)' },
];

/** Shared Airbnb-style popover panel. */
const DropdownPanel: React.FC<{
  label: string;
  value: string;
  options: DropdownOption[];
  onSelect: (value: string) => void;
  className?: string;
}> = ({ label, value, options, onSelect, className = '' }) => (
  <div className={`absolute top-[calc(100%+0.7rem)] left-0 z-[100] w-[min(300px,calc(100vw-2rem))] rounded-[22px] bg-white border border-[#ebebeb] p-2 shadow-[0_18px_50px_rgba(0,0,0,0.24)] ${className}`}>
    <p className="px-3 pt-1 pb-2 text-[10px] font-bold uppercase tracking-[0.16em] text-[#6a6a6a]">
      {label}
    </p>
    <div className="max-h-[280px] overflow-y-auto">
      {options.map((option) => {
        const selected = value === option.value;
        return (
          <button
            key={option.value}
            type="button"
            onClick={() => onSelect(option.value)}
            className={`w-full flex items-center justify-between gap-2 px-3 py-2.5 rounded-[14px] text-left text-sm transition-colors cursor-pointer ${
              selected
                ? 'bg-[#f7f7f7] font-semibold text-[#222222]'
                : 'font-medium text-[#222222] hover:bg-[#f7f7f7]'
            }`}
          >
            <span className="truncate">{option.label}</span>
            {selected && <Check className="w-4 h-4 shrink-0 text-[#222222]" strokeWidth={2.5} />}
          </button>
        );
      })}
    </div>
  </div>
);

/** Airbnb-style search field: inline value + expanding popover with checkable rows. */
const SearchDropdown: React.FC<{
  label: string;
  value: string;
  placeholder: string;
  options: DropdownOption[];
  isOpen: boolean;
  onToggle: () => void;
  onSelect: (value: string) => void;
  showDivider?: boolean;
  extraClassName?: string;
}> = ({ label, value, placeholder, options, isOpen, onToggle, onSelect, showDivider = true, extraClassName = '' }) => (
  <div className={`relative flex-1 px-4 sm:px-6 py-3 text-left ${showDivider ? 'border-r border-[#ebebeb]' : ''} ${extraClassName}`}>
    <button type="button" onClick={onToggle} className="w-full text-left cursor-pointer min-h-[44px]">
      <span className="text-[9.5px] sm:text-[10.5px] font-bold text-[#222222] uppercase tracking-wider block">
        {label}
      </span>
      <span className="mt-0.5 flex items-center justify-between gap-2">
        <span className={`text-sm font-medium truncate ${value ? 'text-[#222222]' : 'text-[#717171]'}`}>
          {value || placeholder}
        </span>
        <ChevronDown
          className={`w-3.5 h-3.5 shrink-0 text-[#6a6a6a] transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        />
      </span>
    </button>

    {isOpen && <DropdownPanel label={label} value={value} options={options} onSelect={onSelect} />}
  </div>
);

export interface HeroSearchFilters {
  make: string;
  bodyType: string;
  budget: string;
}

export interface HeroProps {
  onExploreFleet: () => void;
  onExploreWorkshop: () => void;
  onSearchQuery?: (filters: HeroSearchFilters) => void;
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
  const [openDropdown, setOpenDropdown] = useState<'type' | 'budget' | null>(null);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!openDropdown) return;
    const handlePointerDown = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpenDropdown(null);
    };
    document.addEventListener('mousedown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [openDropdown]);

  const handleExecuteSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const filters: HeroSearchFilters = {
      make: searchMake.trim(),
      bodyType: selectedType,
      budget: selectedBudget,
    };
    if (onSearchQuery) {
      onSearchQuery(filters);
    } else {
      onExploreFleet();
    }
  };

  return (
    <section
      data-no-reveal="true"
      className="relative w-full bg-[#0a0a0c] text-white select-none"
      style={{ minHeight: 'calc(100dvh - 5rem)' }}
    >
      {/* ── 1. FULL-BLEED SHOWROOM BACKGROUND ─────────────────────────── */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* Primary showroom photo — brightened so the scene reads clearly */}
        <img
          src={HERO_BACKGROUND}
          alt="Alberka Enterprises Luxury Showroom"
          className="w-full h-full object-cover scale-[1.08]"
          style={{
            objectPosition: 'center 35%',
            filter: 'brightness(1.06) contrast(1.03) saturate(1.02) blur(4px)',
          }}
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
      <div className="relative z-40 flex flex-col items-center justify-center text-center px-4 sm:px-8 pt-28 sm:pt-32 pb-8 sm:pb-10 min-h-[inherit]"
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
          <div ref={searchRef} className="w-full max-w-3xl mx-auto pt-1">
            <form
              onSubmit={handleExecuteSearch}
              className="bg-white/96 backdrop-blur-xl rounded-full shadow-[0_20px_60px_rgba(0,0,0,0.55)] border border-white/30 p-1.5 sm:p-2 text-[#222222] flex items-center transition-all hover:shadow-[0_28px_70px_rgba(0,0,0,0.65)]"
            >
              {/* Make / Model */}
              <div className="flex-1 px-4 sm:px-6 py-3 border-r-0 sm:border-r border-[#ebebeb] text-left min-w-0">
                <label htmlFor="hero-make" className="text-[9.5px] sm:text-[10.5px] font-bold text-[#222222] uppercase tracking-wider block">
                  Make / Model
                </label>
                <input
                  id="hero-make"
                  type="text"
                  value={searchMake}
                  onChange={(e) => setSearchMake(e.target.value)}
                  placeholder="Toyota, Subaru, Volvo..."
                  className="w-full text-sm font-medium text-[#222222] placeholder:text-[#aaa] bg-transparent outline-none truncate mt-0.5 min-h-[26px] select-text"
                  enterKeyHint="search"
                />
              </div>

              {/* Body Type — Airbnb-style popover */}
              <SearchDropdown
                label="Body Type"
                value={selectedType}
                placeholder="Any Body Type"
                options={BODY_TYPE_OPTIONS}
                isOpen={openDropdown === 'type'}
                onToggle={() => setOpenDropdown(openDropdown === 'type' ? null : 'type')}
                onSelect={(value) => {
                  setSelectedType(value);
                  setOpenDropdown(null);
                }}
                extraClassName="hidden sm:block"
              />

              {/* Budget — Airbnb-style popover */}
              <SearchDropdown
                label="Budget"
                value={selectedBudget}
                placeholder="Any Price Tier"
                options={BUDGET_OPTIONS}
                isOpen={openDropdown === 'budget'}
                onToggle={() => setOpenDropdown(openDropdown === 'budget' ? null : 'budget')}
                onSelect={(value) => {
                  setSelectedBudget(value);
                  setOpenDropdown(null);
                }}
                showDivider={false}
                extraClassName="hidden md:block"
              />

              {/* Search CTA */}
              <button
                type="submit"
                className="ml-1 px-6 sm:px-7 py-3.5 rounded-full bg-[#DC2626] hover:bg-[#B91C1C] text-white flex items-center gap-2 shrink-0 font-bold shadow-lg transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer text-sm min-h-[48px]"
                title="Search Inventory"
              >
                <Search className="w-4 h-4 stroke-[2.5]" />
                <span className="hidden sm:inline">Search</span>
              </button>
            </form>

            {/* Mobile-only filter chips — same popovers, real touch targets */}
            <div className="sm:hidden mt-3 flex items-center justify-center gap-2 flex-wrap">
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setOpenDropdown(openDropdown === 'type' ? null : 'type')}
                  aria-expanded={openDropdown === 'type'}
                  className="h-11 px-4 rounded-full bg-white/15 backdrop-blur-md border border-white/25 text-white text-xs font-semibold flex items-center gap-2 cursor-pointer"
                >
                  <span className="max-w-[96px] truncate">
                    {BODY_TYPE_OPTIONS.find((o) => o.value === selectedType)?.label || 'Body Type'}
                  </span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform ${openDropdown === 'type' ? 'rotate-180' : ''}`} />
                </button>
                {openDropdown === 'type' && (
                  <DropdownPanel
                    label="Body Type"
                    value={selectedType}
                    options={BODY_TYPE_OPTIONS}
                    onSelect={(value) => { setSelectedType(value); setOpenDropdown(null); }}
                    className="left-1/2 -translate-x-1/2"
                  />
                )}
              </div>

              <div className="relative">
                <button
                  type="button"
                  onClick={() => setOpenDropdown(openDropdown === 'budget' ? null : 'budget')}
                  aria-expanded={openDropdown === 'budget'}
                  className="h-11 px-4 rounded-full bg-white/15 backdrop-blur-md border border-white/25 text-white text-xs font-semibold flex items-center gap-2 cursor-pointer"
                >
                  <span className="max-w-[96px] truncate">
                    {BUDGET_OPTIONS.find((o) => o.value === selectedBudget)?.label || 'Budget'}
                  </span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform ${openDropdown === 'budget' ? 'rotate-180' : ''}`} />
                </button>
                {openDropdown === 'budget' && (
                  <DropdownPanel
                    label="Budget"
                    value={selectedBudget}
                    options={BUDGET_OPTIONS}
                    onSelect={(value) => { setSelectedBudget(value); setOpenDropdown(null); }}
                    className="left-1/2 -translate-x-1/2"
                  />
                )}
              </div>
            </div>

            {/* Quick links under search bar */}
            <div className="pt-3 flex items-center justify-center flex-wrap gap-x-5 gap-y-2 text-xs text-white/65">
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
                <FileCheck2 className="w-4.5 h-4.5 text-amber-400" />
              </div>
              <div>
                <h4 className="text-xs sm:text-[13px] font-bold text-white uppercase tracking-wider">Auction Sheet Verified</h4>
                <p className="text-[11px] sm:text-xs text-white/65 mt-0.5 leading-snug">
                  Original Japanese inspection records with every car.
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
