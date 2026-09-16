import { db } from '../../platform/persistence/db'
import { Role, type UserRepository } from './users.types'

export class KyselyUserRepository implements UserRepository {
  create = async ({
    name,
    email,
    role,
    mobile_phone_number,
  }: Parameters<UserRepository['create']>[0]) => {
    return db
      .insertInto('users')
      .values({ name, email, role, mobile_phone_number })
      .returning('id')
      .executeTakeFirstOrThrow()
  }

  count = async ({ where }: Parameters<UserRepository['count']>[0]) => {
    let query = db
      .selectFrom('users')
      .select(eb => eb.fn.count<string>('id').as('count'))

    if (where?.role) {
      query = query.where('role', '=', Role[where.role])
    }

    const response = await query.executeTakeFirstOrThrow()

    return { count: +response.count || 0 }
  }
}

export class MockUserRepository implements UserRepository {
  count = async () => ({ count: 10 })

  create = async () => ({
    id: 'ce3c8cad-ae9d-4f46-b2c2-1440bdac16b7',
  })
}
