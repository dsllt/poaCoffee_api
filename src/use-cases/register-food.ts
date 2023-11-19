import { Food } from '@prisma/client'
import { FoodRepository } from '@/repositories/foods-repository'

interface RegisterFoodUseCaseProps {
  name: string
  description?: string
  image: string
  coffeeId: string
}
interface RegisterFoodUseCaseResponse {
  food: Food
}
export class RegisterFoodUseCase {
  constructor(private foodRepository: FoodRepository) {}
  async execute({
    name,
    description,
    image,
    coffeeId,
  }: RegisterFoodUseCaseProps): Promise<RegisterFoodUseCaseResponse> {
    const food = await this.foodRepository.create({
      name,
      description,
      image,
      coffeeId,
    })

    return { food }
  }
}
