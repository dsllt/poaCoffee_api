import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeRegisterCoffeeUseCase } from '@/use-cases/factories/make-register-coffee-use-case'
import { CoffeeAlreadyExistsError } from '@/use-cases/errors/coffee-already-exists-error'

export async function registerCoffee(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const registerCoffeeBodySchema = z.object({
    name: z.string(),
    description: z.string(),
    phone: z.string(),
    address: z.string(),
    imageUrl: z.string(),
    latitude: z.number(),
    longitude: z.number(),
    rating: z.number(),
    slug: z.string(),
    isAdmin: z.boolean(),
  })
  const {
    name,
    imageUrl,
    description,
    phone,
    address,
    latitude,
    longitude,
    rating,
    slug,
    isAdmin,
  } = registerCoffeeBodySchema.parse(request.body)

  try {
    const registerCoffeeUseCase = makeRegisterCoffeeUseCase()

    await registerCoffeeUseCase.execute({
      name,
      imageUrl,
      description,
      phone,
      address,
      latitude,
      longitude,
      rating,
      slug,
      isAdmin,
    })
  } catch (err) {
    console.log(err)
    if (err instanceof CoffeeAlreadyExistsError) {
      return reply.status(490).send({ message: err.message })
    }
    throw err
  }

  return reply.status(201).send()
}
