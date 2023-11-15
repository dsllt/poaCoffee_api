import { Coffee, Prisma } from '@prisma/client'

export interface CoffeeRepository {
  create(data: Prisma.CoffeeCreateInput): Promise<Coffee>
  findById(coffeeId: string): Promise<Coffee | null>
}
