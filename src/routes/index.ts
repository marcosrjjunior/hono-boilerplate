import { Hono } from 'hono'
import { logger } from 'hono/logger'

import users from './users'

const app = new Hono()

app.use('*', logger())

// custom middleware example
// app.get('/', hello(), c => c.json({ 1: 'Hello', 2: 'World' }))

app
  .get('/health', c =>
    c.json({
      uptime: process.uptime(),
      message: 'Ok',
      date: new Date(),
    }),
  )
  .route('/users', users)

// const routes = app
// export type AppType = typeof routes
// import { hc } from 'hono/client'
// const client = hc<AppType>('')
// client.users.count.$post()

export default app
