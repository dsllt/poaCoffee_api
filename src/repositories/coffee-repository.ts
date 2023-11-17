import { Coffee, Prisma } from '@prisma/client'

export interface CoffeesRepository {
  create(data: Prisma.CoffeeCreateInput): Promise<Coffee>
  findById(coffeeId: string): Promise<Coffee | null>
  findByName(coffeeName: string): Promise<Coffee | null>
}
