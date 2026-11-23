/**
 * Keeps the Payload vehicle collection aligned with the live, curated catalogue
 * in src/data/vehicles.ts. Run on the VPS with:
 *   cd /home/ec2-user/alberka-motors/cms && ./node_modules/.bin/tsx sync-vehicles.ts
 *
 * This only creates vehicles that are missing from the CMS, keyed on slug. It
 * never overwrites an editor's changes and never deletes records; the frontend
 * ignores CMS slugs that are not in the live catalogue.
 */
import { getPayload } from 'payload'
import configPromise from './payload.config'
import { VEHICLES } from '../src/data/vehicles'

function toPayloadData(vehicle: (typeof VEHICLES)[number]) {
  const v = vehicle
  return {
    slug: v.id,
    name: v.name,
    stockNo: v.stockNo,
    sbtStockId: v.sbtStockId,
    chassisNo: v.chassisNo,
    modelCode: v.modelCode,
    engineCode: v.engineCode,
    moniker: v.moniker,
    tagline: v.tagline || '',
    essenceQuote: v.essenceQuote || '',
    status: v.status,
    priceKes: v.priceKes,
    priceUsd: v.priceUsd,
    freightUsd: v.freightUsd,
    vanningUsd: v.vanningUsd,
    inspectionUsd: v.inspectionUsd,
    insuranceUsd: v.insuranceUsd,
    totalCifUsd: v.totalCifUsd,
    inventoryLocation: v.inventoryLocation || '',
    sbtGrade: v.sbtGrade || '',
    year: v.year,
    registrationMonth: v.registrationMonth,
    manufactureYearMonth: v.manufactureYearMonth,
    mileageKm: v.mileageKm,
    steering: v.steering,
    transmission: v.transmission,
    drivetrain: v.drivetrain,
    fuelType: v.fuelType,
    engine: v.engine,
    category: v.category,
    bodyType: v.bodyType,
    locationYard: v.locationYard,
    exteriorColor: v.exteriorColor,
    colorCode: v.colorCode,
    interiorColor: v.interiorColor,
    doors: v.doors,
    seats: v.seats,
    dimensions: v.dimensions,
    m3: v.m3,
    wheelbase: v.wheelbase,
    groundClearance: v.groundClearance,
    curbWeight: v.curbWeight,
    grossWeight: v.grossWeight,
    maxLoadingCapacity: v.maxLoadingCapacity || '',
    fuelTankCapacity: v.fuelTankCapacity,
    fuelEconomy: v.fuelEconomy,
    auctionGrade: v.auctionGrade,
    interiorGrade: v.interiorGrade,
    auctionHall: v.auctionHall,
    inspectionStatus: v.inspectionStatus,
    optPushStart: Boolean(v.options.pushStart),
    optSmartKey: Boolean(v.options.smartKey),
    optPowerWindows: Boolean(v.options.powerWindows),
    optAirConditioner: Boolean(v.options.airConditioner),
    optPowerSeats: Boolean(v.options.powerSeats),
    optLeatherSeats: Boolean(v.options.leatherSeats),
    optSunroof: Boolean(v.options.sunroof),
    optAlloyWheels: Boolean(v.options.alloyWheels),
    optAbs: Boolean(v.options.abs),
    optAirbags: Boolean(v.options.airbags),
    optBackCamera: Boolean(v.options.backCamera),
    optCamera360: Boolean(v.options.camera360),
    optRadarCruise: Boolean(v.options.radarCruise),
    optLaneAssist: Boolean(v.options.laneAssist),
    optLedLights: Boolean(v.options.ledLights),
    optNavigation: Boolean(v.options.navigation),
    optRoofRails: Boolean(v.options.roofRails),
    optAudioPlayer: Boolean(v.options.audioPlayer),
    optFogLights: Boolean(v.options.fogLights),
    optRearSpoiler: Boolean(v.options.rearSpoiler),
    optWoodSteering: Boolean(v.options.woodSteering),
    optDoubleAc: Boolean(v.options.doubleAc),
    optPowerBackDoor: Boolean(v.options.powerBackDoor),
    heroImage: v.heroImage,
    heroVideo: v.heroVideo || '',
    gallery: (v.gallery || []).map((g) => ({
      title: g.title,
      description: g.description,
      url: g.url,
    })),
  }
}

async function syncVehicles() {
  const payload = await getPayload({ config: configPromise })
  let created = 0
  let kept = 0

  for (const vehicle of VEHICLES) {
    const data = toPayloadData(vehicle)
    const existing = await payload.find({
      collection: 'vehicles',
      where: { slug: { equals: vehicle.id } },
      limit: 1,
    })

    if (existing.docs.length > 0) {
      kept += 1
      console.log(`  kept     ${vehicle.id}`)
    } else {
      await payload.create({ collection: 'vehicles', data })
      created += 1
      console.log(`  created  ${vehicle.id}`)
    }

    // Confirm the record is actually queryable in Payload, not just accepted by
    // the create call. A failed verification aborts the deployment.
    const posted = await payload.find({
      collection: 'vehicles',
      where: { slug: { equals: vehicle.id } },
      limit: 1,
    })
    if (posted.docs.length === 0) {
      throw new Error(`Vehicle ${vehicle.id} was not found in Payload after sync`)
    }
  }

  console.log(
    `Vehicle sync complete: ${created} created, ${kept} already present, ${VEHICLES.length} verified in Payload.`,
  )
}

syncVehicles()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error('Vehicle sync failed:', err)
    process.exit(1)
  })
