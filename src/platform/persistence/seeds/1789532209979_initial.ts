import type { Kysely } from 'kysely'
import { Role } from '../../../domains/users/users.types'

export async function seed(db: Kysely<any>): Promise<void> {
  await db
    .insertInto('users')
    .values([{ name: 'Test', email: 'test@test.com', role: Role.ADMIN }])
    .execute()
}
