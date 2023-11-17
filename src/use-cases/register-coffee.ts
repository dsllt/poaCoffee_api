import { Coffee } from '@prisma/client'
import { Decimal } from '@prisma/client/runtime/library'
import { CoffeeRepository } from '@/repositories/coffee-repository'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'

interface RegisterCoffeeUseCaseProps {
  name: string
  description?: string
  phone?: string
  address: string
  latitude: Decimal
  longitude: Decimal
  isAdmin: boolean
}
interface RegisterCoffeeUseCaseResponse {
  coffee: Coffee
}
export class RegisterCoffeeUseCase {
  constructor(private coffeesRepository: CoffeeRepository) {}
  async execute({
    name,
    description,
    phone,
    address,
    latitude,
    longitude,
    isAdmin
  }: RegisterCoffeeUseCaseProps): Promise<RegisterCoffeeUseCaseResponse> {
    
    if (!isAdmin){
      throw new InvalidCredentialsError()
    }
    const coffee = await this.coffeesRepository.create({
      name,
      description,
      phone,
      address,
      latitude,
      longitude,
    })

    return { coffee }
  }
}
