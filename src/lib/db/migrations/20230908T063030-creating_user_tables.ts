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
      col.primaryKey().defaultTo(sql`gen_random_uuid()`),
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
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable('users').ifExists().execute()
  await db.schema.dropType('userRole').ifExists().execute()
}
