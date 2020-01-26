const notifications = (root, args, ctx) => {
  console.log('notificationsQuery', args);
  return ctx.models.Notification.getNotifications(args);
};

module.exports = notifications;
