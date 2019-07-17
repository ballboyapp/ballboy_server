const spot = (root, args, ctx) => {
  // console.log('spotField', args);
  return ctx.models.Spot.getSpotDetails({ _id: root.spotId });
};

module.exports = spot;

// const spot = async (root, args, ctx) => {
//   // console.log('spotField', args);
//   const spt = await ctx.models.Spot.getSpotDetails({ _id: root.spotId });
//   console.log('spot', spt);
//   return spt;
// };

// module.exports = spot;