import mongoose from "mongoose";
import User from "../models/userModel.js";
import Seller from "../models/sellerModel.js";
import Admin from "../models/adminModel.js";
import { ROLES } from "../constants/roles.js";

// Create Seller and User atomically
export const createSellerWithUser = async (userData, sellerData) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const user = await User.create([{ ...userData, role: ROLES.SELLER }], {
      session,
    });
    const seller = await Seller.create([{ ...sellerData, user: user[0]._id }], {
      session,
    });

    await session.commitTransaction();
    session.endSession();

    return { user: user[0], seller: seller[0] };
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};

// Create Admin and User atomically
export const createAdminWithUser = async (userData, adminData) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const user = await User.create([{ ...userData, role: ROLES.ADMIN }], {
      session,
    });
    const admin = await Admin.create([{ ...adminData, user: user[0]._id }], {
      session,
    });

    await session.commitTransaction();
    session.endSession();

    return { user: user[0], admin: admin[0] };
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};
