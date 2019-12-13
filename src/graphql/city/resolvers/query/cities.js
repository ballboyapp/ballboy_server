const cities = (root, args, ctx) => {
  console.log('citiesQuery', args);
  return ctx.models.City.getCities(args);
};

module.exports = cities;
