import { describe, it, expect } from 'vitest'
import { compare } from 'bcryptjs'
import { RegisterUseCase } from './register'
describe('Register Use Case', () => {
  it('should hash user password upon registration', async () => {
    const registerUseCase = new RegisterUseCase({
      async create(data) {
        return {
          id: 'user-01',
          name: data.name,
          email: data.email,
          password_hash: data.password_hash,
          isAdmin: false,
          created_at: new Date(),
        }
      },
    })

    const { user } = await registerUseCase.execute({
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: '123456',
    })

    const isPasswordCorrectlyHashed = await compare(
      '123456',
      user.password_hash,
    )

    expect(isPasswordCorrectlyHashed).toBe(true)
  })
})
