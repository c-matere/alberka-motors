import { Vehicle } from '../data/vehicles';

const PAYLOAD_API_URL = import.meta.env.VITE_PAYLOAD_API_URL || '/api';

export async function fetchVehiclesFromPayload(): Promise<Vehicle[] | null> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2500);

    const res = await fetch(`${PAYLOAD_API_URL}/vehicles?limit=50&depth=1`, {
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    if (!res.ok) {
      return null;
    }

    const data = await res.json();
    if (!data || !Array.isArray(data.docs) || data.docs.length === 0) {
      return null;
    }

    // Map Payload documents to frontend Vehicle format
    return data.docs.map((doc: any): Vehicle => ({
      id: doc.slug || doc.id,
      stockNo: doc.stockNo,
      sbtStockId: doc.sbtStockId || `SBT-${doc.stockNo}`,
      chassisNo: doc.chassisNo || 'N/A',
      modelCode: doc.modelCode || 'N/A',
      engineCode: doc.engineCode || 'N/A',
      name: doc.name,
      moniker: doc.moniker || doc.name,
      essenceQuote: doc.essenceQuote || '',
      kicker: doc.kicker || 'Verified Import',
      tagline: doc.tagline || '',
      priceKes: doc.priceKes,
      priceUsd: doc.priceUsd,
      freightUsd: doc.freightUsd,
      vanningUsd: doc.vanningUsd,
      inspectionUsd: doc.inspectionUsd,
      insuranceUsd: doc.insuranceUsd,
      totalCifUsd: doc.totalCifUsd,
      inventoryLocation: doc.inventoryLocation,
      sbtGrade: doc.sbtGrade,
      year: doc.year,
      registrationMonth: doc.registrationMonth || '01',
      manufactureYearMonth: doc.manufactureYearMonth || `${doc.year} / 01`,
      mileageKm: doc.mileageKm,
      steering: doc.steering || 'RHD',
      transmission: doc.transmission,
      drivetrain: doc.drivetrain,
      engine: doc.engine,
      power: doc.power || 'Factory Standard',
      torque: doc.torque || 'Factory Standard',
      fuelEconomy: doc.fuelEconomy || 'Factory Verified',
      category: doc.category || 'suv',
      bodyType: doc.bodyType || 'SUV',
      fuelType: doc.fuelType || 'Hybrid',
      exteriorColor: doc.exteriorColor || 'Pearl White',
      colorCode: doc.colorCode || '070',
      interiorColor: doc.interiorColor || 'Standard Leather',
      doors: doc.doors || 5,
      seats: doc.seats || 5,
      locationYard: doc.locationYard || 'Mombasa Port',
      dimensions: doc.dimensions || 'Standard',
      m3: doc.m3 || '14.5 m³',
      wheelbase: doc.wheelbase || '2,690 mm',
      groundClearance: doc.groundClearance || '195 mm',
      curbWeight: doc.curbWeight || '1,650 kg',
      grossWeight: doc.grossWeight || '1,950 kg',
      maxLoadingCapacity: doc.maxLoadingCapacity,
      fuelTankCapacity: doc.fuelTankCapacity || '55 L',
      auctionGrade: doc.auctionGrade || '4.5',
      interiorGrade: doc.interiorGrade || 'A',
      exteriorGrade: doc.exteriorGrade || 'A',
      auctionHall: doc.auctionHall || 'USS Tokyo',
      inspectionStatus: doc.inspectionStatus || 'QISJ Certified & JEVIC Inspected',
      options: {
        pushStart: Boolean(doc.optPushStart),
        smartKey: Boolean(doc.optSmartKey),
        powerWindows: Boolean(doc.optPowerWindows),
        airConditioner: Boolean(doc.optAirConditioner),
        powerSeats: Boolean(doc.optPowerSeats),
        leatherSeats: Boolean(doc.optLeatherSeats),
        sunroof: Boolean(doc.optSunroof),
        alloyWheels: Boolean(doc.optAlloyWheels),
        abs: Boolean(doc.optAbs),
        airbags: Boolean(doc.optAirbags),
        backCamera: Boolean(doc.optBackCamera),
        camera360: Boolean(doc.optCamera360),
        radarCruise: Boolean(doc.optRadarCruise),
        laneAssist: Boolean(doc.optLaneAssist),
        ledLights: Boolean(doc.optLedLights),
        navigation: Boolean(doc.optNavigation),
        roofRails: Boolean(doc.optRoofRails),
        audioPlayer: Boolean(doc.optAudioPlayer),
        fogLights: Boolean(doc.optFogLights),
        rearSpoiler: Boolean(doc.optRearSpoiler),
        woodSteering: Boolean(doc.optWoodSteering),
        doubleAc: Boolean(doc.optDoubleAc),
        powerBackDoor: Boolean(doc.optPowerBackDoor),
      },
      status: doc.status || 'Cleared Port',
      heroVideo: doc.heroVideo || '',
      heroImage: doc.heroImage || '/car_hero.png',
      colors: doc.colors || [
        { name: 'Standard Finish', hex: '#ffffff', imageUrl: doc.heroImage || '/car_hero.png' }
      ],
      closerLookPoints: doc.closerLookPoints || [],
      editorialFeatures: doc.editorialFeatures || [],
      chapters: doc.chapters || [],
      gallery: doc.gallery || [],
      specifications: [
        {
          category: 'SBT Vehicle Details',
          items: [
            { label: 'Stock ID', value: doc.stockNo },
            { label: 'SBT Reference', value: doc.sbtStockId || `SBT-${doc.stockNo}` },
            { label: 'Chassis / Frame #', value: doc.chassisNo || 'N/A' },
            { label: 'Model Code', value: doc.modelCode || 'N/A' },
            { label: 'Engine Code', value: doc.engineCode || 'N/A' },
            { label: 'Engine Size', value: doc.engine },
            { label: 'Registration', value: `${doc.year} / ${doc.registrationMonth || '01'}` },
            { label: 'Manufacture Date', value: doc.manufactureYearMonth || `${doc.year} / 01` },
            { label: 'Steering', value: doc.steering || 'RHD' },
            { label: 'Transmission', value: doc.transmission },
            { label: 'Drive', value: doc.drivetrain },
            { label: 'Body Type', value: doc.bodyType },
            { label: 'Body Color', value: `${doc.exteriorColor || ''} (${doc.colorCode || ''})` },
            { label: 'Doors / Seats', value: `${doc.doors || 5} Doors / ${doc.seats || 5} Seats` },
            { label: 'Location / Yard', value: doc.locationYard || 'Mombasa Port' },
          ],
        },
        {
          category: 'SBT Specifications (Dimensions & Volume)',
          items: [
            { label: 'Dimensions (L × W × H)', value: doc.dimensions || 'N/A' },
            { label: 'M3 (Shipping Volume)', value: doc.m3 || 'N/A' },
            { label: 'Wheelbase', value: doc.wheelbase || 'N/A' },
            { label: 'Ground Clearance', value: doc.groundClearance || 'N/A' },
            { label: 'Vehicle Curb Weight', value: doc.curbWeight || 'N/A' },
            { label: 'Gross Vehicle Weight', value: doc.grossWeight || 'N/A' },
            { label: 'Fuel Tank Capacity', value: doc.fuelTankCapacity || 'N/A' },
          ],
        },
        {
          category: 'Auction & Verification',
          items: [
            { label: 'Auction Grade', value: `Grade ${doc.auctionGrade || '4.5'}` },
            { label: 'Interior Grade', value: `Grade ${doc.interiorGrade || 'A'}` },
            { label: 'Auction Hall', value: doc.auctionHall || 'USS Tokyo' },
            { label: 'Inspection', value: doc.inspectionStatus || 'QISJ Certified & JEVIC Inspected' },
          ],
        },
      ],
      workshopProtocol: doc.workshopProtocol || [
        'Verified Japanese Auction Sheet (Original Export Certificate)',
        'Zero Odometer Tampering Guarantee (JEVIC / QISJ Certified)',
        'Full Pre-Delivery Hybrid Health Check & Diagnostics',
        'Mombasa Port Customs Duty Assessment & KRA Clearance Confirmed',
      ],
    }));
  } catch (error) {
    // Graceful fallback to static data if CMS is unreachable
    console.info('Payload CMS offline or unreachable, using verified local SBT vehicle data.');
    return null;
  }
}
