/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Coffee, Prisma } from '@prisma/client'
import { CoffeeRepository } from '../coffee-repository'

export class InMemoryCoffeeRepository implements CoffeeRepository {
  public items: Coffee[] = []

  async create(data: Prisma.CoffeeCreateInput) {
    const coffee = {
      id: 'coffee-1',
      name: data.name,
      description: data!.description!,
      phone: data!.phone!,
      address: data.address,
      latitude: data.latitude,
      longitude: data.longitude,
      created_at: new Date(),
    }
    this.items.push(coffee)

    return coffee
  }

  async findById(coffeeId: string) {
    const coffee = this.items.find((item) => item.id === coffeeId)

    if (!coffee) {
      return null
    }

    return coffee
  }
}
