import type { Role } from '../users.types'

export type CreateUserParams = {
  name: string
  email: string
  role: Role
  mobile_phone_number?: string
}

export type CreateUserResponse = {
  id: string
}

export type CreateUserRepository = {
  create(params: CreateUserParams): Promise<CreateUserResponse>
}

export const createUser = (repository: CreateUserRepository) => ({
  execute: async (
    params: CreateUserParams,
  ): Promise<CreateUserResponse> => {
    const response = await repository.create(params)

    return response
  },
})
