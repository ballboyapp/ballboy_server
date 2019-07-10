const organizer = (root, args, ctx) => {
  // console.log('organizerField', root, args, ctx);
  return ctx.models.User.getPublicUser({ _id: root.organizerId });
};

module.exports = organizer;
