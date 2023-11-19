export class CoffeeTypeAlreadyExistsError extends Error {
  constructor() {
    super('Coffee type already exists.')
  }
}
