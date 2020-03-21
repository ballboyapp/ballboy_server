const get = require('lodash/get');

/**
 * Count number of unread notifications
 */
const unreadCounter = (root, args, ctx) => (
  // console.log('unreadCounterField', root, args);
  get(root, 'items', []).filter(({ didRead }) => didRead === false).length
);

module.exports = unreadCounter;
