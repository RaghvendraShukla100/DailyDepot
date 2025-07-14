import { ZodError } from "zod";
import ApiError from "../utils/ApiError.js";
import { STATUS_CODES } from "../constants/statusCodes.js";

/**
 * validateRequest middleware to validate request body using Zod schema
 * @param {ZodSchema} schema
 */
const validateRequest = (schema) => (req, res, next) => {
  try {
    schema.parse(req.body);
    next();
  } catch (error) {
    if (error instanceof ZodError) {
      const formattedErrors = error.errors.map((err) => ({
        path: err.path.join("."),
        message: err.message,
      }));

      return next(
        new ApiError(
          STATUS_CODES.BAD_REQUEST,
          "Validation failed",
          formattedErrors
        )
      );
    }
    next(error);
  }
};

export default validateRequest;
