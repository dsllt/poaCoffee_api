import { Coffee } from '@prisma/client'
import { CoffeesRepository } from '@/repositories/coffee-repository'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'

interface RegisterCoffeeUseCaseProps {
  name: string
  description?: string
  phone?: string
  address: string
  image: string
  latitude: number
  longitude: number
  isAdmin: boolean
}
interface RegisterCoffeeUseCaseResponse {
  coffee: Coffee
}
export class RegisterCoffeeUseCase {
  constructor(private coffeesRepository: CoffeesRepository) {}
  async execute({
    name,
    description,
    phone,
    address,
    latitude,
    longitude,
    isAdmin,
  }: RegisterCoffeeUseCaseProps): Promise<RegisterCoffeeUseCaseResponse> {
    if (!isAdmin) {
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
