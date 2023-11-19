import { PrismaFoodRepository } from '@/repositories/prisma/prisma-food-repository'
import { RegisterFoodUseCase } from '../register-food'

export function makeRegisterFoodUseCase() {
  const foodsRepository = new PrismaFoodRepository()
  const registerFoodUseCase = new RegisterFoodUseCase(foodsRepository)

  return registerFoodUseCase
}
