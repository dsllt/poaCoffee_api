import { Coffee } from '@prisma/client'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { CoffeesRepository } from '@/repositories/coffee-repository'

interface GetCoffeeeUseCaseRequest {
  coffeeName: string
}
interface GetCoffeeeUseCaseResponse {
  coffee: Coffee
}

export class GetCoffeeUseCase {
  constructor(private coffeesRepository: CoffeesRepository) {}

  async execute({
    coffeeName,
  }: GetCoffeeeUseCaseRequest): Promise<GetCoffeeeUseCaseResponse> {
    const coffee = await this.coffeesRepository.findByName(coffeeName)

    if (!coffee) {
      throw new ResourceNotFoundError()
    }

    return { coffee }
  }
}
