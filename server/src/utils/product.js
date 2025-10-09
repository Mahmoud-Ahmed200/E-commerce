const buildProductFilter = (query) => {
  const filter = { ...query };
  const min = Number(filter.minPrice);
  const max = Number(filter.maxPrice);
  if (min && max) {
    filter.price = { $gte: min, $lte: max };
  } else if (min) {
    filter.price = { $gte: min };
  } else if (max) {
    filter.price = { $lte: max };
  }
  delete filter.minPrice;
  delete filter.maxPrice;
  return filter;
};
module.exports = {
  buildProductFilter,
};
