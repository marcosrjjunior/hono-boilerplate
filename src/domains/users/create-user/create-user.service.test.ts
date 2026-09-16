import { describe, expect, it } from 'bun:test'

import { createUser } from './create-user.service'
import { Role } from '../users.types'

const repository = {
  create: async () => ({
    id: 'ce3c8cad-ae9d-4f46-b2c2-1440bdac16b7',
  }),
}

describe('create user service', () => {
  it('creates a user through the repository', async () => {
    const service = createUser(repository)

    const response = await service.execute({
      name: 'User 1',
      email: 'user@email.com',
      role: Role.ADMIN,
      mobile_phone_number: '+61111111',
    })

    expect(response.id).toBeString()
  })
})
