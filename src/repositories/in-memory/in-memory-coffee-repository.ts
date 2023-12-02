/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Coffee, Prisma } from '@prisma/client'
import { CoffeesRepository } from '../coffee-repository'

export class InMemoryCoffeesRepository implements CoffeesRepository {
  public items: Coffee[] = []

  async create(data: Prisma.CoffeeCreateInput) {
    const coffee = {
      id: 'coffee-1',
      name: data.name,
      description: data!.description!,
      phone: data!.phone!,
      imageUrl: data!.imageUrl!,
      address: data.address,
      latitude: data.latitude,
      longitude: data.longitude,
      rating: data!.rating!,
      slug: data.slug,
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

  async findByName(coffeeName: string) {
    const coffee = this.items.find((item) => item.name === coffeeName)

    if (!coffee) {
      return null
    }

    return coffee
  }

  async findAll() {
    const coffees = this.items

    if (!coffees) {
      return null
    }

    return coffees
  }
}
