class ApiError extends Error {
  constructor(
    statusCode,
    message = "Something went wrong",
    errors = [],
    statck = ""
  ) {
    super(message);
    this.statusCode = statusCode;
    this.data = null; // Why we keep this as null? Read about it
    this.message = message;
    this.success = false;
    this.errors = errors;

    if (stack) {
      this.stack = statck;
    } else {
      Error.captureStackTrace(this, this.contructor);
    }
  }
}

export default ApiError