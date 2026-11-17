import { afterAll, describe, expect, it } from 'bun:test'

import { app } from '../../../app'
import { db } from '../../../platform/persistence/db'
import { Role } from '../users.types'

const insertedIds: string[] = []

describe('Count user [QUERY:/users/count]', () => {
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
    expect(data.message).toBe('ZodError')
  })

  it('should count members', async () => {
    const before = await countUsers(Role.MEMBER)

    await insertUsers(Role.MEMBER, 2)

    const after = await countUsers(Role.MEMBER)

    expect(after).toBe(before + 2)
  })

  it('should count admins', async () => {
    const before = await countUsers(Role.ADMIN)

    await insertUsers(Role.ADMIN, 3)

    const after = await countUsers(Role.ADMIN)

    expect(after).toBe(before + 3)
  })
})

const countUsers = async (role: Role) => {
  const res = await app.request('/users/count', {
    method: 'QUERY',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      where: {
        role,
      },
    }),
  })

  const data = await res.json()

  return data.count as number
}

const insertUsers = async (role: Role, amount: number) => {
  const users = await db
    .insertInto('users')
    .values(
      Array.from({ length: amount }, () => ({
        name: 'Count Test',
        email: `count-${role}-${crypto.randomUUID()}@test.com`,
        role,
      })),
    )
    .returning('id')
    .execute()

  insertedIds.push(...users.map(user => user.id))
}

afterAll(async () => {
  for (const id of insertedIds) {
    await db.deleteFrom('users').where('id', '=', id).execute()
  }
})
