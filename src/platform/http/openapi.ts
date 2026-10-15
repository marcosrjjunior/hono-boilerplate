import { toOpenAPISchema } from '@standard-community/standard-openapi'

type Schema = Parameters<typeof toOpenAPISchema>[0]

type JSONSchema = Awaited<ReturnType<typeof toOpenAPISchema>>['schema']

type IO = 'input' | 'output'

type Validations = Partial<
  Record<
    'param' | 'query' | 'header' | 'cookie' | 'form' | 'json' | 'response',
    unknown
  >
>

type Route = { method: string; path: string; handler: unknown }

type Converted = Record<IO, Map<Schema, JSONSchema>>

const parameterIn = {
  param: 'path',
  query: 'query',
  header: 'header',
  cookie: 'cookie',
} as const

const requestTargets = [
  'param',
  'query',
  'header',
  'cookie',
  'form',
  'json',
] as const

const isSchema = (value: unknown): value is Schema =>
  typeof value === 'object' && value !== null && '~standard' in value

const toParameters = (
  target: keyof typeof parameterIn,
  schema: unknown,
  converted: Converted,
) => {
  if (!isSchema(schema)) {
    return []
  }

  const { properties = {}, required = [] } = converted.input.get(schema) as {
    properties?: Record<string, unknown>
    required?: string[]
  }

  return Object.entries(properties).map(([name, property]) => ({
    name,
    in: parameterIn[target],
    required: target === 'param' || required.includes(name),
    schema: property,
  }))
}

const toOperation = (
  { param, query, header, cookie, form, json, response }: Validations,
  converted: Converted,
) => {
  const body = json ?? form
  const hasRequest = [param, query, header, cookie, form, json].some(
    v => v !== undefined,
  )
  const responses: Record<string, unknown> = {
    200: isSchema(response)
      ? {
          description: 'OK',
          content: {
            'application/json': { schema: converted.output.get(response) },
          },
        }
      : { description: 'OK' },
  }

  if (hasRequest) {
    responses[400] = { description: 'Validation failed' }
  }

  if (response !== undefined) {
    responses[500] = { description: 'Response validation failed' }
  }

  return {
    parameters: [
      ...toParameters('param', param, converted),
      ...toParameters('query', query, converted),
      ...toParameters('header', header, converted),
      ...toParameters('cookie', cookie, converted),
    ],
    ...(isSchema(body) && {
      requestBody: {
        required: true,
        content: {
          [form !== undefined && json === undefined
            ? 'multipart/form-data'
            : 'application/json']: { schema: converted.input.get(body) },
        },
      },
    }),
    responses,
  }
}

export const createOpenAPIDocument = async (
  app: { routes: Route[] },
  info: { title: string; version: string },
) => {
  const routes = app.routes.flatMap(route => {
    const validations = (route.handler as { validations?: Validations })
      .validations

    return validations
      ? [
          {
            method: route.method.toLowerCase(),
            path: route.path.replace(/:(\w+)/g, '{$1}'),
            validations,
          },
        ]
      : []
  })

  const components: { schemas: Record<string, unknown> } = { schemas: {} }
  const converted: Converted = { input: new Map(), output: new Map() }

  const convert = async (schema: Schema, io: IO) => {
    const result = await toOpenAPISchema(schema, { options: { io } })

    Object.assign(components.schemas, result.components?.schemas)
    converted[io].set(schema, result.schema)
  }

  const conversions: Promise<void>[] = []

  for (const { validations } of routes) {
    for (const target of requestTargets) {
      if (isSchema(validations[target])) {
        conversions.push(convert(validations[target], 'input'))
      }
    }

    if (isSchema(validations.response)) {
      conversions.push(convert(validations.response, 'output'))
    }
  }

  await Promise.all(conversions)

  const paths: Record<string, Record<string, unknown>> = {}

  for (const { method, path, validations } of routes) {
    paths[path] = {
      ...paths[path],
      [method]: toOperation(validations, converted),
    }
  }

  return {
    openapi: '3.2.0',
    info,
    paths,
    ...(Object.keys(components.schemas).length > 0 && { components }),
  }
}
