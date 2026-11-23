/**
 * One-off content repair: align Payload copy with the verified live site.
 * Alberka operates a single Mombasa showroom/yard and does not offer trade-ins.
 */
import { getPayload } from 'payload'
import configPromise from './payload.config'

async function repair() {
  const payload = await getPayload({ config: configPromise })

  console.log('Updating Site Settings...')
  await payload.updateGlobal({
    slug: 'site-settings',
    data: {
      businessName: 'Alberka Enterprises Limited',
      tagline: 'Direct Japanese Imports · Mombasa Showroom & Yard',
      foundedYear: '2000',
      footerNotice: '© 2026 Alberka Enterprises Limited. Direct Japanese Import Specialists. Mombasa, Kenya.',
      phone: '+254 180 423 075',
      whatsappNumber: '254180423075',
      email: 'yard@alberka.co.ke',
      workingHours: 'Monday – Saturday: 8:00 AM – 6:00 PM | Sunday: By Appointment',
      mombasaYardAddress: 'Next to Ganjoni Primary School, Archbishop Makarios Rd, Mombasa, Kenya',
      nairobiShowroomAddress: 'Mombasa Showroom & Yard (Sole Office)',
    },
  })

  console.log('Updating workshop page badge...')
  const workshop = await payload.find({
    collection: 'pages',
    where: { slug: { equals: 'workshop' } },
    limit: 1,
  })
  if (workshop.docs.length > 0) {
    await payload.update({
      collection: 'pages',
      id: workshop.docs[0].id,
      data: { badge: 'PRE-DELIVERY WORKSHOP PROTOCOL · MOMBASA' },
    })
  }

  console.log('Removing obsolete trade-in page...')
  const tradeIn = await payload.find({
    collection: 'pages',
    where: { slug: { equals: 'trade-in' } },
    limit: 1,
  })
  for (const doc of tradeIn.docs) {
    await payload.delete({ collection: 'pages', id: doc.id })
  }

  console.log('Content repair complete.')
}

repair()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error('Content repair failed:', err)
    process.exit(1)
  })
