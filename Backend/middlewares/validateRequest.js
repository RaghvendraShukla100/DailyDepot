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
      const message = error.errors.map((err) => err.message).join(", ");
      return next(new ApiError(message, STATUS_CODES.BAD_REQUEST));
    }
    next(error);
  }
};

export default validateRequest;
