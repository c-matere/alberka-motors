import React from 'react';
import { createPortal } from 'react-dom';
import { X, Bookmark, ArrowRight, Trash2, MessageCircle } from 'lucide-react';
import { Vehicle } from '../data/vehicles';
import { SkeletonImage } from './SkeletonImage';

interface FavoritesModalProps {
  isOpen: boolean;
  onClose: () => void;
  favorites: string[];
  vehicles: Vehicle[];
  onToggleFavorite: (id: string) => void;
  onSelectVehicle: (vehicle: Vehicle) => void;
}

export const FavoritesModal: React.FC<FavoritesModalProps> = ({
  isOpen,
  onClose,
  favorites,
  vehicles,
  onToggleFavorite,
  onSelectVehicle,
}) => {
  if (!isOpen) return null;

  const savedVehicles = vehicles.filter((v) => favorites.includes(v.id));

  return createPortal(
    <div 
      className="fixed inset-0 z-[9999] bg-[#09090b]/90 backdrop-blur-md flex items-end sm:items-center justify-center p-0 sm:p-6 text-[#f4f4f5] animate-fadeIn"
      onClick={onClose}
    >
      <div 
        className="bg-[#121215] w-full max-w-[660px] overflow-hidden border border-[#27272a] rounded-[4px] flex flex-col max-h-[88vh] shadow-2xl animate-scaleIn"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header */}
        <div className="p-5 border-b border-[#27272a] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Bookmark className="w-5 h-5 text-white fill-white" />
            <h3 className="font-bold text-[16px] text-white">
              Saved Cars ({savedVehicles.length})
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-[#a1a1aa] hover:text-white cursor-pointer transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Saved List */}
        <div className="p-5 overflow-y-auto space-y-3 flex-1">
          {savedVehicles.length > 0 ? (
            savedVehicles.map((vehicle) => (
              <div
                key={vehicle.id}
                className="p-3.5 border border-[#27272a] hover:border-zinc-500 rounded-[3px] transition-all bg-[#18181c] flex items-center justify-between gap-4"
              >
                <div
                  onClick={() => {
                    onSelectVehicle(vehicle);
                    onClose();
                  }}
                  className="flex items-center gap-3.5 cursor-pointer flex-1 min-w-0"
                >
                  <div className="w-20 h-14 overflow-hidden rounded-[2px] bg-[#09090b] border border-[#27272a] shrink-0">
                    <SkeletonImage src={vehicle.heroImage} alt={vehicle.name} containerClassName="w-full h-full" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-600" />
                      <span className="font-mono text-[10.5px] text-zinc-300 font-bold block">
                        {vehicle.stockNo} · Grade {vehicle.auctionGrade}
                      </span>
                    </div>
                    <h4 className="text-[14.5px] font-bold text-white truncate mt-0.5">
                      {vehicle.name}
                    </h4>
                    <p className="font-mono text-[12px] text-white font-bold">
                      KES {vehicle.priceKes.toLocaleString()} · {vehicle.year}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => onToggleFavorite(vehicle.id)}
                    className="p-2 text-[#71717a] hover:text-white transition-colors cursor-pointer"
                    title="Remove from saved"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="py-16 text-center text-[#71717a] space-y-3">
              <Bookmark className="w-10 h-10 text-[#27272a] mx-auto" />
              <p className="text-[16px] font-bold text-white">Your saved list is empty.</p>
              <p className="text-[13.5px] text-[#a1a1aa] max-w-[360px] mx-auto">
                Click the bookmark icon on any vehicle card to save it here for quick comparison.
              </p>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        {savedVehicles.length > 0 && (
          <div className="p-4 border-t border-[#27272a] bg-[#18181c] flex flex-col sm:flex-row items-center justify-between gap-3">
            <span className="text-[12px] font-mono text-[#a1a1aa]">
              {savedVehicles.length} cars selected
            </span>
            <a
              href={`https://wa.me/254714333888?text=Hello%20Alberka%20Motors,%20I%20have%20saved%20${savedVehicles.length}%20cars%20on%20your%20website:%20${encodeURIComponent(savedVehicles.map(v => `${v.name} (${v.stockNo})`).join(', '))}.%20Please%20let%20me%20know%20their%20availability.`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-white font-semibold w-full sm:w-auto text-[13px] !py-2 !px-4"
            >
              <MessageCircle className="w-4 h-4 mr-1.5" />
              <span>Inquire on All Saved Cars</span>
            </a>
          </div>
        )}

      </div>
    </div>,
    document.body
  );
};
