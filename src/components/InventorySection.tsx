import React, { useState, useMemo } from 'react';
import {
  Search,
  X,
  ArrowRight,
  ArrowUpDown,
  Filter,
  RotateCcw,
  Check,
  ChevronDown,
  ShieldCheck,
  MapPin,
  Car
} from 'lucide-react';
import { Vehicle } from '../data/vehicles';
import { VehicleSbtListCard, VehicleSbtListCardSkeleton } from './VehicleSbtListCard';
import { CmsPage } from '../services/cmsContent';

interface InventorySectionProps {
  vehicles: Vehicle[];
  favorites: string[];
  onToggleFavorite: (id: string) => void;
  onSelectVehicle: (vehicle: Vehicle) => void;
  onInquire?: (vehicle: Vehicle) => void;
  onCustomImportRequest: () => void;
  isLoading?: boolean;
  pageData?: CmsPage;
}

export const InventorySection: React.FC<InventorySectionProps> = ({
  vehicles,
  favorites,
  onToggleFavorite,
  onSelectVehicle,
  onInquire,
  onCustomImportRequest,
  isLoading = false,
  pageData,
}) => {
  // SBT Japan-style faceted search state
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeMake, setActiveMake] = useState<string>('all');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [priceRange, setPriceRange] = useState<string>('all');
  const [transmissionFilter, setTransmissionFilter] = useState<string>('all');
  const [drivetrainFilter, setDrivetrainFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'year' | 'mileage'>('featured');
  const [mobileFilterOpen, setMobileFilterOpen] = useState<boolean>(false);

  // Dynamic Makes list from vehicles
  const makes = useMemo(() => {
    const counts: Record<string, number> = {};
    vehicles.forEach((v) => {
      const make = v.name.split(' ')[0] || 'Other';
      counts[make] = (counts[make] || 0) + 1;
    });
    return [
      { id: 'all', label: 'All Makes', count: vehicles.length },
      ...Object.entries(counts).map(([make, count]) => ({
        id: make.toLowerCase(),
        label: make,
        count,
      })),
    ];
  }, [vehicles]);

  // Curated categories
  const categories = useMemo(() => [
    { id: 'all', label: 'All Body Types', count: vehicles.length },
    { id: 'suv', label: 'SUVs & 4WD', count: vehicles.filter((v) => v.category === 'suv').length },
    { id: 'hybrid', label: 'Hybrids & e-POWER', count: vehicles.filter((v) => v.category === 'hybrid' || v.fuelType.toLowerCase().includes('hybrid') || v.fuelType.toLowerCase().includes('power')).length },
    { id: 'van', label: '7-Seaters & Vans', count: vehicles.filter((v) => v.category === 'van').length },
    { id: 'compact', label: 'Hatchbacks', count: vehicles.filter((v) => v.category === 'compact' || v.bodyType.toLowerCase().includes('hatchback')).length },
  ], [vehicles]);

  // Price ranges (KES)
  const priceRanges = [
    { id: 'all', label: 'All Price Ranges' },
    { id: 'under-2m', label: 'Under KES 2,000,000', min: 0, max: 2000000 },
    { id: '2m-3.5m', label: 'KES 2.0M – 3.5M', min: 2000000, max: 3500000 },
    { id: '3.5m-4.5m', label: 'KES 3.5M – 4.5M', min: 3500000, max: 4500000 },
    { id: 'above-4.5m', label: 'KES 4.5M+', min: 4500000, max: Infinity },
  ];

  // Active filter count
  const activeFilterCount = (
    (activeMake !== 'all' ? 1 : 0) +
    (activeCategory !== 'all' ? 1 : 0) +
    (priceRange !== 'all' ? 1 : 0) +
    (transmissionFilter !== 'all' ? 1 : 0) +
    (drivetrainFilter !== 'all' ? 1 : 0) +
    (searchQuery.trim() !== '' ? 1 : 0)
  );

  const resetAllFilters = () => {
    setActiveMake('all');
    setActiveCategory('all');
    setPriceRange('all');
    setTransmissionFilter('all');
    setDrivetrainFilter('all');
    setSearchQuery('');
    setSortBy('featured');
  };

  const filteredVehicles = useMemo(() => {
    return vehicles
      .filter((v) => {
        // Category
        if (activeCategory === 'all') return true;
        if (activeCategory === 'hybrid') {
          return v.category === 'hybrid' || v.fuelType.toLowerCase().includes('hybrid') || v.fuelType.toLowerCase().includes('power');
        }
        if (activeCategory === 'compact') {
          return v.category === 'compact' || v.bodyType.toLowerCase().includes('hatchback');
        }
        return v.category === activeCategory;
      })
      .filter((v) => {
        // Make
        if (activeMake === 'all') return true;
        return v.name.toLowerCase().startsWith(activeMake.toLowerCase());
      })
      .filter((v) => {
        // Price Range
        if (priceRange === 'all') return true;
        const range = priceRanges.find((r) => r.id === priceRange);
        if (!range || range.min === undefined) return true;
        return v.priceKes >= range.min && v.priceKes < range.max;
      })
      .filter((v) => {
        // Transmission
        if (transmissionFilter === 'all') return true;
        return v.transmission.toLowerCase().includes(transmissionFilter.toLowerCase());
      })
      .filter((v) => {
        // Drivetrain
        if (drivetrainFilter === 'all') return true;
        return v.drivetrain.toLowerCase().includes(drivetrainFilter.toLowerCase());
      })
      .filter((v) => {
        // Search query
        if (!searchQuery.trim()) return true;
        const q = searchQuery.toLowerCase();
        return (
          v.name.toLowerCase().includes(q) ||
          v.stockNo.toLowerCase().includes(q) ||
          (v.sbtStockId && v.sbtStockId.toLowerCase().includes(q)) ||
          v.tagline.toLowerCase().includes(q) ||
          v.bodyType.toLowerCase().includes(q) ||
          v.engine.toLowerCase().includes(q) ||
          v.chassisNo.toLowerCase().includes(q)
        );
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.priceKes - b.priceKes;
        if (sortBy === 'price-desc') return b.priceKes - a.priceKes;
        if (sortBy === 'year') return b.year - a.year;
        if (sortBy === 'mileage') return a.mileageKm - b.mileageKm;
        return 0;
      });
  }, [vehicles, activeCategory, activeMake, priceRange, transmissionFilter, drivetrainFilter, searchQuery, sortBy]);

  return (
    <section className="w-full bg-[#f8f9fa] text-zinc-900 relative min-h-screen">
      
      {/* 1. Header Banner */}
      <div className="pt-12 sm:pt-16 pb-6 px-4 sm:px-8 max-w-[1520px] mx-auto text-left space-y-2 border-b border-zinc-200/80">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <span className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-red-600 font-bold block mb-1">
              {pageData?.badge || 'VERIFIED INVENTORY · SBT JAPAN DIRECT SOURCED'}
            </span>
            <h1 className="text-2xl sm:text-4xl md:text-5xl font-black text-zinc-950 tracking-tight leading-tight">
              {pageData?.heroTitle || 'Used Cars in Stock'}
            </h1>
            <p className="text-xs sm:text-sm text-zinc-600 mt-1 max-w-2xl font-normal leading-relaxed">
              {pageData?.heroSubtitle || 'Browse direct Japanese export units in Mombasa. All vehicles inspected, cleared through KRA customs duty, and ready for immediate delivery.'}
            </p>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono font-bold bg-white border border-zinc-200 text-zinc-800 shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>{vehicles.length} Units Available in Mombasa</span>
            </span>
          </div>
        </div>
      </div>

      {/* 2. SBT Japan 2-Column Search Layout: Left Filter Column + Right Vehicle List */}
      <div className="max-w-[1520px] mx-auto px-4 sm:px-8 py-8 sm:py-10">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          
          {/* MOBILE FILTER TOGGLE BAR (Visible on mobile screens) */}
          <div className="w-full lg:hidden flex items-center justify-between gap-3 bg-white p-3.5 rounded-xl border border-zinc-200 shadow-xs">
            <button
              onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
              className="flex-1 py-2 px-3 bg-zinc-950 text-white rounded-lg text-xs font-bold flex items-center justify-center gap-2 cursor-pointer shadow-xs"
            >
              <Filter className="w-3.5 h-3.5 text-red-400" />
              <span>{mobileFilterOpen ? 'Hide Filters' : 'Filter Inventory'}</span>
              {activeFilterCount > 0 && (
                <span className="bg-red-600 text-white text-[10px] font-mono px-1.5 py-0.2 rounded-full">
                  {activeFilterCount}
                </span>
              )}
            </button>

            {activeFilterCount > 0 && (
              <button
                onClick={resetAllFilters}
                className="py-2 px-3 bg-zinc-100 hover:bg-zinc-200 text-zinc-700 rounded-lg text-xs font-semibold flex items-center gap-1 cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset</span>
              </button>
            )}
          </div>

          {/* LEFT COLUMN: SBT JAPAN SEARCH & FILTER SIDEBAR */}
          <aside
            className={`w-full lg:w-72 xl:w-80 shrink-0 space-y-5 text-left ${
              mobileFilterOpen ? 'block' : 'hidden lg:block'
            }`}
          >
            <div className="bg-white border border-zinc-200/90 rounded-2xl p-5 shadow-xs space-y-6 lg:sticky lg:top-24">
              
              {/* Sidebar Header */}
              <div className="flex items-center justify-between pb-3 border-b border-zinc-200">
                <div className="flex items-center gap-2">
                  <Filter className="w-4 h-4 text-red-600" />
                  <h3 className="font-mono text-xs font-bold text-zinc-950 uppercase tracking-wider">
                    Filter Fleet
                  </h3>
                </div>
                {activeFilterCount > 0 && (
                  <button
                    onClick={resetAllFilters}
                    className="text-[11px] font-mono text-red-600 hover:text-red-700 font-semibold cursor-pointer inline-flex items-center gap-1"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>Reset All ({activeFilterCount})</span>
                  </button>
                )}
              </div>

              {/* 1. Keyword Search Box */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-mono uppercase tracking-wider text-zinc-600 font-bold block">
                  Search Vehicle
                </label>
                <div className="relative bg-zinc-50 border border-zinc-200 focus-within:border-red-600 focus-within:bg-white rounded-xl px-3 py-2 flex items-center gap-2 transition-all">
                  <Search className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                  <input
                    type="text"
                    placeholder="Make, model, stock ID..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-transparent text-xs font-medium text-zinc-900 placeholder:text-zinc-400 focus:outline-none"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="p-0.5 text-zinc-600 hover:text-zinc-950 cursor-pointer"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  )}
                </div>
              </div>

              {/* 2. Make / Brand Filter with Maker Logos (B/W by default, color on hover) */}
              <div className="space-y-2">
                <label className="text-[11px] font-mono uppercase tracking-wider text-zinc-600 font-bold block">
                  Make / Manufacturer
                </label>
                <div className="space-y-1 max-h-56 overflow-y-auto pr-1 no-scrollbar">
                  {makes.map((m) => {
                    const isSelected = activeMake === m.id;
                    const logoSrc = m.id !== 'all' ? `/logos/${m.id}.png` : null;
                    return (
                      <button
                        key={m.id}
                        onClick={() => setActiveMake(m.id)}
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs transition-all cursor-pointer text-left group ${
                          isSelected
                            ? 'bg-red-50 text-red-700 font-bold border border-red-200 shadow-2xs'
                            : 'hover:bg-zinc-50 text-zinc-700 font-medium border border-transparent'
                        }`}
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          {logoSrc ? (
                            <img
                              src={logoSrc}
                              alt={m.label}
                              className={`w-5 h-5 object-contain transition-all duration-300 shrink-0 ${
                                isSelected
                                  ? 'grayscale-0 scale-110'
                                  : 'grayscale opacity-75 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-110'
                              }`}
                              onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }}
                            />
                          ) : (
                            <Car className={`w-4 h-4 shrink-0 ${isSelected ? 'text-red-600' : 'text-zinc-400 group-hover:text-zinc-700'}`} />
                          )}
                          <span className="capitalize truncate">{m.label}</span>
                        </div>
                        <span className={`font-mono text-[11px] ${isSelected ? 'text-red-700 font-bold' : 'text-zinc-500'}`}>
                          {m.count}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 3. Category / Body Type Filter */}
              <div className="space-y-2 pt-2 border-t border-zinc-100">
                <label className="text-[11px] font-mono uppercase tracking-wider text-zinc-600 font-bold block">
                  Body Type & Purpose
                </label>
                <div className="space-y-1">
                  {categories.map((c) => {
                    const isSelected = activeCategory === c.id;
                    return (
                      <button
                        key={c.id}
                        onClick={() => setActiveCategory(c.id)}
                        className={`w-full flex items-center justify-between px-3 py-1.5 rounded-lg text-xs transition-colors cursor-pointer text-left ${
                          isSelected
                            ? 'bg-red-50 text-red-700 font-bold border border-red-200'
                            : 'hover:bg-zinc-50 text-zinc-700 font-medium'
                        }`}
                      >
                        <span>{c.label}</span>
                        <span className={`font-mono text-[11px] ${isSelected ? 'text-red-700 font-bold' : 'text-zinc-500'}`}>
                          {c.count}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 4. Price Range Filter */}
              <div className="space-y-2 pt-2 border-t border-zinc-100">
                <label className="text-[11px] font-mono uppercase tracking-wider text-zinc-600 font-bold block">
                  Delivered Cash Price (KES)
                </label>
                <div className="space-y-1">
                  {priceRanges.map((pr) => {
                    const isSelected = priceRange === pr.id;
                    return (
                      <button
                        key={pr.id}
                        onClick={() => setPriceRange(pr.id)}
                        className={`w-full flex items-center justify-between px-3 py-1.5 rounded-lg text-xs transition-colors cursor-pointer text-left ${
                          isSelected
                            ? 'bg-red-50 text-red-700 font-bold border border-red-200'
                            : 'hover:bg-zinc-50 text-zinc-700 font-medium'
                        }`}
                      >
                        <span>{pr.label}</span>
                        {isSelected && <Check className="w-3.5 h-3.5 text-red-600" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 5. Drivetrain & Transmission */}
              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-zinc-100">
                <div className="space-y-1">
                  <label className="text-[10px] font-mono uppercase tracking-wider text-zinc-600 font-bold block">
                    Drive
                  </label>
                  <select
                    value={drivetrainFilter}
                    onChange={(e) => setDrivetrainFilter(e.target.value)}
                    className="w-full bg-zinc-50 border border-zinc-200 rounded-lg text-xs font-mono py-1.5 px-2 text-zinc-800 focus:outline-none focus:border-red-600 cursor-pointer"
                  >
                    <option value="all">All Drive</option>
                    <option value="2wd">2WD</option>
                    <option value="4wd">4WD / AWD</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-mono uppercase tracking-wider text-zinc-600 font-bold block">
                    Transmission
                  </label>
                  <select
                    value={transmissionFilter}
                    onChange={(e) => setTransmissionFilter(e.target.value)}
                    className="w-full bg-zinc-50 border border-zinc-200 rounded-lg text-xs font-mono py-1.5 px-2 text-zinc-800 focus:outline-none focus:border-red-600 cursor-pointer"
                  >
                    <option value="all">All Trans</option>
                    <option value="auto">Automatic</option>
                    <option value="cvt">CVT</option>
                    <option value="manual">Manual</option>
                  </select>
                </div>
              </div>

              {/* Showroom Yard Informational Note (Sole Office) */}
              <div className="pt-3 border-t border-zinc-200/80 space-y-1 text-xs">
                <div className="flex items-center gap-1.5 text-zinc-950 font-bold">
                  <MapPin className="w-3.5 h-3.5 text-red-600 shrink-0" />
                  <span>Mombasa Showroom (Sole Office)</span>
                </div>
                <p className="text-[11px] text-zinc-500 leading-normal">
                  Next to Ganjoni Primary School, Archbishop Makarios Rd, Mombasa. Inspect units on mechanical lift.
                </p>
              </div>

            </div>
          </aside>

          {/* RIGHT COLUMN: SEARCH RESULTS & SBT LIST VIEW ONLY (NO GRID) */}
          <main className="flex-1 min-w-0 w-full space-y-5 text-left">
            
            {/* SBT Quick Maker Logo Selection Rail (B/W by default, Color on Hover & Active) */}
            <div className="bg-white border border-zinc-200/90 rounded-2xl p-4 shadow-2xs">
              <div className="flex items-center justify-between mb-3 px-0.5">
                <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-500 font-bold flex items-center gap-1.5">
                  <Car className="w-3.5 h-3.5 text-zinc-400" />
                  Popular Japanese & Global Makers
                </span>
                {activeMake !== 'all' && (
                  <button
                    onClick={() => setActiveMake('all')}
                    className="text-[11px] font-mono text-red-600 hover:text-red-700 font-semibold cursor-pointer hover:underline"
                  >
                    Clear Filter
                  </button>
                )}
              </div>
              <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-7 gap-2">
                {[
                  { id: 'all', label: 'All Fleet', logo: null },
                  { id: 'toyota', label: 'Toyota', logo: '/logos/toyota.png' },
                  { id: 'nissan', label: 'Nissan', logo: '/logos/nissan.png' },
                  { id: 'subaru', label: 'Subaru', logo: '/logos/subaru.png' },
                  { id: 'suzuki', label: 'Suzuki', logo: '/logos/suzuki.png' },
                  { id: 'volvo', label: 'Volvo', logo: '/logos/volvo.png' },
                  { id: 'mazda', label: 'Mazda', logo: '/logos/mazda.png' },
                ].map((m) => {
                  const isSelected = activeMake === m.id;
                  const count = m.id === 'all'
                    ? vehicles.length
                    : vehicles.filter((v) => v.name.toLowerCase().includes(m.id)).length;
                  return (
                    <button
                      key={m.id}
                      onClick={() => setActiveMake(isSelected && m.id !== 'all' ? 'all' : m.id)}
                      className={`group flex flex-col items-center justify-center p-2.5 rounded-xl border transition-all text-center cursor-pointer ${
                        isSelected
                          ? 'bg-red-50/80 border-red-300 text-red-700 shadow-2xs ring-2 ring-red-500/20'
                          : 'bg-zinc-50/70 hover:bg-white border-zinc-200/70 hover:border-zinc-300 text-zinc-700 hover:shadow-2xs'
                      }`}
                    >
                      <div className="h-7 w-full flex items-center justify-center mb-1.5">
                        {m.logo ? (
                          <img
                            src={m.logo}
                            alt={m.label}
                            className={`h-6 max-w-[44px] object-contain transition-all duration-300 ${
                              isSelected
                                ? 'grayscale-0 scale-105'
                                : 'grayscale opacity-75 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-110'
                            }`}
                            onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }}
                          />
                        ) : (
                          <Car className={`w-5 h-5 transition-transform duration-300 group-hover:scale-110 ${isSelected ? 'text-red-600' : 'text-zinc-500 group-hover:text-zinc-800'}`} />
                        )}
                      </div>
                      <span className="text-[11px] font-bold truncate max-w-full leading-tight">
                        {m.label}
                      </span>
                      <span className={`text-[10px] font-mono mt-0.5 ${isSelected ? 'text-red-600 font-bold' : 'text-zinc-400'}`}>
                        {count} {count === 1 ? 'unit' : 'units'}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
            
            {/* Results Header Utility Bar */}
            <div className="bg-white border border-zinc-200/90 rounded-2xl px-4 py-3 sm:px-6 sm:py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs">
              
              {/* Left: Active Results Count */}
              <div className="flex items-center gap-2 text-xs font-mono text-zinc-700">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span className="font-bold text-zinc-950">
                  {filteredVehicles.length}
                </span>
                <span className="text-zinc-500">
                  of {vehicles.length} verified vehicles found
                </span>
                {activeFilterCount > 0 && (
                  <span className="hidden md:inline-block bg-red-50 text-red-700 font-semibold text-[11px] px-2 py-0.5 rounded border border-red-200/70">
                    Filtered
                  </span>
                )}
              </div>

              {/* Right: Sort By Dropdown (SBT Japan Sort Standard) */}
              <div className="flex items-center gap-2 self-end sm:self-auto">
                <span className="text-xs font-mono text-zinc-500 uppercase font-semibold hidden xs:inline">
                  Sort by:
                </span>
                <div className="flex items-center gap-1.5 bg-zinc-50 border border-zinc-200 rounded-lg px-2.5 py-1.5">
                  <ArrowUpDown className="w-3.5 h-3.5 text-zinc-500" />
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    aria-label="Sort vehicles"
                    className="bg-transparent text-xs font-mono font-medium text-zinc-800 focus:outline-none cursor-pointer pr-1"
                  >
                    <option value="featured" className="bg-white text-zinc-900">Featured Provenance</option>
                    <option value="price-asc" className="bg-white text-zinc-900">Price: Low to High</option>
                    <option value="price-desc" className="bg-white text-zinc-900">Price: High to Low</option>
                    <option value="year" className="bg-white text-zinc-900">Newest Year</option>
                    <option value="mileage" className="bg-white text-zinc-900">Lowest Mileage</option>
                  </select>
                </div>
              </div>

            </div>

            {/* SBT LIST VIEW ONLY (NO GRID) */}
            {isLoading ? (
              <div className="space-y-4 sm:space-y-5">
                {[...Array(4)].map((_, i) => (
                  <VehicleSbtListCardSkeleton key={i} />
                ))}
              </div>
            ) : filteredVehicles.length > 0 ? (
              <div className="space-y-4 sm:space-y-5">
                {filteredVehicles.map((vehicle) => (
                  <VehicleSbtListCard
                    key={vehicle.id}
                    vehicle={vehicle}
                    isFavorite={favorites.includes(vehicle.id)}
                    onToggleFavorite={onToggleFavorite}
                    onSelect={onSelectVehicle}
                    onInquire={onInquire}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-white border border-zinc-200 rounded-2xl p-8 space-y-4 max-w-xl mx-auto shadow-sm">
                <div className="w-12 h-12 rounded-full bg-red-50 border border-red-200 flex items-center justify-center mx-auto text-red-600">
                  <Search className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-zinc-950 tracking-tight">
                  No vehicles match your active criteria
                </h3>
                <p className="text-xs sm:text-sm text-zinc-600 max-w-sm mx-auto leading-relaxed">
                  We replenish our Mombasa showroom weekly with direct Japanese auction shipments. Let our Tokyo desk source your preferred car on order.
                </p>
                <div className="pt-2 flex items-center justify-center gap-3">
                  <button
                    onClick={resetAllFilters}
                    className="btn-ghost !text-xs !py-2 !px-4 cursor-pointer"
                  >
                    Reset All Filters
                  </button>
                  <button
                    onClick={onCustomImportRequest}
                    className="bg-red-600 hover:bg-red-700 text-white font-bold text-xs py-2 px-4 rounded-lg cursor-pointer shadow-sm transition-all"
                  >
                    Order from Japan
                  </button>
                </div>
              </div>
            )}

            {/* Custom Auction Order Banner at the bottom of the list */}
            <div className="relative bg-white border border-zinc-200/90 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-[0_4px_24px_rgba(0,0,0,0.03)] text-left mt-10">
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[10.5px] text-red-600 uppercase tracking-[0.2em] font-bold">
                    CANNOT FIND YOUR EXACT TRIM?
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-zinc-950 tracking-tight">
                  Import Any Vehicle on Custom Order from Tokyo
                </h3>
                <p className="text-xs sm:text-sm text-zinc-600 max-w-xl leading-relaxed">
                  Our Japanese agents bid on your behalf at USS Tokyo and CAA Chubu. We manage container shipping, KRA customs clearance, and port handover directly at our Mombasa yard.
                </p>
              </div>

              <a
                href="https://wa.me/254180423075?text=Hello%20Alberka%20Enterprises,%20I%20am%20looking%20to%20order%20a%20specific%20vehicle%20from%20Japanese%20auctions.%20Please%20guide%20me%20on%20the%20process."
                target="_blank"
                rel="noopener noreferrer"
                className="btn-crimson py-3 px-6 text-xs sm:text-sm font-bold shrink-0 inline-flex items-center gap-2 w-full md:w-auto justify-center shadow-md hover:shadow-lg transition-all"
              >
                <span>Consult Our Tokyo Bidding Desk</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>

          </main>

        </div>
      </div>

    </section>
  );
};
