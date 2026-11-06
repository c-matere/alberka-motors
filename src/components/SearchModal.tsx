import React, { useState, useEffect, useRef } from 'react';
import { Search, X, ArrowRight, Gauge, Fuel, Shield } from 'lucide-react';
import { Vehicle } from '../data/vehicles';

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
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-md flex items-start justify-center p-4 sm:p-6 pt-16 sm:pt-24 animate-in fade-in duration-200">
      <div className="bg-[#121215] w-full max-w-[680px] rounded-[24px] overflow-hidden shadow-2xl border border-[#27272a]">
        
        {/* Search Input Bar */}
        <div className="p-4 sm:p-5 border-b border-[#27272a] flex items-center gap-3">
          <Search className="w-5 h-5 text-zinc-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search model, stock code, or powertrain (e.g. RAV4, CRU-4062, Hybrid)..."
            className="w-full text-[16px] text-white placeholder:text-zinc-400 focus:outline-none bg-transparent"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-[11px] text-zinc-400 hover:text-white cursor-pointer"
            >
              Clear
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1 rounded-full text-zinc-400 hover:text-white hover:bg-[#121215] cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Filter Tags */}
        <div className="px-4 py-2.5 bg-[#0d0d10] border-b border-[#121215] flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          <span className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider mr-1">Quick:</span>
          {quickFilters.map((qf, i) => (
            <button
              key={i}
              onClick={() => setQuery(qf.label.replace('+', ''))}
              className="text-[11px] bg-[#121215] border border-[#27272a] px-2.5 py-1 rounded-full text-white hover:border-[#dc2626] transition-colors whitespace-nowrap cursor-pointer"
            >
              {qf.label}
            </button>
          ))}
        </div>

        {/* Results List */}
        <div className="max-h-[380px] overflow-y-auto divide-y divide-[#121215] p-2">
          {results.length > 0 ? (
            results.map((vehicle) => (
              <div
                key={vehicle.id}
                onClick={() => {
                  onSelectVehicle(vehicle);
                  onClose();
                }}
                className="p-3 rounded-[16px] hover:bg-[#121215] transition-colors cursor-pointer flex items-center justify-between gap-4 group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 rounded-[10px] overflow-hidden bg-[#27272a] shrink-0">
                    <img src={vehicle.heroImage} alt={vehicle.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-semibold text-zinc-400 bg-[#121215] px-1.5 py-0.5 rounded border border-[#27272a]">
                        {vehicle.stockNo}
                      </span>
                      <span className="text-[14px] font-semibold text-white group-hover:text-[#dc2626] transition-colors">
                        {vehicle.name}
                      </span>
                    </div>
                    <p className="text-[12px] text-zinc-400 truncate max-w-[280px] sm:max-w-[360px]">
                      {vehicle.year} · {vehicle.mileageKm.toLocaleString()} km · {vehicle.drivetrain.split('(')[0]}
                    </p>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <span className="text-[14px] font-semibold text-white block">
                    KES {vehicle.priceKes.toLocaleString()}
                  </span>
                  <span className="text-[11px] text-[#dc2626] font-medium flex items-center gap-0.5 justify-end">
                    <span>View</span>
                    <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            ))
          ) : (
            <div className="p-8 text-center text-zinc-400 text-[14px]">
              No vehicles matched your search query "{query}".
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
