import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import { FoodRepository } from '../foods-repository'

export class PrismaFoodRepository implements FoodRepository {
  async create(data: Prisma.FoodUncheckedCreateInput) {
    const food = await prisma.food.create({ data })

    return food
  }

  async findById(foodId: string) {
    const food = await prisma.food.findUnique({
      where: {
        id: foodId,
      },
    })

    return food
  }

  async findByName(foodName: string) {
    const food = await prisma.food.findFirst({
      where: {
        name: foodName,
      },
    })

    return food
  }

  async findAll() {
    const food = await prisma.food.findMany()

    return food
  }
}
