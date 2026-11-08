export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  category: 'Provenance' | 'Engineering' | 'Market Guide' | 'Ownership';
  coverImage: string;
  author: {
    name: string;
    role: string;
  };
  publishedDate: string;
  readTime: string;
  excerpt: string;
  content: string[];
  tags: string[];
  featured?: boolean;
}

export const INITIAL_BLOG_POSTS: BlogPost[] = [
  {
    id: 'uss-tokyo-auction-sheet-guide',
    slug: 'uss-tokyo-auction-sheet-guide',
    title: 'The USS Tokyo Grade 4.5 Standard: Decoding Japanese Inspection Sheets',
    subtitle: 'Why Auction Grade 4.5 is the dividing line between immaculate provenance and hidden panel repainting.',
    category: 'Provenance',
    coverImage: 'https://images.pexels.com/photos/16176579/pexels-photo-16176579.jpeg?auto=compress&cs=tinysrgb&w=1600',
    author: {
      name: 'Alberka Inspection Desk',
      role: 'Tokyo Procurement & Quality Assurance',
    },
    publishedDate: 'November 4, 2026',
    readTime: '6 min read',
    excerpt: 'Japanese auction houses like USS Tokyo and CAA use rigorous scoring. Discover what Grade 4.5 interior marks (A/B) signify and how to detect concealed accident repairs before bidding.',
    content: [
      'In the Kenyan automotive market, terms like "mint condition" and "fresh import" are frequently used without technical verification. At Japanese wholesale auctions such as USS Tokyo, CAA Chubu, and TAA Yokohama, condition is not an opinion—it is an exact science recorded on an official Japanese auction inspection sheet.',
      'An Auction Grade 4.5 vehicle represents the top tier of pre-owned Japanese automobiles. To qualify for Grade 4.5, a vehicle must have genuine mileage under 100,000 kilometers, factory original paint depth across key structural pillars, and zero evidence of chassis or frame repair (marked as XX on the inspection blueprint).',
      'The auction diagram breaks down each body panel using standard codes: A1 indicates hairline scratches easily cleared with machine buffing; U1 indicates minor paintless-dent-removal impressions; and W1 designates factory-level paint blending. Any score of W2 or W3 indicates noticeable resprays, which Alberka Motors strictly disqualifies during pre-bid inspection.',
      'Equally important is the Interior Grade. A vehicle awarded an interior grade of A or B guarantees an odorless, non-smoker cabin with unblemished seat bolsters and pristine dashboard trim. Every vehicle arriving at our Mombasa showroom is accompanied by this verified document, translated and notarized alongside the original QISJ export certificate.'
    ],
    tags: ['Auction Sheets', 'USS Tokyo', 'Provenance', 'Grade 4.5'],
    featured: true,
  },
  {
    id: 'hybrid-battery-coastal-heat-kenya',
    slug: 'hybrid-battery-coastal-heat-kenya',
    title: 'High-Voltage in Coastal Heat: Protecting Hybrid Battery Packs in Kenya',
    subtitle: 'How cleaning the traction battery cooling duct prevents premature cell failure in Nairobi and Mombasa traffic.',
    category: 'Engineering',
    coverImage: 'https://images.pexels.com/photos/8986138/pexels-photo-8986138.jpeg?auto=compress&cs=tinysrgb&w=1600',
    author: {
      name: 'Eng. Farooq Hassan',
      role: 'Chief Technical Officer, Alberka Workshop',
    },
    publishedDate: 'October 28, 2026',
    readTime: '5 min read',
    excerpt: 'Toyota Hybrid Synergy Drive and Nissan e-POWER battery packs thrive in Kenya—provided one critical component is serviced regularly: the cabin intake cooling blower.',
    content: [
      'Hybrid vehicles like the Toyota Harrier E-Four and Nissan Serena e-POWER have become the gold standard for Kenyan drivers balancing rising fuel prices with executive comfort. However, the high-voltage nickel-metal hydride (NiMH) and lithium-ion traction packs operate within a narrow optimal thermal window of 25°C to 38°C.',
      'In hot coastal conditions like Mombasa, or stop-and-go jams along Mombasa Road in Nairobi, the hybrid battery relies entirely on forced air drawn from the rear passenger cabin via an intake vent (typically located beside the rear seat bench). Over thousands of kilometers, this intake vent accumulates fine lint, pet hair, and road dust.',
      'When the intake duct is restricted by as little as 30%, the hybrid control ECU cannot exhaust thermal buildup. To prevent thermal runaway, the ECU restricts regenerative braking charge cycles and forces the petrol engine to run continuously, dramatically increasing fuel consumption and placing uneven voltage stress on individual battery module blocks.',
      'During our Mombasa workshop 100-point pre-delivery service, technicians remove the rear blower assembly, ultrasonically clean the squirrel-cage fan, and install a fresh electrostatic pre-filter. This single preventive protocol extends high-voltage battery life beyond 250,000 kilometers.'
    ],
    tags: ['Hybrid Care', 'Battery Health', 'Toyota Harrier', 'Engineering'],
    featured: true,
  },
  {
    id: 'mombasa-highway-handover-protocol',
    slug: 'mombasa-highway-handover-protocol',
    title: 'The Mombasa Highway Protocol: Why Port-Cleared Cars Need a Fluid Flush',
    subtitle: 'Japanese domestic motor oil is formulated for cold climates. Here is what happens when driven straight onto Kenyan tarmac.',
    category: 'Ownership',
    coverImage: 'https://images.pexels.com/photos/33327689/pexels-photo-33327689.jpeg?auto=compress&cs=tinysrgb&w=1600',
    author: {
      name: 'Mombasa Technical Desk',
      role: 'Pre-Delivery Engineering',
    },
    publishedDate: 'October 16, 2026',
    readTime: '4 min read',
    excerpt: 'Never drive a fresh Japanese import from the port to Nairobi on its arrival engine oil. Discover the thermal breakdown risk of low-viscosity Japanese winter oils.',
    content: [
      'Vehicles imported from Hokkaido, Tohoku, or Tokyo often carry ultra-low viscosity 0W-16 or 0W-20 factory fluids designed for sub-zero Japanese winters and short urban commutes. When a car is driven immediately off the port into 32°C Mombasa heat and pushed up the steep climb through Tsavo toward Nairobi, that thin oil suffers rapid shear breakdown.',
      'Additionally, during 30 to 45 days of ocean transit aboard vehicle carriers, condensation naturally settles in the engine crankcase and brake fluid reservoirs due to high maritime humidity and daily thermal cycling.',
      'This is why Alberka Motors never releases a vehicle directly from the port gate. Every car is flatbedded directly to our Tangana Road workshop, where the crankcase is fully drained and refilled with fresh Castrol EDGE fully synthetic titanium oil matching tropical ambient temperatures, paired with a brand-new OEM oil filter and copper sump washer.',
      'Brake fluid boiling point is tested with digital refractometers, and the radiator cooling system is pressurized to 1.1 bar to verify zero hose micro-cracks before the car ever embarks on its journey to Nairobi.'
    ],
    tags: ['Workshop Standard', 'Castrol EDGE', 'Mombasa Road', 'Maintenance'],
    featured: false,
  },
  {
    id: 'awd-vs-2wd-kenya-roads',
    slug: 'awd-vs-2wd-kenya-roads',
    title: 'AWD vs 2WD in Kenya: Choosing Between RAV4 Adventure and Harrier Hybrid',
    subtitle: 'Dynamic Torque Vectoring AWD vs E-Four electric rear motor: Which system matches your lifestyle and travel destinations?',
    category: 'Market Guide',
    coverImage: 'https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg?auto=compress&cs=tinysrgb&w=1600',
    author: {
      name: 'Alberka Advisory Team',
      role: 'Fleet Specialists',
    },
    publishedDate: 'September 30, 2026',
    readTime: '5 min read',
    excerpt: 'Mechanical propeller shaft AWD vs independent rear electric motor: Which drivetrain handles wet upcountry black cotton soil and coastal sand tracks with total confidence?',
    content: [
      'When buying a Japanese crossover in Kenya, buyers frequently debate whether to choose a mechanical all-wheel-drive system (such as the Dynamic Torque Vectoring system in the RAV4 Adventure) or an electronic AWD setup (such as Toyota E-Four in the Harrier Hybrid).',
      'The mechanical Dynamic Torque Vectoring system features physical drive shafts and twin rear clutches that can send up to 50% of engine torque to either individual rear wheel. For drivers who frequently visit construction sites, agricultural farms in Naivasha or Eldoret, or navigate wet murram roads, this mechanical locking capability provides unstoppable traction.',
      'By contrast, the Harrier Hybrid E-Four utilizes an independent rear-axle electric motor. There is no heavy mechanical drive shaft running under the vehicle floor, resulting in an ultra-quiet cabin, zero drivetrain hump in the rear footwell, and remarkable fuel efficiency exceeding 20 km/L. In slippery tarmac rain conditions or sandy coastal roads, the rear motor engages in under 0.1 seconds to restore vehicle trajectory.',
      'Both systems are engineered for long-term reliability. Your choice depends on your weekly driving profile: opt for the RAV4 Adventure if 30% or more of your driving involves rough terrain, and select the Harrier Hybrid if you prioritize executive silent cruising between Nairobi and Mombasa.'
    ],
    tags: ['AWD', 'RAV4 Adventure', 'Harrier Hybrid', 'Kenyan Roads'],
    featured: false,
  }
];
