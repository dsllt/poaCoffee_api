import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import { CoffeeTypesRepository } from '../coffee-types-repository'

export class PrismaCoffeeTypesRepository implements CoffeeTypesRepository {
  async create(data: Prisma.CoffeeTypeUncheckedCreateInput) {
    const coffeeType = await prisma.coffeeType.create({ data })

    return coffeeType
  }

  async findById(coffeeTypeId: string) {
    const coffeeType = await prisma.coffeeType.findUnique({
      where: {
        id: coffeeTypeId,
      },
    })

    return coffeeType
  }

  async findByName(coffeeTypeName: string) {
    const coffeeType = await prisma.coffeeType.findFirst({
      where: {
        name: coffeeTypeName,
      },
    })

    return coffeeType
  }

  async findAll() {
    const coffeeTypes = await prisma.coffeeType.findMany()

    return coffeeTypes
  }
}
