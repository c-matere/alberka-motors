import type { CollectionConfig } from 'payload'

export const Vehicles: CollectionConfig = {
  slug: 'vehicles',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'stockNo', 'chassisNo', 'year', 'priceKes', 'status', 'auctionGrade'],
    listSearchableFields: ['name', 'stockNo', 'chassisNo', 'modelCode', 'engineCode'],
    defaultSort: '-createdAt',
    group: 'Inventory',
    description: 'Vehicle inventory with complete SBT Japan Car Exporter specifications.',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Core Identifiers',
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'name',
                  type: 'text',
                  required: true,
                  admin: {
                    placeholder: 'e.g. Toyota RAV4 Adventure AWD',
                    width: '50%',
                  },
                },
                {
                  name: 'stockNo',
                  type: 'text',
                  required: true,
                  unique: true,
                  admin: {
                    placeholder: 'e.g. ALB-4062',
                    width: '25%',
                  },
                },
                {
                  name: 'sbtStockId',
                  type: 'text',
                  label: 'SBT Stock ID / Reference',
                  admin: {
                    placeholder: 'e.g. SBT-TY-RAV4-4062',
                    width: '25%',
                  },
                },
              ],
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'slug',
                  type: 'text',
                  required: true,
                  unique: true,
                  admin: {
                    placeholder: 'toyota-rav4-adventure',
                    width: '50%',
                  },
                },
                {
                  name: 'status',
                  type: 'select',
                  options: [
                    { label: 'In Stock', value: 'In Stock' },
                    { label: 'Cleared Port', value: 'Cleared Port' },
                    { label: 'In Transit', value: 'In Transit' },
                    { label: 'Sold', value: 'Sold' },
                  ],
                  defaultValue: 'Cleared Port',
                  admin: {
                    width: '25%',
                  },
                },
                {
                  name: 'priceKes',
                  type: 'number',
                  required: true,
                  label: 'Delivered Price (KES)',
                  admin: {
                    placeholder: '4450000',
                    width: '25%',
                  },
                },
              ],
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'moniker',
                  type: 'text',
                  label: 'Luxury Moniker / Title',
                  admin: {
                    placeholder: 'e.g. Rugged All-Weather SUV',
                    width: '50%',
                  },
                },
                {
                  name: 'tagline',
                  type: 'text',
                  admin: {
                    placeholder: 'Short marketing headline',
                    width: '50%',
                  },
                },
              ],
            },
            {
              name: 'essenceQuote',
              type: 'textarea',
              label: 'Editorial Quote / Narrative',
              admin: {
                rows: 2,
              },
            },
          ],
        },
        {
          label: 'SBT Vehicle Details',
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'chassisNo',
                  type: 'text',
                  required: true,
                  label: 'Chassis / Frame No',
                  admin: {
                    placeholder: 'e.g. 6AA-AXAH54-0018294',
                    width: '33%',
                  },
                },
                {
                  name: 'modelCode',
                  type: 'text',
                  required: true,
                  label: 'Model Code',
                  admin: {
                    placeholder: 'e.g. 6AA-AXAH54',
                    width: '33%',
                  },
                },
                {
                  name: 'engineCode',
                  type: 'text',
                  label: 'Engine Code',
                  admin: {
                    placeholder: 'e.g. A25A-FXS',
                    width: '34%',
                  },
                },
              ],
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'year',
                  type: 'number',
                  required: true,
                  label: 'Registration Year',
                  admin: {
                    placeholder: '2020',
                    width: '25%',
                  },
                },
                {
                  name: 'registrationMonth',
                  type: 'text',
                  label: 'Registration Month',
                  admin: {
                    placeholder: '08',
                    width: '25%',
                  },
                },
                {
                  name: 'manufactureYearMonth',
                  type: 'text',
                  label: 'Manufacture (Year/Month)',
                  admin: {
                    placeholder: '2020 / 06',
                    width: '25%',
                  },
                },
                {
                  name: 'mileageKm',
                  type: 'number',
                  required: true,
                  label: 'Mileage (KM)',
                  admin: {
                    placeholder: '48200',
                    width: '25%',
                  },
                },
              ],
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'steering',
                  type: 'select',
                  options: [
                    { label: 'Right Hand Drive (RHD)', value: 'RHD' },
                    { label: 'Left Hand Drive (LHD)', value: 'LHD' },
                  ],
                  defaultValue: 'RHD',
                  required: true,
                  admin: {
                    width: '25%',
                  },
                },
                {
                  name: 'transmission',
                  type: 'text',
                  required: true,
                  admin: {
                    placeholder: 'e.g. E-CVT / Automatic',
                    width: '25%',
                  },
                },
                {
                  name: 'drivetrain',
                  type: 'text',
                  required: true,
                  admin: {
                    placeholder: 'e.g. 4WD / E-Four AWD',
                    width: '25%',
                  },
                },
                {
                  name: 'fuelType',
                  type: 'text',
                  required: true,
                  admin: {
                    placeholder: 'e.g. Hybrid / Petrol',
                    width: '25%',
                  },
                },
              ],
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'engine',
                  type: 'text',
                  label: 'Displacement / Engine Size',
                  required: true,
                  admin: {
                    placeholder: 'e.g. 2,487 cc / 2.5L',
                    width: '25%',
                  },
                },
                {
                  name: 'category',
                  type: 'select',
                  options: [
                    { label: 'SUV', value: 'suv' },
                    { label: 'Hybrid', value: 'hybrid' },
                    { label: 'Van / 7-Seater', value: 'van' },
                    { label: 'Compact / Hatchback', value: 'compact' },
                    { label: 'Executive / Sedan', value: 'executive' },
                  ],
                  required: true,
                  admin: {
                    width: '25%',
                  },
                },
                {
                  name: 'bodyType',
                  type: 'text',
                  required: true,
                  label: 'Body Type',
                  admin: {
                    placeholder: 'SUV / Sedan / Van',
                    width: '25%',
                  },
                },
                {
                  name: 'locationYard',
                  type: 'text',
                  label: 'Location / Port Yard',
                  defaultValue: 'Mombasa Port (Ready for Delivery)',
                  admin: {
                    width: '25%',
                  },
                },
              ],
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'exteriorColor',
                  type: 'text',
                  label: 'Body Color',
                  admin: {
                    placeholder: 'e.g. Urban Khaki / Ash Gray',
                    width: '33%',
                  },
                },
                {
                  name: 'colorCode',
                  type: 'text',
                  label: 'Color Code',
                  admin: {
                    placeholder: 'e.g. 2TX',
                    width: '33%',
                  },
                },
                {
                  name: 'interiorColor',
                  type: 'text',
                  label: 'Interior Color / Trim',
                  admin: {
                    placeholder: 'e.g. Black SofTex Leather',
                    width: '34%',
                  },
                },
              ],
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'doors',
                  type: 'number',
                  defaultValue: 5,
                  admin: {
                    width: '50%',
                  },
                },
                {
                  name: 'seats',
                  type: 'number',
                  defaultValue: 5,
                  admin: {
                    width: '50%',
                  },
                },
              ],
            },
          ],
        },
        {
          label: 'SBT Physical Specifications (Dimensions & Volume)',
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'dimensions',
                  type: 'text',
                  label: 'Dimensions (L × W × H)',
                  admin: {
                    placeholder: '4.61m × 1.86m × 1.69m (4,610 × 1,865 × 1,690 mm)',
                    width: '50%',
                  },
                },
                {
                  name: 'm3',
                  type: 'text',
                  label: 'M3 (Cubic Meters Shipping Volume)',
                  admin: {
                    placeholder: 'e.g. 14.53 m³',
                    width: '50%',
                    description: 'Crucial SBT shipping calculation volume',
                  },
                },
              ],
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'wheelbase',
                  type: 'text',
                  admin: {
                    placeholder: '2,690 mm',
                    width: '25%',
                  },
                },
                {
                  name: 'groundClearance',
                  type: 'text',
                  admin: {
                    placeholder: '200 mm',
                    width: '25%',
                  },
                },
                {
                  name: 'curbWeight',
                  type: 'text',
                  label: 'Vehicle Curb Weight',
                  admin: {
                    placeholder: '1,670 kg',
                    width: '25%',
                  },
                },
                {
                  name: 'grossWeight',
                  type: 'text',
                  label: 'Gross Vehicle Weight',
                  admin: {
                    placeholder: '1,995 kg',
                    width: '25%',
                  },
                },
              ],
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'maxLoadingCapacity',
                  type: 'text',
                  admin: {
                    placeholder: '450 kg',
                    width: '33%',
                  },
                },
                {
                  name: 'fuelTankCapacity',
                  type: 'text',
                  admin: {
                    placeholder: '55 L',
                    width: '33%',
                  },
                },
                {
                  name: 'fuelEconomy',
                  type: 'text',
                  admin: {
                    placeholder: '21.4 km/L (WLTC Japanese Cycle)',
                    width: '34%',
                  },
                },
              ],
            },
          ],
        },
        {
          label: 'SBT Auction & Inspection',
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'auctionGrade',
                  type: 'text',
                  label: 'Auction Grade',
                  admin: {
                    placeholder: '4.5',
                    width: '25%',
                  },
                },
                {
                  name: 'interiorGrade',
                  type: 'text',
                  label: 'Interior Grade',
                  admin: {
                    placeholder: 'A',
                    width: '25%',
                  },
                },
                {
                  name: 'auctionHall',
                  type: 'text',
                  label: 'Auction Hall',
                  admin: {
                    placeholder: 'USS Tokyo',
                    width: '25%',
                  },
                },
                {
                  name: 'inspectionStatus',
                  type: 'text',
                  label: 'Inspection Certification',
                  defaultValue: 'QISJ Certified & JEVIC Inspected',
                  admin: {
                    width: '25%',
                  },
                },
              ],
            },
          ],
        },
        {
          label: 'SBT Equipment & Options',
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'optPushStart',
                  type: 'checkbox',
                  label: 'Push Start Button',
                  defaultValue: true,
                  admin: { width: '25%' },
                },
                {
                  name: 'optSmartKey',
                  type: 'checkbox',
                  label: 'Smart Keyless Entry',
                  defaultValue: true,
                  admin: { width: '25%' },
                },
                {
                  name: 'optPowerWindows',
                  type: 'checkbox',
                  label: 'Power Windows',
                  defaultValue: true,
                  admin: { width: '25%' },
                },
                {
                  name: 'optAirConditioner',
                  type: 'checkbox',
                  label: 'Dual Climate AC',
                  defaultValue: true,
                  admin: { width: '25%' },
                },
              ],
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'optPowerSeats',
                  type: 'checkbox',
                  label: 'Power Adjustable Seats',
                  defaultValue: true,
                  admin: { width: '25%' },
                },
                {
                  name: 'optLeatherSeats',
                  type: 'checkbox',
                  label: 'Leather / SofTex Upholstery',
                  defaultValue: true,
                  admin: { width: '25%' },
                },
                {
                  name: 'optSunroof',
                  type: 'checkbox',
                  label: 'Sunroof / Moonroof',
                  defaultValue: false,
                  admin: { width: '25%' },
                },
                {
                  name: 'optAlloyWheels',
                  type: 'checkbox',
                  label: 'Original Alloy Wheels',
                  defaultValue: true,
                  admin: { width: '25%' },
                },
              ],
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'optAbs',
                  type: 'checkbox',
                  label: 'ABS Braking System',
                  defaultValue: true,
                  admin: { width: '25%' },
                },
                {
                  name: 'optAirbags',
                  type: 'checkbox',
                  label: 'Dual & Curtain Airbags',
                  defaultValue: true,
                  admin: { width: '25%' },
                },
                {
                  name: 'optBackCamera',
                  type: 'checkbox',
                  label: 'Backup / Rear Camera',
                  defaultValue: true,
                  admin: { width: '25%' },
                },
                {
                  name: 'optCamera360',
                  type: 'checkbox',
                  label: 'Around View 360° Camera',
                  defaultValue: false,
                  admin: { width: '25%' },
                },
              ],
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'optRadarCruise',
                  type: 'checkbox',
                  label: 'Adaptive Radar Cruise',
                  defaultValue: true,
                  admin: { width: '25%' },
                },
                {
                  name: 'optLaneAssist',
                  type: 'checkbox',
                  label: 'Lane Keep / Departure Assist',
                  defaultValue: true,
                  admin: { width: '25%' },
                },
                {
                  name: 'optLedLights',
                  type: 'checkbox',
                  label: 'LED Headlamps & Fog Lights',
                  defaultValue: true,
                  admin: { width: '25%' },
                },
                {
                  name: 'optNavigation',
                  type: 'checkbox',
                  label: 'Display Audio & Navigation',
                  defaultValue: true,
                  admin: { width: '25%' },
                },
              ],
            },
          ],
        },
        {
          label: 'Media & Gallery',
          fields: [
            {
              name: 'heroImage',
              type: 'text',
              required: true,
              label: 'Hero Image URL',
            },
            {
              name: 'heroVideo',
              type: 'text',
              label: 'Hero Video URL (MP4)',
            },
            {
              name: 'gallery',
              type: 'array',
              label: 'Gallery Photos',
              fields: [
                {
                  name: 'title',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'description',
                  type: 'text',
                },
                {
                  name: 'url',
                  type: 'text',
                  required: true,
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}
