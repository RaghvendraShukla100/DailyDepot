export const ROLE_PERMISSIONS = Object.freeze({
  superadmin: Object.freeze({
    can: Object.freeze([
      "manage_users",
      "manage_orders",
      "manage_products",
      "manage_payments",
      "manage_admins",
    ]),
  }),
  admin: Object.freeze({
    can: Object.freeze([
      "manage_orders",
      "manage_products",
      "manage_support",
      "manage_finance",
    ]),
  }),
  support: Object.freeze({
    can: Object.freeze([
      "read_users",
      "read_orders",
      "read_products",
    ]),
  }),
  finance: Object.freeze({
    can: Object.freeze([
      "read_users",
      "read_orders",
      "read_payments",
    ]),
  }),
});
