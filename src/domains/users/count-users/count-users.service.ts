import type { Role } from '../users.types'

export type CountUsersParams = {
  where?: {
    role?: Role
  }
}

export type CountUsersResponse = {
  count: number
}

export const countUsers = (
  count: (params: CountUsersParams) => Promise<CountUsersResponse>,
) => ({
  execute: async (params: CountUsersParams): Promise<CountUsersResponse> => {
    const response = await count(params)

    return response
  },
})
