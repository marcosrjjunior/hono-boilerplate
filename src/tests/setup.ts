import { beforeAll, afterAll } from 'bun:test'
import { db } from '../lib/db'
import { Role } from '../app/models'

let users: { id: string }[] = []
beforeAll(async () => {
  console.log('[Running setup:beforeAll]')

  await insertUsers()
})

afterAll(async () => {
  console.log('[Running setup:afterAll]')

  for (const user of users) {
    await db.deleteFrom('users').where('id', '=', user.id).execute()
  }
})

const insertUsers = async () => {
  users = await db
    .insertInto('users')
    .values([
      { name: 'Test', email: 'test@test.com', role: Role.ADMIN },
      { name: 'Test 2', email: 'test2@test.com', role: Role.MEMBER },
      { name: 'Test 3', email: 'test3@test.com', role: Role.MEMBER },
    ])
    .returning('id')
    .execute()
}
