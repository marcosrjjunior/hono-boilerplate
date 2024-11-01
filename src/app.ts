import { Hono } from 'hono'
// import { csrf } from 'hono/csrf'

import { ZodError } from 'zod'

import { routes } from './routes'

const app = new Hono()

// app.use('*', csrf({ origin: 'localhost' }))

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

app.notFound(c => {
  console.error(`not found${c}`)
  return c.text('404 Not found', 404)
})

export { app }
