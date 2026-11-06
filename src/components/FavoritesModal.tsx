import React from 'react';
import { X, Heart, ArrowRight, Trash2, Calendar, MessageCircle } from 'lucide-react';
import { Vehicle } from '../data/vehicles';

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

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div className="bg-[#121215] w-full max-w-[620px] rounded-[24px] overflow-hidden shadow-2xl border border-[#27272a] flex flex-col max-h-[85vh]">
        
        {/* Header */}
        <div className="p-5 border-b border-[#27272a] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-red-500 fill-red-500" />
            <h3 className="text-[18px] font-semibold text-white">
              Saved Showroom Fleet ({savedVehicles.length})
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-zinc-400 hover:text-white hover:bg-[#121215] cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Saved List */}
        <div className="p-4 overflow-y-auto space-y-3 flex-1">
          {savedVehicles.length > 0 ? (
            savedVehicles.map((vehicle) => (
              <div
                key={vehicle.id}
                className="p-3 rounded-[16px] border border-[#27272a] hover:border-[#dc2626] transition-all bg-[#121215] flex items-center justify-between gap-4"
              >
                <div
                  onClick={() => {
                    onSelectVehicle(vehicle);
                    onClose();
                  }}
                  className="flex items-center gap-3 cursor-pointer flex-1"
                >
                  <div className="w-16 h-16 rounded-[12px] overflow-hidden bg-[#121215] shrink-0">
                    <img src={vehicle.heroImage} alt={vehicle.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <span className="text-[10px] font-semibold text-zinc-400 bg-[#121215] px-1.5 py-0.5 rounded">
                      {vehicle.stockNo}
                    </span>
                    <h4 className="text-[15px] font-semibold text-white leading-snug">
                      {vehicle.name}
                    </h4>
                    <p className="text-[12px] text-zinc-400">
                      KES {vehicle.priceKes.toLocaleString()} · {vehicle.year}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => onToggleFavorite(vehicle.id)}
                    className="p-2 text-zinc-400 hover:text-red-500 transition-colors cursor-pointer"
                    title="Remove from saved"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="py-12 text-center text-zinc-400 space-y-3">
              <Heart className="w-10 h-10 text-[#27272a] mx-auto" />
              <p className="text-[15px]">You have not saved any vehicles yet.</p>
              <p className="text-[13px] text-zinc-400">
                Click the heart icon on any vehicle card to save it for quick review.
              </p>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        {savedVehicles.length > 0 && (
          <div className="p-4 bg-[#0d0d10] border-t border-[#27272a] flex items-center justify-between gap-4">
            <span className="text-[12px] text-zinc-400">
              Total Estimated Value:{' '}
              <strong className="text-white">
                KES {savedVehicles.reduce((acc, v) => acc + v.priceKes, 0).toLocaleString()}
              </strong>
            </span>
            <a
              href={`https://wa.me/254714333888?text=Hello%20Alberka%20Motors,%20I%20have%20saved%20${savedVehicles.length}%20vehicles%20on%20your%20site:%20${savedVehicles.map(v => v.stockNo).join(',%20')}.%20I%20would%20like%20to%20schedule%20a%20joint%20viewing.`}
              target="_blank"
              rel="noopener noreferrer"
              className="pricing-blue-pill"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>Inquire on All Saved</span>
            </a>
          </div>
        )}

      </div>
    </div>
  );
};
