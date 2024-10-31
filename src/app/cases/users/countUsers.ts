import { object, nativeEnum } from 'zod'

import { Role } from '../../models'
import {
  CountUserParams,
  IUserRepository,
} from '@/app/repositories/interfaces/IUserRepository'

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
        role: nativeEnum(Role).optional(),
      }).optional(),
    })

    CountParams.parse(params)
  }
}

export default CountUsers
