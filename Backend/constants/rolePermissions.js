// /backend/constants/rolePermissions.js

export const ROLE_PERMISSIONS = Object.freeze({
  SUPER_ADMIN: Object.freeze([
    "manage_users",
    "manage_orders",
    "manage_products",
    "manage_admins",
    "manage_superadmin",
    "manage_support",
    "manage_payments",
  ]),
  ADMIN: Object.freeze([
    "manage_orders",
    "manage_products",
    "manage_support",
    "manage_finance",
  ]),
  SUPPORT: Object.freeze(["manage_orders", "read_users", "read_products"]),
  FINANCE: Object.freeze(["read_users", "read_orders", "read_payments"]),
});
