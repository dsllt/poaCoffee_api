import { describe, it, expect, beforeEach } from 'vitest'
import { CoffeeReviewsRepository } from '@/repositories/coffee-reviews-repository'
import { CoffeeReviewUseCase } from './coffee-review'
import { InMemoryCoffeeReviewsRepository } from '@/repositories/in-memory/in-memory-coffee-reviews-repository'
import { Prisma } from '@prisma/client'
import { NotAuthenticatedUserError } from './errors/user-not-authenticated-error'

let coffeeReviewsRepository: CoffeeReviewsRepository
let sut: CoffeeReviewUseCase
describe('Coffee Review Use Case', () => {
  beforeEach(() => {
    coffeeReviewsRepository = new InMemoryCoffeeReviewsRepository()
    sut = new CoffeeReviewUseCase(coffeeReviewsRepository)
  })

  it('should be able to review a coffee', async () => {
    const { review } = await sut.execute({
      description: 'Coffee really good',
      rating: new Prisma.Decimal(4.5),
      userId: 'user-01',
      coffeeId: 'coffee-01',
    })
    expect(review.id).toEqual(expect.any(String))
  })

  it('only logged users should be able to review a coffee', async () => {
    await expect(() =>
      sut.execute({
        description: 'Coffee really good',
        rating: new Prisma.Decimal(4.5),
        userId: '',
        coffeeId: 'coffee-01',
      }),
    ).rejects.toBeInstanceOf(NotAuthenticatedUserError)
  })
})
