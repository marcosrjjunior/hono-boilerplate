import type { MiddlewareHandler } from 'hono'

export const hello = (message: string = 'Hello!'): MiddlewareHandler => {
  return async (_, next) => {
    await next()
    console.log('hello middleware', message)
  }
}
