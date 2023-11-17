import { PrismaCoffeesRepository } from '@/repositories/prisma/prisma-coffee-repository'
import { GetCoffeeUseCase } from '../get-coffee'

export function makeGetCoffeeUseCase() {
  const coffeesRepository = new PrismaCoffeesRepository()
  const getCoffeeUseCase = new GetCoffeeUseCase(coffeesRepository)

  return getCoffeeUseCase
}
