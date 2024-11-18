import { Role } from '../../models'

/**
 * @interface UserRepository
 **/
export type CountUserParams = {
  where: {
    role?: Role
  }
}

export type CountUsersResponse = {
  count: number
}

export type IUserRepository = {
  count(params: CountUserParams): Promise<CountUsersResponse>
}
