import ApiError from "../utils/ApiError.js";

/**
 * Middleware to check if the admin's designation is allowed for the route.
 * @param  {...string} allowedDesignations - Allowed designations for the route (e.g., 'superadmin', 'admin').
 * @returns Express middleware
 */

const checkDesignation =
  (...allowedDesignations) =>
  (req, res, next) => {
    // console.log("designation : ", req.admin.designation);
    // console.log("allowed designation : ", allowedDesignations);

    const designation = req.admin?.designation || req.user?.designation;

    if (!designation) {
      return next(ApiError.forbidden("No admin designation found."));
    }

    if (!allowedDesignations.includes(designation)) {
      return next(
        ApiError.forbidden("Access denied: insufficient designation level.")
      );
    }

    next();
  };

export default checkDesignation;
