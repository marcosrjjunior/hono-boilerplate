import { describe, expect, it } from 'bun:test'

import { MockCountUsersRepository } from './count-users.repository'
import { countUsers } from './count-users.service'
import { Role } from '../users.types'

describe('count users service', () => {
  it('counts users through the repository', async () => {
    const service = countUsers(new MockCountUsersRepository())

    await expect(
      service.execute({ where: { role: Role.MEMBER } }),
    ).resolves.toEqual({ count: 10 })
  })
})
