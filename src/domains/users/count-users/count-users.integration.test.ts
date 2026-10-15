import { describe, expect, it } from 'bun:test'

import { app } from '../../../app'
import { Role } from '../users.types'

describe('Count user [POST:/users/count]', () => {
  it('should fail with invalid params', async () => {
    const res = await app.request('/users/count', {
      method: 'QUERY',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        invalid: 'invalid',
      }),
    })

    const data = await res.json()

    expect(res.status).toBe(400)
    expect(data.error).toBe('Validation failed')
  })

  it('should fail with malformed JSON', async () => {
    const res = await app.request('/users/count', {
      method: 'QUERY',
      headers: {
        'Content-Type': 'application/json',
      },
      body: '{"where": {',
    })

    const data = await res.json()

    expect(res.status).toBe(400)
    expect(res.headers.get('Content-Type')).toMatch(/^application\/json/)
    expect(data.error).toBe('Malformed JSON in request body')
  })

  it('should return 2 members', async () => {
    const res = await app.request('/users/count', {
      method: 'QUERY',
      headers: {
        'Content-Type': 'application/json',
      },
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
      method: 'QUERY',
      headers: {
        'Content-Type': 'application/json',
      },
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
