import { Hono } from 'hono'
import { csrf } from 'hono/csrf'

import { serve } from '@hono/node-server'

import { routes } from './routes'

const app = new Hono()

app.use('*', csrf())

routes(app)

app.onError((error, c) => {
  // Log error (Sentry, ....)
  // captureException({
  //   error: error,
  //   extra: {
  //     function: '[FILENAME:FUNCTIONAME]',
  //   },
  // })

  console.error(`${error}`)
  return c.json(
    { error, message: error.message || 'Custom Error Message' },
    500,
  )
})

serve({ ...app, port: +(process.env.PORT as string) }, info => {
  console.log(`Listening on http://localhost:${info.port}`)
})
