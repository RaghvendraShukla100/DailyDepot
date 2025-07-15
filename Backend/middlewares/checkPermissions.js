// /backend/middlewares/checkPermissions.js

import { ROLE_PERMISSIONS } from "../constants/rolePermissions.js";
import ApiError from "../utils/ApiError.js";

const checkPermissions =
  (...requiredPermissions) =>
  (req, res, next) => {
    const role = req.user.role;
    const rolePerms = ROLE_PERMISSIONS[role]?.can || [];

    const hasPermission = requiredPermissions.every((perm) =>
      rolePerms.includes(perm)
    );

    if (!hasPermission) {
      return next(ApiError.forbidden("Insufficient permissions."));
    }

    next();
  };

export default checkPermissions;
