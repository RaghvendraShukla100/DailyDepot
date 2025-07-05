import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js"; // adjust if different
import { ROLES } from "../constants/roles.js";

export const loginUser = async (req, res) => {
  const { email, password, deviceToken } = req.body;

  const user = await User.findOne({ email });
  if (!user || !(await user.comparePassword(password))) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  if (deviceToken && !user.deviceTokens.includes(deviceToken)) {
    user.deviceTokens.push(deviceToken);
    await user.save();
  }

  const token = generateToken(user._id);

  res.status(200).json({
    message: "Login successful",
    user: {
      _id: user._id,
      email: user.email,
      role: user.role,
      name: user.name,
    },
    token,
  });
};
