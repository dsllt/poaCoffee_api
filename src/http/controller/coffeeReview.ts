import { NotAuthenticatedUserError } from '@/use-cases/errors/user-not-authenticated-error'
import { makeCoffeeReviewUseCase } from '@/use-cases/factories/make-coffeee-review-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function coffeeReview(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const coffeeReviewBodySchema = z.object({
    description: z.string(),
    rating: z.string(),
    userId: z.string(),
    coffeeId: z.string(),
  })

  const { description,
    rating,
    userId,
    coffeeId,
   } = coffeeReviewBodySchema.parse(request.body)

  try {
    const coffeeReviewUseCase = makeCoffeeReviewUseCase()

    await coffeeReviewUseCase.execute({ description,
      rating,
      userId,
      coffeeId, })
  } catch (err) {
    console.log(err)
    if (err instanceof NotAuthenticatedUserError) {
      return reply.status(400).send({ message: err.message })
    }
    throw err
  }

  return reply.status(200).send()
}
