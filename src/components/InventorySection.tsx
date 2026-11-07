import React, { useState, useMemo } from 'react';
import { Search, Compass, ArrowRight, SlidersHorizontal } from 'lucide-react';
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

  // Simple, direct categories
  const categories = [
    { id: 'all', label: 'All Cars', count: vehicles.length },
    { id: 'suv', label: 'SUVs & 4WD', count: vehicles.filter(v => v.category === 'suv').length },
    { id: 'hybrid', label: 'Hybrids', count: vehicles.filter(v => v.category === 'hybrid' || v.fuelType.includes('Hybrid') || v.fuelType.includes('e-POWER')).length },
    { id: 'van', label: '7-Seaters & Vans', count: vehicles.filter(v => v.category === 'van').length },
    { id: 'compact', label: 'Hatchbacks', count: vehicles.filter(v => v.category === 'compact').length },
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
    <section className="w-full bg-[#09090b] py-16 sm:py-24 px-6 sm:px-10 text-[#f4f4f5] border-t border-[#27272a]">
      <div className="max-w-[1440px] mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-[760px] mx-auto mb-14">
          <span className="brand-eyebrow block mb-2">
            DUTY-PAID & READY FOR DELIVERY
          </span>
          <h1 className="text-[32px] sm:text-[46px] font-bold text-white tracking-tight mb-4">
            Cars in Stock
          </h1>
          <p className="text-[16px] sm:text-[18px] text-[#a1a1aa] leading-relaxed">
            Every vehicle has passed genuine Japanese auction verification, full servicing at our Mombasa workshop, and includes a 5,000 km written warranty.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="bg-[#121215] p-5 sm:p-6 border border-[#27272a] rounded-[4px] mb-12 space-y-4">
          
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
            {categories.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-4 py-2 rounded-[3px] text-[13px] font-medium transition-all shrink-0 cursor-pointer ${
                    isActive
                      ? 'bg-[#dc2626] text-white shadow-sm'
                      : 'bg-[#18181c] text-[#a1a1aa] hover:text-white border border-[#27272a] hover:border-[#71717a]'
                  }`}
                >
                  {cat.label} <span className="text-[11px] font-mono opacity-80">({cat.count})</span>
                </button>
              );
            })}
          </div>

          {/* Search Input & Sort Selector */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-[#71717a] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search by model (e.g. Prado, Serena, Harrier, Note)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-[#09090b] border border-[#27272a] rounded-[3px] text-[14px] text-white placeholder:text-[#71717a] focus:outline-none focus:border-[#dc2626] transition-colors"
              />
            </div>

            <div className="flex items-center gap-3">
              <span className="text-[12px] text-[#71717a] font-mono uppercase whitespace-nowrap hidden md:inline">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                aria-label="Sort vehicles"
                className="bg-[#09090b] border border-[#27272a] rounded-[3px] px-3 py-2.5 text-[13px] text-[#e4e4e7] focus:outline-none focus:border-[#dc2626] cursor-pointer"
              >
                <option value="featured">Featured First</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="year">Newest Model Year</option>
              </select>
            </div>
          </div>
        </div>

        {/* Vehicle Grid */}
        {filteredVehicles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
          <div className="text-center py-20 bg-[#121215] border border-[#27272a] rounded-[4px] p-8 space-y-4">
            <h3 className="text-[20px] font-bold text-white">No matching cars found</h3>
            <p className="text-[14.5px] text-[#a1a1aa] max-w-[480px] mx-auto">
              We update our inventory weekly with fresh Japanese shipments. Tell us what car you are looking for and we will find it at auction in Japan.
            </p>
            <button
              onClick={onCustomImportRequest}
              className="btn-crimson !py-2.5 !px-5 mt-2 cursor-pointer"
            >
              <span>Request Custom Import on Order</span>
            </button>
          </div>
        )}

        {/* Custom Import Banner */}
        <div className="mt-16 p-8 sm:p-10 bg-[#121215] border border-[#27272a] rounded-[4px] flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-left">
            <span className="font-mono text-[11px] text-[#ef4444] uppercase tracking-wider font-semibold">
              LOOKING FOR A SPECIFIC CAR?
            </span>
            <h3 className="text-[22px] sm:text-[26px] font-bold text-white">
              Import Any Car Directly from Japan
            </h3>
            <p className="text-[14.5px] text-[#a1a1aa] max-w-[640px]">
              We bid on your behalf at USS Tokyo, handle shipping, KRA customs clearance, and deliver to your doorstep in Mombasa or Nairobi.
            </p>
          </div>

          <a
            href="https://wa.me/254714333888?text=Hello%20Alberka%20Motors,%20I%20am%20looking%20to%20import%20a%20specific%20vehicle%20on%20order%20from%20Japan.%20Please%20guide%20me%20on%20the%20process."
            target="_blank"
            rel="noopener noreferrer"
            className="btn-crimson shrink-0 text-center"
          >
            <span>Talk to an Import Specialist</span>
            <ArrowRight className="w-4 h-4 ml-1.5" />
          </a>
        </div>

      </div>
    </section>
  );
};
