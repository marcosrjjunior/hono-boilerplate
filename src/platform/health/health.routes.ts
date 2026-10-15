import { defineHandler } from 'hono/factory'
import { z } from 'zod/v4'

import { createRouter } from '../http/router'

const HealthResponseSchema = z.strictObject({
  uptime: z.number(),
  message: z.string(),
  date: z.string(),
})

const app = createRouter()

app.get(
  '/health',
  defineHandler({ response: HealthResponseSchema })(() => ({
    uptime: process.uptime(),
    message: 'Ok',
    date: new Date().toISOString(),
  })),
)

export default app
