import { describe, it, expect, spyOn } from 'bun:test'

import UserRole from '../../../lib/db/schema/public/UserRole'
import MockUserRepository from '../../repositories/mock/MockUserRepository'
import CountUsers from './countUsers'

const mockRepo = new MockUserRepository()
const useCase = new CountUsers(mockRepo)
const count = spyOn(mockRepo, 'count')

describe('Count users', () => {
  it('should be able to count', async () => {
    const response = await useCase.execute({
      where: {
        role: UserRole.SUPPORT,
      },
    })

    expect(count).toHaveBeenCalled()
    expect(response).toEqual({ count: 10 })
  })

  it('should throw with an invalid role', async () => {
    const request = async () =>
      await useCase.execute({
        where: {
          role: 'Invalid role' as any,
        },
      })

    expect(request).toThrow()
  })
})
