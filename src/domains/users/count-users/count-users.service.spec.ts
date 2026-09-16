import { describe, expect, it } from 'bun:test'

import { countUsers } from './count-users.service'
import { Role } from '../users.types'

const repository = {
  count: async () => ({ count: 10 }),
}

describe('count users service', () => {
  it('counts users through the repository', async () => {
    const service = countUsers(repository)

    expect(service.execute({ where: { role: Role.MEMBER } })).resolves.toEqual({
      count: 10,
    })
  })
})
