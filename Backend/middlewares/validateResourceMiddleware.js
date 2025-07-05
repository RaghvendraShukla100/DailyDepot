// /backend/middlewares/validateResourceMiddleware.js

import ApiError from "../utils/ApiError.js";

/**
 * Zod-based request body validation middleware
 * @param {ZodSchema} schema - Zod validation schema
 * @returns {function} Express middleware
 */
const validateResource = (schema) => (req, res, next) => {
  try {
    req.body = schema.parse(req.body);
    next();
  } catch (error) {
    // For consistent error handling across your app using ApiError
    const validationErrors = error.errors?.map((err) => ({
      path: err.path.join("."),
      message: err.message,
    })) || [{ message: error.message }];

    next(new ApiError(400, "Validation failed", validationErrors));
  }
};

export default validateResource;
