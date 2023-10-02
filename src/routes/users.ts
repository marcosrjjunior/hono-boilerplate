import { Hono } from 'hono'

const users = new Hono()

users.get('/', c => c.text('List users')) // GET /user
users.get('/:id', c => {
  const id = c.req.param('id')
  return c.text('Get user: ' + id)
})

users.post('/', c => c.text('Create user')) // POST /user

export default users
