// /backend/constants/messages.js

export const MESSAGES = Object.freeze({
  AUTH: {
    LOGIN_SUCCESS: "Login successful.",
    LOGIN_FAIL: "Invalid email or password.",
    REGISTER_SUCCESS: "Registration successful.",
    UNAUTHORIZED: "You are not authorized to perform this action.",
    TOKEN_MISSING: "Token missing from request.",
    TOKEN_INVALID: "Invalid or expired token.",
    EMAIL_PASSWORD_REQUIRED: "Email and password are required.",
    PASSWORD_MISSING_IN_DB:
      "Password missing in user record. Please contact support.",
  },

  USER: {
    NOT_FOUND: "User not found.",
    ALREADY_EXISTS: "User with this email already exists.",
  },

  SELLER: {
    NOT_FOUND: "Seller not found.",
    ALREADY_EXISTS: "Seller already exists.",
    CREATED_SUCCESS: "Seller created successfully.",
    UPDATED_SUCCESS: "Seller updated successfully.",
    DELETED_SUCCESS: "Seller deleted successfully.",
    FETCHED_SUCCESS: "Sellers fetched successfully.",
  },

  ADMIN: {
    NOT_FOUND: "Admin not found.",
  },

  ADDRESS: {
    FETCHED_SUCCESS: "Addresses fetched successfully.",
    RETRIEVED_SUCCESS: "Address fetched successfully.",
    CREATED_SUCCESS: "Address created successfully.",
    UPDATED_SUCCESS: "Address updated successfully.",
    DELETED_SUCCESS: "Address deleted successfully.",
  },

  PAYMENT: {
    CREATED_SUCCESS: "Payment recorded successfully.",
    FETCHED_SUCCESS: "Payments fetched successfully.",
    RETRIEVED_SUCCESS: "Payment retrieved successfully.",
    UPDATED_SUCCESS: "Payment updated successfully.",
    DELETED_SUCCESS: "Payment deleted successfully.",
    NOT_FOUND: "Payment not found.",
    TRANSACTION_ID_EXISTS: "Transaction ID already exists.",
    MISSING_REQUIRED_FIELDS: "Missing required payment fields.",
    UNAUTHORIZED_ACCESS: "Unauthorized to access this payment.",
  },

  ORDER: {
    CREATED_SUCCESS: "Order placed successfully.",
    FETCHED_SUCCESS: "Orders fetched successfully.",
    RETRIEVED_SUCCESS: "Order retrieved successfully.",
    UPDATED_SUCCESS: "Order updated successfully.",
    STATUS_UPDATED: "Order status updated successfully.",
    PAYMENT_STATUS_UPDATED: "Payment status updated successfully.",
    DELETED_SUCCESS: "Order deleted successfully.",
    NOT_FOUND: "Order not found.",
    UNAUTHORIZED_ACCESS: "Unauthorized to access this order.",
    NO_ITEMS_PROVIDED: "No order items provided.",
    INSUFFICIENT_STOCK: "Insufficient stock for the requested product.",
  },

  COUPON: {
    CREATED_SUCCESS: "Coupon created successfully.",
    FETCHED_SUCCESS: "Coupons fetched successfully.",
    FETCHED_SINGLE_SUCCESS: "Coupon fetched successfully.",
    UPDATED_SUCCESS: "Coupon updated successfully.",
    DELETED_SUCCESS: "Coupon deleted successfully.",
    NOT_FOUND: "Coupon not found.",
    ALREADY_EXISTS: "Coupon with this code already exists.",
  },
  CATEGORY: {
    CREATED_SUCCESS: "Category created successfully.",
    FETCHED_SUCCESS: "Categories fetched successfully.",
    RETRIEVED_SUCCESS: "Category fetched successfully.",
    UPDATED_SUCCESS: "Category updated successfully.",
    DELETED_SUCCESS: "Category deleted successfully.",
    NOT_FOUND: "Category not found.",
  },
  BRAND: {
    CREATED_SUCCESS: "Brand created successfully.",
    ALL_FETCHED: "All brands fetched successfully.",
    FETCHED_SUCCESS: "Brand fetched successfully.",
    UPDATED_SUCCESS: "Brand updated successfully.",
    DELETED_SUCCESS: "Brand deleted successfully.",
    NOT_FOUND: "Brand not found.",
  },
  WISHLIST: {
    CREATED_SUCCESS: "Wishlist created successfully.",
    FETCHED_SUCCESS: "Wishlists fetched successfully.",
    RETRIEVED_SUCCESS: "Wishlist retrieved successfully.",
    UPDATED_SUCCESS: "Wishlist updated successfully.",
    DELETED_SUCCESS: "Wishlist deleted successfully.",
    PRODUCT_ADDED: "Product added to wishlist.",
    PRODUCT_REMOVED: "Product removed from wishlist.",
    PRODUCT_ALREADY_EXISTS: "Product already in wishlist.",
    PRODUCT_NOT_FOUND: "Product not found in wishlist.",
    NOT_FOUND: "Wishlist not found.",
  },

  PRODUCT: {
    NOT_FOUND: "Product not found.",
    OUT_OF_STOCK: "Insufficient stock for product.",
    FETCHED_SUCCESS: "Products fetched successfully.",
  },

  ANALYTICS: {
    CREATED_SUCCESS: "Analytics event recorded successfully.",
    FETCHED_SUCCESS: "Analytics data fetched successfully.",
    DELETED_SUCCESS: "Analytics event deleted successfully.",
    NOT_FOUND: "Analytics data not found.",
  },

  INVENTORY: {
    CREATED_SUCCESS: "Inventory created successfully.",
    FETCHED_SUCCESS: "Inventories fetched successfully.",
    RETRIEVED_SUCCESS: "Inventory fetched successfully.",
    UPDATED_SUCCESS: "Inventory updated successfully.",
    DELETED_SUCCESS: "Inventory deleted successfully.",
    NOT_FOUND: "Inventory not found.",
  },

  FINANCE: {
    CREATED_SUCCESS: "Finance record created successfully.",
    FETCHED_SUCCESS: "Finance records fetched successfully.",
    RETRIEVED_SUCCESS: "Finance record fetched successfully.",
    UPDATED_SUCCESS: "Finance record updated successfully.",
    DELETED_SUCCESS: "Finance record deleted successfully.",
    NOT_FOUND: "Finance record not found.",
  },

  SUPPORT: {
    CREATED_SUCCESS: "Support profile created successfully.",
    FETCHED_SUCCESS: "Support profiles fetched successfully.",
    RETRIEVED_SUCCESS: "Support profile fetched successfully.",
    UPDATED_SUCCESS: "Support profile updated successfully.",
    DELETED_SUCCESS: "Support profile deleted successfully.",
  },

  VALIDATION: {
    REQUIRED_FIELDS_MISSING: "Required fields are missing.",
    INVALID_EMAIL: "Invalid email address.",
    PASSWORD_TOO_SHORT: "Password must be at least 8 characters.",
    INVALID_ID: "Invalid ID provided.",
  },

  GENERAL: {
    SERVER_ERROR: "Something went wrong, please try again later.",
    BAD_REQUEST: "Bad request.",
  },
});
