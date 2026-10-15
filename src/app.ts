// import { csrf } from 'hono/csrf'

import { HTTPException } from 'hono/http-exception'

import { version } from '../package.json'
import { Scalar } from '@scalar/hono-api-reference'
import app from './platform/http/routes'
import { createOpenAPIDocument } from './platform/http/openapi'

// app.use('*', csrf({ origin: 'localhost' }))

app.onError(c => {
  // Log error (Sentry, ....)
  // captureException({
  //   error: error,
  //   extra: {
  //     function: '[FILENAME:FUNCTIONAME]',
  //   },
  // })

  if (c.error instanceof HTTPException) {
    if (c.error.res) {
      return c.error.getResponse()
    }

    return c.json({ error: c.error.message }, c.error.status)
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

const openAPIInfo = {
  title: 'My API',
  version,
}

let openAPIDocument:
  | Awaited<ReturnType<typeof createOpenAPIDocument>>
  | undefined

app.get('/doc', async c => {
  openAPIDocument ??= await createOpenAPIDocument(app, openAPIInfo)

  return c.json(openAPIDocument)
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
