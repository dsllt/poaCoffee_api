import { describe, it, expect, beforeEach } from 'vitest'
import { InMemoryFoodRepository } from '@/repositories/in-memory/in-memory-food-repository'
import { RegisterFoodUseCase } from './register-food'
import { FoodRepository } from '@/repositories/foods-repository'

let foodRepository: FoodRepository
let sut: RegisterFoodUseCase
describe('Register Food Use Case', () => {
  beforeEach(() => {
    foodRepository = new InMemoryFoodRepository()
    sut = new RegisterFoodUseCase(foodRepository)
  })

  it('should be able to register a coffee', async () => {
    const { food } = await sut.execute({
      name: 'Bagel',
      description: 'Crisp, shiny crust and a dense interior',
      image:
        'https://thebakerstake.com/wp-content/uploads/2018/12/bakerstake-bagels_68863785_930x450.jpg',
      coffeeId: '01010101',
    })

    expect(food.id).toEqual(expect.any(String))
  })
})
