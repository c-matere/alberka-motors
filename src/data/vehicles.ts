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
    priceKes: 1050000,
    originalPriceKes: 1150000,
    discountPercent: 9,
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
    locationYard: 'Alberka Enterprises Limited Showroom (Ganjoni, Mombasa)',
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
      smartKey: false,
      powerWindows: false,
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
  },
  {
    id: "toyota-harrier-gr-sport-2019",
    stockNo: "ALB-HR19",
    sbtStockId: "HR2019",
    chassisNo: "ASU60-0019284",
    modelCode: "DBA-ASU60W",
    engineCode: "8AR-FTS / 3ZR-FAE (2.0L Petrol)",
    name: "Toyota Harrier GR Sport 2019",
    moniker: "Sporty Luxury Performance Crossover",
    essenceQuote: "🚘 TOYOTA HARRIER GR SPORT – 2019 MODEL 🚘\n✨ Sporty • Luxury • Performance ✨\n🔹 Model: 2019 GR Sport | Mileage: Very Low Mileage\n🔹 Powerful & Fuel Efficient Petrol Engine | Push Start / Smart Key\n🔹 Sporty GR Body Kit | Premium Alloy Rims 🛞\n🔹 LED Headlights & Fog Lights 💡 | Luxurious Leather Interior\n🔹 Multi-Function Steering Wheel | Reverse Camera 📷 | Cruise Control | Dual-Zone Climate Control ❄️\n🔹 Excellent Condition – Well Maintained\n💯 A premium SUV that combines luxury, comfort, and sporty performance.\n📍 Available at Alberka Enterprises Ltd – Mombasa",
    kicker: "2019 Model · GR Sport Edition · Very Low Mileage · Mombasa Stock",
    tagline: "Toyota Harrier GR Sport · 2.0L Petrol · Factory Gazoo Racing Styling & Performance",
    priceKes: 4200000,
    originalPriceKes: 4500000,
    discountPercent: 7,
    hubId: "toyota-harrier",
    priceUsd: 22500,
    freightUsd: 2200,
    vanningUsd: 0,
    inspectionUsd: 250,
    insuranceUsd: 200,
    totalCifUsd: 25150,
    inventoryLocation: "Ganjoni Showroom, Mombasa (Next to Ganjoni Primary School)",
    sbtGrade: "GR SPORT EDITION",
    year: 2019,
    registrationMonth: "07",
    manufactureYearMonth: "2019 / 07",
    mileageKm: 38000,
    steering: "RHD",
    category: "suv",
    bodyType: "SUV",
    fuelType: "PETROL",
    transmission: "Super CVT-i 7-Speed",
    drivetrain: "2WD",
    doors: 5,
    seats: 5,
    engine: "1,986 cc Petrol Dual VVT-i",
    power: "151 HP @ 6,100 RPM",
    torque: "193 Nm @ 3,800 RPM",
    fuelEconomy: "16.0 km/L",
    exteriorColor: "Sonic Titanium Metallic",
    colorCode: "1J7",
    interiorColor: "Black Leather & Suede with GR Center Stripe",
    locationYard: "Alberka Enterprises Showroom (Next to Ganjoni Primary School, Mombasa)",
    dimensions: "4.72m × 1.83m × 1.69m",
    m3: "14.6 m³",
    wheelbase: "2,660 mm",
    groundClearance: "190 mm",
    curbWeight: "1,580 kg",
    grossWeight: "1,855 kg",
    maxLoadingCapacity: "450 kg",
    fuelTankCapacity: "60 Liters",
    auctionGrade: "4.5",
    auctionHall: "USS Tokyo / SBT Japan Export Center",
    interiorGrade: "A",
    inspectionStatus: "QISJ Certified & JEVIC Odometer Inspected",
    status: "In Stock",
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
    audioPlayer: true,
    fogLights: true,
    rearSpoiler: true,
    doubleAc: true,
    powerBackDoor: true
    },
    heroImage: "/vehicles/toyota-harrier-gr-sport-2019/hero-front-34.jpg",
    heroVideo: "https://assets.mixkit.co/videos/preview/mixkit-car-driving-through-city-streets-at-night-42417-large.mp4",
    colors: [
        {
    name: "Sonic Titanium Metallic",
    hex: "#A8A9AD",
    imageUrl: "/vehicles/toyota-harrier-gr-sport-2019/hero-front-34.jpg"
        }
    ],
    gallery: [
        {
    title: "Toyota Harrier GR Sport — Front Three Quarter",
    description: "Sporty GR aerodynamic front bumper, signature dark honeycomb mesh, and triple LED optics.",
    url: "/vehicles/toyota-harrier-gr-sport-2019/hero-front-34.jpg"
        },
        {
    title: "Toyota Harrier GR Sport — Front Stance",
    description: "Sonic Titanium finish with piano black chin spoiler and chrome accents.",
    url: "/vehicles/toyota-harrier-gr-sport-2019/front-stance.jpg"
        },
        {
    title: "Toyota Harrier GR Sport — Aggressive GR Grille",
    description: "Direct front stance featuring Gazoo Racing honeycomb upper and lower grilles with fog lights.",
    url: "/vehicles/toyota-harrier-gr-sport-2019/front-direct.jpg"
        },
        {
    title: "Toyota Harrier GR Sport — Dynamic Front Angle",
    description: "Low athletic stance with aerodynamic front air splitters and LED daytime running lights.",
    url: "/vehicles/toyota-harrier-gr-sport-2019/front-angle.jpg"
        },
        {
    title: "Toyota Harrier GR Sport — Rear Stance",
    description: "Dark aerodynamic roof spoiler, diffuser bumper, and single polished chrome exhaust tip.",
    url: "/vehicles/toyota-harrier-gr-sport-2019/rear-stance.jpg"
        },
        {
    title: "Toyota Harrier GR Sport — Rear Profile",
    description: "Sharp coupe-like roofline, rear privacy glass, and chrome beltline mouldings.",
    url: "/vehicles/toyota-harrier-gr-sport-2019/rear-profile.jpg"
        },
        {
    title: "Toyota Harrier GR Sport — Rear Tailgate & GR Badge",
    description: "Distinctive Gazoo Racing emblem, clear rear LED combination lamps, and tailgate wiper.",
    url: "/vehicles/toyota-harrier-gr-sport-2019/rear-direct.jpg"
        },
        {
    title: "Toyota Harrier GR Sport — Centered Rear Stance",
    description: "Rear diffuser apron with integrated reflectors and sculpted aerodynamic contours.",
    url: "/vehicles/toyota-harrier-gr-sport-2019/rear-centered.jpg"
        },
        {
    title: "Toyota Harrier GR Sport — Cockpit Panorama",
    description: "High-resolution multimedia navigation display, leather-wrapped sports dashboard, and phone mount.",
    url: "/vehicles/toyota-harrier-gr-sport-2019/cockpit-panorama.jpg"
        },
        {
    title: "Toyota Harrier GR Sport — Driver Cockpit",
    description: "Electric power adjustable driver seat with lumbar support, Harrier illuminated scuff plates, and sports pedals.",
    url: "/vehicles/toyota-harrier-gr-sport-2019/driver-cockpit.jpg"
        },
        {
    title: "Toyota Harrier GR Sport — GR Steering Wheel",
    description: "Leather-wrapped GR emblem multi-function steering wheel with audio, phone, and cruise controls.",
    url: "/vehicles/toyota-harrier-gr-sport-2019/steering-controls.jpg"
        },
        {
    title: "Toyota Harrier GR Sport — Center Console",
    description: "Carbon-pattern shift gate, dual-zone digital climate control, and electronic parking brake.",
    url: "/vehicles/toyota-harrier-gr-sport-2019/dashboard-center.jpg"
        },
        {
    title: "Toyota Harrier GR Sport — Rear Suede & Leather Seats",
    description: "Plush rear passenger bench with embossed geometric pattern, sport center stripe, and ISOFIX anchors.",
    url: "/vehicles/toyota-harrier-gr-sport-2019/rear-leather-seats.jpg"
        },
        {
    title: "Toyota Harrier GR Sport — 19-Inch Alloy Wheels",
    description: "Diamond-cut dual-tone GR Sport alloy wheels with white brake calipers bearing GR logo and Yokohama tires.",
    url: "/vehicles/toyota-harrier-gr-sport-2019/wheel-gr-alloy.jpg"
        },
        {
    title: "Toyota Harrier GR Sport — Cavernous Cargo Bay",
    description: "Wide electric tailgate opening, low loading floor, and custom-fit rubber protective luggage tray.",
    url: "/vehicles/toyota-harrier-gr-sport-2019/open-cargo-boot.jpg"
        }
    ],
    closerLookPoints: [
        {
    id: "gr-bodykit",
    title: "Sporty GR Aerodynamic Kit",
    metric: "GR Sport",
    metricLabel: "Aero Package",
    subtitle: "Gazoo Racing Front Splitter & Diffuser",
    description: "Factory-tuned aerodynamic package with honeycomb grilles, piano-black accents, and rear sports diffuser.",
    imageUrl: "/vehicles/toyota-harrier-gr-sport-2019/hero-front-34.jpg"
        },
        {
    id: "gr-wheels",
    title: "19\" GR Diamond-Cut Alloys",
    metric: "19-Inch",
    metricLabel: "Alloy Rims",
    subtitle: "Dual-Tone Wheels with White GR Calipers",
    description: "Factory Gazoo Racing 19-inch lightweight alloy wheels with high-grip Yokohama rubber and branded calipers.",
    imageUrl: "/vehicles/toyota-harrier-gr-sport-2019/wheel-gr-alloy.jpg"
        },
        {
    id: "cabin-leather",
    title: "Luxurious Leather & Suede Interior",
    metric: "GR Suede",
    metricLabel: "Cabin Materials",
    subtitle: "Embossed Sports Seats with Silver Stripe",
    description: "High-bolstered front sport seats with genuine leather surrounds, suede inserts, and silver accent center stripe.",
    imageUrl: "/vehicles/toyota-harrier-gr-sport-2019/driver-cockpit.jpg"
        },
        {
    id: "cockpit-tech",
    title: "Push Start & Dual-Zone Climate",
    metric: "Push Start",
    metricLabel: "Driver Tech",
    subtitle: "Smart Key, Multi-Function Steering & Reverse Camera",
    description: "Full suite of driver convenience tech including crystal reverse camera, multi-function steering, and push-button start.",
    imageUrl: "/vehicles/toyota-harrier-gr-sport-2019/dashboard-center.jpg"
        }
    ],
    editorialFeatures: [
        {
    id: "performance",
    title: "Gazoo Racing Dynamics",
    badge: "PERFORMANCE",
    lead: "Precision-tuned suspension and responsive 2.0L Dual VVT-i petrol powertrain.",
    narrative: [
                "The 2019 Toyota Harrier GR Sport brings track-inspired engineering to an executive luxury crossover. Tuned by Toyota Gazoo Racing, it features reinforced underbody bracing and recalibrated shock absorbers.",
                "Delivering smooth, confident power through a 7-speed sequential Super CVT-i gearbox, it balances exhilarating road presence with everyday fuel economy."
            ],
    specs: [
                {
    label: "Engine",
    value: "2.0L Dual VVT-i Petrol"
                },
                {
    label: "Transmission",
    value: "Super CVT-i 7-Speed Sequential"
                },
                {
    label: "Suspension",
    value: "GR Sport Dedicated Tuning"
                }
            ],
    slides: [
                {
    id: "gr-stance-slide",
    title: "Athletic Road Stance",
    subtitle: "Factory Aerodynamics",
    imageUrl: "/vehicles/toyota-harrier-gr-sport-2019/front-stance.jpg",
    description: "Aerodynamic front chin spoiler and rear diffuser channel airflow for high-speed stability."
                },
                {
    id: "gr-rims-slide",
    title: "19\" GR Sport Alloy Wheels",
    subtitle: "White GR Calipers",
    imageUrl: "/vehicles/toyota-harrier-gr-sport-2019/wheel-gr-alloy.jpg",
    description: "Exclusive dual-tone machined alloy wheels wrapped in premium Yokohama performance tires."
                }
            ]
        },
        {
    id: "cockpit",
    title: "Luxurious Sports Sanctuary",
    badge: "CABIN LUXURY",
    lead: "Premium leather, suede sports bolsters, and intuitive digital controls.",
    narrative: [
                "Inside, the Harrier GR Sport surrounds the driver with carbon-finish trim, a dedicated GR steering wheel, and illuminated door sills.",
                "Featuring dual-zone automatic climate control, push-button smart key ignition, and integrated reverse camera for effortless city driving."
            ],
    specs: [
                {
    label: "Seating",
    value: "Leather & Suede Sport Seats"
                },
                {
    label: "Steering",
    value: "GR Multi-Function Wheel"
                },
                {
    label: "Climate",
    value: "Dual-Zone Climate Control"
                }
            ],
    slides: [
                {
    id: "cockpit-slide",
    title: "Command Center Cockpit",
    subtitle: "Intuitive Controls",
    imageUrl: "/vehicles/toyota-harrier-gr-sport-2019/cockpit-panorama.jpg",
    description: "Touchscreen navigation, digital climate panel, and leather-wrapped dashboard."
                },
                {
    id: "seats-slide",
    title: "Embossed Sports Seats",
    subtitle: "Suede & Leather Bolsters",
    imageUrl: "/vehicles/toyota-harrier-gr-sport-2019/driver-cockpit.jpg",
    description: "Electric power adjustment with memory and supportive lateral bolsters."
                }
            ]
        }
    ],
    chapters: [
        {
    id: "overview",
    tabLabel: "GR Sport Overview",
    eyebrow: "2019 TOYOTA HARRIER GR SPORT",
    title: "Executive Comfort Meets Gazoo Racing DNA",
    narrative: [
                "The Toyota Harrier GR Sport stands out on Mombasa and Nairobi roads with its unmistakable aggressive styling, crystal LED lighting, and polished chrome details.",
                "Inspected and certified in Japan with very low verified mileage, pristine non-smoker interior, and complete export documentation."
            ],
    imageUrl: "/vehicles/toyota-harrier-gr-sport-2019/front-direct.jpg",
    highlights: [
                {
    label: "Model Year",
    value: "2019"
                },
                {
    label: "Condition",
    value: "Very Low Mileage · Pristine"
                },
                {
    label: "Location",
    value: "Ganjoni Showroom, Mombasa"
                }
            ]
        }
    ],
    specifications: [
        {
    category: "Powertrain & Performance",
    items: [
                {
    label: "Engine Type",
    value: "2.0L 4-Cylinder DOHC 16V Dual VVT-i"
                },
                {
    label: "Displacement",
    value: "1,986 cc"
                },
                {
    label: "Horsepower",
    value: "151 HP @ 6,100 RPM"
                },
                {
    label: "Torque",
    value: "193 Nm @ 3,800 RPM"
                },
                {
    label: "Transmission",
    value: "Super CVT-i 7-Speed Sequential Shift"
                },
                {
    label: "Drive System",
    value: "Front-Wheel Drive (2WD)"
                },
                {
    label: "Fuel Delivery",
    value: "Multi-Point EFI (Highly Economical)"
                },
                {
    label: "Fuel Tank Capacity",
    value: "60 Liters"
                }
            ]
        },
        {
    category: "Dimensions & Chassis",
    items: [
                {
    label: "Dimensions (L × W × H)",
    value: "4,720 × 1,835 × 1,690 mm"
                },
                {
    label: "Wheelbase",
    value: "2,660 mm"
                },
                {
    label: "Ground Clearance",
    value: "190 mm"
                },
                {
    label: "Curb Weight",
    value: "1,580 kg"
                },
                {
    label: "Doors / Seats",
    value: "5 Doors / 5 Seats"
                },
                {
    label: "Wheels",
    value: "19-Inch Factory GR Sport Dual-Tone Alloys"
                },
                {
    label: "Tires",
    value: "235/50R19 Yokohama Premium Radial"
                }
            ]
        }
    ],
    workshopProtocol: [
        "Comprehensive 100-point pre-delivery mechanical overhaul at Mombasa workshop",
        "Engine oil and OEM filter replacement with premium synthetic lubricant",
        "CVT transmission diagnostic scan and electronic fluid level check",
        "19-inch alloy wheel balance and high-speed road-force alignment",
        "Air conditioning compressor pressure and dual-zone climate vent sanitation",
        "Complete Japanese export verification, JEVIC certificate, and NTSA TIMS documentation"
    ],
    equipmentChecklist: [
        {
    category: "COMFORT & CONVENIENCE",
    items: [
                {
    name: "ACC (Adaptive Cruise)",
    active: true
                },
                {
    name: "Air Conditioner",
    active: true
                },
                {
    name: "Audio Player",
    active: true
                },
                {
    name: "Both Power Slide Door",
    active: false
                },
                {
    name: "Cooler",
    active: true
                },
                {
    name: "Cruise Control",
    active: true
                },
                {
    name: "Double Air Conditioner",
    active: true
                },
                {
    name: "Left Side Power Slide Door",
    active: false
                },
                {
    name: "Navigation System",
    active: true
                },
                {
    name: "Paddle Shift",
    active: false
                },
                {
    name: "Power Back Door",
    active: true
                },
                {
    name: "Power Seat",
    active: true
                },
                {
    name: "Power Steering",
    active: true
                },
                {
    name: "Power Window All",
    active: true
                },
                {
    name: "Power Window Driver",
    active: true
                },
                {
    name: "Power Window Front",
    active: true
                },
                {
    name: "Push Start",
    active: true
                },
                {
    name: "Steering Switch",
    active: true
                }
            ]
        },
        {
    category: "DRESS UP",
    items: [
                {
    name: "Aero Front",
    active: true
                },
                {
    name: "Aero Rear",
    active: true
                },
                {
    name: "Aero Side",
    active: true
                },
                {
    name: "Alloy Wheels",
    active: true
                },
                {
    name: "Grill Guard",
    active: false
                },
                {
    name: "Rear Spoiler",
    active: true
                },
                {
    name: "Wood Combination Steering",
    active: false
                }
            ]
        },
        {
    category: "EXTERIOR",
    items: [
                {
    name: "Carrier Base",
    active: false
                },
                {
    name: "Roof Box",
    active: false
                },
                {
    name: "Roof Carrier",
    active: false
                },
                {
    name: "Roof Rails",
    active: false
                },
                {
    name: "Sun Roof",
    active: false
                },
                {
    name: "Double Sun Roof",
    active: false
                },
                {
    name: "Glass Roof",
    active: false
                },
                {
    name: "Fog Light",
    active: true
                },
                {
    name: "HID Light",
    active: false
                },
                {
    name: "LED Light",
    active: true
                },
                {
    name: "High Roof",
    active: false
                },
                {
    name: "New Shape",
    active: true
                },
                {
    name: "Slide Glass",
    active: false
                }
            ]
        },
        {
    category: "SAFETY",
    items: [
                {
    name: "ABS",
    active: true
                },
                {
    name: "Air Bag",
    active: true
                },
                {
    name: "Around View Monitor",
    active: false
                },
                {
    name: "Back Camera",
    active: true
                },
                {
    name: "Front Camera",
    active: false
                },
                {
    name: "Side Camera",
    active: false
                },
                {
    name: "Corner Sensor",
    active: true
                },
                {
    name: "ESC",
    active: true
                }
            ]
        },
        {
    category: "OTHER & REMARKS",
    items: [
                {
    name: "Auto Door",
    active: false
                },
                {
    name: "Back Tire",
    active: false
                },
                {
    name: "Just Low",
    active: false
                },
                {
    name: "Half Leather Seat",
    active: true
                },
                {
    name: "Leather Seat",
    active: true
                },
                {
    name: "Same Tire",
    active: true
                },
                {
    name: "Side Lift Up Seat",
    active: false
                },
                {
    name: "Sloper",
    active: false
                }
            ]
        }
    ],
    equipmentRemarks: "5SEATS, GR SPORT EDITION, 19\" ALLOYS, PUSH START, REVERSE CAMERA"
},
  {
    id: "toyota-harrier-2020-grey",
    stockNo: "ALB-HR20",
    sbtStockId: "HR2020G",
    chassisNo: "MXUA80-0020118",
    modelCode: "6BA-MXUA80",
    engineCode: "M20A-FKS (2.0L Dynamic Force Petrol)",
    name: "Toyota Harrier 2020 Grey",
    moniker: "80-Series Dynamic Force Luxury Crossover",
    essenceQuote: "🚘 TOYOTA HARRIER 2020 – FOR SALE! 🔥\n✨ Premium Style • Comfort • Performance ✨\n📅 Year: 2020 Model | 🎨 Colour: Grey | 🛣️ Mileage: 74,000 KM\n⛽ Engine: 2.0L Dynamic Force Petrol (M20A-FKS)\n✅ Elegant & Stylish SUV | Spacious & Comfortable Interior\n✅ Premium Exterior Design | Ideal for Family & Business Use | Excellent Road Presence\n🏢 ALBERKA ENTERPRISES LTD — Your Trusted Car Partner Since 2011\n📍 Mombasa, Kenya 🇰🇪 | 📞 Call/WhatsApp: 0786000040",
    kicker: "2020 Model · 80-Series New Shape · 74,000 KM · Mombasa Stock",
    tagline: "Toyota Harrier 2020 · 2.0L Dynamic Force Petrol · Slate Grey Metallic · High Spec G Package",
    priceKes: 4500000,
    originalPriceKes: 4850000,
    discountPercent: 7,
    hubId: "toyota-harrier",
    priceUsd: 23500,
    freightUsd: 2200,
    vanningUsd: 0,
    inspectionUsd: 250,
    insuranceUsd: 200,
    totalCifUsd: 26150,
    inventoryLocation: "Ganjoni Showroom, Mombasa (Next to Ganjoni Primary School)",
    sbtGrade: "G PACKAGE DYNAMIC FORCE",
    year: 2020,
    registrationMonth: "08",
    manufactureYearMonth: "2020 / 08",
    mileageKm: 74000,
    steering: "RHD",
    category: "suv",
    bodyType: "SUV",
    fuelType: "PETROL",
    transmission: "Direct Shift-CVT",
    drivetrain: "2WD",
    doors: 5,
    seats: 5,
    engine: "1,986 cc M20A-FKS Dynamic Force Petrol",
    power: "171 HP @ 6,600 RPM",
    torque: "207 Nm @ 4,800 RPM",
    fuelEconomy: "15.4 km/L",
    exteriorColor: "Slate Grey Metallic",
    colorCode: "1L1",
    interiorColor: "Ash Grey Leather & Patterned Fabric with Wood Trim",
    locationYard: "Alberka Enterprises Showroom (Next to Ganjoni Primary School, Mombasa)",
    dimensions: "4.74m × 1.85m × 1.66m",
    m3: "14.5 m³",
    wheelbase: "2,690 mm",
    groundClearance: "195 mm",
    curbWeight: "1,550 kg",
    grossWeight: "1,825 kg",
    maxLoadingCapacity: "450 kg",
    fuelTankCapacity: "55 Liters",
    auctionGrade: "4.5",
    auctionHall: "USS Tokyo / SBT Japan Export Center",
    interiorGrade: "A",
    inspectionStatus: "QISJ Certified & JEVIC Odometer Inspected",
    status: "In Stock",
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
    audioPlayer: true,
    fogLights: true,
    rearSpoiler: true,
    doubleAc: true,
    powerBackDoor: true
    },
    heroImage: "/vehicles/toyota-harrier-2020-grey/hero-front-34.jpg",
    heroVideo: "https://assets.mixkit.co/videos/preview/mixkit-car-driving-through-city-streets-at-night-42417-large.mp4",
    colors: [
        {
    name: "Slate Grey Metallic",
    hex: "#4A525A",
    imageUrl: "/vehicles/toyota-harrier-2020-grey/hero-front-34.jpg"
        }
    ],
    gallery: [
        {
    title: "Toyota Harrier 2020 — Front Three Quarter",
    description: "80-Series front profile with sleek signature LED light guides, radar cruise sensor, and Slate Grey finish.",
    url: "/vehicles/toyota-harrier-2020-grey/hero-front-34.jpg"
        },
        {
    title: "Toyota Harrier 2020 — Front Grille & Fascia",
    description: "High-gloss upper grille trim, integrated front emblem radar, and lower air intake with chrome lip.",
    url: "/vehicles/toyota-harrier-2020-grey/front-grille-fascia.jpg"
        },
        {
    title: "Toyota Harrier 2020 — Front Side Profile",
    description: "Dynamic coupe-SUV silhouette, sculpted waistline, aerodynamic wing mirrors, and two-tone alloy wheels.",
    url: "/vehicles/toyota-harrier-2020-grey/front-side-profile.jpg"
        },
        {
    title: "Toyota Harrier 2020 — Continuous Rear LED Light Bar",
    description: "Full-width razor-sharp LED taillight strip, dual chrome exhaust outlets, and clean tailgate styling.",
    url: "/vehicles/toyota-harrier-2020-grey/rear-tailgate-led.jpg"
        },
        {
    title: "Toyota Harrier 2020 — Executive Driver Cockpit",
    description: "Floating widescreen infotainment display, saddle-style center console, woodgrain trim, and dual climate.",
    url: "/vehicles/toyota-harrier-2020-grey/driver-cockpit-console.jpg"
        },
        {
    title: "Toyota Harrier 2020 — Digital Instrument Cluster",
    description: "Multi-information LCD display with verified 76,045 km Japanese odometer and safety system readouts.",
    url: "/vehicles/toyota-harrier-2020-grey/digital-odometer-cluster.jpg"
        },
        {
    title: "Toyota Harrier 2020 — Front Luxury Bucket Seats",
    description: "Ergonomic two-tone ash grey leather and ribbed fabric upholstery with power adjustment.",
    url: "/vehicles/toyota-harrier-2020-grey/front-leather-seats.jpg"
        },
        {
    title: "Toyota Harrier 2020 — Rear Passenger Lounge",
    description: "Spacious rear bench with center armrest, cup holders, ISOFIX child seat anchors, and tinted rear glass.",
    url: "/vehicles/toyota-harrier-2020-grey/rear-leather-seats.jpg"
        },
        {
    title: "Toyota Harrier 2020 — Driver Door Switch Console",
    description: "Light ash wood trim bezel with one-touch power window switches and power folding mirror adjusters.",
    url: "/vehicles/toyota-harrier-2020-grey/driver-door-controls.jpg"
        },
        {
    title: "Toyota Harrier 2020 — Wide Cargo Boot",
    description: "Cavernous boot with retractable luggage roller blind, low loading sill, and 60:40 folding rear seats.",
    url: "/vehicles/toyota-harrier-2020-grey/open-cargo-trunk.jpg"
        },
        {
    title: "Toyota Harrier 2020 — Dynamic Force 2.0L Engine Bay",
    description: "M20A-FKS 2.0L Dual VVT-i petrol engine with Direct Shift-CVT. Unblemished chassis bolts and factory labels.",
    url: "/vehicles/toyota-harrier-2020-grey/engine-bay-m20a.jpg"
        }
    ],
    closerLookPoints: [
        {
    id: "new-shape-80",
    title: "80-Series Aerodynamic Generation",
    subtitle: "TNGA-K Architecture",
    description: "Lower center of gravity, ultra-rigid chassis, and continuous razor-thin rear light signature make the 2020 Harrier an icon on Kenyan highways.",
    imageUrl: "/vehicles/toyota-harrier-2020-grey/rear-tailgate-led.jpg",
    metric: "80-SERIES",
    metricLabel: "New Generation Platform"
        },
        {
    id: "dynamic-force-engine",
    title: "Dynamic Force 2.0L Petrol Powertrain",
    subtitle: "M20A-FKS High Thermal Efficiency",
    description: "High-compression 40% thermal efficiency 2.0L Dynamic Force petrol engine paired with Direct Shift-CVT with physical 1st launch gear.",
    imageUrl: "/vehicles/toyota-harrier-2020-grey/engine-bay-m20a.jpg",
    metric: "171 HP",
    metricLabel: "Responsive Petrol Power"
        },
        {
    id: "verified-cluster",
    title: "JEVIC Verified 74,000 KM Odometer",
    subtitle: "Complete Tokyo Maintenance History",
    description: "Digital instrument panel verifying authentic 76,045 km Japanese export mileage with zero odometer tampering.",
    imageUrl: "/vehicles/toyota-harrier-2020-grey/digital-odometer-cluster.jpg",
    metric: "74K KM",
    metricLabel: "Low Certified Mileage"
        },
        {
    id: "luxury-cabin",
    title: "Ash Grey Luxury Leather & Wood Cabin",
    subtitle: "Saddle Console & Floating Display",
    description: "Crafted with soft-touch leatherette, authentic light wood trim console, and ambient quiet cabin insulation.",
    imageUrl: "/vehicles/toyota-harrier-2020-grey/driver-cockpit-console.jpg",
    metric: "EXECUTIVE",
    metricLabel: "G Package Luxury Finish"
        }
    ],
    editorialFeatures: [
        {
    id: "powertrain",
    badge: "M20A-FKS DYNAMIC FORCE",
    title: "Toyota Dynamic Force 2.0L Engine",
    lead: "Responsive acceleration, outstanding thermal efficiency, and physical launch gear CVT.",
    narrative: [
                "The 2020 Toyota Harrier features the next-generation M20A-FKS Dynamic Force 2.0-liter 4-cylinder petrol engine.",
                "Equipped with high-speed combustion, D-4S direct and port injection, and electric VVT-iE, delivering 171 horsepower with exceptional 15.4 km/L fuel efficiency."
            ],
    specs: [
                {
    label: "Engine",
    value: "1,986 cc M20A-FKS Petrol"
                },
                {
    label: "Transmission",
    value: "Direct Shift-CVT with Launch Gear"
                },
                {
    label: "Fuel Economy",
    value: "15.4 KM/L"
                }
            ],
    slides: [
                {
    id: "engine-slide",
    title: "Clean Factory Engine Bay",
    subtitle: "Factory Inspection Marks Intact",
    description: "Fully inspected engine bay with zero leaks, verified fluids, and pristine chassis legs.",
    imageUrl: "/vehicles/toyota-harrier-2020-grey/engine-bay-m20a.jpg"
                }
            ]
        },
        {
    id: "interior",
    badge: "LUXURY SUITE",
    title: "Saddle-Style Executive Interior",
    lead: "Premium two-tone leather seats with floating touchscreen and acoustic glass.",
    narrative: [
                "Step into the 80-Series Harrier and you are greeted by an elevated saddle-inspired center console finished in tactile synthetic leather and wood.",
                "Standard multi-zone climate control, power driver seat, and multi-information cluster display provide effortless command."
            ],
    specs: [
                {
    label: "Seating",
    value: "5 Luxury Seats"
                },
                {
    label: "Infotainment",
    value: "Floating Touchscreen with Apple CarPlay / Android Auto"
                },
                {
    label: "Trim",
    value: "Ash Grey Leather & Synthetic Wood"
                }
            ],
    slides: [
                {
    id: "cockpit-slide",
    title: "Driver's Command Center",
    subtitle: "Floating Display & Saddle Console",
    description: "High-resolution display with digital climate controls and multi-function leather steering.",
    imageUrl: "/vehicles/toyota-harrier-2020-grey/driver-cockpit-console.jpg"
                }
            ]
        }
    ],
    chapters: [
        {
    id: "overview",
    tabLabel: "Overview",
    eyebrow: "2020 Toyota Harrier G",
    title: "The Executive Standard for Mombasa & Nairobi",
    narrative: [
                "The 2020 Toyota Harrier represents the pinnacle of Japanese crossover refinement.",
                "Available directly at Alberka Enterprises showroom next to Ganjoni Primary School, Mombasa."
            ],
    imageUrl: "/vehicles/toyota-harrier-2020-grey/hero-front-34.jpg",
    highlights: [
                {
    label: "Year",
    value: "2020 Model"
                },
                {
    label: "Color",
    value: "Slate Grey"
                },
                {
    label: "Mileage",
    value: "74,000 KM"
                }
            ]
        }
    ],
    specifications: [
        {
    category: "Powertrain & Performance",
    items: [
                {
    label: "Engine",
    value: "1,986 cc M20A-FKS Dynamic Force 4-Cylinder Petrol"
                },
                {
    label: "Power Output",
    value: "171 HP @ 6,600 RPM"
                },
                {
    label: "Torque",
    value: "207 Nm @ 4,800 RPM"
                },
                {
    label: "Transmission",
    value: "Direct Shift-CVT with Physical 1st Gear"
                },
                {
    label: "Drive Type",
    value: "Front-Wheel Drive (2WD)"
                },
                {
    label: "Fuel Tank",
    value: "55 Liters"
                }
            ]
        },
        {
    category: "Dimensions & Utility",
    items: [
                {
    label: "Overall Dimensions",
    value: "4,740 mm × 1,855 mm × 1,660 mm"
                },
                {
    label: "Wheelbase",
    value: "2,690 mm"
                },
                {
    label: "Ground Clearance",
    value: "195 mm"
                },
                {
    label: "Seating Capacity",
    value: "5 Passengers"
                },
                {
    label: "Boot Volume",
    value: "409 Liters (Extendable to 1,000L+)"
                }
            ]
        }
    ],
    workshopProtocol: [
        "QISJ pre-shipment inspection verified in Yokohama port prior to dispatch.",
        "Comprehensive 100-point mechanical check: brake rotors, steering tie-rods, suspension bushings.",
        "Full computer diagnostic scan confirming 0 DTC fault codes across engine, transmission, and radar.",
        "Engine oil and filter renewal with OEM synthetic Toyota 0W-16 specification.",
        "Air conditioning system evacuation and antimicrobial sanitization.",
        "Professional exterior two-stage paint polish and interior leather conditioning."
    ],
    equipmentChecklist: [
        {
    category: "COMFORT & CONVENIENCE",
    items: [
                {
    name: "ACC (Adaptive Cruise)",
    active: true
                },
                {
    name: "Air Conditioner",
    active: true
                },
                {
    name: "Audio Player",
    active: true
                },
                {
    name: "Both Power Slide Door",
    active: false
                },
                {
    name: "Cooler",
    active: true
                },
                {
    name: "Cruise Control",
    active: true
                },
                {
    name: "Double Air Conditioner",
    active: true
                },
                {
    name: "Left Side Power Slide Door",
    active: false
                },
                {
    name: "Navigation System",
    active: true
                },
                {
    name: "Paddle Shift",
    active: false
                },
                {
    name: "Power Back Door",
    active: true
                },
                {
    name: "Power Seat",
    active: true
                },
                {
    name: "Power Steering",
    active: true
                },
                {
    name: "Power Window All",
    active: true
                },
                {
    name: "Power Window Driver",
    active: true
                },
                {
    name: "Power Window Front",
    active: true
                },
                {
    name: "Push Start",
    active: true
                },
                {
    name: "Steering Switch",
    active: true
                }
            ]
        },
        {
    category: "DRESS UP",
    items: [
                {
    name: "Aero Front",
    active: true
                },
                {
    name: "Aero Rear",
    active: true
                },
                {
    name: "Aero Side",
    active: true
                },
                {
    name: "Alloy Wheels",
    active: true
                },
                {
    name: "Grill Guard",
    active: false
                },
                {
    name: "Rear Spoiler",
    active: true
                },
                {
    name: "Wood Combination Steering",
    active: false
                }
            ]
        },
        {
    category: "EXTERIOR",
    items: [
                {
    name: "Carrier Base",
    active: false
                },
                {
    name: "Roof Box",
    active: false
                },
                {
    name: "Roof Carrier",
    active: false
                },
                {
    name: "Roof Rails",
    active: false
                },
                {
    name: "Sun Roof",
    active: false
                },
                {
    name: "Double Sun Roof",
    active: false
                },
                {
    name: "Glass Roof",
    active: false
                },
                {
    name: "Fog Light",
    active: true
                },
                {
    name: "HID Light",
    active: false
                },
                {
    name: "LED Light",
    active: true
                },
                {
    name: "High Roof",
    active: false
                },
                {
    name: "New Shape",
    active: true
                },
                {
    name: "Slide Glass",
    active: false
                }
            ]
        },
        {
    category: "SAFETY",
    items: [
                {
    name: "ABS",
    active: true
                },
                {
    name: "Air Bag",
    active: true
                },
                {
    name: "Around View Monitor",
    active: false
                },
                {
    name: "Back Camera",
    active: true
                },
                {
    name: "Front Camera",
    active: false
                },
                {
    name: "Side Camera",
    active: false
                },
                {
    name: "Corner Sensor",
    active: true
                },
                {
    name: "ESC",
    active: true
                }
            ]
        },
        {
    category: "OTHER & REMARKS",
    items: [
                {
    name: "Auto Door",
    active: false
                },
                {
    name: "Back Tire",
    active: false
                },
                {
    name: "Just Low",
    active: false
                },
                {
    name: "Half Leather Seat",
    active: true
                },
                {
    name: "Leather Seat",
    active: true
                },
                {
    name: "Same Tire",
    active: true
                },
                {
    name: "Side Lift Up Seat",
    active: false
                },
                {
    name: "Sloper",
    active: false
                }
            ]
        }
    ],
    equipmentRemarks: "5SEATS, DYNAMIC FORCE 2.0L, PUSH START, REVERSE CAMERA, POWER BACK DOOR, RADAR CRUISE"
},
  {
    id: "subaru-xv-2019-black",
    stockNo: "ALB-XV19",
    sbtStockId: "XV2019",
    chassisNo: "GT7-202338",
    modelCode: "DBA-GT7",
    engineCode: "FB20 (2.0L Boxer Petrol)",
    name: "Subaru XV 2019 AWD",
    moniker: "Symmetrical AWD Adventure Crossover",
    essenceQuote: "SUBARU XV – 2019 MODEL 🚘\n✨ Sporty • AWD Confidence • Adventure-Ready ✨\n🔹 Model: 2019 Subaru XV | Mileage: 102,000 km | Engine Capacity: 1990cc Petrol Engine\n🔹 Color: Sleek Black | Condition: Super Clean, Mechanically Sound – Ready for the Road\n📍 Available at Alberka Enterprises Ltd – Mombasa\n📞 Contact us today for viewing, pricing, and booking.",
    kicker: "2019 Model · 2.0L Boxer Engine · Symmetrical AWD · Mombasa Stock",
    tagline: "Subaru XV 2019 · 2.0L Boxer Engine · Symmetrical All-Wheel Drive · EyeSight Safety Suite · Sleek Black",
    priceKes: 2700000,
    originalPriceKes: 2950000,
    discountPercent: 8,
    hubId: "subaru-xv",
    priceUsd: 15000,
    freightUsd: 2000,
    vanningUsd: 0,
    inspectionUsd: 250,
    insuranceUsd: 180,
    totalCifUsd: 17430,
    inventoryLocation: "Ganjoni Showroom, Mombasa (Next to Ganjoni Primary School)",
    sbtGrade: "2.0i-L EYESIGHT AWD",
    year: 2019,
    registrationMonth: "07",
    manufactureYearMonth: "2019 / 07",
    mileageKm: 102000,
    steering: "RHD",
    category: "suv",
    bodyType: "SUV",
    fuelType: "PETROL",
    transmission: "Lineartronic CVT 7-Speed",
    drivetrain: "AWD",
    doors: 5,
    seats: 5,
    engine: "1,995 cc FB20 Horizontally Opposed 4-Cylinder Boxer",
    power: "154 HP @ 6,000 RPM",
    torque: "196 Nm @ 4,000 RPM",
    fuelEconomy: "16.0 km/L",
    exteriorColor: "Crystal Black Silica",
    colorCode: "D4S",
    interiorColor: "Charcoal Black with Signature Orange Contrast Stitching",
    locationYard: "Alberka Enterprises Showroom (Next to Ganjoni Primary School, Mombasa)",
    dimensions: "4.46m × 1.80m × 1.61m",
    m3: "13.0 m³",
    wheelbase: "2,665 mm",
    groundClearance: "220 mm",
    curbWeight: "1,440 kg",
    grossWeight: "1,940 kg",
    maxLoadingCapacity: "500 kg",
    fuelTankCapacity: "63 Liters",
    auctionGrade: "4.5",
    auctionHall: "USS Tokyo / SBT Japan Export Center",
    interiorGrade: "A",
    inspectionStatus: "QISJ Certified & JEVIC Odometer Inspected",
    status: "In Stock",
    options: {
    pushStart: true,
    smartKey: true,
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
    radarCruise: true,
    laneAssist: true,
    ledLights: true,
    navigation: true,
    audioPlayer: true,
    fogLights: true,
    rearSpoiler: true,
    doubleAc: false,
    powerBackDoor: false
    },
    heroImage: "/vehicles/subaru-xv-2019-black/hero-front-34.jpg",
    heroVideo: "https://assets.mixkit.co/videos/preview/mixkit-car-driving-through-city-streets-at-night-42417-large.mp4",
    colors: [
        {
    name: "Crystal Black Silica",
    hex: "#111215",
    imageUrl: "/vehicles/subaru-xv-2019-black/hero-front-34.jpg"
        }
    ],
    gallery: [
        {
    title: "Subaru XV 2019 — Front Three Quarter",
    description: "Hawk-eye LED headlights, rugged lower cladding, and Crystal Black Silica finish under Mombasa sunshine.",
    url: "/vehicles/subaru-xv-2019-black/hero-front-34.jpg"
        },
        {
    title: "Subaru XV 2019 — Front Direct Grille Stance",
    description: "Hexagonal front grille with chrome winglet and silver accented lower fog light bezels.",
    url: "/vehicles/subaru-xv-2019-black/front-direct-grille.jpg"
        },
        {
    title: "Subaru XV 2019 — Dynamic Side Profile",
    description: "220mm ground clearance, two-tone machine-finished 17-inch alloy wheels, and side door garnishes.",
    url: "/vehicles/subaru-xv-2019-black/front-side-profile.jpg"
        },
        {
    title: "Subaru XV 2019 — Rear Direct AWD View",
    description: "Symmetrical AWD badge, high roof spoiler, and silver underbody diffuser skid garnish.",
    url: "/vehicles/subaru-xv-2019-black/rear-direct-awd.jpg"
        },
        {
    title: "Subaru XV 2019 — Rear Three Quarter",
    description: "C-shaped LED combination taillights and tinted UV-cut rear privacy glass.",
    url: "/vehicles/subaru-xv-2019-black/rear-three-quarter.jpg"
        },
        {
    title: "Subaru XV 2019 — Driver Cockpit & Orange Stitching",
    description: "Perforated leather steering wheel with audio and EyeSight radar cruise controls with orange stitching.",
    url: "/vehicles/subaru-xv-2019-black/cockpit-steering-orange-stitch.jpg"
        },
        {
    title: "Subaru XV 2019 — Digital Odometer Cluster",
    description: "Dual analogue gauges with center LCD screen displaying verified 102,225 km Japanese export mileage.",
    url: "/vehicles/subaru-xv-2019-black/digital-odometer-cluster.jpg"
        },
        {
    title: "Subaru XV 2019 — Full Dashboard Panorama",
    description: "Dual display layout with top multi-function info screen, central touchscreen, and digital climate dials.",
    url: "/vehicles/subaru-xv-2019-black/cabin-dashboard-panorama.jpg"
        },
        {
    title: "Subaru XV 2019 — Front Sport Bucket Seats",
    description: "High-bolster fabric and sport leatherette seats featuring distinctive orange stitching accents.",
    url: "/vehicles/subaru-xv-2019-black/front-sport-seats.jpg"
        },
        {
    title: "Subaru XV 2019 — Rear Passenger Bench",
    description: "Three-passenger rear seat with center armrest, dual cup holders, and fold-flat 60:40 capability.",
    url: "/vehicles/subaru-xv-2019-black/rear-passenger-bench.jpg"
        },
        {
    title: "Subaru XV 2019 — FB20 2.0L Boxer Engine",
    description: "Horizontally opposed 2.0L direct-injection petrol engine with symmetrical layout and low center of gravity.",
    url: "/vehicles/subaru-xv-2019-black/boxer-engine-bay.jpg"
        },
        {
    title: "Subaru XV 2019 — Cavernous Cargo Boot",
    description: "Wide rectangular boot with retractable luggage cover, tie-down anchors, and flat loading surface.",
    url: "/vehicles/subaru-xv-2019-black/open-cargo-boot.jpg"
        }
    ],
    closerLookPoints: [
        {
    id: "boxer-awd",
    title: "Symmetrical All-Wheel Drive",
    subtitle: "Unshakable All-Weather Traction",
    description: "Full-time AWD sends power to all four wheels simultaneously for superior stability on wet highways or loose safari trails.",
    imageUrl: "/vehicles/subaru-xv-2019-black/rear-direct-awd.jpg",
    metric: "AWD",
    metricLabel: "Symmetrical All-Wheel Drive"
        },
        {
    id: "fb20-boxer",
    title: "FB20 Horizontally Opposed Boxer Engine",
    subtitle: "Low Vibration & Center of Gravity",
    description: "Pistons move horizontally in opposition, canceling out vibrations naturally without requiring balance shafts.",
    imageUrl: "/vehicles/subaru-xv-2019-black/boxer-engine-bay.jpg",
    metric: "154 HP",
    metricLabel: "2.0L Boxer Petrol"
        },
        {
    id: "verified-cluster",
    title: "Verified 102,000 KM Odometer",
    subtitle: "Authentic Japanese JEVIC Certificate",
    description: "Multi-information cluster verified at 102,225 km with complete Japanese maintenance history.",
    imageUrl: "/vehicles/subaru-xv-2019-black/digital-odometer-cluster.jpg",
    metric: "102K KM",
    metricLabel: "Verified Odometer"
        },
        {
    id: "ground-clearance",
    title: "220mm High Ground Clearance",
    subtitle: "Ready for Kenyan Roads",
    description: "Class-leading 220mm clearance easily tackles rough terrain, potholes, and elevated speed bumps.",
    imageUrl: "/vehicles/subaru-xv-2019-black/front-side-profile.jpg",
    metric: "220 MM",
    metricLabel: "Ground Clearance"
        }
    ],
    editorialFeatures: [
        {
    id: "awd-capability",
    badge: "SYMMETRICAL AWD",
    title: "Subaru All-Wheel Drive & X-Mode",
    lead: "Command steep inclines, loose gravel, and torrential coastal rain with confidence.",
    narrative: [
                "Subaru's Symmetrical AWD lays the entire powertrain in a straight, balanced symmetrical line along the vehicle's center.",
                "With one press of the X-Mode button, engine throttle, transmission shift timing, and AWD torque split optimize to pull through any road challenge."
            ],
    specs: [
                {
    label: "Drive Layout",
    value: "Symmetrical AWD with X-Mode"
                },
                {
    label: "Ground Clearance",
    value: "220 mm"
                },
                {
    label: "Engine",
    value: "2.0L FB20 Boxer Petrol"
                }
            ],
    slides: [
                {
    id: "awd-slide",
    title: "All-Terrain Stance",
    subtitle: "Symmetrical AWD Badge",
    description: "High ground clearance and skid plate garnishes engineered for road confidence.",
    imageUrl: "/vehicles/subaru-xv-2019-black/rear-direct-awd.jpg"
                }
            ]
        }
    ],
    chapters: [
        {
    id: "overview",
    tabLabel: "Overview",
    eyebrow: "2019 SUBARU XV 2.0i-L",
    title: "The Ultimate Multi-Terrain Companion",
    narrative: [
                "The Subaru XV combines agile urban hatchback dimensions with genuine crossover SUV all-wheel-drive capability.",
                "Available directly at Alberka Enterprises showroom next to Ganjoni Primary School, Mombasa."
            ],
    imageUrl: "/vehicles/subaru-xv-2019-black/hero-front-34.jpg",
    highlights: [
                {
    label: "Year",
    value: "2019 Model"
                },
                {
    label: "Engine",
    value: "1990cc Boxer Petrol"
                },
                {
    label: "Color",
    value: "Sleek Black"
                }
            ]
        }
    ],
    specifications: [
        {
    category: "Engine & Drivetrain",
    items: [
                {
    label: "Engine",
    value: "1,995 cc FB20 Boxer 4-Cylinder Petrol DOHC 16V"
                },
                {
    label: "Power Output",
    value: "154 HP @ 6,000 RPM"
                },
                {
    label: "Torque",
    value: "196 Nm @ 4,000 RPM"
                },
                {
    label: "Transmission",
    value: "Lineartronic CVT with 7-Speed Manual Mode"
                },
                {
    label: "Drive System",
    value: "Symmetrical Full-Time All-Wheel Drive (AWD)"
                },
                {
    label: "Fuel Capacity",
    value: "63 Liters"
                }
            ]
        },
        {
    category: "Dimensions & Chassis",
    items: [
                {
    label: "Dimensions",
    value: "4,465 mm × 1,800 mm × 1,615 mm"
                },
                {
    label: "Wheelbase",
    value: "2,665 mm"
                },
                {
    label: "Ground Clearance",
    value: "220 mm"
                },
                {
    label: "Seating",
    value: "5 Passengers"
                },
                {
    label: "Boot Volume",
    value: "385 Liters (Extendable to 1,310L)"
                }
            ]
        }
    ],
    workshopProtocol: [
        "QISJ pre-shipment inspection certified in Japan prior to vessel boarding.",
        "Comprehensive 100-point mechanical check: boxer engine valve covers, Lineartronic CVT fluid, AWD differential seals.",
        "Electronic diagnosis verifying 0 DTC fault codes on Subaru Select Monitor.",
        "Engine oil and OEM filter renewal with synthetic 0W-20 boxer engine lubricant.",
        "Four-wheel laser alignment and brake pad inspection.",
        "Professional exterior polish and interior steam detailing."
    ],
    equipmentChecklist: [
        {
    category: "COMFORT & CONVENIENCE",
    items: [
                {
    name: "ACC (Adaptive Cruise)",
    active: true
                },
                {
    name: "Air Conditioner",
    active: true
                },
                {
    name: "Audio Player",
    active: true
                },
                {
    name: "Both Power Slide Door",
    active: false
                },
                {
    name: "Cooler",
    active: true
                },
                {
    name: "Cruise Control",
    active: true
                },
                {
    name: "Double Air Conditioner",
    active: false
                },
                {
    name: "Left Side Power Slide Door",
    active: false
                },
                {
    name: "Navigation System",
    active: true
                },
                {
    name: "Paddle Shift",
    active: true
                },
                {
    name: "Power Back Door",
    active: false
                },
                {
    name: "Power Seat",
    active: false
                },
                {
    name: "Power Steering",
    active: true
                },
                {
    name: "Power Window All",
    active: true
                },
                {
    name: "Power Window Driver",
    active: true
                },
                {
    name: "Power Window Front",
    active: true
                },
                {
    name: "Push Start",
    active: true
                },
                {
    name: "Steering Switch",
    active: true
                }
            ]
        },
        {
    category: "DRESS UP",
    items: [
                {
    name: "Aero Front",
    active: true
                },
                {
    name: "Aero Rear",
    active: true
                },
                {
    name: "Aero Side",
    active: true
                },
                {
    name: "Alloy Wheels",
    active: true
                },
                {
    name: "Grill Guard",
    active: false
                },
                {
    name: "Rear Spoiler",
    active: true
                },
                {
    name: "Wood Combination Steering",
    active: false
                }
            ]
        },
        {
    category: "EXTERIOR",
    items: [
                {
    name: "Carrier Base",
    active: false
                },
                {
    name: "Roof Box",
    active: false
                },
                {
    name: "Roof Carrier",
    active: false
                },
                {
    name: "Roof Rails",
    active: false
                },
                {
    name: "Sun Roof",
    active: false
                },
                {
    name: "Double Sun Roof",
    active: false
                },
                {
    name: "Glass Roof",
    active: false
                },
                {
    name: "Fog Light",
    active: true
                },
                {
    name: "HID Light",
    active: false
                },
                {
    name: "LED Light",
    active: true
                },
                {
    name: "High Roof",
    active: false
                },
                {
    name: "New Shape",
    active: true
                },
                {
    name: "Slide Glass",
    active: false
                }
            ]
        },
        {
    category: "SAFETY",
    items: [
                {
    name: "ABS",
    active: true
                },
                {
    name: "Air Bag",
    active: true
                },
                {
    name: "Around View Monitor",
    active: false
                },
                {
    name: "Back Camera",
    active: true
                },
                {
    name: "Front Camera",
    active: false
                },
                {
    name: "Side Camera",
    active: false
                },
                {
    name: "Corner Sensor",
    active: true
                },
                {
    name: "ESC",
    active: true
                }
            ]
        },
        {
    category: "OTHER & REMARKS",
    items: [
                {
    name: "Auto Door",
    active: false
                },
                {
    name: "Back Tire",
    active: false
                },
                {
    name: "Just Low",
    active: false
                },
                {
    name: "Half Leather Seat",
    active: true
                },
                {
    name: "Leather Seat",
    active: false
                },
                {
    name: "Same Tire",
    active: true
                },
                {
    name: "Side Lift Up Seat",
    active: false
                },
                {
    name: "Sloper",
    active: false
                }
            ]
        }
    ],
    equipmentRemarks: "5SEATS, SYMMETRICAL AWD, FB20 BOXER, EYESIGHT ADAS, PUSH START, REVERSE CAMERA"
},
  {
    id: "volvo-xc40-r-design-2019",
    stockNo: "ALB-XC40",
    sbtStockId: "XC4019",
    chassisNo: "YV1XZACMCK214613",
    modelCode: "DBA-XB420XC",
    engineCode: "B4204T47 (2.0L Turbo Petrol)",
    name: "Volvo XC40 R-Design 2019",
    moniker: "Scandinavian Luxury Compact Performance SUV",
    essenceQuote: "🔥 VOLVO XC40 R-DESIGN – 2019 Petrol 🔥\n✨ Sporty • Luxury • Compact SUV ✨\n📍 Mileage: 40,000 KM Only\n✅ 2000cc Turbo Petrol Engine | R-DESIGN Sport Package\n✅ Premium Black Leather Interior | LED “Thor Hammer” Headlights\n✅ Digital Meter Display | Large Touchscreen Infotainment | Reverse Camera & Parking Sensors\n✅ Push Start / Smart Key Entry | Electric Seats with Memory | Auto Tailgate with Foot Sensor\n✅ Dual Zone Climate Control | Cruise Control | Multifunction Steering Wheel | Sport Alloy Wheels\n💎 Stunning Scandinavian Design | Perfect Executive & Family SUV | Imported Direct from Japan",
    kicker: "2019 Model · R-Design T4 AWD · 40,000 KM · Mombasa Stock",
    tagline: "Volvo XC40 R-Design 2019 · 2.0L Turbo Petrol · T4 AWD · Harman Kardon · Onyx Black",
    priceKes: 4200000,
    originalPriceKes: 4500000,
    discountPercent: 7,
    hubId: "volvo-xc40",
    priceUsd: 22000,
    freightUsd: 2200,
    vanningUsd: 0,
    inspectionUsd: 250,
    insuranceUsd: 200,
    totalCifUsd: 24650,
    inventoryLocation: "Ganjoni Showroom, Mombasa (Next to Ganjoni Primary School)",
    sbtGrade: "R-DESIGN SPORT PACKAGE",
    year: 2019,
    registrationMonth: "09",
    manufactureYearMonth: "2019 / 09",
    mileageKm: 40000,
    steering: "RHD",
    category: "suv",
    bodyType: "SUV",
    fuelType: "PETROL",
    transmission: "8-Speed Geartronic Automatic",
    drivetrain: "AWD",
    doors: 5,
    seats: 5,
    engine: "1,968 cc 4-Cylinder Turbo Petrol B4204T",
    power: "190 HP @ 4,700 RPM",
    torque: "300 Nm @ 1,400 - 4,000 RPM",
    fuelEconomy: "13.6 km/L",
    exteriorColor: "Onyx Black Metallic",
    colorCode: "717",
    interiorColor: "Charcoal Black Leather & Nubuck Textile",
    locationYard: "Alberka Enterprises Showroom (Next to Ganjoni Primary School, Mombasa)",
    dimensions: "4.43m × 1.86m × 1.65m",
    m3: "13.6 m³",
    wheelbase: "2,702 mm",
    groundClearance: "211 mm",
    curbWeight: "1,675 kg",
    grossWeight: "2,220 kg",
    maxLoadingCapacity: "545 kg",
    fuelTankCapacity: "54 Liters",
    auctionGrade: "4.5",
    auctionHall: "USS Tokyo / SBT Japan Export Center",
    interiorGrade: "A",
    inspectionStatus: "QISJ Certified & JEVIC Odometer Inspected",
    status: "In Stock",
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
    camera360: true,
    radarCruise: true,
    laneAssist: true,
    ledLights: true,
    navigation: true,
    audioPlayer: true,
    fogLights: true,
    rearSpoiler: true,
    doubleAc: true,
    powerBackDoor: true
    },
    heroImage: "/vehicles/volvo-xc40-r-design-2019/hero-front-34.jpg",
    heroVideo: "https://assets.mixkit.co/videos/preview/mixkit-car-driving-through-city-streets-at-night-42417-large.mp4",
    colors: [
        {
    name: "Onyx Black Metallic",
    hex: "#0D0E11",
    imageUrl: "/vehicles/volvo-xc40-r-design-2019/hero-front-34.jpg"
        }
    ],
    gallery: [
        {
    title: "Volvo XC40 R-Design — Front Three Quarter",
    description: "Signature Thor's Hammer LED headlights, high-gloss black R-Design mesh grille, and diamond-cut alloys.",
    url: "/vehicles/volvo-xc40-r-design-2019/hero-front-34.jpg"
        },
        {
    title: "Volvo XC40 R-Design — Aggressive Front Stance",
    description: "Sculpted clamshell hood, contrasting gloss black roof accents, and integrated radar sensor emblem.",
    url: "/vehicles/volvo-xc40-r-design-2019/front-angle-stance.jpg"
        },
        {
    title: "Volvo XC40 R-Design — Driver Cockpit & 360 Display",
    description: "9-inch portrait Sensus touchscreen with 360-degree overhead parking camera and digital instrument display.",
    url: "/vehicles/volvo-xc40-r-design-2019/driver-cockpit-360.jpg"
        },
        {
    title: "Volvo XC40 R-Design — High-Definition Portrait Touchscreen",
    description: "Intuitive portrait center display with Bluetooth connectivity, climate sliders, and satellite navigation.",
    url: "/vehicles/volvo-xc40-r-design-2019/portrait-touchscreen.jpg"
        },
        {
    title: "Volvo XC40 R-Design — Center Console & Shifter",
    description: "Minimalist Scandinavian console with electronic parking brake, drive mode selector, and cup holders.",
    url: "/vehicles/volvo-xc40-r-design-2019/center-console-cockpit.jpg"
        },
        {
    title: "Volvo XC40 R-Design — Harman / Kardon Sound System",
    description: "Audiophile-grade Harman Kardon premium audio with bespoke metallic perforated door speaker grilles.",
    url: "/vehicles/volvo-xc40-r-design-2019/harman-kardon-speaker.jpg"
        },
        {
    title: "Volvo XC40 R-Design — Front Sport Bucket Seats",
    description: "Contoured R-Design sport seats in black perforated leather and nubuck with electric memory controls.",
    url: "/vehicles/volvo-xc40-r-design-2019/front-rdesign-seats.jpg"
        },
        {
    title: "Volvo XC40 R-Design — Rear Passenger Cabin",
    description: "Spacious Scandinavian rear bench with ISOFIX child seat tethers, rear air vents, and contrast stitching.",
    url: "/vehicles/volvo-xc40-r-design-2019/rear-leather-seats.jpg"
        },
        {
    title: "Volvo XC40 R-Design — T4 AWD & Itami Kobe Emblems",
    description: "Official factory Volvo T4 AWD and R-Design badges confirming Japanese dealer delivery history.",
    url: "/vehicles/volvo-xc40-r-design-2019/t4-awd-rdesign-badge.jpg"
        },
        {
    title: "Volvo XC40 R-Design — IntelliSafe Radar & Papago Dashcam",
    description: "Windshield-mounted IntelliSafe radar and dual optical dash camera for full safety recording.",
    url: "/vehicles/volvo-xc40-r-design-2019/intellisafe-dashcam.jpg"
        },
        {
    title: "Volvo XC40 R-Design — Cavernous Cargo Boot",
    description: "Deep square luggage compartment with flat loading floor, load-securing hooks, and parcel shelf.",
    url: "/vehicles/volvo-xc40-r-design-2019/open-cargo-boot.jpg"
        },
        {
    title: "Volvo XC40 R-Design — Rear Tailgate & Vertical LED Lamps",
    description: "Iconic vertical Scandinavian LED taillights, integrated roof spoiler, and chrome dual exhaust finishers.",
    url: "/vehicles/volvo-xc40-r-design-2019/rear-tailgate-full.jpg"
        }
    ],
    closerLookPoints: [
        {
    id: "thor-hammer-led",
    title: "Thor's Hammer Active LED Optics",
    subtitle: "Signature Scandinavian Lighting",
    description: "High-intensity LED headlights with auto high-beam switching and distinct T-shaped daytime running light guides.",
    imageUrl: "/vehicles/volvo-xc40-r-design-2019/front-angle-stance.jpg",
    metric: "LED DRL",
    metricLabel: "Thor's Hammer Optics"
        },
        {
    id: "harman-kardon",
    title: "Harman Kardon Premium Sound",
    subtitle: "Concert Hall Acoustic Tuning",
    description: "Multichannel high-fidelity audio system with Air Woofer Technology delivering crystal-clear soundscapes.",
    imageUrl: "/vehicles/volvo-xc40-r-design-2019/harman-kardon-speaker.jpg",
    metric: "PREMIUM",
    metricLabel: "Harman Kardon Audio"
        },
        {
    id: "verified-mileage",
    title: "Ultra-Low 40,000 KM Mileage",
    subtitle: "JEVIC Japanese Odometer Certified",
    description: "Rare low-mileage European compact SUV verified directly from Japanese export documentation.",
    imageUrl: "/vehicles/volvo-xc40-r-design-2019/cockpit-steering-view.jpg",
    metric: "40K KM",
    metricLabel: "Verified Japanese Odometer"
        },
        {
    id: "t4-awd-powertrain",
    title: "T4 AWD 2.0L Turbo Engine",
    subtitle: "190 HP with 8-Speed Geartronic",
    description: "Surefooted Haldex All-Wheel Drive paired with 300 Nm of low-end torque for cross-country exploration.",
    imageUrl: "/vehicles/volvo-xc40-r-design-2019/t4-awd-rdesign-badge.jpg",
    metric: "190 HP",
    metricLabel: "Turbocharged AWD Power"
        }
    ],
    editorialFeatures: [
        {
    id: "scandinavian-safety",
    badge: "INTELLISAFE RADAR",
    title: "World-Class Volvo Safety Architecture",
    lead: "Autonomous emergency braking, blind spot information, and lane keeping assist.",
    narrative: [
                "The Volvo XC40 is constructed with high-strength boron steel forming a rigid safety cage around passengers.",
                "Equipped with IntelliSafe radar suite, pedestrian detection, and 360-degree overhead parking camera."
            ],
    specs: [
                {
    label: "Safety Suite",
    value: "Volvo IntelliSafe with Pilot Assist"
                },
                {
    label: "Camera",
    value: "360-Degree Overhead Parking Monitor"
                },
                {
    label: "Chassis",
    value: "Boron Steel Safety Cage"
                }
            ],
    slides: [
                {
    id: "dashcam-slide",
    title: "IntelliSafe Optical Radar Sensor",
    subtitle: "Front Radar & Dashcam",
    description: "Active collision mitigation sensors mounted in the windshield header.",
    imageUrl: "/vehicles/volvo-xc40-r-design-2019/intellisafe-dashcam.jpg"
                }
            ]
        }
    ],
    chapters: [
        {
    id: "overview",
    tabLabel: "Overview",
    eyebrow: "2019 VOLVO XC40 R-DESIGN",
    title: "The Premium Scandinavian Benchmark",
    narrative: [
                "The Volvo XC40 R-Design combines sporty aesthetics with Scandinavian functionality.",
                "Available directly at Alberka Enterprises showroom next to Ganjoni Primary School, Mombasa."
            ],
    imageUrl: "/vehicles/volvo-xc40-r-design-2019/hero-front-34.jpg",
    highlights: [
                {
    label: "Year",
    value: "2019 Model"
                },
                {
    label: "Mileage",
    value: "40,000 KM Only"
                },
                {
    label: "Drivetrain",
    value: "T4 All-Wheel Drive"
                }
            ]
        }
    ],
    specifications: [
        {
    category: "Engine & Powertrain",
    items: [
                {
    label: "Engine",
    value: "1,968 cc B4204T 4-Cylinder Turbocharged Petrol"
                },
                {
    label: "Power Output",
    value: "190 HP @ 4,700 RPM"
                },
                {
    label: "Torque",
    value: "300 Nm @ 1,400 - 4,000 RPM"
                },
                {
    label: "Transmission",
    value: "8-Speed Geartronic Automatic"
                },
                {
    label: "Drive Type",
    value: "All-Wheel Drive (AWD)"
                },
                {
    label: "Fuel Tank",
    value: "54 Liters"
                }
            ]
        },
        {
    category: "Dimensions & Utility",
    items: [
                {
    label: "Dimensions",
    value: "4,425 mm × 1,863 mm × 1,652 mm"
                },
                {
    label: "Wheelbase",
    value: "2,702 mm"
                },
                {
    label: "Ground Clearance",
    value: "211 mm"
                },
                {
    label: "Boot Capacity",
    value: "460 Liters (Extendable to 1,336L)"
                },
                {
    label: "Towing Capacity",
    value: "2,100 kg"
                }
            ]
        }
    ],
    workshopProtocol: [
        "QISJ pre-shipment vehicle condition inspection verified at Yokohama port prior to dispatch.",
        "Comprehensive 100-point mechanical evaluation covering turbocharger boost lines and AWD haldex clutch.",
        "Electronic diagnostic scan with VIDA diagnostic software confirming zero fault codes.",
        "Fresh synthetic engine oil and OEM filter replacement according to Volvo Castrol Edge Professional standard.",
        "Four-wheel laser alignment and high-speed tire balancing.",
        "Full interior leather deep cleanse and anti-bacterial cabin sanitization."
    ],
    equipmentChecklist: [
        {
    category: "COMFORT & CONVENIENCE",
    items: [
                {
    name: "ACC (Adaptive Cruise)",
    active: true
                },
                {
    name: "Air Conditioner",
    active: true
                },
                {
    name: "Audio Player",
    active: true
                },
                {
    name: "Both Power Slide Door",
    active: false
                },
                {
    name: "Cooler",
    active: true
                },
                {
    name: "Cruise Control",
    active: true
                },
                {
    name: "Double Air Conditioner",
    active: true
                },
                {
    name: "Left Side Power Slide Door",
    active: false
                },
                {
    name: "Navigation System",
    active: true
                },
                {
    name: "Paddle Shift",
    active: false
                },
                {
    name: "Power Back Door",
    active: true
                },
                {
    name: "Power Seat",
    active: true
                },
                {
    name: "Power Steering",
    active: true
                },
                {
    name: "Power Window All",
    active: true
                },
                {
    name: "Power Window Driver",
    active: true
                },
                {
    name: "Power Window Front",
    active: true
                },
                {
    name: "Push Start",
    active: true
                },
                {
    name: "Steering Switch",
    active: true
                }
            ]
        },
        {
    category: "DRESS UP",
    items: [
                {
    name: "Aero Front",
    active: true
                },
                {
    name: "Aero Rear",
    active: true
                },
                {
    name: "Aero Side",
    active: true
                },
                {
    name: "Alloy Wheels",
    active: true
                },
                {
    name: "Grill Guard",
    active: false
                },
                {
    name: "Rear Spoiler",
    active: true
                },
                {
    name: "Wood Combination Steering",
    active: false
                }
            ]
        },
        {
    category: "EXTERIOR",
    items: [
                {
    name: "Carrier Base",
    active: false
                },
                {
    name: "Roof Box",
    active: false
                },
                {
    name: "Roof Carrier",
    active: false
                },
                {
    name: "Roof Rails",
    active: true
                },
                {
    name: "Sun Roof",
    active: false
                },
                {
    name: "Double Sun Roof",
    active: false
                },
                {
    name: "Glass Roof",
    active: false
                },
                {
    name: "Fog Light",
    active: true
                },
                {
    name: "HID Light",
    active: false
                },
                {
    name: "LED Light",
    active: true
                },
                {
    name: "High Roof",
    active: false
                },
                {
    name: "New Shape",
    active: true
                },
                {
    name: "Slide Glass",
    active: false
                }
            ]
        },
        {
    category: "SAFETY",
    items: [
                {
    name: "ABS",
    active: true
                },
                {
    name: "Air Bag",
    active: true
                },
                {
    name: "Around View Monitor",
    active: true
                },
                {
    name: "Back Camera",
    active: true
                },
                {
    name: "Front Camera",
    active: true
                },
                {
    name: "Side Camera",
    active: true
                },
                {
    name: "Corner Sensor",
    active: true
                },
                {
    name: "ESC",
    active: true
                }
            ]
        },
        {
    category: "OTHER & REMARKS",
    items: [
                {
    name: "Auto Door",
    active: false
                },
                {
    name: "Back Tire",
    active: false
                },
                {
    name: "Just Low",
    active: false
                },
                {
    name: "Half Leather Seat",
    active: true
                },
                {
    name: "Leather Seat",
    active: true
                },
                {
    name: "Same Tire",
    active: true
                },
                {
    name: "Side Lift Up Seat",
    active: false
                },
                {
    name: "Sloper",
    active: false
                }
            ]
        }
    ],
    equipmentRemarks: "5SEATS, R-DESIGN T4 AWD, HARMAN KARDON, 360 CAMERA, POWER TAILGATE, 40K KM ONLY"
}
];
