import { z } from 'zod/v4'

import { Role } from '../users.types'

export const CountUsersSchema = z.strictObject({
  where: z.object({
    role: z.enum(Role).optional(),
  }),
})

export const CountUsersResponseSchema = z.strictObject({
  count: z.number(),
})
