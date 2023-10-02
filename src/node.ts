import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { routes } from './routes'

const app = new Hono()

routes(app)

app.onError((err, c) => {
  // This is the a global error
  console.error(`${err}`)
  return c.text('Custom Error Message', 500)
})

serve(app, info => {
  console.log(`Listening on http://localhost:${info.port}`)
})
