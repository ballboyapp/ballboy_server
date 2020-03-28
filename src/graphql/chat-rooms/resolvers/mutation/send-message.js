/**
 * Add text message to the given roomId
 * @param {Object} root chatRoom doc
 * @param {Object} args { roomId }
 * @param {Object} ctx { usr, models, ... }
 */
const sendMessage = (root, args, ctx) => (
  // console.log('sendMessageMutation', args, ctx);
  ctx.models.ChatRooms.sendMessage(args)
  // TODO: send notifications
);

module.exports = sendMessage;
