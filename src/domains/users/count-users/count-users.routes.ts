import { createRoute } from '@hono/zod-openapi'

import { openAPI } from '../../../platform/http/openapi'
import { createRouter } from '../../../platform/http/router'
import { KyselyCountUsersRepository } from './count-users.repository'
import { countUsers } from './count-users.service'
import {
  CountUsersResponseSchema,
  CountUsersSchema,
} from './count-users.schemas'

const app = createRouter()

const repository = new KyselyCountUsersRepository()
const service = countUsers(repository)

app.openapi(
  createRoute({
    method: 'post',
    path: '/users/count',
    request: {
      body: openAPI.jsonRequired(CountUsersSchema, 'Users count request'),
    },
    responses: {
      200: openAPI.json(CountUsersResponseSchema, 'Users count response'),
    },
  }),
  async c => {
    const response = await service.execute(c.req.valid('json'))

    return c.json(response, 200)
  },
)

export default app
