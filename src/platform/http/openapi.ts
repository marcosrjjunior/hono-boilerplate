import type { ZodType } from 'zod'

const json = <T extends ZodType>(schema: T, description: string) => {
  return {
    description,
    content: {
      'application/json': {
        schema,
      },
    },
  }
}

const jsonRequired = <T extends ZodType>(schema: T, description: string) => {
  return {
    required: true,
    ...json(schema, description),
  }
}

export const openAPI = {
  json,
  jsonRequired,
}
