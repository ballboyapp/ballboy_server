const attendees = (root, args, ctx) => {
  // console.log('attendeesField', root, args);
  return ctx.models.User.getPublicUsers({ _ids: root.attendeesIds });
};

module.exports = attendees;
