import type { CollectionConfig } from 'payload'

export const LocationPhotos: CollectionConfig = {
  slug: 'location-photos',
  admin: {
    useAsTitle: 'caption',
    defaultColumns: ['caption', 'order', 'active'],
    defaultSort: 'order',
    group: 'Content',
    description: 'Photos of the Mombasa office and yard shown under the showroom map.',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'caption',
      type: 'text',
      required: true,
      admin: { description: 'e.g. Main showroom entrance' },
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: 'Photo',
    },
    {
      name: 'alt',
      type: 'text',
      label: 'Alt text',
      admin: { description: 'Optional accessibility description.' },
    },
    {
      name: 'order',
      type: 'number',
      defaultValue: 0,
    },
    {
      name: 'active',
      type: 'checkbox',
      defaultValue: true,
    },
  ],
}
