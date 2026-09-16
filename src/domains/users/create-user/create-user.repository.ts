import { db } from '../../../platform/persistence/db'
import type {
  CreateUserParams,
  CreateUserRepository,
} from './create-user.service'

export class KyselyCreateUserRepository implements CreateUserRepository {
  create = async ({
    name,
    email,
    role,
    mobile_phone_number,
  }: CreateUserParams) => {
    return db
      .insertInto('users')
      .values({ name, email, role, mobile_phone_number })
      .returning('id')
      .executeTakeFirstOrThrow()
  }
}
