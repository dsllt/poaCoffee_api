import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { UserAlreadyExistsError } from '@/use-cases/errors/user-already-exists-error'
import { makeRegisterUseCase } from '@/use-cases/factories/make-register-use-case'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
    isAdmin: z.boolean(),
  })
  const { name, email, password, isAdmin } = registerBodySchema.parse(
    request.body,
  )

  try {
    const registerUseCase = makeRegisterUseCase()

    await registerUseCase.execute({ name, email, password, isAdmin })
  } catch (err) {
    console.log(err)
    if (err instanceof UserAlreadyExistsError) {
      return reply.status(490).send({ message: err.message })
    }
    throw err
  }

  return reply.status(201).send()
}
