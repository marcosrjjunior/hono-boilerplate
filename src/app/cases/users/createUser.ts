import { Role } from '../../models'
import { IUserRepository } from '../../repositories/interfaces/IUserRepository'

type CreateUserParams = {
  name: string
  email: string
  role: Role
  mobile_phone_number?: string
}

export type CreateUserResponse = {
  id: string
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
