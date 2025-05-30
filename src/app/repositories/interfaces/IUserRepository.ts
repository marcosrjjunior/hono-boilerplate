import { Role } from '../../models'

/**
 * @interface UserRepository
 **/
export type CreateUserParams = {
  name: string
  email: string
  role: Role
  mobile_phone_number?: string
}

export type CreateUserResponse = {
  id: string
}

export type CountUsersParams = {
  where?: {
    role?: Role
  }
}

export type CountUsersResponse = {
  count: number
}

export type IUserRepository = {
  create(params: CreateUserParams): Promise<CreateUserResponse>
  count(params: CountUsersParams): Promise<CountUsersResponse>
}
