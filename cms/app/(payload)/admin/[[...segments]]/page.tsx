import configPromise from '@payload-config'
import { RootPage } from '@payloadcms/next/views'

export default async function AdminPage({
  params,
  searchParams,
}: {
  params: Promise<{ segments?: string[] }>
  searchParams: Promise<Record<string, string | string[] | undefined>>
}) {
  return RootPage({ config: configPromise, params, searchParams })
}
