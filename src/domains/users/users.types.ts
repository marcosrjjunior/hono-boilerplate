export enum Role {
  ADMIN = 'ADMIN',
  GUEST = 'GUEST',
  MEMBER = 'MEMBER',
}

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

export type UserRepository = {
  create(params: CreateUserParams): Promise<CreateUserResponse>
  count(params: CountUsersParams): Promise<CountUsersResponse>
}
