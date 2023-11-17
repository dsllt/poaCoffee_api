export class CoffeeAlreadyExistsError extends Error {
  constructor() {
    super('Coffee already exists.')
  }
}
