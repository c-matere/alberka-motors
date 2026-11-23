import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

/** Allows bot-created vehicle documents to be published on the public site. */
export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.run(sql`ALTER TABLE \`vehicles\` ADD COLUMN \`publish_to_site\` integer DEFAULT false;`)
  await db.run(sql`ALTER TABLE \`vehicles\` ADD COLUMN \`listing_source\` text DEFAULT 'manual';`)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.run(sql`ALTER TABLE \`vehicles\` DROP COLUMN \`publish_to_site\`;`)
  await db.run(sql`ALTER TABLE \`vehicles\` DROP COLUMN \`listing_source\`;`)
}
