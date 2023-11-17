import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryCoffeesRepository } from '@/repositories/in-memory/in-memory-coffee-repository'
import { GetCoffeeUseCase } from './get-coffee'
import { Prisma } from '@prisma/client'
import { GetCoffeesUseCase } from './get-coffees'

let coffeesRepository: InMemoryCoffeesRepository
let sut: GetCoffeesUseCase
describe('Get Coffees Use Case', () => {
  beforeEach(() => {
    coffeesRepository = new InMemoryCoffeesRepository()
    sut = new GetCoffeesUseCase(coffeesRepository)
  })

  it('should be able to get coffee by name', async () => {
    await coffeesRepository.create({
      name: 'The Coffee',
      description: 'Really cool open coffee',
      phone: '51 3040-4040',
      address: 'Rua Felipe Camarão, 345',
      latitude: new Prisma.Decimal(10.456),
      longitude: new Prisma.Decimal(54.987),
    })
    await coffeesRepository.create({
      name: 'The Coffee 1',
      description: 'Other cool open coffee',
      phone: '51 3040-4141',
      address: 'Rua Felipe Camarão, 435',
      latitude: new Prisma.Decimal(10.546),
      longitude: new Prisma.Decimal(54.978),
    })
    await coffeesRepository.create({
      name: 'The Coffee 2',
      description: 'Another cool open coffee',
      phone: '51 3040-4242',
      address: 'Rua Felipe Camarão, 543',
      latitude: new Prisma.Decimal(10.654),
      longitude: new Prisma.Decimal(54.879),
    })

    const { coffees } = await sut.execute()

    expect(coffees).toHaveLength(3)
  })


})
