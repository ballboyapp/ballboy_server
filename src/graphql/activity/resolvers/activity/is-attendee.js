const isAttendee = (root, args, ctx) => {
  // console.log('isAttendeeField', root, args);
  return ctx.usr ? root.attendeesIds.includes(ctx.usr._id) : false;
};

module.exports = isAttendee;
