import { Prisma, Review } from '@prisma/client'
import { CoffeeReviewsRepository } from '../coffee-reviews-repository'

export class InMemoryCoffeeReviewsRepository
  implements CoffeeReviewsRepository
{
  public items: Review[] = []

  async create(data: Prisma.ReviewUncheckedCreateInput) {
    const review = {
      id: 'review-1',
      description: data.description,
      rating: data.rating,
      created_at: new Date(),
      userId: data.userId,
      coffeeId: data.coffeeId,
    }
    this.items.push(review)

    return review
  }

  async findById(coffeeReviewId: string) {
    const review = this.items.find((item) => item.id === coffeeReviewId)

    if (!review) {
      return null
    }

    return review
  }
}
