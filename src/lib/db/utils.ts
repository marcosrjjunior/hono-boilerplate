import { sql } from 'kysely'

export const withTimestamps = (qb: any) => {
  return qb
    .addColumn('createdAt', 'timestamptz', (col: any) =>
      col.defaultTo(sql`CURRENT_TIMESTAMP`).notNull()
    )
    .addColumn('updatedAt', 'timestamptz', (col: any) =>
      col.defaultTo(sql`CURRENT_TIMESTAMP`).notNull()
    )
}

export const softDelete = qb => {
  return qb.addColumn('deletedAt', 'timestamptz')
}
