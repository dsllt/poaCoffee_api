import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import { CoffeeReviewsRepository } from '../coffee-reviews-repository'

export class PrismaCoffeeReviewsRepository implements CoffeeReviewsRepository {
  async create(data: Prisma.ReviewUncheckedCreateInput) {
    const review = await prisma.review.create({ data })

    return review
  }

  async findById(coffeeReviewId: string) {
    const review = await prisma.review.findUnique({
      where: {
        id: coffeeReviewId,
      },
    })

    return review
  }
}
