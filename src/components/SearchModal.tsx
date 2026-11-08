import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Search, X, ArrowRight, CornerDownLeft } from 'lucide-react';
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
  const [activeFilterId, setActiveFilterId] = useState<string>('all');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setSelectedIndex(0);
    } else {
      setQuery('');
      setActiveFilterId('all');
      setSelectedIndex(0);
    }
  }, [isOpen]);

  const quickFilters = [
    { id: 'all', label: 'All Fleet' },
    { id: 'under-4m', label: 'Under 4.0M' },
    { id: 'over-4m', label: '4.0M+' },
    { id: 'hybrid', label: 'Hybrid & e-POWER' },
    { id: 'suv-awd', label: 'SUV & AWD' },
    { id: 'seven-seater', label: '7-Seaters' },
  ];

  const results = vehicles.filter((v) => {
    // 1. Check quick filter
    if (activeFilterId === 'under-4m' && v.priceKes >= 4000000) return false;
    if (activeFilterId === 'over-4m' && v.priceKes < 4000000) return false;
    if (activeFilterId === 'hybrid' && !v.fuelType.toLowerCase().includes('hybrid') && !v.fuelType.toLowerCase().includes('power')) return false;
    if (activeFilterId === 'suv-awd' && !v.bodyType.toLowerCase().includes('suv') && !v.drivetrain.includes('AWD') && !v.drivetrain.includes('4WD')) return false;
    if (activeFilterId === 'seven-seater' && !v.bodyType.toLowerCase().includes('7') && v.category !== 'van' && !v.name.toLowerCase().includes('serena')) return false;

    // 2. Check query string
    if (!query.trim()) return true;
    const q = query.toLowerCase().trim();
    return (
      v.name.toLowerCase().includes(q) ||
      v.stockNo.toLowerCase().includes(q) ||
      v.tagline.toLowerCase().includes(q) ||
      v.drivetrain.toLowerCase().includes(q) ||
      v.fuelType.toLowerCase().includes(q) ||
      v.bodyType.toLowerCase().includes(q) ||
      v.auctionHall.toLowerCase().includes(q) ||
      v.year.toString().includes(q)
    );
  });

  // Keep selected index within bounds
  useEffect(() => {
    setSelectedIndex(0);
  }, [query, activeFilterId]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (results.length > 0 ? (prev + 1) % results.length : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (results.length > 0 ? (prev - 1 + results.length) % results.length : 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (results[selectedIndex]) {
        onSelectVehicle(results[selectedIndex]);
        onClose();
      }
    } else if (e.key === 'Escape') {
      e.preventDefault();
      onClose();
    }
  };

  if (!isOpen) return null;

  return createPortal(
    <div 
      className="fixed inset-0 z-[9999] bg-[#09090b]/90 backdrop-blur-md flex items-end sm:items-start justify-center p-0 sm:p-6 sm:pt-20 animate-fadeIn"
      onClick={onClose}
    >
      <div 
        className="bg-[#101014] w-full max-w-[680px] overflow-hidden border-t sm:border border-white/[0.1] rounded-t-2xl sm:rounded-2xl max-h-[90vh] sm:max-h-[80vh] flex flex-col text-[#f4f4f5] shadow-[0_24px_60px_rgba(0,0,0,0.9)] animate-scaleIn"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={handleKeyDown}
      >
        
        {/* Search Input Bar */}
        <div className="p-4 sm:p-5 border-b border-white/[0.08] flex items-center gap-3">
          <Search className="w-5 h-5 text-zinc-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by model, grade, fuel, or stock number..."
            className="w-full text-[16px] sm:text-[15px] font-medium text-white placeholder:text-zinc-500 focus:outline-none bg-transparent"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-xs font-mono text-zinc-400 hover:text-white cursor-pointer px-2 py-1"
            >
              Clear
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1 text-zinc-400 hover:text-white cursor-pointer transition-colors"
            title="Close (Esc)"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Filter Tags (Working & Active) */}
        <div className="px-5 py-2.5 bg-black/40 border-b border-white/[0.08] flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          <span className="text-[10px] font-mono text-zinc-500 uppercase mr-1">Quick:</span>
          {quickFilters.map((qf) => {
            const isActive = activeFilterId === qf.id;
            return (
              <button
                key={qf.id}
                onClick={() => setActiveFilterId(qf.id)}
                className={`text-xs px-3 py-1 rounded-full transition-all whitespace-nowrap cursor-pointer border ${
                  isActive
                    ? 'bg-white text-zinc-950 font-bold border-white shadow-sm'
                    : 'bg-zinc-900/80 text-zinc-400 border-white/[0.08] hover:text-white hover:border-white/20'
                }`}
              >
                {qf.label}
              </button>
            );
          })}
        </div>

        {/* Results List */}
        <div ref={listRef} className="overflow-y-auto divide-y divide-white/[0.06] p-2 flex-1">
          {results.length > 0 ? (
            results.map((vehicle, idx) => {
              const isSelected = idx === selectedIndex;
              return (
                <div
                  key={vehicle.id}
                  onClick={() => {
                    onSelectVehicle(vehicle);
                    onClose();
                  }}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`p-3.5 transition-all flex items-center justify-between gap-4 cursor-pointer rounded-xl ${
                    isSelected ? 'bg-white/[0.08] border border-white/20' : 'hover:bg-white/[0.04] border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div className="w-20 h-14 overflow-hidden rounded-lg bg-black border border-white/10 shrink-0">
                      <SkeletonImage src={vehicle.heroImage} alt={vehicle.name} containerClassName="w-full h-full" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[10.5px] text-zinc-300 font-bold">
                          {vehicle.stockNo}
                        </span>
                        <span className="text-[10px] font-mono bg-white/[0.06] border border-white/10 px-1.5 py-0.2 rounded text-zinc-300">
                          Grade {vehicle.auctionGrade}
                        </span>
                      </div>
                      <h4 className="text-[14.5px] font-bold text-white transition-colors truncate mt-0.5">
                        {vehicle.name}
                      </h4>
                      <p className="text-xs text-zinc-400">
                        {vehicle.year} · {vehicle.mileageKm.toLocaleString()} KM · {vehicle.engine}
                      </p>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="font-mono text-sm font-bold text-white block">
                      KES {vehicle.priceKes.toLocaleString()}
                    </span>
                    <span className="text-[11px] text-zinc-400 flex items-center justify-end gap-1 mt-0.5 transition-colors">
                      <span>View</span>
                      <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="py-16 text-center text-zinc-500 space-y-2">
              <Search className="w-8 h-8 text-zinc-700 mx-auto" />
              <p className="text-[15px] font-bold text-white">No cars match your search.</p>
              <p className="text-xs text-zinc-400">Try searching for RAV4, Harrier, Serena, Hybrid, or 4WD.</p>
            </div>
          )}
        </div>

        {/* Footer Info with Keyboard Navigation Hints */}
        <div className="p-3 pb-[calc(0.75rem+env(safe-area-inset-bottom,0px))] sm:pb-3 bg-black/50 border-t border-white/[0.08] flex items-center justify-between text-[11px] text-zinc-400 font-mono px-5">
          <span>{results.length} vehicles found</span>
          <div className="flex items-center gap-3">
            <span className="hidden sm:inline-flex items-center gap-1">
              <span className="px-1.5 py-0.5 bg-zinc-800 rounded border border-zinc-700 text-[10px] text-zinc-300">↑↓</span> to navigate
            </span>
            <span className="hidden sm:inline-flex items-center gap-1">
              <span className="px-1.5 py-0.5 bg-zinc-800 rounded border border-zinc-700 text-[10px] text-zinc-300">↵</span> to select
            </span>
            <span>ESC to close</span>
          </div>
        </div>

      </div>
    </div>,
    document.body
  );
};
