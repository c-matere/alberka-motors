import React from 'react';
import { X, Heart, ArrowRight, Trash2, Calendar, MessageCircle } from 'lucide-react';
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

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-end sm:items-center justify-center p-0 sm:p-6 animate-apple-fade">
      <div className="bg-[#0f1011] w-full max-w-[620px] rounded-t-[12px] sm:rounded-[12px] overflow-hidden shadow-2xl border border-[#23252a] flex flex-col max-h-[88vh] animate-apple-up">
        
        {/* Mobile Pull Handle */}
        <div className="w-8 h-1 rounded-full bg-[#383b3f] mx-auto mt-2.5 mb-1 sm:hidden shrink-0" />

        {/* Header */}
        <div className="p-4 border-b border-[#23252a] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Heart className="w-4 h-4 text-[#eb5757] fill-[#eb5757]" />
            <h3 className="text-[15px] font-medium text-[#ffffff]">
              Saved Showroom Fleet ({savedVehicles.length})
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-[4px] text-[#8a8f98] hover:text-[#ffffff] hover:bg-[#161718] cursor-pointer transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Saved List */}
        <div className="p-4 overflow-y-auto space-y-2.5 flex-1">
          {savedVehicles.length > 0 ? (
            savedVehicles.map((vehicle) => (
              <div
                key={vehicle.id}
                className="p-3 rounded-[8px] border border-[#23252a] hover:border-[#383b3f] transition-all bg-[#161718] flex items-center justify-between gap-4"
              >
                <div
                  onClick={() => {
                    onSelectVehicle(vehicle);
                    onClose();
                  }}
                  className="flex items-center gap-3 cursor-pointer flex-1"
                >
                  <div className="w-14 h-14 rounded-[6px] overflow-hidden bg-[#08090a] border border-[#23252a] shrink-0">
                    <SkeletonImage src={vehicle.heroImage} alt={vehicle.name} containerClassName="w-full h-full" />
                  </div>
                  <div>
                    <span className="font-mono text-[10px] text-[#8a8f98] bg-[#08090a] px-1.5 py-0.5 rounded-[3px] border border-[#23252a]">
                      {vehicle.stockNo}
                    </span>
                    <h4 className="text-[13px] font-normal text-[#ffffff] leading-snug mt-1">
                      {vehicle.name}
                    </h4>
                    <p className="font-mono text-[11px] text-[#e4f222] mt-0.5">
                      KES {vehicle.priceKes.toLocaleString()} · {vehicle.year}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => onToggleFavorite(vehicle.id)}
                    className="p-1.5 text-[#8a8f98] hover:text-[#eb5757] transition-colors cursor-pointer"
                    title="Remove from saved"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="py-12 text-center text-[#8a8f98] space-y-2">
              <Heart className="w-8 h-8 text-[#23252a] mx-auto" />
              <p className="text-[14px] text-[#ffffff]">You have not saved any vehicles yet.</p>
              <p className="text-[12px] text-[#8a8f98]">
                Click the heart icon on any vehicle card to save it for quick review.
              </p>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        {savedVehicles.length > 0 && (
          <div className="p-4 bg-[#161718] border-t border-[#23252a] flex items-center justify-between gap-4">
            <span className="text-[12px] text-[#8a8f98]">
              Total Value:{' '}
              <strong className="font-mono text-[#ffffff]">
                KES {savedVehicles.reduce((acc, v) => acc + v.priceKes, 0).toLocaleString()}
              </strong>
            </span>
            <a
              href={`https://wa.me/254714333888?text=Hello%20Alberka%20Motors,%20I%20have%20saved%20${savedVehicles.length}%20vehicles%20on%20your%20site:%20${savedVehicles.map(v => v.stockNo).join(',%20')}.%20I%20would%20like%20to%20schedule%20a%20joint%20viewing.`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
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
