import { MESSAGES } from "../constants/messages.js";
import { ROLES } from "../constants/roles.js";
import ApiError from "../utils/ApiError.js";

const productUpdateAuthorization = (req, res, next) => {
  const data = req.body;
  const productId = req.params.id;
  const files = req.files;
  const user = req.user;
  const product_createdById = data.createdBy;

  if (user.role === ROLES.ADMIN) {
    // Admins can update any product
    return next();
  }

  // Only the creator (seller) of the product can update it
  if (product_createdById == user.id) {
    return next();
  }

  throw new ApiError(403, MESSAGES.AUTH.UNAUTHORIZED);
};

export default productUpdateAuthorization;
