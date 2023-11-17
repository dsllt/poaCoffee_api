import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { UserAlreadyExistsError } from '@/use-cases/errors/user-already-exists-error'
import { makeRegisterUseCase } from '@/use-cases/factories/make-register-use-case'
import { makeRegisterCoffeeUseCase } from '@/use-cases/factories/make-register-coffee-use-case'
import { CoffeeAlreadyExistsError } from '@/use-cases/errors/coffee-already-exists-error'
import { Prisma } from '@prisma/client'

export async function registerCoffee(request: FastifyRequest, reply: FastifyReply) {
  const registerCoffeeBodySchema = z.object({
    name: z.string(),
    description: z.string(),
    phone: z.string(),
    address: z.string(),
    latitude: z.instanceof(Prisma.Decimal),
    longitude: z.instanceof(Prisma.Decimal),
    isAdmin: z.boolean()
  })
  const { name,description,phone,address,latitude,longitude,isAdmin } = registerCoffeeBodySchema.parse(request.body)

  try {
    const registerCoffeeUseCase = makeRegisterCoffeeUseCase()

    await registerCoffeeUseCase.execute({ name,description,phone,address,latitude,longitude,isAdmin })
  } catch (err) {
    console.log(err)
    if (err instanceof CoffeeAlreadyExistsError) {
      return reply.status(490).send({ message: err.message })
    }
    throw err
  }

  return reply.status(201).send()
}
