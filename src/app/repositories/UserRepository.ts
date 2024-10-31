import { db } from '@/lib/db'

import {
  CountUserParams,
  CountUsersResponse,
  IUserRepository,
} from './interfaces/IUserRepository'
import { Role } from '../models'

class UserRepository implements IUserRepository {
  count = async ({ where }: CountUserParams): Promise<CountUsersResponse> => {
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

export default UserRepository
