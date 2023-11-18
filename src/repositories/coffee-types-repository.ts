import { CoffeeType, Prisma } from '@prisma/client'

export interface CoffeeTypesRepository {
  create(data: Prisma.CoffeeTypeUncheckedCreateInput): Promise<CoffeeType>
  findById(coffeeTypeId: string): Promise<CoffeeType | null>
  findByName(coffeeTypeName: string): Promise<CoffeeType | null>
  findAll(): Promise<CoffeeType[] | null>
}
