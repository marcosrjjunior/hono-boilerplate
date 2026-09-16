import { describe, expect, it } from 'bun:test'

import {
  MockCreateUserRepository,
} from './create-user.repository'
import { createUser } from './create-user.service'
import { Role } from '../users.types'

describe('create user service', () => {
  it('creates a user through the repository', async () => {
    const service = createUser(new MockCreateUserRepository())

    const response = await service.execute({
      name: 'User 1',
      email: 'user@email.com',
      role: Role.ADMIN,
      mobile_phone_number: '+61111111',
    })

    expect(response.id).toBeString()
  })
})
