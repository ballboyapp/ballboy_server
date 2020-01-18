const getNotifications = require('./get-notifications');
const markAsRead = require('./mark-as-read');

/**
 * @see {@link https://blog.apollographql.com/authorization-in-graphql-452b1c402a9}
 * @see {@link https://github.com/apollographql/GitHunt-API/blob/cc67a4506c31310b4ba8d811dda11d258c7d60d6/api/github/models.js}
 * @see {@link https://github.com/apollographql/GitHunt-API/blob/cc67a4506c31310b4ba8d811dda11d258c7d60d6/api/index.js#L67-L73}
 * @see {@link https://github.com/apollographql/GitHunt-API/blob/cc67a4506c31310b4ba8d811dda11d258c7d60d6/api/sql/schema.js#L63}
 */

const genNotificationModel = ({ usr }) => ({
  getNotifications: args => getNotifications({ usr }, args),
  markAsRead: args => markAsRead({ usr }, args),
});

module.exports = genNotificationModel;
