import { afterAll, describe, expect, it } from 'bun:test'

import { app } from '../../app'
import { db } from '../../lib/db'
import { Role } from '../../app/models'

const userIds: string[] = []

describe('Create user [POST:/users]', () => {
  it('should fail with invalid params', async () => {
    const res = await app.request('/users', {
      method: 'POST',
      body: JSON.stringify({
        invalid: 'invalid',
      }),
    })

    const data = await res.json()

    expect(res.status).toBe(400)
    expect(data.message).toBe('ZodError')
  })

  it(`should fail with invalid params for ${Role.ADMIN} user`, async () => {
    const invalidUserPayloads = [
      {
        description: 'missing name',
        payload: {
          email: 'name@email.com',
          role: Role.ADMIN,
          mobile_phone_number: '+614161111111',
        },
      },
      {
        description: 'missing email',
        payload: {
          name: 'name',
          role: Role.ADMIN,
          mobile_phone_number: '+614161111112',
        },
      },
      {
        description: 'missing role',
        payload: {
          name: 'name',
          email: 'test@asd.com',
          mobile_phone_number: '+614161111113',
        },
      },
      {
        description: 'missing phone number',
        payload: {
          name: 'name',
          email: 'name@email.com',
          role: Role.ADMIN,
        },
      },
    ]

    for (const { description, payload } of invalidUserPayloads) {
      console.log(`[Create user]: validate ${description}`)

      const res = await app.request('/users', {
        method: 'POST',
        body: JSON.stringify(payload),
      })

      const data = await res.json()

      expect(res.status).toBe(400)
      expect(data.message).toBe('ZodError')
    }
  })

  it('should create an admin', async () => {
    const res = await app.request('/users', {
      method: 'POST',
      body: JSON.stringify({
        name: 'name',
        email: 'name@email.com',
        role: Role.ADMIN,
        mobile_phone_number: '+6141611111112',
      }),
    })

    const data = (await res.json()) as { id: string }
    userIds.push(data.id)

    expect(res.status).toBe(200)
    expect(data.id).toBeString()
  })

  it('should create a member', async () => {
    const res = await app.request('/users', {
      method: 'POST',
      body: JSON.stringify({
        name: 'name',
        email: 'member@email.com',
        role: Role.MEMBER,
        mobile_phone_number: '+6141611111112',
      }),
    })

    const data = (await res.json()) as { id: string }
    userIds.push(data.id)

    expect(res.status).toBe(200)
    expect(data.id).toBeString()
  })

  afterAll(async () => {
    for (const id of userIds) {
      await db.deleteFrom('users').where('id', '=', id).execute()
    }
  })
})
