import { cors } from 'hono/cors'
import { logger } from 'hono/logger'

import users from '../../domains/users/users.routes'
import health from '../health/health.routes'

import { createRouter } from './router'

const app = createRouter()

app.use('*', logger())
app.use(
  '*',
  cors({
    origin: origin => {
      return origin.endsWith('.example.com') ? origin : 'http://example.com'
    },
    allowHeaders: ['Content-Type', 'Authorization'],
    allowMethods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  }),
)

app.route('/', health)
app.route('/', users)

export type AppType = typeof app
export default app
