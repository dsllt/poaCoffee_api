import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import { CoffeesRepository } from '../coffee-repository'

export class PrismaCoffeesRepository implements CoffeesRepository {
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
  
  async findByName(coffeeName: string) {
    const coffee = await prisma.coffee.findFirst({
      where: {
        name: coffeeName,
      },
    })

    return coffee
  }
}
