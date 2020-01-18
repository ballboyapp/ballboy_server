const markAsRead = (root, args, ctx) => (
  // console.log('markAsReadMutation', args, ctx);
  ctx.models.Notification.markAsRead(args)
);

module.exports = markAsRead;
