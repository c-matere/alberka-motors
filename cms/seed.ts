import { getPayload } from 'payload'
import configPromise from './payload.config'

async function seed() {
  console.log('🌱 Starting Comprehensive Alberka Motors Payload CMS Seeder...')
  const payload = await getPayload({
    config: configPromise,
  })

  // 1. Admin User
  const existingUsers = await payload.find({
    collection: 'users',
    limit: 1,
  })

  if (existingUsers.totalDocs === 0) {
    console.log('Creating admin user: admin@alberkamotors.co.ke')
    await payload.create({
      collection: 'users',
      data: {
        email: 'admin@alberkamotors.co.ke',
        password: 'AlberkaAdmin2026!',
        name: 'Alberka Operations',
        role: 'admin',
      },
    })
  }

  // 2. Global Site Settings
  console.log('Updating Site Settings...')
  await payload.updateGlobal({
    slug: 'site-settings',
    data: {
      businessName: 'Alberka Motors',
      tagline: 'Direct Japanese Imports · Mombasa Port & Nairobi',
      foundedYear: '2000',
      footerNotice: '© 2026 Alberka Motors. Direct Japanese Import Specialists. Mombasa & Nairobi.',
      phone: '+254 180 423 075',
      whatsappNumber: '254180423075',
      email: 'yard@alberkamotors.co.ke',
      workingHours: 'Monday – Saturday: 8:00 AM – 6:00 PM | Sunday: By Appointment',
      mombasaYardAddress: 'Tangana Road, Ganjoni, Port Reitz Area, Mombasa, Kenya',
      nairobiShowroomAddress: 'Alberka Plaza, Ngong Road, Nairobi, Kenya',
    },
  })

  // 3. Pages Setup (Overview, About, Workshop, Locations, Inventory)
  const existingPages = await payload.find({
    collection: 'pages',
    limit: 10,
  })

  if (existingPages.totalDocs === 0) {
    console.log('Seeding Pages for live content control...')

    // Page 1: Overview (Home)
    await payload.create({
      collection: 'pages',
      data: {
        title: 'Home (Overview)',
        slug: 'overview',
        badge: 'AVAILABLE FLEET · QUALITY JAPANESE IMPORTS',
        heroTitle: 'Direct Japanese Imports.\nInspected for Kenya.',
        heroSubtitle: 'Every vehicle is procured directly from USS Tokyo & TAA Yokohama auctions, verified with genuine Japanese auction sheets, and pre-serviced in our Mombasa workshop.',
        ctaText: 'Explore Available Fleet',
        ctaLink: '#inventory',
        stats: [
          { label: 'YEARS IN KENYA', value: '26 Years', description: 'Established in 2000' },
          { label: 'DELIVERED UNITS', value: '4,000+', description: 'Satisfied Kenyan drivers' },
          { label: 'AUCTION STANDARD', value: 'Grade 4.5+', description: 'USS Tokyo & TAA Auctions' },
          { label: 'WORKSHOP WARRANTY', value: '5,000 KM', description: 'In-house mechanical cover' },
        ],
        features: [
          {
            title: 'Zero Broker Markup',
            subtitle: 'Direct Auction Access',
            description: 'Direct wholesale bidding eliminates middleman markups and gives you transparent FOB to CIF pricing.',
            points: [{ item: 'Original Japanese Auction Sheet provided' }, { item: 'Complete Port duty transparency' }],
          },
          {
            title: '100-Point Mombasa Preparation',
            subtitle: 'Coastal Workshop Check',
            description: 'Every vehicle undergoes fluid flush, brake inspection, hybrid diagnostics, and marine rust proofing.',
            points: [{ item: 'Castrol synthetic fluid change' }, { item: 'Zero-mileage tampering guarantee' }],
          },
        ],
      },
    })

    // Page 2: About (Heritage & Provenance)
    await payload.create({
      collection: 'pages',
      data: {
        title: 'About Alberka',
        slug: 'about',
        badge: 'HERITAGE & PROVENANCE · ESTABLISHED 2000',
        heroTitle: '26 Years in Kenya. 4,000+ Verified Imports.',
        heroSubtitle: 'Founded in 2000, Alberka Enterprises was built on one strict standard: zero accident histories, zero mileage tampering, and transparent direct pricing.',
        ctaText: 'Browse Inspected Vehicles',
        ctaLink: '#inventory',
        stats: [
          { label: 'FOUNDED', value: 'Year 2000', description: '26 years continuous operations' },
          { label: 'CARS DELIVERED', value: '4,000+ Vehicles', description: 'Kenya clients nationwide' },
          { label: 'AUCTION QUALITY', value: 'Grade 4.5+ Benchmark', description: 'USS Tokyo & CAA Chubu' },
          { label: 'WARRANTY', value: '5,000 KM Written', description: 'Supported by in-house workshop' },
        ],
        features: [
          {
            title: 'Direct Japanese Auction Bidding',
            subtitle: 'Zero Intermediaries',
            description: 'We bid directly in Tokyo, Yokohama, and Nagoya wholesale lanes via licensed auction accounts. Before every bid, our Japanese inspection partners conduct physical checks of structural rails and electronics.',
            points: [
              { item: 'Grade 4.5 Minimum: Pristine bodywork and clean interiors' },
              { item: 'Certified Genuine Mileage: Official QISJ & JEVIC certificates' },
              { item: 'Original Export Dossier: Translated auction inspection sheets' },
            ],
          },
          {
            title: 'Direct Port Entry & Showroom Handover',
            subtitle: 'Logistical Continuity',
            description: 'Vehicles roll off carrier vessels at Mombasa Port directly into our secured Tangana Road workshop facility. They are never parked in unmonitored holding yards.',
            points: [
              { item: 'Secured bonded storage in Mombasa' },
              { item: 'Enclosed carrier transport to Nairobi showroom' },
            ],
          },
        ],
      },
    })

    // Page 3: Workshop (Technical Inspection & Care)
    await payload.create({
      collection: 'pages',
      data: {
        title: 'Technical Workshop',
        slug: 'workshop',
        badge: 'PRE-DELIVERY WORKSHOP PROTOCOL · MOMBASA & NAIROBI',
        heroTitle: 'The 100-Point Engineering Inspection Protocol.',
        heroSubtitle: 'Every Japanese import cleared through Mombasa receives comprehensive fluid renewals, computer diagnostics, suspension torque tests, and coastal marine rust seal.',
        ctaText: 'Book Workshop Diagnostic',
        ctaLink: '#workshop',
        stats: [
          { label: 'POINTS CHECKED', value: '100 Items', description: 'Exhaustive pre-delivery inspection' },
          { label: 'ENGINE OIL', value: 'Castrol EDGE', description: '100% Fully synthetic fluids' },
          { label: 'DIAGNOSTICS', value: 'OBD-II Scan', description: 'Zero active or pending DTC codes' },
          { label: 'WARRANTY', value: 'Written Guarantee', description: '5,000 KM / 6 Months Cover' },
        ],
        features: [
          {
            title: 'Oil & Fluids Service',
            subtitle: '100% Castrol EDGE Synthetic',
            description: 'We drain and replace engine oil with factory-grade Castrol EDGE synthetic oil. Every car receives a fresh genuine OEM filter, fresh sump washer, radiator coolant replenishment, and brake fluid boiling point certification.',
            points: [
              { item: 'Castrol EDGE Titanium fully synthetic engine oil' },
              { item: 'Genuine OEM oil filter and fresh copper sump washer' },
              { item: 'Brake fluid boiling point digitally tested for safety' },
              { item: 'Long-life radiator and hybrid inverter coolant topped up' },
            ],
          },
          {
            title: 'Brakes & Suspension',
            subtitle: 'Micrometer Disc & Pad Testing',
            description: 'All four wheels removed for digital micrometer measurements. Friction pads under 80% life are renewed with OEM-spec ceramic pads.',
            points: [
              { item: 'Rotor disc thickness measured against manufacturer tolerances' },
              { item: 'Brake friction pads renewed if under 80% wear threshold' },
              { item: 'Electronic parking brake and handbrake torque holding test' },
              { item: 'Suspension bushings, tie-rod ends, and shock absorbers checked' },
            ],
          },
          {
            title: 'Computer Diagnostics',
            subtitle: 'Full OBD-II Electronic Scan',
            description: 'Factory diagnostic scanners interrogate all onboard control modules. Engine management, transmission, hybrid system, ABS, and SRS airbags are verified 100% code-free.',
            points: [
              { item: 'Zero active or pending Diagnostic Trouble Codes (DTCs)' },
              { item: 'Live air-fuel ratio and oxygen sensor performance sweep' },
              { item: 'Electronic throttle body cleaned and idle baseline recalibrated' },
            ],
          },
          {
            title: 'Hybrid Battery Health Analysis',
            subtitle: 'High-Voltage Cell Balance',
            description: 'Hybrid vehicles undergo computerized battery pack internal resistance and cell block voltage variance testing.',
            points: [
              { item: 'High-voltage traction battery cell voltage delta within 0.02V' },
              { item: 'Cooling blower fan and duct intake de-dusted and sanitized' },
              { item: 'Inverter water pump flow rate and temperature monitored' },
            ],
          },
        ],
      },
    })

    // Page 4: Locations (Showroom & Yards)
    await payload.create({
      collection: 'pages',
      data: {
        title: 'Showroom Locations',
        slug: 'locations',
        badge: 'SHOWROOMS & BONDED YARDS · MOMBASA & NAIROBI',
        heroTitle: 'Visit Our Facilities in Mombasa & Nairobi.',
        heroSubtitle: 'Inspect vehicles in person, test drive on tarmac, view original Japanese auction sheets, and meet our senior technical advisors.',
        ctaText: 'Schedule a Private Viewing',
        ctaLink: '#locations',
        stats: [
          { label: 'MOMBASA YARD', value: 'Tangana Road', description: 'Direct Port entry bonded facility' },
          { label: 'NAIROBI SHOWROOM', value: 'Ngong Road', description: 'Convenient central capital location' },
          { label: 'DAYS OPEN', value: 'Monday – Saturday', description: 'Sunday viewings by appointment' },
        ],
        features: [
          {
            title: 'Mombasa Port Facility & Technical Yard',
            subtitle: 'Coastal Headquarters',
            description: 'Tangana Road, Ganjoni, Port Reitz Area, Mombasa. Direct access to arriving carrier vessels and complete 100-point inspection workshops.',
            points: [
              { item: 'Direct carrier vessel roll-off yard' },
              { item: 'Full hydraulic hoist inspection workshop' },
              { item: 'Contact: +254 180 423 075' },
            ],
          },
          {
            title: 'Nairobi Prime Showroom',
            subtitle: 'Capital Hub',
            description: 'Alberka Plaza, Ngong Road, Nairobi. Indoor climate-controlled executive showroom for test drives and direct delivery handovers.',
            points: [
              { item: 'Convenient central Nairobi access' },
              { item: 'Full showroom collection and financing concierge' },
              { item: 'Contact: +254 180 423 075' },
            ],
          },
        ],
      },
    })

    // Page 6: Inventory (Fleet Showroom)
    await payload.create({
      collection: 'pages',
      data: {
        title: 'Fleet Inventory',
        slug: 'inventory',
        badge: 'DIRECT IMPORTS · DUTY CLEARED & READY',
        heroTitle: 'Curated Fleet of Inspected Japanese Vehicles.',
        heroSubtitle: 'Filter by SUVs, Hybrids, 7-Seater Vans, or Compact fuel-savers. All vehicles include verified Japanese auction sheets and warranty.',
        ctaText: 'Request Custom Auction Import',
        ctaLink: '#about',
        stats: [
          { label: 'AUCTION RATING', value: 'Grade 4.5+ Only', description: 'Pristine condition guaranteed' },
          { label: 'PORT STATUS', value: 'Cleared & Duty Paid', description: 'Immediate logbook transfer' },
          { label: 'DELIVERY', value: 'Nationwide', description: 'Doorstep handover across Kenya' },
        ],
      },
    })

    console.log('✅ Pages successfully seeded into Payload CMS!')
  }

  // 4. Seed Blog Posts
  const existingBlogs = await payload.find({
    collection: 'blog-posts',
    limit: 10,
  })

  if (existingBlogs.totalDocs === 0) {
    console.log('Seeding Blog Posts...')
    await payload.create({
      collection: 'blog-posts',
      data: {
        title: 'The USS Tokyo Grade 4.5 Standard: Decoding Japanese Inspection Sheets',
        slug: 'uss-tokyo-auction-sheet-guide',
        subtitle: 'Why a genuine Grade 4.5 sheet is the most valuable document when importing a Japanese vehicle into Kenya.',
        category: 'Provenance',
        coverImage: 'https://images.pexels.com/photos/16176579/pexels-photo-16176579.jpeg?auto=compress&cs=tinysrgb&w=1600',
        authorName: 'Tariq Al-Mansoor',
        authorRole: 'Head of Japanese Procurement',
        publishedDate: '12 January 2026',
        readTime: '6 min read',
        excerpt: 'Understanding how Japanese auction inspectors grade body panels, interior cleanliness, and mechanical components so you never buy a disguised accident car.',
        content: [
          { paragraph: 'In wholesale auction houses like USS Tokyo, TAA Yokohama, and CAA Chubu, every car is evaluated by neutral, third-party certified automotive inspectors.' },
          { paragraph: 'A genuine Grade 4.5 vehicle represents the golden standard for Kenyan road imports: panels have factory paint depth, interior wear is negligible, and mechanical systems pass rigorous diagnostic scans.' },
        ],
        tags: [{ tag: 'USS Tokyo' }, { tag: 'Auction Sheet' }, { tag: 'Japanese Import' }],
        featured: true,
      },
    })

    await payload.create({
      collection: 'blog-posts',
      data: {
        title: 'High-Voltage in Coastal Heat: Protecting Hybrid Battery Packs in Kenya',
        slug: 'hybrid-battery-coastal-heat-kenya',
        subtitle: 'The engineering reality of operating Toyota Hybrid Synergy Drive and Nissan e-POWER in coastal humidity.',
        category: 'Engineering',
        coverImage: 'https://images.pexels.com/photos/33327689/pexels-photo-33327689.jpeg?auto=compress&cs=tinysrgb&w=1600',
        authorName: 'Eng. Francis Mwangi',
        authorRole: 'Master Diagnostics Technician',
        publishedDate: '28 January 2026',
        readTime: '8 min read',
        excerpt: 'High ambient temperatures and coastal humidity demand specific battery cooling maintenance that standard general garages overlook.',
        content: [
          { paragraph: 'Toyota Hybrid Synergy Drive and Nissan e-POWER systems are remarkably resilient, but coastal climates introduce distinct thermal loads.' },
          { paragraph: 'Routine cleaning of the battery cooling intake fan and inverter coolant flushing ensures optimal cell balance and longevity on Kenyan roads.' },
        ],
        tags: [{ tag: 'Hybrid' }, { tag: 'Battery Maintenance' }, { tag: 'Coastal Kenya' }],
        featured: true,
      },
    })

    await payload.create({
      collection: 'blog-posts',
      data: {
        title: 'The Long-Distance Highway Protocol: Why Port-Cleared Cars Need a Fluid Flush',
        slug: 'mombasa-highway-handover-protocol',
        subtitle: 'Why driving an import straight from Mombasa to Nairobi without fluid preparation causes premature transmission wear.',
        category: 'Ownership',
        coverImage: 'https://images.pexels.com/photos/3571264/pexels-photo-3571264.jpeg?auto=compress&cs=tinysrgb&w=1600',
        authorName: 'Hassan Noor',
        authorRole: 'Senior Port Logistics Director',
        publishedDate: '04 February 2026',
        readTime: '5 min read',
        excerpt: 'Before climbing the steep 500-kilometer gradient from Mombasa sea level to 1,800m elevation in Nairobi, fresh fully synthetic fluids are mandatory.',
        content: [
          { paragraph: 'Carrier ships spend 3 to 4 weeks traversing the Indian Ocean. During transit, engine oil and condensation settle in crankcases.' },
          { paragraph: 'At Alberka, no vehicle leaves our Mombasa port yard without a complete synthetic oil change and cooling system test.' },
        ],
        tags: [{ tag: 'Mombasa Road' }, { tag: 'Pre-Delivery' }, { tag: 'Fluid Flush' }],
      },
    })

    console.log('✅ Blog posts successfully seeded!')
  }

  console.log('🎉 All Alberka Motors CMS collections and globals seeded successfully!')
  process.exit(0)
}

seed().catch((err) => {
  console.error('❌ Seeding failed:', err)
  process.exit(1)
})
