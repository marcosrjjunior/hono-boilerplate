import type { MiddlewareHandler } from 'hono'
// import { HTTPException } from 'hono/http-exception'

export const hello = (message: string = 'Hello!'): MiddlewareHandler => {
  return async (_, next) => {
    // c, next
    await next()
    console.log('hello middleware', message)
    // c.res.headers.append('X-Message', message)

    // if (authorized === false) {
    //   throw new HTTPException(401, { message: 'Custom error message' })
    // }
  }
}
