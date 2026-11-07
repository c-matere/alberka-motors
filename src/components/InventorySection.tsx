import React, { useState, useMemo } from 'react';
import { Search, Filter, ArrowUpDown, Shield, SlidersHorizontal, Sparkles } from 'lucide-react';
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

  const categories = [
    { id: 'all', label: 'All Fleet', count: vehicles.length },
    { id: 'suv', label: 'SUVs & 4WD', count: vehicles.filter(v => v.category === 'suv').length },
    { id: 'hybrid', label: 'Hybrids & e-POWER', count: vehicles.filter(v => v.category === 'hybrid' || v.fuelType.includes('Hybrid') || v.fuelType.includes('e-POWER')).length },
    { id: 'van', label: 'Executive MPVs', count: vehicles.filter(v => v.category === 'van').length },
    { id: 'compact', label: 'Compact & Crossovers', count: vehicles.filter(v => v.category === 'compact').length },
  ];

  const filteredVehicles = useMemo(() => {
    return vehicles
      .filter((v) => {
        // Category filter
        if (activeCategory === 'all') return true;
        if (activeCategory === 'hybrid') {
          return v.category === 'hybrid' || v.fuelType.toLowerCase().includes('hybrid') || v.fuelType.toLowerCase().includes('power');
        }
        return v.category === activeCategory;
      })
      .filter((v) => {
        // Search query
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
        return 0; // featured order
      });
  }, [vehicles, activeCategory, searchQuery, sortBy]);

  return (
    <section className="w-full bg-[#08090a] py-10 sm:py-16 px-4 sm:px-6 text-[#d0d6e0] border-t border-[#23252a]">
      <div className="max-w-[1200px] mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-[640px] mx-auto mb-8 sm:mb-12">
          <span className="launch-status-label mb-2">
            Cleared & Ready For Handover
          </span>
          <h2 className="hero-display text-[32px] sm:text-[44px] md:text-[52px] mb-3">
            The Alberka Fleet.
          </h2>
          <p className="text-[14px] sm:text-[15px] text-[#8a8f98] leading-relaxed">
            Every vehicle has completed our comprehensive Mombasa workshop overhaul, includes written warranty coverage, and carries authenticated Grade 4.5+ Japanese auction provenance.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="bg-[#0f1011] p-3.5 sm:p-4 rounded-[12px] border border-[#23252a] mb-8 sm:mb-10 space-y-3.5">
          
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
            {categories.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-3 sm:px-3.5 py-1.5 rounded-[6px] text-[12px] sm:text-[13px] font-normal transition-all shrink-0 cursor-pointer ${
                    isActive
                      ? 'bg-[#ffffff] text-[#08090a] font-medium'
                      : 'bg-transparent text-[#8a8f98] hover:text-[#ffffff] border border-[#23252a] hover:border-[#383b3f]'
                  }`}
                >
                  {cat.label} <span className="font-mono text-[11px] opacity-75">({cat.count})</span>
                </button>
              );
            })}
          </div>

          {/* Search Input & Sort Selector */}
          <div className="flex flex-col sm:flex-row items-center gap-3 pt-3 border-t border-[#23252a]">
            <div className="relative w-full sm:flex-1">
              <Search className="w-4 h-4 text-[#8a8f98] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by model, chassis, or stock code..."
                className="w-full pl-10 pr-4 py-2 rounded-[6px] bg-[#161718] border border-[#23252a] text-[13px] text-[#ffffff] placeholder:text-[#62666d] focus:outline-none focus:border-[#383b3f]"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[11px] font-mono text-[#8a8f98] hover:text-[#ffffff]"
                >
                  Clear
                </button>
              )}
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end">
              <span className="text-[12px] text-[#8a8f98] hidden sm:inline">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-3 py-1.5 sm:py-2 rounded-[6px] bg-[#161718] border border-[#23252a] text-[12px] text-[#d0d6e0] focus:outline-none cursor-pointer"
              >
                <option value="featured">Featured Collection</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="year">Newest Year</option>
              </select>

              <span className="font-mono text-[12px] text-[#8a8f98] ml-2 shrink-0">
                {filteredVehicles.length} {filteredVehicles.length === 1 ? 'unit' : 'units'}
              </span>
            </div>
          </div>

        </div>

        {/* Vehicles Grid */}
        {filteredVehicles.length > 0 ? (
          <div key={activeCategory + sortBy} className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-apple-fade">
            {filteredVehicles.map((vehicle) => (
              <VehicleCard
                key={vehicle.id}
                vehicle={vehicle}
                isFavorite={favorites.includes(vehicle.id)}
                onToggleFavorite={onToggleFavorite}
                onSelect={onSelectVehicle}
              />
            ))}
          </div>
        ) : (
          <div className="p-12 text-center bg-[#0f1011] border border-[#23252a] rounded-[12px]">
            <h3 className="text-[18px] font-medium text-[#ffffff] mb-2">No matching vehicles found</h3>
            <p className="text-[14px] text-[#8a8f98] mb-6">
              We update our showroom with fresh vessel arrivals weekly from Tokyo, Yokohama, and Nagoya.
            </p>
            <button
              onClick={() => {
                setActiveCategory('all');
                setSearchQuery('');
              }}
              className="btn-ghost cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Custom Bidding Sourcing Callout */}
        <div className="p-6 sm:p-10 mt-12 bg-[#0f1011] border border-[#23252a] rounded-[12px] text-left flex flex-col sm:flex-row items-center justify-between gap-6 hover:border-[#383b3f] transition-all">
          <div className="max-w-[560px]">
            <span className="launch-status-label mb-1">Direct Japanese Bidding</span>
            <h3 className="text-[20px] font-medium text-[#ffffff] mb-2">Looking for a specific model or color?</h3>
            <p className="text-[14px] text-[#8a8f98] leading-relaxed">
              We execute weekly live bids directly at USS Tokyo, CAA, and TAA. Our Japanese team physically inspects your desired vehicle before purchase.
            </p>
          </div>
          <button
            onClick={onCustomImportRequest}
            className="btn-primary shrink-0 cursor-pointer"
          >
            <span>Commission Custom Import</span>
          </button>
        </div>

      </div>
    </section>
  );
};
