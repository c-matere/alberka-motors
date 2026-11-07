import React from 'react';
import { Bookmark, ArrowRight, Gauge, Shield, Fuel } from 'lucide-react';
import { Vehicle } from '../data/vehicles';
import { useScrollReveal } from '../hooks/useAnimations';
import { SkeletonImage } from './SkeletonImage';

interface VehicleCardProps {
  vehicle: Vehicle;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  onSelect: (vehicle: Vehicle) => void;
  disableScrollReveal?: boolean;
}

export const VehicleCard: React.FC<VehicleCardProps> = ({
  vehicle,
  isFavorite,
  onToggleFavorite,
  onSelect,
  disableScrollReveal = false,
}) => {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.05 });
  const shouldReveal = disableScrollReveal || isVisible;

  return (
    <div
      ref={disableScrollReveal ? undefined : ref}
      className={`rr-card p-6 flex flex-col justify-between group transition-all duration-500 ${
        disableScrollReveal ? '' : `scroll-reveal ${shouldReveal ? 'is-visible' : ''}`
      }`}
    >
      <div>
        {/* Media Frame — Zero-Radius Architectural Frame */}
        <div 
          onClick={() => onSelect(vehicle)}
          className="w-full h-[220px] xs:h-[260px] sm:h-[280px] overflow-hidden bg-[#080809] border border-[rgba(255,255,255,0.06)] group-hover:border-[rgba(197,168,128,0.35)] mb-6 relative cursor-pointer transition-colors duration-500"
        >
          <SkeletonImage
            src={vehicle.heroImage}
            alt={vehicle.name}
            className="group-hover:scale-105 transition-transform duration-700 ease-out"
            containerClassName="w-full h-full"
            loading="lazy"
          />

          {/* Minimalist Japanese Provenance Seal */}
          <div className="absolute top-3 left-3 flex items-center gap-2 z-20">
            <span className="font-['Cinzel'] text-[10px] tracking-[0.18em] bg-[#0f0714]/90 text-[#dfc7a5] border border-[rgba(197,168,128,0.3)] px-2.5 py-1 uppercase">
              {vehicle.auctionGrade}
            </span>
            <span className="font-['Cinzel'] text-[9.5px] tracking-[0.16em] bg-[#0f0714]/90 text-[#8c8a94] border border-[rgba(255,255,255,0.08)] px-2 py-1 uppercase">
              {vehicle.status.split('—')[0]}
            </span>
          </div>

          {/* Curated Dossier Bookmark */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite(vehicle.id);
            }}
            className={`absolute top-3 right-3 w-8 h-8 flex items-center justify-center transition-all duration-400 cursor-pointer z-20 ${
              isFavorite 
                ? 'bg-[#c5a880] text-[#0f0714]' 
                : 'bg-[#0f0714]/80 hover:bg-[#160a1d] text-[#8c8a94] hover:text-[#dfc7a5] border border-[rgba(197,168,128,0.25)]'
            }`}
            title={isFavorite ? 'Remove from Curated Dossier' : 'Save to Curated Dossier'}
          >
            <Bookmark className={`w-3.5 h-3.5 ${isFavorite ? 'fill-[#0f0714]' : ''}`} />
          </button>
        </div>

        {/* Identity & Heritage Meta Line */}
        <div className="flex items-center justify-between text-[11px] text-[#8c8a94] mb-3 font-mono">
          <span>{vehicle.year} // {vehicle.mileageKm.toLocaleString()} KM</span>
          <span className="text-[#c5a880] tracking-widest">{vehicle.stockNo}</span>
        </div>

        {/* Aristocratic Moniker */}
        <div className="rr-eyebrow mb-2">
          {vehicle.moniker || 'BESPOKE JAPANESE MARQUE'}
        </div>

        {/* Marque Headline (Cinzel Uppercase) */}
        <h3
          onClick={() => onSelect(vehicle)}
          className="font-['Cinzel'] text-[18px] sm:text-[20px] font-normal text-[#f5f5f7] mb-3 leading-snug tracking-[0.14em] hover:text-[#dfc7a5] transition-colors cursor-pointer uppercase"
        >
          {vehicle.name}
        </h3>

        {/* Tagline */}
        <p className="text-[13.5px] text-[#8c8a94] line-clamp-2 leading-[1.6] mb-6 font-light">
          {vehicle.tagline}
        </p>

        {/* Engineering Specifications Grid */}
        <div className="grid grid-cols-3 gap-2 mb-6 text-center">
          <div className="border border-[rgba(255,255,255,0.06)] bg-[#0f0714] p-2">
            <span className="font-['Cinzel'] text-[8.5px] text-[#8c8a94] uppercase tracking-wider block mb-0.5">POWERTRAIN</span>
            <span className="font-mono text-[11px] text-[#dfc7a5] truncate block">{vehicle.power.split('@')[0]}</span>
          </div>
          <div className="border border-[rgba(255,255,255,0.06)] bg-[#0f0714] p-2">
            <span className="font-['Cinzel'] text-[8.5px] text-[#8c8a94] uppercase tracking-wider block mb-0.5">EFFICIENCY</span>
            <span className="font-mono text-[11px] text-[#dfc7a5] truncate block">{vehicle.fuelEconomy.split('(')[0]}</span>
          </div>
          <div className="border border-[rgba(255,255,255,0.06)] bg-[#0f0714] p-2">
            <span className="font-['Cinzel'] text-[8.5px] text-[#8c8a94] uppercase tracking-wider block mb-0.5">COVENANT</span>
            <span className="font-mono text-[11px] text-[#c5a880] truncate block">5,000 KM</span>
          </div>
        </div>
      </div>

      {/* Bottom Valuation & Private Viewing Inquiry */}
      <div className="pt-5 border-t border-[rgba(197,168,128,0.15)] flex items-center justify-between gap-4">
        <div>
          <span className="font-['Cinzel'] text-[9px] text-[#8c8a94] uppercase tracking-[0.2em] block">
            ACQUISITION VALUE
          </span>
          <span className="font-mono text-[17px] sm:text-[19px] text-[#f5f5f7]">
            KES {vehicle.priceKes.toLocaleString()}
          </span>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => onSelect(vehicle)}
            className="btn-rr-ghost !text-[10px] !py-2 !px-3 cursor-pointer"
          >
            <span>DOSSIER</span>
            <ArrowRight className="w-3 h-3 ml-1" />
          </button>
          <a
            href={`https://wa.me/254714333888?text=Salutations%20Alberka%20Motors.%20I%20wish%20to%20inquire%20regarding%20the%20${encodeURIComponent(vehicle.name)}%20(${vehicle.stockNo}).`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-rr-solid !text-[10px] !py-2 !px-3.5 hidden xs:inline-flex"
          >
            INQUIRE
          </a>
        </div>
      </div>
    </div>
  );
};
