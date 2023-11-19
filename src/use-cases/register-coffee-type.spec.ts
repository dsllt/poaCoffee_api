import { describe, it, expect, beforeEach } from 'vitest'
import { CoffeeTypesRepository } from '@/repositories/coffee-types-repository'
import { RegisterCoffeeTypeUseCase } from './register-coffee-type'
import { InMemoryCoffeeTypesRepository } from '@/repositories/in-memory/in-memory-coffee-types-repository'

let coffeeTypesRepository: CoffeeTypesRepository
let sut: RegisterCoffeeTypeUseCase
describe('Register Coffee Type Use Case', () => {
  beforeEach(() => {
    coffeeTypesRepository = new InMemoryCoffeeTypesRepository()
    sut = new RegisterCoffeeTypeUseCase(coffeeTypesRepository)
  })

  it('should be able to register a coffee', async () => {
    const { coffeeType } = await sut.execute({
      name: 'Expresso',
      description: 'Strong coffee',
      image:
        'https://dhg1h5j42swfq.cloudfront.net/2017/01/18142635/caf%C3%A9-expresso.png',
      coffeeId: '01010101',
    })

    expect(coffeeType.id).toEqual(expect.any(String))
  })
})
