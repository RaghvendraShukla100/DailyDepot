// /backend/constants/messages.js

export const MESSAGES = Object.freeze({
  AUTH: {
    LOGIN_SUCCESS: "Login successful.",
    LOGIN_FAIL: "Invalid email or password.",
    REGISTER_SUCCESS: "Registration successful.",
    UNAUTHORIZED: "You are not authorized to perform this action.",
    TOKEN_MISSING: "Token missing from request.",
    TOKEN_INVALID: "Invalid or expired token.",
  },
  USER: {
    NOT_FOUND: "User not found.",
    ALREADY_EXISTS: "User with this email already exists.",
  },
  SELLER: {
    NOT_FOUND: "Seller not found.",
  },
  ADMIN: {
    NOT_FOUND: "Admin not found.",
  },
  GENERAL: {
    SERVER_ERROR: "Something went wrong, please try again later.",
    BAD_REQUEST: "Bad request.",
  },
});
