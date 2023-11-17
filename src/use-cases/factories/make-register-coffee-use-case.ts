import { RegisterCoffeeUseCase } from '../register-coffee'
import { PrismaCoffeesRepository } from '@/repositories/prisma/prisma-coffee-repository'

export function makeRegisterCoffeeUseCase() {
  const coffeesRepository = new PrismaCoffeesRepository()
  const registerCoffeeUseCase = new RegisterCoffeeUseCase(coffeesRepository)

  return registerCoffeeUseCase
}
