import React from 'react';
import { ArrowLeft, ArrowRight, ShieldCheck, Fuel, Compass, Users, CheckCircle2, MessageCircle, Sparkles } from 'lucide-react';
import { Vehicle } from '../data/vehicles';
import { MODEL_HUBS, ModelHub, getVehicleHubId } from '../data/modelHubs';
import { VehicleCard } from './VehicleCard';

interface ModelHubViewProps {
  hubId: string;
  vehicles: Vehicle[];
  favorites: string[];
  onToggleFavorite: (id: string) => void;
  onSelectVehicle: (vehicle: Vehicle) => void;
  onSelectHub: (hubId: string) => void;
  onBackToInventory: () => void;
}

export const ModelHubView: React.FC<ModelHubViewProps> = ({
  hubId,
  vehicles,
  favorites,
  onToggleFavorite,
  onSelectVehicle,
  onSelectHub,
  onBackToInventory,
}) => {
  const currentHub = MODEL_HUBS.find((h) => h.id === hubId) || MODEL_HUBS[0];

  // Filter vehicles belonging to this model hub
  const hubVehicles = vehicles.filter((v) => getVehicleHubId(v) === currentHub.id);

  const handleCustomOrderWhatsApp = () => {
    const text = encodeURIComponent(
      `Hello Alberka Enterprises, I am interested in sourcing a specific grade/trim of the ${currentHub.name} directly from Japanese auctions. Please advise on available auction units and CIF Mombasa pricing.`
    );
    window.open(`https://wa.me/254180423075?text=${text}`, '_blank');
  };

  return (
    <div className="w-full bg-[#f8f9fa] text-zinc-900 min-h-screen">
      {/* 1. Hub Switcher Top Bar */}
      <div className="sticky top-16 sm:top-[76px] z-30 bg-white/95 backdrop-blur-xl border-b border-zinc-200 py-2.5 px-3 sm:px-8 shadow-sm">
        <div className="max-w-[1520px] mx-auto flex items-center justify-between gap-3 overflow-x-auto no-scrollbar">
          <button
            onClick={onBackToInventory}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-zinc-700 hover:text-red-600 transition-colors shrink-0 cursor-pointer pr-2 border-r border-zinc-200"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">All Showroom</span>
            <span className="sm:hidden">All</span>
          </button>

          {/* Model Hub Pills */}
          <div className="flex items-center gap-1.5 min-w-max">
            {MODEL_HUBS.map((hub) => {
              const isActive = hub.id === currentHub.id;
              const count = vehicles.filter((v) => getVehicleHubId(v) === hub.id).length;
              return (
                <button
                  key={hub.id}
                  onClick={() => onSelectHub(hub.id)}
                  className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-red-600 text-white shadow-sm'
                      : 'bg-zinc-100 text-zinc-700 hover:bg-zinc-200 hover:text-zinc-950 border border-zinc-200/80'
                  }`}
                >
                  <span>{hub.name} Hub</span>
                  <span className={`text-[10px] font-mono px-1 rounded ${isActive ? 'bg-white/20 text-white' : 'bg-white text-zinc-600'}`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* 2. Model Family Hero Showcase */}
      <section className="relative w-full bg-white border-b border-zinc-200 overflow-hidden py-10 sm:py-16 px-4 sm:px-8">
        <div className="max-w-[1520px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-center">
          
          {/* Left: Editorial Narrative & Specifications */}
          <div className="lg:col-span-7 space-y-4 text-left">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="inline-flex items-center gap-1 text-[11px] font-mono font-bold bg-red-50 text-red-700 border border-red-200 px-2.5 py-1 rounded-full uppercase tracking-wider">
                <Sparkles className="w-3 h-3 text-red-600" />
                {currentHub.badge}
              </span>
              <span className="text-xs font-mono text-zinc-500">
                Starting from <strong className="text-zinc-950 font-bold">KES {currentHub.startingPriceKes.toLocaleString()}</strong> Delivered
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-zinc-950 tracking-tight leading-tight">
              {currentHub.title}
            </h1>

            <p className="text-sm sm:text-base text-zinc-600 leading-relaxed font-normal max-w-2xl">
              {currentHub.tagline}
            </p>

            {/* Key Vital Metrics Pill Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2">
              <div className="bg-zinc-50 border border-zinc-200 rounded-xl p-3 text-left">
                <span className="text-[10px] font-mono text-zinc-500 uppercase block font-semibold">Fuel Economy</span>
                <span className="text-sm sm:text-base font-bold text-zinc-950">{currentHub.avgFuelEconomy}</span>
              </div>
              <div className="bg-zinc-50 border border-zinc-200 rounded-xl p-3 text-left">
                <span className="text-[10px] font-mono text-zinc-500 uppercase block font-semibold">Ride Height</span>
                <span className="text-sm sm:text-base font-bold text-zinc-950">{currentHub.groundClearance}</span>
              </div>
              <div className="bg-zinc-50 border border-zinc-200 rounded-xl p-3 text-left">
                <span className="text-[10px] font-mono text-zinc-500 uppercase block font-semibold">Capacity</span>
                <span className="text-sm sm:text-base font-bold text-zinc-950">{currentHub.seatingCapacity}</span>
              </div>
              <div className="bg-zinc-50 border border-zinc-200 rounded-xl p-3 text-left">
                <span className="text-[10px] font-mono text-zinc-500 uppercase block font-semibold">Drivetrain</span>
                <span className="text-sm sm:text-base font-bold text-zinc-950 truncate block">{currentHub.driveTypes}</span>
              </div>
            </div>

            {/* Kenyan Road Suitability Callout */}
            <div className="bg-zinc-50 border border-zinc-200 rounded-xl p-3.5 text-xs text-zinc-900 flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
              <p className="leading-relaxed">
                <strong className="font-bold text-zinc-950">Kenyan Road Suitability:</strong> {currentHub.verdict}
              </p>
            </div>
          </div>

          {/* Right: Flagship High-Resolution Presentation */}
          <div className="lg:col-span-5 relative">
            <div className="relative aspect-[3/4] max-w-[380px] mx-auto rounded-2xl overflow-hidden bg-zinc-100 border border-zinc-200 shadow-xl group">
              <img
                src={currentHub.heroImage}
                alt={currentHub.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20 pointer-events-none" />
              <div className="absolute bottom-4 left-4 right-4 text-white text-left">
                <span className="text-[10px] font-mono uppercase tracking-widest text-red-400 font-bold block">
                  GENUINE TOKYO AUCTION SOURCED
                </span>
                <h3 className="text-lg font-bold text-white leading-tight">
                  {currentHub.name} Collection
                </h3>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 3. In-Stock Hub Fleet Runway (4 Cards Per Row) */}
      <section className="py-12 sm:py-16 px-4 sm:px-8">
        <div className="max-w-[1520px] mx-auto space-y-8">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-zinc-200 pb-4">
            <div>
              <span className="font-mono text-xs text-red-600 uppercase tracking-wider font-bold block mb-1">
                AVAILABLE {currentHub.name.toUpperCase()} UNITS IN STOCK
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-zinc-950 tracking-tight">
                Current {currentHub.name} Inventory ({hubVehicles.length} Units)
              </h2>
            </div>
            
            <button
              onClick={handleCustomOrderWhatsApp}
              className="bg-[#222222] hover:bg-black text-white font-medium text-xs py-2.5 px-5 rounded-full inline-flex items-center gap-1.5 shadow-sm transition-all cursor-pointer self-start sm:self-auto"
            >
              <MessageCircle className="w-3.5 h-3.5 text-white fill-white" />
              <span>Order Custom {currentHub.name} from Japan</span>
            </button>
          </div>

          {/* 4 Cards Per Row Grid */}
          {hubVehicles.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
              {hubVehicles.map((vehicle, idx) => (
                <VehicleCard
                  key={vehicle.id}
                  vehicle={vehicle}
                  isFavorite={favorites.includes(vehicle.id)}
                  onToggleFavorite={onToggleFavorite}
                  onSelect={onSelectVehicle}
                  staggerIndex={idx}
                />
              ))}
            </div>
          ) : (
            <div className="bg-white border border-zinc-200 rounded-2xl p-8 sm:p-12 text-center max-w-lg mx-auto space-y-4 shadow-sm">
              <h3 className="text-lg font-bold text-zinc-950">
                Fresh {currentHub.name} Units Arriving from Tokyo Port
              </h3>
              <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
                We have 3 units of {currentHub.name} cleared through Mombasa port this week. Inquire on WhatsApp for immediate pre-arrival booking or inspect upcoming USS Tokyo lots.
              </p>
              <button
                onClick={handleCustomOrderWhatsApp}
                className="bg-red-600 hover:bg-red-700 text-white font-bold text-xs py-2.5 px-5 rounded-lg inline-flex items-center gap-2 shadow-sm transition-all cursor-pointer"
              >
                <span>Request {currentHub.name} Stock Dossier</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          {/* 4. Why Buy This Model at Alberka Enterprises Limited */}
          <div className="bg-white border border-zinc-200/90 rounded-2xl p-6 sm:p-10 text-left shadow-sm mt-12 space-y-6">
            <div>
              <span className="font-mono text-xs uppercase tracking-wider text-zinc-500 font-bold block mb-1">
                ALBERKA ENTERPRISES BUYER'S ASSURANCE
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-zinc-950">
                Why Buy Your {currentHub.name} from Alberka Enterprises Limited?
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
              <div className="space-y-2">
                <span className="font-mono text-xs font-bold text-red-600">01 · ODOMETER INTEGRITY</span>
                <h4 className="text-base font-bold text-zinc-950">JEVIC Certified Mileage</h4>
                <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed font-normal">
                  Every {currentHub.name} arrives with official Japanese export documentation confirming genuine odometer readings.
                </p>
              </div>
              <div className="space-y-2">
                <span className="font-mono text-xs font-bold text-red-600">02 · WORKSHOP OVERHAUL</span>
                <h4 className="text-base font-bold text-zinc-950">100-Point Pre-Delivery Check</h4>
                <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed font-normal">
                  Inspected and prepared next to Ganjoni Primary School, Mombasa with synthetic fluids and suspension diagnosis.
                </p>
              </div>
              <div className="space-y-2">
                <span className="font-mono text-xs font-bold text-red-600">03 · IMPORT DOSSIER</span>
                <h4 className="text-base font-bold text-zinc-950">Complete Japanese Export Dossier</h4>
                <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed font-normal">
                  Every vehicle is handed over with original export certificate, JEVIC mileage verification, and KRA customs clearance docs.
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
};
