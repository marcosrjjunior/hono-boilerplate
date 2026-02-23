import { logger } from 'hono/logger'

import health from './health'
import users from './users'

import { createRouter } from '../lib/router'

const app = createRouter()

app.use('*', logger())

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
