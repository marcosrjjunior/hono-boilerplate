import { logger } from 'hono/logger'
import { cors } from 'hono/cors'

import health from './health'
import users from './users'

import { createRouter } from '../lib/router'

const app = createRouter()

app.use('*', logger())

app.use(
  '*',
  cors({
    // origin: ['https://example.com', 'https://example.org'],
    origin: (origin) => {
      return origin.endsWith('.example.com') ? origin : 'http://example.com'
    },
    allowHeaders: ['Content-Type', 'Authorization'],
    allowMethods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    // credentials: true
  }),
)

// custom middleware example
// app.get('/', hello(), c => c.json({ 1: 'Hello', 2: 'World' }))

const routes = [health, users]

routes.forEach(route => {
  app.route('/', route)
})

export type AppType = (typeof routes)[number]
// import { hc } from 'hono/client'
// const client = hc<AppType>('')
// client.users.count.$post()

export default app
