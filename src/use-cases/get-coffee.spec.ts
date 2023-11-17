import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { hash } from 'bcryptjs'
import { GetUserProfileUseCase } from './get-user-profile'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { InMemoryCoffeesRepository } from '@/repositories/in-memory/in-memory-coffee-repository'
import { GetCoffeeUseCase } from './get-coffee'
import { Prisma } from '@prisma/client'

let coffeesRepository: InMemoryCoffeesRepository
let sut: GetCoffeeUseCase
describe('Get Coffee Use Case', () => {
  beforeEach(() => {
    coffeesRepository = new InMemoryCoffeesRepository()
    sut = new GetCoffeeUseCase(coffeesRepository)
  })

  it('should be able to get coffee by name', async () => {
    const newCoffee = await coffeesRepository.create({
      name: 'The Coffee',
      description: 'Really cool open coffee',
      phone: '51 3040-4040',
      address: 'Rua Felipe Camarão, 345',
      latitude: new Prisma.Decimal(10.456),
      longitude: new Prisma.Decimal(54.987),
    })

    const { coffee } = await sut.execute({
      coffeeName: newCoffee.name,
    })

    expect(coffee.name).toEqual('The Coffee')
  })


})
