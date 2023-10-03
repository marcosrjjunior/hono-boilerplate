// @generated
// This file is automatically generated by Kanel. Do not modify manually.

import type { ColumnType, Selectable, Insertable, Updateable } from 'kysely'

/** Identifier type for public.kysely_migration_lock */
export type KyselyMigrationLockId = string & {
  __brand: 'KyselyMigrationLockId'
}

/** Represents the table public.kysely_migration_lock */
export default interface KyselyMigrationLockTable {
  id: ColumnType<
    KyselyMigrationLockId,
    KyselyMigrationLockId,
    KyselyMigrationLockId | null
  >

  is_locked: ColumnType<number, number | null, number | null>
}

export type KyselyMigrationLock = Selectable<KyselyMigrationLockTable>

export type NewKyselyMigrationLock = Insertable<KyselyMigrationLockTable>

export type KyselyMigrationLockUpdate = Updateable<KyselyMigrationLockTable>
