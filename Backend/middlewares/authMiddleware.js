import jwt from "jsonwebtoken";
import User from "../models/userSchema.js";
import Seller from "../models/sellerSchema.js";
import Admin from "../models/adminSchema.js";

// Protect: verify JWT and attach user
export const protect = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token)
      return res.status(401).json({ message: "Not authorized, token missing" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");
    if (!user)
      return res
        .status(401)
        .json({ message: "Not authorized, user not found" });

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: "Not authorized, token failed" });
  }
};

// Role-based access control
export const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res
        .status(403)
        .json({ message: "Forbidden: insufficient permissions" });
    }
    next();
  };
};

// Attach seller profile
export const attachSellerProfile = async (req, res, next) => {
  if (req.user.role !== "seller")
    return res.status(403).json({ message: "Seller role required" });
  const seller = await Seller.findOne({ user: req.user._id });
  if (!seller)
    return res.status(404).json({ message: "Seller profile not found" });
  req.seller = seller;
  next();
};

// Attach admin profile
export const attachAdminProfile = async (req, res, next) => {
  if (req.user.role !== "admin")
    return res.status(403).json({ message: "Admin role required" });
  const admin = await Admin.findOne({ user: req.user._id });
  if (!admin)
    return res.status(404).json({ message: "Admin profile not found" });
  req.admin = admin;
  next();
};
