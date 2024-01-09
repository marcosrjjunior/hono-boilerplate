import { Hono } from 'hono'
import { csrf } from 'hono/csrf'

import { routes } from './routes'

const app = new Hono()

app.use('*', csrf())

routes(app)

app.onError((err, c) => {
  // This is the a global error
  console.error(`${err}`)
  return c.text('Custom Error Message', 500)
})

// app.notFound(c => {
//   console.error(`not found${c}`)
//   return c.text('404 Not found', 404)
// })

export default {
  ...app,
  port: process.env.PORT,
}
