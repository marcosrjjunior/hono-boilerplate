import type { Role } from '../users.types'

export type CountUsersParams = {
  where?: {
    role?: Role
  }
}

export type CountUsersResponse = {
  count: number
}

export interface CountUsersRepository {
  count(params: CountUsersParams): Promise<CountUsersResponse>
}

export const countUsers = (repository: CountUsersRepository) => ({
  execute: async (params: CountUsersParams): Promise<CountUsersResponse> => {
    const response = await repository.count(params)

    return response
  },
})
