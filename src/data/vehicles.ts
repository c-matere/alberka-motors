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
  equipmentChecklist?: {
    category: string;
    items: { name: string; active: boolean }[];
  }[];
  equipmentRemarks?: string;
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
    inventoryLocation: 'Ganjoni Showroom, Mombasa (Next to Ganjoni Primary School)',
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
          { label: 'Inventory Location', value: 'Ganjoni Showroom, Mombasa (Next to Ganjoni Primary School)' },
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
    equipmentChecklist: [
      {
        category: 'COMFORT & CONVENIENCE',
        items: [
          { name: 'ACC (Adaptive Cruise)', active: false },
          { name: 'Air Conditioner', active: true },
          { name: 'Audio Player', active: true },
          { name: 'Both Power Slide Door', active: false },
          { name: 'Cooler', active: true },
          { name: 'Cruise Control', active: false },
          { name: 'Double Air Conditioner', active: true },
          { name: 'Left Side Power Slide Door', active: false },
          { name: 'Navigation System', active: true },
          { name: 'Paddle Shift', active: false },
          { name: 'Power Back Door', active: false },
          { name: 'Power Seat', active: false },
          { name: 'Power Steering', active: true },
          { name: 'Power Window All', active: true },
          { name: 'Power Window Driver', active: true },
          { name: 'Power Window Front', active: true },
          { name: 'Push Start', active: false },
          { name: 'Steering Switch', active: false },
        ],
      },
      {
        category: 'DRESS UP',
        items: [
          { name: 'Aero Front', active: false },
          { name: 'Aero Rear', active: false },
          { name: 'Aero Side', active: false },
          { name: 'Alloy Wheels', active: true },
          { name: 'Grill Guard', active: false },
          { name: 'Rear Spoiler', active: false },
          { name: 'Wood Combination Steering', active: true },
        ],
      },
      {
        category: 'EXTERIOR',
        items: [
          { name: 'Carrier Base', active: false },
          { name: 'Roof Box', active: false },
          { name: 'Roof Carrier', active: false },
          { name: 'Roof Rails', active: true },
          { name: 'Sun Roof', active: false },
          { name: 'Double Sun Roof', active: false },
          { name: 'Glass Roof', active: false },
          { name: 'Fog Light', active: true },
          { name: 'HID Light', active: false },
          { name: 'LED Light', active: false },
          { name: 'High Roof', active: false },
          { name: 'New Shape', active: true },
          { name: 'Slide Glass', active: false },
        ],
      },
      {
        category: 'SAFETY',
        items: [
          { name: 'ABS', active: true },
          { name: 'Air Bag', active: true },
          { name: 'Around View Monitor', active: false },
          { name: 'Back Camera', active: true },
          { name: 'Front Camera', active: false },
          { name: 'Side Camera', active: false },
          { name: 'Corner Sensor', active: false },
          { name: 'ESC', active: true },
        ],
      },
      {
        category: 'OTHER & REMARKS',
        items: [
          { name: 'Auto Door', active: false },
          { name: 'Back Tire', active: true },
          { name: 'Just Low', active: false },
          { name: 'Half Leather Seat', active: false },
          { name: 'Leather Seat', active: false },
          { name: 'Same Tire', active: true },
          { name: 'Side Lift Up Seat', active: false },
          { name: 'Sloper', active: false },
        ],
      },
    ],
    equipmentRemarks: '8SEATS, 4.0L V6 1GR-FE, 4WD DUAL RANGE',
  },
  {
id: 'suzuki-every-2019',
    stockNo: 'ALB-EV19',
    sbtStockId: 'EV2019',
    chassisNo: 'DA17V-157665',
    modelCode: 'HBD-DA17V',
    engineCode: 'R06A (660cc)',
    name: 'Suzuki Every Van 660cc Automatic',
    moniker: 'Compact Ultra-Efficient Fuel-Saver Van',
    essenceQuote: `🚐✨ SUZUKI EVERY – 2019 MODEL ✨🚐\n🔥 COMPACT • ULTRA-EFFICIENT • MAXIMUM UTILITY! 🔥\n🔹 Model: 2019 | Mileage: 157,000 KM | 660cc Highly Economical Engine\n🔹 Pure White Color 🤍 | Automatic Transmission | Unmatched Fuel Efficiency\n🔹 Sliding Rear Doors for Easy Loading & Unloading | Super Low Maintenance & Running Costs\n💯 The Ultimate Fuel-Saver Van – Compact, Reliable & Ready to Work! 💯\n📍 Available at Alberka Enterprises Ltd, Mombasa`,
    kicker: '2019 Model · 660cc Petrol · Dual Sliding Doors · Mombasa Stock',
    tagline: 'Suzuki Every 2019 · 660cc Highly Economical Engine · Automatic · Pure White · Dual Sliding Doors',
    priceKes: 1150000,
    originalPriceKes: 1250000,
    discountPercent: 8,
    hubId: 'suzuki-every',
    priceUsd: 5400,
    freightUsd: 1300,
    vanningUsd: 0,
    inspectionUsd: 250,
    insuranceUsd: 150,
    totalCifUsd: 7100,
    inventoryLocation: 'Ganjoni Showroom, Mombasa (Next to Ganjoni Primary School)',
    sbtGrade: 'PA UTILITY SPECIAL',
    year: 2019,
    registrationMonth: '06',
    manufactureYearMonth: '2019 / 06',
    mileageKm: 157000,
    steering: 'RHD',
    category: 'van',
    bodyType: 'VAN',
    fuelType: 'PETROL',
    transmission: 'AT',
    drivetrain: '2WD',
    doors: 5,
    seats: 4,
    engine: '660cc R06A 3-Cylinder DOHC 12V',
    power: '49 HP @ 5,700 RPM',
    torque: '62 Nm @ 3,500 RPM',
    fuelEconomy: '20.2 km/L (Ultra-Efficient)',
    exteriorColor: 'Pure White',
    colorCode: '26U',
    interiorColor: 'Durable Grey / Brown Fabric',
    locationYard: 'Alberka Motors Showroom (Ganjoni, Mombasa)',
    dimensions: '3.39m × 1.47m × 1.89m',
    m3: '9.45 m³',
    wheelbase: '2,430 mm',
    groundClearance: '150 mm',
    curbWeight: '880 kg',
    grossWeight: '1,230 kg',
    maxLoadingCapacity: '350 kg',
    fuelTankCapacity: '37 Liters',
    auctionGrade: '4.0',
    auctionHall: 'CAA Tokyo / Direct Japanese Import',
    interiorGrade: 'B',
    inspectionStatus: 'QISJ / JEVIC Export Inspected & Cleared',
    heroImage: '/vehicles/suzuki-every-2019/hero-front-34.jpg',
    heroVideo: 'https://assets.mixkit.co/videos/preview/mixkit-car-driving-through-city-streets-at-night-42417-large.mp4',
    options: {
      pushStart: false,
      smartKey: true,
      powerWindows: true,
      airConditioner: true,
      powerSeats: false,
      leatherSeats: false,
      sunroof: false,
      alloyWheels: false,
      abs: true,
      airbags: true,
      backCamera: false,
      camera360: false,
      radarCruise: false,
      laneAssist: false,
      ledLights: false,
      navigation: false,
      audioPlayer: true,
      fogLights: false,
    },
    status: 'In Stock',
    colors: [
      { name: 'Pure White', hex: '#FFFFFF', imageUrl: '/vehicles/suzuki-every-2019/hero-front-34.jpg' }
    ],
    closerLookPoints: [
      {
        id: 'sliding-doors',
        title: 'Sliding Rear Doors',
        metric: 'Dual Side',
        metricLabel: 'Loading Access',
        subtitle: 'Easy Loading & Unloading',
        description: 'Dual sliding side doors allow rapid, effortless curb-side loading even in congested Mombasa alleys and narrow loading bays.',
        imageUrl: '/vehicles/suzuki-every-2019/sliding-doors-seats.jpg'
      },
      {
        id: 'engine-economy',
        title: '660cc Highly Economical Engine',
        metric: '20.2 km/L',
        metricLabel: 'Fuel Economy',
        subtitle: 'Unmatched Fuel Efficiency',
        description: 'Compact 660cc Japanese R06A engine engineered for unbeatable fuel economy, low emissions, and super low maintenance costs.',
        imageUrl: '/vehicles/suzuki-every-2019/engine-bay-660cc.jpg'
      },
      {
        id: 'cargo-space',
        title: 'Maximum Utility Cargo Bay',
        metric: '350 KG',
        metricLabel: 'Max Loading Capacity',
        subtitle: 'Fold-Flat Rear Seating',
        description: 'Rear passenger seat folds completely flat into the floor, providing a flat 350kg capacity cargo bed ready for immediate commercial delivery or luggage.',
        imageUrl: '/vehicles/suzuki-every-2019/cargo-boot-open.jpg'
      },
      {
        id: 'automatic-trans',
        title: 'Automatic Transmission',
        metric: 'AT',
        metricLabel: 'Gearbox Type',
        subtitle: 'Effortless City Drive',
        description: 'Smooth dash-mounted automatic transmission with verified 157,000 KM Japanese odometer, ice-cold air conditioning, and power steering.',
        imageUrl: '/vehicles/suzuki-every-2019/cockpit-dashboard.jpg'
      }
    ],
    editorialFeatures: [
      {
        id: 'utility',
        title: 'Commercial & Urban Utility',
        badge: 'UTILITY FIRST',
        lead: 'Maximum internal cubic volume packed into a nimble, park-anywhere chassis.',
        narrative: [
          'The 2019 Suzuki Every delivers unmatched business practicality with a massive flat cargo floor and dual sliding doors.',
          'With a 350kg payload rating and fold-flat passenger bench, it transitions instantly between cargo hauling and crew transport.'
        ],
        specs: [
          { label: 'Payload Capacity', value: '350 kg' },
          { label: 'Side Access', value: 'Dual Sliding Doors' },
          { label: 'Rear Access', value: 'Full-Height Tailgate' }
        ],
        slides: [
          {
            id: 'cargo-bay-slide',
            title: 'Cavernous Loading Bay',
            subtitle: 'Flat Floor Architecture',
            imageUrl: '/vehicles/suzuki-every-2019/cargo-boot-open.jpg',
            description: 'Wide rear tailgate opening and flat floor make packing effortless.'
          },
          {
            id: 'sliding-doors-slide',
            title: 'Dual Sliding Side Doors',
            subtitle: 'Tight Space Loading',
            imageUrl: '/vehicles/suzuki-every-2019/sliding-doors-seats.jpg',
            description: 'Park close to walls or other cars and still slide the doors open fully.'
          }
        ]
      },
      {
        id: 'cockpit',
        title: 'Ergonomic Driver Workspace',
        badge: 'CABIN COMFORT',
        lead: 'High commanding driving posture with easy controls and walk-through floor.',
        narrative: [
          'The driver cockpit features an elevated dash-mounted gear lever that frees up lower floor room.',
          'Equipped with verified 157,000 KM Japanese odometer, ice-cold factory AC, and crystal-clear instrument dials.'
        ],
        specs: [
          { label: 'Transmission', value: 'Automatic (AT)' },
          { label: 'Odometer', value: '157,000 KM Verified' },
          { label: 'Air Conditioning', value: 'Factory High-Output AC' }
        ],
        slides: [
          {
            id: 'dash-shifter-slide',
            title: 'Dash-Mounted AT Shifter',
            subtitle: 'Walk-Through Floor',
            imageUrl: '/vehicles/suzuki-every-2019/cockpit-dashboard.jpg',
            description: 'High visibility commanding seating position with responsive power steering.'
          },
          {
            id: 'odometer-cluster-slide',
            title: 'Verified 157,000 KM Cluster',
            subtitle: 'Genuine Provenance',
            imageUrl: '/vehicles/suzuki-every-2019/odometer-cluster.jpg',
            description: 'Crystal-clear Japanese instrument cluster with gear indicator and trip computer.'
          }
        ]
      }
    ],
    chapters: [
      {
        id: 'utility-overview',
        tabLabel: 'Utility & Economics',
        eyebrow: 'BUILT FOR BUSINESS',
        title: 'The Ultimate Kenyan Business Van',
        narrative: [
          'The 2019 Suzuki Every is celebrated worldwide as the gold standard in micro-commercial transport.',
          'Its compact exterior footprint weaves through city traffic with ease, while the square-box body design maximizes internal volume.',
          'Equipped with a punchy 660cc engine and automatic gearbox, it delivers unbeatable 20+ km/L fuel savings with minimal servicing overhead.'
        ],
        imageUrl: '/vehicles/suzuki-every-2019/hero-front-34.jpg',
        highlights: [
          { label: 'Payload', value: '350 kg' },
          { label: 'Engine Size', value: '660 cc' },
          { label: 'Fuel Economy', value: '20.2 km/L' },
          { label: 'Transmission', value: 'Automatic (AT)' }
        ]
      }
    ],
    gallery: [
      { title: 'Suzuki Every 2019 — Front Three Quarter', description: 'Available in our Mombasa showroom next to Ganjoni Primary School.', url: '/vehicles/suzuki-every-2019/hero-front-34.jpg' },
      { title: 'Suzuki Every 2019 — Front Stance', description: 'Pure White exterior with chrome Suzuki badging and crystal headlights.', url: '/vehicles/suzuki-every-2019/front-stance.jpg' },
      { title: 'Suzuki Every 2019 — Front Angle', description: 'Compact stance designed for tight city streets and easy parking.', url: '/vehicles/suzuki-every-2019/front-angle.jpg' },
      { title: 'Suzuki Every 2019 — Front Direct', description: 'Clean body panels, Japanese auction Grade 4.0 inspection.', url: '/vehicles/suzuki-every-2019/front-direct.jpg' },
      { title: 'Suzuki Every 2019 — Rear Tailgate', description: 'Rear wiper, high-mount brake light, and wide tailgate opening.', url: '/vehicles/suzuki-every-2019/rear-tailgate.jpg' },
      { title: 'Suzuki Every 2019 — Rear Three Quarter', description: 'Crisp factory paint with tinted privacy glass.', url: '/vehicles/suzuki-every-2019/rear-three-quarter.jpg' },
      { title: 'Suzuki Every 2019 — Rear Profile', description: 'Sliding door tracks and high vertical roof for tall cargo.', url: '/vehicles/suzuki-every-2019/rear-profile.jpg' },
      { title: 'Suzuki Every 2019 — Cockpit Dashboard', description: 'Automatic transmission, audio system, dual air vents, and 12V socket.', url: '/vehicles/suzuki-every-2019/cockpit-dashboard.jpg' },
      { title: 'Suzuki Every 2019 — Odometer Cluster', description: 'Genuine 157,665 km verified Japanese odometer reading.', url: '/vehicles/suzuki-every-2019/odometer-cluster.jpg' },
      { title: 'Suzuki Every 2019 — Driver Seat', description: 'Durable cloth bucket seat with high lumbar support and cup holders.', url: '/vehicles/suzuki-every-2019/driver-seat.jpg' },
      { title: 'Suzuki Every 2019 — Passenger Seat', description: 'Clean non-smoker interior preserved in pristine factory condition.', url: '/vehicles/suzuki-every-2019/passenger-seat.jpg' },
      { title: 'Suzuki Every 2019 — Cabin Walk-Through', description: 'Spacious headspace and clear visibility all around.', url: '/vehicles/suzuki-every-2019/cabin-through-view.jpg' },
      { title: 'Suzuki Every 2019 — Sliding Door & Rear Bench', description: 'Wide-opening sliding door with folding 2nd-row passenger bench.', url: '/vehicles/suzuki-every-2019/sliding-doors-seats.jpg' },
      { title: 'Suzuki Every 2019 — Open Cargo Boot', description: 'Huge cargo bay with low loading lip, perfect for 350kg payloads.', url: '/vehicles/suzuki-every-2019/cargo-boot-open.jpg' },
      { title: 'Suzuki Every 2019 — 660cc Engine Bay', description: 'Clean front compartment with battery, coolant, and brake fluid reservoirs.', url: '/vehicles/suzuki-every-2019/engine-bay-660cc.jpg' }
    ],
    specifications: [
      {
        category: 'Powertrain & Performance',
        items: [
          { label: 'Engine Type', value: '660cc R06A 3-Cylinder DOHC 12V' },
          { label: 'Horsepower', value: '49 HP @ 5,700 RPM' },
          { label: 'Torque', value: '62 Nm @ 3,500 RPM' },
          { label: 'Fuel Delivery', value: 'Multi-Point Fuel Injection (Ultra-Efficient)' },
          { label: 'Transmission', value: 'Automatic (AT) with Overdrive' },
          { label: 'Fuel Tank Capacity', value: '37 Liters' }
        ]
      },
      {
        category: 'Dimensions & Capacities',
        items: [
          { label: 'Dimensions (L × W × H)', value: '3,395 × 1,475 × 1,895 mm' },
          { label: 'Wheelbase', value: '2,430 mm' },
          { label: 'Ground Clearance', value: '150 mm' },
          { label: 'Payload Capacity', value: '350 kg' },
          { label: 'Curb Weight', value: '880 kg' },
          { label: 'Doors / Seats', value: '5 Doors / 4 Seats' }
        ]
      }
    ],
    workshopProtocol: [
      'Comprehensive 100-point pre-delivery mechanical overhaul at Mombasa workshop',
      'Fresh synthetic engine oil and OEM filter replacement',
      'Automatic transmission fluid inspection and diagnostic electronic scan',
      'Front and rear brake pads and suspension bushing inspection',
      'Dual sliding door tracks lubricated and aligned for effortless glide',
      'NTSA TIMS logbook transfer and QISJ/JEVIC verification documented'
    ],
    equipmentChecklist: [
      {
        category: 'COMFORT & CONVENIENCE',
        items: [
          { name: 'ACC (Adaptive Cruise)', active: false },
          { name: 'Air Conditioner', active: true },
          { name: 'Audio Player', active: true },
          { name: 'Both Power Slide Door', active: false },
          { name: 'Cooler', active: true },
          { name: 'Cruise Control', active: false },
          { name: 'Double Air Conditioner', active: false },
          { name: 'Left Side Power Slide Door', active: false },
          { name: 'Navigation System', active: false },
          { name: 'Paddle Shift', active: false },
          { name: 'Power Back Door', active: false },
          { name: 'Power Seat', active: false },
          { name: 'Power Steering', active: true },
          { name: 'Power Window All', active: false },
          { name: 'Power Window Driver', active: false },
          { name: 'Power Window Front', active: false },
          { name: 'Push Start', active: false },
          { name: 'Steering Switch', active: false },
        ],
      },
      {
        category: 'DRESS UP',
        items: [
          { name: 'Aero Front', active: false },
          { name: 'Aero Rear', active: false },
          { name: 'Aero Side', active: false },
          { name: 'Alloy Wheels', active: false },
          { name: 'Grill Guard', active: false },
          { name: 'Rear Spoiler', active: false },
          { name: 'Wood Combination Steering', active: false },
        ],
      },
      {
        category: 'EXTERIOR',
        items: [
          { name: 'Carrier Base', active: false },
          { name: 'Roof Box', active: false },
          { name: 'Roof Carrier', active: false },
          { name: 'Roof Rails', active: false },
          { name: 'Sun Roof', active: false },
          { name: 'Double Sun Roof', active: false },
          { name: 'Glass Roof', active: false },
          { name: 'Fog Light', active: false },
          { name: 'HID Light', active: false },
          { name: 'LED Light', active: false },
          { name: 'High Roof', active: true },
          { name: 'New Shape', active: true },
          { name: 'Slide Glass', active: true },
        ],
      },
      {
        category: 'SAFETY',
        items: [
          { name: 'ABS', active: true },
          { name: 'Air Bag', active: true },
          { name: 'Around View Monitor', active: false },
          { name: 'Back Camera', active: false },
          { name: 'Front Camera', active: false },
          { name: 'Side Camera', active: false },
          { name: 'Corner Sensor', active: false },
          { name: 'ESC', active: true },
        ],
      },
      {
        category: 'OTHER & REMARKS',
        items: [
          { name: 'Auto Door', active: false },
          { name: 'Back Tire', active: true },
          { name: 'Just Low', active: true },
          { name: 'Half Leather Seat', active: false },
          { name: 'Leather Seat', active: false },
          { name: 'Same Tire', active: true },
          { name: 'Side Lift Up Seat', active: false },
          { name: 'Sloper', active: false },
        ],
      },
    ],
    equipmentRemarks: '4SEATS, 350KG PAYLOAD',
  }
];
