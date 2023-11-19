import { PrismaCoffeeTypesRepository } from '@/repositories/prisma/prisma-coffee-type-repository'
import { RegisterCoffeeTypeUseCase } from '../register-coffee-type'

export function makeRegisterCoffeeTypeUseCase() {
  const coffeeTypesRepository = new PrismaCoffeeTypesRepository()
  const registerCoffeeTypeUseCase = new RegisterCoffeeTypeUseCase(
    coffeeTypesRepository,
  )

  return registerCoffeeTypeUseCase
}
