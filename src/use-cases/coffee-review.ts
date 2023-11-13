import { Review } from '@prisma/client'
import { CoffeeReviewsRepository } from '@/repositories/coffee-reviews-repository'
import { Decimal } from '@prisma/client/runtime/library'
import { NotAuthenticatedUserError } from './errors/user-not-authenticated-error'

interface CoffeeReviewUseCaseProps {
  description: string
  rating: Decimal
  userId: string
  coffeeId: string
}

interface CoffeeReviewUseCaseResponse {
  review: Review
}
export class CoffeeReviewUseCase {
  constructor(private coffeeReviewsRepository: CoffeeReviewsRepository) {}
  async execute({
    description,
    rating,
    userId,
    coffeeId,
  }: CoffeeReviewUseCaseProps): Promise<CoffeeReviewUseCaseResponse> {
    if (userId === '') {
      throw new NotAuthenticatedUserError()
    }
    const review = await this.coffeeReviewsRepository.create({
      description,
      rating,
      userId,
      coffeeId,
    })

    return { review }
  }
}
