import { sql } from 'kysely'
import { db } from '.'

async function main() {
  await sql`
    DROP SCHEMA public CASCADE;
    CREATE SCHEMA public;
  `.execute(db)

  console.log(`Reset finished.`)
}

main()
  .then(async () => {})
  .catch(async e => {
    console.error(e)
  })
  .finally(() => process.exit(0))
