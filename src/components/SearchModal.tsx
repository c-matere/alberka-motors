import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
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
    { label: 'Under 2.5M' },
    { label: '2.5M – 4.0M' },
    { label: '4.0M+' },
    { label: 'Hybrids' },
    { label: 'SUVs & 4WD' },
    { label: '7-Seaters' },
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

  return createPortal(
    <div 
      className="fixed inset-0 z-[9999] bg-[#09090b]/90 backdrop-blur-md flex items-end sm:items-start justify-center p-0 sm:p-6 sm:pt-20 animate-fadeIn"
      onClick={onClose}
    >
      <div 
        className="bg-[#121215] w-full max-w-[680px] overflow-hidden border border-[#27272a] rounded-[4px] max-h-[88vh] sm:max-h-[80vh] flex flex-col text-[#f4f4f5] shadow-2xl animate-scaleIn"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Search Input Bar */}
        <div className="p-4 sm:p-5 border-b border-[#27272a] flex items-center gap-3">
          <Search className="w-5 h-5 text-zinc-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by model, stock number, or fuel type..."
            className="w-full text-[16px] sm:text-[15px] font-medium text-white placeholder:text-[#71717a] focus:outline-none bg-transparent"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-[11px] font-mono text-[#a1a1aa] hover:text-white cursor-pointer px-2 py-1"
            >
              Clear
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1 text-[#a1a1aa] hover:text-white cursor-pointer transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Filter Tags */}
        <div className="px-5 py-2.5 bg-[#18181c] border-b border-[#27272a] flex items-center gap-2 overflow-x-auto no-scrollbar">
          <span className="text-[11px] font-mono text-[#71717a] uppercase mr-1">Quick:</span>
          {quickFilters.map((qf, i) => (
            <button
              key={i}
              onClick={() => setQuery(qf.label.replace('+', '').toLowerCase())}
              className="text-[12px] bg-[#121215] border border-[#27272a] px-3 py-1 rounded-[2px] text-[#a1a1aa] hover:text-white hover:border-white transition-colors whitespace-nowrap cursor-pointer"
            >
              {qf.label}
            </button>
          ))}
        </div>

        {/* Results List */}
        <div className="overflow-y-auto divide-y divide-[#27272a] p-2">
          {results.length > 0 ? (
            results.map((vehicle) => (
              <div
                key={vehicle.id}
                onClick={() => {
                  onSelectVehicle(vehicle);
                  onClose();
                }}
                className="p-3.5 hover:bg-[#18181c] transition-colors flex items-center justify-between gap-4 cursor-pointer group rounded-[2px]"
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className="w-20 h-14 overflow-hidden rounded-[2px] bg-[#09090b] border border-[#27272a] shrink-0">
                    <SkeletonImage src={vehicle.heroImage} alt={vehicle.name} containerClassName="w-full h-full" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[10.5px] text-zinc-300 font-bold">
                        {vehicle.stockNo}
                      </span>
                      <span className="text-[10px] font-mono bg-[#18181c] border border-[#27272a] px-1.5 py-0.2 rounded-[2px] text-[#a1a1aa]">
                        Grade {vehicle.auctionGrade}
                      </span>
                    </div>
                    <h4 className="text-[14.5px] font-bold text-white group-hover:text-zinc-200 transition-colors truncate mt-0.5">
                      {vehicle.name}
                    </h4>
                    <p className="text-[12px] text-[#a1a1aa]">
                      {vehicle.year} · {vehicle.mileageKm.toLocaleString()} KM · {vehicle.engine}
                    </p>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <span className="font-mono text-[14px] font-bold text-white block">
                    KES {vehicle.priceKes.toLocaleString()}
                  </span>
                  <span className="text-[11px] text-[#a1a1aa] flex items-center justify-end gap-1 mt-0.5 group-hover:text-white transition-colors">
                    <span>View Car</span>
                    <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            ))
          ) : (
            <div className="py-16 text-center text-[#71717a] space-y-2">
              <Search className="w-8 h-8 text-[#27272a] mx-auto" />
              <p className="text-[15px] font-bold text-white">No cars match your search.</p>
              <p className="text-[13px] text-[#a1a1aa]">Try searching for Toyota, Prado, Harrier, or Hybrid.</p>
            </div>
          )}
        </div>

        {/* Footer Info */}
        <div className="p-3 bg-[#18181c] border-t border-[#27272a] flex items-center justify-between text-[11px] text-[#71717a] font-mono px-5">
          <span>{results.length} vehicles found</span>
          <span>Press ESC to close</span>
        </div>

      </div>
    </div>,
    document.body
  );
};
