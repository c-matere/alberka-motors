export interface VehicleColor {
  name: string;
  hex: string;
  imageUrl: string;
}

export interface CloserLookPoint {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  imageUrl: string;
  metric: string;
  metricLabel: string;
}

export interface FeatureSlide {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  imageUrl: string;
  metric?: string;
  metricLabel?: string;
}

export interface EditorialFeature {
  id: string; // 'seats' | 'transmission' | 'infotainment' | 'safety'
  badge: string;
  title: string;
  lead: string;
  narrative: string[];
  specs: { label: string; value: string }[];
  slides: FeatureSlide[];
}

export interface SBTOptions {
  pushStart: boolean;
  smartKey: boolean;
  powerWindows: boolean;
  airConditioner: boolean;
  powerSeats: boolean;
  leatherSeats: boolean;
  sunroof: boolean;
  alloyWheels: boolean;
  abs: boolean;
  airbags: boolean;
  backCamera: boolean;
  camera360: boolean;
  radarCruise: boolean;
  laneAssist: boolean;
  ledLights: boolean;
  navigation: boolean;
  roofRails?: boolean;
  audioPlayer?: boolean;
  fogLights?: boolean;
  rearSpoiler?: boolean;
  woodSteering?: boolean;
  doubleAc?: boolean;
  powerBackDoor?: boolean;
}

export interface Vehicle {
  id: string;
  stockNo: string;
  sbtStockId: string; // SBT Japan Exporter Stock ID (e.g. AX2877)
  chassisNo: string; // Frame / Chassis No
  modelCode: string; // Japanese Model Code
  engineCode: string; // Engine Series Code
  name: string;
  moniker: string;
  essenceQuote: string;
  kicker: string;
  tagline: string;
  priceKes: number;
  originalPriceKes?: number; // Pre-discount showroom benchmark (KES)
  discountPercent?: number; // Promotional discount percentage (e.g. 7, 10)
  hubId?: string; // Model Hub linkage (e.g. 'mazda-cx-5', 'toyota-prado')
  priceUsd?: number; // SBT FOB Price (USD)
  freightUsd?: number; // RoRo Freight (USD)
  vanningUsd?: number; // Vanning (USD)
  inspectionUsd?: number; // QISJ / JEVIC (USD)
  insuranceUsd?: number; // Marine Insurance (USD)
  totalCifUsd?: number; // Total CIF Mombasa (USD)
  inventoryLocation?: string; // e.g. OSAKA, JAPAN
  sbtGrade?: string; // SBT Grade text e.g. TX LIMITED 60TH SPECIAL EDITION
  year: number;
  registrationMonth: string;
  manufactureYearMonth: string;
  mileageKm: number;
  steering: 'RHD' | 'LHD';
  category: 'suv' | 'hybrid' | 'van' | 'compact' | 'executive';
  bodyType: string;
  fuelType: string;
  transmission: string;
  drivetrain: string;
  engine: string;
  power: string;
  torque: string;
  fuelEconomy: string;
  exteriorColor: string;
  colorCode: string;
  interiorColor: string;
  doors: number;
  seats: number;
  locationYard: string;
  dimensions: string; // Length x Width x Height in meters & mm
  m3: string; // SBT Cubic Meters Shipping Volume
  wheelbase: string;
  groundClearance: string;
  curbWeight: string;
  grossWeight: string;
  maxLoadingCapacity?: string;
  fuelTankCapacity: string;
  auctionGrade: string;
  auctionHall: string;
  interiorGrade: string;
  exteriorGrade?: string;
  inspectionStatus: string;
  options: SBTOptions;
  status: 'In Stock' | 'Cleared Port' | 'In Transit';
  heroVideo: string;
  heroImage: string;
  colors: VehicleColor[];
  closerLookPoints: CloserLookPoint[];
  editorialFeatures: EditorialFeature[];
  chapters: {
    id: string;
    tabLabel: string;
    eyebrow: string;
    title: string;
    narrative: string[];
    imageUrl: string;
    videoUrl?: string;
    highlights: { label: string; value: string }[];
  }[];
  gallery: {
    title: string;
    description: string;
    url: string;
  }[];
  specifications: {
    category: string;
    items: { label: string; value: string }[];
  }[];
  workshopProtocol: string[];
}

export const VEHICLES: Vehicle[] = [
  {
    id: 'toyota-land-cruiser-prado-ax2877',
    stockNo: 'ALB-2877',
    sbtStockId: 'AX2877',
    chassisNo: 'GRJ120-002877',
    modelCode: 'CBA-GRJ120W',
    engineCode: '1GR-FE',
    name: 'Toyota Land Cruiser Prado TX Limited 60th Special Edition',
    moniker: '60th Anniversary Japanese Overland Legend',
    essenceQuote: 'A pristine 120-Series Prado straight from Osaka, powered by the indestructible 4.0L V6 1GR-FE with verified 108,000 km, 8-seater capability, and full Japanese export documentation.',
    kicker: 'SBT Japan Certified · 4.0L Petrol V6 · 8-Seater',
    tagline: 'Toyota Land Cruiser Prado 120 · TX Limited 60th Anniversary · 4.0L V6 Petrol · 4WD · Osaka Export',
    priceKes: 3200000,
    priceUsd: 11690,
    freightUsd: 1900,
    vanningUsd: 0,
    inspectionUsd: 250,
    insuranceUsd: 206,
    totalCifUsd: 14046,
    inventoryLocation: 'OSAKA, JAPAN',
    sbtGrade: 'TX LIMITED 60TH SPECIAL EDITION',
    year: 2006,
    registrationMonth: '12',
    manufactureYearMonth: '2006 / 12',
    mileageKm: 108000,
    steering: 'RHD',
    category: 'suv',
    bodyType: 'SUV',
    fuelType: 'PETROL',
    transmission: 'AT',
    drivetrain: '4WD',
    engine: '4,000 cc',
    power: '249 HP @ 5,200 RPM',
    torque: '380 Nm @ 3,800 RPM',
    fuelEconomy: '8.5 km/L (Japanese 10-15 mode)',
    exteriorColor: 'WHITE',
    colorCode: '056',
    interiorColor: 'Charcoal / Ash Gray Fabric',
    doors: 5,
    seats: 8,
    locationYard: 'Osaka Yard / Mombasa Port RoRo',
    dimensions: '4.85m × 1.88m × 1.85m (4,850 × 1,875 × 1,850 mm)',
    m3: '16.823 m³',
    wheelbase: '2,790 mm',
    groundClearance: '220 mm',
    curbWeight: '2,050 kg',
    grossWeight: '2,600 kg',
    maxLoadingCapacity: '550 kg',
    fuelTankCapacity: '87 L',
    auctionGrade: '4.5',
    auctionHall: 'USS Osaka / SBT Japan Export Center',
    interiorGrade: 'B',
    inspectionStatus: 'QISJ & JEVIC Export Approved',
    status: 'In Stock',
    heroImage: 'https://img.sbtjapan.com/img/carphoto/AX2877/normal/2.jpg',
    heroVideo: '',
    options: {
      pushStart: false,
      smartKey: false,
      powerWindows: true,
      airConditioner: true,
      powerSeats: false,
      leatherSeats: false,
      sunroof: false,
      alloyWheels: true,
      abs: true,
      airbags: true,
      backCamera: true,
      camera360: false,
      radarCruise: false,
      laneAssist: false,
      ledLights: false,
      navigation: true,
      roofRails: true,
      audioPlayer: true,
      fogLights: true,
      rearSpoiler: false,
      woodSteering: false,
      doubleAc: false,
      powerBackDoor: false,
    },
    colors: [
      { name: 'Pure White (056)', hex: '#F8F9FA', imageUrl: 'https://img.sbtjapan.com/img/carphoto/AX2877/normal/2.jpg' },
    ],
    closerLookPoints: [
      {
        id: 'engine-1gr',
        title: '4.0L 1GR-FE V6 Powertrain',
        subtitle: 'Dual VVTi Naturally Aspirated Gasoline Engine',
        description: 'Renowned globally for 500,000+ km longevity. Delivers 249 horsepower and 380 Nm of smooth, responsive torque.',
        imageUrl: 'https://img.sbtjapan.com/img/carphoto/AX2877/normal/37.jpg',
        metric: '249 HP',
        metricLabel: 'Naturally Aspirated',
      },
      {
        id: 'cabin-8seats',
        title: 'Full 8-Passenger Seating',
        subtitle: '3-Row Flexible Family & Safari Layout',
        description: 'Tumble-forward 2nd row and split-folding 3rd row provide cavernous luggage capacity and comfortable long-distance touring.',
        imageUrl: 'https://img.sbtjapan.com/img/carphoto/AX2877/normal/20.jpg',
        metric: '8 Seats',
        metricLabel: 'Full Configuration',
      },
      {
        id: 'odometer-verified',
        title: '108,000 Verified Kilometers',
        subtitle: 'Japanese Ministry of Transport Certified',
        description: 'Documented genuine low mileage verified by export certification and JEVIC Japanese inspection certificate.',
        imageUrl: 'https://img.sbtjapan.com/img/carphoto/AX2877/normal/13.jpg',
        metric: '108k KM',
        metricLabel: 'Certified Odometer',
      },
    ],
    editorialFeatures: [
      {
        id: 'safety',
        badge: 'SAFETY & CHASSIS',
        title: 'Heavy-Duty Ladder Frame 4WD',
        lead: 'Engineered for the harshest terrain with full-time 4WD and Torsen limited-slip center differential.',
        narrative: [
          'The 120 Series Prado combines a rigid boxed ladder chassis with independent double-wishbone front suspension.',
          'Features factory ABS, dual SRS front airbags, rear parking camera, and front fog lamps.',
        ],
        specs: [
          { label: 'Chassis Type', value: 'Full Box-Section Ladder Frame' },
          { label: 'Drive System', value: 'Full-Time 4WD with Dual-Range Transfer' },
          { label: 'Differential', value: 'Torsen Center LSD with Electronic Lock' },
          { label: 'Brakes', value: '4-Wheel Ventilated Discs with ABS' },
        ],
        slides: [
          {
            id: 'slide-4wd',
            title: 'Full-Time 4WD System',
            subtitle: 'High & Low Range Transfer Case',
            description: 'Unstoppable off-road capability across Kenyan mud, sand, and rocky corridors.',
            imageUrl: 'https://img.sbtjapan.com/img/carphoto/AX2877/normal/19.jpg',
          },
        ],
      },
    ],
    chapters: [
      {
        id: 'ch-overview',
        tabLabel: 'Overland Heritage',
        eyebrow: 'TOYOTA LAND CRUISER PRADO',
        title: 'The 60th Anniversary 120 Edition',
        narrative: [
          'Commissioned to celebrate 60 years of Toyota overland dominance, this TX Limited edition features enhanced factory appointments.',
          'Imported directly from Osaka, Japan under official SBT Japan export protocol AX2877.',
        ],
        imageUrl: 'https://img.sbtjapan.com/img/carphoto/AX2877/normal/2.jpg',
        highlights: [
          { label: 'Stock ID', value: 'AX2877 (ALB-2877)' },
          { label: 'Chassis', value: 'GRJ120-002877' },
          { label: 'Port', value: 'Osaka -> Mombasa' },
        ],
      },
    ],
    gallery: [
      {
        title: 'Prado 120 Photo 1',
        description: 'SBT Japan Inspection Archive AX2877',
        url: 'https://img.sbtjapan.com/img/carphoto/AX2877/normal/1.jpg',
      },
      {
        title: 'Prado 120 Photo 2',
        description: 'SBT Japan Inspection Archive AX2877',
        url: 'https://img.sbtjapan.com/img/carphoto/AX2877/normal/2.jpg',
      },
      {
        title: 'Prado 120 Photo 3',
        description: 'SBT Japan Inspection Archive AX2877',
        url: 'https://img.sbtjapan.com/img/carphoto/AX2877/normal/3.jpg',
      },
      {
        title: 'Prado 120 Photo 4',
        description: 'SBT Japan Inspection Archive AX2877',
        url: 'https://img.sbtjapan.com/img/carphoto/AX2877/normal/4.jpg',
      },
      {
        title: 'Prado 120 Photo 5',
        description: 'SBT Japan Inspection Archive AX2877',
        url: 'https://img.sbtjapan.com/img/carphoto/AX2877/normal/5.jpg',
      },
      {
        title: 'Prado 120 Photo 6',
        description: 'SBT Japan Inspection Archive AX2877',
        url: 'https://img.sbtjapan.com/img/carphoto/AX2877/normal/6.jpg',
      },
      {
        title: 'Prado 120 Photo 7',
        description: 'SBT Japan Inspection Archive AX2877',
        url: 'https://img.sbtjapan.com/img/carphoto/AX2877/normal/7.jpg',
      },
      {
        title: 'Prado 120 Photo 8',
        description: 'SBT Japan Inspection Archive AX2877',
        url: 'https://img.sbtjapan.com/img/carphoto/AX2877/normal/8.jpg',
      },
      {
        title: 'Prado 120 Photo 9',
        description: 'SBT Japan Inspection Archive AX2877',
        url: 'https://img.sbtjapan.com/img/carphoto/AX2877/normal/9.jpg',
      },
      {
        title: 'Prado 120 Photo 10',
        description: 'SBT Japan Inspection Archive AX2877',
        url: 'https://img.sbtjapan.com/img/carphoto/AX2877/normal/10.jpg',
      },
      {
        title: 'Prado 120 Photo 11',
        description: 'SBT Japan Inspection Archive AX2877',
        url: 'https://img.sbtjapan.com/img/carphoto/AX2877/normal/11.jpg',
      },
      {
        title: 'Prado 120 Photo 12',
        description: 'SBT Japan Inspection Archive AX2877',
        url: 'https://img.sbtjapan.com/img/carphoto/AX2877/normal/12.jpg',
      },
      {
        title: 'Prado 120 Photo 13',
        description: 'SBT Japan Inspection Archive AX2877',
        url: 'https://img.sbtjapan.com/img/carphoto/AX2877/normal/13.jpg',
      },
      {
        title: 'Prado 120 Photo 14',
        description: 'SBT Japan Inspection Archive AX2877',
        url: 'https://img.sbtjapan.com/img/carphoto/AX2877/normal/14.jpg',
      },
      {
        title: 'Prado 120 Photo 15',
        description: 'SBT Japan Inspection Archive AX2877',
        url: 'https://img.sbtjapan.com/img/carphoto/AX2877/normal/15.jpg',
      },
      {
        title: 'Prado 120 Photo 16',
        description: 'SBT Japan Inspection Archive AX2877',
        url: 'https://img.sbtjapan.com/img/carphoto/AX2877/normal/16.jpg',
      },
      {
        title: 'Prado 120 Photo 17',
        description: 'SBT Japan Inspection Archive AX2877',
        url: 'https://img.sbtjapan.com/img/carphoto/AX2877/normal/17.jpg',
      },
      {
        title: 'Prado 120 Photo 18',
        description: 'SBT Japan Inspection Archive AX2877',
        url: 'https://img.sbtjapan.com/img/carphoto/AX2877/normal/18.jpg',
      },
      {
        title: 'Prado 120 Photo 19',
        description: 'SBT Japan Inspection Archive AX2877',
        url: 'https://img.sbtjapan.com/img/carphoto/AX2877/normal/19.jpg',
      },
      {
        title: 'Prado 120 Photo 20',
        description: 'SBT Japan Inspection Archive AX2877',
        url: 'https://img.sbtjapan.com/img/carphoto/AX2877/normal/20.jpg',
      },
      {
        title: 'Prado 120 Photo 21',
        description: 'SBT Japan Inspection Archive AX2877',
        url: 'https://img.sbtjapan.com/img/carphoto/AX2877/normal/21.jpg',
      },
      {
        title: 'Prado 120 Photo 22',
        description: 'SBT Japan Inspection Archive AX2877',
        url: 'https://img.sbtjapan.com/img/carphoto/AX2877/normal/22.jpg',
      },
      {
        title: 'Prado 120 Photo 23',
        description: 'SBT Japan Inspection Archive AX2877',
        url: 'https://img.sbtjapan.com/img/carphoto/AX2877/normal/23.jpg',
      },
      {
        title: 'Prado 120 Photo 24',
        description: 'SBT Japan Inspection Archive AX2877',
        url: 'https://img.sbtjapan.com/img/carphoto/AX2877/normal/24.jpg',
      },
      {
        title: 'Prado 120 Photo 25',
        description: 'SBT Japan Inspection Archive AX2877',
        url: 'https://img.sbtjapan.com/img/carphoto/AX2877/normal/25.jpg',
      },
      {
        title: 'Prado 120 Photo 26',
        description: 'SBT Japan Inspection Archive AX2877',
        url: 'https://img.sbtjapan.com/img/carphoto/AX2877/normal/26.jpg',
      },
      {
        title: 'Prado 120 Photo 27',
        description: 'SBT Japan Inspection Archive AX2877',
        url: 'https://img.sbtjapan.com/img/carphoto/AX2877/normal/27.jpg',
      },
      {
        title: 'Prado 120 Photo 28',
        description: 'SBT Japan Inspection Archive AX2877',
        url: 'https://img.sbtjapan.com/img/carphoto/AX2877/normal/28.jpg',
      },
      {
        title: 'Prado 120 Photo 29',
        description: 'SBT Japan Inspection Archive AX2877',
        url: 'https://img.sbtjapan.com/img/carphoto/AX2877/normal/29.jpg',
      },
      {
        title: 'Prado 120 Photo 30',
        description: 'SBT Japan Inspection Archive AX2877',
        url: 'https://img.sbtjapan.com/img/carphoto/AX2877/normal/30.jpg',
      },
      {
        title: 'Prado 120 Photo 31',
        description: 'SBT Japan Inspection Archive AX2877',
        url: 'https://img.sbtjapan.com/img/carphoto/AX2877/normal/31.jpg',
      },
      {
        title: 'Prado 120 Photo 32',
        description: 'SBT Japan Inspection Archive AX2877',
        url: 'https://img.sbtjapan.com/img/carphoto/AX2877/normal/32.jpg',
      },
      {
        title: 'Prado 120 Photo 33',
        description: 'SBT Japan Inspection Archive AX2877',
        url: 'https://img.sbtjapan.com/img/carphoto/AX2877/normal/33.jpg',
      },
      {
        title: 'Prado 120 Photo 34',
        description: 'SBT Japan Inspection Archive AX2877',
        url: 'https://img.sbtjapan.com/img/carphoto/AX2877/normal/34.jpg',
      },
      {
        title: 'Prado 120 Photo 35',
        description: 'SBT Japan Inspection Archive AX2877',
        url: 'https://img.sbtjapan.com/img/carphoto/AX2877/normal/35.jpg',
      },
      {
        title: 'Prado 120 Photo 36',
        description: 'SBT Japan Inspection Archive AX2877',
        url: 'https://img.sbtjapan.com/img/carphoto/AX2877/normal/36.jpg',
      },
      {
        title: 'Prado 120 Photo 37',
        description: 'SBT Japan Inspection Archive AX2877',
        url: 'https://img.sbtjapan.com/img/carphoto/AX2877/normal/37.jpg',
      },
      {
        title: 'Prado 120 Photo 38',
        description: 'SBT Japan Inspection Archive AX2877',
        url: 'https://img.sbtjapan.com/img/carphoto/AX2877/normal/38.jpg',
      },
      {
        title: 'Prado 120 Photo 39',
        description: 'SBT Japan Inspection Archive AX2877',
        url: 'https://img.sbtjapan.com/img/carphoto/AX2877/normal/39.jpg',
      },
      {
        title: 'Prado 120 Photo 40',
        description: 'SBT Japan Inspection Archive AX2877',
        url: 'https://img.sbtjapan.com/img/carphoto/AX2877/normal/40.jpg',
      },
      {
        title: 'Prado 120 Photo 41',
        description: 'SBT Japan Inspection Archive AX2877',
        url: 'https://img.sbtjapan.com/img/carphoto/AX2877/normal/41.jpg',
      },
      {
        title: 'Prado 120 Photo 42',
        description: 'SBT Japan Inspection Archive AX2877',
        url: 'https://img.sbtjapan.com/img/carphoto/AX2877/normal/42.jpg',
      },
      {
        title: 'Prado 120 Photo 43',
        description: 'SBT Japan Inspection Archive AX2877',
        url: 'https://img.sbtjapan.com/img/carphoto/AX2877/normal/43.jpg',
      },
      {
        title: 'Prado 120 Photo 44',
        description: 'SBT Japan Inspection Archive AX2877',
        url: 'https://img.sbtjapan.com/img/carphoto/AX2877/normal/44.jpg',
      },
      {
        title: 'Prado 120 Photo 45',
        description: 'SBT Japan Inspection Archive AX2877',
        url: 'https://img.sbtjapan.com/img/carphoto/AX2877/normal/45.jpg',
      }
    ],
    specifications: [
      {
        category: 'SBT Japan Exporter Specifications',
        items: [
          { label: 'SBT Stock ID', value: 'AX2877' },
          { label: 'Inventory Location', value: 'OSAKA, JAPAN' },
          { label: 'Model Code', value: 'CBA-GRJ120W' },
          { label: 'Engine Code', value: '1GR-FE (4,000 cc)' },
          { label: 'M3 Volume', value: '16.823 m³' },
          { label: 'FOB Price', value: '$11,690 USD' },
          { label: 'CIF Mombasa Port', value: '$14,046 USD' },
          { label: 'Delivered Kenya', value: 'KES 3,200,000 (Duty Cleared)' },
        ],
      },
    ],
    workshopProtocol: [
      '1GR-FE V6 compression and valve timing diagnostic',
      'Differential and transfer case fluid replacement',
      'Suspension bushing and ball joint mechanical clearance check',
      'Brake pad wear and rotor thickness measurement',
      'Underbody anti-corrosion chassis seal verification',
    ],
  },

  {
    id: 'toyota-rav4-adventure',
    stockNo: 'ALB-4062',
    sbtStockId: 'SBT-TY-RAV4-4062',
    chassisNo: '6AA-AXAH54-0018294',
    modelCode: '6AA-AXAH54',
    engineCode: 'A25A-FXS',
    registrationMonth: '08',
    manufactureYearMonth: '2020 / 06',
    steering: 'RHD',
    exteriorColor: 'Urban Khaki / Ash Gray 2-Tone',
    colorCode: '2TX',
    interiorColor: 'Black SofTex Leather with Orange Stitching',
    doors: 5,
    seats: 5,
    locationYard: 'Mombasa Port (Ready for Delivery)',
    dimensions: '4.61m × 1.86m × 1.69m (4,610 × 1,865 × 1,690 mm)',
    m3: '14.53 m³',
    wheelbase: '2,690 mm',
    groundClearance: '200 mm',
    curbWeight: '1,670 kg',
    grossWeight: '1,995 kg',
    maxLoadingCapacity: '450 kg',
    fuelTankCapacity: '55 L',
    inspectionStatus: 'QISJ Certified & JEVIC Inspected',
    options: {
      pushStart: true,
      smartKey: true,
      powerWindows: true,
      airConditioner: true,
      powerSeats: true,
      leatherSeats: true,
      sunroof: false,
      alloyWheels: true,
      abs: true,
      airbags: true,
      backCamera: true,
      camera360: false,
      radarCruise: true,
      laneAssist: true,
      ledLights: true,
      navigation: true,
    },
    name: 'Toyota RAV4 Adventure AWD',
    moniker: 'Rugged All-Weather SUV',
    essenceQuote: 'Built tough for rough Kenyan roads, comfortable for daily city driving. Smart all-wheel drive with high ground clearance and generous boot space.',
    kicker: 'All-Road Capability',
    tagline: 'High 200mm ground clearance with smart All-Wheel Drive and tough SofTex leather.',
    priceKes: 4450000,
    year: 2020,
    mileageKm: 48200,
    category: 'suv',
    bodyType: 'Mid-Size SUV',
    fuelType: 'Petrol (Dynamic Force)',
    transmission: 'Direct Shift-CVT with Physical 1st Launch Gear',
    drivetrain: 'Dynamic Torque Vectoring AWD with Rear Driveline Disconnect',
    engine: '2.0L M20A-FKS 4-Cylinder DOHC 16-Valve',
    power: '171 PS @ 6,600 rpm',
    torque: '207 Nm @ 4,800 rpm',
    fuelEconomy: '15.2 km/L (Mixed Cycle)',
    auctionGrade: 'Grade 4.5',
    auctionHall: 'USS Tokyo',
    interiorGrade: 'Grade B (Clean Original)',
    status: 'In Stock',
    heroVideo: 'https://videos.pexels.com/video-files/3015510/3015510-hd_1920_1080_24fps.mp4',
    heroImage: '/vehicles/rav4-adventure.jpg',
    colors: [
      { name: 'Ash Khaki / Ice Edge Roof', hex: '#7f8a7e', imageUrl: '/vehicles/rav4-adventure.jpg' },
      { name: 'Attitude Black Mica', hex: '#1c1d1f', imageUrl: 'https://images.pexels.com/photos/261985/pexels-photo-261985.jpeg?auto=compress&cs=tinysrgb&w=1600' },
      { name: 'Platinum White Pearl', hex: '#f0f0f2', imageUrl: 'https://images.pexels.com/photos/16176579/pexels-photo-16176579.jpeg?auto=compress&cs=tinysrgb&w=1600' },
      { name: 'Magnetic Graphite Metallic', hex: '#58595c', imageUrl: 'https://images.pexels.com/photos/33327689/pexels-photo-33327689.jpeg?auto=compress&cs=tinysrgb&w=1600' }
    ],
    closerLookPoints: [
      {
        id: 'torque-vectoring',
        title: 'Smart All-Wheel Drive',
        subtitle: 'Independent Rear Wheel Grip',
        description: 'Sends engine power to whichever rear wheel has the most grip, keeping you moving safely through mud, gravel, and wet corners.',
        imageUrl: 'https://images.pexels.com/photos/39578152/pexels-photo-39578152.jpeg?auto=compress&cs=tinysrgb&w=1600',
        metric: '50:50',
        metricLabel: 'Rear Axle Split'
      },
      {
        id: 'orange-stitch',
        title: 'Durable SofTex Leather',
        subtitle: 'Easy-to-Clean Sport Interior',
        description: 'Tough water-resistant synthetic leather with sporty orange stitching, designed to wipe clean easily after outdoor road trips.',
        imageUrl: 'https://images.pexels.com/photos/1633602/pexels-photo-1633602.jpeg?auto=compress&cs=tinysrgb&w=1600',
        metric: 'SofTex',
        metricLabel: 'Durable Upholstery'
      },
      {
        id: 'thermal-efficiency',
        title: '2.0L Fuel-Efficient Engine',
        subtitle: 'Toyota Dynamic Force Power',
        description: 'Modern 2.0-liter engine engineered to deliver strong pulling power while saving fuel, returning over 15 km per liter.',
        imageUrl: 'https://images.pexels.com/photos/33327689/pexels-photo-33327689.jpeg?auto=compress&cs=tinysrgb&w=1600',
        metric: '15.2 km/L',
        metricLabel: 'Average Fuel Economy'
      },
      {
        id: 'chassis-clearance',
        title: '200mm Ground Clearance',
        subtitle: 'Clears Rough Roads & Bumps',
        description: 'High ride height clears steep speed bumps, flooded city streets, and unpaved upcountry roads without scraping the underside.',
        imageUrl: 'https://images.pexels.com/photos/261985/pexels-photo-261985.jpeg?auto=compress&cs=tinysrgb&w=1600',
        metric: '200 mm',
        metricLabel: 'Ride Height'
      }
    ],
    editorialFeatures: [
      {
        id: 'seats',
        badge: 'INTERIOR COMFORT & BOOT SPACE',
        title: 'SofTex Leather Seats & Flexible 1,064L Boot',
        lead: 'Water-resistant SofTex seats with power adjustments and a wide flat-folding rear boot for all your safari and family gear.',
        narrative: [
          'The interior of the RAV4 Adventure AWD combines rugged durability with everyday comfort. The SofTex seats are water-resistant and wipe clean effortlessly after dusty weekend road trips.',
          'Multi-density seat cushioning supports your back and hips, reducing fatigue on long-distance highway journeys. The driver seat features 8-way electric power controls.',
          'The rear seats fold completely flat with a single pull, creating 1,064 liters of flat luggage space with a reversible, easy-wipe floor.'
        ],
        specs: [
          { label: 'Seat Material', value: 'Perforated SofTex with Orange Seams' },
          { label: 'Driver Adjustment', value: '8-Way Electric Power with Lumbar Support' },
          { label: 'Boot Capacity', value: '1,064 Liters Flat-Fold Space' },
          { label: 'Cabin Accents', value: 'Sporty Orange Contrast Stitching' }
        ],
        slides: [
          {
            id: 'rav4-seat-1',
            title: 'SofTex Adventure Contoured Seats',
            subtitle: 'Dual-Density Foam & Orange Accent Detailing',
            description: 'Rugged water-resistant SofTex material crafted for intense African overland journeys with breathable perforated central spines.',
            imageUrl: '/vehicles/rav4-adventure.jpg',
            metric: '8-Way',
            metricLabel: 'Power Driver Adjustability'
          },
          {
            id: 'rav4-seat-2',
            title: 'Expedition Cargo Optimization',
            subtitle: '60/40 Split-Folding Flat Bed Platform',
            description: 'Reversible dual-surface trunk liner with rugged anti-scratch plastic backing on one side and premium velour carpet on the other.',
            imageUrl: 'https://images.pexels.com/photos/1633602/pexels-photo-1633602.jpeg?auto=compress&cs=tinysrgb&w=1600',
            metric: '1,064 L',
            metricLabel: 'Expedition Volume'
          },
          {
            id: 'rav4-seat-3',
            title: 'Tactile Rubberized Interior Grips',
            subtitle: 'Ruggedized Dash & Console Controls',
            description: 'Chunky rubber-ribbed HVAC knobs and door pulls allow precise adjustment even while wearing heavy overland driving gloves.',
            imageUrl: 'https://images.pexels.com/photos/39578152/pexels-photo-39578152.jpeg?auto=compress&cs=tinysrgb&w=1600',
            metric: 'Tactile',
            metricLabel: 'Grip Architecture'
          }
        ]
      },
      {
        id: 'transmission',
        badge: 'DRIVETRAIN & TRANSMISSION',
        title: 'Direct-Shift Transmission & Smart All-Wheel Drive',
        lead: 'Quick takeoff from a complete stop with smooth highway cruising and automatic fuel-saving rear disconnect.',
        narrative: [
          'Toyota designed this transmission with a dedicated physical launch gear. When taking off from traffic lights or steep hills, it engages solid gears for instant pull, then smoothly switches to the fuel-saving belt once you are moving.',
          'The smart All-Wheel Drive system monitors road grip constantly. When you hit mud, gravel, or rainy turns, it automatically sends power to the rear wheels with the best traction.',
          'When cruising smoothly on the highway, it disconnects the rear drive automatically to save fuel, returning an impressive 15.2 km per liter.'
        ],
        specs: [
          { label: 'Gearbox Type', value: 'Direct Shift-CVT with Physical 1st Launch Gear' },
          { label: 'AWD System', value: 'Smart All-Wheel Drive with Highway Disconnect' },
          { label: 'Torque Distribution', value: 'Up to 50:50 Front to Rear Grip' },
          { label: 'Terrain Modes', value: 'Mud, Sand, Rock, Dirt, Eco, and Sport' }
        ],
        slides: [
          {
            id: 'rav4-trans-1',
            title: 'Direct-Shift Launch Gear',
            subtitle: 'Immediate Response from Standstill',
            description: 'Physical first gear delivers strong, confident takeoff before shifting smoothly into cruising speed.',
            imageUrl: 'https://images.pexels.com/photos/33327689/pexels-photo-33327689.jpeg?auto=compress&cs=tinysrgb&w=1600',
            metric: 'Direct 1st',
            metricLabel: 'Mechanical Launch Gear'
          },
          {
            id: 'rav4-trans-2',
            title: 'Smart All-Wheel Drive',
            subtitle: 'Confident Wet & Loose-Road Grip',
            description: 'Sends power directly to the wheel with the best grip to prevent skidding on wet roads and gravel tracks.',
            imageUrl: 'https://images.pexels.com/photos/39578152/pexels-photo-39578152.jpeg?auto=compress&cs=tinysrgb&w=1600',
            metric: 'Auto Grip',
            metricLabel: 'Smart Power Split'
          },
          {
            id: 'rav4-trans-3',
            title: 'Multi-Terrain Driving Dial',
            subtitle: 'Dial in Mud, Sand, or Rock Settings',
            description: 'Turn the center console dial to tailor throttle response and traction control for your road conditions.',
            imageUrl: 'https://images.pexels.com/photos/261985/pexels-photo-261985.jpeg?auto=compress&cs=tinysrgb&w=1600',
            metric: '3 Modes',
            metricLabel: 'Terrain Settings'
          }
        ]
      },
      {
        id: 'infotainment',
        badge: 'TOUCHSCREEN & INSTRUMENT SCREENS',
        title: 'Central Touchscreen & 7-Inch Driver Digital Display',
        lead: 'Clear high-mounted touchscreen with Apple CarPlay and Android Auto, plus a digital screen for the driver.',
        narrative: [
          'The central touchscreen sits high on the dashboard for easy viewing while keeping your eyes on the road. It connects directly to your smartphone with Apple CarPlay and Android Auto for GPS maps, music, and hands-free calls.',
          'In front of the driver, the 7.0-inch color screen shows your digital speed, fuel efficiency, safety alerts, and all-wheel drive power distribution in real time.',
          'Dual-zone automatic climate control keeps the cabin cool with built-in air filters that block dust and traffic fumes.'
        ],
        specs: [
          { label: 'Center Screen', value: 'High-Resolution Touchscreen with Apple CarPlay' },
          { label: 'Driver Screen', value: '7.0-Inch Digital Color Driver Display' },
          { label: 'Phone Connectivity', value: 'Apple CarPlay, Android Auto, & Bluetooth' },
          { label: 'Cabin Air', value: 'Dual-Zone Auto Climate Control with Dust Filter' }
        ],
        slides: [
          {
            id: 'rav4-info-1',
            title: '7-Inch Digital Driver Display',
            subtitle: 'Clear Speed & Driving Information',
            description: 'Shows speed, all-wheel drive status, and safety alerts directly in your line of sight.',
            imageUrl: 'https://images.pexels.com/photos/1633602/pexels-photo-1633602.jpeg?auto=compress&cs=tinysrgb&w=1600',
            metric: '7.0"',
            metricLabel: 'Driver Screen'
          },
          {
            id: 'rav4-info-2',
            title: 'Central Touchscreen with CarPlay',
            subtitle: 'Phone Navigation & Hands-Free Calling',
            description: 'Connects your phone for Google Maps, WhatsApp audio, and Spotify with steering wheel controls.',
            imageUrl: 'https://images.pexels.com/photos/261985/pexels-photo-261985.jpeg?auto=compress&cs=tinysrgb&w=1600',
            metric: 'Touch',
            metricLabel: 'Smart Display'
          }
        ]
      },
      {
        id: 'safety',
        badge: 'SAFETY & DRIVER ASSISTANCE',
        title: 'Toyota Safety Sense 2.0 & High-Strength Safety Body',
        lead: 'Smart radar assists with highway cruising and automatic emergency braking, supported by 8 airbags.',
        narrative: [
          'Toyota Safety Sense 2.0 watches the road ahead using radar and a windshield camera. If a vehicle ahead brakes suddenly or a pedestrian steps into the road, the system alerts you and brakes automatically if needed.',
          'Dynamic Radar Cruise Control maintains a safe distance from cars ahead on the highway, automatically speeding up and slowing down with the flow of traffic.',
          'The reinforced high-strength steel frame and 8 airbags—including knee and side curtain airbags—protect everyone in the car.'
        ],
        specs: [
          { label: 'Crash Prevention', value: 'Pre-Collision Braking with Pedestrian Detection' },
          { label: 'Highway Cruise', value: 'Radar Cruise Control with Automatic Distance Hold' },
          { label: 'Lane Safety', value: 'Lane Keeping Assist with Gentle Steering Help' },
          { label: 'Airbag Protection', value: '8 Airbags (Front, Side, Curtain, and Driver Knee)' }
        ],
        slides: [
          {
            id: 'rav4-safe-1',
            title: 'Toyota Safety Sense 2.0',
            subtitle: 'Highway Radar & Collision Avoidance',
            description: 'Radar and camera watch the road to prevent rear-end collisions and keep safe distance.',
            imageUrl: '/vehicles/rav4-adventure.jpg',
            metric: 'Radar',
            metricLabel: 'Safety Assist'
          },
          {
            id: 'rav4-safe-2',
            title: 'High-Strength Steel Safety Cell',
            subtitle: 'Reinforced 8-Airbag Crash Protection',
            description: 'Built with reinforced high-strength steel rings and full-cabin curtain airbags for peace of mind.',
            imageUrl: 'https://images.pexels.com/photos/16176579/pexels-photo-16176579.jpeg?auto=compress&cs=tinysrgb&w=1600',
            metric: '8 Airbags',
            metricLabel: 'Full Cabin Shield'
          }
        ]
      }
    ],
    chapters: [
      {
        id: 'essence',
        tabLabel: 'The Essence',
        eyebrow: 'Architectural Philosophy',
        title: 'Form Follows Fortitude.',
        narrative: [
          'The RAV4 Adventure was conceived not as a suburban crossover wearing rugged cladding, but as an authentic expression of mechanical utility. Its octagon-inspired body contours echo chiseled mountain basalt.',
          'Built on Toyota’s rigid global chassis with wide-track stability, strong suspension points, and smart all-wheel drive for dependable grip on rough Kenyan terrain.'
        ],
        imageUrl: '/vehicles/rav4-adventure.jpg',
        videoUrl: 'https://videos.pexels.com/video-files/3015510/3015510-hd_1920_1080_24fps.mp4',
        highlights: [
          { label: 'Approach Angle', value: '19.3 Degrees' },
          { label: 'Departure Angle', value: '21.0 Degrees' },
          { label: 'Torsional Rigidity', value: '+57% over Gen 4' }
        ]
      },
      {
        id: 'poise',
        tabLabel: 'Exterior Poise',
        eyebrow: 'Geometric Presence',
        title: 'Chiseled Octagonal Geometry.',
        narrative: [
          'From the twin-tiered hexagonal front grille to the raised roof rails, every surface was shaped to channel airflow while deflecting trail debris. The high ground clearance elevates the driver into commanding situational vision.'
        ],
        imageUrl: 'https://images.pexels.com/photos/261985/pexels-photo-261985.jpeg?auto=compress&cs=tinysrgb&w=1600',
        highlights: [
          { label: 'Wheelbase', value: '2,690 mm' },
          { label: 'Wheels', value: '19-Inch 5-Spoke Matte Alloy' },
          { label: 'Lighting', value: 'Bi-LED Projector Array' }
        ]
      },
      {
        id: 'sanctuary',
        tabLabel: 'Cabin Comfort',
        eyebrow: 'Interior Comfort',
        title: 'Comfortable, Quiet Cabin.',
        narrative: [
          'Inside, bright orange stitching highlights durable SofTex sport seats. Easy-grip climate dials, deep door storage, and thick sound insulation keep long road trips comfortable and quiet.'
        ],
        imageUrl: 'https://images.pexels.com/photos/1633602/pexels-photo-1633602.jpeg?auto=compress&cs=tinysrgb&w=1600',
        highlights: [
          { label: 'Cargo Volume', value: '580 Liters (Seats Up)' },
          { label: 'Display', value: '7.0-inch Digital TFT Cockpit' },
          { label: 'Sound Isolation', value: 'Acoustic Glass Windshield' }
        ]
      },
      {
        id: 'engineering',
        tabLabel: 'Motive Force',
        eyebrow: 'Mechanical Prowess',
        title: 'Dynamic Force Combustion.',
        narrative: [
          'At the heart lies the M20A-FKS 2.0-liter engine boasting laser-clad valve seats and ultra-high compression. Paired with Direct Shift-CVT with a physical first launch gear, low-end hesitation is completely eradicated.'
        ],
        imageUrl: 'https://images.pexels.com/photos/33327689/pexels-photo-33327689.jpeg?auto=compress&cs=tinysrgb&w=1600',
        highlights: [
          { label: 'Horsepower', value: '171 PS @ 6,600 rpm' },
          { label: 'Torque Band', value: '207 Nm @ 4,800 rpm' },
          { label: 'Gearbox', value: 'Direct Shift-CVT + Physical 1st' }
        ]
      }
    ],
    gallery: [
      {
        title: 'Adventure Hexagonal Grille',
        description: 'Bespoke front fascia with matte dark finish and integrated fog lamp housings.',
        url: '/vehicles/rav4-adventure.jpg'
      },
      {
        title: 'SofTex Sport Cockpit',
        description: 'Deep bolster seats with orange contrast seam embroidery and laser etching.',
        url: 'https://images.pexels.com/photos/1633602/pexels-photo-1633602.jpeg?auto=compress&cs=tinysrgb&w=1600'
      },
      {
        title: '19-Inch Matte Finished Alloys',
        description: 'Engineered for off-camber rigidity and gravel impact resistance.',
        url: 'https://images.pexels.com/photos/39578152/pexels-photo-39578152.jpeg?auto=compress&cs=tinysrgb&w=1600'
      },
      {
        title: 'Expedition Cargo Bay',
        description: 'Reversible dual-level trunk deck with water-repellent backing.',
        url: 'https://images.pexels.com/photos/261985/pexels-photo-261985.jpeg?auto=compress&cs=tinysrgb&w=1600'
      }
    ],
    specifications: [
      {
        category: 'Powertrain',
        items: [
          { label: 'Engine Code', value: 'M20A-FKS Dynamic Force' },
          { label: 'Displacement', value: '1,987 cc' },
          { label: 'Bore x Stroke', value: '80.5 x 97.6 mm' },
          { label: 'Compression Ratio', value: '13.0:1' }
        ]
      },
      {
        category: 'Drivetrain',
        items: [
          { label: 'AWD System', value: 'Dynamic Torque Vectoring AWD' },
          { label: 'Transmission', value: 'Direct Shift-CVT + Launch Gear' },
          { label: 'Disconnect', value: 'Electromagnetic Rear Driveline' }
        ]
      },
      {
        category: 'Dimensions',
        items: [
          { label: 'Length x Width x Height', value: '4,610 x 1,865 x 1,690 mm' },
          { label: 'Wheelbase', value: '2,690 mm' },
          { label: 'Ground Clearance', value: '200 mm' }
        ]
      }
    ],
    workshopProtocol: [
      'Comprehensive 160-point electronic and mechanical inspection',
      'Rear differential electromagnetic coupling fluid analysis & replenishment',
      'Brake caliper slide pins ultrasonic lubrication & pad depth verification',
      'Diagnostic scan of Dynamic Torque Vectoring ECU with Toyota GTS+',
      'Full chassis underbody rust-proofing seal for coastal durability'
    ]
  },
  {
    id: 'toyota-harrier-hybrid',
    stockNo: 'ALB-4061',
    sbtStockId: 'SBT-TY-HAR-4061',
    chassisNo: '6AA-AXUH85-0012431',
    modelCode: '6AA-AXUH85',
    engineCode: 'A25A-FXS',
    registrationMonth: '05',
    manufactureYearMonth: '2021 / 03',
    steering: 'RHD',
    exteriorColor: 'Precious Black Pearl',
    colorCode: '219',
    interiorColor: 'Dim Gray / Saddle Brown Perforated Leather',
    doors: 5,
    seats: 5,
    locationYard: 'Mombasa Port (Cleared Port)',
    dimensions: '4.74m × 1.85m × 1.66m (4,740 × 1,855 × 1,660 mm)',
    m3: '14.59 m³',
    wheelbase: '2,690 mm',
    groundClearance: '195 mm',
    curbWeight: '1,750 kg',
    grossWeight: '2,025 kg',
    maxLoadingCapacity: '420 kg',
    fuelTankCapacity: '55 L',
    inspectionStatus: 'QISJ Certified & JEVIC Inspected',
    options: {
      pushStart: true,
      smartKey: true,
      powerWindows: true,
      airConditioner: true,
      powerSeats: true,
      leatherSeats: true,
      sunroof: true,
      alloyWheels: true,
      abs: true,
      airbags: true,
      backCamera: true,
      camera360: true,
      radarCruise: true,
      laneAssist: true,
      ledLights: true,
      navigation: true,
    },
    name: 'Toyota Harrier Hybrid Z Leather Package',
    moniker: 'Luxury Hybrid Crossover',
    essenceQuote: 'A quiet, comfortable luxury SUV with smooth hybrid power. Premium leather seats, dimming panoramic roof, and excellent fuel savings of over 21 km per liter.',
    kicker: 'Quiet Luxury & Fuel Savings',
    tagline: 'Premium leather interior with whisper-quiet hybrid all-wheel drive and over 21 km per liter.',
    priceKes: 5200000,
    year: 2021,
    mileageKm: 34100,
    category: 'hybrid',
    bodyType: 'Luxury Mid-Size Crossover',
    fuelType: 'Petrol-Electric Hybrid (THS II)',
    transmission: 'Electronic Continuously Variable Transmission (e-CVT)',
    drivetrain: 'E-Four Electric All-Wheel Drive',
    engine: '2.5L A25A-FXS Dynamic Force Hybrid',
    power: '222 PS Combined System Output',
    torque: '221 Nm (Engine) + 202 Nm (Front Motor) + 121 Nm (Rear Motor)',
    fuelEconomy: '21.6 km/L (Mixed Cycle)',
    auctionGrade: 'Grade 4.5',
    auctionHall: 'TAA Chubu',
    interiorGrade: 'Grade A (Flawless Leather)',
    status: 'In Stock',
    heroVideo: 'https://videos.pexels.com/video-files/856356/856356-hd_1920_1080_30fps.mp4',
    heroImage: '/vehicles/harrier-hybrid.jpg',
    colors: [
      { name: 'Precious Black Pearl', hex: '#111214', imageUrl: '/vehicles/harrier-hybrid.jpg' },
      { name: 'White Pearl Crystal Shine', hex: '#f2f2f4', imageUrl: 'https://images.pexels.com/photos/16176579/pexels-photo-16176579.jpeg?auto=compress&cs=tinysrgb&w=1600' },
      { name: 'Slate Steel Metallic', hex: '#48494d', imageUrl: 'https://images.pexels.com/photos/33327689/pexels-photo-33327689.jpeg?auto=compress&cs=tinysrgb&w=1600' }
    ],
    closerLookPoints: [
      {
        id: 'electrochromic-roof',
        title: 'Dimming Panoramic Glass Roof',
        subtitle: 'Touch-to-Frosted Sunshade',
        description: 'Changes instantly from clear glass to a frosted white tint with one touch, blocking harsh tropical sun heat without needing a curtain.',
        imageUrl: 'https://images.pexels.com/photos/1633602/pexels-photo-1633602.jpeg?auto=compress&cs=tinysrgb&w=1600',
        metric: '0.1s',
        metricLabel: 'Frost Speed'
      },
      {
        id: 'saddle-console',
        title: 'Wide Leather Center Console',
        subtitle: 'Soft Padded Hand-Stitched Leather',
        description: 'Wide, comfortable center armrest and console wrapped in soft leather with double stitching.',
        imageUrl: 'https://images.pexels.com/photos/39578152/pexels-photo-39578152.jpeg?auto=compress&cs=tinysrgb&w=1600',
        metric: 'Genuine',
        metricLabel: 'Soft Leather'
      },
      {
        id: 'rear-light-strip',
        title: 'Full-Width LED Rear Light Bar',
        subtitle: 'Modern Clean Tail Lights',
        description: 'A slim, bright horizontal LED strip spanning the full rear tailgate for maximum nighttime visibility and modern style.',
        imageUrl: 'https://images.pexels.com/photos/261985/pexels-photo-261985.jpeg?auto=compress&cs=tinysrgb&w=1600',
        metric: 'LED',
        metricLabel: 'Light Bar'
      },
      {
        id: 'jbl-surround',
        title: 'JBL 9-Speaker Premium Audio',
        subtitle: 'Clear Studio-Quality Sound',
        description: '9 speakers and a dedicated rear subwoofer deliver clear vocals and rich bass throughout the quiet cabin.',
        imageUrl: 'https://images.pexels.com/photos/16176579/pexels-photo-16176579.jpeg?auto=compress&cs=tinysrgb&w=1600',
        metric: '9 Spkrs',
        metricLabel: 'JBL Audio'
      }
    ],
    editorialFeatures: [
      {
        id: 'seats',
        badge: 'LEATHER COMFORT & SKYROOF',
        title: 'Genuine Leather Seats & Touch-Dimming Panoramic Roof',
        lead: 'Soft ventilated genuine leather seats, a wide leather-trimmed console, and an electric dimming glass roof.',
        narrative: [
          'The interior of the Harrier Z Leather Package is built for executive comfort. The genuine leather seats are soft, durable, and shaped to keep your spine relaxed.',
          'Overhead, the smart panoramic roof changes from transparent glass to a soft frosted shade in a split second at the press of a button, blocking intense sun heat while keeping the cabin bright.',
          'Both front seats come with built-in cooling ventilation for hot days, fast heating for cold mornings, and 10-way electric power controls for the driver.'
        ],
        specs: [
          { label: 'Seat Material', value: 'Genuine Fluted Leather with Clean Contrast Piping' },
          { label: 'Panoramic Skyroof', value: 'Electric Dimming Glass (0.1s Fast Frost)' },
          { label: 'Seat Cooling & Heat', value: 'Front Seat Ventilation Cooling & Rapid Heating' },
          { label: 'Driver Adjustment', value: '10-Way Power Adjustment with Position Memory' }
        ],
        slides: [
          {
            id: 'harrier-seat-1',
            title: 'Electric Dimming Panoramic Roof',
            subtitle: 'Blocks Tropical Sun with One Touch',
            description: 'Frosts instantly to filter out bright sunlight and heat while keeping the interior naturally lit.',
            imageUrl: 'https://images.pexels.com/photos/1633602/pexels-photo-1633602.jpeg?auto=compress&cs=tinysrgb&w=1600',
            metric: '0.1s',
            metricLabel: 'Frost Transition'
          },
          {
            id: 'harrier-seat-2',
            title: 'Ventilated Genuine Leather Seats',
            subtitle: 'Cooled & Heated Front Seats',
            description: 'Soft genuine leather with cooling fans built into the cushions to keep you sweat-free in warm weather.',
            imageUrl: '/vehicles/harrier-hybrid.jpg',
            metric: 'Leather',
            metricLabel: 'Cooled Seats'
          },
          {
            id: 'harrier-seat-3',
            title: 'Padded Leather Center Console',
            subtitle: 'Spacious Center Armrest',
            description: 'Soft padded leather console with cup holders and quiet storage cubbies.',
            imageUrl: 'https://images.pexels.com/photos/39578152/pexels-photo-39578152.jpeg?auto=compress&cs=tinysrgb&w=1600',
            metric: 'Comfort',
            metricLabel: 'Padded Console'
          }
        ]
      },
      {
        id: 'transmission',
        badge: 'HYBRID SYSTEM & ALL-WHEEL DRIVE',
        title: 'Toyota Hybrid System II & Electric E-Four All-Wheel Drive',
        lead: '222 horsepower combined power. Smooth electric and petrol acceleration with smart all-weather rear grip.',
        narrative: [
          'The Harrier Hybrid Z pairs Toyota’s reliable 2.5-liter petrol engine with powerful electric motors. It switches automatically between electric mode and petrol power with zero jerkiness.',
          'The E-Four all-wheel-drive system uses an independent electric motor mounted directly on the rear wheels. When you accelerate hard or drive on wet roads, the rear motor engages instantly to provide strong, safe grip.',
          'With outstanding hybrid efficiency, the Harrier achieves 21.6 km per liter, allowing you to travel roughly 1,000 kilometers on a single 55-liter tank of fuel.'
        ],
        specs: [
          { label: 'Hybrid Drive', value: 'Toyota Hybrid System II (Self-Charging)' },
          { label: 'Combined Power', value: '222 PS Total System Output' },
          { label: 'All-Wheel Drive', value: 'E-Four Electronic On-Demand Rear Electric Motor' },
          { label: 'Fuel Economy', value: '21.6 km/L (Mixed Driving Cycle)' }
        ],
        slides: [
          {
            id: 'harrier-trans-1',
            title: 'Smooth Self-Charging Hybrid Power',
            subtitle: 'Automatic Petrol & Electric Balance',
            description: 'Drives smoothly on battery power in slow city traffic, switching on the petrol engine seamlessly when you need more speed.',
            imageUrl: 'https://images.pexels.com/photos/33327689/pexels-photo-33327689.jpeg?auto=compress&cs=tinysrgb&w=1600',
            metric: '222 PS',
            metricLabel: 'Total Power'
          },
          {
            id: 'harrier-trans-2',
            title: 'Electric E-Four Rear Motor',
            subtitle: 'Instant Traction on Wet Roads',
            description: 'Dedicated rear electric motor activates in milliseconds to give you steady control in heavy rain or loose mud.',
            imageUrl: 'https://images.pexels.com/photos/39578152/pexels-photo-39578152.jpeg?auto=compress&cs=tinysrgb&w=1600',
            metric: 'Instant',
            metricLabel: 'Rear Wheel Pull'
          }
        ]
      },
      {
        id: 'infotainment',
        badge: 'TOUCHSCREEN & SOUND SYSTEM',
        title: 'Wide 12.3-Inch Touchscreen & JBL 9-Speaker Audio',
        lead: 'Extra-wide navigation display with Apple CarPlay, Android Auto, and custom JBL surround sound.',
        narrative: [
          'The center of the dashboard features a wide 12.3-inch high-definition touchscreen. You can view navigation maps and audio details side by side with easy-to-use menu controls.',
          'Audio is handled by a 9-speaker JBL premium sound system designed specifically for the Harrier cabin, giving you rich bass and crisp vocals at any volume.',
          'The driver also benefits from a color Head-Up Display projected onto the windshield, showing speed and GPS turns without looking down.'
        ],
        specs: [
          { label: 'Widescreen Display', value: '12.3-Inch High-Definition Touchscreen' },
          { label: 'Sound System', value: 'JBL 9-Speaker Audio with Subwoofer' },
          { label: 'Windshield Display', value: 'Full-Color Head-Up Display (HUD)' },
          { label: 'Camera Mirror', value: 'Digital Rear-View Camera Mirror' }
        ],
        slides: [
          {
            id: 'harrier-info-1',
            title: '12.3-Inch Widescreen Touchscreen',
            subtitle: 'Easy Split-Screen Maps & Music',
            description: 'Clear, wide screen with Apple CarPlay, Android Auto, and intuitive air conditioning controls.',
            imageUrl: 'https://images.pexels.com/photos/1633602/pexels-photo-1633602.jpeg?auto=compress&cs=tinysrgb&w=1600',
            metric: '12.3"',
            metricLabel: 'HD Screen'
          },
          {
            id: 'harrier-info-2',
            title: 'JBL 9-Speaker Premium Sound',
            subtitle: 'Rich Bass & Crystal-Clear Vocals',
            description: 'Nine tuned speakers and a powerful rear subwoofer deliver concert-like sound across all rows.',
            imageUrl: 'https://images.pexels.com/photos/261985/pexels-photo-261985.jpeg?auto=compress&cs=tinysrgb&w=1600',
            metric: '9 Spkrs',
            metricLabel: 'JBL Audio'
          }
        ]
      },
      {
        id: 'safety',
        badge: 'SAFETY & DRIVER ASSIST',
        title: 'Toyota Safety Sense with Nighttime Radar & Quiet Cabin Glass',
        lead: 'Smart radar emergency braking, blind spot monitoring, and double-pane soundproof glass.',
        narrative: [
          'Toyota Safety Sense monitors the road ahead day and night. The system detects pedestrians and vehicles, alerting you and applying emergency brakes if someone stops suddenly.',
          'Double-laminated soundproof acoustic glass and heavy under-floor insulation keep highway tire roar, wind noise, and city traffic sounds outside the cabin.',
          'Parking cameras and clearance sensors display a 360-degree top view of the vehicle to make tight parking spots simple.'
        ],
        specs: [
          { label: 'Emergency Braking', value: 'Pre-Collision Braking with Day & Night Detection' },
          { label: 'Sound Isolation', value: 'Double-Pane Laminated Acoustic Glass' },
          { label: 'Highway Radar', value: 'Adaptive Cruise Control with Lane Keeping' },
          { label: 'Parking Cameras', value: '360° Panoramic View Monitor + Parking Sonar' }
        ],
        slides: [
          {
            id: 'harrier-safe-1',
            title: 'Pre-Collision Emergency Braking',
            subtitle: 'Day & Night Obstacle Detection',
            description: 'Front radar and camera watch for unexpected stops and pedestrians, braking automatically to prevent accidents.',
            imageUrl: '/vehicles/harrier-hybrid.jpg',
            metric: 'Radar',
            metricLabel: 'Collision Guard'
          },
          {
            id: 'harrier-safe-2',
            title: 'Double-Pane Acoustic Soundproof Glass',
            subtitle: 'Whisper-Quiet Cabin Isolation',
            description: 'Thick laminated front glass blocks highway wind noise and city traffic roar for a peaceful drive.',
            imageUrl: 'https://images.pexels.com/photos/16176579/pexels-photo-16176579.jpeg?auto=compress&cs=tinysrgb&w=1600',
            metric: 'Quiet',
            metricLabel: 'Acoustic Glass'
          }
        ]
      }
    ],
    chapters: [
      {
        id: 'essence',
        tabLabel: 'The Essence',
        eyebrow: 'Architectural Philosophy',
        title: 'Sculpted Monolith of Calm.',
        narrative: [
          'The fourth-generation Harrier discards aggressive utilitarian angles in favor of continuous, fluid sheet metal curvature. Its coupe-like roofline descends gracefully into pronounced haunches.',
          'Equipped with Toyota Hybrid System II, it starts and glides on silent electric current, reserving combustion power for effortless passing sprints with supreme elegance.'
        ],
        imageUrl: '/vehicles/harrier-hybrid.jpg',
        videoUrl: 'https://videos.pexels.com/video-files/856356/856356-hd_1920_1080_30fps.mp4',
        highlights: [
          { label: 'Aerodynamic Cd', value: '0.31 Drag Factor' },
          { label: 'EV Driving Ratio', value: 'Up to 65% in Urban Traffic' },
          { label: 'Platform', value: 'TNGA-K Architecture' }
        ]
      },
      {
        id: 'poise',
        tabLabel: 'Exterior Poise',
        eyebrow: 'Kinetic Fluidity',
        title: 'Couture Proportions.',
        narrative: [
          'The predatory front grille flows into double L-shaped signature LED daytime running lamps. At the rear, an ultra-thin uninterrupted red light strip delivers unforgettable night presence.'
        ],
        imageUrl: 'https://images.pexels.com/photos/261985/pexels-photo-261985.jpeg?auto=compress&cs=tinysrgb&w=1600',
        highlights: [
          { label: 'Length', value: '4,740 mm' },
          { label: 'Wheels', value: '19-Inch Multi-Spoke Bright Cut' },
          { label: 'Lighting', value: 'Signature Dual L-Shape LED' }
        ]
      },
      {
        id: 'sanctuary',
        tabLabel: 'Cabin Comfort',
        eyebrow: 'Quiet Cabin',
        title: 'Quiet Luxury Interior.',
        narrative: [
          'The Harrier interior features rich leather seats, smooth curved wood trim, and ambient lighting designed to keep out city traffic noise.'
        ],
        imageUrl: 'https://images.pexels.com/photos/1633602/pexels-photo-1633602.jpeg?auto=compress&cs=tinysrgb&w=1600',
        highlights: [
          { label: 'Glass Roof', value: 'Electrochromic Dimming' },
          { label: 'Display', value: '12.3-inch Widescreen Navigation' },
          { label: 'Audio', value: 'JBL 9-Speaker Clari-Fi' }
        ]
      },
      {
        id: 'engineering',
        tabLabel: 'Motive Force',
        eyebrow: 'Hybrid Prowess',
        title: 'Whispering E-Four Traction.',
        narrative: [
          'The 2.5L Dynamic Force engine pairs with dual electric motors to output 222 PS. The rear E-Four motor provides instant stabilization on slick roads without mechanical drag.'
        ],
        imageUrl: 'https://images.pexels.com/photos/33327689/pexels-photo-33327689.jpeg?auto=compress&cs=tinysrgb&w=1600',
        highlights: [
          { label: 'Horsepower', value: '222 PS Combined' },
          { label: 'Efficiency', value: '21.6 km/L' },
          { label: 'Rear Motor', value: '121 Nm Direct Drive' }
        ]
      }
    ],
    gallery: [
      {
        title: 'Sculpted Profile Stance',
        description: 'Coupe-style falling roofline paired with flared rear haunches.',
        url: '/vehicles/harrier-hybrid.jpg'
      },
      {
        title: 'Equestrian Saddle Console',
        description: 'Genuine leather wrapped center stack with satin chrome switchgear.',
        url: 'https://images.pexels.com/photos/1633602/pexels-photo-1633602.jpeg?auto=compress&cs=tinysrgb&w=1600'
      },
      {
        title: 'Monolithic Horizon Tail Lamp',
        description: 'Single continuous razor-thin LED element spanning the entire rear liftgate.',
        url: 'https://images.pexels.com/photos/261985/pexels-photo-261985.jpeg?auto=compress&cs=tinysrgb&w=1600'
      },
      {
        title: 'Electrochromic Sky Glass',
        description: 'Frosted paper transition mode in action, deflecting intense midday sun.',
        url: 'https://images.pexels.com/photos/39578152/pexels-photo-39578152.jpeg?auto=compress&cs=tinysrgb&w=1600'
      }
    ],
    specifications: [
      {
        category: 'Hybrid Powertrain',
        items: [
          { label: 'Engine Code', value: 'A25A-FXS Dynamic Force' },
          { label: 'Displacement', value: '2,487 cc' },
          { label: 'Front Motor Output', value: '120 PS / 202 Nm' },
          { label: 'Rear Motor Output', value: '54 PS / 121 Nm' }
        ]
      },
      {
        category: 'Drivetrain',
        items: [
          { label: 'AWD System', value: 'E-Four Electronic On-Demand' },
          { label: 'Transmission', value: 'Electronic Continuously Variable (e-CVT)' },
          { label: 'Battery Type', value: 'Sealed Nickel-Metal Hydride' }
        ]
      },
      {
        category: 'Dimensions',
        items: [
          { label: 'Length x Width x Height', value: '4,740 x 1,855 x 1,660 mm' },
          { label: 'Wheelbase', value: '2,690 mm' },
          { label: 'Curb Weight', value: '1,750 kg' }
        ]
      }
    ],
    workshopProtocol: [
      'Comprehensive 160-point electronic and mechanical inspection',
      'Hybrid high-voltage battery health diagnostic & individual cell resistance check',
      'Inverter cooling system fluid change & bleed with genuine Toyota SLLC',
      'Electrochromic panoramic roof electrical phase circuit diagnostic',
      'Deep leather cleaning and conditioning with premium protective cream'
    ]
  },
  {
    id: 'nissan-note-epower',
    stockNo: 'ALB-4059',
    sbtStockId: 'SBT-NS-NOT-4059',
    chassisNo: 'DAA-HE12-385921',
    modelCode: 'DAA-HE12',
    engineCode: 'HR12DE-EM57',
    registrationMonth: '10',
    manufactureYearMonth: '2019 / 08',
    steering: 'RHD',
    exteriorColor: 'Imperial Amber Metallic',
    colorCode: 'CAS',
    interiorColor: 'Medalist Jacquard Leather & Suede',
    doors: 5,
    seats: 5,
    locationYard: 'Nairobi Showroom (Ready for Viewing)',
    dimensions: '4.10m × 1.69m × 1.52m (4,100 × 1,695 × 1,520 mm)',
    m3: '10.56 m³',
    wheelbase: '2,600 mm',
    groundClearance: '150 mm',
    curbWeight: '1,220 kg',
    grossWeight: '1,495 kg',
    maxLoadingCapacity: '350 kg',
    fuelTankCapacity: '41 L',
    inspectionStatus: 'QISJ Certified',
    options: {
      pushStart: true,
      smartKey: true,
      powerWindows: true,
      airConditioner: true,
      powerSeats: false,
      leatherSeats: true,
      sunroof: false,
      alloyWheels: true,
      abs: true,
      airbags: true,
      backCamera: true,
      camera360: true,
      radarCruise: false,
      laneAssist: true,
      ledLights: true,
      navigation: true,
    },
    name: 'Nissan Note e-POWER Medalist',
    moniker: 'Smart City Hatchback',
    essenceQuote: 'Instant electric acceleration with zero plug-in hassle. Quick in traffic, spacious inside, and outstanding fuel savings of up to 34 km per liter.',
    kicker: 'Fuel-Saver City Cruiser',
    tagline: '100% Electric motor drive with instant pull, one-pedal driving, and up to 34 km per liter.',
    priceKes: 1850000,
    year: 2018,
    mileageKm: 52400,
    category: 'compact',
    bodyType: '5-Door City Hatchback',
    fuelType: 'Series Hybrid (e-POWER)',
    transmission: 'Single-Speed Smooth Electric Drive',
    drivetrain: 'Front-Wheel Drive',
    engine: 'Electric Drive Motor + 1.2L Petrol Generator',
    power: '109 PS (80 kW)',
    torque: '254 Nm Instant Pull',
    fuelEconomy: '34.0 km/L (Mixed Cycle)',
    auctionGrade: 'Grade 4.5',
    auctionHall: 'USS Nagoya',
    interiorGrade: 'Grade A (Medalist Wood & Leather)',
    status: 'In Stock',
    heroVideo: 'https://videos.pexels.com/video-files/2103099/2103099-hd_1920_1080_30fps.mp4',
    heroImage: '/vehicles/note-epower.jpg',
    colors: [
      { name: 'Imperial Amber Metallic', hex: '#63391b', imageUrl: '/vehicles/note-epower.jpg' },
      { name: 'Brilliant Silver Metallic', hex: '#c5c7cb', imageUrl: 'https://images.pexels.com/photos/16176579/pexels-photo-16176579.jpeg?auto=compress&cs=tinysrgb&w=1600' },
      { name: 'Sonic Blue Pearl', hex: '#163868', imageUrl: 'https://images.pexels.com/photos/33327689/pexels-photo-33327689.jpeg?auto=compress&cs=tinysrgb&w=1600' }
    ],
    closerLookPoints: [
      {
        id: 'em57-motor',
        title: 'Instant Electric Motor',
        subtitle: 'Strong Takeoff Pull',
        description: 'Drives purely with an electric motor borrowed from the Nissan LEAF, giving you instant pull with no gear lag.',
        imageUrl: 'https://images.pexels.com/photos/33327689/pexels-photo-33327689.jpeg?auto=compress&cs=tinysrgb&w=1600',
        metric: '254 Nm',
        metricLabel: 'Instant Torque'
      },
      {
        id: 'one-pedal',
        title: 'e-Pedal One-Pedal Driving',
        subtitle: 'Easy Driving in Traffic',
        description: 'Speed up and slow down smoothly using just the accelerator pedal, making heavy traffic jams relaxing while saving brake pads.',
        imageUrl: 'https://images.pexels.com/photos/39578152/pexels-photo-39578152.jpeg?auto=compress&cs=tinysrgb&w=1600',
        metric: 'e-Pedal',
        metricLabel: 'Single-Pedal Control'
      },
      {
        id: 'subfloor-battery',
        title: 'Floor-Mounted Battery',
        subtitle: 'Stable Handling & Big Boot',
        description: 'The compact battery sits under the front seats to keep the car steady around corners while preserving full boot space.',
        imageUrl: 'https://images.pexels.com/photos/261985/pexels-photo-261985.jpeg?auto=compress&cs=tinysrgb&w=1600',
        metric: 'Low Center',
        metricLabel: 'Chassis Balance'
      },
      {
        id: 'medallist-trim',
        title: 'Medalist Luxury Interior',
        subtitle: 'Woodgrain & Leather Finishes',
        description: 'Top-of-the-range Japanese Medalist model featuring two-tone stitched leather seats and dark woodgrain trim.',
        imageUrl: 'https://images.pexels.com/photos/1633602/pexels-photo-1633602.jpeg?auto=compress&cs=tinysrgb&w=1600',
        metric: 'Medalist',
        metricLabel: 'Top Spec'
      }
    ],
    editorialFeatures: [
      {
        id: 'seats',
        badge: 'SEATING COMFORT & REAR SPACE',
        title: 'Medalist Leather Seats & Extra Rear Legroom',
        lead: 'Generous rear legroom matching larger sedans, Zero-Gravity spinal support, and premium two-tone Medalist leather.',
        narrative: [
          'Inside the Note e-POWER Medalist, you will be surprised by how roomy the rear seats are. Adults have generous knee room comparable to mid-size sedans.',
          'The seats are shaped to support your spine naturally, finished in two-tone jacquard fabric with rich brown leather bolsters and contrast copper stitching.',
          'The wide-opening doors make getting in and out easy in tight parking spots, and the rear seats fold down to create plenty of cargo space for grocery shopping or travel luggage.'
        ],
        specs: [
          { label: 'Seat Package', value: 'Medalist Two-Tone Leather & Textured Fabric' },
          { label: 'Rear Legroom', value: 'Generous Adult Knee Clearance' },
          { label: 'Door Angle', value: '85-Degree Wide Angle Opening Doors' },
          { label: 'Seat Ergonomics', value: 'Zero-Gravity Fatigue Reducing Shape' }
        ],
        slides: [
          {
            id: 'note-seat-1',
            title: 'Medalist Two-Tone Interior',
            subtitle: 'Rich Leather Bolsters & Copper Stitching',
            description: 'Soft brown leather bolsters paired with textured fabric centers for superior comfort and durability.',
            imageUrl: 'https://images.pexels.com/photos/1633602/pexels-photo-1633602.jpeg?auto=compress&cs=tinysrgb&w=1600',
            metric: 'Medalist',
            metricLabel: 'Top Japanese Grade'
          },
          {
            id: 'note-seat-2',
            title: 'Generous Rear Legroom',
            subtitle: 'Spacious Cabin in an Easy-to-Park Car',
            description: 'Flat floor design gives three adult passengers plenty of room to stretch their legs on road trips.',
            imageUrl: 'https://images.pexels.com/photos/39578152/pexels-photo-39578152.jpeg?auto=compress&cs=tinysrgb&w=1600',
            metric: 'Spacious',
            metricLabel: 'Adult Legroom'
          }
        ]
      },
      {
        id: 'transmission',
        badge: 'ELECTRIC DRIVE & FUEL SAVINGS',
        title: '100% Electric Motor Drive & Smooth Single-Speed Gearbox',
        lead: 'Instant 254 Nm of electric torque straight to the wheels with exceptional 34 km per liter fuel savings.',
        narrative: [
          'The Nissan Note e-POWER runs 100% on electric motor power. The wheels are driven directly by an electric motor, giving you 254 Nm of instant torque the moment you step on the gas.',
          'Because there are no gears shifting up and down, acceleration is completely smooth with no jerky gear changes.',
          'The small 1.2-liter petrol engine runs quietly only to charge the battery when needed. It never drives the wheels directly, delivering amazing fuel savings of up to 34 km per liter.',
          'With e-Pedal, taking your foot off the gas slows the car down smoothly while charging the battery, cutting brake wear and making traffic driving effortless.'
        ],
        specs: [
          { label: 'Electric Motor', value: 'High-Torque Synchronous Electric Motor' },
          { label: 'Gearbox Type', value: 'Smooth Single-Speed Direct Reduction Drive' },
          { label: 'Instant Pull', value: '254 Nm Instant Torque from 0 RPM' },
          { label: 'Fuel Economy', value: '34.0 km/L (Certified Mixed Cycle)' }
        ],
        slides: [
          {
            id: 'note-trans-1',
            title: 'Electric Drive Motor',
            subtitle: 'Instant 254 Nm Pull from Standstill',
            description: 'Takes off immediately with instant electric response, overtaking easily in city traffic.',
            imageUrl: '/vehicles/note-epower.jpg',
            metric: '254 Nm',
            metricLabel: 'Instant Torque'
          },
          {
            id: 'note-trans-2',
            title: 'Smooth Single-Speed Drive',
            subtitle: 'Zero Gear Shifts, Zero Jerkiness',
            description: 'Direct motor drive means zero clutch wear, whisper-quiet operation, and low maintenance costs.',
            imageUrl: 'https://images.pexels.com/photos/33327689/pexels-photo-33327689.jpeg?auto=compress&cs=tinysrgb&w=1600',
            metric: 'Single-Speed',
            metricLabel: 'Smooth Drive'
          }
        ]
      },
      {
        id: 'infotainment',
        badge: 'TOUCHSCREEN & SMART MIRROR',
        title: 'Smart Digital Camera Mirror & Central Touchscreen',
        lead: 'High-definition digital rear-view mirror with reverse camera and easy smartphone connectivity.',
        narrative: [
          'The Note e-POWER Medalist features a smart digital rear-view mirror. With one flick of a switch, the mirror turns into a camera screen, giving you a crystal-clear view behind the car even with tall passengers or full luggage in the back.',
          'The central touchscreen connects via Bluetooth for wireless music streaming, hands-free calls, and clear reverse parking guidelines.',
          'The instrument cluster features an easy-to-read hybrid power gauge that shows when the battery is charging or providing electric boost.'
        ],
        specs: [
          { label: 'Rearview Mirror', value: 'Smart Digital Rear-View Mirror with Camera View' },
          { label: 'Parking Vision', value: 'Reverse Camera with Dynamic Guide Lines' },
          { label: 'Instrument Cluster', value: 'Hybrid Power Flow & Battery Charge Gauge' },
          { label: 'Climate Control', value: 'Automatic Digital Climate Control with Fast Cool' }
        ],
        slides: [
          {
            id: 'note-info-1',
            title: 'Smart Camera Rear-View Mirror',
            subtitle: 'Clear View Even with Full Luggage',
            description: 'Switches between standard optical mirror and camera video feed so you always see clearly behind you.',
            imageUrl: 'https://images.pexels.com/photos/261985/pexels-photo-261985.jpeg?auto=compress&cs=tinysrgb&w=1600',
            metric: 'Smart LCD',
            metricLabel: 'Camera Mirror'
          },
          {
            id: 'note-info-2',
            title: 'Digital Climate Control Pod',
            subtitle: 'Quick Cabin Cooling with Digital Controls',
            description: 'Easy push-button air conditioning with automatic temperature control to keep the cabin cool.',
            imageUrl: 'https://images.pexels.com/photos/1633602/pexels-photo-1633602.jpeg?auto=compress&cs=tinysrgb&w=1600',
            metric: 'Auto',
            metricLabel: 'Climate Control'
          }
        ]
      },
      {
        id: 'safety',
        badge: 'SAFETY & DRIVER ASSIST',
        title: 'Automatic Emergency Braking & Tight Turning Circle',
        lead: 'Emergency braking with pedestrian detection, lane departure warning, and an ultra-tight 5.2m turning circle.',
        narrative: [
          'Driving in city traffic is relaxed thanks to Nissan’s active safety features. The windshield camera watches traffic ahead and applies Intelligent Emergency Braking if a car or pedestrian steps into your path.',
          'Pedal misoperation protection prevents accidental acceleration if you mistakenly press the gas pedal instead of the brake near walls or parked cars.',
          'With an ultra-tight 5.2-meter turning circle, U-turns and tight parking maneuvers in crowded urban streets are completely effortless.'
        ],
        specs: [
          { label: 'Emergency Braking', value: 'Automatic Emergency Braking with Pedestrian Detection' },
          { label: 'Pedal Safety', value: 'Accidental Acceleration Prevention Shield' },
          { label: 'Lane Warning', value: 'Lane Departure Warning with Audio Alert' },
          { label: 'Turning Radius', value: 'Tight 5.2-Meter City Turning Circle' }
        ],
        slides: [
          {
            id: 'note-safe-1',
            title: 'Automatic Emergency Braking',
            subtitle: 'Front Camera Collision Prevention',
            description: 'Monitors cars and pedestrians ahead, applying emergency brakes to prevent city accidents.',
            imageUrl: '/vehicles/note-epower.jpg',
            metric: 'Automatic',
            metricLabel: 'Safety Braking'
          },
          {
            id: 'note-safe-2',
            title: '5.2-Meter Tight Turning Circle',
            subtitle: 'Effortless U-Turns & City Parking',
            description: 'Tight turning radius makes parking in tight supermarket basements and narrow town streets easy.',
            imageUrl: 'https://images.pexels.com/photos/16176579/pexels-photo-16176579.jpeg?auto=compress&cs=tinysrgb&w=1600',
            metric: '5.2 m',
            metricLabel: 'Turning Circle'
          }
        ]
      }
    ],
    chapters: [
      {
        id: 'essence',
        tabLabel: 'The Essence',
        eyebrow: 'Electrified Genesis',
        title: 'EV Performance Without the Plug.',
        narrative: [
          'The Note e-POWER bridges the future of mobility with present-day infrastructure. The electric motor drives the wheels 100% of the time, while the compact 1.2L petrol engine acts solely as an on-demand generator.',
          'You never plug it in. You refuel at any standard petrol station in two minutes and enjoy the silent, instant-torque thrills of a pure electric vehicle.'
        ],
        imageUrl: '/vehicles/note-epower.jpg',
        videoUrl: 'https://videos.pexels.com/video-files/2103099/2103099-hd_1920_1080_30fps.mp4',
        highlights: [
          { label: 'Electric Drive', value: '100% of the time' },
          { label: 'Plug-in Needed', value: 'Zero (Gas-Generated EV)' },
          { label: 'Economy', value: '34.0 km/L JC08' }
        ]
      },
      {
        id: 'sanctuary',
        tabLabel: 'Cabin Comfort',
        eyebrow: 'Medalist Cabin',
        title: 'Executive Cabin Finish.',
        narrative: [
          'The Medalist grade elevates the cabin with piano black trim, genuine leather-wrapped steering wheel, and dual-tone stitched seats for comfortable daily commuting.'
        ],
        imageUrl: 'https://images.pexels.com/photos/1633602/pexels-photo-1633602.jpeg?auto=compress&cs=tinysrgb&w=1600',
        highlights: [
          { label: 'Seating', value: 'Medalist Leather / Jacquard' },
          { label: 'Vision', value: 'Smart Digital Mirror' },
          { label: 'Aircon', value: 'Auto Push-Button Climate' }
        ]
      }
    ],
    gallery: [
      {
        title: 'Imperial Amber Facia',
        description: 'V-Motion chrome grille with electric blue signature accent striping.',
        url: '/vehicles/note-epower.jpg'
      },
      {
        title: 'Medalist Flagship Interior',
        description: 'Two-tone seats with high-gloss piano black dashboard trims.',
        url: 'https://images.pexels.com/photos/1633602/pexels-photo-1633602.jpeg?auto=compress&cs=tinysrgb&w=1600'
      },
      {
        title: 'Aerodynamic Alloy Wheels',
        description: 'Low-drag 15-inch alloy wheels optimized for regenerative coasting.',
        url: 'https://images.pexels.com/photos/33327689/pexels-photo-33327689.jpeg?auto=compress&cs=tinysrgb&w=1600'
      },
      {
        title: 'Compact Subfloor Architecture',
        description: 'Battery housed beneath front seats to preserve full 330-liter cargo deck.',
        url: 'https://images.pexels.com/photos/261985/pexels-photo-261985.jpeg?auto=compress&cs=tinysrgb&w=1600'
      }
    ],
    specifications: [
      {
        category: 'e-POWER Powertrain',
        items: [
          { label: 'Electric Motor', value: 'EM57 AC Synchronous' },
          { label: 'Motor Output', value: '109 PS / 254 Nm' },
          { label: 'Generator', value: '1,198 cc 3-Cylinder DOHC' },
          { label: 'Fuel Tank', value: '41 Liters' }
        ]
      },
      {
        category: 'Dimensions',
        items: [
          { label: 'Length x Width x Height', value: '4,100 x 1,695 x 1,525 mm' },
          { label: 'Wheelbase', value: '2,600 mm' },
          { label: 'Turning Radius', value: '5.2 meters' }
        ]
      }
    ],
    workshopProtocol: [
      'Comprehensive 160-point electronic and mechanical inspection',
      'e-POWER inverter module high-voltage diagnostic and insulation check',
      'Engine generator oil flush with 0W-16 ultra-low viscosity lubricant',
      'Electronic brake actuator calibration for smooth regenerative blending',
      'Cabin air disinfection and micro-filter replacement'
    ]
  },
  {
    id: 'nissan-serena-highway-star',
    stockNo: 'ALB-4060',
    sbtStockId: 'SBT-NS-SER-4060',
    chassisNo: '6AA-HFC27-048211',
    modelCode: '6AA-HFC27',
    engineCode: 'HR12DE-EM57',
    registrationMonth: '02',
    manufactureYearMonth: '2019 / 12',
    steering: 'RHD',
    exteriorColor: 'Diamond Black Pearl',
    colorCode: 'G41',
    interiorColor: 'Highway Star Charcoal Leatherette & Fabric',
    doors: 5,
    seats: 7,
    locationYard: 'Mombasa Port (Cleared Port)',
    dimensions: '4.77m × 1.74m × 1.86m (4,770 × 1,740 × 1,865 mm)',
    m3: '15.48 m³',
    wheelbase: '2,860 mm',
    groundClearance: '160 mm',
    curbWeight: '1,760 kg',
    grossWeight: '2,145 kg',
    maxLoadingCapacity: '500 kg',
    fuelTankCapacity: '55 L',
    inspectionStatus: 'QISJ Certified & JEVIC Inspected',
    options: {
      pushStart: true,
      smartKey: true,
      powerWindows: true,
      airConditioner: true,
      powerSeats: false,
      leatherSeats: true,
      sunroof: false,
      alloyWheels: true,
      abs: true,
      airbags: true,
      backCamera: true,
      camera360: true,
      radarCruise: true,
      laneAssist: true,
      ledLights: true,
      navigation: true,
    },
    name: 'Nissan Serena Highway Star e-POWER',
    moniker: 'Spacious Family Cruiser',
    essenceQuote: 'Comfortable travel for the entire family. A quiet, smooth electric drive with automatic foot-kick sliding doors and seats designed to prevent fatigue on long road trips.',
    kicker: 'Spacious 7-Seater Comfort',
    tagline: '7-Passenger family cruiser with quiet electric drive and hands-free automatic sliding doors.',
    priceKes: 2950000,
    year: 2019,
    mileageKm: 61000,
    category: 'van',
    bodyType: '7-Seater Family MPV',
    fuelType: 'Petrol-Electric Hybrid (e-POWER)',
    transmission: 'Single-Speed Smooth Electric Drive',
    drivetrain: 'Front-Wheel Drive',
    engine: 'Electric Drive Motor + 1.2L Petrol Generator',
    power: '136 PS (100 kW)',
    torque: '320 Nm Instant Pull',
    fuelEconomy: '26.2 km/L (Mixed Cycle)',
    auctionGrade: 'Grade 4.5',
    auctionHall: 'USS Yokohama',
    interiorGrade: 'Grade A (Clean Interior)',
    status: 'In Stock',
    heroVideo: 'https://videos.pexels.com/video-files/2053100/2053100-hd_1920_1080_30fps.mp4',
    heroImage: '/vehicles/serena-highway-star.jpg',
    colors: [
      { name: 'Diamond Black Pearl', hex: '#141416', imageUrl: '/vehicles/serena-highway-star.jpg' },
      { name: 'Phantom Black Metallic', hex: '#1c1d1f', imageUrl: 'https://images.pexels.com/photos/261985/pexels-photo-261985.jpeg?auto=compress&cs=tinysrgb&w=1600' },
      { name: 'Pure Pearl White', hex: '#f5f5f7', imageUrl: 'https://images.pexels.com/photos/20430089/pexels-photo-20430089.jpeg?auto=compress&cs=tinysrgb&w=1600' }
    ],
    closerLookPoints: [
      {
        id: 'captain-chairs',
        title: 'Zero-Gravity Captain Seats',
        subtitle: 'Designed to Reduce Back Fatigue',
        description: 'Comfortable seats shaped to support your spine naturally, so you and your passengers stay fresh even on long-distance highway journeys.',
        imageUrl: '/vehicles/serena-interior-seats.jpg',
        metric: '2-2-3',
        metricLabel: 'Lounge Seating'
      },
      {
        id: 'dual-back-door',
        title: 'Dual-Back Opening Tailgate',
        subtitle: 'Open Just the Top Glass',
        description: 'Open just the top glass window when parked close to a wall, or open the full tailgate when loading large luggage and shopping bags.',
        imageUrl: 'https://images.pexels.com/photos/39578152/pexels-photo-39578152.jpeg?auto=compress&cs=tinysrgb&w=1600',
        metric: '40 cm',
        metricLabel: 'Minimum Space Needed'
      },
      {
        id: 'kick-doors',
        title: 'Hands-Free Kick Sliding Doors',
        subtitle: 'Automatic Foot-Sensor Doors',
        description: 'Wave your foot under the side door while holding the key in your pocket to slide the doors open automatically—even when your hands are full.',
        imageUrl: 'https://images.pexels.com/photos/261985/pexels-photo-261985.jpeg?auto=compress&cs=tinysrgb&w=1600',
        metric: 'Dual',
        metricLabel: 'Power Doors'
      },
      {
        id: 'propilot',
        title: 'Nissan ProPILOT Suite',
        subtitle: 'Highway Driving Assistance',
        description: 'Helps you stay safely centered in your lane and keeps a safe distance from cars ahead, automatically stopping and moving in slow traffic.',
        imageUrl: '/vehicles/serena-highway-star.jpg',
        metric: 'ProPILOT',
        metricLabel: 'Radar Assist'
      }
    ],
    editorialFeatures: [
      {
        id: 'seats',
        badge: 'CABIN & SEATING COMFORT',
        title: 'Zero-Gravity Captain Seats & Spacious Family Cabin',
        lead: 'Specially shaped seats that support your back and legs, giving everyone plenty of room to relax on long road trips across Kenya.',
        narrative: [
          'Nissan shaped these seats to match natural body posture, spreading weight evenly across 14 support points. This stops your back and legs from getting stiff and tired on long highway trips.',
          'Passengers in the second row get independent captain chairs that slide forward and back on long rails. Each seat comes with fold-out calf rests, armrests, and personal tray tables with cup holders.',
          'A clear center walk-through aisle lets kids and adults move between rows easily without climbing over seats. The large sliding doors open with a quick foot kick, and the rear door lets you open just the top window in tight parking spots.'
        ],
        specs: [
          { label: 'Seating Layout', value: '7-Passenger (2+2+3) Walk-Through Cabin' },
          { label: 'Ergonomic Standard', value: 'Zero-Gravity Spinal Support' },
          { label: 'Second Row VIP', value: 'Dual Captain Chairs with Calf Rests' },
          { label: 'Hands-Free Entry', value: 'Dual Foot-Sensor Electric Sliding Doors' },
          { label: 'Rear Cargo Access', value: 'Dual-Back Split Upper Glass Tailgate' }
        ],
        slides: [
          {
            id: 'serena-seat-1',
            title: "Zero-Gravity Captain's Lounge",
            subtitle: 'Comfortable Back Support & Leg Rests',
            description: 'Two individual captain chairs in the middle row with fold-out leg rests, armrests, and 700mm sliding tracks for generous legroom.',
            imageUrl: '/vehicles/serena-interior-seats.jpg',
            metric: '14 Points',
            metricLabel: 'Spine Support'
          },
          {
            id: 'serena-seat-2',
            title: 'Walk-Through Center Aisle',
            subtitle: 'Easy Movement Between Rows',
            description: 'Center walkway lets passengers move easily between rows. The third row folds up flat against the sides to open up a massive 1,200L luggage boot.',
            imageUrl: 'https://images.pexels.com/photos/1633602/pexels-photo-1633602.jpeg?auto=compress&cs=tinysrgb&w=1600',
            metric: '1,200 L',
            metricLabel: 'Max Luggage Space'
          },
          {
            id: 'serena-seat-3',
            title: 'Personal Tray Tables & USB Ports',
            subtitle: 'Fold-Out Tables & Phone Chargers',
            description: 'Each middle seat has an airplane-style fold-down picnic tray with cup holders, bag hooks, and fast USB charging ports.',
            imageUrl: 'https://images.pexels.com/photos/39578152/pexels-photo-39578152.jpeg?auto=compress&cs=tinysrgb&w=1600',
            metric: '6 Ports',
            metricLabel: 'Fast USB Outlets'
          },
          {
            id: 'serena-seat-4',
            title: 'Foot-Kick Sliding Doors',
            subtitle: 'Hands-Free Automatic Entry',
            description: 'Wave your foot under the side door while holding the smart key to open the door automatically, even when holding heavy bags or children.',
            imageUrl: 'https://images.pexels.com/photos/261985/pexels-photo-261985.jpeg?auto=compress&cs=tinysrgb&w=1600',
            metric: '802 mm',
            metricLabel: 'Extra-Wide Door Opening'
          }
        ]
      },
      {
        id: 'transmission',
        badge: 'E-POWER HYBRID DRIVE',
        title: '100% Electric Motor Drive & Smooth Single-Speed Gearbox',
        lead: 'Direct electric motor drive with zero jerky gear shifts. 320 Nm of instant torque delivers whisper-quiet acceleration from a complete stop.',
        narrative: [
          'Unlike traditional vans with jerky gearboxes, the Serena e-POWER drives exclusively using an electric motor. The motor turns the wheels directly, giving you immediate power the instant you touch the pedal.',
          'Because there are no gearbox gears shifting up and down, the ride is completely smooth. You get full 320 Nm torque from zero RPM, making overtaking and stop-and-go town driving effortless.',
          'A quiet 1.2-liter petrol engine runs automatically only when needed to generate electricity for the battery. It never drives the wheels directly, delivering outstanding fuel savings of up to 26 km per liter.',
          'With Nissan e-Pedal, taking your foot off the accelerator slows down the car smoothly while harvesting energy back into the battery and saving wear on your brakes.'
        ],
        specs: [
          { label: 'Traction Motor', value: 'High-Output AC Synchronous Electric Motor' },
          { label: 'Gearbox Architecture', value: 'Single-Speed Smooth Helical Reduction Gear' },
          { label: 'Peak Torque', value: '320 Nm Instant Torque @ 0–3,008 RPM' },
          { label: 'Generator Engine', value: '1.2L Pure Electric Power Generator' },
          { label: 'Deceleration System', value: 'e-Pedal Smooth Energy Recovery' }
        ],
        slides: [
          {
            id: 'serena-trans-1',
            title: 'Electric Motor & Direct Helical Drive',
            subtitle: 'Smooth One-Speed Acceleration',
            description: 'Zero clutches and zero gear shifts. 320 Nm of pure electric power moves the vehicle smoothly from a standstill.',
            imageUrl: '/vehicles/serena-transmission-gearbox.jpg',
            metric: '320 Nm',
            metricLabel: 'Instant Torque'
          },
          {
            id: 'serena-trans-2',
            title: 'Quiet Onboard Generator Engine',
            subtitle: 'Dedicated Power Generator',
            description: 'The 1.2L petrol engine acts strictly as an electrical generator for the battery, delivering exceptional 26.2 km/L fuel economy.',
            imageUrl: 'https://images.pexels.com/photos/33327689/pexels-photo-33327689.jpeg?auto=compress&cs=tinysrgb&w=1600',
            metric: '26.2 km/L',
            metricLabel: 'Certified Fuel Economy'
          },
          {
            id: 'serena-trans-3',
            title: 'Smart Power Inverter',
            subtitle: 'Efficient Energy Management',
            description: 'Directs electricity smoothly between the battery, generator, and electric motor with 98% electrical efficiency.',
            imageUrl: 'https://images.pexels.com/photos/39578152/pexels-photo-39578152.jpeg?auto=compress&cs=tinysrgb&w=1600',
            metric: '98%',
            metricLabel: 'Power Efficiency'
          },
          {
            id: 'serena-trans-4',
            title: 'e-Pedal One-Pedal Driving',
            subtitle: 'Smooth Braking & Energy Recharge',
            description: 'Lifting off the gas pedal slows the car down smoothly while recharging the hybrid battery and extending brake pad life.',
            imageUrl: 'https://images.pexels.com/photos/16176579/pexels-photo-16176579.jpeg?auto=compress&cs=tinysrgb&w=1600',
            metric: '0.15 G',
            metricLabel: 'Smooth Deceleration'
          }
        ]
      },
      {
        id: 'infotainment',
        badge: 'TOUCHSCREEN & CAMERAS',
        title: '10.1-Inch HD Touchscreen & 360-Degree Camera',
        lead: 'High-definition central touchscreen with Apple CarPlay and Android Auto, plus a 360-degree bird’s-eye view camera for stress-free parking.',
        narrative: [
          'The driver instrument screen is positioned high on the dashboard so you can see your speed, hybrid battery level, and safety warnings without looking away from the road.',
          'The 10.1-inch central touchscreen links directly to your smartphone with Apple CarPlay and Android Auto for GPS maps, music, and hands-free calls.',
          'Parking in tight urban parking spaces is effortless with the 360-degree Around View Monitor. Four cameras show an overhead bird’s-eye view, alerting you if pedestrians or objects get close.',
          'Tri-zone automatic air conditioning cools all three rows evenly and uses air purification filters to keep road dust, smoke, and pollen out of the cabin.'
        ],
        specs: [
          { label: 'Main Display', value: '10.1-inch High-Definition Touchscreen' },
          { label: 'Driver Instrument Screen', value: '7.0-inch Full-Color Driver Assist Display' },
          { label: 'Surround Vision', value: '360° Intelligent Around View Monitor (AVM)' },
          { label: 'Smartphone Connection', value: 'Apple CarPlay & Android Auto' },
          { label: 'Air Quality System', value: 'Tri-Zone Climate Control + Air Filter' }
        ],
        slides: [
          {
            id: 'serena-info-1',
            title: '10.1" High-Definition Touchscreen',
            subtitle: 'Easy-to-Use Media & Navigation Center',
            description: 'Clear, anti-glare touchscreen with phone mirroring, music streaming, and real-time hybrid power displays.',
            imageUrl: '/vehicles/serena-infotainment-cockpit.jpg',
            metric: '10.1"',
            metricLabel: 'HD Screen'
          },
          {
            id: 'serena-info-2',
            title: '360-Degree Around View Monitor',
            subtitle: 'Bird’s-Eye Parking Cameras',
            description: '4 exterior cameras stitch together a top-down view of the car to make parking and reversing simple and collision-free.',
            imageUrl: 'https://images.pexels.com/photos/261985/pexels-photo-261985.jpeg?auto=compress&cs=tinysrgb&w=1600',
            metric: '360°',
            metricLabel: 'Surround View'
          },
          {
            id: 'serena-info-3',
            title: 'Elevated 7-Inch Driver Screen',
            subtitle: 'Eye-Level Digital Instruments',
            description: 'Mounted right in your natural sightline so your speed, safety warnings, and battery status are clear without distraction.',
            imageUrl: 'https://images.pexels.com/photos/1633602/pexels-photo-1633602.jpeg?auto=compress&cs=tinysrgb&w=1600',
            metric: '7.0"',
            metricLabel: 'Color Screen'
          },
          {
            id: 'serena-info-4',
            title: 'Tri-Zone Air Filtration',
            subtitle: 'Clean Air for All Three Rows',
            description: 'Separate AC vents for front and rear passengers with built-in air purification to eliminate dust and exhaust fumes.',
            imageUrl: 'https://images.pexels.com/photos/20430089/pexels-photo-20430089.jpeg?auto=compress&cs=tinysrgb&w=1600',
            metric: 'Tri-Zone',
            metricLabel: 'Climate Control'
          }
        ]
      },
      {
        id: 'safety',
        badge: 'SAFETY & DRIVER ASSIST',
        title: 'Nissan ProPILOT Highway Assist & Crash Protection',
        lead: 'Smart radar assist helps you stay in your lane and keep safe distance on highways, supported by automatic braking and 6 airbags.',
        narrative: [
          'Nissan ProPILOT makes highway driving relaxing. Using radar and a camera, it gently helps steer to keep the vehicle centered in the lane while keeping a safe gap behind cars ahead.',
          'In slow stop-and-go highway jams, ProPILOT automatically slows down to a full stop and holds your position safely until traffic moves again.',
          'Intelligent Emergency Braking watches for sudden stops by leading cars or crossing pedestrians, warning you with beeps and braking automatically if needed.',
          'The body is built with high-strength reinforced steel, with side curtain airbags extending all the way to the third row to protect all seven passengers.'
        ],
        specs: [
          { label: 'Highway Driver Assist', value: 'Nissan ProPILOT Lane Centering & Cruise' },
          { label: 'Radar System', value: 'Front Radar + Windshield Camera' },
          { label: 'Collision Prevention', value: 'Automatic Emergency Braking with Pedestrian Detection' },
          { label: 'Parking Sonar', value: 'Front and Rear Ultrasonic Parking Sensors' },
          { label: 'Airbag Protection', value: 'Reinforced Safety Cell + 6 Curtain Airbags' }
        ],
        slides: [
          {
            id: 'serena-safe-1',
            title: 'ProPILOT Highway Driving Assist',
            subtitle: 'Lane Centering & Distance Control',
            description: 'Helps steer and control your cruising speed on highways, reducing fatigue during long family road trips.',
            imageUrl: '/vehicles/serena-highway-star.jpg',
            metric: 'ProPILOT',
            metricLabel: 'Highway Assist'
          },
          {
            id: 'serena-safe-2',
            title: 'Automatic Emergency Braking',
            subtitle: 'Forward Collision Prevention',
            description: 'Detects unexpected stops or crossing pedestrians ahead and can apply full emergency braking to avoid accidents.',
            imageUrl: 'https://images.pexels.com/photos/16176579/pexels-photo-16176579.jpeg?auto=compress&cs=tinysrgb&w=1600',
            metric: 'Automatic',
            metricLabel: 'Safety Braking'
          },
          {
            id: 'serena-safe-3',
            title: 'Front & Rear Parking Sensors',
            subtitle: 'Prevents Low-Speed Bumps',
            description: 'Ultrasonic sensors sound clear warning beeps and prevent accidental throttle taps when parking against walls or pillars.',
            imageUrl: 'https://images.pexels.com/photos/33327689/pexels-photo-33327689.jpeg?auto=compress&cs=tinysrgb&w=1600',
            metric: '8 Sensors',
            metricLabel: 'Surround Sonar'
          },
          {
            id: 'serena-safe-4',
            title: 'Reinforced Steel Frame & 6 Airbags',
            subtitle: 'Protection for All Three Rows',
            description: 'High-strength steel crumple zones with full-length side curtain airbags extending to protect all seven passengers.',
            imageUrl: 'https://images.pexels.com/photos/39578152/pexels-photo-39578152.jpeg?auto=compress&cs=tinysrgb&w=1600',
            metric: '6 Airbags',
            metricLabel: 'Full Cabin Shield'
          }
        ]
      }
    ],
    chapters: [
      {
        id: 'essence',
        tabLabel: 'The Essence',
        eyebrow: 'Hospitality Refined',
        title: 'First-Class Family Comfort.',
        narrative: [
          'The Serena Highway Star e-POWER makes every family trip quiet and relaxing. With thick double acoustic glass and smooth electric motor drive, passengers enjoy a peaceful, vibration-free ride.',
          'Because the wheels are powered directly by an electric motor, there is no annoying gear shifting—just smooth, instant power from the moment you tap the pedal.'
        ],
        imageUrl: '/vehicles/serena-highway-star.jpg',
        videoUrl: 'https://videos.pexels.com/video-files/2053100/2053100-hd_1920_1080_30fps.mp4',
        highlights: [
          { label: 'Seating', value: '7 Captains with Aisle' },
          { label: 'Acoustics', value: 'Whisper Silent e-POWER' },
          { label: 'Access', value: 'Dual Hands-Free Doors' }
        ]
      }
    ],
    gallery: [
      {
        title: 'Highway Star Front Stance',
        description: 'V-Motion double chrome horizontal bar styling.',
        url: '/vehicles/serena-highway-star.jpg'
      },
      {
        title: 'Lounge Cabin Layout',
        description: 'Individual captain chairs with fold-down airplane tables and cup holders.',
        url: '/vehicles/serena-interior-seats.jpg'
      },
      {
        title: 'Split Rear Tailgate',
        description: 'Upper half glass hatch for tight multi-story parking garages.',
        url: 'https://images.pexels.com/photos/39578152/pexels-photo-39578152.jpeg?auto=compress&cs=tinysrgb&w=1600'
      },
      {
        title: 'Dark Pearl Presence',
        description: 'Aerodynamic side skirts and diamond-polished wheels.',
        url: 'https://images.pexels.com/photos/261985/pexels-photo-261985.jpeg?auto=compress&cs=tinysrgb&w=1600'
      }
    ],
    specifications: [
      {
        category: 'Powertrain',
        items: [
          { label: 'Chassis Code', value: 'DAA-HFC27 (Highway Star V)' },
          { label: 'Motor Output', value: '136 PS / 320 Nm' },
          { label: 'Generator', value: '1,198 cc 3-Cylinder' },
          { label: 'Fuel Tank', value: '55 Liters' }
        ]
      },
      {
        category: 'Dimensions',
        items: [
          { label: 'Length x Width x Height', value: '4,770 x 1,740 x 1,865 mm' },
          { label: 'Wheelbase', value: '2,860 mm' }
        ]
      }
    ],
    workshopProtocol: [
      'Full synthetic 0W-20 oil flush & new oil/air/cabin filters',
      'Electronic sliding door track lubrication & obstacle sensor test',
      'ProPILOT camera and radar sensor alignment diagnostics',
      'Brake pad measurement (minimum 85% thickness confirmed)',
      'Deep steam cleaning and antibacterial sanitization of all 7 seats'
    ]
  },
  {
    id: 'mazda-cx5-20s-proactive',
    stockNo: 'ALB-5520',
    sbtStockId: 'CX5520',
    chassisNo: 'KFEP-104882',
    modelCode: '6BA-KFEP',
    engineCode: 'PE-VPS',
    name: 'Mazda CX-5 20S Proactive SkyActiv-G',
    moniker: 'Urban Japanese Crossover Benchmark',
    essenceQuote: 'Tokyo USS auction inspected Grade 4.5. Featuring KODO Soul of Motion design, ultra-refined SkyActiv-G 2.0L naturally aspirated reliability, and radar cruise control.',
    kicker: 'USS Tokyo Grade 4.5 · SkyActiv-G · 16.8 KM/L',
    tagline: 'Mazda CX-5 20S Proactive · 2.0L SkyActiv-G Petrol · 6-Speed AT · Soul Red · Tokyo Selection',
    priceKes: 2750000,
    originalPriceKes: 3050000,
    discountPercent: 10,
    hubId: 'mazda-cx-5',
    priceUsd: 10500,
    totalCifUsd: 12800,
    inventoryLocation: 'TOKYO, JAPAN',
    sbtGrade: '20S PROACTIVE',
    year: 2018,
    registrationMonth: '08',
    manufactureYearMonth: '2018 / 08',
    mileageKm: 58200,
    steering: 'RHD',
    category: 'suv',
    bodyType: 'SUV',
    fuelType: 'Petrol',
    transmission: '6-Speed AT',
    drivetrain: '2WD',
    engine: '2.0L SkyActiv-G Direct Injection (PE-VPS)',
    power: '156 PS @ 6,000 RPM',
    torque: '199 Nm @ 4,000 RPM',
    fuelEconomy: '16.8 KM/L',
    exteriorColor: 'Soul Red Crystal Metallic',
    colorCode: '46V',
    interiorColor: 'Black Textured Fabric with Contrast Stitching',
    doors: 5,
    seats: 5,
    locationYard: 'Next to Ganjoni Primary School, Mombasa',
    dimensions: '4,545 x 1,840 x 1,690 mm',
    m3: '14.1 m³',
    wheelbase: '2,700 mm',
    groundClearance: '210 mm',
    curbWeight: '1,530 kg',
    grossWeight: '1,815 kg',
    fuelTankCapacity: '56 Liters',
    auctionGrade: '4.5',
    auctionHall: 'USS Tokyo',
    interiorGrade: 'A',
    inspectionStatus: 'PASSED (JEVIC & QISJ Authenticated)',
    options: {
      pushStart: true,
      smartKey: true,
      powerWindows: true,
      airConditioner: true,
      powerSeats: true,
      leatherSeats: false,
      sunroof: false,
      alloyWheels: true,
      abs: true,
      airbags: true,
      backCamera: true,
      camera360: true,
      radarCruise: true,
      laneAssist: true,
      ledLights: true,
      navigation: true,
      fogLights: true,
    },
    status: 'In Stock',
    heroVideo: '',
    heroImage: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1200&q=80',
    colors: [
      { name: 'Soul Red Crystal Metallic', hex: '#8B0000', imageUrl: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1200&q=80' },
      { name: 'Machine Grey Metallic', hex: '#4A4A4A', imageUrl: 'https://images.unsplash.com/photo-1541348263662-e0c8de4259ba?auto=format&fit=crop&w=1200&q=80' },
    ],
    closerLookPoints: [],
    editorialFeatures: [],
    chapters: [],
    gallery: [
      { title: 'Front Three-Quarter View', description: 'KODO styling with signature black honeycomb grille and sleek LED optics.', url: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1200&q=80' },
      { title: 'Driver Cockpit & MZD Connect', description: 'Heads-up Active Driving Display and rotary multimedia commander.', url: 'https://images.unsplash.com/photo-1541348263662-e0c8de4259ba?auto=format&fit=crop&w=1200&q=80' }
    ],
    specifications: [
      {
        category: 'Engine & Performance',
        items: [
          { label: 'Displacement', value: '1,997 cc' },
          { label: 'Compression Ratio', value: '13.0:1 High Efficiency' },
          { label: 'Transmission', value: '6-Speed SkyActiv-Drive AT' },
          { label: 'Drive Type', value: 'Front-Wheel Drive (2WD)' },
        ]
      }
    ],
    workshopProtocol: [
      'Castrol Magnatec full synthetic fluid renewal',
      'OEM air & A/C microfilter replacement',
      'Electronic brake caliper scan & rotor runout inspection',
      'OBD-II live diagnostics for SkyActiv sensors'
    ]
  },
  {
    id: 'mazda-cx5-xd-l-package-awd',
    stockNo: 'ALB-5590',
    sbtStockId: 'CX5590',
    chassisNo: 'KF2P-209411',
    modelCode: '3DA-KF2P',
    engineCode: 'SH-VPTS',
    name: 'Mazda CX-5 XD L-Package AWD SkyActiv-D',
    moniker: '450 Nm Clean Diesel Flagship Crossover',
    essenceQuote: 'Top-tier L-Package trim with pure white Nappa leather, 450 Nm twin-turbo diesel torque, i-ACTIV predictive AWD, and BOSE 10-speaker surround acoustic audio.',
    kicker: 'CAA Chubu Grade 4.5 · 2.2L Clean Diesel · i-ACTIV AWD',
    tagline: 'Mazda CX-5 XD L-Package · 2.2L Twin Turbo Diesel · i-ACTIV AWD · White Leather · 450 Nm',
    priceKes: 3150000,
    originalPriceKes: 3400000,
    discountPercent: 7,
    hubId: 'mazda-cx-5',
    priceUsd: 12200,
    totalCifUsd: 14600,
    inventoryLocation: 'NAGOYA, JAPAN',
    sbtGrade: 'XD L PACKAGE AWD',
    year: 2019,
    registrationMonth: '05',
    manufactureYearMonth: '2019 / 05',
    mileageKm: 51400,
    steering: 'RHD',
    category: 'suv',
    bodyType: 'SUV',
    fuelType: 'Diesel',
    transmission: '6-Speed AT',
    drivetrain: 'i-ACTIV AWD',
    engine: '2.2L SkyActiv-D Twin Turbo Clean Diesel (SH-VPTS)',
    power: '190 PS @ 4,500 RPM',
    torque: '450 Nm @ 2,000 RPM',
    fuelEconomy: '18.0 KM/L',
    exteriorColor: 'Jet Black Mica',
    colorCode: '41W',
    interiorColor: 'Pure White Perforated Leather with Heated Seats',
    doors: 5,
    seats: 5,
    locationYard: 'Next to Ganjoni Primary School, Mombasa',
    dimensions: '4,545 x 1,840 x 1,690 mm',
    m3: '14.1 m³',
    wheelbase: '2,700 mm',
    groundClearance: '210 mm',
    curbWeight: '1,680 kg',
    grossWeight: '1,965 kg',
    fuelTankCapacity: '58 Liters',
    auctionGrade: '4.5',
    auctionHall: 'CAA Chubu',
    interiorGrade: 'A',
    inspectionStatus: 'PASSED (JEVIC & QISJ Authenticated)',
    options: {
      pushStart: true,
      smartKey: true,
      powerWindows: true,
      airConditioner: true,
      powerSeats: true,
      leatherSeats: true,
      sunroof: true,
      alloyWheels: true,
      abs: true,
      airbags: true,
      backCamera: true,
      camera360: true,
      radarCruise: true,
      laneAssist: true,
      ledLights: true,
      navigation: true,
      fogLights: true,
      powerBackDoor: true,
    },
    status: 'In Stock',
    heroVideo: '',
    heroImage: 'https://images.unsplash.com/photo-1541348263662-e0c8de4259ba?auto=format&fit=crop&w=1200&q=80',
    colors: [
      { name: 'Jet Black Mica', hex: '#111111', imageUrl: 'https://images.unsplash.com/photo-1541348263662-e0c8de4259ba?auto=format&fit=crop&w=1200&q=80' },
      { name: 'Snowflake White Pearl', hex: '#F0F0F0', imageUrl: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1200&q=80' },
    ],
    closerLookPoints: [],
    editorialFeatures: [],
    chapters: [],
    gallery: [
      { title: 'Jet Black Athletic Stance', description: 'Flagship 19-inch high-gloss aluminum wheels and twin dual exhausts.', url: 'https://images.unsplash.com/photo-1541348263662-e0c8de4259ba?auto=format&fit=crop&w=1200&q=80' },
      { title: 'Pure White Nappa Leather Cabin', description: 'Ventilated and heated front seats with woodgrain console inlays.', url: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1200&q=80' }
    ],
    specifications: [
      {
        category: 'Diesel Powertrain',
        items: [
          { label: 'Displacement', value: '2,188 cc Twin-Turbo' },
          { label: 'Max Torque', value: '450 Nm @ 2,000 RPM' },
          { label: 'Drivetrain', value: 'Predictive i-ACTIV All-Wheel Drive' },
          { label: 'Emissions', value: 'Euro 6 Clean Diesel Certified' },
        ]
      }
    ],
    workshopProtocol: [
      'Low-SAPS diesel-specific synthetic oil service & filter replacement',
      'DPF regeneration status and particulate sensor calibration',
      'AWD rear differential and transfer case fluid analysis',
      'Brembo-grade brake pad thickness verification'
    ]
  }
];
