import { object, nativeEnum } from 'zod'

import UserRole from '../../../lib/db/schema/public/UserRole'
import {
  CountUserParams,
  IUserRepository,
} from '../../repositories/interfaces/IUserRepository'

export class CountUsers {
  constructor(private userRepository: IUserRepository) {}

  execute = async (params: CountUserParams) => {
    this.validate(params)

    const response = await this.userRepository.count(params)

    return response
  }

  private validate = (params: CountUserParams) => {
    const CountParams = object({
      where: object({
        role: nativeEnum(UserRole).optional(),
      }).optional(),
    })

    CountParams.parse(params)
  }
}

export default CountUsers
