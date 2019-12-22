const isAttendee = (root, args, ctx) => (
  // console.log('isAttendeeField', root, args);
  ctx.usr ? root.attendeesIds.includes(ctx.usr._id.toString()) : false
);

module.exports = isAttendee;
