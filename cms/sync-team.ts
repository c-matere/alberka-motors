/**
 * Seeds the Payload "Team Members" collection with the four curated desks from
 * src/data/team.ts so the admin UI is populated on first run. It is create-only
 * and keyed on role, so editor changes and portraits are never overwritten.
 *
 *   cd /home/ec2-user/alberka-motors/cms && ./node_modules/.bin/tsx sync-team.ts
 */
import { getPayload } from 'payload'
import configPromise from './payload.config'
import { TEAM_DESKS } from '../src/data/team'

async function syncTeam() {
  const payload = await getPayload({ config: configPromise })
  let created = 0
  let kept = 0

  for (const [index, desk] of TEAM_DESKS.entries()) {
    const existing = await payload.find({
      collection: 'team-members',
      where: { role: { equals: desk.title } },
      limit: 1,
    })

    if (existing.docs.length > 0) {
      kept += 1
      console.log(`  kept     ${desk.title}`)
      continue
    }

    await payload.create({
      collection: 'team-members',
      data: {
        name: desk.title,
        role: desk.title,
        eyebrow: desk.eyebrow,
        bio: desk.description,
        icon: desk.icon,
        order: index,
        active: true,
        responsibilities: desk.responsibilities.map((item) => ({ item })),
      },
    })
    created += 1
    console.log(`  created  ${desk.title}`)
  }

  console.log(`Team sync complete: ${created} created, ${kept} already present.`)
}

syncTeam()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error('Team sync failed:', err)
    process.exit(1)
  })
