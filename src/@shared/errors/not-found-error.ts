export class NotFoundError extends Error {
  constructor() {
    super("NotFoundError");
    this.name = "NotFoundError";
  }
}
