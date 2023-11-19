export class FoodAlreadyExistsError extends Error {
  constructor() {
    super('Food already exists.')
  }
}
