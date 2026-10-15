// import { csrf } from 'hono/csrf'

import { z } from 'zod/v4'

import { version } from '../package.json'
import { Scalar } from '@scalar/hono-api-reference'
import app from './platform/http/routes'

// app.use('*', csrf({ origin: 'localhost' }))

app.onError(c => {
  // Log error (Sentry, ....)
  // captureException({
  //   error: error,
  //   extra: {
  //     function: '[FILENAME:FUNCTIONAME]',
  //   },
  // })

  if (c.error instanceof z.ZodError) {
    const errors = z.flattenError(c.error)

    return c.json({ error: errors, message: 'ZodError' }, 400)
  }

  console.error(c.error)

  return c.json(
    { error: c.error, message: c.error?.message || 'Custom Error Message' },
    500,
  )
})

app.notFound(c => {
  return c.text('404 Not found', 404)
})

app.doc('/doc', {
  openapi: '3.2.0',
  info: {
    version,
    title: 'My API',
  },
})

app.get(
  '/reference',
  Scalar({
    url: '/doc',
    pageTitle: 'API reference',
    defaultHttpClient: {
      targetKey: 'js',
      clientKey: 'fetch',
    },
  }),
)

export { app }
