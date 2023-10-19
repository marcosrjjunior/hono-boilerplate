import { Hono } from 'hono'

import { serve } from '@hono/node-server'

import { routes } from './routes'

const app = new Hono()

routes(app)

app.onError((err, c) => {
  // This is the a global error
  console.error(`${err}`)
  return c.text('Custom Error Message', 500)
})

serve({ ...app, port: +(process.env.PORT as string) }, info => {
  console.log(`Listening on http://localhost:${info.port}`)
})
