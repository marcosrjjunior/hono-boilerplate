import { OpenAPIHono, z } from '@hono/zod-openapi'

export function createRouter() {
  return new OpenAPIHono({
    strict: false,
    defaultHook: (result: any, c) => {
      if (result.error instanceof z.ZodError) {
        const errors = z.flattenError(result.error)

        return c.json({ message: 'ZodError', error: errors }, 400)
      }

      if (!result.success) {
        return c.json(
          {
            message: result.error.message,
            error: {
              name: result.error.name,
              issues: result.error.issues,
            },
          },
          422,
        )
      }
    },
  })
}
