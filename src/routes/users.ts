import { Hono } from 'hono'
import CountUsers from '../app/cases/users/countUsers'
import UserRepository from '../app/repositories/UserRepository'
import { z } from 'zod/v4'

import { Role } from '../app/models'
import CreateUser from '../app/cases/users/createUser'

/**
 * The validation schemas here could be moved somehwere else,
 * or just leave with the route.
 * You can find another example using the standard schema here:
 * https://github.com/honojs/middleware/tree/main/packages/standard-validator#usage
 */
const CountUserSchemaInput = z.object({
  where: z
    .object({
      role: z.enum(Role).optional(),
    })
    .optional(),
})

const CreateUserSchemaInput = (role: Role) => {
  // This is just an example of how you can manage requests
  // that require fields depending on the payload
  const phoneRule = z
    .string()
    .refine(value => /^[+]{1}(?:[0-9-()/.]\s?){6,15}[0-9]{1}$/.test(value))

  const AdminUserSchema = z.object({
    mobile_phone_number: phoneRule,
  })

  const schema = z.intersection(
    z.object({
      name: z.string().trim().min(1),
      email: z.string(),
      role: z.enum(Role),
      mobile_phone_number: phoneRule.nullish(),
    }),

    (role === Role.ADMIN && AdminUserSchema) || z.any(),
  )

  return schema
}

const users = new Hono()

users.post('/', async c => {
  const data = await c.req.json()

  const { name, email, role, mobile_phone_number } = CreateUserSchemaInput(
    data.role as Role,
  ).parse(data)

  // example using function
  const createUser = CreateUser(new UserRepository())

  const response = await createUser.execute({
    name,
    email,
    role,
    mobile_phone_number,
  })

  return c.json(response, 200)
})

users.post('/count', async c => {
  const { where } = CountUserSchemaInput.parse(await c.req.json())

  const countUsers = new CountUsers(new UserRepository())

  const response = await countUsers.execute({
    where,
  })

  return c.json(response, 200)
})

users.get('/', c => c.text('List users')) // GET /user

users.get('/:id', c => {
  // GET /user
  const id = c.req.param('id')
  return c.text('Get user: ' + id)
})

export default users
