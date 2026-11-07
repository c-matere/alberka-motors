import React, { useState, useMemo } from 'react';
import { Search, Compass, ArrowRight } from 'lucide-react';
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
    { id: 'all', label: 'ALL MARQUES', count: vehicles.length },
    { id: 'van', label: 'EXECUTIVE SUITE & MPV', count: vehicles.filter(v => v.category === 'van').length },
    { id: 'hybrid', label: 'HYBRID VANGUARD', count: vehicles.filter(v => v.category === 'hybrid' || v.fuelType.includes('Hybrid') || v.fuelType.includes('e-POWER')).length },
    { id: 'suv', label: 'ALL-TERRAIN LUXURY', count: vehicles.filter(v => v.category === 'suv').length },
    { id: 'compact', label: 'COMPACT ATELIER', count: vehicles.filter(v => v.category === 'compact').length },
  ];

  const filteredVehicles = useMemo(() => {
    return vehicles
      .filter((v) => {
        if (activeCategory === 'all') return true;
        if (activeCategory === 'hybrid') {
          return v.category === 'hybrid' || v.fuelType.toLowerCase().includes('hybrid') || v.fuelType.toLowerCase().includes('power');
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

  return (
    <section className="w-full bg-[#160a1d] py-16 sm:py-24 px-6 text-[#f5f5f7] border-t border-[rgba(197,168,128,0.15)]">
      <div className="max-w-[1400px] mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-[800px] mx-auto mb-16">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="h-[1px] w-6 bg-[rgba(197,168,128,0.4)]" />
            <span className="rr-eyebrow">
              CLEARED & COMMISSIONED IN KENYA
            </span>
            <div className="h-[1px] w-6 bg-[rgba(197,168,128,0.4)]" />
          </div>
          <h2 className="rr-title-h1 text-[32px] sm:text-[46px] md:text-[54px] mb-4">
            THE ALBERKA FLEET.
          </h2>
          <p className="text-[#dfc7a5] font-['Cormorant_Garamond'] text-[18px] sm:text-[20px] italic leading-relaxed max-w-[680px] mx-auto">
            Every motor car has undergone rigorous mechanical preparation at our Mombasa atelier, carries authenticated Japanese auction provenance, and includes our 5,000 KM written warranty covenant.
          </p>
        </div>

        {/* Filter & Search Bar — Hard Zero-Radius Box with Rose-Gold Inlay */}
        <div className="bg-[#131316] p-4 sm:p-6 border border-[rgba(197,168,128,0.25)] mb-12 space-y-4">
          
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
            {categories.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-4 py-2 font-['Cinzel'] text-[11px] tracking-[0.18em] transition-all shrink-0 cursor-pointer ${
                    isActive
                      ? 'bg-[#c5a880] text-[#0f0714] font-medium'
                      : 'bg-[#0f0714] text-[#8c8a94] hover:text-[#f5f5f7] border border-[rgba(255,255,255,0.08)] hover:border-[rgba(197,168,128,0.4)]'
                  }`}
                >
                  {cat.label} <span className="font-mono text-[10px] opacity-75">({cat.count})</span>
                </button>
              );
            })}
          </div>

          {/* Search Input & Sort Selector */}
          <div className="flex flex-col sm:flex-row items-center gap-4 pt-4 border-t border-[rgba(255,255,255,0.06)]">
            <div className="relative w-full sm:flex-1">
              <Search className="w-4 h-4 text-[#8c8a94] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="SEARCH BY MODEL, CHASSIS CODE, OR ATELIER STOCK ID..."
                className="w-full pl-10 pr-4 py-2.5 bg-[#0f0714] border border-[rgba(197,168,128,0.2)] text-[12px] font-['Cinzel'] tracking-wider text-[#f5f5f7] placeholder:text-[#45434d] focus:outline-none focus:border-[#dfc7a5]"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[10px] font-mono text-[#8c8a94] hover:text-[#f5f5f7]"
                >
                  CLEAR
                </button>
              )}
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
              <span className="font-['Cinzel'] text-[10px] tracking-wider text-[#8c8a94] hidden sm:inline">SORT:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-3 py-2 bg-[#0f0714] border border-[rgba(197,168,128,0.2)] font-['Cinzel'] text-[11px] tracking-wider text-[#dfc7a5] focus:outline-none cursor-pointer"
              >
                <option value="featured">CURATED COLLECTION</option>
                <option value="price-asc">ACQUISITION: ASCENDING</option>
                <option value="price-desc">ACQUISITION: DESCENDING</option>
                <option value="year">NEWEST YEAR</option>
              </select>

              <span className="font-mono text-[11px] text-[#8c8a94] ml-2 shrink-0">
                {filteredVehicles.length} {filteredVehicles.length === 1 ? 'MARQUE' : 'MARQUES'}
              </span>
            </div>
          </div>

        </div>

        {/* Vehicles Grid */}
        {filteredVehicles.length > 0 ? (
          <div key={activeCategory + sortBy} className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
          <div className="p-16 text-center bg-[#131316] border border-[rgba(197,168,128,0.2)]">
            <h3 className="font-['Cinzel'] text-[18px] text-[#f5f5f7] tracking-widest mb-3 uppercase">NO MATCHING MARQUES IN CURRENT REPOSITORY</h3>
            <p className="text-[14px] text-[#8c8a94] mb-8 font-light max-w-[500px] mx-auto">
              We commission fresh maritime consignments weekly from Tokyo, Yokohama, and Nagoya.
            </p>
            <button
              onClick={() => {
                setActiveCategory('all');
                setSearchQuery('');
              }}
              className="btn-rr-ghost"
            >
              RESET CURATION
            </button>
          </div>
        )}

        {/* Bespoke Japanese Bidding & Custom Commission Atelier */}
        <div className="p-8 sm:p-12 mt-16 bg-[#131316] border border-[rgba(197,168,128,0.3)] text-left flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-[700px] space-y-3">
            <span className="rr-eyebrow">
              PRIVATE COMMISSIONING ATELIER
            </span>
            <h3 className="font-['Cinzel'] text-[22px] sm:text-[26px] text-[#f5f5f7] tracking-wide">
              Seeking a specific marquee, trim, or bespoke hue?
            </h3>
            <p className="text-[14px] text-[#8c8a94] leading-relaxed font-light">
              We execute weekly live bids directly at USS Tokyo, CAA, and TAA. Our Japanese team physically inspects your desired motor car prior to acquisition, ensuring Grade 4.5+ perfection.
            </p>
          </div>
          <button
            onClick={onCustomImportRequest}
            className="btn-rr-solid shrink-0 w-full md:w-auto text-center"
          >
            <span>COMMISSION BESPOKE IMPORT</span>
            <ArrowRight className="w-3.5 h-3.5 ml-2" />
          </button>
        </div>

      </div>
    </section>
  );
};
