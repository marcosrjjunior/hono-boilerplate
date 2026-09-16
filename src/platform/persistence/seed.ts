import { db } from './db'
import { Role } from '../../domains/users/users.types'

async function main() {
  await db
    .insertInto('users')
    .values([{ name: 'Test', email: 'test@test.com', role: Role.MEMBER }])
    .execute()

  console.log('Seeding finished.')
}

main()
  .then(async () => {})
  .catch(async e => {
    console.error(e)
  })
  .finally(() => process.exit(0))
