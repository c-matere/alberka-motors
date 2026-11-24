import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { X, Bookmark, ArrowRight, Trash2, MessageCircle, Columns2, List, Sparkles } from 'lucide-react';
import { Vehicle } from '../data/vehicles';
import { SkeletonImage } from './SkeletonImage';

interface FavoritesModalProps {
  isOpen: boolean;
  onClose: () => void;
  favorites: string[];
  vehicles: Vehicle[];
  onToggleFavorite: (id: string) => void;
  onSelectVehicle: (vehicle: Vehicle) => void;
  onBrowseFleet?: () => void;
}

export const FavoritesModal: React.FC<FavoritesModalProps> = ({
  isOpen,
  onClose,
  favorites,
  vehicles,
  onToggleFavorite,
  onSelectVehicle,
  onBrowseFleet,
}) => {
  const [viewMode, setViewMode] = useState<'list' | 'compare'>('list');

  if (!isOpen) return null;

  const savedVehicles = vehicles.filter((v) => favorites.includes(v.id));

  return createPortal(
    <div 
      className="fixed inset-0 z-[9999] bg-black/50 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-6 text-[#222222] animate-fadeIn"
      onClick={onClose}
    >
      <div 
        className={`bg-white w-full overflow-hidden border-t sm:border border-[#ebebeb] rounded-t-2xl sm:rounded-[16px] flex flex-col max-h-[90vh] sm:max-h-[88vh] shadow-[0_8px_28px_rgba(0,0,0,0.22)] text-[#222222] animate-scaleIn transition-all ${
          viewMode === 'compare' && savedVehicles.length >= 2 ? 'max-w-[920px]' : 'max-w-[660px]'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-[#ebebeb] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#DC2626] text-white flex items-center justify-center font-bold shadow-xs">
              <Bookmark className="w-4 h-4 fill-white text-white" />
            </div>
            <div>
              <h3 className="font-bold text-base text-[#222222] leading-tight">
                Saved Vehicles ({savedVehicles.length})
              </h3>
              <p className="text-[11px] font-mono text-[#6a6a6a]">
                Your private shortlist for appraisal & inspection
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {savedVehicles.length >= 2 && (
              <div className="flex items-center bg-[#f7f7f7] border border-[#ebebeb] p-0.5 rounded-full mr-2">
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-1.5 px-2.5 rounded-full text-xs transition-colors cursor-pointer ${
                    viewMode === 'list' ? 'bg-white text-[#222222] font-semibold shadow-xs' : 'text-[#6a6a6a] hover:text-[#222222]'
                  }`}
                  title="List View"
                >
                  <List className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setViewMode('compare')}
                  className={`p-1.5 rounded-full text-xs transition-colors cursor-pointer flex items-center gap-1.5 px-3 ${
                    viewMode === 'compare' ? 'bg-white text-[#222222] font-semibold shadow-xs' : 'text-[#6a6a6a] hover:text-[#222222]'
                  }`}
                  title="Compare Side-by-Side"
                >
                  <Columns2 className="w-3.5 h-3.5" />
                  <span className="text-[11px] font-mono font-semibold hidden xs:inline">Compare</span>
                </button>
              </div>
            )}

            <button
              onClick={onClose}
              className="p-1.5 text-[#6a6a6a] hover:text-[#222222] cursor-pointer transition-colors rounded-full hover:bg-[#f7f7f7]"
              title="Close (Esc)"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Saved List or Comparison */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1">
          {savedVehicles.length > 0 ? (
            viewMode === 'compare' && savedVehicles.length >= 2 ? (
              /* Side-by-Side Architectural Comparison View */
              <div className="space-y-4">
                <div className="text-left pb-2 border-b border-[#ebebeb] flex items-center justify-between">
                  <span className="font-mono text-xs text-[#6a6a6a] uppercase tracking-wider font-semibold">
                    SIDE-BY-SIDE SPECIFICATION AUDIT
                  </span>
                  <span className="text-xs font-mono text-[#DC2626] font-semibold">
                    100-Point Pre-Delivery Overhaul Included
                  </span>
                </div>

                <div className="overflow-x-auto no-scrollbar">
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 min-w-[560px]">
                    {savedVehicles.map((vehicle) => (
                      <div
                        key={vehicle.id}
                        className="bg-[#f7f7f7] border border-[#ebebeb] hover:border-[#dddddd] rounded-[14px] p-4 flex flex-col justify-between space-y-4 text-left shadow-xs"
                      >
                        <div className="space-y-3">
                          <div className="w-full aspect-[9/16] overflow-hidden rounded-[10px] bg-[#0a0a0c] border border-[#ebebeb] relative">
                            <SkeletonImage src={vehicle.heroImage} alt={vehicle.name} className="object-contain" containerClassName="w-full h-full bg-[#0a0a0c]" />
                            <div className="absolute top-2 left-2 bg-white/95 backdrop-blur-md px-2 py-0.5 rounded-full text-[10px] font-mono font-bold border border-[#ebebeb] text-[#222222] shadow-2xs">
                              Grade {vehicle.auctionGrade}
                            </div>
                          </div>

                          <div>
                            <span className="font-mono text-[10px] text-[#6a6a6a] uppercase block font-semibold">
                              {vehicle.stockNo} · {vehicle.year}
                            </span>
                            <h4 className="text-sm font-bold text-[#222222] line-clamp-2 mt-0.5">
                              {vehicle.name}
                            </h4>
                            <p className="font-mono text-base font-bold text-[#DC2626] mt-1">
                              KES {vehicle.priceKes.toLocaleString()}
                            </p>
                          </div>

                          <div className="pt-2 border-t border-[#ebebeb] space-y-2 text-xs font-mono">
                            <div className="flex justify-between py-1 border-b border-[#ebebeb]">
                              <span className="text-[#6a6a6a]">Mileage</span>
                              <span className="text-[#222222] font-semibold">{vehicle.mileageKm.toLocaleString()} KM</span>
                            </div>
                            <div className="flex justify-between py-1 border-b border-[#ebebeb]">
                              <span className="text-[#6a6a6a]">Powertrain</span>
                              <span className="text-[#222222] font-semibold truncate max-w-[140px] text-right">{vehicle.engine}</span>
                            </div>
                            <div className="flex justify-between py-1 border-b border-[#ebebeb]">
                              <span className="text-[#6a6a6a]">Drivetrain</span>
                              <span className="text-[#222222] font-semibold">{vehicle.drivetrain}</span>
                            </div>
                            <div className="flex justify-between py-1 border-b border-[#ebebeb]">
                              <span className="text-[#6a6a6a]">Body Type</span>
                              <span className="text-[#222222] font-semibold truncate max-w-[140px] text-right">{vehicle.bodyType}</span>
                            </div>
                            <div className="flex justify-between py-1">
                              <span className="text-[#6a6a6a]">Auction Hall</span>
                              <span className="text-[#222222] font-semibold">{vehicle.auctionHall}</span>
                            </div>
                          </div>
                        </div>

                        <div className="pt-3 border-t border-[#ebebeb] flex items-center gap-2">
                          <button
                            onClick={() => {
                              onSelectVehicle(vehicle);
                              onClose();
                            }}
                            className="bg-white hover:bg-[#ebebeb] text-[#222222] border border-[#ebebeb] text-xs py-2 px-3 flex-1 text-center font-semibold rounded-full transition-colors cursor-pointer"
                          >
                            Inspect Car
                          </button>
                          <button
                            onClick={() => onToggleFavorite(vehicle.id)}
                            className="p-2 text-[#6a6a6a] hover:text-[#222222] transition-colors cursor-pointer rounded-full bg-white border border-[#ebebeb]"
                            title="Remove"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              /* List View */
              <div className="space-y-3">
                {savedVehicles.map((vehicle) => (
                  <div
                    key={vehicle.id}
                    className="p-3.5 border border-[#ebebeb] hover:border-[#dddddd] rounded-[14px] transition-all bg-white hover:bg-[#f7f7f7] flex items-center justify-between gap-4 shadow-xs"
                  >
                    <div
                      onClick={() => {
                        onSelectVehicle(vehicle);
                        onClose();
                      }}
                      className="flex items-center gap-3.5 cursor-pointer flex-1 min-w-0"
                    >
                      <div className="w-20 h-14 overflow-hidden rounded-[8px] bg-[#f7f7f7] border border-[#ebebeb] shrink-0">
                        <SkeletonImage src={vehicle.heroImage} alt={vehicle.name} containerClassName="w-full h-full" />
                      </div>
                      <div className="min-w-0 text-left">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-[10.5px] text-[#6a6a6a] font-bold block">
                            {vehicle.stockNo} · Grade {vehicle.auctionGrade}
                          </span>
                        </div>
                        <h4 className="text-[14.5px] font-semibold text-[#222222] truncate mt-0.5">
                          {vehicle.name}
                        </h4>
                        <p className="font-mono text-xs text-[#DC2626] font-bold">
                          KES {vehicle.priceKes.toLocaleString()} · {vehicle.year} · {vehicle.mileageKm.toLocaleString()} KM
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => {
                          onSelectVehicle(vehicle);
                          onClose();
                        }}
                        className="text-xs py-1.5 px-3 rounded-full border border-[#ebebeb] bg-[#f7f7f7] hover:bg-[#ebebeb] text-[#222222] font-semibold hidden sm:inline-flex items-center gap-1 cursor-pointer transition-colors"
                      >
                        <span>Inspect</span>
                        <ArrowRight className="w-3 h-3 text-[#DC2626]" />
                      </button>
                      <button
                        onClick={() => onToggleFavorite(vehicle.id)}
                        className="p-2 text-[#6a6a6a] hover:text-[#222222] transition-colors cursor-pointer rounded-full hover:bg-[#f7f7f7]"
                        title="Remove from saved"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )
          ) : (
            <div className="py-16 text-center text-[#6a6a6a] space-y-4">
              <div className="w-12 h-12 rounded-full bg-[#f7f7f7] border border-[#ebebeb] flex items-center justify-center mx-auto text-[#6a6a6a]">
                <Bookmark className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <p className="text-base font-bold text-[#222222]">Your saved list is empty.</p>
                <p className="text-xs text-[#6a6a6a] max-w-sm mx-auto leading-relaxed">
                  Bookmark any vehicle in our verified fleet to review side-by-side specs, compare financing options, or request a joint private viewing.
                </p>
              </div>
              {onBrowseFleet && (
                <button
                  onClick={() => {
                    onClose();
                    onBrowseFleet();
                  }}
                  className="btn-white text-xs py-2 px-4 rounded-lg font-semibold inline-flex items-center gap-2 cursor-pointer mt-2"
                >
                  <span>Explore Verified Fleet</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          )}
        </div>

        {/* Footer Actions */}
        {savedVehicles.length > 0 && (
          <div className="p-4 pb-[calc(1rem+env(safe-area-inset-bottom,0px))] sm:pb-4 border-t border-zinc-200 bg-zinc-50 flex flex-col sm:flex-row items-center justify-between gap-3">
            <span className="text-xs font-mono text-zinc-600">
              {savedVehicles.length} vehicle{savedVehicles.length > 1 ? 's' : ''} saved for comparison
            </span>
            <a
              href={`https://wa.me/254180423075?text=${encodeURIComponent(`Hello Alberka Enterprises, I have saved ${savedVehicles.length} vehicle(s) on your website: ${savedVehicles.map(v => `${v.year} ${v.name} (Stock ID: ${v.sbtStockId || v.stockNo})`).join(', ')}. Please confirm their viewing schedule at your showroom next to Ganjoni Primary School, Mombasa.`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#222222] hover:bg-black text-white font-medium w-full sm:w-auto text-xs py-2.5 px-5 rounded-full flex items-center justify-center gap-2 cursor-pointer shadow-sm hover:scale-[1.01] active:scale-98 transition-all"
            >
              <span className="inline-flex items-center justify-center">
                <MessageCircle className="w-4 h-4 text-white fill-white" />
              </span>
              <span>Inquire on Saved Fleet via WhatsApp</span>
            </a>
          </div>
        )}

      </div>
    </div>,
    document.body
  );
};
