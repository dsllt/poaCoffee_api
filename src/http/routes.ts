import { FastifyInstance } from 'fastify'
import { register } from './controller/register'
import { authenticate } from './controller/authenticate'
import { registerCoffee } from './controller/registerCoffee'

export async function appRoutes(app: FastifyInstance) {
  app.post('/register/users', register)
  app.post('/sessions', authenticate)
  app.post('/register/coffees', registerCoffee)
}
