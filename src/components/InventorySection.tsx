import React, { useState, useMemo, useEffect } from 'react';
import {
  Search,
  X,
  ArrowRight,
  ArrowUpDown,
  Filter,
  RotateCcw,
  Check,
  ChevronDown,
  ShieldCheck,
  MapPin,
  Car
} from 'lucide-react';
import { Vehicle } from '../data/vehicles';
import { VehicleSbtListCard, VehicleSbtListCardSkeleton } from './VehicleSbtListCard';
import { CmsPage } from '../services/cmsContent';
import type { HeroSearchFilters } from './Hero';
import { CategoryFilterSlider, CATEGORY_OPTIONS } from './CategoryFilterSlider';
import { BodyTypeFilterSlider, BODY_TYPE_OPTIONS } from './BodyTypeFilterSlider';

interface InventorySectionProps {
  vehicles: Vehicle[];
  favorites: string[];
  onToggleFavorite: (id: string) => void;
  onSelectVehicle: (vehicle: Vehicle) => void;
  onInquire?: (vehicle: Vehicle) => void;
  onCustomImportRequest: () => void;
  isLoading?: boolean;
  pageData?: CmsPage;
  initialFilters?: HeroSearchFilters | null;
}

export const InventorySection: React.FC<InventorySectionProps> = ({
  vehicles,
  favorites,
  onToggleFavorite,
  onSelectVehicle,
  onInquire,
  onCustomImportRequest,
  isLoading = false,
  pageData,
  initialFilters,
}) => {
  // SBT Japan-style faceted search state
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeMake, setActiveMake] = useState<string>('all');
  const [activeBodyType, setActiveBodyType] = useState<string>('all');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [filterTab, setFilterTab] = useState<'bodyType' | 'category'>('bodyType');
  const [priceRange, setPriceRange] = useState<string>('all');
  const [transmissionFilter, setTransmissionFilter] = useState<string>('all');
  const [drivetrainFilter, setDrivetrainFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'year' | 'mileage'>('featured');
  const [mobileFilterOpen, setMobileFilterOpen] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(10);
  const [heroBudget, setHeroBudget] = useState<string>('');

  // Apply filters submitted from the home-page hero search bar
  useEffect(() => {
    if (!initialFilters) return;
    setSearchQuery(initialFilters.make || '');
    setActiveMake('all');
    setActiveBodyType(
      initialFilters.bodyType === 'suv' ? 'suv' :
      initialFilters.bodyType === 'van' ? 'van' : 'all'
    );
    setActiveCategory(
      initialFilters.bodyType === 'awd' ? '4wd' :
      initialFilters.bodyType === 'hybrid' ? 'hybrid' : 'all'
    );
    setHeroBudget(initialFilters.budget || '');
    setPriceRange('all');
    setCurrentPage(1);
  }, [initialFilters]);

  // Reset to page 1 whenever search or filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [activeMake, activeBodyType, activeCategory, priceRange, transmissionFilter, drivetrainFilter, searchQuery, sortBy, heroBudget]);

  // Curated Comprehensive Automakers list (with authentic SBT Japan maker logos)
  const makes = useMemo(() => {
    const popularMakers = [
      { id: 'all', label: 'All Fleet & Makes' },
      { id: 'toyota', label: 'Toyota' },
      { id: 'nissan', label: 'Nissan' },
      { id: 'subaru', label: 'Subaru' },
      { id: 'suzuki', label: 'Suzuki' },
      { id: 'volvo', label: 'Volvo' },
      { id: 'mazda', label: 'Mazda' },
      { id: 'honda', label: 'Honda' },
      { id: 'mitsubishi', label: 'Mitsubishi' },
      { id: 'lexus', label: 'Lexus' },
      { id: 'mercedes', label: 'Mercedes-Benz' },
      { id: 'bmw', label: 'BMW' },
      { id: 'volkswagen', label: 'Volkswagen' },
      { id: 'audi', label: 'Audi' },
      { id: 'landrover', label: 'Land Rover' },
      { id: 'isuzu', label: 'Isuzu' },
      { id: 'daihatsu', label: 'Daihatsu' },
      { id: 'hyundai', label: 'Hyundai' },
      { id: 'porsche', label: 'Porsche' },
      { id: 'ford', label: 'Ford' },
      { id: 'peugeot', label: 'Peugeot' },
      { id: 'jeep', label: 'Jeep' },
      { id: 'kia', label: 'Kia' },
    ];

    return popularMakers.map((m) => {
      if (m.id === 'all') {
        return { ...m, count: vehicles.length };
      }
      const count = vehicles.filter((v) => {
        const nameLower = v.name.toLowerCase();
        if (m.id === 'mercedes') return nameLower.includes('mercedes') || nameLower.includes('benz');
        if (m.id === 'landrover') return nameLower.includes('land') || nameLower.includes('rover');
        return nameLower.includes(m.id);
      }).length;
      return { ...m, count };
    });
  }, [vehicles]);

  // Dynamic Body Type Counts in Local Mombasa Stock
  const bodyTypeLocalCounts = useMemo<Record<string, number>>(() => {
    return {
      all: vehicles.length,
      suv: vehicles.filter((v) => v.bodyType.toLowerCase() === 'suv' || v.category === 'suv').length,
      van: vehicles.filter((v) => v.bodyType.toLowerCase() === 'van' || v.category === 'van').length,
      'mini-van': vehicles.filter((v) => v.bodyType.toLowerCase().includes('mini') || v.category === 'minivan').length,
      sedan: vehicles.filter((v) => v.bodyType.toLowerCase() === 'sedan' || v.category === 'sedan').length,
      hatchback: vehicles.filter((v) => v.bodyType.toLowerCase().includes('hatch') || v.category === 'hatchback').length,
      wagon: vehicles.filter((v) => v.bodyType.toLowerCase().includes('wagon') || v.category === 'wagon').length,
      'pick-up': vehicles.filter((v) => v.bodyType.toLowerCase().includes('pickup') || v.bodyType.toLowerCase().includes('pick-up') || v.category === 'pickup').length,
      truck: vehicles.filter((v) => v.bodyType.toLowerCase().includes('truck') || v.category === 'truck').length,
      convertible: vehicles.filter((v) => v.bodyType.toLowerCase().includes('convertible') || v.bodyType.toLowerCase().includes('cabriolet')).length,
      coupe: vehicles.filter((v) => v.bodyType.toLowerCase().includes('coupe')).length,
      bus: vehicles.filter((v) => v.bodyType.toLowerCase().includes('bus')).length,
      'heavy-equipment': vehicles.filter((v) => v.bodyType.toLowerCase().includes('heavy') || v.category === 'heavy').length,
    };
  }, [vehicles]);

  // Dynamic Category Counts in Local Mombasa Stock
  const categoryLocalCounts = useMemo<Record<string, number>>(() => {
    return {
      all: vehicles.length,
      hybrid: vehicles.filter((v) => v.category === 'hybrid' || v.fuelType.toLowerCase().includes('hybrid') || v.fuelType.toLowerCase().includes('power')).length,
      lhd: vehicles.filter((v) => v.steering === 'LHD').length,
      manual: vehicles.filter((v) => v.transmission.toLowerCase().includes('manual') || v.transmission.toLowerCase().includes('mt')).length,
      '4wd': vehicles.filter((v) => v.drivetrain.toLowerCase().includes('4wd') || v.drivetrain.toLowerCase().includes('awd') || v.drivetrain.toLowerCase().includes('4x4')).length,
      electric: vehicles.filter((v) => v.fuelType.toLowerCase().includes('electric') || v.fuelType.toLowerCase().includes('ev')).length,
      sunroof: vehicles.filter((v) => v.options?.sunroof === true || v.sbtOptions?.sunroof === true || (v.features && v.features.some((f) => f.toLowerCase().includes('sunroof') || f.toLowerCase().includes('moonroof')))).length,
      diesel: vehicles.filter((v) => v.fuelType.toLowerCase().includes('diesel')).length,
      kei: vehicles.filter((v) => v.category === 'compact' || v.category === 'van' || v.bodyType.toLowerCase().includes('kei') || v.engine.toLowerCase().includes('660') || (parseInt(v.engine) > 0 && parseInt(v.engine) <= 1200)).length,
    };
  }, [vehicles]);

  // Price ranges (KES)
  const priceRanges = [
    { id: 'all', label: 'All Price Ranges' },
    { id: 'under-2m', label: 'Under KES 2,000,000', min: 0, max: 2000000 },
    { id: '2m-3.5m', label: 'KES 2.0M – 3.5M', min: 2000000, max: 3500000 },
    { id: '3.5m-4.5m', label: 'KES 3.5M – 4.5M', min: 3500000, max: 4500000 },
    { id: 'above-4.5m', label: 'KES 4.5M+', min: 4500000, max: Infinity },
  ];

  // Active filter count
  const activeFilterCount = (
    (activeMake !== 'all' ? 1 : 0) +
    (activeBodyType !== 'all' ? 1 : 0) +
    (activeCategory !== 'all' ? 1 : 0) +
    (priceRange !== 'all' ? 1 : 0) +
    (transmissionFilter !== 'all' ? 1 : 0) +
    (drivetrainFilter !== 'all' ? 1 : 0) +
    (searchQuery.trim() !== '' ? 1 : 0) +
    (heroBudget !== '' ? 1 : 0)
  );

  const resetAllFilters = () => {
    setActiveMake('all');
    setActiveBodyType('all');
    setActiveCategory('all');
    setPriceRange('all');
    setTransmissionFilter('all');
    setDrivetrainFilter('all');
    setSearchQuery('');
    setHeroBudget('');
    setSortBy('featured');
  };

  const filteredVehicles = useMemo(() => {
    return vehicles
      .filter((v) => {
        // Body Type Filter
        if (activeBodyType === 'all') return true;
        if (activeBodyType === 'suv') return v.bodyType.toLowerCase() === 'suv' || v.category === 'suv';
        if (activeBodyType === 'van') return v.bodyType.toLowerCase() === 'van' || v.category === 'van';
        if (activeBodyType === 'mini-van') return v.bodyType.toLowerCase().includes('mini') || v.category === 'minivan';
        if (activeBodyType === 'sedan') return v.bodyType.toLowerCase() === 'sedan' || v.category === 'sedan';
        if (activeBodyType === 'hatchback') return v.bodyType.toLowerCase().includes('hatch') || v.category === 'hatchback';
        if (activeBodyType === 'wagon') return v.bodyType.toLowerCase().includes('wagon') || v.category === 'wagon';
        if (activeBodyType === 'pick-up') return v.bodyType.toLowerCase().includes('pickup') || v.bodyType.toLowerCase().includes('pick-up') || v.category === 'pickup';
        if (activeBodyType === 'truck') return v.bodyType.toLowerCase().includes('truck') || v.category === 'truck';
        if (activeBodyType === 'convertible') return v.bodyType.toLowerCase().includes('convertible') || v.bodyType.toLowerCase().includes('cabriolet');
        if (activeBodyType === 'coupe') return v.bodyType.toLowerCase().includes('coupe');
        if (activeBodyType === 'bus') return v.bodyType.toLowerCase().includes('bus');
        if (activeBodyType === 'heavy-equipment') return v.bodyType.toLowerCase().includes('heavy') || v.category === 'heavy';
        return v.bodyType.toLowerCase() === activeBodyType.toLowerCase();
      })
      .filter((v) => {
        // Category Filter with Authentic Japanese SVGs & Attributes
        if (activeCategory === 'all') return true;
        if (activeCategory === 'hybrid') {
          return v.category === 'hybrid' || v.fuelType.toLowerCase().includes('hybrid') || v.fuelType.toLowerCase().includes('power');
        }
        if (activeCategory === 'lhd') {
          return v.steering === 'LHD';
        }
        if (activeCategory === 'manual') {
          return v.transmission.toLowerCase().includes('manual') || v.transmission.toLowerCase().includes('mt');
        }
        if (activeCategory === '4wd') {
          return v.drivetrain.toLowerCase().includes('4wd') || v.drivetrain.toLowerCase().includes('awd') || v.drivetrain.toLowerCase().includes('4x4');
        }
        if (activeCategory === 'electric') {
          return v.fuelType.toLowerCase().includes('electric') || v.fuelType.toLowerCase().includes('ev');
        }
        if (activeCategory === 'sunroof') {
          return v.options?.sunroof === true || v.sbtOptions?.sunroof === true || (v.features && v.features.some((f) => f.toLowerCase().includes('sunroof') || f.toLowerCase().includes('moonroof')));
        }
        if (activeCategory === 'diesel') {
          return v.fuelType.toLowerCase().includes('diesel');
        }
        if (activeCategory === 'kei') {
          return v.category === 'compact' || v.category === 'van' || v.bodyType.toLowerCase().includes('kei') || v.engine.includes('660') || (parseInt(v.engine) > 0 && parseInt(v.engine) <= 1200);
        }
        return v.category === activeCategory;
      })
      .filter((v) => {
        // Make
        if (activeMake === 'all') return true;
        const nameLower = v.name.toLowerCase();
        if (activeMake === 'mercedes') return nameLower.includes('mercedes') || nameLower.includes('benz');
        if (activeMake === 'landrover') return nameLower.includes('land') || nameLower.includes('rover');
        return nameLower.includes(activeMake.toLowerCase());
      })
      .filter((v) => {
        // Price Range
        if (priceRange === 'all') return true;
        const range = priceRanges.find((r) => r.id === priceRange);
        if (!range || range.min === undefined) return true;
        return v.priceKes >= range.min && v.priceKes < range.max;
      })
      .filter((v) => {
        // Budget submitted from the hero search bar
        if (!heroBudget) return true;
        if (heroBudget === 'luxury') return v.priceKes >= 4500000;
        return v.priceKes < Number(heroBudget);
      })
      .filter((v) => {
        // Transmission
        if (transmissionFilter === 'all') return true;
        return v.transmission.toLowerCase().includes(transmissionFilter.toLowerCase());
      })
      .filter((v) => {
        // Drivetrain
        if (drivetrainFilter === 'all') return true;
        return v.drivetrain.toLowerCase().includes(drivetrainFilter.toLowerCase());
      })
      .filter((v) => {
        // Search query
        if (!searchQuery.trim()) return true;
        const q = searchQuery.toLowerCase();
        return (
          v.name.toLowerCase().includes(q) ||
          v.stockNo.toLowerCase().includes(q) ||
          (v.sbtStockId && v.sbtStockId.toLowerCase().includes(q)) ||
          v.tagline.toLowerCase().includes(q) ||
          v.bodyType.toLowerCase().includes(q) ||
          v.engine.toLowerCase().includes(q) ||
          v.chassisNo.toLowerCase().includes(q)
        );
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.priceKes - b.priceKes;
        if (sortBy === 'price-desc') return b.priceKes - a.priceKes;
        if (sortBy === 'year') return b.year - a.year;
        if (sortBy === 'mileage') return a.mileageKm - b.mileageKm;
        return 0;
      });
  }, [vehicles, activeBodyType, activeCategory, activeMake, priceRange, transmissionFilter, drivetrainFilter, searchQuery, sortBy, heroBudget]);

  // SBT Japan Pagination Slicing
  const totalPages = Math.ceil(filteredVehicles.length / itemsPerPage) || 1;
  const paginatedVehicles = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredVehicles.slice(start, start + itemsPerPage);
  }, [filteredVehicles, currentPage, itemsPerPage]);

  // Reusable Filter Controls for both Desktop Sidebar and Mobile Sheet Drawer
  const renderFilterControls = () => (
    <div className="space-y-6 text-left">
      {/* 1. Keyword Search Box */}
      <div className="space-y-1.5">
        <label className="text-[11px] font-mono uppercase tracking-wider text-[#6a6a6a] font-medium block">
          Search Vehicle
        </label>
        <div className="relative bg-white border border-[#ebebeb] focus-within:border-[#222222] focus-within:shadow-2xs rounded-full px-3.5 py-2 flex items-center gap-2 transition-all">
          <Search className="w-3.5 h-3.5 text-[#6a6a6a] shrink-0" />
          <input
            type="text"
            placeholder="Make, model, stock ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-transparent text-xs font-medium text-[#222222] placeholder:text-[#6a6a6a] focus:outline-none"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="p-0.5 text-[#6a6a6a] hover:text-[#222222] cursor-pointer"
            >
              <X className="w-3 h-3" />
            </button>
          )}
        </div>
        {heroBudget && (
          <button
            onClick={() => setHeroBudget('')}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#DC2626]/10 border border-[#DC2626]/20 text-[10px] font-semibold text-[#DC2626] cursor-pointer"
          >
            {heroBudget === 'luxury'
              ? 'KES 4.5M+'
              : `Under KES ${(Number(heroBudget) / 1000000).toFixed(1)}M`}
            <X className="w-3 h-3" />
          </button>
        )}
      </div>

      {/* 2. Body Type Filter with Authentic SBT Japan Silhouettes */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-[11px] font-mono uppercase tracking-wider text-[#6a6a6a] font-semibold block">
            Body Type
          </label>
          {activeBodyType !== 'all' && (
            <button
              onClick={() => setActiveBodyType('all')}
              className="text-[11px] font-mono text-[#6a6a6a] hover:text-[#222222] font-medium cursor-pointer"
            >
              Show All
            </button>
          )}
        </div>
        <div className="space-y-1 max-h-56 overflow-y-auto pr-1 no-scrollbar">
          {BODY_TYPE_OPTIONS.map((bt) => {
            const isSelected = activeBodyType === bt.id;
            const count = bodyTypeLocalCounts[bt.id] || 0;
            return (
              <button
                key={bt.id}
                onClick={() => setActiveBodyType(bt.id)}
                className={`w-full flex items-center justify-between p-2 rounded-xl text-xs transition-all cursor-pointer text-left group ${
                  isSelected
                    ? 'bg-[#222222] text-white font-semibold shadow-xs'
                    : 'bg-[#f7f7f7]/80 hover:bg-[#ebebeb] text-[#222222] font-medium border border-transparent'
                }`}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className={`w-8 h-6 rounded-md border flex items-center justify-center shrink-0 p-0.5 transition-all ${
                    isSelected 
                      ? 'bg-white/10 border-white/20 text-white' 
                      : 'bg-white border-[#ebebeb] group-hover:border-[#dddddd]'
                  }`}>
                    {bt.iconSrc ? (
                      <img
                        src={bt.iconSrc}
                        alt={bt.name}
                        className={`w-full h-full object-contain ${isSelected ? 'scale-105 brightness-0 invert' : 'group-hover:scale-105'}`}
                      />
                    ) : (
                      <Car className={`w-3.5 h-3.5 ${isSelected ? 'text-white' : 'text-[#6a6a6a]'}`} />
                    )}
                  </div>
                  <span className="truncate font-medium">{bt.name}</span>
                </div>
                <span className={`font-mono text-[10px] px-1.5 py-0.5 rounded ${
                  isSelected
                    ? 'bg-white/20 text-white font-semibold'
                    : count > 0
                      ? 'bg-white text-[#6a6a6a] font-medium border border-[#ebebeb]'
                      : 'text-[#c1c1c1] font-normal'
                }`}>
                  {bt.id === 'all' ? `${count}` : count > 0 ? `${count} in stock` : 'Order'}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Make / Brand Filter with High-Resolution Maker Logos */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-[11px] font-mono uppercase tracking-wider text-[#6a6a6a] font-semibold block">
            Make / Manufacturer
          </label>
          {activeMake !== 'all' && (
            <button
              onClick={() => setActiveMake('all')}
              className="text-[11px] font-mono text-[#6a6a6a] hover:text-[#222222] font-medium cursor-pointer"
            >
              Show All
            </button>
          )}
        </div>
        <div className="space-y-1.5 max-h-80 overflow-y-auto pr-1 no-scrollbar">
          {makes.map((m) => {
            const isSelected = activeMake === m.id;
            const logoSrc = m.id !== 'all' ? `/logos/${m.id}.png` : null;
            return (
              <button
                key={m.id}
                onClick={() => setActiveMake(m.id)}
                className={`w-full flex items-center justify-between p-2 rounded-xl text-xs transition-all cursor-pointer text-left group ${
                  isSelected
                    ? 'bg-[#222222] text-white font-semibold shadow-xs'
                    : 'bg-[#f7f7f7]/80 hover:bg-[#ebebeb] text-[#222222] font-medium border border-transparent'
                }`}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className={`w-8 h-8 rounded-lg border flex items-center justify-center shrink-0 p-1 transition-all ${
                    isSelected 
                      ? 'bg-white text-[#222222] shadow-2xs border-white' 
                      : 'bg-white border-[#ebebeb] group-hover:border-[#dddddd]'
                  }`}>
                    {logoSrc ? (
                      <img
                        src={logoSrc}
                        alt={m.label}
                        className={`w-6 h-6 object-contain transition-all duration-300 ${
                          isSelected
                            ? 'grayscale-0 scale-105'
                            : 'grayscale opacity-75 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-110'
                        }`}
                        onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }}
                      />
                    ) : (
                      <Car className={`w-4 h-4 ${isSelected ? 'text-[#222222]' : 'text-[#6a6a6a] group-hover:text-[#222222]'}`} />
                    )}
                  </div>
                  <span className="capitalize truncate font-medium">{m.label}</span>
                </div>
                <span className={`font-mono text-[10px] px-1.5 py-0.5 rounded ${
                  isSelected
                    ? 'bg-white/20 text-white font-semibold'
                    : m.count > 0
                      ? 'bg-white text-[#6a6a6a] font-medium border border-[#ebebeb]'
                      : 'text-[#c1c1c1] font-normal'
                }`}>
                  {m.id === 'all' ? `${m.count}` : m.count > 0 ? `${m.count} in stock` : 'Order'}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Category & Feature Filter with Authentic Japanese Automotive SVGs */}
      <div className="space-y-2 pt-2 border-t border-[#ebebeb]">
        <label className="text-[11px] font-mono uppercase tracking-wider text-[#6a6a6a] font-semibold block">
          Japanese Export Categories
        </label>
        <div className="space-y-1">
          {CATEGORY_OPTIONS.map((c) => {
            const isSelected = activeCategory === c.id;
            const Icon = c.icon;
            const localCount = categoryLocalCounts[c.id] || 0;
            return (
              <button
                key={c.id}
                onClick={() => setActiveCategory(c.id)}
                className={`w-full flex items-center justify-between px-2.5 py-2 rounded-xl text-xs transition-all cursor-pointer text-left ${
                  isSelected
                    ? 'bg-[#222222] text-white font-semibold shadow-xs'
                    : 'bg-[#f7f7f7]/80 hover:bg-[#ebebeb] text-[#222222] font-medium border border-transparent'
                }`}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                    isSelected ? 'bg-white/15 text-white' : 'bg-white text-[#6a6a6a] border border-[#ebebeb]'
                  }`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="truncate font-medium">{c.name}</span>
                </div>
                <span className={`font-mono text-[10.5px] shrink-0 ml-2 ${isSelected ? 'text-white/80 font-semibold' : 'text-[#6a6a6a]'}`}>
                  ({localCount})
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 4. Price Range Filter */}
      <div className="space-y-2 pt-2 border-t border-[#ebebeb]">
        <label className="text-[11px] font-mono uppercase tracking-wider text-[#6a6a6a] font-semibold block">
          Delivered Cash Price (KES)
        </label>
        <div className="space-y-1">
          {priceRanges.map((pr) => {
            const isSelected = priceRange === pr.id;
            return (
              <button
                key={pr.id}
                onClick={() => setPriceRange(pr.id)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs transition-colors cursor-pointer text-left ${
                  isSelected
                    ? 'bg-[#222222] text-white font-semibold shadow-xs'
                    : 'bg-[#f7f7f7]/80 hover:bg-[#ebebeb] text-[#222222] font-medium border border-transparent'
                }`}
              >
                <span className="font-medium">{pr.label}</span>
                {isSelected && <Check className="w-3.5 h-3.5 text-white" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* 5. Drivetrain & Transmission */}
      <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#ebebeb]">
        <div className="space-y-1">
          <label className="text-[10px] font-mono uppercase tracking-wider text-[#6a6a6a] font-semibold block">
            Drive
          </label>
          <select
            value={drivetrainFilter}
            onChange={(e) => setDrivetrainFilter(e.target.value)}
            className="w-full bg-[#f7f7f7] border border-[#ebebeb] rounded-lg text-xs font-mono py-1.5 px-2 text-[#222222] focus:outline-none focus:border-[#222222] focus:ring-1 focus:ring-[#222222] cursor-pointer"
          >
            <option value="all">All Drive</option>
            <option value="2wd">2WD</option>
            <option value="4wd">4WD / AWD</option>
          </select>
        </div>

        <div className="space-y-1">
          <label className="text-[10px] font-mono uppercase tracking-wider text-[#6a6a6a] font-semibold block">
            Transmission
          </label>
          <select
            value={transmissionFilter}
            onChange={(e) => setTransmissionFilter(e.target.value)}
            className="w-full bg-[#f7f7f7] border border-[#ebebeb] rounded-lg text-xs font-mono py-1.5 px-2 text-[#222222] focus:outline-none focus:border-[#222222] focus:ring-1 focus:ring-[#222222] cursor-pointer"
          >
            <option value="all">All Trans</option>
            <option value="auto">Automatic</option>
            <option value="cvt">CVT</option>
            <option value="manual">Manual</option>
          </select>
        </div>
      </div>

      {/* Showroom Yard Informational Note (Sole Office) */}
      <div className="pt-3 border-t border-[#ebebeb] space-y-1 text-xs">
        <div className="flex items-center gap-1.5 text-[#222222] font-semibold">
          <MapPin className="w-3.5 h-3.5 text-[#222222] shrink-0" />
          <span>Mombasa Showroom (Sole Office)</span>
        </div>
        <p className="text-[11px] text-[#6a6a6a] leading-normal">
          Next to Ganjoni Primary School, Archbishop Makarios Rd, Mombasa. Inspect units on mechanical lift.
        </p>
      </div>
    </div>
  );

  return (
    <section className="w-full bg-[#f7f7f7] text-[#222222] relative min-h-screen">
      
      {/* 1. Header Banner */}
      <div className="pt-10 sm:pt-14 pb-6 px-4 sm:px-6 lg:px-10 xl:px-14 2xl:px-16 max-w-[1920px] 2xl:max-w-[2160px] mx-auto text-left space-y-2 border-b border-[#ebebeb]">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <span className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-[#DC2626] font-bold block mb-1">
              {pageData?.badge || 'VERIFIED INVENTORY · SBT JAPAN DIRECT SOURCED'}
            </span>
            <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold text-[#222222] tracking-tight leading-tight">
              {pageData?.heroTitle || 'Used Cars in Stock'}
            </h1>
            <p className="text-xs sm:text-sm text-[#6a6a6a] mt-1 max-w-2xl font-normal leading-relaxed">
              {pageData?.heroSubtitle || 'Browse direct Japanese export units in Mombasa. All vehicles inspected, cleared through KRA customs duty, and ready for immediate delivery.'}
            </p>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono font-medium bg-white border border-[#ebebeb] text-[#222222] shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-[#DC2626] animate-pulse" />
              <span>{vehicles.length} Units Available in Mombasa</span>
            </span>
          </div>
        </div>
      </div>

      {/* 2. SBT Japan 2-Column Search Layout: Left Filter Column + Right Vehicle List */}
      <div className="max-w-[1920px] 2xl:max-w-[2160px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-14 2xl:px-16 py-8 sm:py-10">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          
          {/* DESKTOP LEFT COLUMN: SBT JAPAN SEARCH & FILTER SIDEBAR */}
          <aside className="hidden lg:block w-72 xl:w-80 2xl:w-88 shrink-0 space-y-5 text-left">
            <div className="bg-white border border-[#ebebeb] rounded-[16px] p-4 sm:p-5 shadow-[0_1px_2px_rgba(0,0,0,0.08),0_4px_12px_rgba(0,0,0,0.05)] space-y-5 lg:sticky lg:top-24">
              
              {/* Sidebar Header */}
              <div className="flex items-center justify-between pb-3 border-b border-[#ebebeb]">
                <div className="flex items-center gap-2">
                  <Filter className="w-4 h-4 text-[#222222]" />
                  <h3 className="font-mono text-xs font-semibold text-[#222222] uppercase tracking-wider">
                    Filter Fleet
                  </h3>
                </div>
                {activeFilterCount > 0 && (
                  <button
                    onClick={resetAllFilters}
                    className="text-[11px] font-mono text-[#6a6a6a] hover:text-[#222222] font-medium cursor-pointer inline-flex items-center gap-1"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>Reset ({activeFilterCount})</span>
                  </button>
                )}
              </div>

              {/* Render Desktop Filter Controls */}
              {renderFilterControls()}

            </div>
          </aside>

          {/* MOBILE OFF-CANVAS FILTER DRAWER (Slide-over with dark backdrop) */}
          {mobileFilterOpen && (
            <div className="fixed inset-0 z-50 lg:hidden flex justify-end">
              {/* Backdrop overlay */}
              <div
                className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity duration-300"
                onClick={() => setMobileFilterOpen(false)}
                aria-hidden="true"
              />

              {/* Off-canvas Sheet */}
              <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col z-10 text-left">
                {/* Drawer Header */}
                <div className="px-5 py-4 border-b border-[#ebebeb] flex items-center justify-between bg-white shrink-0">
                  <div className="flex items-center gap-2">
                    <Filter className="w-4 h-4 text-[#222222]" />
                    <h3 className="font-semibold text-sm text-[#222222] uppercase tracking-wider font-mono">
                      Filter Vehicle Fleet
                    </h3>
                    {activeFilterCount > 0 && (
                      <span className="bg-[#222222] text-white text-[10px] font-mono px-2 py-0.5 rounded-full font-bold">
                        {activeFilterCount}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    {activeFilterCount > 0 && (
                      <button
                        onClick={resetAllFilters}
                        className="text-xs font-mono text-[#6a6a6a] hover:text-[#222222] font-semibold cursor-pointer px-2 py-1"
                      >
                        Reset
                      </button>
                    )}
                    <button
                      onClick={() => setMobileFilterOpen(false)}
                      className="w-8 h-8 rounded-full bg-[#f7f7f7] border border-[#ebebeb] hover:bg-[#ebebeb] text-[#222222] flex items-center justify-center transition-colors cursor-pointer"
                      aria-label="Close filters"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Drawer Scrollable Content */}
                <div className="flex-1 overflow-y-auto p-5 space-y-6">
                  {renderFilterControls()}
                </div>

                {/* Drawer Footer with Sticky Apply Button */}
                <div className="p-4 border-t border-[#ebebeb] bg-white shrink-0 shadow-lg">
                  <button
                    onClick={() => setMobileFilterOpen(false)}
                    className="w-full bg-[#222222] hover:bg-black text-white font-medium py-3.5 px-4 rounded-full text-xs sm:text-sm flex items-center justify-center gap-2 shadow-sm cursor-pointer transition-all active:scale-[0.98]"
                  >
                    <span>Show {filteredVehicles.length} Verified Vehicles</span>
                    <Check className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* RIGHT COLUMN: SEARCH RESULTS & SBT LIST VIEW ONLY (NO GRID) */}
          <main className="flex-1 min-w-0 w-full space-y-5 text-left">
            
            {/* Minimal Mobile Filters & Sort Bar */}
            <div className="flex items-center justify-between gap-3 pb-1">
              {/* White Background Filter Button (Mobile Only) */}
              <button
                onClick={() => setMobileFilterOpen(true)}
                className="lg:hidden inline-flex items-center gap-2 px-3.5 py-2 bg-white hover:bg-[#f7f7f7] text-[#222222] border border-[#ebebeb] rounded-full text-xs font-medium transition-all shadow-2xs cursor-pointer active:scale-95"
              >
                <Filter className="w-3.5 h-3.5 text-[#222222]" />
                <span>Filters</span>
                {activeFilterCount > 0 && (
                  <span className="bg-[#222222] text-white text-[10px] font-mono px-1.5 py-0.2 rounded-full font-bold">
                    {activeFilterCount}
                  </span>
                )}
              </button>

              {/* Discreet Sort By (Aligned Right) */}
              <div className="flex items-center gap-2 ml-auto">
                <span className="text-xs font-mono text-[#6a6a6a] uppercase font-medium hidden sm:inline">
                  Sort:
                </span>
                <div className="flex items-center gap-1.5 bg-white border border-[#ebebeb] rounded-full px-3 py-1.5 shadow-2xs">
                  <ArrowUpDown className="w-3.5 h-3.5 text-[#6a6a6a]" />
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    aria-label="Sort vehicles"
                    className="bg-transparent text-xs font-mono font-medium text-[#222222] focus:outline-none cursor-pointer pr-1"
                  >
                    <option value="featured">Featured Provenance</option>
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                    <option value="year">Newest Year</option>
                    <option value="mileage">Lowest Mileage</option>
                  </select>
                </div>
              </div>
            </div>

            {/* SBT LIST VIEW ONLY (NO GRID) */}
            {isLoading ? (
              <div className="space-y-4 sm:space-y-5">
                {[...Array(4)].map((_, i) => (
                  <VehicleSbtListCardSkeleton key={i} />
                ))}
              </div>
            ) : filteredVehicles.length > 0 ? (
              <div className="space-y-4 sm:space-y-5">
                <div className="space-y-4 sm:space-y-5">
                  {paginatedVehicles.map((vehicle) => (
                    <VehicleSbtListCard
                      key={vehicle.id}
                      vehicle={vehicle}
                      isFavorite={favorites.includes(vehicle.id)}
                      onToggleFavorite={onToggleFavorite}
                      onSelect={onSelectVehicle}
                      onInquire={onInquire}
                    />
                  ))}
                </div>

                {/* SBT Japan Pagination Bar */}
                <div className="bg-white border border-[#ebebeb] rounded-[16px] p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-[0_1px_2px_rgba(0,0,0,0.08),0_4px_12px_rgba(0,0,0,0.05)] text-xs font-mono">
                  {/* Left: Showing range */}
                  <div className="text-[#6a6a6a]">
                    Showing <span className="font-semibold text-[#222222]">{Math.min((currentPage - 1) * itemsPerPage + 1, filteredVehicles.length)}</span> to{' '}
                    <span className="font-semibold text-[#222222]">{Math.min(currentPage * itemsPerPage, filteredVehicles.length)}</span> of{' '}
                    <span className="font-semibold text-[#222222]">{filteredVehicles.length}</span> units
                  </div>

                  {/* Center: Page numbers & Previous / Next */}
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                      disabled={currentPage === 1}
                      className="px-3 py-1.5 rounded-lg border border-[#ebebeb] bg-white hover:bg-[#f7f7f7] text-[#222222] disabled:opacity-30 disabled:pointer-events-none transition-all cursor-pointer font-medium"
                      aria-label="Previous page"
                    >
                      Prev
                    </button>

                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`w-8 h-8 rounded-lg font-semibold text-xs flex items-center justify-center transition-all cursor-pointer ${
                          currentPage === page
                            ? 'bg-[#222222] text-white shadow-xs'
                            : 'bg-white border border-[#ebebeb] text-[#222222] hover:bg-[#f7f7f7]'
                        }`}
                      >
                        {page}
                      </button>
                    ))}

                    <button
                      onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                      disabled={currentPage === totalPages}
                      className="px-3 py-1.5 rounded-lg border border-[#ebebeb] bg-white hover:bg-[#f7f7f7] text-[#222222] disabled:opacity-30 disabled:pointer-events-none transition-all cursor-pointer font-medium"
                      aria-label="Next page"
                    >
                      Next
                    </button>
                  </div>

                  {/* Right: Items per page selector */}
                  <div className="flex items-center gap-2">
                    <span className="text-[#6a6a6a] uppercase">Per page:</span>
                    <select
                      value={itemsPerPage}
                      onChange={(e) => {
                        setItemsPerPage(Number(e.target.value));
                        setCurrentPage(1);
                      }}
                      className="bg-[#f7f7f7] border border-[#ebebeb] rounded-lg px-2.5 py-1 text-xs font-mono text-[#222222] focus:outline-none cursor-pointer"
                    >
                      <option value={5}>5</option>
                      <option value={10}>10</option>
                      <option value={25}>25</option>
                      <option value={50}>50</option>
                    </select>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-20 bg-white border border-[#ebebeb] rounded-[16px] p-8 space-y-4 max-w-xl mx-auto shadow-[0_1px_2px_rgba(0,0,0,0.08),0_4px_12px_rgba(0,0,0,0.05)]">
                <div className="w-12 h-12 rounded-full bg-[#f7f7f7] border border-[#ebebeb] flex items-center justify-center mx-auto text-[#222222]">
                  <Search className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold text-[#222222] tracking-tight">
                  No vehicles match your active criteria
                </h3>
                <p className="text-xs sm:text-sm text-[#6a6a6a] max-w-sm mx-auto leading-relaxed">
                  We replenish our Mombasa showroom weekly with direct Japanese auction shipments. Let our Tokyo desk source your preferred car on order.
                </p>
                <div className="pt-2 flex items-center justify-center gap-3">
                  <button
                    onClick={resetAllFilters}
                    className="px-4 py-2 text-xs font-medium text-[#222222] border border-[#ebebeb] hover:bg-[#f7f7f7] rounded-full transition-colors cursor-pointer"
                  >
                    Reset All Filters
                  </button>
                  <button
                    onClick={onCustomImportRequest}
                    className="bg-[#222222] hover:bg-black text-white font-medium text-xs py-2 px-5 rounded-full cursor-pointer shadow-sm transition-all"
                  >
                    Order from Japan
                  </button>
                </div>
              </div>
            )}

            {/* Custom Auction Order Banner at the bottom of the list */}
            <div className="relative bg-white border border-[#ebebeb] rounded-[16px] p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-[0_1px_2px_rgba(0,0,0,0.08),0_4px_12px_rgba(0,0,0,0.05)] text-left mt-10">
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[10.5px] text-[#6a6a6a] uppercase tracking-[0.2em] font-semibold">
                    CANNOT FIND YOUR EXACT TRIM?
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-semibold text-[#222222] tracking-tight">
                  Import Any Vehicle on Custom Order from Tokyo
                </h3>
                <p className="text-xs sm:text-sm text-[#6a6a6a] max-w-xl leading-relaxed">
                  Our Japanese agents bid on your behalf at USS Tokyo and CAA Chubu. We manage container shipping, KRA customs clearance, and port handover directly at our Mombasa yard.
                </p>
              </div>

              <a
                href="https://wa.me/254180423075?text=Hello%20Alberka%20Enterprises,%20I%20am%20looking%20to%20order%20a%20specific%20vehicle%20from%20Japanese%20auctions.%20Please%20guide%20me%20on%20the%20process."
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#222222] hover:bg-black text-white py-3 px-6 text-xs sm:text-sm font-medium shrink-0 inline-flex items-center gap-2 w-full md:w-auto justify-center rounded-full shadow-sm hover:shadow transition-all"
              >
                <span>Consult Our Tokyo Bidding Desk</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>

          </main>

        </div>
      </div>

      {/* MOBILE FLOATING FILTER PILL (White background, always accessible on mobile) */}
      <div className="fixed bottom-6 inset-x-0 z-40 lg:hidden flex justify-center pointer-events-none px-4">
        <button
          onClick={() => setMobileFilterOpen(true)}
          className="pointer-events-auto bg-white hover:bg-[#f7f7f7] text-[#222222] px-5 py-3 rounded-full shadow-[0_8px_28px_rgba(0,0,0,0.18)] border border-[#ebebeb] flex items-center gap-2.5 text-xs font-semibold hover:scale-105 active:scale-95 transition-all cursor-pointer"
        >
          <Filter className="w-4 h-4 text-[#222222]" />
          <span>Filters</span>
          {activeFilterCount > 0 && (
            <span className="bg-[#222222] text-white text-[10px] font-mono px-1.5 py-0.2 rounded-full font-bold">
              {activeFilterCount}
            </span>
          )}
        </button>
      </div>

    </section>
  );
};
