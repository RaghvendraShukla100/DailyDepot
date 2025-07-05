// /backend/utils/paginate.js

export const paginate = (page = 1, limit = 10) => {
  const skip = (page - 1) * limit;
  return { skip, limit: parseInt(limit, 10) };
};
