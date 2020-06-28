const notificationsList = (root, args, ctx) => (
  // console.log('notificationsListQuery', args);
  ctx.models.NotificationsList.getNotificationsList(args)
);

module.exports = notificationsList;
