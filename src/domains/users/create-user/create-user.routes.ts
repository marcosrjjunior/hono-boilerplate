import { defineHandler } from 'hono/factory'

import { createRouter } from '../../../platform/http/router'
import { KyselyCreateUserRepository } from './create-user.repository'
import { createUser } from './create-user.service'
import {
  CreateUserResponseSchema,
  CreateUserSchema,
} from './create-user.schemas'

const app = createRouter()

const repository = new KyselyCreateUserRepository()
const service = createUser(repository)

app.post(
  '/users',
  defineHandler({
    json: CreateUserSchema,
    response: CreateUserResponseSchema,
  })(async (_, { json }) => {
    const response = service.execute(json)

    return response
  }),
)

export default app
