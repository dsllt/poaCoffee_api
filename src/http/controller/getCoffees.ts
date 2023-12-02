import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import { makeGetCoffeesUseCase } from '@/use-cases/factories/make-get-coffee-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function getCoffees(request: FastifyRequest, reply: FastifyReply) {
  try {
    const getCoffeesUseCase = makeGetCoffeesUseCase()

    const coffees = await getCoffeesUseCase.execute()
    return reply.status(200).send(coffees)
  } catch (err) {
    console.log(err)
    if (err instanceof ResourceNotFoundError) {
      return reply.status(400).send({ message: err.message })
    }
    throw err
  }
}
