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

function buildSortOptions(sortBy) {
  switch (sortBy) {
    case "price-asc":
      return { price: 1 };

    case "price-desc":
      return { price: -1 };

    case "name-asc":
      return { name: 1 };

    case "name-desc":
      return { name: -1 };

    default:
      return {};
  }
}

module.exports = {
  buildProductFilter,
  buildSortOptions
};
