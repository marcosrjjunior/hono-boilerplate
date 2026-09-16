import { db } from '../../../platform/persistence/db'
import { Role } from '../users.types'
import type { CountUsersParams } from './count-users.service'

export class KyselyCountUsersRepository {
  count = async ({ where }: CountUsersParams) => {
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
