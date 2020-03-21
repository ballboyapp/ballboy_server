const { PubSub } = require('apollo-server-express');

const notificationAdded = (root, args, ctx) => (
  // console.log('notificationAddedSubscription', args, ctx);
  pubsub.asyncIterator([POST_ADDED])
);

module.exports = notificationAdded;
