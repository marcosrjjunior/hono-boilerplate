import { Hono } from 'hono'
import { logger } from 'hono/logger'

import users from './users'

export const routes = (app: Hono) => {
  app.use('*', logger())

  // custom middleware example
  // app.get('/', hello(), c => c.json({ 1: 'Hello', 2: 'World' }))

  app.route('/users', users)
}
