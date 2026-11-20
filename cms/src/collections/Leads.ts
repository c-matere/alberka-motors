import type { CollectionConfig } from 'payload'

export const Leads: CollectionConfig = {
  slug: 'leads',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'phone', 'vehicleName', 'type', 'status', 'createdAt'],
  },
  access: {
    read: () => true,
    create: () => true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'phone',
      type: 'text',
      required: true,
    },
    {
      name: 'email',
      type: 'email',
    },
    {
      name: 'vehicleName',
      type: 'text',
    },
    {
      name: 'vehicleStockNo',
      type: 'text',
    },
    {
      name: 'type',
      type: 'select',
      options: [
        { label: 'Test Drive', value: 'test-drive' },
        { label: 'Price Inquiry', value: 'inquiry' },
        { label: 'Financing Inquiry', value: 'financing' },
        { label: 'Custom Import Order', value: 'custom-import' },
      ],
      defaultValue: 'inquiry',
    },
    {
      name: 'status',
      type: 'select',
      options: [
        { label: 'New', value: 'new' },
        { label: 'Contacted', value: 'contacted' },
        { label: 'Viewing Booked', value: 'booked' },
        { label: 'Closed - Won', value: 'won' },
        { label: 'Closed - Lost', value: 'lost' },
      ],
      defaultValue: 'new',
    },
    {
      name: 'notes',
      type: 'textarea',
    },
  ],
}
