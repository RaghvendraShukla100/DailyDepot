class ApiError extends Error {
  constructor(statusCode, message, errors = [], stack = "", code = "") {
    super(message);
    this.statusCode = statusCode;
    this.message = message || "An unexpected error occurred.";
    this.errors = Array.isArray(errors) ? errors : [errors];
    this.code = code;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }

  static badRequest(message = "Bad Request") {
    return new ApiError(400, message);
  }

  static validationError(validationErrors) {
    return new ApiError(400, "Validation failed", validationErrors);
  }

  static unauthorized(message = "Unauthorized") {
    return new ApiError(401, message);
  }

  static forbidden(message = "Forbidden") {
    return new ApiError(403, message);
  }

  static notFound(resource = "Resource") {
    return new ApiError(404, `${resource} not found`);
  }

  static conflict(message = "Conflict detected") {
    return new ApiError(409, message);
  }

  static internal(message = "Internal server error") {
    return new ApiError(500, message);
  }
}

export default ApiError;
