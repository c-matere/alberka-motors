import type { CollectionConfig } from 'payload'

export const TeamMembers: CollectionConfig = {
  slug: 'team-members',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'role', 'order', 'active'],
    defaultSort: 'order',
    group: 'Content',
    description: 'People and desks shown on the About page. Portraits upload into Media.',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      admin: { description: 'Full name, or the desk name if no individual is assigned yet.' },
    },
    {
      name: 'role',
      type: 'text',
      required: true,
      label: 'Desk / role title',
    },
    {
      name: 'eyebrow',
      type: 'text',
      label: 'Small caption above the title',
      admin: { placeholder: 'TOKYO · YOKOHAMA · NAGOYA' },
    },
    {
      name: 'bio',
      type: 'textarea',
      label: 'Short description',
    },
    {
      name: 'photo',
      type: 'upload',
      relationTo: 'media',
      label: 'Portrait image',
    },
    {
      name: 'responsibilities',
      type: 'array',
      label: 'What this desk handles',
      fields: [
        { name: 'item', type: 'text', required: true },
      ],
    },
    {
      name: 'icon',
      type: 'select',
      defaultValue: 'sourcing',
      options: [
        { label: 'Sourcing (ship)', value: 'sourcing' },
        { label: 'Inspection (clipboard)', value: 'inspection' },
        { label: 'Workshop (wrench)', value: 'workshop' },
        { label: 'Handover (chat)', value: 'handover' },
      ],
    },
    {
      name: 'order',
      type: 'number',
      defaultValue: 0,
      admin: { description: 'Lower numbers appear first.' },
    },
    {
      name: 'active',
      type: 'checkbox',
      defaultValue: true,
    },
  ],
}
