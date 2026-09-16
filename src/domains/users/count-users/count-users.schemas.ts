import { z } from '@hono/zod-openapi'

import { Role } from '../users.types'

export const CountUsersSchema = z.strictObject({
  where: z.object({
    role: z.enum(Role).optional(),
  }),
})

export const CountUsersResponseSchema = z.strictObject({
  count: z.number(),
})
