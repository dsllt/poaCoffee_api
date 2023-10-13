import { prisma } from "@/lib/prisma"
import { PrismaUsersRepository } from "@/repositories/prisma-users-repository"
import { hash } from "bcryptjs"

interface RegisterUseCaseProps {
  name: string,
  email: string,
  password: string
}

export async function registerUseCase({name, email, password}: RegisterUseCaseProps) {
  const userWithEmail = await prisma.user.findUnique({
    where: {
      email
    }
  })

  if (userWithEmail) {
    throw new Error('Email already in use.')
  }

  const password_hash = await hash(password, 6)

  const prismaUsersRepository = new PrismaUsersRepository()

  await prismaUsersRepository.create({name, email, password_hash})
}