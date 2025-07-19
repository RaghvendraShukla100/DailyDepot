// /backend/middlewares/validateResource.js

import ApiError from "../utils/ApiError.js";

/**
 * Zod-based request body validation middleware
 * Automatically parses JSON strings in multipart/form-data bodies for arrays/objects.
 * @param {ZodSchema} schema - Zod validation schema
 * @returns {function} Express middleware
 */
const validateResource = (schema) => (req, res, next) => {
  try {
    // 🩹 Pre-parse JSON strings if they look like arrays or objects
    for (const key in req.body) {
      if (typeof req.body[key] === "string") {
        const value = req.body[key].trim();
        if (
          (value.startsWith("{") && value.endsWith("}")) ||
          (value.startsWith("[") && value.endsWith("]"))
        ) {
          try {
            req.body[key] = JSON.parse(value);
          } catch {
            // skip, let Zod handle invalid JSON
          }
        }
      }
    }

    req.body = schema.parse(req.body);
    next();
  } catch (error) {
    const validationErrors = error.errors?.map((err) => ({
      path: err.path.join("."),
      message: err.message,
    })) || [{ message: error.message }];

    next(new ApiError(400, "Validation failed", validationErrors));
  }
};

export default validateResource;
