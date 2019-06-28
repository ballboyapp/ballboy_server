const cities = (root, args, ctx) => {
  // console.log('citiesQuery', args, ctx);
  return ctx.models.City.getCities(args);
};

module.exports = cities;
