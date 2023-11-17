import { Coffee } from '@prisma/client'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { CoffeesRepository } from '@/repositories/coffee-repository'


interface GetCoffeesUseCaseResponse {
  coffees: Coffee[]
}

export class GetCoffeesUseCase {
  constructor(private coffeesRepository: CoffeesRepository) {}

  async execute(): Promise<GetCoffeesUseCaseResponse> {
    const coffees = await this.coffeesRepository.findAll()

    if (!coffees) {
      throw new ResourceNotFoundError()
    }

    return { coffees }
  }
}
