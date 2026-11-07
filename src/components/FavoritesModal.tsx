import React from 'react';
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

  return (
    <div className="fixed inset-0 z-50 bg-[#080809]/90 backdrop-blur-xl flex items-end sm:items-center justify-center p-0 sm:p-6">
      <div className="bg-[#131316] w-full max-w-[660px] overflow-hidden border border-[rgba(197,168,128,0.35)] flex flex-col max-h-[88vh]">
        
        {/* Header */}
        <div className="p-5 border-b border-[rgba(197,168,128,0.2)] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Bookmark className="w-4 h-4 text-[#c5a880] fill-[#c5a880]" />
            <h3 className="font-['Cinzel'] text-[15px] text-[#f5f5f7] tracking-wider uppercase">
              Curated Dossier ({savedVehicles.length})
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-[#8c8a94] hover:text-[#f5f5f7] cursor-pointer transition-colors"
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
                className="p-3.5 border border-[rgba(255,255,255,0.06)] hover:border-[rgba(197,168,128,0.35)] transition-all bg-[#0f0714] flex items-center justify-between gap-4"
              >
                <div
                  onClick={() => {
                    onSelectVehicle(vehicle);
                    onClose();
                  }}
                  className="flex items-center gap-3.5 cursor-pointer flex-1 min-w-0"
                >
                  <div className="w-16 h-12 overflow-hidden bg-[#080809] border border-[rgba(197,168,128,0.2)] shrink-0">
                    <SkeletonImage src={vehicle.heroImage} alt={vehicle.name} containerClassName="w-full h-full" />
                  </div>
                  <div className="min-w-0">
                    <span className="font-mono text-[9px] text-[#c5a880] tracking-wider block">
                      {vehicle.stockNo}
                    </span>
                    <h4 className="font-['Cinzel'] text-[13px] text-[#f5f5f7] truncate uppercase tracking-wider mt-0.5">
                      {vehicle.name}
                    </h4>
                    <p className="font-mono text-[11px] text-[#dfc7a5]">
                      KES {vehicle.priceKes.toLocaleString()} // {vehicle.year}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => onToggleFavorite(vehicle.id)}
                    className="p-1.5 text-[#8c8a94] hover:text-[#dfc7a5] transition-colors cursor-pointer"
                    title="Remove from dossier"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="py-16 text-center text-[#8c8a94] space-y-3 font-light">
              <Bookmark className="w-8 h-8 text-[rgba(197,168,128,0.3)] mx-auto" />
              <p className="font-['Cinzel'] text-[14px] text-[#f5f5f7] tracking-wider uppercase">Your curated dossier is currently empty.</p>
              <p className="text-[12px] text-[#8c8a94] max-w-[360px] mx-auto">
                Select the bookmark insignia on any motor car to curate your private inspection dossier.
              </p>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        {savedVehicles.length > 0 && (
          <div className="p-5 bg-[#0f0714] border-t border-[rgba(197,168,128,0.2)] flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="font-['Cinzel'] text-[11px] text-[#8c8a94] tracking-wider uppercase">
              TOTAL DOSSIER VALUE:{' '}
              <strong className="font-mono text-[#f5f5f7] block sm:inline">
                KES {savedVehicles.reduce((acc, v) => acc + v.priceKes, 0).toLocaleString()}
              </strong>
            </span>
            <a
              href={`https://wa.me/254714333888?text=Salutations%20Alberka%20Motors.%20I%20have%20curated%20${savedVehicles.length}%20marques%20in%20my%20dossier:%20${savedVehicles.map(v => v.stockNo).join(',%20')}.%20I%20wish%20to%20reserve%20a%20joint%20viewing.`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-rr-solid w-full sm:w-auto text-center"
            >
              <MessageCircle className="w-3.5 h-3.5 mr-2" />
              <span>INQUIRE ON CURATED DOSSIER</span>
            </a>
          </div>
        )}

      </div>
    </div>
  );
};
