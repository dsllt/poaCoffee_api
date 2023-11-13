import { Prisma, Review } from '@prisma/client'

export interface CoffeeReviewsRepository {
  create(data: Prisma.ReviewUncheckedCreateInput): Promise<Review>
  findById(coffeeReviewId: string): Promise<Review | null>
}
