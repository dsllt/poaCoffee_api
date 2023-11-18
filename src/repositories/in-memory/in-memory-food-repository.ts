/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Food, Prisma } from '@prisma/client'
import { FoodRepository } from '../foods-repository'

export class InMemoryFoodRepository implements FoodRepository {
  public items: Food[] = []

  async create(data: Prisma.FoodUncheckedCreateInput) {
    const food = {
      id: 'food-1',
      name: data.name,
      description: data!.description!,
      image: data!.image!,
      coffeeId: data.coffeeId,
    }
    this.items.push(food)

    return food
  }

  async findById(foodId: string) {
    const food = this.items.find((item) => item.id === foodId)

    if (!food) {
      return null
    }

    return food
  }

  async findByName(foodName: string) {
    const food = this.items.find((item) => item.name === foodName)

    if (!food) {
      return null
    }

    return food
  }

  async findAll() {
    const foods = this.items

    if (!foods) {
      return null
    }

    return foods
  }
}
