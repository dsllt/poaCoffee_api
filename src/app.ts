// docker run --name api-poaCoffee-pg -e POSTGRESQL_USERNAME=docker -e POSTGRESQL_PASSWORD=docker -e POSTGRESQL_DATABASE=poacoffee -p 5432:5432 bitnami/postgresql
import fastify from 'fastify'
import { appRoutes } from './http/routes'
import { ZodError } from 'zod'
import { env } from './env'

export const app = fastify()

app.register(appRoutes)

app.addHook('onRequest', async (request, reply) => {
  reply.header('Access-Control-Allow-Origin', '*')
  reply.header('Access-Control-Allow-Credentials', true)
  reply.header(
    'Access-Control-Allow-Headers',
    'Authorization, Origin, X-Requested-With, Content-Type, Accept, X-Slug, X-UID',
  )
  reply.header(
    'Access-Control-Allow-Methods',
    'OPTIONS, POST, PUT, PATCH, GET, DELETE',
  )
  if (request.method === 'OPTIONS') {
    reply.send()
  }
})

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: 'Validation error.', issues: error.format() })
  }

  if (env.NODE_ENV !== 'production') {
    console.error(error)
  } else {
    // TODO log an external tool
  }

  return reply.status(500).send({ message: 'Internal server error' })
})
