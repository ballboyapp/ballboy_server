const notifications = (root, args, ctx) => (
  // console.log('notificationsQuery', args);
  ctx.models.Notification.getNotifications(args)
);

module.exports = notifications;
