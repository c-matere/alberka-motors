import { buildConfig } from 'payload'
import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { fileURLToPath } from 'url'

import { Users } from './src/collections/Users'
import { Media } from './src/collections/Media'
import { Vehicles } from './src/collections/Vehicles'
import { BlogPosts } from './src/collections/BlogPosts'
import { Pages } from './src/collections/Pages'
import { Leads } from './src/collections/Leads'
import { SiteSettings } from './src/globals/SiteSettings'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: 'users',
    meta: {
      titleSuffix: '- Alberka Motors Operating System',
    },
  },
  collections: [
    Users,
    Vehicles,
    Pages,
    BlogPosts,
    Media,
    Leads,
  ],
  globals: [
    SiteSettings,
  ],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || 'alberka-motors-super-secret-key-2026',
  typescript: {
    autoGenerate: true,
    outputFile: path.resolve(dirname, 'src/payload-types.ts'),
  },
  db: sqliteAdapter({
    client: {
      url: process.env.DATABASE_URI || 'file:./payload.db',
    },
    push: false,
  }),
})
