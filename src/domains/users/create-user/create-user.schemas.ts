import { z } from 'zod/v4'

import { Role } from '../users.types'

const phoneRule = z
  .string()
  .regex(/^[+]{1}(?:[0-9-()/.]\s?){6,15}[0-9]{1}$/)
  .meta({ example: '+1234567890' })

const BaseUserSchema = z.strictObject({
  name: z.string().trim().min(1).meta({ example: 'John Doe' }),
  email: z.email().meta({ example: 'john@email.com' }),
  role: z.enum(Role),
})

const AdminUserSchema = BaseUserSchema.extend({
  role: z.literal(Role.ADMIN),
  mobile_phone_number: phoneRule,
}).meta({ title: 'ADMIN' })

const UserSchema = BaseUserSchema.extend({
  role: z.enum([Role.GUEST, Role.MEMBER]),
  mobile_phone_number: phoneRule.optional(),
}).meta({ title: 'GUEST or MEMBER' })

export const CreateUserSchema = z.discriminatedUnion('role', [
  AdminUserSchema,
  UserSchema,
])

export const CreateUserResponseSchema = z.strictObject({
  id: z.string(),
})
