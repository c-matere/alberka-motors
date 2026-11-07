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
    { label: 'UNDER 2.5M' },
    { label: '2.5M – 4.0M' },
    { label: '4.0M+' },
    { label: 'HYBRIDS' },
    { label: 'SUVs & 4WD' },
    { label: '7-SEATERS' },
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
    <div className="fixed inset-0 z-50 bg-[#080809]/90 backdrop-blur-xl flex items-end sm:items-start justify-center p-0 sm:p-6 sm:pt-20">
      <div className="bg-[#131316] w-full max-w-[680px] overflow-hidden border border-[rgba(197,168,128,0.35)] max-h-[88vh] sm:max-h-[80vh] flex flex-col">
        
        {/* Search Input Bar */}
        <div className="p-5 border-b border-[rgba(197,168,128,0.2)] flex items-center gap-3">
          <Search className="w-4 h-4 text-[#c5a880] shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="SEARCH BY MARQUE, ATELIER CODE, OR POWERTRAIN..."
            className="w-full text-[13px] font-['Cinzel'] tracking-wider text-[#f5f5f7] placeholder:text-[#45434d] focus:outline-none bg-transparent"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 font-mono text-[10px] text-[#8c8a94] hover:text-[#f5f5f7] cursor-pointer"
            >
              CLEAR
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1 text-[#8c8a94] hover:text-[#f5f5f7] cursor-pointer transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Filter Tags */}
        <div className="px-5 py-2.5 bg-[#0f0714] border-b border-[rgba(197,168,128,0.15)] flex items-center gap-2 overflow-x-auto no-scrollbar">
          <span className="font-['Cinzel'] text-[9.5px] text-[#c5a880] uppercase tracking-wider mr-1">CURATED:</span>
          {quickFilters.map((qf, i) => (
            <button
              key={i}
              onClick={() => setQuery(qf.label.replace('+', '').toLowerCase())}
              className="font-['Cinzel'] text-[10px] bg-[#160a1d] border border-[rgba(197,168,128,0.2)] px-2.5 py-1 text-[#8c8a94] hover:text-[#dfc7a5] hover:border-[#dfc7a5] transition-colors whitespace-nowrap cursor-pointer"
            >
              {qf.label}
            </button>
          ))}
        </div>

        {/* Results List */}
        <div className="overflow-y-auto divide-y divide-[rgba(197,168,128,0.1)] p-2">
          {results.length > 0 ? (
            results.map((v) => (
              <div
                key={v.id}
                onClick={() => {
                  onSelectVehicle(v);
                  onClose();
                }}
                className="p-3.5 hover:bg-[#160a1d] flex items-center justify-between gap-4 cursor-pointer transition-colors group"
              >
                <div className="flex items-center gap-4 min-w-0">
                  <div className="w-16 h-12 bg-[#080809] border border-[rgba(197,168,128,0.2)] overflow-hidden shrink-0">
                    <SkeletonImage
                      src={v.heroImage}
                      alt={v.name}
                      containerClassName="w-full h-full"
                    />
                  </div>
                  <div className="min-w-0">
                    <span className="font-['Cinzel'] text-[9px] text-[#c5a880] tracking-widest block uppercase">{v.moniker}</span>
                    <h4 className="font-['Cinzel'] text-[13px] text-[#f5f5f7] truncate group-hover:text-[#dfc7a5] transition-colors uppercase tracking-wider">{v.name}</h4>
                    <span className="font-mono text-[11px] text-[#8c8a94]">{v.year} // {v.mileageKm.toLocaleString()} KM // Grade {v.auctionGrade}</span>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <span className="font-mono text-[13px] text-[#f5f5f7] block">KES {v.priceKes.toLocaleString()}</span>
                  <span className="font-['Cinzel'] text-[9px] text-[#8c8a94] uppercase tracking-wider">{v.status.split('—')[0]}</span>
                </div>
              </div>
            ))
          ) : (
            <div className="p-12 text-center text-[#8c8a94] font-['Cinzel'] tracking-wider text-[12px]">
              NO MATCHING MARQUES FOUND
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
