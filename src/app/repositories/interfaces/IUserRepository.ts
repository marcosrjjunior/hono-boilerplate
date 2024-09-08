import UserRole from '../../../lib/db/schema/public/UserRole'

/**
 * @interface UserRepository
 **/
export type CountUserParams = {
  where: {
    role?: UserRole
  }
}

export type CountUsersResponse = {
  count: number
}

export type IUserRepository = {
  count(params: CountUserParams): Promise<CountUsersResponse>
}
