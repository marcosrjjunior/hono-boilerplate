import { z } from 'zod'

import UserRole from '../../../lib/db/schema/public/UserRole'
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
    const CountParams = z.object({
      where: z
        .object({
          role: z.nativeEnum(UserRole).optional(),
        })
        .optional(),
    })

    CountParams.parse(params)
  }
}

export default CountUsers
