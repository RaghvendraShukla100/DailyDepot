import Seller from "../models/sellerSchema.js";
import User from "../models/userSchema.js";
import Address from "../models/addressSchema.js";

/**
 * Seed Sellers:
 * Creates demo seller records linked to users with the 'seller' role for storefront and dashboard testing.
 */

const seedSellers = async () => {
  try {
    console.log("🌱 Seeding Sellers...");

    // Optional: prevent accidental reseeding in production
    if (process.env.NODE_ENV === "production") {
      console.log("⚠️ Seeding sellers is disabled in production.");
      process.exit(0);
    }

    // Clear existing sellers for clean seeding
    await Seller.deleteMany();

    // Fetch users with role 'seller'
    const sellerUsers = await User.find({ role: "seller" });

    if (!sellerUsers.length) {
      console.log(
        "⚠️ No users with 'seller' role found. Please seed users first."
      );
      return;
    }

    // Fetch or leave address as null
    const defaultAddress = await Address.findOne();

    const sellersToInsert = sellerUsers.map((user, index) => ({
      user: user._id,
      storeName: `Demo Store ${index + 1}`,
      storeDescription: `This is a demo store description for seller ${
        index + 1
      }.`,
      logoUrl: `https://via.placeholder.com/150?text=Logo+${index + 1}`,
      bannerUrl: `https://via.placeholder.com/600x200?text=Banner+${index + 1}`,
      gstNumber: `GSTIN12345${index}`,
      panNumber: `PAN12345${index}`,
      documents: [
        {
          type: "gst_certificate",
          url: `https://via.placeholder.com/100?text=GST+${index + 1}`,
          verified: true,
        },
      ],
      bankAccount: {
        accountHolderName: `Seller ${index + 1}`,
        accountNumber: `123456789${index}`,
        ifscCode: `IFSC000${index}`,
        bankName: "Demo Bank",
        branchName: "Main Branch",
        upiId: `seller${index + 1}@upi`,
      },
      address: defaultAddress ? defaultAddress._id : undefined,
      contactEmail: user.email,
      contactPhone: user.phone || `90000000${index}`,
      supportContact: `90000000${index}`,
      isVerified: true,
      verifiedAt: new Date(),
      rating: 4.5,
      totalReviews: 10 + index,
      totalProducts: 20 + index,
      totalSales: 100 + index,
      status: "active",
      deleted: false,
    }));

    const insertedSellers = await Seller.insertMany(sellersToInsert);

    console.table(
      insertedSellers.map((seller) => ({
        Store: seller.storeName,
        Email: seller.contactEmail,
        Verified: seller.isVerified,
        Products: seller.totalProducts,
        Sales: seller.totalSales,
      }))
    );

    console.log(`✅ Seeded ${insertedSellers.length} sellers successfully.`);
  } catch (error) {
    console.error("❌ Error seeding sellers:", error);
  }
};

export default seedSellers;
