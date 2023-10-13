import { prisma } from "@/lib/prisma"
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

  await prisma.user.create({
      data: {
          name,
          email,
          password_hash
      }
  })
}