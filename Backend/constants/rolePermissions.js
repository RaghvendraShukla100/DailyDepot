export const ROLE_PERMISSIONS = {
  superadmin: {
    can: [
      "manage_users",
      "manage_orders",
      "manage_products",
      "manage_payments",
      "manage_admins",
    ],
  },
  admin: {
    can: [
      "manage_orders",
      "manage_products",
      "manage_support",
      "manage_finance",
    ],
  },
  support: {
    can: ["read_users", "read_orders", "read_products"],
  },
  finance: {
    can: ["read_users", "read_orders", "read_payments"],
  },
};
