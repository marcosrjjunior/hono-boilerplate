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

export const createUser = (
  create: (params: CreateUserParams) => Promise<CreateUserResponse>,
) => ({
  execute: async (params: CreateUserParams): Promise<CreateUserResponse> => {
    const response = await create(params)

    return response
  },
})
