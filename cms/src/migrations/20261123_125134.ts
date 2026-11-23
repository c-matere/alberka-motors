import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

/**
 * Targeted migration: the production database already contains the base schema,
 * so only the two new collections and their relation columns are created here.
 */
export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`team_members_responsibilities\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`item\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`team_members\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`team_members_responsibilities_order_idx\` ON \`team_members_responsibilities\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`team_members_responsibilities_parent_id_idx\` ON \`team_members_responsibilities\` (\`_parent_id\`);`)

  await db.run(sql`CREATE TABLE IF NOT EXISTS \`team_members\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`role\` text NOT NULL,
  	\`eyebrow\` text,
  	\`bio\` text,
  	\`photo_id\` integer,
  	\`icon\` text DEFAULT 'sourcing',
  	\`order\` numeric DEFAULT 0,
  	\`active\` integer DEFAULT true,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`photo_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`team_members_photo_idx\` ON \`team_members\` (\`photo_id\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`team_members_updated_at_idx\` ON \`team_members\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`team_members_created_at_idx\` ON \`team_members\` (\`created_at\`);`)

  await db.run(sql`CREATE TABLE IF NOT EXISTS \`location_photos\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`caption\` text NOT NULL,
  	\`image_id\` integer NOT NULL,
  	\`alt\` text,
  	\`order\` numeric DEFAULT 0,
  	\`active\` integer DEFAULT true,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`location_photos_image_idx\` ON \`location_photos\` (\`image_id\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`location_photos_updated_at_idx\` ON \`location_photos\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`location_photos_created_at_idx\` ON \`location_photos\` (\`created_at\`);`)

  await db.run(sql`ALTER TABLE \`payload_locked_documents_rels\` ADD COLUMN \`team_members_id\` integer REFERENCES \`team_members\`(\`id\`) ON UPDATE no action ON DELETE cascade;`)
  await db.run(sql`ALTER TABLE \`payload_locked_documents_rels\` ADD COLUMN \`location_photos_id\` integer REFERENCES \`location_photos\`(\`id\`) ON UPDATE no action ON DELETE cascade;`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`payload_locked_documents_rels_team_members_id_idx\` ON \`payload_locked_documents_rels\` (\`team_members_id\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`payload_locked_documents_rels_location_photos_id_idx\` ON \`payload_locked_documents_rels\` (\`location_photos_id\`);`)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP TABLE IF EXISTS \`team_members_responsibilities\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`team_members\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`location_photos\`;`)
}
