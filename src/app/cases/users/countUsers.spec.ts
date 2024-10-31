import { describe, it, expect, spyOn } from 'bun:test'

import MockUserRepository from '@/app/repositories/mock/MockUserRepository'
import { Role } from '@/app/models'

import CountUsers from './countUsers'

const mockRepo = new MockUserRepository()
const useCase = new CountUsers(mockRepo)
const count = spyOn(mockRepo, 'count')

describe('Count users [Mock]', () => {
  it('should be able to count', async () => {
    const response = await useCase.execute({
      where: {
        role: Role.MEMBER,
      },
    })

    expect(count).toHaveBeenCalled()
    expect(response).toEqual({ count: 10 })
  })

  it('should throw with an invalid parameters', async () => {
    expect(async () => {
      await useCase.execute({
        where: {
          role: 'Invalid role',
        },
      } as any)
    }).toThrow()
  })
})
