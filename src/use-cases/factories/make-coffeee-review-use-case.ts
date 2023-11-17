import { PrismaCoffeeReviewsRepository } from '@/repositories/prisma/prisma-coffee-reviews-repository'
import { CoffeeReviewUseCase } from '../coffee-review'

export function makeCoffeeReviewUseCase() {
  const reviewsRepository = new PrismaCoffeeReviewsRepository()
  const coffeeReviewUseCase = new CoffeeReviewUseCase(reviewsRepository)

  return coffeeReviewUseCase
}
