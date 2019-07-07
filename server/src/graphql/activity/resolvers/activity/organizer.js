const organizer = (root, args, ctx) => {
  // console.log('organizerField', args);
  return ctx.User.getPublicUser({ _id: root.organizerId });
};

module.exports = organizer;
