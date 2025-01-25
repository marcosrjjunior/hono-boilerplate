import { UsersId } from '../../../lib/db/schema/public/Users'
import { Role } from '../../models'
import { IUserRepository } from '../../repositories/interfaces/IUserRepository'

type CreateUserParams = {
  name: string
  email: string
  role: Role
  mobile_phone_number?: string
}

export type CreateUserResponse = {
  id: UsersId
}

export const CreateUser = (userRepository: IUserRepository) => {
  const execute = async (
    params: CreateUserParams,
  ): Promise<CreateUserResponse> => {
    const response = await userRepository.create(params)

    return response
  }

  return { execute }
}

export default CreateUser
