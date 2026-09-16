import { createRoute } from '@hono/zod-openapi'

import { openAPI } from '../../../platform/http/openapi'
import { createRouter } from '../../../platform/http/router'
import { KyselyCreateUserRepository } from './create-user.repository'
import { createUser } from './create-user.service'
import {
  CreateUserResponseSchema,
  CreateUserSchema,
} from './create-user.schemas'

const app = createRouter()

const repository = new KyselyCreateUserRepository()
const service = createUser(repository.create)

app.openapi(
  createRoute({
    method: 'post',
    path: '/users',
    request: {
      body: openAPI.jsonRequired(CreateUserSchema, 'Create user request'),
    },
    responses: {
      200: openAPI.json(CreateUserResponseSchema, 'Create user response'),
    },
  }),
  async c => {
    const response = await service.execute(c.req.valid('json'))

    return c.json(response, 200)
  },
)

export default app
