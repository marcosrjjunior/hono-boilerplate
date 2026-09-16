import type {
  CountUsersParams,
  CreateUserParams,
  UserRepository,
} from './users.types'

export const createUser = (userRepository: UserRepository) => {
  const execute = async (params: CreateUserParams) => {
    return userRepository.create(params)
  }

  return { execute }
}

export const countUsers = (userRepository: UserRepository) => {
  const execute = async (params: CountUsersParams) => {
    return userRepository.count(params)
  }

  return { execute }
}
