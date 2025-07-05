// /backend/utils/generateToken.js

import jwt from "jsonwebtoken";

export const generateToken = (payload, expiresIn = "7d") => {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn });
};
