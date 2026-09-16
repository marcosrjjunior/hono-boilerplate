import { z } from '@hono/zod-openapi'

import { Role } from '../users.types'

const phoneRule = z
  .string()
  .regex(/^[+]{1}(?:[0-9-()/.]\s?){6,15}[0-9]{1}$/)
  .openapi({ example: '+1234567890' })

const BaseUserSchema = z.strictObject({
  name: z.string().trim().min(1).openapi({ example: 'John Doe' }),
  email: z.email().openapi({ example: 'john@email.com' }),
  role: z.enum(Role),
})

const AdminUserSchema = BaseUserSchema.extend({
  role: z.literal(Role.ADMIN),
  mobile_phone_number: phoneRule,
})

const UserSchema = BaseUserSchema.extend({
  role: z.enum([Role.GUEST, Role.MEMBER]),
  mobile_phone_number: phoneRule.optional(),
})

export const CreateUserSchema = z.discriminatedUnion('role', [
  AdminUserSchema,
  UserSchema,
])

export const CreateUserResponseSchema = z.strictObject({
  id: z.string(),
})
