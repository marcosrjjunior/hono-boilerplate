import {
  CreateUserParams,
  CreateUserResponse,
  CountUsersResponse,
  IUserRepository,
  CountUsersParams,
} from './interfaces/IUserRepository'
import { Role } from '../models'
import { db } from '../../lib/db'

class UserRepository implements IUserRepository {
  create = async ({
    name,
    email,
    role,
    mobile_phone_number,
  }: CreateUserParams): Promise<CreateUserResponse> => {
    const response = await db
      .insertInto('users')
      .values({
        name,
        email,
        role,
        mobile_phone_number,
      })
      .returning('id')
      .executeTakeFirstOrThrow()

    return response
  }

  count = async ({ where }: CountUsersParams): Promise<CountUsersResponse> => {
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
