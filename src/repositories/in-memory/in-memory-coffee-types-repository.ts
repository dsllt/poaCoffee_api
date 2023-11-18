/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { CoffeeType, Prisma } from '@prisma/client'
import { CoffeeTypesRepository } from '../coffee-types-repository'

export class InMemoryCoffeeTypesRepository implements CoffeeTypesRepository {
  public items: CoffeeType[] = []

  async create(data: Prisma.CoffeeTypeUncheckedCreateInput) {
    const coffeeType = {
      id: 'coffee-1',
      name: data.name,
      description: data!.description!,
      image: data!.image!,
      coffeeId: data.coffeeId,
    }
    this.items.push(coffeeType)

    return coffeeType
  }

  async findById(coffeeTypeId: string) {
    const coffeeType = this.items.find((item) => item.id === coffeeTypeId)

    if (!coffeeType) {
      return null
    }

    return coffeeType
  }

  async findByName(coffeeTypeName: string) {
    const coffeeType = this.items.find((item) => item.name === coffeeTypeName)

    if (!coffeeType) {
      return null
    }

    return coffeeType
  }

  async findAll() {
    const coffeeTypes = this.items

    if (!coffeeTypes) {
      return null
    }

    return coffeeTypes
  }
}
