import { Prisma, Review } from '@prisma/client'
import { CoffeeReviewsRepository } from '../coffee-reviews-repository'

export class InMemoryCoffeeReviewsRepository
  implements CoffeeReviewsRepository
{
  public items: Review[] = []

  async create(data: Prisma.ReviewCreateInput) {
    const review = {
      id: 'review-1',
      description: data.description,
      rating: data.rating,
      created_at: new Date(),
      user: data.user,
      coffee: data.coffee,
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
