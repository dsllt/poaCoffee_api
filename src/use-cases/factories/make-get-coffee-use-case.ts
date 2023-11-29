import { PrismaCoffeesRepository } from '@/repositories/prisma/prisma-coffee-repository'
import { GetCoffeesUseCase } from '../get-coffees'

export function makeGetCoffeesUseCase() {
  const coffeesRepository = new PrismaCoffeesRepository()
  const getCoffeesUseCase = new GetCoffeesUseCase(coffeesRepository)

  return getCoffeesUseCase
}
