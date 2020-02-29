const markAsRead = (root, args, ctx) => (
  // console.log('markAsReadMutation', args, ctx);
  ctx.models.NotificationsList.markAsRead(args)
);

module.exports = markAsRead;
