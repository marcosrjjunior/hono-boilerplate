import { Hono } from 'hono'

export function createRouter() {
  return new Hono({
    strict: false,
  })
}
