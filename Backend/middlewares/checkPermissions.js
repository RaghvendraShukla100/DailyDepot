// /backend/middlewares/checkPermissions.js

import { ROLE_PERMISSIONS } from "../constants/rolePermissions.js";
import ApiError from "../utils/ApiError.js";

const checkPermissions =
  (...requiredPermissions) =>
  (req, res, next) => {
    console.log(`designation : ${req.admin.designation}`);
    console.log(`required permissions : ${requiredPermissions}`);
    console.log(`Available permissions : ${req.admin.permissions}`);

    const hasPermission = requiredPermissions.every((perm) =>
      req.admin.permissions.includes(perm)
    );
    if (!hasPermission) {
      return next(ApiError.forbidden("Insufficient permissions."));
    }

    next();
  };

export default checkPermissions;
