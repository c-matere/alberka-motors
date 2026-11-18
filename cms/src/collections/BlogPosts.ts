import type { CollectionConfig } from 'payload'

export const BlogPosts: CollectionConfig = {
  slug: 'blog-posts',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'publishedDate', 'readTime'],
    group: 'Content',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      name: 'subtitle',
      type: 'text',
    },
    {
      name: 'category',
      type: 'select',
      options: [
        { label: 'Provenance', value: 'Provenance' },
        { label: 'Engineering', value: 'Engineering' },
        { label: 'Market Guide', value: 'Market Guide' },
        { label: 'Ownership', value: 'Ownership' },
      ],
      defaultValue: 'Provenance',
    },
    {
      name: 'coverImage',
      type: 'text',
      required: true,
    },
    {
      name: 'authorName',
      type: 'text',
      defaultValue: 'Alberka Technical Advisory',
    },
    {
      name: 'authorRole',
      type: 'text',
      defaultValue: 'Master Inspector & Port Logistics',
    },
    {
      name: 'publishedDate',
      type: 'text',
      required: true,
    },
    {
      name: 'readTime',
      type: 'text',
      defaultValue: '5 min read',
    },
    {
      name: 'excerpt',
      type: 'textarea',
      required: true,
    },
    {
      name: 'content',
      type: 'array',
      fields: [
        {
          name: 'paragraph',
          type: 'textarea',
        },
      ],
    },
    {
      name: 'tags',
      type: 'array',
      fields: [
        {
          name: 'tag',
          type: 'text',
        },
      ],
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
    },
  ],
}
