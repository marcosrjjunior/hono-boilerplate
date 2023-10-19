import { db } from '../../lib/db'
import UserRole from '../../lib/db/schema/public/UserRole'
import {
  CountUserParams,
  CountUsersResponse,
  IUserRepository,
} from './interfaces/IUserRepository'

class UserRepository implements IUserRepository {
  count = async ({ where }: CountUserParams): Promise<CountUsersResponse> => {
    const { ...condition } = where

    let query = db
      .selectFrom('users')
      .select(eb => eb.fn.count<string>('id').as('count'))

    if (condition.role) {
      query = query.where('role', '=', UserRole[condition.role])
    }

    const response = await query.executeTakeFirstOrThrow()

    return { count: +response.count || 0 }
  }
}

export default UserRepository
