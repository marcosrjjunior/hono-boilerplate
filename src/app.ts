import { Hono } from 'hono'
// import { csrf } from 'hono/csrf'

import { ZodError, ZodIssue } from 'zod'

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
    const errors = error.flatten((issue: ZodIssue) => ({
      message: issue.message,
      errorCode: issue.code,
    }))

    return c.json({ error: errors, message: 'ZodError' }, 400)
  }

  console.error(error)
  return c.json(
    { error, message: error.message || 'Custom Error Message' },
    500,
  )
})

app.notFound(c => {
  return c.text('404 Not found', 404)
})

export { app }
