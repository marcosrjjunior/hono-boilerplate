import { describe, it, expect, spyOn } from 'bun:test'

import MockUserRepository, {
  createUserResponse,
} from '../../repositories/mock/MockUserRepository'
import { Role } from '../../models'
import CreateUser from './createUser'

const mockRepo = new MockUserRepository()
const useCase = CreateUser(mockRepo)
const create = spyOn(mockRepo, 'create')

describe('Create user [Mock]', () => {
  it('should be able to create', async () => {
    const response = await useCase.execute({
      name: 'User 1',
      email: 'user@email.com',
      role: Role.ADMIN,
      mobile_phone_number: '+61111111',
    })

    expect(create).toHaveBeenCalled()
    expect(response).toEqual(createUserResponse)
  })
})
