export class NotAuthenticatedUserError extends Error {
  constructor() {
    super(
      'User not authenticated. Only authenticated users can reviews coffees.',
    )
  }
}
