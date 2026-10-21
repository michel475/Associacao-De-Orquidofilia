export class DatabaseOperationError extends Error {
  constructor(
    message: string,
    public readonly code?: string,
    options?: ErrorOptions,
  ) {
    super(message, options);
    this.name = DatabaseOperationError.name;
  }
}
