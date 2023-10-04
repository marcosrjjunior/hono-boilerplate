import { Kysely, sql } from 'kysely'

import { softDelete, withTimestamps } from '../utils'

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .createType('userRole')
    .asEnum(['SUPPORT', 'SALES', 'CS'])
    .execute()

  await db.schema
    .createTable('users')
    .addColumn('id', 'uuid', col =>
      col.primaryKey().defaultTo(sql`gen_random_uuid()`)
    )
    .addColumn('name', 'text')
    .addColumn('email', 'text', col => col.unique().notNull())
    .addColumn('emailVerified', 'timestamptz')
    .addColumn('image', 'text')
    .addColumn('mobilePhoneNumber', 'varchar')
    .addColumn('role', sql`"userRole"`, col => col.notNull())
    .$call(withTimestamps)
    .$call(softDelete)
    .execute()

  await db.schema
    .createTable('accounts')
    .addColumn('id', 'uuid', col =>
      col.primaryKey().defaultTo(sql`gen_random_uuid()`)
    )
    .addColumn('userId', 'uuid', col =>
      col.references('users.id').onDelete('cascade').notNull()
    )
    .addColumn('type', 'text', col => col.notNull())
    .addColumn('provider', 'text', col => col.notNull())
    .addColumn('providerAccountId', 'text', col => col.notNull())
    .addColumn('refresh_token', 'text')
    .addColumn('access_token', 'text')
    .addColumn('expires_at', 'bigint')
    .addColumn('token_type', 'text')
    .addColumn('scope', 'text')
    .addColumn('id_token', 'text')
    .addColumn('session_state', 'text')
    .execute()

  await db.schema
    .createTable('sessions')
    .addColumn('id', 'uuid', col =>
      col.primaryKey().defaultTo(sql`gen_random_uuid()`)
    )
    .addColumn('userId', 'uuid', col =>
      col.references('users.id').onDelete('cascade').notNull()
    )
    .addColumn('sessionToken', 'text', col => col.notNull().unique())
    .addColumn('expires', 'timestamptz', col => col.notNull())
    .execute()

  await db.schema
    .createTable('verificationTokens')
    .addColumn('identifier', 'text', col => col.notNull())
    .addColumn('token', 'text', col => col.notNull().unique())
    .addColumn('expires', 'timestamptz', col => col.notNull())
    .execute()

  await db.schema
    .createIndex('accounts_userId_index')
    .on('accounts')
    .column('userId')
    .execute()

  await db.schema
    .createIndex('sessions_userId_index')
    .on('sessions')
    .column('userId')
    .execute()
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable('accounts').ifExists().execute()
  await db.schema.dropTable('sessions').ifExists().execute()
  await db.schema.dropTable('users').ifExists().execute()
  await db.schema.dropType('userRole').ifExists().execute()
  await db.schema.dropTable('verificationTokens').ifExists().execute()
}
