const city = (root, args, ctx) => {
  // console.log('cityField', root, args);
  return ctx.City.getCity({ _id: root.cityId });
};

module.exports = city;
