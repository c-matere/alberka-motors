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
    id: 'toyota-harrier',
    name: 'Toyota Harrier',
    make: 'Toyota',
    title: 'Toyota Harrier Dynamic Luxury Hub',
    subtitle: '80-Series & GR Sport · 2.0L Petrol · Dynamic Force Efficiency & Executive Craftsmanship',
    tagline: 'Kenya’s ultimate executive luxury crossover. TNGA architecture, ultra-efficient petrol power, whisper-quiet acoustic insulation, and unmatched street prestige.',
    startingPriceKes: 4850000,
    heroImage: '/vehicles/toyota-harrier-2020-grey/hero-front-34.jpg',
    badge: 'FLAGSHIP LUXURY CROSSOVER · MOMBASA STOCK',
    avgFuelEconomy: '15.8 KM/L',
    groundClearance: '195 mm',
    seatingCapacity: '5 Seats',
    driveTypes: '2WD Automatic',
    verdict: 'A masterclass in modern Japanese automotive design, combining razor-sharp styling, low running costs, and premium interior luxury.',
    highlights: [
      { label: 'Platform & Styling', value: '80-Series & GR', desc: 'Continuous LED rear light bar, sculpted coupe aerodynamics, and commanding presence.' },
      { label: 'Dynamic Efficiency', value: '15.8 KM/L', desc: 'M20A-FKS Dynamic Force engine with physical launch gear Direct Shift-CVT.' },
      { label: 'Cabin Luxury', value: 'Leather & Tech', desc: 'Touchscreen display, dual-zone climate, power seating, and radar cruise control.' },
    ],
  },
  {
    id: 'suzuki-every',
    name: 'Suzuki Every',
    make: 'Suzuki',
    title: 'Suzuki Every Van Fleet Hub',
    subtitle: '660cc Highly Economical Engine · Dual Sliding Doors · Maximum Commercial & Urban Utility',
    tagline: 'The ultimate fuel-saver van in Kenya. Compact, reliable, ultra-efficient, and engineered for maximum payload utility with rock-bottom running costs.',
    startingPriceKes: 1050000,
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
      { label: 'Delivered Cash', value: 'KES 1,050,000', desc: 'All duties paid, NTSA registration ready, turnkey delivery.' },
    ],
  },
  {
    id: 'subaru-xv',
    name: 'Subaru XV',
    make: 'Subaru',
    title: 'Subaru XV Symmetrical AWD Hub',
    subtitle: '2.0i-L EyeSight · Symmetrical AWD · 220mm Ground Clearance & Boxer Agility',
    tagline: 'Kenya’s premier adventure crossover. Symmetrical All-Wheel Drive, high 220mm clearance, renowned Boxer balance, and EyeSight safety assist.',
    startingPriceKes: 3150000,
    heroImage: '/vehicles/subaru-xv-2019-black/hero-front-34.jpg',
    badge: 'SYMMETRICAL AWD · MOMBASA STOCK',
    avgFuelEconomy: '16.0 KM/L',
    groundClearance: '220 mm',
    seatingCapacity: '5 Seats',
    driveTypes: 'Symmetrical AWD',
    verdict: 'The sweet spot between rugged SUV capability and sporty hatchback agility. Symmetrical AWD delivers unmatched grip on wet tarmac and upcountry dirt roads.',
    highlights: [
      { label: 'Drivetrain', value: 'Symmetrical AWD', desc: 'Constant active torque split with X-Mode and Hill Descent Control.' },
      { label: 'Ground Clearance', value: '220 mm', desc: 'Superior obstacle clearance surpassing conventional urban crossovers.' },
      { label: 'Safety Suite', value: 'Subaru EyeSight', desc: 'Stereo-camera pre-collision braking, adaptive cruise, and lane sway warning.' },
    ],
  },
  {
    id: 'volvo-xc40',
    name: 'Volvo XC40 R-Design',
    make: 'Volvo',
    title: 'Volvo XC40 Scandinavian Luxury Hub',
    subtitle: 'T4 All-Wheel Drive · 2.0L Turbo Petrol · Harman Kardon Sound & Thor’s Hammer LED',
    tagline: 'Pure Scandinavian luxury and performance. R-Design sports styling, surefooted all-wheel drive, premium Harman Kardon acoustics, and world-renowned Volvo safety.',
    startingPriceKes: 4650000,
    heroImage: '/vehicles/volvo-xc40-r-design-2019/hero-front-34.jpg',
    badge: 'SCANDINAVIAN LUXURY · 40,000 KM ONLY',
    avgFuelEconomy: '13.6 KM/L',
    groundClearance: '211 mm',
    seatingCapacity: '5 Seats',
    driveTypes: 'T4 All-Wheel Drive',
    verdict: 'The pinnacle of compact European SUV design. Direct Japanese import with genuine 40,000 km, 360-degree camera, and bespoke R-Design leather cabin.',
    highlights: [
      { label: 'Acoustic Sound', value: 'Harman Kardon', desc: 'Concert-hall multi-speaker audio with Air Woofer door integration.' },
      { label: 'Lighting Signature', value: 'Thor Hammer LED', desc: 'Active high-beam Scandinavian LED lighting with iconic daytime light guides.' },
      { label: 'Safety Rating', value: '5-Star Euro NCAP', desc: 'IntelliSafe radar, collision mitigation, and 360-degree overhead monitor.' },
    ],
  },
];

// Helper: Determine Hub ID for any vehicle
export function getVehicleHubId(vehicle: Vehicle): string {
  if (vehicle.hubId) return vehicle.hubId;
  const lower = vehicle.name.toLowerCase();
  if (lower.includes('every') || lower.includes('suzuki')) return 'suzuki-every';
  if (lower.includes('volvo') || lower.includes('xc40')) return 'volvo-xc40';
  if (lower.includes('xv') || lower.includes('subaru')) return 'subaru-xv';
  return 'toyota-harrier';
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
