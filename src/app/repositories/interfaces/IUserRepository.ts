import { Role } from '../../models'

/**
 * @interface UserRepository
 **/
export type CountUsersParams = {
  where?: {
    role?: Role
  }
}

export type CountUsersResponse = {
  count: number
}

export type IUserRepository = {
  count(params: CountUsersParams): Promise<CountUsersResponse>
}
