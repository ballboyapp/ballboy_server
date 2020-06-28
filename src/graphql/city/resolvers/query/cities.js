const cities = (root, args, ctx) => (
  // console.log('citiesQuery', args);
  ctx.models.City.getCities(args)
);

module.exports = cities;
