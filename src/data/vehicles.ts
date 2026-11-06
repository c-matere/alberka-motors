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

export interface Vehicle {
  id: string;
  stockNo: string;
  name: string;
  moniker: string; // Rolls-Royce inspired persona/title
  essenceQuote: string; // Contemplative grand statement
  kicker: string;
  tagline: string;
  priceKes: number;
  year: number;
  mileageKm: number;
  category: 'suv' | 'hybrid' | 'van' | 'compact' | 'executive';
  bodyType: string;
  fuelType: string;
  transmission: string;
  drivetrain: string;
  engine: string;
  power: string;
  torque: string;
  fuelEconomy: string;
  auctionGrade: string;
  auctionHall: string;
  interiorGrade: string;
  status: 'In Stock — Mombasa' | 'In Stock — Nairobi' | 'Cleared Port';
  heroVideo: string;
  heroImage: string;
  colors: VehicleColor[];
  closerLookPoints: CloserLookPoint[];
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
    id: 'toyota-rav4-adventure',
    stockNo: 'ALB-4062',
    name: 'Toyota RAV4 Adventure AWD',
    moniker: 'The Uncharted Horizon',
    essenceQuote: 'Born for the wild, sculpted with restraint. A harmonious union of mechanical fortitude and modern composure.',
    kicker: 'All-Terrain Poise',
    tagline: 'Rugged composure. Dynamic Torque Vectoring All-Wheel Drive.',
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
    interiorGrade: 'Grade B (Pristine Original)',
    status: 'In Stock — Mombasa',
    heroVideo: 'https://videos.pexels.com/video-files/3015510/3015510-hd_1920_1080_24fps.mp4',
    heroImage: './vehicles/rav4-adventure.jpg',
    colors: [
      { name: 'Ash Khaki / Ice Edge Roof', hex: '#7f8a7e', imageUrl: './vehicles/rav4-adventure.jpg' },
      { name: 'Attitude Black Mica', hex: '#1c1d1f', imageUrl: 'https://images.pexels.com/photos/261985/pexels-photo-261985.jpeg?auto=compress&cs=tinysrgb&w=1600' },
      { name: 'Platinum White Pearl', hex: '#f0f0f2', imageUrl: 'https://images.pexels.com/photos/16176579/pexels-photo-16176579.jpeg?auto=compress&cs=tinysrgb&w=1600' },
      { name: 'Magnetic Graphite Metallic', hex: '#58595c', imageUrl: 'https://images.pexels.com/photos/33327689/pexels-photo-33327689.jpeg?auto=compress&cs=tinysrgb&w=1600' }
    ],
    closerLookPoints: [
      {
        id: 'torque-vectoring',
        title: 'Dynamic Torque Vectoring',
        subtitle: 'Bespoke Traction Architecture',
        description: 'Dual electromagnetic couplings on the rear axle distribute torque independently to each rear wheel, pivoting the chassis into mountain bends with zero slip.',
        imageUrl: 'https://images.pexels.com/photos/39578152/pexels-photo-39578152.jpeg?auto=compress&cs=tinysrgb&w=1600',
        metric: '50:50',
        metricLabel: 'Rear Axle Split'
      },
      {
        id: 'orange-stitch',
        title: 'The Adventure Suite',
        subtitle: 'Artisan Contrast Detailing',
        description: 'SofTex synthetic hides adorned with laser-etched polygonal patterns and vibrant orange contrast seam piping for a cabin of athletic luxury.',
        imageUrl: 'https://images.pexels.com/photos/1633602/pexels-photo-1633602.jpeg?auto=compress&cs=tinysrgb&w=1600',
        metric: 'SofTex',
        metricLabel: 'Breathable Upholstery'
      },
      {
        id: 'thermal-efficiency',
        title: 'Dynamic Force Heart',
        subtitle: '40% World-Record Thermal Efficiency',
        description: 'Ultra-high compression Atkinson stroke coupled with electric variable valve timing (VVT-iE) ensures instantaneous overtaking torque with minimal fuel burn.',
        imageUrl: 'https://images.pexels.com/photos/8986138/pexels-photo-8986138.jpeg?auto=compress&cs=tinysrgb&w=1600',
        metric: '40%',
        metricLabel: 'Thermal Efficiency'
      },
      {
        id: 'chassis-clearance',
        title: 'TNGA GA-K Architecture',
        subtitle: 'High-Rigidity Lightweight Body',
        description: 'Generous 200 mm clearance and multi-link trailing wishbone suspension isolate cabin occupants from African washboard corrugations.',
        imageUrl: 'https://images.pexels.com/photos/34521192/pexels-photo-34521192.jpeg?auto=compress&cs=tinysrgb&w=1600',
        metric: '200 mm',
        metricLabel: 'Ground Clearance'
      }
    ],
    chapters: [
      {
        id: 'essence',
        tabLabel: 'The Essence',
        eyebrow: 'Design Philosophy',
        title: 'An unapologetic statement of capability.',
        narrative: [
          'The Adventure is not merely a styling pack; it is a mechanical declaration. Where ordinary crossovers hesitate at the perimeter of the asphalt, this machine commands gravel corridors, coastal sands, and highland escarpments with unflinching poise.',
          'Its polygonal proportions pay deliberate homage to vintage off-road archetypes, modernized through tension-rich surface planar geometry and an authoritative two-tone stance.'
        ],
        imageUrl: './vehicles/rav4-adventure.jpg',
        videoUrl: 'https://videos.pexels.com/video-files/3015510/3015510-hd_1920_1080_24fps.mp4',
        highlights: [
          { label: 'Character', value: 'Authoritative All-Terrain' },
          { label: 'Platform', value: 'TNGA High-Rigidity Body' },
          { label: 'Stance', value: 'Wide-Track Octagonal Grille' }
        ]
      },
      {
        id: 'poise',
        tabLabel: 'Exterior Poise',
        eyebrow: 'Sculptural Presence',
        title: 'Chiseled monolith meet aerodynamic finesse.',
        narrative: [
          'Every facet serves aerodynamic efficiency and mud evacuation. Extended matte black fender flares guard high-gloss bodywork against gravel spray, while underfloor aerodynamic strakes channel high-speed airflow straight to the rear diffuser.',
          '19-inch bespoke matte graphite turbine alloy wheels give the Adventure an anchored, grounded stance ready for spontaneous departures.'
        ],
        imageUrl: 'https://images.pexels.com/photos/39578152/pexels-photo-39578152.jpeg?auto=compress&cs=tinysrgb&w=1600',
        highlights: [
          { label: 'Wheels', value: '19" Matte Graphite Alloys' },
          { label: 'Lighting', value: 'Bi-Beam LED Projectors' },
          { label: 'Access', value: 'Kick-Sensor Power Liftgate' }
        ]
      },
      {
        id: 'sanctuary',
        tabLabel: 'The Sanctuary',
        eyebrow: 'Interior Suite',
        title: 'An oasis of tactile refinement and ergonomics.',
        narrative: [
          'Inside, the noise of the outside world is filtered away by multi-layer acoustic acoustic glass. Deeply bolstered SofTex seats feature heated and ventilated cushions designed to support the lower spine over eight-hour safari stretches.',
          'Orange contrast accent lines trace storage trays, console borders, and seat stitches, imparting warmth and mechanical purpose to an immaculate Japanese cockpit.'
        ],
        imageUrl: 'https://images.pexels.com/photos/1633602/pexels-photo-1633602.jpeg?auto=compress&cs=tinysrgb&w=1600',
        highlights: [
          { label: 'Upholstery', value: 'Perforated SofTex Leather' },
          { label: 'Display', value: '9-inch Apple CarPlay / Android Auto' },
          { label: 'Climate', value: 'Dual-Zone with nanoe™ Ionizer' }
        ]
      },
      {
        id: 'engineering',
        tabLabel: 'Motive Force',
        eyebrow: 'Precision Engineering',
        title: 'Dynamic Force meets electronic torque vectoring.',
        narrative: [
          'Under the hood lies Toyota’s celebrated M20A-FKS naturally aspirated engine. Equipped with both direct and port fuel injection (D-4S), it delivers instantaneous throttle crispness unattainable by lagged turbochargers.',
          'Coupled with a Direct Shift-CVT featuring a genuine physical launch gear, acceleration from standstill is mechanical and direct, smoothly transitioning to infinite pulley ratios for effortless 120 km/h cruising.'
        ],
        imageUrl: 'https://images.pexels.com/photos/8986138/pexels-photo-8986138.jpeg?auto=compress&cs=tinysrgb&w=1600',
        highlights: [
          { label: 'Power', value: '171 PS @ 6,600 rpm' },
          { label: 'Torque', value: '207 Nm @ 4,800 rpm' },
          { label: 'Driveline', value: 'AWD with Rear Disconnect' }
        ]
      }
    ],
    gallery: [
      {
        title: 'Adventure Front Fascia',
        description: 'Hexagonal active shutters and dark metallic fog lamp surrounds.',
        url: './vehicles/rav4-adventure.jpg'
      },
      {
        title: 'Digital Driver Interface',
        description: '7-inch multi-information screen displaying live torque distribution.',
        url: 'https://images.pexels.com/photos/1633602/pexels-photo-1633602.jpeg?auto=compress&cs=tinysrgb&w=1600'
      },
      {
        title: 'Engine Bay Craftsmanship',
        description: 'Immaculate mechanical presentation with fresh Castrol synthetic fluids.',
        url: 'https://images.pexels.com/photos/8986138/pexels-photo-8986138.jpeg?auto=compress&cs=tinysrgb&w=1600'
      },
      {
        title: 'Sculpted Rear Profile',
        description: 'High-mounted brake spoiler and dual chrome exhaust exits.',
        url: 'https://images.pexels.com/photos/39578152/pexels-photo-39578152.jpeg?auto=compress&cs=tinysrgb&w=1600'
      }
    ],
    specifications: [
      {
        category: 'Powertrain & Architecture',
        items: [
          { label: 'Chassis Code', value: '6BA-MXAA54 (Adventure Grade)' },
          { label: 'Displacement', value: '1,986 cc (2.0L Dynamic Force)' },
          { label: 'Horsepower', value: '171 PS (126 kW) @ 6,600 rpm' },
          { label: 'Peak Torque', value: '207 Nm @ 4,800 rpm' },
          { label: 'Fuel Tank Capacity', value: '55 Liters' },
          { label: 'Ground Clearance', value: '200 mm' }
        ]
      },
      {
        category: 'Active Safety & Assistance',
        items: [
          { label: 'Safety Suite', value: 'Toyota Safety Sense 2.0 (Pre-Collision, LTA, RSA)' },
          { label: 'Radar Cruise', value: 'Full-Speed Dynamic Radar Cruise Control' },
          { label: 'Surround Vision', value: '360 Bird’s-Eye Panoramic Monitor' },
          { label: 'Airbag Count', value: '8 SRS Airbags (Front, Side, Curtain, Knee)' }
        ]
      },
      {
        category: 'Dimensions & Capacities',
        items: [
          { label: 'Dimensions (L x W x H)', value: '4,610 x 1,865 x 1,690 mm' },
          { label: 'Wheelbase', value: '2,690 mm' },
          { label: 'Cargo Capacity', value: '580 Liters (VDA Method)' },
          { label: 'Kerb Weight', value: '1,630 kg' }
        ]
      }
    ],
    workshopProtocol: [
      'Castrol EDGE 0W-20 Full Synthetic Oil + Genuine Toyota Filter installed',
      '4-Wheel disc micrometer measurement & OEM ceramic brake pad calibration',
      'OBD-II Toyota Techstream ECU module health diagnostic scan (Zero DTCs)',
      'AC evaporator ultrasonic sterilization & HEPA carbon cabin filter replacement',
      'Complete 3-stage ceramic paint sealant and upholstery steam extraction'
    ]
  },
  {
    id: 'toyota-harrier-hybrid',
    stockNo: 'ALB-4058',
    name: 'Toyota Harrier Hybrid E-Four',
    moniker: 'The Quiet Sovereign',
    essenceQuote: 'True luxury never shouts; it hums with effortless composure. An executive sanctuary enveloped in Japanese shoji glass and mastercrafted leather.',
    kicker: 'Mastercrafted Luxury',
    tagline: 'Sculpted poise. Fourth-generation 2.5L THS-II Hybrid power.',
    priceKes: 4850000,
    year: 2020,
    mileageKm: 39100,
    category: 'hybrid',
    bodyType: 'Executive Crossover',
    fuelType: 'Petrol-Electric Hybrid',
    transmission: 'Electronic Continuously Variable (e-CVT)',
    drivetrain: 'E-Four Electric All-Wheel Drive (Dedicated Rear Axle Motor)',
    engine: '2.5L A25A-FXS Dynamic Force Hybrid',
    power: '222 Combined PS (163 kW)',
    torque: '221 Nm Engine + 202 Nm Front Motor + 121 Nm Rear Motor',
    fuelEconomy: '21.6 km/L (JC08 Cycle)',
    auctionGrade: 'Grade 4.5',
    auctionHall: 'TAA Yokohama',
    interiorGrade: 'Grade A (Flawless)',
    status: 'In Stock — Mombasa',
    heroVideo: 'https://videos.pexels.com/video-files/3129671/3129671-hd_1920_1080_30fps.mp4',
    heroImage: './vehicles/harrier-hybrid.jpg',
    colors: [
      { name: 'Precious Black Pearl', hex: '#18191c', imageUrl: './vehicles/harrier-hybrid.jpg' },
      { name: 'White Pearl Crystal Shine', hex: '#f7f7f9', imageUrl: 'https://images.pexels.com/photos/16176579/pexels-photo-16176579.jpeg?auto=compress&cs=tinysrgb&w=1600' },
      { name: 'Dark Blue Mica', hex: '#1a273b', imageUrl: 'https://images.pexels.com/photos/12163946/pexels-photo-12163946.jpeg?auto=compress&cs=tinysrgb&w=1600' }
    ],
    closerLookPoints: [
      {
        id: 'electrochromic-roof',
        title: 'Electrochromic Dimming Roof',
        subtitle: 'Artisan Light Control',
        description: 'Switches electronically from crystal transparency to soft frosted white, filtering equatorial sunshine like traditional Japanese shoji paper screens.',
        imageUrl: 'https://images.pexels.com/photos/14848422/pexels-photo-14848422.jpeg?auto=compress&cs=tinysrgb&w=1600',
        metric: 'Instant',
        metricLabel: 'Optical Frost'
      },
      {
        id: 'saddle-console',
        title: 'Saddle Leather Architecture',
        subtitle: 'Equestrian Inspired Touchpoints',
        description: 'Center console silhouette draws inspiration from handcrafted horse-riding saddles, swathed in supple leather with contrast twin-needle stitching.',
        imageUrl: 'https://images.pexels.com/photos/1633602/pexels-photo-1633602.jpeg?auto=compress&cs=tinysrgb&w=1600',
        metric: 'Hand',
        metricLabel: 'Tailored Leather'
      },
      {
        id: 'rear-light-strip',
        title: 'Razor Light-Strip Signature',
        subtitle: 'Unbroken Horizontal Blade',
        description: 'A single, continuous horizontal LED blade accentuates the car’s wide shoulders, illuminating with red clarity upon braking.',
        imageUrl: 'https://images.pexels.com/photos/33327689/pexels-photo-33327689.jpeg?auto=compress&cs=tinysrgb&w=1600',
        metric: 'Full-Width',
        metricLabel: 'LED Light Blade'
      },
      {
        id: 'jbl-surround',
        title: 'JBL Studio Acoustic Suite',
        subtitle: '9-Speaker High Fidelity Acoustic Tuning',
        description: 'Acoustically tuned specifically to the Harrier’s double-laminated cabin glass to replicate concert hall sound staging at 120 km/h.',
        imageUrl: 'https://images.pexels.com/photos/261985/pexels-photo-261985.jpeg?auto=compress&cs=tinysrgb&w=1600',
        metric: '9 Spk',
        metricLabel: 'JBL Acoustic Array'
      }
    ],
    chapters: [
      {
        id: 'essence',
        tabLabel: 'The Essence',
        eyebrow: 'Executive Philosophy',
        title: 'Tranquil power. Sculpted poise.',
        narrative: [
          'The Harrier Hybrid exists to remove tension from modern existence. Built upon the GA-K executive architecture, it glides across pavement with the composure of a private jet taxiing down a pristine runway.',
          'Its coupe-like roofline descends gently toward an elongated rear overhang, creating an unmistakable profile that commands respect at executive boardrooms and private coastal retreats.'
        ],
        imageUrl: './vehicles/harrier-hybrid.jpg',
        videoUrl: 'https://videos.pexels.com/video-files/3129671/3129671-hd_1920_1080_30fps.mp4',
        highlights: [
          { label: 'Character', value: 'Serene Executive' },
          { label: 'Powertrain', value: '2.5L THS-II Hybrid' },
          { label: 'All-Wheel Drive', value: 'Electric E-Four' }
        ]
      },
      {
        id: 'poise',
        tabLabel: 'Exterior Poise',
        eyebrow: 'Fluid Sculpture',
        title: 'Aerodynamics disguised as automotive sculpture.',
        narrative: [
          'From the subtle curvature of the front bonnet to the seamless integration of the active grille shutters, every millimeter has been sculpted to slice through coastal headwinds in utter silence.',
          'The rear signature is marked by an unbroken crimson LED light-strip that spans the entire width of the vehicle, emphasizing its broad, confident shoulder stance.'
        ],
        imageUrl: 'https://images.pexels.com/photos/261985/pexels-photo-261985.jpeg?auto=compress&cs=tinysrgb&w=1600',
        highlights: [
          { label: 'Roof Glass', value: 'Dimmable Electrochromic' },
          { label: 'Rear Styling', value: 'Continuous LED Strip' },
          { label: 'Acoustics', value: 'Double-Laminated Glass' }
        ]
      },
      {
        id: 'sanctuary',
        tabLabel: 'The Sanctuary',
        eyebrow: 'Bespoke Suite',
        title: 'A haven insulated from the world.',
        narrative: [
          'Within the cabin, tactile satisfaction is paramount. The center console takes its sculptural form from an equestrian saddle, covered in thick synthetic leather and accentuated by bent-wood veneer trim.',
          'The electrochromic panoramic glass roof eliminates traditional mechanical sunshades: with a single button press, the glass turns frosted white, bathing the cabin in soft, non-glaring natural daylight.'
        ],
        imageUrl: 'https://images.pexels.com/photos/1633602/pexels-photo-1633602.jpeg?auto=compress&cs=tinysrgb&w=1600',
        highlights: [
          { label: 'Audio', value: 'JBL 9-Speaker Studio Sound' },
          { label: 'Console', value: 'Saddle Leather Silhouette' },
          { label: 'Mirror', value: 'Digital Drive Recorder Mirror' }
        ]
      },
      {
        id: 'engineering',
        tabLabel: 'Motive Force',
        eyebrow: 'Electric All-Wheel Drive',
        title: 'THS-II Hybrid with rear electric motor.',
        narrative: [
          'The Harrier marries an ultra-refined 2.5-liter Atkinson cycle engine with high-torque electric motors front and rear. With 222 combined horsepower, power delivery is instantaneous, seamless, and completely devoid of transmission steps.',
          'The intelligent E-Four all-wheel-drive system operates with zero mechanical driveshaft connecting front and rear axles; the dedicated rear electric motor engages in milliseconds whenever slip is anticipated.'
        ],
        imageUrl: 'https://images.pexels.com/photos/8986138/pexels-photo-8986138.jpeg?auto=compress&cs=tinysrgb&w=1600',
        highlights: [
          { label: 'Combined Output', value: '222 PS (163 kW)' },
          { label: 'Fuel Economy', value: '21.6 km/Liter' },
          { label: 'Traction', value: 'E-Four Intelligent AWD' }
        ]
      }
    ],
    gallery: [
      {
        title: 'Executive Silhouette',
        description: 'Coupe profile sweeping backward with chrome waistline accents.',
        url: './vehicles/harrier-hybrid.jpg'
      },
      {
        title: 'Shoji Panoramic Roof',
        description: 'Electrochromic glass shifting seamlessly from clear to translucent frost.',
        url: 'https://images.pexels.com/photos/14848422/pexels-photo-14848422.jpeg?auto=compress&cs=tinysrgb&w=1600'
      },
      {
        title: 'Artisan Stitched Cockpit',
        description: 'High-definition 12.3-inch touchscreen with touch climate interface.',
        url: 'https://images.pexels.com/photos/1633602/pexels-photo-1633602.jpeg?auto=compress&cs=tinysrgb&w=1600'
      },
      {
        title: 'Precision Alloy Design',
        description: 'Multi-spoke aluminum alloy rims shod with low-noise Michelin rubber.',
        url: 'https://images.pexels.com/photos/261985/pexels-photo-261985.jpeg?auto=compress&cs=tinysrgb&w=1600'
      }
    ],
    specifications: [
      {
        category: 'Powertrain',
        items: [
          { label: 'Chassis Code', value: '6AA-AXUH85 (G/Z Package E-Four)' },
          { label: 'Combustion Engine', value: '2.5L 4-Cylinder DOHC (A25A-FXS)' },
          { label: 'Total Output', value: '222 PS (163 kW)' },
          { label: 'Front Motor Torque', value: '202 Nm' },
          { label: 'Rear Motor Torque', value: '121 Nm' },
          { label: 'Fuel Tank', value: '55 Liters' }
        ]
      },
      {
        category: 'Dimensions & Capacities',
        items: [
          { label: 'Length x Width x Height', value: '4,740 x 1,855 x 1,660 mm' },
          { label: 'Wheelbase', value: '2,690 mm' },
          { label: 'Turning Radius', value: '5.5 meters' },
          { label: 'Ground Clearance', value: '195 mm' }
        ]
      }
    ],
    workshopProtocol: [
      'Castrol EDGE 0W-16 Hybrid synthetic oil & OEM oil filter replacement',
      'Inverter cooling circuit pressure verification and fresh coolant exchange',
      'High-voltage traction battery cell delta voltage balancing diagnosis',
      'Toyota Safety Sense forward camera & millimeter wave radar calibration',
      'Hand-applied ceramic paint sealant & full interior conditioning'
    ]
  },
  {
    id: 'nissan-note-epower',
    stockNo: 'ALB-4061',
    name: 'Nissan Note e-POWER Medallist',
    moniker: 'The Kinetic Whisper',
    essenceQuote: 'Electric mobility emancipated from charging cables. A pure electric drive motor fed by an invisible, onboard generator.',
    kicker: 'Urban Electrification Refined',
    tagline: '100% electric motor propulsion. Instant 254 Nm torque. Zero plugs.',
    priceKes: 1650000,
    year: 2019,
    mileageKm: 52400,
    category: 'compact',
    bodyType: 'Electrified Compact Hatch',
    fuelType: 'Series Hybrid (e-POWER)',
    transmission: 'Single-Speed Fixed Reduction Gear (Zero Gearshifts)',
    drivetrain: 'Front Wheel Electric Motor Drive',
    engine: 'EM57 AC Synchronous Electric Motor + 1.2L HR12DE Generator',
    power: '109 PS (80 kW) Electric Motor',
    torque: '254 Nm (Instant from 0 RPM)',
    fuelEconomy: '34.0 km/L (JC08 Cycle)',
    auctionGrade: 'Grade 4.5',
    auctionHall: 'CAA Chubu',
    interiorGrade: 'Grade A',
    status: 'In Stock — Mombasa',
    heroVideo: 'https://videos.pexels.com/video-files/3163534/3163534-hd_1920_1080_30fps.mp4',
    heroImage: './vehicles/note-epower.jpg',
    colors: [
      { name: 'Brilliant Pearl White', hex: '#f2f3f5', imageUrl: './vehicles/note-epower.jpg' },
      { name: 'Brilliant Silver Metallic', hex: '#cfd2d6', imageUrl: 'https://images.pexels.com/photos/16176579/pexels-photo-16176579.jpeg?auto=compress&cs=tinysrgb&w=1600' },
      { name: 'Pearl Pure White', hex: '#f2f3f5', imageUrl: 'https://images.pexels.com/photos/20430089/pexels-photo-20430089.jpeg?auto=compress&cs=tinysrgb&w=1600' }
    ],
    closerLookPoints: [
      {
        id: 'em57-motor',
        title: 'EM57 Electric Heart',
        subtitle: 'Nissan LEAF Sourced Motor',
        description: 'Delivers 254 Nm of instant torque right from 0 RPM. Accelerates with linear electric smoothness without hesitation or transmission shifts.',
        imageUrl: 'https://images.pexels.com/photos/12163946/pexels-photo-12163946.jpeg?auto=compress&cs=tinysrgb&w=1600',
        metric: '254 Nm',
        metricLabel: 'From 0 RPM'
      },
      {
        id: 'one-pedal',
        title: 'e-POWER 1-Pedal Drive',
        subtitle: 'Regenerative Deceleration Control',
        description: 'Modulate your speed using only the accelerator pedal. Easing off activates up to 0.15g of smooth regenerative deceleration.',
        imageUrl: 'https://images.pexels.com/photos/34061266/pexels-photo-34061266.jpeg?auto=compress&cs=tinysrgb&w=1600',
        metric: '0.15g',
        metricLabel: 'Deceleration Force'
      },
      {
        id: 'subfloor-battery',
        title: 'Sub-Floor Lithium-Ion Cell',
        subtitle: '1.5 kWh High Output Pack',
        description: 'Strategically located beneath the front seats to lower the vehicle’s center of gravity and preserve full rear legroom.',
        imageUrl: 'https://images.pexels.com/photos/14848422/pexels-photo-14848422.jpeg?auto=compress&cs=tinysrgb&w=1600',
        metric: '1.5 kWh',
        metricLabel: 'Sub-Floor Battery'
      },
      {
        id: 'medallist-trim',
        title: 'Medallist Executive Interior',
        subtitle: 'Top-Tier Interior Appointment',
        description: 'Faux-suede seat centers bordered by supple leather bolsters, piano black console surrounds, and D-cut sports steering wheel.',
        imageUrl: 'https://images.pexels.com/photos/34521192/pexels-photo-34521192.jpeg?auto=compress&cs=tinysrgb&w=1600',
        metric: 'Grade A',
        metricLabel: 'Interior Suede'
      }
    ],
    chapters: [
      {
        id: 'essence',
        tabLabel: 'The Essence',
        eyebrow: 'Propulsion Revolution',
        title: 'EV thrill without the tether of a cable.',
        narrative: [
          'The Note e-POWER is an engineering revelation. Unlike conventional parallel hybrids where petrol and electricity fight over the drive axle, e-POWER dedicates 100% of wheel traction exclusively to an electric motor.',
          'The small 1.2L petrol engine operates purely as a quiet onboard generator, humming into life only when the battery pack demands charge. You experience full EV acceleration without ever having to plug into a wall.'
        ],
        imageUrl: './vehicles/note-epower.jpg',
        videoUrl: 'https://videos.pexels.com/video-files/3163534/3163534-hd_1920_1080_30fps.mp4',
        highlights: [
          { label: 'Wheel Drive', value: '100% Electric Motor' },
          { label: 'Torque', value: '254 Nm from 0 RPM' },
          { label: 'Range', value: '1,000+ km per Tank' }
        ]
      },
      {
        id: 'sanctuary',
        tabLabel: 'The Sanctuary',
        eyebrow: 'Medallist Cabin',
        title: 'Executive quiet in a compact footprint.',
        narrative: [
          'Because the engine never revs in lockstep with the wheels, cabin decibel levels remain astonishingly low. Additional acoustic sound-deadening in the front firewall shields passengers from mechanical clatter.',
          'The Medallist grade introduces custom suede upholstery, digital automatic climate control, and an Around View 360-degree camera system for seamless parallel parking in Mombasa and Nairobi.'
        ],
        imageUrl: 'https://images.pexels.com/photos/14848422/pexels-photo-14848422.jpeg?auto=compress&cs=tinysrgb&w=1600',
        highlights: [
          { label: 'Upholstery', value: 'Suede & Leatherette' },
          { label: 'Parking', value: '360 Around View Camera' },
          { label: 'Audio', value: 'Clean Touchscreen Bluetooth' }
        ]
      }
    ],
    gallery: [
      {
        title: 'e-POWER Front Stance',
        description: 'V-Motion chrome signature with electric blue accent line.',
        url: './vehicles/note-epower.jpg'
      },
      {
        title: 'Medallist Cockpit Suite',
        description: 'Electronic joystick drive selector and ergonomic D-cut steering wheel.',
        url: 'https://images.pexels.com/photos/14848422/pexels-photo-14848422.jpeg?auto=compress&cs=tinysrgb&w=1600'
      },
      {
        title: 'Polished Alloy Detail',
        description: 'Factory 15-inch aluminum wheels with low rolling-resistance tires.',
        url: 'https://images.pexels.com/photos/34521192/pexels-photo-34521192.jpeg?auto=compress&cs=tinysrgb&w=1600'
      },
      {
        title: 'High-Efficiency Cruising',
        description: 'Effortless throttle response tailored for traffic agility.',
        url: 'https://images.pexels.com/photos/34061266/pexels-photo-34061266.jpeg?auto=compress&cs=tinysrgb&w=1600'
      }
    ],
    specifications: [
      {
        category: 'Drive Motor & Generator',
        items: [
          { label: 'Chassis Code', value: 'DAA-HE12 (Medallist Grade)' },
          { label: 'Drive Motor', value: 'EM57 AC Synchronous Electric Motor' },
          { label: 'Generator', value: '1.2L 3-Cylinder DOHC (HR12DE)' },
          { label: 'Peak Torque', value: '254 Nm (0–3,008 rpm)' },
          { label: 'Peak Power', value: '109 PS (80 kW)' },
          { label: 'Fuel Tank', value: '41 Liters' }
        ]
      },
      {
        category: 'Dimensions',
        items: [
          { label: 'Length x Width x Height', value: '4,100 x 1,695 x 1,520 mm' },
          { label: 'Wheelbase', value: '2,600 mm' },
          { label: 'Turning Radius', value: '5.2 meters' }
        ]
      }
    ],
    workshopProtocol: [
      'Castrol Magnatec 0W-20 generator oil replacement & OEM filter',
      'EM57 electric drive reduction gear lubricant level verification',
      '1.5 kWh Lithium-Ion battery pack diagnostic health scan (98% SOH)',
      'Front and rear regenerative braking pad calibration',
      'Steam sanitation of interior fabrics and climate ducts'
    ]
  },
  {
    id: 'nissan-serena-highway-star',
    stockNo: 'ALB-4060',
    name: 'Nissan Serena Highway Star e-POWER',
    moniker: 'The Grand Sanctuary',
    essenceQuote: 'First-class travel for seven dignitaries. A tranquil lounge on wheels where zero-gravity seating meets dual hands-free access.',
    kicker: 'Family Hospitality Pinnacle',
    tagline: '7-Passenger executive lounge. Dual hands-free kick sliding doors.',
    priceKes: 2950000,
    year: 2019,
    mileageKm: 61000,
    category: 'van',
    bodyType: 'Executive 7-Seater MPV',
    fuelType: 'Series Hybrid (e-POWER)',
    transmission: 'Fixed Ratio Single-Speed Reduction Drive',
    drivetrain: 'Front Wheel Electric Motor Drive',
    engine: 'EM57 High-Output Electric Motor + 1.2L HR12DE Generator',
    power: '136 PS (100 kW)',
    torque: '320 Nm Instant Torque',
    fuelEconomy: '26.2 km/L (JC08 Cycle)',
    auctionGrade: 'Grade 4.5',
    auctionHall: 'USS Yokohama',
    interiorGrade: 'Grade A (Pristine Lounge)',
    status: 'In Stock — Mombasa',
    heroVideo: 'https://videos.pexels.com/video-files/2053100/2053100-hd_1920_1080_30fps.mp4',
    heroImage: './vehicles/serena-highway-star.jpg',
    colors: [
      { name: 'Midnight Diamond Black', hex: '#141416', imageUrl: './vehicles/serena-highway-star.jpg' },
      { name: 'Phantom Black Pearl', hex: '#141416', imageUrl: 'https://images.pexels.com/photos/261985/pexels-photo-261985.jpeg?auto=compress&cs=tinysrgb&w=1600' },
      { name: 'Deep Cashmere White', hex: '#f5f5f7', imageUrl: 'https://images.pexels.com/photos/20430089/pexels-photo-20430089.jpeg?auto=compress&cs=tinysrgb&w=1600' }
    ],
    closerLookPoints: [
      {
        id: 'captain-chairs',
        title: 'Zero-Gravity Captain Seats',
        subtitle: 'NASA-Inspired Spinal Geometry',
        description: 'Neutral posture support reduces spinal muscle loading to zero, allowing long-distance cross-country journeys with pristine comfort.',
        imageUrl: 'https://images.pexels.com/photos/1633602/pexels-photo-1633602.jpeg?auto=compress&cs=tinysrgb&w=1600',
        metric: '2-2-3',
        metricLabel: 'Lounge Seating'
      },
      {
        id: 'dual-back-door',
        title: 'Dual-Back Opening Tailgate',
        subtitle: 'Split Upper Glass Access',
        description: 'Open just the upper glass window in cramped supermarket basements, or deploy the full tailgate for voluminous cargo loading.',
        imageUrl: 'https://images.pexels.com/photos/39578152/pexels-photo-39578152.jpeg?auto=compress&cs=tinysrgb&w=1600',
        metric: '40 cm',
        metricLabel: 'Minimum Clearance'
      },
      {
        id: 'kick-doors',
        title: 'Hands-Free Kick Sliding Doors',
        subtitle: 'Sensory Electric Access',
        description: 'Simply wave your foot beneath the side sill with key in pocket to slide open both massive passenger apertures.',
        imageUrl: 'https://images.pexels.com/photos/261985/pexels-photo-261985.jpeg?auto=compress&cs=tinysrgb&w=1600',
        metric: 'Dual',
        metricLabel: 'Power Kick Doors'
      },
      {
        id: 'propilot',
        title: 'Nissan ProPILOT Suite',
        subtitle: 'Single-Lane Highway Autonomy',
        description: 'Maintains highway lane centering and distance following with automatic full-stop hold in heavy traffic jams.',
        imageUrl: 'https://images.pexels.com/photos/16176579/pexels-photo-16176579.jpeg?auto=compress&cs=tinysrgb&w=1600',
        metric: 'ProPILOT',
        metricLabel: 'Radar Autonomy'
      }
    ],
    chapters: [
      {
        id: 'essence',
        tabLabel: 'The Essence',
        eyebrow: 'Hospitality Refined',
        title: 'Hospitality elevated to automotive high art.',
        narrative: [
          'The Serena Highway Star e-POWER redefines executive family transit. It treats every passenger not as cargo, but as an honored guest in an acoustic sanctuary.',
          'Powered by Nissan’s electric motor drive, the lurching gear changes of traditional minivans are eradicated, replaced by whisper-quiet linear momentum.'
        ],
        imageUrl: './vehicles/serena-highway-star.jpg',
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
        url: './vehicles/serena-highway-star.jpg'
      },
      {
        title: 'Lounge Cabin Layout',
        description: 'Individual captain chairs with fold-down airplane tables and cup holders.',
        url: 'https://images.pexels.com/photos/1633602/pexels-photo-1633602.jpeg?auto=compress&cs=tinysrgb&w=1600'
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
  }
];
