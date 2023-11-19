import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeRegisterCoffeeTypeUseCase } from '@/use-cases/factories/make-register-coffee-type-use-case'
import { CoffeeTypeAlreadyExistsError } from '@/use-cases/errors/coffee-type-already-exists-error'

export async function registerCoffeeType(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const registerCoffeeTypeBodySchema = z.object({
    name: z.string(),
    description: z.string(),
    image: z.string(),
    coffeeId: z.string(),
  })
  const { name, description, image, coffeeId } =
    registerCoffeeTypeBodySchema.parse(request.body)

  try {
    const registerCoffeeTypeUseCase = makeRegisterCoffeeTypeUseCase()

    await registerCoffeeTypeUseCase.execute({
      name,
      description,
      image,
      coffeeId,
    })
  } catch (err) {
    console.log(err)
    if (err instanceof CoffeeTypeAlreadyExistsError) {
      return reply.status(490).send({ message: err.message })
    }
    throw err
  }

  return reply.status(201).send()
}
