import { defineConfig } from 'kysely-ctl'
import { db } from '../src/platform/persistence/db'

export default defineConfig({
  kysely: db,
  migrations: {
    migrationFolder: '../src/platform/persistence/migrations',
  },
  seeds: {
    seedFolder: '../src/platform/persistence/seeds',
  },
})
