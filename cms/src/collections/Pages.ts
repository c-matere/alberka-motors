import type { CollectionConfig } from 'payload'

export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'heroTitle', 'updatedAt'],
    listSearchableFields: ['title', 'slug', 'heroTitle'],
    group: 'Content',
    description: 'Manage and modify the live content displayed on all Alberka Motors website pages.',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Page Header',
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'title',
                  type: 'text',
                  required: true,
                  admin: {
                    width: '50%',
                    placeholder: 'e.g. Overview (Home), About, Workshop',
                  },
                },
                {
                  name: 'slug',
                  type: 'text',
                  required: true,
                  unique: true,
                  admin: {
                    width: '50%',
                    placeholder: 'overview, about, workshop, locations, inventory',
                    description: 'Unique URL identifier corresponding to website navigation routes',
                  },
                },
              ],
            },
            {
              name: 'badge',
              type: 'text',
              label: 'Eyebrow Badge / Tagline',
              admin: {
                placeholder: 'e.g. HERITAGE & PROVENANCE · ESTABLISHED 2000',
              },
            },
            {
              name: 'heroTitle',
              type: 'text',
              label: 'Main Page Heading (Hero Title)',
              required: true,
              admin: {
                placeholder: 'e.g. 26 Years in Kenya. 4,000+ Verified Imports.',
              },
            },
            {
              name: 'heroSubtitle',
              type: 'textarea',
              label: 'Hero Subtitle / Lead Paragraph',
              admin: {
                rows: 3,
                placeholder: 'Introductory statement displayed under the main heading',
              },
            },
          ],
        },
        {
          label: 'Metrics & Statistics',
          fields: [
            {
              name: 'stats',
              type: 'array',
              label: 'Key Metric Counters',
              labels: {
                singular: 'Metric',
                plural: 'Metrics',
              },
              fields: [
                {
                  name: 'label',
                  type: 'text',
                  required: true,
                  admin: { placeholder: 'e.g. FOUNDED' },
                },
                {
                  name: 'value',
                  type: 'text',
                  required: true,
                  admin: { placeholder: 'e.g. Year 2000' },
                },
                {
                  name: 'description',
                  type: 'text',
                  admin: { placeholder: 'e.g. 26 years continuous operations' },
                },
              ],
            },
          ],
        },
        {
          label: 'Core Sections & Content',
          fields: [
            {
              name: 'features',
              type: 'array',
              label: 'Core Features / Pillars / Stages',
              labels: {
                singular: 'Feature Item',
                plural: 'Feature Items',
              },
              fields: [
                {
                  name: 'title',
                  type: 'text',
                  required: true,
                  admin: { placeholder: 'Title of stage, service or pillar' },
                },
                {
                  name: 'subtitle',
                  type: 'text',
                  admin: { placeholder: 'Short badge or summary tag' },
                },
                {
                  name: 'description',
                  type: 'textarea',
                  admin: { rows: 3 },
                },
                {
                  name: 'points',
                  type: 'array',
                  label: 'Checklist / Bullet Points',
                  fields: [
                    {
                      name: 'item',
                      type: 'text',
                      required: true,
                    },
                  ],
                },
              ],
            },
            {
              name: 'paragraphs',
              type: 'array',
              label: 'Editorial Narrative Paragraphs',
              fields: [
                {
                  name: 'text',
                  type: 'textarea',
                  required: true,
                },
              ],
            },
          ],
        },
        {
          label: 'Actions & SEO',
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'ctaText',
                  type: 'text',
                  label: 'Call to Action Button Label',
                  admin: {
                    placeholder: 'e.g. Browse Inspected Vehicles',
                    width: '50%',
                  },
                },
                {
                  name: 'ctaLink',
                  type: 'text',
                  label: 'Call to Action Link Target',
                  admin: {
                    placeholder: 'e.g. #inventory, #workshop',
                    width: '50%',
                  },
                },
              ],
            },
            {
              name: 'metaTitle',
              type: 'text',
              label: 'SEO Meta Title',
            },
            {
              name: 'metaDescription',
              type: 'textarea',
              label: 'SEO Meta Description',
              admin: { rows: 2 },
            },
          ],
        },
      ],
    },
  ],
}
