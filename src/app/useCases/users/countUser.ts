import {
  CountUserParams,
  UserRepositoryInterface,
} from '../../repositories/interfaces/UserRepositoryInterface'

export class CountUsers {
  constructor(private userRepository: UserRepositoryInterface) {}

  execute = async (request: CountUserParams) => {
    this.validateFields(request)

    const response = await this.userRepository.count(request)

    return response
  }

  private validateFields = (params: CountUserParams) => {
    // return assert(
    //   params,
    //   object({
    //     page: optional(number()),
    //     limit: optional(number()),
    //     where: object({
    //       venueId: string(),
    //       role: string(),
    //     }),
    //   }),
    // )
  }
}

export default CountUsers
