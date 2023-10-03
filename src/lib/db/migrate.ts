import { promises as fs } from 'fs'
import { Migrator, FileMigrationProvider } from 'kysely'
import { run } from 'kysely-migration-cli'
import path from 'path'

import { db } from '.'

const migrator = new Migrator({
  db,
  provider: new FileMigrationProvider({
    fs,
    path,
    migrationFolder: path.join(__dirname, './migrations'),
  }),
})

run(db, migrator, './src/lib/db/migrations')
