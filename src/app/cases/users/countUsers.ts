import { Role } from '../../models'
import { IUserRepository } from '../../repositories/interfaces/IUserRepository'

type CountUsersRequest = {
  where?: {
    role?: Role
  }
}

type CountUsersResponse = {
  count: number
}

export class CountUsers {
  constructor(private userRepository: IUserRepository) {}

  execute = async (params: CountUsersRequest): Promise<CountUsersResponse> => {
    const response = await this.userRepository.count(params)

    return response
  }
}

export default CountUsers
