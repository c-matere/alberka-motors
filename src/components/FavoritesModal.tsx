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
      className="fixed inset-0 z-[9999] bg-[#09090b]/90 backdrop-blur-md flex items-end sm:items-center justify-center p-0 sm:p-6 text-[#f4f4f5] animate-fadeIn"
      onClick={onClose}
    >
      <div 
        className={`bg-[#101014] w-full overflow-hidden border border-white/[0.1] rounded-2xl flex flex-col max-h-[88vh] shadow-[0_24px_60px_rgba(0,0,0,0.9)] animate-scaleIn transition-all ${
          viewMode === 'compare' && savedVehicles.length >= 2 ? 'max-w-[920px]' : 'max-w-[660px]'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-white/[0.08] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-white text-zinc-950 flex items-center justify-center font-bold">
              <Bookmark className="w-4 h-4 fill-black" />
            </div>
            <div>
              <h3 className="font-bold text-base text-white leading-tight">
                Saved Vehicles ({savedVehicles.length})
              </h3>
              <p className="text-[11px] font-mono text-zinc-400">
                Your private shortlist for appraisal & inspection
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {savedVehicles.length >= 2 && (
              <div className="flex items-center bg-zinc-900 border border-white/10 p-0.5 rounded-lg mr-2">
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-1.5 rounded-md text-xs transition-colors cursor-pointer ${
                    viewMode === 'list' ? 'bg-white text-zinc-950 font-bold' : 'text-zinc-400 hover:text-white'
                  }`}
                  title="List View"
                >
                  <List className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setViewMode('compare')}
                  className={`p-1.5 rounded-md text-xs transition-colors cursor-pointer flex items-center gap-1.5 px-2 ${
                    viewMode === 'compare' ? 'bg-white text-zinc-950 font-bold' : 'text-zinc-400 hover:text-white'
                  }`}
                  title="Compare Side-by-Side"
                >
                  <Columns2 className="w-3.5 h-3.5" />
                  <span className="text-[11px] font-mono font-bold hidden xs:inline">Compare</span>
                </button>
              </div>
            )}

            <button
              onClick={onClose}
              className="p-1.5 text-zinc-400 hover:text-white cursor-pointer transition-colors rounded-lg hover:bg-white/[0.05]"
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
                <div className="text-left pb-2 border-b border-white/[0.08] flex items-center justify-between">
                  <span className="font-mono text-xs text-zinc-400 uppercase tracking-wider font-semibold">
                    SIDE-BY-SIDE SPECIFICATION AUDIT
                  </span>
                  <span className="text-xs font-mono text-emerald-400">
                    5,000 KM Written Warranty Included
                  </span>
                </div>

                <div className="overflow-x-auto no-scrollbar">
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 min-w-[560px]">
                    {savedVehicles.map((vehicle) => (
                      <div
                        key={vehicle.id}
                        className="bg-black/60 border border-white/[0.1] rounded-xl p-4 flex flex-col justify-between space-y-4 text-left"
                      >
                        <div className="space-y-3">
                          <div className="w-full aspect-[16/10] overflow-hidden rounded-lg bg-black border border-white/10 relative">
                            <SkeletonImage src={vehicle.heroImage} alt={vehicle.name} containerClassName="w-full h-full" />
                            <div className="absolute top-2 left-2 bg-black/80 backdrop-blur-md px-2 py-0.5 rounded text-[10px] font-mono font-bold border border-white/15 text-white">
                              Grade {vehicle.auctionGrade}
                            </div>
                          </div>

                          <div>
                            <span className="font-mono text-[10px] text-zinc-400 uppercase block">
                              {vehicle.stockNo} · {vehicle.year}
                            </span>
                            <h4 className="text-sm font-bold text-white line-clamp-2 mt-0.5">
                              {vehicle.name}
                            </h4>
                            <p className="font-mono text-base font-bold text-white mt-1">
                              KES {vehicle.priceKes.toLocaleString()}
                            </p>
                          </div>

                          <div className="pt-2 border-t border-white/[0.08] space-y-2 text-xs font-mono">
                            <div className="flex justify-between py-1 border-b border-white/[0.04]">
                              <span className="text-zinc-500">Mileage</span>
                              <span className="text-white font-bold">{vehicle.mileageKm.toLocaleString()} KM</span>
                            </div>
                            <div className="flex justify-between py-1 border-b border-white/[0.04]">
                              <span className="text-zinc-500">Powertrain</span>
                              <span className="text-white font-bold truncate max-w-[140px] text-right">{vehicle.engine}</span>
                            </div>
                            <div className="flex justify-between py-1 border-b border-white/[0.04]">
                              <span className="text-zinc-500">Drivetrain</span>
                              <span className="text-white font-bold">{vehicle.drivetrain}</span>
                            </div>
                            <div className="flex justify-between py-1 border-b border-white/[0.04]">
                              <span className="text-zinc-500">Body Type</span>
                              <span className="text-white font-bold truncate max-w-[140px] text-right">{vehicle.bodyType}</span>
                            </div>
                            <div className="flex justify-between py-1">
                              <span className="text-zinc-500">Auction Hall</span>
                              <span className="text-white font-bold">{vehicle.auctionHall}</span>
                            </div>
                          </div>
                        </div>

                        <div className="pt-3 border-t border-white/[0.08] flex items-center gap-2">
                          <button
                            onClick={() => {
                              onSelectVehicle(vehicle);
                              onClose();
                            }}
                            className="btn-white !text-xs !py-2 !px-3 flex-1 text-center font-semibold rounded-lg"
                          >
                            Inspect Car
                          </button>
                          <button
                            onClick={() => onToggleFavorite(vehicle.id)}
                            className="p-2 text-zinc-500 hover:text-white transition-colors cursor-pointer rounded-lg bg-zinc-900 border border-white/[0.08]"
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
                    className="p-3.5 border border-white/[0.08] hover:border-white/25 rounded-xl transition-all bg-black/40 hover:bg-black/70 flex items-center justify-between gap-4"
                  >
                    <div
                      onClick={() => {
                        onSelectVehicle(vehicle);
                        onClose();
                      }}
                      className="flex items-center gap-3.5 cursor-pointer flex-1 min-w-0"
                    >
                      <div className="w-20 h-14 overflow-hidden rounded-lg bg-black border border-white/10 shrink-0">
                        <SkeletonImage src={vehicle.heroImage} alt={vehicle.name} containerClassName="w-full h-full" />
                      </div>
                      <div className="min-w-0 text-left">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-[10.5px] text-zinc-400 font-bold block">
                            {vehicle.stockNo} · Grade {vehicle.auctionGrade}
                          </span>
                        </div>
                        <h4 className="text-[14.5px] font-bold text-white truncate mt-0.5">
                          {vehicle.name}
                        </h4>
                        <p className="font-mono text-xs text-white font-semibold">
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
                        className="btn-ghost !text-xs !py-1.5 !px-3 hidden sm:inline-flex items-center gap-1 cursor-pointer"
                      >
                        <span>Inspect</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                      <button
                        onClick={() => onToggleFavorite(vehicle.id)}
                        className="p-2 text-zinc-500 hover:text-white transition-colors cursor-pointer rounded-lg hover:bg-white/[0.05]"
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
            <div className="py-16 text-center text-zinc-500 space-y-4">
              <div className="w-12 h-12 rounded-full bg-zinc-900 border border-white/10 flex items-center justify-center mx-auto text-zinc-400">
                <Bookmark className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <p className="text-base font-bold text-white">Your saved list is empty.</p>
                <p className="text-xs text-zinc-400 max-w-sm mx-auto leading-relaxed">
                  Bookmark any vehicle in our verified fleet to review side-by-side specs, calculate trade-ins, or request a joint private viewing.
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
          <div className="p-4 border-t border-white/[0.08] bg-black/60 flex flex-col sm:flex-row items-center justify-between gap-3">
            <span className="text-xs font-mono text-zinc-400">
              {savedVehicles.length} vehicle{savedVehicles.length > 1 ? 's' : ''} saved for comparison
            </span>
            <a
              href={`https://wa.me/254714333888?text=Hello%20Alberka%20Motors,%20I%20have%20saved%20${savedVehicles.length}%20cars%20on%20your%20website:%20${encodeURIComponent(savedVehicles.map(v => `${v.name} (${v.stockNo})`).join(', '))}.%20Please%20confirm%20their%20viewing%20schedule.`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-white font-semibold w-full sm:w-auto text-xs !py-2.5 !px-5 rounded-lg flex items-center justify-center gap-2 cursor-pointer"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Inquire on Saved Fleet via WhatsApp</span>
            </a>
          </div>
        )}

      </div>
    </div>,
    document.body
  );
};
