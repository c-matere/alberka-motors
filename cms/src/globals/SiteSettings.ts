import type { GlobalConfig } from 'payload'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  access: {
    read: () => true,
  },
  admin: {
    group: 'Settings',
    description: 'Global dealership settings: contact information, phone numbers, WhatsApp, and showroom hours.',
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Brand Identity',
          fields: [
            {
              name: 'businessName',
              type: 'text',
              defaultValue: 'Alberka Motors',
              required: true,
            },
            {
              name: 'tagline',
              type: 'text',
              defaultValue: 'Direct Japanese Imports · Mombasa Port & Nairobi',
            },
            {
              name: 'foundedYear',
              type: 'text',
              defaultValue: '2000',
            },
            {
              name: 'footerNotice',
              type: 'text',
              defaultValue: '© 2026 Alberka Motors. Direct Japanese Import Specialists. Mombasa & Nairobi.',
            },
          ],
        },
        {
          label: 'Contact & Concierge',
          fields: [
            {
              name: 'phone',
              type: 'text',
              defaultValue: '+254 180 423 075',
              required: true,
            },
            {
              name: 'whatsappNumber',
              type: 'text',
              defaultValue: '254180423075',
              admin: {
                description: 'Digits only without + symbol — used for wa.me links',
              },
            },
            {
              name: 'email',
              type: 'email',
              defaultValue: 'yard@alberkamotors.co.ke',
            },
            {
              name: 'workingHours',
              type: 'text',
              defaultValue: 'Monday – Saturday: 8:00 AM – 6:00 PM | Sunday: By Appointment',
            },
          ],
        },
        {
          label: 'Showroom Addresses',
          fields: [
            {
              name: 'mombasaYardAddress',
              type: 'text',
              defaultValue: 'Next to Ganjoni Primary School, Mombasa, Kenya',
            },
            {
              name: 'nairobiShowroomAddress',
              type: 'text',
              defaultValue: 'Next to Ganjoni Primary School, Mombasa, Kenya',
            },
          ],
        },
      ],
    },
  ],
}
