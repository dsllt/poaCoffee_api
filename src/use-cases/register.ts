import { prisma } from '@/lib/prisma'
import { UserRepository } from '@/repositories/users-repository'
import { hash } from 'bcryptjs'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'

interface RegisterUseCaseProps {
  name: string
  email: string
  password: string
}

export class RegisterUseCase {
  constructor(private userRepository: UserRepository) {}
  async register({ name, email, password }: RegisterUseCaseProps) {
    const userWithEmail = await prisma.user.findUnique({
      where: {
        email,
      },
    })

    if (userWithEmail) {
      throw new UserAlreadyExistsError()
    }

    const password_hash = await hash(password, 6)

    await this.userRepository.create({ name, email, password_hash })
  }
}
