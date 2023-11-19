import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeRegisterFoodUseCase } from '@/use-cases/factories/make-register-food-use-case'
import { FoodAlreadyExistsError } from '@/use-cases/errors/food-already-exists-error'

export async function registerFood(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const registerFoodBodySchema = z.object({
    name: z.string(),
    description: z.string(),
    image: z.string(),
    coffeeId: z.string(),
  })
  const { name, description, image, coffeeId } = registerFoodBodySchema.parse(
    request.body,
  )

  try {
    const registerFoodUseCase = makeRegisterFoodUseCase()

    await registerFoodUseCase.execute({
      name,
      description,
      image,
      coffeeId,
    })
  } catch (err) {
    console.log(err)
    if (err instanceof FoodAlreadyExistsError) {
      return reply.status(490).send({ message: err.message })
    }
    throw err
  }

  return reply.status(201).send()
}
