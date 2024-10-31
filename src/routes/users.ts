import { Hono } from 'hono'

import CountUsers from '@/app/cases/users/countUsers'
import UserRepository from '@/app/repositories/UserRepository'

const users = new Hono()

users.get('/', c => c.text('List users')) // GET /user

users.post('/count', async c => {
  const countUsers = new CountUsers(new UserRepository())

  const { where } = await c.req.json()

  const response = await countUsers.execute({
    where,
  })

  return c.json(response, 200)
})

users.get('/:id', c => {
  // GET /user
  const id = c.req.param('id')
  return c.text('Get user: ' + id)
})

users.post('/', c => c.text('Create user')) // POST /user

export default users
