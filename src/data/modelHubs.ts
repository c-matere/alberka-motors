import { Vehicle } from './vehicles';

export interface ModelHub {
  id: string; // e.g. 'mazda-cx-5', 'toyota-prado', 'toyota-rav4', 'toyota-harrier', 'nissan-serena', 'nissan-note'
  name: string; // 'Mazda CX-5'
  make: string; // 'Mazda'
  title: string;
  subtitle: string;
  tagline: string;
  startingPriceKes: number;
  heroImage: string;
  badge: string;
  avgFuelEconomy: string;
  groundClearance: string;
  seatingCapacity: string;
  driveTypes: string;
  verdict: string;
  highlights: { label: string; value: string; desc: string }[];
}

export const MODEL_HUBS: ModelHub[] = [
  {
    id: 'mazda-cx-5',
    name: 'Mazda CX-5',
    make: 'Mazda',
    title: 'Mazda CX-5 Fleet Hub',
    subtitle: 'Tokyo & Chubu Auction Sourced · SkyActiv-G & SkyActiv-D Clean Diesel · KODO Soul of Motion Design',
    tagline: 'Kenya’s most sought-after urban crossover. Exceptional cornering dynamics, 16.0–19.0 KM/L SkyActiv fuel economy, and verified Japanese Grade 4.5 pedigree.',
    startingPriceKes: 2750000,
    heroImage: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1400&q=80',
    badge: 'VERIFIED MODEL HUB · 7%–10% OFF',
    avgFuelEconomy: '16.8 KM/L',
    groundClearance: '210 mm',
    seatingCapacity: '5 Adults',
    driveTypes: '2WD & i-ACTIV AWD',
    verdict: 'The ideal Nairobi-to-Mombasa highway cruiser. Unmatched interior leather craftsmanship, heads-up display, and ultra-reliable 6-speed torque-converter automatic.',
    highlights: [
      { label: 'SkyActiv Dynamics', value: '16.8 KM/L', desc: 'Real-world highway fuel efficiency on Kenyan roads.' },
      { label: 'Ground Clearance', value: '210 mm', desc: 'Ample ride height for estate speed humps and murram access roads.' },
      { label: 'Auction Selection', value: 'Grade 4.5', desc: 'Guaranteed USS Tokyo zero-accident provenance with JEVIC odometer check.' },
    ],
  },
  {
    id: 'toyota-prado',
    name: 'Toyota Land Cruiser Prado',
    make: 'Toyota',
    title: 'Toyota Land Cruiser Prado Hub',
    subtitle: '150-Series TX & TX Limited · Full-Time 4WD With Torsen LSD · Indestructible Ladder-Frame Chassis',
    tagline: 'Kenya’s undisputed safari and executive benchmark. Unshakeable resale value, unmatched parts availability across all 47 counties, and true cross-country luxury.',
    startingPriceKes: 3200000,
    heroImage: '/vehicles/flagship-hero.jpg',
    badge: 'FLAGSHIP 4WD HUB · SAVE UP TO KES 350,000',
    avgFuelEconomy: '11.5 KM/L',
    groundClearance: '220 mm',
    seatingCapacity: '7 Seats',
    driveTypes: 'Dual-Range Full-Time 4WD',
    verdict: 'The golden standard of Kenyan motoring. High-mount intake, dual-tank readiness, and seating for 7 with independent climate zones.',
    highlights: [
      { label: 'Drivetrain', value: 'Dual-Range 4WD', desc: 'High/Low transfer case with center differential lock.' },
      { label: 'Cabin Capacity', value: '7 Seats', desc: 'Fold-flat 3rd row with 100-point workshop serviced leather.' },
      { label: 'Resale Stability', value: 'Class Leader', desc: 'Retains over 82% equity value after 3 years on Kenyan roads.' },
    ],
  },
  {
    id: 'toyota-rav4',
    name: 'Toyota RAV4',
    make: 'Toyota',
    title: 'Toyota RAV4 Adventure & Hybrid Hub',
    subtitle: 'TNGA-K Architecture · Dynamic Torque Vectoring AWD · Unbreakable Toyota Reliability',
    tagline: 'The multi-purpose king. Rugged Adventure front bumper styling, 2.0L Dynamic Force powertrain, and multi-terrain drive mode selector for Kenyan dirt trails.',
    startingPriceKes: 3850000,
    heroImage: '/vehicles/rav4-adventure.jpg',
    badge: 'PREMIUM SUV HUB · 7% OFF',
    avgFuelEconomy: '15.2 KM/L',
    groundClearance: '218 mm',
    seatingCapacity: '5 Adults',
    driveTypes: 'Dynamic Vectoring AWD',
    verdict: 'Unrivaled daily practicality. Easy to service with OEM Castrol fluids, cavernous boot space, and Toyota Safety Sense 2.0 radar cruise.',
    highlights: [
      { label: 'Platform', value: 'TNGA-K', desc: '57% stiffer body shell for razor-sharp steering and zero squeaks.' },
      { label: 'Ride Height', value: '218 mm', desc: 'Tackles rough Rift Valley and coast tracks effortlessly.' },
      { label: 'Odometer', value: '100% Genuine', desc: 'JEVIC & QISJ certified Japanese export odometer documentation.' },
    ],
  },
  {
    id: 'toyota-harrier',
    name: 'Toyota Harrier',
    make: 'Toyota',
    title: 'Toyota Harrier Luxury Hub',
    subtitle: 'Executive Coupe-SUV · 2.5L Dynamic Force Hybrid E-Four AWD · Whisper-Quiet Acoustic Cabin',
    tagline: 'Lexus-grade luxury wrapped in a Toyota badge. Whisper-quiet hybrid cruise, panoramic dimming roof, and effortless 21.0 KM/L urban economy.',
    startingPriceKes: 4200000,
    heroImage: '/vehicles/harrier-hybrid.jpg',
    badge: 'EXECUTIVE HYBRID HUB · 10% OFF',
    avgFuelEconomy: '21.0 KM/L',
    groundClearance: '195 mm',
    seatingCapacity: '5 Executive',
    driveTypes: 'E-Four Electric AWD',
    verdict: 'The ultimate executive commuter for Nairobi and Mombasa traffic. Zero fuel waste in gridlocks, smooth electric crawl, and prestige presence.',
    highlights: [
      { label: 'Hybrid Economy', value: '21.0 KM/L', desc: 'Ultra-efficient regenerative Atkinson cycle hybrid system.' },
      { label: 'Acoustic Glass', value: 'Double Glazed', desc: 'Blocks out Kenyan urban noise and diesel truck roar.' },
      { label: 'Save Big', value: 'Save KES 450,000', desc: 'Delivered price discounted from original KES 4,650,000 valuation.' },
    ],
  },
  {
    id: 'nissan-serena',
    name: 'Nissan Serena',
    make: 'Nissan',
    title: 'Nissan Serena e-POWER Hub',
    subtitle: 'Highway Star C27 · 7-Seater Walk-Through Cabin · 100% Electric Motor Drive With Range Extender',
    tagline: 'The undisputed Kenyan family and tour executive van. Dual power sliding doors, zero range anxiety, and 26.2 KM/L Japanese JC08 fuel economy benchmark.',
    startingPriceKes: 2650000,
    heroImage: '/vehicles/serena-highway-star.jpg',
    badge: 'FAMILY 7-SEATER HUB · 9% OFF',
    avgFuelEconomy: '22.0 KM/L',
    groundClearance: '160 mm',
    seatingCapacity: '7 VIP Seats',
    driveTypes: 'e-POWER Instant Torque FWD',
    verdict: 'The smart Kenyan family choice. Capacious 3-row layout with USB ports at every seat, dual sliding touch-doors, and whisper-quiet electric acceleration.',
    highlights: [
      { label: 'Fuel Benchmark', value: '22.0 KM/L', desc: 'Generator engine charges battery only; wheels driven 100% by EV motor.' },
      { label: 'Seating Versatility', value: '14 Modes', desc: 'Smart Multi-Center Seat shifts between 1st, 2nd, and 3rd rows.' },
      { label: 'Save Today', value: 'Save KES 250,000', desc: 'Discounted cash deal compared to typical Mombasa yard rates.' },
    ],
  },
  {
    id: 'nissan-note',
    name: 'Nissan Note',
    make: 'Nissan',
    title: 'Nissan Note e-POWER Hub',
    subtitle: 'Medalist Flagship Edition · EM57 Instant EV Motor · Low Running Cost Urban Benchmark',
    tagline: 'Kenya’s most cost-effective premium daily driver. Pure electric torque with zero charging cable hassle. Up to 34.0 KM/L JC08 cycle fuel efficiency.',
    startingPriceKes: 1850000,
    heroImage: '/vehicles/note-epower.jpg',
    badge: 'URBAN VALUE HUB · 10% OFF',
    avgFuelEconomy: '28.0 KM/L',
    groundClearance: '155 mm',
    seatingCapacity: '5 Adults',
    driveTypes: 'Electric Drive FWD',
    verdict: 'Cuts your monthly petrol budget in half. Fast off the mark at roundabouts, compact to park anywhere in Mombasa CBD, and cheap to maintain.',
    highlights: [
      { label: 'Torque On-Demand', value: '254 Nm', desc: 'Instant EV acceleration without gearbox lag.' },
      { label: 'Economy', value: '28.0 KM/L', desc: 'Kenya’s most economical Japanese hatchback on pump petrol.' },
      { label: 'Delivered Cash', value: 'KES 1,850,000', desc: 'Struck from KES 2,050,000. Save KES 200,000 immediately.' },
    ],
  },
  {
    id: 'suzuki-every',
    name: 'Suzuki Every',
    make: 'Suzuki',
    title: 'Suzuki Every Van Fleet Hub',
    subtitle: '660cc Highly Economical Engine · Dual Sliding Doors · Maximum Commercial & Urban Utility',
    tagline: 'The ultimate fuel-saver van in Kenya. Compact, reliable, ultra-efficient, and engineered for maximum payload utility with rock-bottom running costs.',
    startingPriceKes: 1150000,
    heroImage: '/vehicles/suzuki-every-2019/hero-front-34.jpg',
    badge: 'FUEL SAVER UTILITY · READY TO WORK',
    avgFuelEconomy: '20.2 KM/L',
    groundClearance: '150 mm',
    seatingCapacity: '4 Seats (Fold-Flat Cargo)',
    driveTypes: '2WD Automatic',
    verdict: 'Super-low maintenance, massive payload cargo volume with dual sliding doors, and unrivaled 20+ KM/L economy for business or city deliveries.',
    highlights: [
      { label: 'Fuel Economy', value: '20.2 KM/L', desc: 'Highly economical 660cc engine saves thousands weekly on fuel.' },
      { label: 'Loading Utility', value: 'Dual Sliding Doors', desc: 'Effortless loading/unloading in tight Mombasa alleys and loading bays.' },
      { label: 'Delivered Cash', value: 'KES 1,150,000', desc: 'All duties paid, NTSA registration ready, turnkey delivery.' },
    ],
  },
];

// Helper: Determine Hub ID for any vehicle
export function getVehicleHubId(vehicle: Vehicle): string {
  if (vehicle.hubId) return vehicle.hubId;
  const lower = vehicle.name.toLowerCase();
  if (lower.includes('cx-5') || lower.includes('cx5') || lower.includes('mazda')) return 'mazda-cx-5';
  if (lower.includes('every') || lower.includes('suzuki')) return 'suzuki-every';
  if (lower.includes('prado')) return 'toyota-prado';
  if (lower.includes('rav4')) return 'toyota-rav4';
  if (lower.includes('harrier')) return 'toyota-harrier';
  if (lower.includes('serena')) return 'nissan-serena';
  if (lower.includes('note')) return 'nissan-note';
  return 'toyota-prado';
}

// Helper: Get ModelHub by ID
export function getModelHub(hubId: string): ModelHub | undefined {
  return MODEL_HUBS.find((h) => h.id === hubId);
}

// Helper: Calculate clear pricing, strikethrough, and discount percentage
export function getVehiclePricing(vehicle: Vehicle) {
  const currentPrice = vehicle.priceKes;
  const hasDiscount = Boolean(vehicle.discountPercent && vehicle.discountPercent > 0);
  const discountPercent = vehicle.discountPercent || 0;
  
  let originalPrice = vehicle.originalPriceKes;
  if (hasDiscount && !originalPrice) {
    const rawOrig = currentPrice / (1 - discountPercent / 100);
    originalPrice = Math.round(rawOrig / 50000) * 50000;
  } else if (!hasDiscount) {
    originalPrice = currentPrice;
  }

  const savingsKes = (originalPrice || currentPrice) - currentPrice;

  return {
    currentPrice,
    originalPrice: originalPrice || currentPrice,
    discountPercent,
    savingsKes,
    hasDiscount,
  };
}
