import React, { useState, useEffect, useRef } from 'react';
import { Search, X, ArrowRight, Gauge, Fuel, Shield } from 'lucide-react';
import { Vehicle } from '../data/vehicles';
import { SkeletonImage } from './SkeletonImage';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  vehicles: Vehicle[];
  onSelectVehicle: (vehicle: Vehicle) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  vehicles,
  onSelectVehicle,
}) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const quickFilters = [
    { label: 'Under 2M', filter: (v: Vehicle) => v.priceKes < 2000000 },
    { label: '2M – 3.5M', filter: (v: Vehicle) => v.priceKes >= 2000000 && v.priceKes <= 3500000 },
    { label: '3.5M+', filter: (v: Vehicle) => v.priceKes > 3500000 },
    { label: 'Hybrids', filter: (v: Vehicle) => v.category === 'hybrid' || v.fuelType.includes('Hybrid') || v.fuelType.includes('POWER') },
    { label: 'SUVs & 4WD', filter: (v: Vehicle) => v.category === 'suv' },
    { label: '7-Seaters', filter: (v: Vehicle) => v.category === 'van' || v.name.includes('Prado') },
  ];

  const results = vehicles.filter((v) => {
    if (!query.trim()) return true;
    const q = query.toLowerCase();
    return (
      v.name.toLowerCase().includes(q) ||
      v.stockNo.toLowerCase().includes(q) ||
      v.tagline.toLowerCase().includes(q) ||
      v.drivetrain.toLowerCase().includes(q) ||
      v.fuelType.toLowerCase().includes(q)
    );
  });

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-end sm:items-start justify-center p-0 sm:p-6 sm:pt-20 animate-apple-fade">
      <div className="bg-[#0f1011] w-full max-w-[640px] rounded-t-[12px] sm:rounded-[12px] overflow-hidden shadow-2xl border border-[#23252a] max-h-[88vh] sm:max-h-[80vh] flex flex-col animate-apple-up">
        
        {/* Mobile Pull Handle */}
        <div className="w-8 h-1 rounded-full bg-[#383b3f] mx-auto mt-2.5 mb-1 sm:hidden shrink-0" />

        {/* Search Input Bar */}
        <div className="p-4 border-b border-[#23252a] flex items-center gap-3">
          <Search className="w-4 h-4 text-[#8a8f98] shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search model, stock code, or powertrain (e.g. RAV4, ALB-4062, Hybrid)..."
            className="w-full text-[14px] text-[#ffffff] placeholder:text-[#62666d] focus:outline-none bg-transparent"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 font-mono text-[11px] text-[#8a8f98] hover:text-[#ffffff] cursor-pointer"
            >
              Clear
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1 rounded-[4px] text-[#8a8f98] hover:text-[#ffffff] hover:bg-[#161718] cursor-pointer transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Quick Filter Tags */}
        <div className="px-4 py-2 bg-[#161718] border-b border-[#23252a] flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          <span className="font-mono text-[10px] text-[#8a8f98] uppercase tracking-wider mr-1">Quick:</span>
          {quickFilters.map((qf, i) => (
            <button
              key={i}
              onClick={() => setQuery(qf.label.replace('+', ''))}
              className="font-mono text-[11px] bg-[#0f1011] border border-[#23252a] px-2 py-0.5 rounded-[4px] text-[#8a8f98] hover:text-[#ffffff] hover:border-[#383b3f] transition-colors whitespace-nowrap cursor-pointer"
            >
              {qf.label}
            </button>
          ))}
        </div>

        {/* Results List */}
        <div className="max-h-[380px] overflow-y-auto divide-y divide-[#23252a] p-2">
          {results.length > 0 ? (
            results.map((vehicle) => (
              <div
                key={vehicle.id}
                onClick={() => {
                  onSelectVehicle(vehicle);
                  onClose();
                }}
                className="p-2.5 rounded-[6px] hover:bg-[#161718] transition-colors cursor-pointer flex items-center justify-between gap-4 group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-[6px] overflow-hidden bg-[#161718] border border-[#23252a] shrink-0">
                    <SkeletonImage src={vehicle.heroImage} alt={vehicle.name} containerClassName="w-full h-full" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[10px] text-[#8a8f98] bg-[#08090a] px-1.5 py-0.5 rounded-[3px] border border-[#23252a]">
                        {vehicle.stockNo}
                      </span>
                      <span className="text-[13px] font-normal text-[#ffffff] group-hover:text-[#ffffff] transition-colors">
                        {vehicle.name}
                      </span>
                    </div>
                    <p className="font-mono text-[11px] text-[#8a8f98] truncate max-w-[280px] sm:max-w-[360px] mt-0.5">
                      {vehicle.year} · {vehicle.mileageKm.toLocaleString()} km · {vehicle.drivetrain.split('(')[0]}
                    </p>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <span className="font-mono text-[13px] text-[#e4f222] block">
                    KES {vehicle.priceKes.toLocaleString()}
                  </span>
                  <span className="text-[11px] text-[#8a8f98] group-hover:text-[#ffffff] font-normal flex items-center gap-0.5 justify-end transition-colors mt-0.5">
                    <span>View</span>
                    <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            ))
          ) : (
            <div className="p-8 text-center text-[#8a8f98] text-[13px]">
              No vehicles matched your search query "{query}".
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
