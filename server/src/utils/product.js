const buildProductFilter = (query) => {
  const filter = {};

  if (query.minPrice || query.maxPrice) {
    filter.price = {};
    if (query.minPrice) filter.price.$gte = Number(query.minPrice);
    if (query.maxPrice) filter.price.$lte = Number(query.maxPrice);
  }

  if (query.category) {
    filter.category = query.category;
  }

  if (query.brand) {
    filter.brand = new RegExp(query.brand, "i");
  }

  if (query.inStock === "true") {
    filter.stock = { $gt: 0 };
  }

  if (query.search) {
    filter.$or = [
      { name: new RegExp(query.search, "i") },
      { description: new RegExp(query.search, "i") },
      { brand: new RegExp(query.search, "i") },
    ];
  }

  filter.isActive = true;

  return filter;
};

const buildSortOptions = (sortBy) => {
  const sortOptions = {
    "price-asc": { price: 1 },
    "price-desc": { price: -1 },
    "name-asc": { name: 1 },
    "name-desc": { name: -1 },
    newest: { createdAt: -1 },
  };

  return sortOptions[sortBy] || { createdAt: -1 };
};

module.exports = {
  buildProductFilter,
  buildSortOptions,
};
