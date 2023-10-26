import { prisma } from '@/lib/prisma'
import { UserRepository } from '@/repositories/users-repository'
import { hash } from 'bcryptjs'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'
import { User } from '@prisma/client'

interface RegisterUseCaseProps {
  name: string
  email: string
  password: string
}
interface RegisterUseCaseResponse {
  user: User
}
export class RegisterUseCase {
  constructor(private userRepository: UserRepository) {}
  async execute({
    name,
    email,
    password,
  }: RegisterUseCaseProps): Promise<RegisterUseCaseResponse> {
    const userWithEmail = await prisma.user.findUnique({
      where: {
        email,
      },
    })

    if (userWithEmail) {
      throw new UserAlreadyExistsError()
    }

    const password_hash = await hash(password, 6)

    const user = await this.userRepository.create({
      name,
      email,
      password_hash,
    })

    return { user }
  }
}
