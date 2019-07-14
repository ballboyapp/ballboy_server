const isOrganizer = (root, args, ctx) => {
  // console.log('isOrganizerField', root, args);
  return ctx.usr ? root.organizerId.toString().includes(ctx.usr._id) : false;
};

module.exports = isOrganizer;
