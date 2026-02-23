import { createRoute, z } from '@hono/zod-openapi'

import { createRouter } from '../lib/router'
import { openAPI } from '../lib/openapi/json'
import { Role } from '../app/models'
import CountUsers from '../app/cases/users/countUsers'
import CreateUser from '../app/cases/users/createUser'
import UserRepository from '../app/repositories/UserRepository'

// Schemas
const CountUserSchema = z.strictObject({
  where: z.object({
    role: z.enum(Role).optional(),
  }),
})

const CountUserResponseSchema = z.strictObject({
  count: z.number(),
})

const phoneRule = z
  .string()
  .regex(/^[+]{1}(?:[0-9-()/.]\s?){6,15}[0-9]{1}$/)
  .openapi({
    example: '+1234567890',
  })

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

// Example where we have the "mobile_phone_number" as required when role is ADMIN.
const CreateUserSchema = z.discriminatedUnion('role', [
  AdminUserSchema,
  UserSchema,
])

const CreateUserResponseSchema = z.strictObject({
  id: z.string(),
})

const app = createRouter()

// Routes
app
  .openapi(
    createRoute({
      method: 'post',
      path: '/users',
      request: {
        body: openAPI.jsonRequired(CreateUserSchema, 'Create user request'),
      },
      responses: {
        200: openAPI.json(CreateUserResponseSchema, 'Users count'),
      },
    }),
    async c => {
      const { name, email, role, mobile_phone_number } = c.req.valid('json')

      // example using function
      const createUser = CreateUser(new UserRepository())

      const response = await createUser.execute({
        name,
        email,
        role,
        mobile_phone_number,
      })

      return c.json(response, 200)
    },
  )

  .openapi(
    createRoute({
      method: 'post',
      path: '/users/count',
      request: {
        body: openAPI.jsonRequired(CountUserSchema, 'Users count request'),
      },
      responses: {
        200: openAPI.json(CountUserResponseSchema, 'Users count response'),
      },
    }),
    async c => {
      const data = c.req.valid('json')

      console.log('WHERE', data?.where)

      const countUsers = new CountUsers(new UserRepository())

      const response = await countUsers.execute({
        where: data?.where,
      })

      return c.json(response, 200)
    },
  )

export default app
