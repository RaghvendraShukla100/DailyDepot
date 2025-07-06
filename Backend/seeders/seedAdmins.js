import bcrypt from "bcryptjs";
import User from "../models/userSchema.js";
import Admin from "../models/adminSchema.js";

/**
 * Seed Admin:
 * Creates a default admin user linked with the Admin schema.
 */
const seedAdmin = async () => {
  try {
    console.log("🌱 Seeding Admin...");

    const adminEmail = process.env.ADMIN_EMAIL || "admin@example.com";
    const adminPassword = process.env.ADMIN_PASSWORD || "admin@123";
    const adminPhone = process.env.ADMIN_PHONE || "9999999999";

    // Check if a user with this email already exists
    let user = await User.findOne({ email: adminEmail });

    if (!user) {
      const hashedPassword = await bcrypt.hash(adminPassword, 12);
      user = await User.create({
        name: { first: "Super", last: "Admin" },
        email: adminEmail,
        phone: adminPhone,
        password: hashedPassword,
        role: "admin",
        isEmailVerified: true,
        status: "active",
      });
      console.log("✅ User document for admin created.");
    } else {
      console.log("⚠️ User with admin email already exists, reusing user.");
    }

    // Check if an Admin document linked to this user exists
    let admin = await Admin.findOne({ user: user._id });

    if (admin) {
      console.log("⚠️ Admin already exists, skipping creation.");
      console.table([
        {
          Email: adminEmail,
          Password: adminPassword,
          UserID: user._id.toString(),
          AdminID: admin._id.toString(),
          Status: "Already Exists",
        },
      ]);
      return;
    }

    admin = await Admin.create({
      user: user._id,
      role: "superadmin",
      permissions: ["all"],
      contactEmail: user.email,
      contactPhone: user.phone,
      isActive: true,
    });

    console.log("✅ Admin seeded successfully.");
    console.table([
      {
        Email: adminEmail,
        Password: adminPassword,
        UserID: user._id.toString(),
        AdminID: admin._id.toString(),
        Status: "Created",
      },
    ]);
  } catch (error) {
    console.error("❌ Error seeding admin:", error.message);
  }
};

export default seedAdmin;
