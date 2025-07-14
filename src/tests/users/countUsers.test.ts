import { describe, it, expect } from 'bun:test'

import { app } from '../../app'
import { Role } from '../../app/models'

describe('Count user [POST:/users/count]', () => {
  it('should fail with invalid params', async () => {
    const res = await app.request('/users/count', {
      method: 'POST',
      body: JSON.stringify({
        invalid: 'invalid',
      }),
    })

    const data = await res.json()

    expect(res.status).toBe(400)
    expect(data.message).toBe('ZodError')
  })

  it('should return 3 users', async () => {
    const res = await app.request('/users/count', {
      method: 'POST',
      body: JSON.stringify({}),
    })

    const data = await res.json()

    expect(res.status).toBe(200)
    expect(data.count).toBe(3)
  })

  it('should return 2 members', async () => {
    const res = await app.request('/users/count', {
      method: 'POST',
      body: JSON.stringify({
        where: {
          role: Role.MEMBER,
        },
      }),
    })

    const data = await res.json()

    expect(res.status).toBe(200)
    expect(data.count).toBe(2)
  })

  it('should not return 3 admins', async () => {
    const res = await app.request('/users/count', {
      method: 'POST',
      body: JSON.stringify({
        where: {
          role: Role.ADMIN,
        },
      }),
    })

    const data = await res.json()
    expect(data.count).not.toBe(3)
  })
})
