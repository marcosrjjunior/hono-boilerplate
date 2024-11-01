import { Kysely, sql } from 'kysely'

import { softDelete, withTimestamps } from '../utils'

export async function up(db: Kysely<any>): Promise<void> {
  // await db.schema
  //   .createType('user_role')
  //   .asEnum(['SUPPORT', 'SALES', 'CS'])
  //   .execute()

  await db.schema
    .createTable('users')
    .addColumn('id', 'uuid', col =>
      col.primaryKey().defaultTo(sql`gen_random_uuid()`),
    )
    .addColumn('name', 'text')
    .addColumn('email', 'text', col => col.unique().notNull())
    .addColumn('email_verified', 'timestamp')
    .addColumn('image', 'text')
    .addColumn('mobile_phone_number', 'varchar')
    .addColumn('role', 'varchar', col => col.notNull())
    .$call(withTimestamps)
    .$call(softDelete)
    .execute()
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable('users').ifExists().execute()
  // await db.schema.dropType('user_role').ifExists().execute()
}
