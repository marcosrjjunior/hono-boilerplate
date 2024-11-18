import { db } from '.'
import { Role } from '../../app/models'

async function main() {
  await db
    .insertInto('users')
    .values([{ name: 'Test', email: 'test@test.com', role: Role.MEMBER }])
    // .onConflict(oc => oc.column('name').doNothing()) // : )
    .execute()

  console.log(`Seeding finished.`)
}

main()
  .then(async () => {})
  .catch(async e => {
    console.error(e)
  })
  .finally(() => process.exit(0))
