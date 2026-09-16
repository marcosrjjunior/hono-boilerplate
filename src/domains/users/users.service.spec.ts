import { describe, expect, it } from 'bun:test'

import { countUsers, createUser } from './users.service'
import { MockUserRepository } from './users.repository'
import { Role } from './users.types'

describe('users service', () => {
  it('creates a user through the repository', async () => {
    const repository = new MockUserRepository()
    const service = createUser(repository)

    const response = await service.execute({
      name: 'User 1',
      email: 'user@email.com',
      role: Role.ADMIN,
      mobile_phone_number: '+61111111',
    })

    expect(response.id).toBeString()
  })

  it('counts users through the repository', async () => {
    const repository = new MockUserRepository()
    const service = countUsers(repository)

    await expect(
      service.execute({ where: { role: Role.MEMBER } }),
    ).resolves.toEqual({ count: 10 })
  })
})
