import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import { CoffeeRepository } from '../coffee-repository'

export class PrismaCoffeeRepository implements CoffeeRepository {
  async create(data: Prisma.CoffeeCreateInput) {
    const coffee = await prisma.coffee.create({ data })

    return coffee
  }

  async findById(coffeeId: string) {
    const coffee = await prisma.coffee.findUnique({
      where: {
        id: coffeeId,
      },
    })

    return coffee
  }
}
