import { CoffeeType } from '@prisma/client'
import { CoffeeTypesRepository } from '@/repositories/coffee-types-repository'

interface RegisterCoffeeTypeUseCaseProps {
  name: string
  description?: string
  image: string
  coffeeId: string
}
interface RegisterCoffeeTypeUseCaseResponse {
  coffeeType: CoffeeType
}
export class RegisterCoffeeTypeUseCase {
  constructor(private coffeeTypesRepository: CoffeeTypesRepository) {}
  async execute({
    name,
    description,
    image,
    coffeeId,
  }: RegisterCoffeeTypeUseCaseProps): Promise<RegisterCoffeeTypeUseCaseResponse> {
    const coffeeType = await this.coffeeTypesRepository.create({
      name,
      description,
      image,
      coffeeId,
    })

    return { coffeeType }
  }
}
