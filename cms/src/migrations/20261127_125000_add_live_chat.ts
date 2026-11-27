import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.run(sql`
    CREATE TABLE IF NOT EXISTS \`chat_sessions\` (
      \`id\` integer PRIMARY KEY NOT NULL,
      \`session_id\` text NOT NULL,
      \`visitor_name\` text DEFAULT 'Website Visitor',
      \`visitor_phone\` text,
      \`vehicle_name\` text,
      \`vehicle_stock_no\` text,
      \`status\` text DEFAULT 'open',
      \`last_message_at\` text,
      \`last_message_preview\` text,
      \`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
      \`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
    );
  `)
  await db.run(sql`CREATE UNIQUE INDEX IF NOT EXISTS \`chat_sessions_session_id_idx\` ON \`chat_sessions\` (\`session_id\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`chat_sessions_updated_at_idx\` ON \`chat_sessions\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`chat_sessions_created_at_idx\` ON \`chat_sessions\` (\`created_at\`);`)

  await db.run(sql`
    CREATE TABLE IF NOT EXISTS \`chat_messages\` (
      \`id\` integer PRIMARY KEY NOT NULL,
      \`session_id\` text NOT NULL,
      \`sender\` text DEFAULT 'visitor' NOT NULL,
      \`sender_name\` text DEFAULT 'Website Visitor',
      \`visitor_phone\` text,
      \`vehicle_name\` text,
      \`body\` text NOT NULL,
      \`wa_message_id\` text,
      \`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
      \`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
    );
  `)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`chat_messages_session_id_idx\` ON \`chat_messages\` (\`session_id\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`chat_messages_updated_at_idx\` ON \`chat_messages\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`chat_messages_created_at_idx\` ON \`chat_messages\` (\`created_at\`);`)

  await db.run(sql`ALTER TABLE \`payload_locked_documents_rels\` ADD COLUMN \`chat_sessions_id\` integer REFERENCES \`chat_sessions\`(\`id\`) ON UPDATE no action ON DELETE cascade;`)
  await db.run(sql`ALTER TABLE \`payload_locked_documents_rels\` ADD COLUMN \`chat_messages_id\` integer REFERENCES \`chat_messages\`(\`id\`) ON UPDATE no action ON DELETE cascade;`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`payload_locked_documents_rels_chat_sessions_id_idx\` ON \`payload_locked_documents_rels\` (\`chat_sessions_id\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`payload_locked_documents_rels_chat_messages_id_idx\` ON \`payload_locked_documents_rels\` (\`chat_messages_id\`);`)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP TABLE IF EXISTS \`chat_messages\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`chat_sessions\`;`)
}
