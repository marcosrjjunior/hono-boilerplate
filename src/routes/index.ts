import { Hono } from 'hono'
import { logger } from 'hono/logger'
import { hello } from './middleware/hello'
import users from './users'

export const routes = (app: Hono) => {
  app.use('*', logger())

  app.route('/users', users)

  app.get('/test', hello(), c => c.json({ 1: 'assadasdda' }))
}
