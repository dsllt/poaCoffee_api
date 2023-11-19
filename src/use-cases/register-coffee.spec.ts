import { describe, it, expect, beforeEach } from 'vitest'
import { CoffeesRepository } from '@/repositories/coffee-repository'
import { InMemoryCoffeesRepository } from '@/repositories/in-memory/in-memory-coffee-repository'
import { RegisterCoffeeUseCase } from './register-coffee'
import { Prisma } from '@prisma/client'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { AuthenticateUseCase } from './authenticate'
import { hash } from 'bcryptjs'

let coffeesRepository: CoffeesRepository
let sut: RegisterCoffeeUseCase
describe('Register Coffee Use Case', () => {
  beforeEach(() => {
    coffeesRepository = new InMemoryCoffeesRepository()
    sut = new RegisterCoffeeUseCase(coffeesRepository)
  })

  it('should be able to register a coffee', async () => {
    const { coffee } = await sut.execute({
      name: 'The Coffee',
      description: 'Really cool open coffee',
      phone: '51 3040-4040',
      image: '',
      address: 'Rua Felipe Camarão, 345',
      latitude: new Prisma.Decimal(10.456),
      longitude: new Prisma.Decimal(54.987),
      isAdmin: true,
    })

    expect(coffee.id).toEqual(expect.any(String))
  })

  it('only administrator should be able to register a coffee', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const authenticaUseCase = new AuthenticateUseCase(usersRepository)
    usersRepository.create({
      name: 'John Doe',
      email: 'john.doe@example.com',
      password_hash: await hash('123456', 6),
      isAdmin: true,
    })

    const { user } = await authenticaUseCase.execute({
      email: 'john.doe@example.com',
      password: '123456',
    })

    const { coffee } = await sut.execute({
      name: 'The Coffee',
      description: 'Really cool open coffee',
      phone: '51 3040-4040',
      image: '',
      address: 'Rua Felipe Camarão, 345',
      latitude: new Prisma.Decimal(10.456),
      longitude: new Prisma.Decimal(54.987),
      isAdmin: user.isAdmin,
    })

    expect(coffee.id).toEqual(expect.any(String))
  })
})
