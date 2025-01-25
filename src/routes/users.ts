import { Hono } from 'hono'
import CountUsers from '../app/cases/users/countUsers'
import UserRepository from '../app/repositories/UserRepository'
import { nativeEnum, object } from 'zod'
import { Role } from '../app/models'

const CountSchemaInput = object({
  where: object({
    role: nativeEnum(Role).optional(),
  }).optional(),
})

const users = new Hono()

users.post('/count', async c => {
  const { where } = CountSchemaInput.parse(await c.req.json())

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

users.post('/', c => c.text('Create user')) // POST /user

export default users
