import { defineHandler } from 'hono/factory'

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

app.query(
  '/users/count',
  defineHandler({
    json: CountUsersSchema,
    response: CountUsersResponseSchema,
  })(async (_, { json }) => {
    const response = service.execute(json)

    return response
  }),
)

export default app
