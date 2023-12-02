import { Coffee } from '@prisma/client'
import { CoffeesRepository } from '@/repositories/coffee-repository'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'

interface RegisterCoffeeUseCaseProps {
  name: string
  description?: string
  phone?: string
  address: string
  imageUrl: string
  latitude: number
  longitude: number
  rating: number
  slug: string
  isAdmin: boolean
}
interface RegisterCoffeeUseCaseResponse {
  coffee: Coffee
}
export class RegisterCoffeeUseCase {
  constructor(private coffeesRepository: CoffeesRepository) {}
  async execute({
    name,
    imageUrl,
    description,
    phone,
    address,
    latitude,
    longitude,
    rating,
    slug,
    isAdmin,
  }: RegisterCoffeeUseCaseProps): Promise<RegisterCoffeeUseCaseResponse> {
    if (!isAdmin) {
      throw new InvalidCredentialsError()
    }
    const coffee = await this.coffeesRepository.create({
      name,
      imageUrl,
      description,
      phone,
      address,
      latitude,
      longitude,
      rating,
      slug,
    })

    return { coffee }
  }
}
