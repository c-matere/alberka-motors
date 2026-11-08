import React, { useState, useMemo } from 'react';
import { Search, X, ArrowRight, ArrowUpDown, Sparkles } from 'lucide-react';
import { Vehicle } from '../data/vehicles';
import { VehicleCard } from './VehicleCard';

interface InventorySectionProps {
  vehicles: Vehicle[];
  favorites: string[];
  onToggleFavorite: (id: string) => void;
  onSelectVehicle: (vehicle: Vehicle) => void;
  onCustomImportRequest: () => void;
}

export const InventorySection: React.FC<InventorySectionProps> = ({
  vehicles,
  favorites,
  onToggleFavorite,
  onSelectVehicle,
  onCustomImportRequest,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'year'>('featured');

  // Curated categories
  const categories = [
    { id: 'all', label: 'All Fleet', count: vehicles.length },
    { id: 'suv', label: 'SUVs & 4WD', count: vehicles.filter(v => v.category === 'suv').length },
    { id: 'hybrid', label: 'Hybrids', count: vehicles.filter(v => v.category === 'hybrid' || v.fuelType.includes('Hybrid') || v.fuelType.includes('e-POWER')).length },
    { id: 'van', label: '7-Seaters', count: vehicles.filter(v => v.category === 'van').length },
    { id: 'compact', label: 'Hatchbacks', count: vehicles.filter(v => v.category === 'compact' || v.bodyType.toLowerCase().includes('hatchback')).length },
  ];

  const filteredVehicles = useMemo(() => {
    return vehicles
      .filter((v) => {
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
        if (!searchQuery.trim()) return true;
        const q = searchQuery.toLowerCase();
        return (
          v.name.toLowerCase().includes(q) ||
          v.stockNo.toLowerCase().includes(q) ||
          v.tagline.toLowerCase().includes(q) ||
          v.bodyType.toLowerCase().includes(q) ||
          v.engine.toLowerCase().includes(q)
        );
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.priceKes - b.priceKes;
        if (sortBy === 'price-desc') return b.priceKes - a.priceKes;
        if (sortBy === 'year') return b.year - a.year;
        return 0;
      });
  }, [vehicles, activeCategory, searchQuery, sortBy]);

  const quickTags = [
    { label: 'RAV4 AWD', query: 'RAV4' },
    { label: 'Harrier Hybrid', query: 'Harrier' },
    { label: 'Serena 7-Seater', query: 'Serena' },
    { label: 'Note e-POWER', query: 'Note' },
  ];

  return (
    <section className="w-full bg-[#09090b] text-[#f4f4f5] border-t border-white/[0.08] relative">
      
      {/* 1. Section Editorial Title Bar (Scrolls naturally) */}
      <div className="pt-12 sm:pt-16 pb-6 px-4 sm:px-8 max-w-[1240px] mx-auto text-center space-y-3">
        <div className="inline-flex items-center gap-2">
          <div className="live-beacon">
            <span className="live-beacon-ping" />
            <span className="live-beacon-dot" />
          </div>
          <span className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-zinc-400">
            VERIFIED INVENTORY · MOMBASA & NAIROBI
          </span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-bold text-white tracking-[-0.035em] leading-[1.05]">
          Vehicles in Stock
        </h1>
        <p className="text-xs sm:text-sm text-zinc-400 max-w-lg mx-auto leading-relaxed">
          Japan auction Grade 4.5+ units, 100-point workshop serviced, covered by our 5,000 km written warranty.
        </p>
      </div>

      {/* 2. STICKY SEARCH & FILTER COMMAND CENTER (Pins right below top navbar) */}
      <div className="sticky top-16 sm:top-[68px] z-30 bg-[#09090b]/95 backdrop-blur-2xl border-y border-white/[0.08] py-3 sm:py-4 px-4 sm:px-8 shadow-[0_16px_36px_rgba(0,0,0,0.7)] transition-all">
        <div className="max-w-[1240px] mx-auto space-y-3">
          
          {/* Row 1: Search Capsule & Integrated Sort Dropdown */}
          <div className="relative bg-[#0c0c0f] border border-white/[0.12] hover:border-white/25 focus-within:border-white/40 focus-within:shadow-[0_0_24px_rgba(255,255,255,0.08)] rounded-xl sm:rounded-2xl p-1.5 sm:p-2 flex items-center justify-between gap-2.5 transition-all duration-300">
            <div className="flex items-center gap-2.5 flex-1 min-w-0 pl-2">
              <Search className="w-4 h-4 text-zinc-400 shrink-0" />
              <input
                type="text"
                placeholder="Search by model, auction grade, or stock number..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent text-[16px] sm:text-sm font-medium text-white placeholder:text-zinc-500 focus:outline-none"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="p-1 text-zinc-400 hover:text-white transition-colors cursor-pointer shrink-0"
                  title="Clear search"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-1.5 pl-2.5 border-l border-white/10 shrink-0 pr-1">
              <ArrowUpDown className="w-3.5 h-3.5 text-zinc-400 hidden sm:inline" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                aria-label="Sort vehicles"
                className="bg-transparent text-xs font-mono text-zinc-300 focus:outline-none cursor-pointer pr-1 py-1"
              >
                <option value="featured" className="bg-[#121215] text-white">Featured</option>
                <option value="price-asc" className="bg-[#121215] text-white">Price: Low to High</option>
                <option value="price-desc" className="bg-[#121215] text-white">Price: High to Low</option>
                <option value="year" className="bg-[#121215] text-white">Newest Year</option>
              </select>
            </div>
          </div>

          {/* Row 2: Car Type Categories (Separated on its own dedicated rail - Zero Overlap Guaranteed) */}
          <div className="w-full overflow-x-auto no-scrollbar -webkit-overflow-scrolling-touch py-0.5">
            <div className="flex items-center gap-1.5 min-w-max">
              <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider mr-1 hidden sm:inline">
                Type:
              </span>
              {categories.map((cat) => {
                const isActive = activeCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => {
                      setActiveCategory(cat.id);
                      setSearchQuery('');
                    }}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium pill-interactive shrink-0 cursor-pointer flex items-center gap-1.5 ${
                      isActive
                        ? 'bg-white text-zinc-950 font-bold shadow-md scale-[1.02]'
                        : 'bg-[#0c0c0f] text-zinc-400 hover:text-white hover:bg-zinc-900 border border-white/[0.08]'
                    }`}
                  >
                    <span>{cat.label}</span>
                    <span className={`font-mono text-[10px] ${isActive ? 'text-zinc-700 font-bold' : 'text-zinc-500'}`}>
                      {cat.count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Row 3: Specific Model Suggestions (Dedicated independent row - Never collides with categories) */}
          <div className="w-full overflow-x-auto no-scrollbar -webkit-overflow-scrolling-touch pt-0.5">
            <div className="flex items-center gap-1.5 min-w-max">
              <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider mr-1">
                Models:
              </span>
              {quickTags.map((tag) => {
                const isSelected = searchQuery.toLowerCase() === tag.query.toLowerCase();
                return (
                  <button
                    key={tag.query}
                    onClick={() => setSearchQuery(isSelected ? '' : tag.query)}
                    className={`text-[11px] font-mono px-2.5 py-1 rounded-md pill-interactive cursor-pointer border ${
                      isSelected
                        ? 'bg-white text-zinc-950 font-bold border-white shadow-sm scale-[1.02]'
                        : 'bg-black text-zinc-400 border-white/10 hover:border-white/25 hover:text-white'
                    }`}
                  >
                    {tag.label}
                  </button>
                );
              })}
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="text-[10.5px] font-mono text-zinc-400 hover:text-white underline cursor-pointer ml-2"
                >
                  Clear search
                </button>
              )}
            </div>
          </div>

        </div>
      </div>

      {/* 3. Inventory Runway & Vehicle Grid */}
      <div className="max-w-[1240px] mx-auto px-4 sm:px-8 py-8 sm:py-12 space-y-8">
        
        {/* Results Counter Bar */}
        <div className="flex items-center justify-between text-xs text-zinc-400 font-mono px-1">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span>Showing {filteredVehicles.length} of {vehicles.length} verified vehicles in stock</span>
          </div>
          <span className="hidden sm:inline text-zinc-500 text-[11px]">Tangana Rd, Mombasa & Westlands, Nairobi</span>
        </div>

        {/* 2-Column Responsive Runway Grid */}
        {filteredVehicles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10">
            {filteredVehicles.map((vehicle, idx) => (
              <VehicleCard
                key={vehicle.id}
                vehicle={vehicle}
                isFavorite={favorites.includes(vehicle.id)}
                onToggleFavorite={onToggleFavorite}
                onSelect={onSelectVehicle}
                staggerIndex={idx}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-[#0c0c0f] border border-white/[0.08] rounded-2xl p-8 space-y-4 max-w-xl mx-auto">
            <div className="w-10 h-10 rounded-full border border-white/15 flex items-center justify-center mx-auto text-zinc-400">
              <Search className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-bold text-white tracking-tight">No vehicles match your criteria</h3>
            <p className="text-xs sm:text-sm text-zinc-400 max-w-sm mx-auto leading-relaxed">
              We replenish our showroom weekly with fresh Japanese auction shipments. Let our Tokyo desk source your preferred model on order.
            </p>
            <div className="pt-2 flex items-center justify-center gap-3">
              <button
                onClick={() => {
                  setSearchQuery('');
                  setActiveCategory('all');
                }}
                className="btn-ghost !text-xs !py-2 !px-4 cursor-pointer"
              >
                Reset Filters
              </button>
              <button
                onClick={onCustomImportRequest}
                className="btn-white !text-xs !py-2 !px-4 cursor-pointer"
              >
                Order from Japan
              </button>
            </div>
          </div>
        )}

        {/* Custom Order Callout */}
        <div className="relative bg-[#0c0c0f] border border-white/[0.08] rounded-2xl p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl text-left before:absolute before:inset-x-8 before:top-0 before:h-[1px] before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent mt-12">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-red-600" />
              <span className="font-mono text-[10.5px] text-zinc-400 uppercase tracking-[0.2em] font-semibold">
                CUSTOM AUCTION ORDER
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Import Any Vehicle Directly from Japan
            </h3>
            <p className="text-xs sm:text-sm text-zinc-400 max-w-xl leading-relaxed">
              Our Japanese agents bid on your behalf at USS Tokyo and CAA Chubu. We handle container shipping, KRA customs clearance, and port handover in Mombasa or Nairobi.
            </p>
          </div>

          <a
            href="https://wa.me/254714333888?text=Hello%20Alberka%20Motors,%20I%20am%20looking%20to%20import%20a%20specific%20vehicle%20on%20order%20from%20Japan.%20Please%20guide%20me%20on%20the%20process."
            target="_blank"
            rel="noopener noreferrer"
            className="btn-white py-3 px-6 text-xs sm:text-sm font-semibold shrink-0 inline-flex items-center gap-2 w-full md:w-auto justify-center shadow-md"
          >
            <span>Consult an Import Specialist</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

      </div>

    </section>
  );
};
