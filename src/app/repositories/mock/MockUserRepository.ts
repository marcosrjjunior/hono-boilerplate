import {
  CreateUserResponse,
  CountUsersResponse,
  IUserRepository,
} from '../interfaces/IUserRepository'

export const createUserResponse = {
  id: 'ce3c8cad-ae9d-4f46-b2c2-1440bdac16b7',
}

export class MockUserRepository implements IUserRepository {
  count = async (): Promise<CountUsersResponse> => {
    return { count: 10 }
  }

  create = async (): Promise<CreateUserResponse> => {
    return createUserResponse
  }
}

export default MockUserRepository
