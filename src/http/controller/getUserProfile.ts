import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import { makeGetUserProfileUseCase } from '@/use-cases/factories/make-get-user-profile-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function getUserProfile(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const getUserProfileBodySchema = z.object({
    userId: z.string()
  })

  const { userId } = getUserProfileBodySchema.parse(request.body)

  try {
    const getUserProfileUseCase = makeGetUserProfileUseCase()

    await getUserProfileUseCase.execute({ userId })
  } catch (err) {
    console.log(err)
    if (err instanceof ResourceNotFoundError) {
      return reply.status(400).send({ message: err.message })
    }
    throw err
  }

  return reply.status(200).send()
}
