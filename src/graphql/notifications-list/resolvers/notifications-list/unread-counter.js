/**
 * Count number of unread notifications
 */
const unreadCounter = (root, args, ctx) => (
  // console.log('unreadCounterField', root, args);
  root.items.filter(({ didRead }) => didRead === false).length
);

module.exports = unreadCounter;
