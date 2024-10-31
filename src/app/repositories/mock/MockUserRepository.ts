import { UsersId } from '@/lib/db/schema/public/Users'
import {
  CountUsersResponse,
  IUserRepository,
} from '../interfaces/IUserRepository'

export class MockUserRepository implements IUserRepository {
  search = async <T>(): Promise<T[]> => {
    return [
      {
        id: '58d0dcc1-8f76-46d8-9d9a-603ef7225104' as UsersId,
        firstName: 'First name',
        lastName: 'Last name',
        username: 'username',
        phoneNumber: null,
      },
    ] as T[]
  }

  count = async (): Promise<CountUsersResponse> => {
    return { count: 10 }
  }

  // create = async (): Promise<boolean> => {
  //   return true
  // }
}

export default MockUserRepository
