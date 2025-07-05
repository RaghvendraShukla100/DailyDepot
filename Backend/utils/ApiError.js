// /backend/utils/ApiError.js

class ApiError extends Error {
  /**
   * Creates a structured API error.
   * @param {number} statusCode - HTTP status code (e.g., 404, 500).
   * @param {string} message - User-friendly error message.
   * @param {Array|Object} errors - Optional validation or detailed errors.
   * @param {string} stack - Optional stack trace for debugging.
   * @param {string} code - Optional application-specific error code (e.g., 'USER_NOT_FOUND').
   */
  constructor(statusCode, message, errors = [], stack = "", code = "") {
    super(message);

    this.statusCode = statusCode;
    this.message = message || "An unexpected error occurred.";
    this.errors = Array.isArray(errors) ? errors : [errors]; // Normalize to array
    this.code = code; // Optional internal error code

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }

  /**
   * Factory method for validation errors (e.g., Zod, Joi, Mongoose).
   * @param {Array|Object|string} validationErrors - Validation error(s).
   */
  static validationError(validationErrors) {
    return new ApiError(400, "Validation Failed", validationErrors);
  }

  /**
   * Factory method for unauthorized access.
   * @param {string} message - Optional custom message.
   */
  static unauthorized(message = "Unauthorized") {
    return new ApiError(401, message);
  }

  /**
   * Factory method for forbidden access.
   * @param {string} message - Optional custom message.
   */
  static forbidden(message = "Forbidden") {
    return new ApiError(403, message);
  }

  /**
   * Factory method for resource not found.
   * @param {string} resource - The name of the missing resource.
   */
  static notFound(resource = "Resource") {
    return new ApiError(404, `${resource} not found.`);
  }

  /**
   * Factory method for conflict errors (e.g., duplicate records).
   * @param {string} message - Optional custom message.
   */
  static conflict(message = "Conflict detected") {
    return new ApiError(409, message);
  }

  /**
   * Factory method for internal server errors.
   * @param {string} message - Optional custom message.
   */
  static internal(message = "Internal Server Error") {
    return new ApiError(500, message);
  }
}

export default ApiError;
