import { Hono } from 'hono'
import { csrf } from 'hono/csrf'

import { serve } from '@hono/node-server'
import { ZodError } from 'zod'

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

  if (error instanceof ZodError) {
    return c.json({ error, message: error.message }, { status: 403 })
  }

  console.error(`${error}`)
  return c.json(
    { error, message: error.message || 'Custom Error Message' },
    500,
  )
})

serve({ ...app, port: +(process.env.PORT as string) }, info => {
  console.log(`Listening on http://localhost:${info.port}`)
})
