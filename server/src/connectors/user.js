const intersectionBy = require('lodash/intersectionBy');
const { User, validateUserUpdate, publicUserFields } = require('../models');
const { NOTIFICATION_TYPES, ROLES, BG_CHECK_STATUSES } = require('../constants');
const Notifications = require('../services/notifications');

//------------------------------------------------------------------------------
// AUX FUNCTIONS:
//------------------------------------------------------------------------------
const publicUserProjection = Object.keys(publicUserFields).reduce((total, field) => (
  Object.assign({}, total, { [field]: 1 })
), {});
// console.log('projection', JSON.stringify(projection));

//------------------------------------------------------------------------------
// HANDLERS:
//------------------------------------------------------------------------------
/**
 * @see {@link https://blog.apollographql.com/authorization-in-graphql-452b1c402a9}
 * @see {@link https://github.com/apollographql/GitHunt-API/blob/cc67a4506c31310b4ba8d811dda11d258c7d60d6/api/github/models.js}
 * @see {@link https://github.com/apollographql/GitHunt-API/blob/cc67a4506c31310b4ba8d811dda11d258c7d60d6/api/index.js#L67-L73}
 * @see {@link https://github.com/apollographql/GitHunt-API/blob/cc67a4506c31310b4ba8d811dda11d258c7d60d6/api/sql/schema.js#L63}
 */
const genUserModel = ({ usr }) => ({
  updateUserProfile: async ({ userFields }) => {
    // Only allow owner to update her own data
    if (!usr || !usr._id) {
      return null;
    }

    // TODO: change name to validateUserFields
    const { error } = validateUserUpdate({ userFields });
    if (error) {
      throw new Error(error.details[0].message);
    }

    // Query current logged in user
    const user = await User.findById({ _id: usr._id });
    if (!user) {
      return null;
    }

    // Update user data
    return user.updateUserFields({ userFields });
  },
  getUser: () => {
    if (!usr || !usr._id) { return null; }

    // Query current logged in user
    return User.findById({ _id: usr._id });
  },
  getPublicUser: ({ _id }) => {
    if (!usr || !usr._id || !_id) { return null; }
    return User.findById({ _id }).select(publicUserProjection);
  },
  getPublicUserProfiles: ({ _ids }) => {
    if (!usr || !usr._id || !_ids) { return []; }

    return User.find({ _id: { $in: _ids } }).select(publicUserProjection);
  },
  newChatkitRoom: async ({ roomName, recipientId }) => {
    if (!usr || !usr._id) { return null; }

    // Add room name to recipient and current user docs
    const modifier = { $addToSet: { unseenMsgs: { roomName } } };
    await User.updateOne({ _id: recipientId }, modifier);
    await User.updateOne({ _id: usr._id }, modifier);

    // Query current logged in user
    return User.findById({ _id: usr._id });
  },
  newMessage: async ({ roomName, recipientId }) => {
    console.log('NEW MSG', roomName, recipientId);
    if (!usr || !usr._id) { return null; }

    console.log('BEFORE NOTIFICATION');

    // Send notification to recipient
    // Notifications.send({
      // msgType: NOTIFICATION_TYPES.NEW_MESSAGE,
      // senderId: usr._id,
      // recipientId,
      // url: `${APP_DNS}/inbox`,
    // });

    console.log('AFTER NOTIFICATION');

    // Increase unseen msg counter
    const query = { _id: recipientId, 'unseenMsgs.roomName': roomName };
    const modifier = {
      $set: {
        'unseenMsgs.$.hasUnseenMsgs': true,
      },
    };
    await User.updateOne(query, modifier);

    console.log('SET MSG TO UNSEEN');

    // Query current logged in user
    return User.findById({ _id: usr._id });
  },
  setMessageAsSeen: async ({ roomName }) => {
    if (!usr || !usr._id) { return null; }

    // Reset unseen msg counter
    const query = { _id: usr._id, 'unseenMsgs.roomName': roomName };
    const modifier = {
      $set: {
        'unseenMsgs.$.hasUnseenMsgs': false,
      },
    };
    await User.updateOne(query, modifier);

    // Query current logged in user
    return User.findById({ _id: usr._id });
  },
  setNotificationsToSeen: async ({ field, listIds }) => {
    if (!usr || !usr._id) { return null; }
    if (!field || !listIds) { return null; }

    // Reset unseen applications counter
    const query = { _id: usr._id };
    const modifier = {
      $pull: {
        [field]: {
          $in: listIds,
        },
      },
    };
    await User.updateOne(query, modifier);

    // Query current logged in user
    return User.findById({ _id: usr._id });
  },
  setNotificationsToUnseen: async ({ field, recipientId, listId }) => {
    if (!usr || !usr._id) { return null; }
    if (!field || !recipientId || !listId) { return null; }

    // Reset unseen applications counter
    const query = { _id: recipientId };
    const modifier = {
      $addToSet: {
        [field]: listId,
      },
    };
    await User.updateOne(query, modifier);

    // Query current logged in user
    return User.findById({ _id: usr._id });
  },
});

module.exports = genUserModel;
