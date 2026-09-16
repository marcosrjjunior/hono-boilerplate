import { createRoute } from '@hono/zod-openapi'

import { createRouter } from '../../platform/http/router'
import { openAPI } from '../../platform/http/openapi'
import { KyselyUserRepository } from './users.repository'
import { countUsers, createUser } from './users.service'
import {
  CountUserResponseSchema,
  CountUserSchema,
  CreateUserResponseSchema,
  CreateUserSchema,
} from './users.schemas'

const app = createRouter()
const userRepository = new KyselyUserRepository()

app
  .openapi(
    createRoute({
      method: 'post',
      path: '/users',
      request: {
        body: openAPI.jsonRequired(CreateUserSchema, 'Create user request'),
      },
      responses: {
        200: openAPI.json(CreateUserResponseSchema, 'Users count'),
      },
    }),
    async c => {
      const create = createUser(userRepository)
      const response = await create.execute(c.req.valid('json'))

      return c.json(response, 200)
    },
  )
  .openapi(
    createRoute({
      method: 'post',
      path: '/users/count',
      request: {
        body: openAPI.jsonRequired(CountUserSchema, 'Users count request'),
      },
      responses: {
        200: openAPI.json(CountUserResponseSchema, 'Users count response'),
      },
    }),
    async c => {
      const count = countUsers(userRepository)
      const response = await count.execute(c.req.valid('json'))

      return c.json(response, 200)
    },
  )

export default app
