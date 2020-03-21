const notificationsList = (root, args, ctx) => {
  console.log('notificationsListQuery', args);
  return ctx.models.NotificationsList.getNotificationsList(args);
};

module.exports = notificationsList;
