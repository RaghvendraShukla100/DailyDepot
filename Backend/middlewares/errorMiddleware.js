export const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

export const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

  res.status(statusCode).json({
    message: err.message || "Internal Server Error",
    errors: err.errors || undefined, // 👈 includes Zod validation errors if present
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};
