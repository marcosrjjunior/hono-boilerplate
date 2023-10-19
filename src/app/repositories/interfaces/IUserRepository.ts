import UserRole from '../../../lib/db/schema/public/UserRole'

/**
 * @interface UserRepository
 **/
export interface CountUserParams {
  where: {
    role?: UserRole
  }
}

export type CountUsersResponse = {
  count: number
}

export interface IUserRepository {
  count(params: CountUserParams): Promise<CountUsersResponse>
}
