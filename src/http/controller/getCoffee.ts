import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import { makeGetCoffeeUseCase } from '@/use-cases/factories/make-get-coffees-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function getCoffee(request: FastifyRequest, reply: FastifyReply) {
  const getCoffeeBodySchema = z.object({
    coffeeName: z.string(),
  })

  const { coffeeName } = getCoffeeBodySchema.parse(request.body)

  try {
    const getCoffeeUseCase = makeGetCoffeeUseCase()

    await getCoffeeUseCase.execute({ coffeeName })
  } catch (err) {
    console.log(err)
    if (err instanceof ResourceNotFoundError) {
      return reply.status(400).send({ message: err.message })
    }
    throw err
  }

  return reply.status(200).send()
}
