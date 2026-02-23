// import { csrf } from 'hono/csrf'

import { z } from 'zod/v4'

import { version } from '../package.json'
import { Scalar } from '@scalar/hono-api-reference'
import app from './routes'

// app.use('*', csrf({ origin: 'localhost' }))

app.onError((error, c) => {
  // Log error (Sentry, ....)
  // captureException({
  //   error: error,
  //   extra: {
  //     function: '[FILENAME:FUNCTIONAME]',
  //   },
  // })

  if (error instanceof z.ZodError) {
    const errors = z.flattenError(error)

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

const test = async () => {
  const res = await app.request('/users/count', {
    method: 'POST',
    // headers: {
    //   'Content-Type': 'application/json',
    // },
    body: JSON.stringify({
      where: { role: 'ADMIn' },
    }),
  })

  const data = await res.json()

  console.log('dataaa', data)
}

test()

export { app }
