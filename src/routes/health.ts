import { createRoute, z } from '@hono/zod-openapi'

import { createRouter } from '../lib/router'
import { openAPI } from '../lib/openapi/json'

const HealthResponseSchema = z.strictObject({
  uptime: z.number(),
  message: z.string(),
  date: z.string(),
})

const app = createRouter()

app.openapi(
  createRoute({
    method: 'get',
    path: '/health',
    responses: {
      200: openAPI.json(HealthResponseSchema, 'Health endpoint'),
    },
  }),
  c => {
    return c.json({
      uptime: process.uptime(),
      message: 'Ok',
      date: new Date(),
    })
  },
)

export default app
