import { VEHICLES, Vehicle } from '../data/vehicles';

const PAYLOAD_API_URL = import.meta.env.VITE_PAYLOAD_API_URL || '/api';

const CMS_VEHICLES_QUERY = '/vehicles?limit=100&depth=1';

function mapPayloadVehicle(doc: any): Vehicle {
  return {
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
    colors: doc.colors || [],
    closerLookPoints: doc.closerLookPoints || [],
    editorialFeatures: doc.editorialFeatures || [],
    chapters: doc.chapters || [],
    gallery: doc.gallery || [],
    specifications: doc.specifications || [],
    workshopProtocol: doc.workshopProtocol || [],
  };
}

function hasValue(value: unknown): boolean {
  if (value === undefined || value === null || value === '') return false;
  if (Array.isArray(value)) return value.length > 0;
  return true;
}

/**
 * The CMS owns operational fields (price, status, mileage, grades) while the
 * curated local catalogue owns the long-form story content. Restore the local
 * editorial layer wherever the CMS document has no real value for it, so a
 * CMS connection can never render a half-empty vehicle page.
 */
function mergeWithLocal(mapped: Vehicle, local: Vehicle, doc: any): Vehicle {
  const result: Vehicle = { ...mapped };
  const keepLocal = <K extends keyof Vehicle>(key: K, cmsHasValue: boolean) => {
    if (!cmsHasValue) (result as any)[key] = local[key];
  };

  keepLocal('essenceQuote', hasValue(doc.essenceQuote));
  keepLocal('kicker', hasValue(doc.kicker));
  keepLocal('tagline', hasValue(doc.tagline));
  keepLocal('originalPriceKes', hasValue(doc.originalPriceKes));
  keepLocal('discountPercent', hasValue(doc.discountPercent));
  keepLocal('hubId', hasValue(doc.hubId));
  keepLocal('power', hasValue(doc.power));
  keepLocal('torque', hasValue(doc.torque));
  keepLocal('fuelEconomy', hasValue(doc.fuelEconomy));
  keepLocal('inspectionStatus', hasValue(doc.inspectionStatus));
  keepLocal('exteriorGrade', hasValue(doc.exteriorGrade));
  keepLocal('maxLoadingCapacity', hasValue(doc.maxLoadingCapacity));
  keepLocal('heroImage', hasValue(doc.heroImage));
  keepLocal('heroVideo', hasValue(doc.heroVideo));
  keepLocal('colors', hasValue(doc.colors));
  keepLocal('closerLookPoints', hasValue(doc.closerLookPoints));
  keepLocal('editorialFeatures', hasValue(doc.editorialFeatures));
  keepLocal('chapters', hasValue(doc.chapters));
  keepLocal('gallery', hasValue(doc.gallery));
  keepLocal('specifications', hasValue(doc.specifications));
  keepLocal('workshopProtocol', hasValue(doc.workshopProtocol));
  keepLocal('equipmentChecklist', hasValue(doc.equipmentChecklist));
  keepLocal('equipmentRemarks', hasValue(doc.equipmentRemarks));

  const hasCmsOption = Object.keys(doc || {}).some(
    (key) => key.startsWith('opt') && typeof doc[key] === 'boolean',
  );
  if (!hasCmsOption) result.options = local.options;

  return result;
}

/**
 * Returns the full curated catalogue with CMS values layered on top, or null
 * when the CMS cannot be reached (the caller then uses the static catalogue).
 */
export async function fetchVehiclesFromPayload(): Promise<Vehicle[] | null> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2500);

    const res = await fetch(`${PAYLOAD_API_URL}${CMS_VEHICLES_QUERY}`, {
      signal: controller.signal,
      headers: { Accept: 'application/json' },
    });
    clearTimeout(timeoutId);

    if (!res.ok) return null;

    const contentType = res.headers.get('content-type') || '';
    if (!contentType.toLowerCase().includes('application/json')) return null;

    const data = await res.json();
    if (!data || !Array.isArray(data.docs) || data.docs.length === 0) return null;

    const docsBySlug = new Map<string, any>();
    data.docs.forEach((doc: any) => {
      const slug = doc.slug || doc.id;
      if (slug) docsBySlug.set(String(slug), doc);
    });

    const vehicles = VEHICLES.map((local) => {
      const doc = docsBySlug.get(local.id);
      if (!doc) return local;
      docsBySlug.delete(local.id);
      return mergeWithLocal(mapPayloadVehicle(doc), local, doc);
    });

    // CMS-only records are ignored: the live catalogue is curated, and stale
    // test records in the CMS must never replace it on the public site.
    if (docsBySlug.size > 0) {
      console.info(
        `Payload CMS has ${docsBySlug.size} vehicle(s) not in the live catalogue; ignoring.`,
      );
    }

    return vehicles;
  } catch (error) {
    console.info('Payload CMS offline or unreachable, using verified local SBT vehicle data.');
    return null;
  }
}
