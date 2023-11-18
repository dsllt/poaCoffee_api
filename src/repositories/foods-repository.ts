import { Food, Prisma } from '@prisma/client'

export interface FoodRepository {
  create(data: Prisma.FoodUncheckedCreateInput): Promise<Food>
  findById(foodId: string): Promise<Food | null>
  findByName(foodName: string): Promise<Food | null>
  findAll(): Promise<Food[] | null>
}
