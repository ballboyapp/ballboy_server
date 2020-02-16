const isAttendee = (root, args, ctx) => (
  // console.log('isAttendeeField', root, args);
  ctx.usr == null ? false : root.attendeesIds
    .map(attendeeId => attendeeId.toString())
    .includes(ctx.usr._id.toString())
);

module.exports = isAttendee;
