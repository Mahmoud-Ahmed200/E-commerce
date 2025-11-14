const buildProductFilter = (query) => {
  const filter = {};
  
  if (query.search) {
    filter.name = { $regex: query.search, $options: 'i' }; // this option ignore case
  }
  
  if (query.category) {
    filter.category = query.category;
  }
  
  if (query.minPrice || query.maxPrice) {
    filter.price = {};
    if (query.minPrice) filter.price.$gte = Number(query.minPrice);
    if (query.maxPrice) filter.price.$lte = Number(query.maxPrice);
  }
  
  filter.isActive = true;
  
  return filter;
};

const buildSortOptions = (sortBy) => {
  const sortOptions = {
    newest: { createdAt: -1 },
    'price-low-high': { price: 1 },
    'price-high-low': { price: -1 },
    'name-az': { name: 1 },
    'name-za': { name: -1 },
    recommended: { averageRating: -1, totalReviews: -1 }
  };
  
  return sortOptions[sortBy] || sortOptions.newest;
};

module.exports = {
  buildProductFilter,
  buildSortOptions
};