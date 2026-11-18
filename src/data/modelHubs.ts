import { Vehicle } from './vehicles';

export interface ModelHub {
  id: string; // e.g. 'toyota-prado', 'suzuki-every'
  name: string;
  make: string;
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
    id: 'toyota-prado',
    name: 'Toyota Land Cruiser Prado',
    make: 'Toyota',
    title: 'Toyota Land Cruiser Prado Hub',
    subtitle: '120-Series TX & TX Limited · 4.0L V6 1GR-FE · Full-Time Dual-Range 4WD With Torsen LSD',
    tagline: 'Kenya’s undisputed overland and executive benchmark. Unshakeable resale value, unmatched parts availability across all 47 counties, and true cross-country luxury.',
    startingPriceKes: 3200000,
    heroImage: 'https://img.sbtjapan.com/img/carphoto/AX2877/normal/2.jpg',
    badge: 'FLAGSHIP 4WD HUB · SAVE UP TO KES 350,000',
    avgFuelEconomy: '8.5 KM/L',
    groundClearance: '220 mm',
    seatingCapacity: '8 Seats',
    driveTypes: 'Dual-Range Full-Time 4WD',
    verdict: 'The golden standard of Kenyan motoring. High-mount intake, dual-range transfer case, and seating for 8 with independent rear climate controls.',
    highlights: [
      { label: 'Drivetrain', value: 'Dual-Range 4WD', desc: 'High/Low transfer case with center differential lock.' },
      { label: 'Cabin Capacity', value: '8 Seats', desc: 'Versatile 3rd row with 100-point workshop verified condition.' },
      { label: 'Resale Stability', value: 'Class Leader', desc: 'Retains over 82% equity value after years on Kenyan roads.' },
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
  if (lower.includes('every') || lower.includes('suzuki')) return 'suzuki-every';
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
