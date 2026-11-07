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
        title: '40% Thermal Efficiency',
        subtitle: 'Dynamic Force Combustion',
        description: 'Long-stroke combustion chambers and laser-clad intake valves convert more chemical energy into mechanical force than any preceding Toyota four-cylinder.',
        imageUrl: 'https://images.pexels.com/photos/33327689/pexels-photo-33327689.jpeg?auto=compress&cs=tinysrgb&w=1600',
        metric: '40%',
        metricLabel: 'Peak Thermal Efficiency'
      },
      {
        id: 'chassis-clearance',
        title: '200mm Ground Clearance',
        subtitle: 'East African Terrain Compliance',
        description: 'Elevated stance with reinforced multi-link rear suspension designed specifically to conquer corrugated Murram terrain and unpredictable flood ruts.',
        imageUrl: 'https://images.pexels.com/photos/261985/pexels-photo-261985.jpeg?auto=compress&cs=tinysrgb&w=1600',
        metric: '200 mm',
        metricLabel: 'Ride Height'
      }
    ],
    editorialFeatures: [
      {
        id: 'seats',
        badge: 'ALL-TERRAIN CABIN & ERGONOMICS',
        title: 'Adventure SofTex Seating & Contoured Wilderness Ergonomics',
        lead: 'High-durability polygonal-embossed SofTex upholstery, active lumbar bolstering, and contrast orange seam piping.',
        narrative: [
          'The interior of the RAV4 Adventure AWD balances utilitarian resilience with tactile comfort. Upholstered in bespoke SofTex synthetic leather, the seat facings resist mud, humidity, and abrasive dust while delivering exceptional breathability on long Rift Valley expeditions.',
          'Multi-density ergonomic foam cushions actively absorb off-camber road shocks before reaching the driver’s spine. 8-way power adjustability with memory and dual-stage seat ventilation ensures fatigue-free composure.',
          'The 60/40 split-folding rear bench deploys flat with a single pull lever, expanding cargo volume to 1,064 liters of versatile expedition storage with reversible, easy-wipe dual-level cargo flooring.'
        ],
        specs: [
          { label: 'Upholstery Material', value: 'Perforated SofTex with Laser Polygonal Inserts' },
          { label: 'Driver Adjustment', value: '8-Way Power Seat with 2-Way Lumbar Memory' },
          { label: 'Cargo Expansion', value: '1,064 Liters Flat-Fold Capacity' },
          { label: 'Accent Detailing', value: 'Anodized Orange Contrast Seam Piping' }
        ],
        slides: [
          {
            id: 'rav4-seat-1',
            title: 'SofTex Adventure Contoured Seats',
            subtitle: 'Dual-Density Foam & Orange Accent Detailing',
            description: 'Rugged water-resistant SofTex material crafted for intense African overland journeys with breathable perforated central spines.',
            imageUrl: './vehicles/rav4-adventure.jpg',
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
        badge: 'DRIVETRAIN & TRANSMISSION ARCHITECTURE',
        title: 'Dynamic Torque Vectoring AWD & Direct Shift-CVT with Physical 1st Launch Gear',
        lead: 'True mechanical launch gear eradicates rubber-band sluggishness, coupled with independent twin-coupling rear axle torque vectoring.',
        narrative: [
          'Toyota revolutionized the continuously variable transmission by embedding an authentic mechanical first gear set. At launch from a dead stop, the RAV4 accelerates through real meshed gears for instant, direct throttle response, seamlessly transferring momentum to the high-efficiency CVT belt once moving.',
          'The Dynamic Torque Vectoring All-Wheel Drive system incorporates independent electronically-controlled electromagnetic couplings on each rear wheel shaft. Up to 50% of engine torque can be directed to the rear axle, and 100% of that rear torque can be routed to either left or right wheel to pivot through loose gravel corners.',
          'During steady expressway cruising, the rear driveline disconnect disengages the prop shaft completely, stopping rotation to prevent drag losses and returning exceptional 15.2 km/L mixed-cycle fuel efficiency.'
        ],
        specs: [
          { label: 'Transmission Type', value: 'Direct Shift-CVT with Physical 1st Launch Gear' },
          { label: 'AWD System', value: 'Dynamic Torque Vectoring AWD + Rear Disconnect' },
          { label: 'Rear Torque Split', value: 'Up to 50:50 Front/Rear & 0:100 Left/Right' },
          { label: 'Terrain Modes', value: 'Mud & Sand, Rock & Dirt, Snow, Eco, Normal, Sport' }
        ],
        slides: [
          {
            id: 'rav4-trans-1',
            title: 'Direct-Shift Launch Gear Mechanism',
            subtitle: 'Mechanical First Gear Elimination of CVT Lag',
            description: 'Direct gear engagement provides crisp, immediate mechanical takeoff before transitioning effortlessly to wide-ratio belt pulleys.',
            imageUrl: 'https://images.pexels.com/photos/33327689/pexels-photo-33327689.jpeg?auto=compress&cs=tinysrgb&w=1600',
            metric: 'Direct 1st',
            metricLabel: 'Mechanical Launch Gear'
          },
          {
            id: 'rav4-trans-2',
            title: 'Dynamic Rear Torque Vectoring Couplings',
            subtitle: 'Independent Dual Rear Clutches',
            description: 'Channels lateral propulsion precisely to the outside wheel in high-speed sweeps, pulling the vehicle tight to the apex.',
            imageUrl: 'https://images.pexels.com/photos/39578152/pexels-photo-39578152.jpeg?auto=compress&cs=tinysrgb&w=1600',
            metric: '0–100%',
            metricLabel: 'Rear Cross-Wheel Vectoring'
          },
          {
            id: 'rav4-trans-3',
            title: 'Multi-Terrain Select Rotary Controller',
            subtitle: 'Intelligent Wheel-Slip Algorithm',
            description: 'Rotary dial dynamically modulates engine throttle mapping, brake pressure, and AWD clutch force across Mud, Sand, and Rock.',
            imageUrl: 'https://images.pexels.com/photos/261985/pexels-photo-261985.jpeg?auto=compress&cs=tinysrgb&w=1600',
            metric: '3 Modes',
            metricLabel: 'Dedicated Terrain Protocols'
          }
        ]
      },
      {
        id: 'infotainment',
        badge: 'DIGITAL COCKPIT & CONNECTIVITY',
        title: 'Floating Digital Cockpit with 7-Inch Multi-Information Display',
        lead: 'High-visibility digital instruments, intuitive audio touchscreen, and multi-information off-road pitch and roll monitors.',
        narrative: [
          'Perched centrally on the dash is the floating capacitive multimedia system featuring Apple CarPlay, Android Auto, and Bluetooth streaming. High-contrast typography ensures readability even under direct equatorial sunlight.',
          'The driver’s instrument cluster houses a crisp 7.0-inch color TFT Multi-Information Display (MID). Drivers can switch instantly between analog speedometer dials, digital telemetry, real-time torque vectoring distribution graphs, and off-road pitch/roll inclinometers.',
          'Dual-zone automatic climate control with dust and pollen filtration keeps the cabin pristine, complemented by wireless Qi smartphone charging in the central console cubby.'
        ],
        specs: [
          { label: 'Infotainment Interface', value: 'High-Resolution Touchscreen with Apple CarPlay' },
          { label: 'Cluster Screen', value: '7.0-inch TFT Multi-Information Cockpit Display' },
          { label: 'Off-Road Telemetry', value: 'Real-Time Pitch, Roll, and AWD Torque Split Monitors' },
          { label: 'Device Charging', value: 'Qi Inductive Wireless Pad + Dual High-Speed USB-C' }
        ],
        slides: [
          {
            id: 'rav4-info-1',
            title: '7-Inch Digital TFT Driver Cockpit',
            subtitle: 'Real-Time Vectoring & Inclinometer Telematics',
            description: 'Visualizes exact torque percentage delivered to each wheel in real time alongside digital speed and active radar cruise data.',
            imageUrl: 'https://images.pexels.com/photos/1633602/pexels-photo-1633602.jpeg?auto=compress&cs=tinysrgb&w=1600',
            metric: '7.0"',
            metricLabel: 'Full-Color Multi-Info Display'
          },
          {
            id: 'rav4-info-2',
            title: 'Floating Central Multimedia Display',
            subtitle: 'Capacitive Smartphone Touchscreen Hub',
            description: 'High-contrast matte screen with Apple CarPlay, Android Auto, rear camera guidelines, and vehicle telemetry integration.',
            imageUrl: 'https://images.pexels.com/photos/261985/pexels-photo-261985.jpeg?auto=compress&cs=tinysrgb&w=1600',
            metric: 'Touch',
            metricLabel: 'Capacitive Multi-Gesture'
          }
        ]
      },
      {
        id: 'safety',
        badge: 'ACTIVE RADAR & TNGA RIGIDITY',
        title: 'Toyota Safety Sense 2.0 & High-Tensile TNGA-K Platform',
        lead: 'Millimeter-wave radar and monocular camera active safety suite backed by the ultra-rigid TNGA-K platform.',
        narrative: [
          'Safety on Kenyan highways is anchored by Toyota Safety Sense 2.0. The Pre-Collision System uses millimeter-wave radar and an optical camera to detect obstacles, pedestrians, and cyclists, executing automated emergency braking if required.',
          'Full-Speed Range Dynamic Radar Cruise Control (DRCC) maintains a safe preset distance from preceding traffic down to a full stop. Lane Tracing Assist (LTA) monitors road markings and applies gentle steering torque to keep the vehicle centered.',
          'Built on the revolutionary TNGA-K platform, the body structure utilizes 57% high-strength tensile steel with structural ring reinforcements, creating an ultra-rigid safety cell that achieved top 5-star ratings in global crash testing.'
        ],
        specs: [
          { label: 'Active Radar', value: 'Pre-Collision System (PCS) with Pedestrian Detection' },
          { label: 'Cruise Control', value: 'Full-Speed Range Dynamic Radar Cruise Control (DRCC)' },
          { label: 'Lane Guidance', value: 'Lane Tracing Assist (LTA) with Steering Assist' },
          { label: 'Airbag Protection', value: '8-SRS Airbags including Driver Knee and Pelvis' }
        ],
        slides: [
          {
            id: 'rav4-safe-1',
            title: 'Toyota Safety Sense 2.0 Suite',
            subtitle: 'Millimeter-Wave Radar & Optical Camera Fusion',
            description: 'Constantly scans highway corridors for emergency obstacles, sudden lane intrusions, and crossing pedestrians.',
            imageUrl: './vehicles/rav4-adventure.jpg',
            metric: 'Level 2',
            metricLabel: 'Semi-Autonomous Radar Assist'
          },
          {
            id: 'rav4-safe-2',
            title: 'TNGA-K Ring Body Architecture',
            subtitle: '57% Ultra-High Tensile Steel Safety Cell',
            description: 'Laser screw welding and structural adhesives deliver 57% higher torsional rigidity than prior generations for peerless crash safety.',
            imageUrl: 'https://images.pexels.com/photos/16176579/pexels-photo-16176579.jpeg?auto=compress&cs=tinysrgb&w=1600',
            metric: '57%',
            metricLabel: 'Higher Torsional Rigidity'
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
          'Beneath the polygonal wheel arches lies an uncompromising Japanese chassis: wide-track geometry, reinforced suspension mounting points, and Dynamic Torque Vectoring All-Wheel Drive calibrated for relentless traction.'
        ],
        imageUrl: './vehicles/rav4-adventure.jpg',
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
        tabLabel: 'The Sanctuary',
        eyebrow: 'Interior Architecture',
        title: 'Ergonomic Sanctuary.',
        narrative: [
          'Inside, tactile orange accents puncture a purposeful graphite palette. Rubberized grip textures on HVAC dials, deep door pockets, and SofTex upholstered sport bolsters create an environment of purposeful serenity.'
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
        url: './vehicles/rav4-adventure.jpg'
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
      'Full chassis underbody rust-proofing seal for coastal Mombasa durability'
    ]
  },
  {
    id: 'toyota-harrier-hybrid',
    stockNo: 'ALB-4061',
    name: 'Toyota Harrier Hybrid Z Leather Package',
    moniker: 'The Sculpted Sovereign',
    essenceQuote: 'Couture craftsmanship draped over whispering hybrid momentum. An oasis of calm amidst the kinetic pulse of the metropolis.',
    kicker: 'Quiet Opulence',
    tagline: 'Couture aesthetics. THS II hybrid efficiency with E-Four electric all-wheel drive.',
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
    fuelEconomy: '21.6 km/L (WLTC Certified)',
    auctionGrade: 'Grade 4.5',
    auctionHall: 'TAA Chubu',
    interiorGrade: 'Grade A (Flawless Leather)',
    status: 'In Stock — Nairobi',
    heroVideo: 'https://videos.pexels.com/video-files/856356/856356-hd_1920_1080_30fps.mp4',
    heroImage: './vehicles/harrier-hybrid.jpg',
    colors: [
      { name: 'Precious Black Pearl', hex: '#111214', imageUrl: './vehicles/harrier-hybrid.jpg' },
      { name: 'White Pearl Crystal Shine', hex: '#f2f2f4', imageUrl: 'https://images.pexels.com/photos/16176579/pexels-photo-16176579.jpeg?auto=compress&cs=tinysrgb&w=1600' },
      { name: 'Slate Steel Metallic', hex: '#48494d', imageUrl: 'https://images.pexels.com/photos/33327689/pexels-photo-33327689.jpeg?auto=compress&cs=tinysrgb&w=1600' }
    ],
    closerLookPoints: [
      {
        id: 'electrochromic-roof',
        title: 'Electrochromic Dimming Panorama Roof',
        subtitle: 'Bespoke Ambient Lighting',
        description: 'Instant electric phase transition transforms the overhead panoramic glass from crystal transparent to frosted paper glow at the touch of a sensor.',
        imageUrl: 'https://images.pexels.com/photos/1633602/pexels-photo-1633602.jpeg?auto=compress&cs=tinysrgb&w=1600',
        metric: '0.1s',
        metricLabel: 'Transition Speed'
      },
      {
        id: 'saddle-console',
        title: 'Equestrian Saddle Center Console',
        subtitle: 'Artisan Leather Craftsmanship',
        description: 'Bent-wood architectural console cloaked in thick genuine leather with double saddle stitching, creating an intimate cockpit envelope.',
        imageUrl: 'https://images.pexels.com/photos/39578152/pexels-photo-39578152.jpeg?auto=compress&cs=tinysrgb&w=1600',
        metric: 'Hand-Stitched',
        metricLabel: 'Bespoke Saddle Hides'
      },
      {
        id: 'rear-light-strip',
        title: 'Monolithic LED Horizon Tail Lamp',
        subtitle: 'Razor-Thin Light Signature',
        description: 'An unbroken ultra-thin scarlet LED horizon bar spans the full tailgate width, accentuating the flared rear shoulder muscle.',
        imageUrl: 'https://images.pexels.com/photos/261985/pexels-photo-261985.jpeg?auto=compress&cs=tinysrgb&w=1600',
        metric: '1.2mm',
        metricLabel: 'Optical Light Guide Width'
      },
      {
        id: 'jbl-surround',
        title: 'JBL 9-Speaker Acoustic Concert Hall',
        subtitle: 'Clari-Fi Acoustic Restoration',
        description: 'Custom tuned 1,200W acoustic array with dedicated rear subwoofer engineered specifically for the acoustic geometry of the Harrier cabin.',
        imageUrl: 'https://images.pexels.com/photos/16176579/pexels-photo-16176579.jpeg?auto=compress&cs=tinysrgb&w=1600',
        metric: '9 Spkrs',
        metricLabel: 'JBL Premium Surround'
      }
    ],
    editorialFeatures: [
      {
        id: 'seats',
        badge: 'HAUTE COUTURE LEATHER & SKYROOF',
        title: 'Genuine Semi-Aniline Leather Lounge & Electrochromic Dimming Panorama Roof',
        lead: 'Semi-aniline leather hides, equestrian saddle-inspired center console, and an electrochromic glass ceiling that frosts in 0.1 seconds.',
        narrative: [
          'The interior of the Harrier Z Leather Package is tailored like haute couture. Upholstered in buttery semi-aniline genuine leather, the seats feature continuous vertical quilting and contrast piping inspired by bespoke luggage.',
          'Overhead, the Harrier introduces automotive electrochromic dimming glass. At the touch of an overhead capacitive sensor, the panoramic glass transforms from crystal clear transparency to a softly frosted glow, replicating the serene diffuse light of traditional Japanese Shoji paper screens while blocking 99% of infrared solar heat.',
          'Both front seats feature whisper-quiet dual-tier ventilation and rapid heating, while the driver commands 10-way power memory adjustment paired with easy-entry steering wheel retraction.'
        ],
        specs: [
          { label: 'Upholstery', value: 'Semi-Aniline Genuine Leather with Vertical Fluting' },
          { label: 'Overhead Skyroof', value: 'Electrochromic Dimming Glass (0.1s Frost Transition)' },
          { label: 'Climate Comfort', value: 'Front Seat Heating & Suction-Type Air Ventilation' },
          { label: 'Driver Ergonomics', value: '10-Way Power Adjustment with Dual-Profile Memory' }
        ],
        slides: [
          {
            id: 'harrier-seat-1',
            title: 'Electrochromic Dimming Panorama Glass',
            subtitle: 'Shoji-Inspired Diffuse Light Architecture',
            description: 'Transitions instantly between crystal transparent sky and frosted white shade, eliminating African solar heat without requiring a physical curtain.',
            imageUrl: 'https://images.pexels.com/photos/1633602/pexels-photo-1633602.jpeg?auto=compress&cs=tinysrgb&w=1600',
            metric: '0.1s',
            metricLabel: 'Electric Frost Transition'
          },
          {
            id: 'harrier-seat-2',
            title: 'Semi-Aniline Fluted Leather Armchairs',
            subtitle: 'Couture Hand-Stitched Genuine Hides',
            description: 'Gentle ergonomic contouring reduces shoulder tension with whisper-quiet suction seat ventilation.',
            imageUrl: './vehicles/harrier-hybrid.jpg',
            metric: 'Semi-Aniline',
            metricLabel: 'Full-Grain Hides'
          },
          {
            id: 'harrier-seat-3',
            title: 'Equestrian Saddle Center Console',
            subtitle: 'Bent-Wood Form Clothed in Double-Stitched Leather',
            description: 'Flowing console silhouette cradles the shift selector with ambient satin chrome edging and concealed sliding cup covers.',
            imageUrl: 'https://images.pexels.com/photos/39578152/pexels-photo-39578152.jpeg?auto=compress&cs=tinysrgb&w=1600',
            metric: 'Saddle',
            metricLabel: 'Equestrian Leather Craft'
          }
        ]
      },
      {
        id: 'transmission',
        badge: 'HYBRID PROPULSION & E-FOUR POWERTRAIN',
        title: 'Toyota Hybrid System II & Electronic On-Demand E-Four All-Wheel Drive',
        lead: '222 PS combined system output. Dual electric motor synergy with independent high-torque rear axle propulsion.',
        narrative: [
          'The Harrier Hybrid Z pairs Toyota’s acclaimed 2.5-liter A25A-FXS Dynamic Force combustion engine with a high-torque electric transaxle. Working through an electronic continuously variable planetary power-split device, power transition between electric and petrol motive force is imperceptible.',
          'The E-Four all-wheel-drive system abandons heavy, space-consuming mechanical transfer cases and center drive shafts. Instead, a dedicated 121 Nm electric motor is situated directly on the rear axle, activating automatically in milliseconds whenever front slippage is detected.',
          'With a world-leading 41% engine thermal efficiency and regenerative deceleration, the Harrier achieves 21.6 km/L certified fuel economy, allowing seamless 1,000 km journeys across East Africa on a single 55-liter tank.'
        ],
        specs: [
          { label: 'Hybrid Architecture', value: 'Toyota Hybrid System II (THS II) Planetary Split' },
          { label: 'Combined Output', value: '222 PS (163 kW) System Horsepower' },
          { label: 'AWD Configuration', value: 'E-Four Electronic On-Demand Rear Electric Motor' },
          { label: 'Certified Efficiency', value: '21.6 km/L (WLTC Combined Cycle)' }
        ],
        slides: [
          {
            id: 'harrier-trans-1',
            title: 'THS II Planetary Power-Split Device',
            subtitle: 'Electronic Continuously Variable Transaxle',
            description: 'Blends combustion engine torque and electric motor thrust seamlessly without stepped mechanical gears.',
            imageUrl: 'https://images.pexels.com/photos/33327689/pexels-photo-33327689.jpeg?auto=compress&cs=tinysrgb&w=1600',
            metric: '222 PS',
            metricLabel: 'Combined Hybrid Power'
          },
          {
            id: 'harrier-trans-2',
            title: 'Independent Rear Axle E-Four Motor',
            subtitle: 'Dedicated 121 Nm Instant Traction',
            description: 'Instantly stabilizes chassis in wet mountain switchbacks or sudden acceleration with zero propeller shaft weight penalty.',
            imageUrl: 'https://images.pexels.com/photos/39578152/pexels-photo-39578152.jpeg?auto=compress&cs=tinysrgb&w=1600',
            metric: '121 Nm',
            metricLabel: 'Rear Axle Instant Torque'
          }
        ]
      },
      {
        id: 'infotainment',
        badge: 'DIGITAL COCKPIT & ACOUSTIC SOUNDSTAGE',
        title: 'Panoramic 12.3-inch Digital Display & JBL 9-Speaker Audio Masterwork',
        lead: 'Ultra-wide panoramic touchscreen, electrostatic capacitive climate sliders, and JBL Clari-Fi acoustic restoration.',
        narrative: [
          'Anchoring the minimalist dashboard is an expansive 12.3-inch widescreen capacitive touchscreen. The split-screen interface allows simultaneous viewing of full-color navigation maps and hybrid energy management telematics.',
          'Acoustic reproduction is handled by a custom-engineered JBL 9-speaker soundstage. Tuned specifically to the acoustic resonance of the Harrier’s double-glazed cabin glass, Clari-Fi digital audio processing restores lost harmonics from compressed digital streams.',
          'The driver is further assisted by a full-color 10.5-inch Head-Up Display (HUD) projected directly onto the windshield, alongside a digital rear-view mirror with integrated high-definition front and rear recording cameras.'
        ],
        specs: [
          { label: 'Panoramic Display', value: '12.3-inch High-Definition Widescreen Interface' },
          { label: 'Soundstage', value: 'JBL 9-Speaker System with Clari-Fi Acoustic Restoration' },
          { label: 'Windshield HUD', value: '10.5-inch Full-Color Heads-Up Holographic Projection' },
          { label: 'Mirror System', value: 'Digital Rear-View Mirror with Dual Drive Recorders' }
        ],
        slides: [
          {
            id: 'harrier-info-1',
            title: '12.3-Inch Panoramic Touchscreen',
            subtitle: 'Dual-Zone Split-Screen Command Horizon',
            description: 'Seamless electrostatic glass interface controlling multimedia, climate, and real-time hybrid drive diagrams.',
            imageUrl: 'https://images.pexels.com/photos/1633602/pexels-photo-1633602.jpeg?auto=compress&cs=tinysrgb&w=1600',
            metric: '12.3"',
            metricLabel: 'High-Definition Screen Width'
          },
          {
            id: 'harrier-info-2',
            title: 'JBL 9-Speaker Clari-Fi Audio Architecture',
            subtitle: 'Concert Hall Acoustic Tuning',
            description: 'Subwoofer and silk dome tweeters calibrated to deliver breathtaking spatial clarity inside the acoustic glass cabin.',
            imageUrl: 'https://images.pexels.com/photos/261985/pexels-photo-261985.jpeg?auto=compress&cs=tinysrgb&w=1600',
            metric: '1,200 W',
            metricLabel: 'Acoustic Peak Power'
          }
        ]
      },
      {
        id: 'safety',
        badge: 'ACTIVE SAFETY & CHASSIS REFINEMENT',
        title: 'Toyota Safety Sense with Nighttime Pedestrian Radar & Active Cornering Assist',
        lead: 'Autonomous emergency braking with bicycle and nighttime pedestrian recognition, coupled with active chassis vectoring.',
        narrative: [
          'The Harrier Hybrid Z is safeguarded by the newest generation of Toyota Safety Sense. Optical and radar fusion sensors detect pedestrians in low-light night conditions and oncoming vehicles during right-hand turns at junctions.',
          'Active Cornering Assist (ACA) monitors vehicle yaw in rapid directional transitions, applying subtle inside-wheel brake pressure to eliminate understeer and track corners like an executive sports saloon.',
          'Acoustic double-laminated front side glass and extensive under-carpet sound-damping insulation suppress tyre roar and wind buffeting to near-inaudible decibel levels.'
        ],
        specs: [
          { label: 'Safety Suite', value: 'Toyota Safety Sense Nighttime Pedestrian & Cyclist' },
          { label: 'Cornering Assist', value: 'Active Cornering Assist (ACA) Yaw Brake Vectoring' },
          { label: 'Glass Architecture', value: 'Acoustic Dual-Pane Laminated Soundproof Glass' },
          { label: 'Parking Radar', value: 'Panoramic View Monitor (PVM) with Clearance Sonar' }
        ],
        slides: [
          {
            id: 'harrier-safe-1',
            title: 'Pre-Collision Radar with Low-Light Vision',
            subtitle: 'Nighttime Pedestrian & Intersection Detection',
            description: 'Millimeter-wave radar detects dark obstacles beyond standard headlight beam range and activates automated emergency deceleration.',
            imageUrl: './vehicles/harrier-hybrid.jpg',
            metric: 'Nighttime',
            metricLabel: 'Active Optical Sensitivity'
          },
          {
            id: 'harrier-safe-2',
            title: 'Acoustic Dual-Pane Laminated Glass',
            subtitle: 'Decibel Isolation Architecture',
            description: 'Acoustic PVB interlayer sandwiched between tempered glass layers cuts wind and road noise by 6 dB over standard glass.',
            imageUrl: 'https://images.pexels.com/photos/16176579/pexels-photo-16176579.jpeg?auto=compress&cs=tinysrgb&w=1600',
            metric: '-6 dB',
            metricLabel: 'Acoustic Decibel Attenuation'
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
        imageUrl: './vehicles/harrier-hybrid.jpg',
        videoUrl: 'https://videos.pexels.com/video-files/856356/856356-hd_1920_1080_30fps.mp4',
        highlights: [
          { label: 'Aerodynamic Cd', value: '0.31 Drag Factor' },
          { label: 'EV Driving Ratio', value: 'Up to 65% in Urban Nairobi' },
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
        tabLabel: 'The Sanctuary',
        eyebrow: 'Tactile Haute Couture',
        title: 'Hand-Crafted Equine Serenity.',
        narrative: [
          'The interior evokes the rich warmth of equestrian tack rooms. Bent-wood curves, semi-aniline leather, and ambient piping create a quiet haven sheltered from city noise.'
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
        url: './vehicles/harrier-hybrid.jpg'
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
      'Leather conditioning with bespoke beeswax hide-food cream'
    ]
  },
  {
    id: 'nissan-note-epower',
    stockNo: 'ALB-4059',
    name: 'Nissan Note e-POWER Medalist',
    moniker: 'The Urban Dynamo',
    essenceQuote: 'Pure electric acceleration unburdened by plug-in charging. The quintessential agile runabout for the modern metropolis.',
    kicker: 'Electrified Velocity',
    tagline: '100% Electric motor drive. Instant 254 Nm torque with zero plug-in hassle.',
    priceKes: 1850000,
    year: 2018,
    mileageKm: 52400,
    category: 'compact',
    bodyType: 'Electrified 5-Door Hatchback',
    fuelType: 'Series Hybrid (e-POWER)',
    transmission: 'Single-Speed Fixed Reduction Gearbox',
    drivetrain: 'Front Wheel Electric Motor Drive',
    engine: 'EM57 AC Synchronous Electric Motor + 1.2L HR12DE Generator',
    power: '109 PS (80 kW)',
    torque: '254 Nm Instant Torque',
    fuelEconomy: '34.0 km/L (JC08 Certified)',
    auctionGrade: 'Grade 4.5',
    auctionHall: 'USS Nagoya',
    interiorGrade: 'Grade A (Medalist Wood Grain & Leather)',
    status: 'In Stock — Mombasa',
    heroVideo: 'https://videos.pexels.com/video-files/2103099/2103099-hd_1920_1080_30fps.mp4',
    heroImage: './vehicles/note-epower.jpg',
    colors: [
      { name: 'Imperial Amber Metallic', hex: '#63391b', imageUrl: './vehicles/note-epower.jpg' },
      { name: 'Brilliant Silver Metallic', hex: '#c5c7cb', imageUrl: 'https://images.pexels.com/photos/16176579/pexels-photo-16176579.jpeg?auto=compress&cs=tinysrgb&w=1600' },
      { name: 'Sonic Blue Pearl', hex: '#163868', imageUrl: 'https://images.pexels.com/photos/33327689/pexels-photo-33327689.jpeg?auto=compress&cs=tinysrgb&w=1600' }
    ],
    closerLookPoints: [
      {
        id: 'em57-motor',
        title: 'EM57 High-Torque Electric Motor',
        subtitle: 'Nissan LEAF Sourced Propulsion',
        description: 'Borrowed directly from the world-record Nissan LEAF, the EM57 AC motor unleashes 254 Nm of instantaneous torque the moment the pedal is pressed.',
        imageUrl: 'https://images.pexels.com/photos/33327689/pexels-photo-33327689.jpeg?auto=compress&cs=tinysrgb&w=1600',
        metric: '254 Nm',
        metricLabel: 'Torque from 0 RPM'
      },
      {
        id: 'one-pedal',
        title: 'e-POWER One-Pedal Drive',
        subtitle: 'Regenerative Deceleration Mastery',
        description: 'Modulate acceleration and braking using just the accelerator pedal. Deceleration captures kinetic energy back into the subfloor battery.',
        imageUrl: 'https://images.pexels.com/photos/39578152/pexels-photo-39578152.jpeg?auto=compress&cs=tinysrgb&w=1600',
        metric: '70%',
        metricLabel: 'Less Brake Pedal Usage'
      },
      {
        id: 'subfloor-battery',
        title: 'Subfloor Compact Lithium Pack',
        subtitle: 'Low Center of Gravity',
        description: 'Tucked beneath the front seats, the lightweight 1.5 kWh buffer battery concentrates chassis mass low for go-kart agile cornering in traffic.',
        imageUrl: 'https://images.pexels.com/photos/261985/pexels-photo-261985.jpeg?auto=compress&cs=tinysrgb&w=1600',
        metric: '1.5 kWh',
        metricLabel: 'High-Rate Buffer Pack'
      },
      {
        id: 'medallist-trim',
        title: 'Medalist Artisan Cabin Suite',
        subtitle: 'Piano Black & Brown Leather',
        description: 'Top-tier Medalist specification featuring bespoke two-tone stitched seating, piano black console fascias, and illuminated entry sills.',
        imageUrl: 'https://images.pexels.com/photos/1633602/pexels-photo-1633602.jpeg?auto=compress&cs=tinysrgb&w=1600',
        metric: 'Medalist',
        metricLabel: 'Flagship Trim Grade'
      }
    ],
    editorialFeatures: [
      {
        id: 'seats',
        badge: 'URBAN ERGONOMICS & MEDALIST LUXURY',
        title: 'Medalist Two-Tone Semi-Leather Seats & Cavernous Interior Space',
        lead: 'Class-leading rear legroom rivaling executive sedans, Zero-Gravity spinal support, and premium two-tone Medalist upholstery.',
        narrative: [
          'Step inside the Note e-POWER Medalist, and expectations of compact hatchback dimensions are instantly overturned. Built on smart packaging principles, the rear passenger compartment boasts legroom comparable to mid-size executive saloons.',
          'The seats feature Nissan’s Zero-Gravity spinal contouring, finished in the flagship Medalist two-tone jacquard fabric with supple chocolate leather bolsters and contrast copper topstitching.',
          'With wide-opening 85-degree doors, ingress and egress into tight urban parking bays is effortless. The 60/40 folding rear bench expands boot space effortlessly to accommodate bulk grocery shopping or airport cases.'
        ],
        specs: [
          { label: 'Trim Package', value: 'Medalist Flagship Two-Tone Leather & Jacquard' },
          { label: 'Rear Legroom', value: '643 mm Executive Knee Clearance' },
          { label: 'Door Aperture', value: '85-Degree Wide Angle Opening Doors' },
          { label: 'Spinal Ergonomics', value: 'NASA Zero-Gravity Fatigue Reduction' }
        ],
        slides: [
          {
            id: 'note-seat-1',
            title: 'Medalist Flagship Two-Tone Interior',
            subtitle: 'Supple Leather Bolsters & Copper Stitching',
            description: 'Refined chocolate brown leather bolsters paired with textured fabric centers for superior grip and heat dissipation.',
            imageUrl: 'https://images.pexels.com/photos/1633602/pexels-photo-1633602.jpeg?auto=compress&cs=tinysrgb&w=1600',
            metric: 'Medalist',
            metricLabel: 'Top Japanese Grade'
          },
          {
            id: 'note-seat-2',
            title: 'Cavernous Rear Footwell Clearance',
            subtitle: 'Mid-Size Saloon Legroom in a 4-Meter Body',
            description: 'Generous flat floor architecture provides ample knee and foot clearance for three adult rear passengers.',
            imageUrl: 'https://images.pexels.com/photos/39578152/pexels-photo-39578152.jpeg?auto=compress&cs=tinysrgb&w=1600',
            metric: '643 mm',
            metricLabel: 'Rear Knee Clearance'
          }
        ]
      },
      {
        id: 'transmission',
        badge: 'ELECTRIC DRIVETRAIN & REDUCTION GEARBOX',
        title: 'EM57 Direct Electric Motor & Single-Speed Helical Reduction Drive',
        lead: '254 Nm of instant electric torque delivered straight to the front wheels through a bulletproof single-speed helical gearbox.',
        narrative: [
          'The Nissan Note e-POWER runs 100% on electricity generated on board. Propelling the front wheels is the EM57 AC synchronous motor borrowed from the Nissan LEAF, generating a punchy 254 Nm of torque instantly from zero RPM.',
          'Instead of a sluggish multi-speed automatic or belt-driven CVT that groans under load, torque is transferred through an ultra-compact single-speed helical reduction gearbox with zero gear changes and zero driveline lag.',
          'The 1.2-liter HR12DE 3-cylinder engine acts exclusively as a silent onboard generator. Because it is mechanically decoupled from the wheels, it runs at its highest thermal efficiency RPM sweet spot, yielding an astonishing 34.0 km/L JC08 fuel economy.',
          'e-POWER Drive allows full one-pedal driving: simply lift off the accelerator, and regenerative braking decelerates the car firmly while replenishing the battery.'
        ],
        specs: [
          { label: 'Traction Drive', value: 'EM57 AC Synchronous Motor (Nissan LEAF Heritage)' },
          { label: 'Gearbox Type', value: 'Single-Speed Fixed Helical Reduction Gearbox' },
          { label: 'Instant Torque', value: '254 Nm from 0 RPM (V6-level pull)' },
          { label: 'Certified Economy', value: '34.0 km/L (JC08 Japanese Certification)' }
        ],
        slides: [
          {
            id: 'note-trans-1',
            title: 'EM57 Electric Traction Motor',
            subtitle: 'Instantaneous 254 Nm Torque from Standstill',
            description: 'Surges forward with electric responsiveness, out-accelerating 2.0L turbocharged petrol cars across city intersections.',
            imageUrl: './vehicles/note-epower.jpg',
            metric: '254 Nm',
            metricLabel: 'Torque @ 0 RPM'
          },
          {
            id: 'note-trans-2',
            title: 'Single-Speed Helical Reduction Drive',
            subtitle: 'No Belts, No Clutch Wear, Direct Mesh',
            description: 'Bulletproof single-speed gearset ensures zero shift interruption, whisper-quiet operation, and low maintenance.',
            imageUrl: 'https://images.pexels.com/photos/33327689/pexels-photo-33327689.jpeg?auto=compress&cs=tinysrgb&w=1600',
            metric: 'Single-Speed',
            metricLabel: 'Fixed Ratio Gearbox'
          }
        ]
      },
      {
        id: 'infotainment',
        badge: 'TELEMATICS & PERIMETER VISION',
        title: 'Intelligent Smart Rear-View Mirror & Digital Cockpit',
        lead: 'LCD high-definition smart rear-view mirror with 360° Around View monitor, eliminating all blind spots.',
        narrative: [
          'The Note e-POWER Medalist incorporates an Intelligent Smart Rear-View Mirror. At the flip of a toggle, the reflective mirror transforms into a full-color LCD display fed by an external wide-angle camera, providing a clear rearward view unblocked by rear passengers or tall cargo.',
          'The central console features an integrated touchscreen navigation and audio receiver supporting Bluetooth hands-free, USB media, and reverse camera guidance.',
          'The Medalist instrument binnacle combines an analog power meter illustrating real-time regeneration and motor output alongside digital battery charge state and trip efficiency computers.'
        ],
        specs: [
          { label: 'Rearview Mirror', value: 'Smart LCD Digital Rear-View Mirror with Camera Toggle' },
          { label: 'Camera Array', value: 'Intelligent Around View Monitor (AVM) with Sonar' },
          { label: 'Instrument Dial', value: 'e-POWER Hybrid Power / Charge Energy Flow Meter' },
          { label: 'Climate Interface', value: 'Automatic Circular Digital Climate Control Pod' }
        ],
        slides: [
          {
            id: 'note-info-1',
            title: 'Smart LCD Digital Rear-View Mirror',
            subtitle: 'Camera Video Feed Overcoming Cargo Blind Spots',
            description: 'Switches seamlessly between optical mirror and high-definition wide video stream regardless of backseat passenger heads.',
            imageUrl: 'https://images.pexels.com/photos/261985/pexels-photo-261985.jpeg?auto=compress&cs=tinysrgb&w=1600',
            metric: 'Smart LCD',
            metricLabel: 'Digital Mirror Display'
          },
          {
            id: 'note-info-2',
            title: 'Circular Digital Climate Pod',
            subtitle: 'Piano Black Integrated Center Stack',
            description: 'Intuitive circular push-button climate array with clear digital display and rapid cabin defrosting.',
            imageUrl: 'https://images.pexels.com/photos/1633602/pexels-photo-1633602.jpeg?auto=compress&cs=tinysrgb&w=1600',
            metric: 'Auto',
            metricLabel: 'Digital Climate Control'
          }
        ]
      },
      {
        id: 'safety',
        badge: 'ACTIVE SAFETY & RADAR SHIELD',
        title: 'Nissan Intelligent Mobility Active Safety Shield',
        lead: 'Intelligent Emergency Braking, Lane Departure Warning, and Erroneous Pedal Acceleration Suppression.',
        narrative: [
          'Navigating bustling Nairobi traffic is stress-free thanks to Nissan’s comprehensive Safety Shield. The front optical camera monitors vehicle separation, applying Intelligent Emergency Braking (IEB) if a sudden hazard appears.',
          'Erroneous Pedal Acceleration Suppression prevents unintended vehicle lunges into walls or storefronts if the driver mistakenly presses the accelerator instead of the brake.',
          'Combined with Lane Departure Warning and Electronic Stability Control (VDC), the Note provides active peace of mind.'
        ],
        specs: [
          { label: 'Autonomous Braking', value: 'Intelligent Emergency Braking (IEB) with Pedestrian Alert' },
          { label: 'Pedal Protection', value: 'Erroneous Pedal Acceleration Suppression Shield' },
          { label: 'Lane Safety', value: 'Lane Departure Warning (LDW) with Acoustic Alert' },
          { label: 'Turning Radius', value: 'Ultra-Tight 5.2m Urban Turning Circle' }
        ],
        slides: [
          {
            id: 'note-safe-1',
            title: 'Intelligent Emergency Braking Suite',
            subtitle: 'Front Optical Sensor Hazard Mitigation',
            description: 'Autonomous collision detection and emergency brake intervention safeguards city commuters against sudden halts.',
            imageUrl: './vehicles/note-epower.jpg',
            metric: 'IEB',
            metricLabel: 'Autonomous City Braking'
          },
          {
            id: 'note-safe-2',
            title: '5.2-Meter Turning Radius',
            subtitle: 'Urban Agility & U-Turn Superiority',
            description: 'Tight wheel articulation allows painless U-turns and effortless maneuvering in congested parking garages.',
            imageUrl: 'https://images.pexels.com/photos/16176579/pexels-photo-16176579.jpeg?auto=compress&cs=tinysrgb&w=1600',
            metric: '5.2 m',
            metricLabel: 'Turning Radius'
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
        imageUrl: './vehicles/note-epower.jpg',
        videoUrl: 'https://videos.pexels.com/video-files/2103099/2103099-hd_1920_1080_30fps.mp4',
        highlights: [
          { label: 'Electric Drive', value: '100% of the time' },
          { label: 'Plug-in Needed', value: 'Zero (Gas-Generated EV)' },
          { label: 'Economy', value: '34.0 km/L JC08' }
        ]
      },
      {
        id: 'sanctuary',
        tabLabel: 'The Sanctuary',
        eyebrow: 'Medalist Cabin',
        title: 'Bespoke Executive Appointments.',
        narrative: [
          'The Medalist grade elevates the cabin with piano black fascias, genuine leather-wrapped steering wheel, and dual-tone stitched seats that rival luxury sedans.'
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
        url: './vehicles/note-epower.jpg'
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
    status: 'In Stock — Mombasa',
    heroVideo: 'https://videos.pexels.com/video-files/2053100/2053100-hd_1920_1080_30fps.mp4',
    heroImage: './vehicles/serena-highway-star.jpg',
    colors: [
      { name: 'Diamond Black Pearl', hex: '#141416', imageUrl: './vehicles/serena-highway-star.jpg' },
      { name: 'Phantom Black Metallic', hex: '#1c1d1f', imageUrl: 'https://images.pexels.com/photos/261985/pexels-photo-261985.jpeg?auto=compress&cs=tinysrgb&w=1600' },
      { name: 'Pure Pearl White', hex: '#f5f5f7', imageUrl: 'https://images.pexels.com/photos/20430089/pexels-photo-20430089.jpeg?auto=compress&cs=tinysrgb&w=1600' }
    ],
    closerLookPoints: [
      {
        id: 'captain-chairs',
        title: 'Zero-Gravity Captain Seats',
        subtitle: 'Designed to Reduce Back Fatigue',
        description: 'Comfortable seats shaped to support your spine naturally, so you and your passengers stay fresh even on long drives between Nairobi and Mombasa.',
        imageUrl: './vehicles/serena-interior-seats.jpg',
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
        imageUrl: './vehicles/serena-highway-star.jpg',
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
            imageUrl: './vehicles/serena-interior-seats.jpg',
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
            imageUrl: './vehicles/serena-transmission-gearbox.jpg',
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
          'Parking in tight Nairobi or Mombasa spaces is effortless with the 360-degree Around View Monitor. Four cameras show an overhead bird’s-eye view, alerting you if pedestrians or objects get close.',
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
            imageUrl: './vehicles/serena-infotainment-cockpit.jpg',
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
            imageUrl: './vehicles/serena-highway-star.jpg',
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
        url: './vehicles/serena-interior-seats.jpg'
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
