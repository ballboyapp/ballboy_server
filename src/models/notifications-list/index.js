/* eslint-disable func-names */
const mongoose = require('mongoose');
const { NOTIFICATION_TYPES } = require('../../constants');

//------------------------------------------------------------------------------
// CONSTANTS:
//------------------------------------------------------------------------------
const MAX_ITEMS = 20;

//------------------------------------------------------------------------------
// MONGOOSE SCHEMAS:
//------------------------------------------------------------------------------
const profileSchema = mongoose.Schema({
  id: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, 'User ID is required'],
  },
  name: {
    type: String,
    trim: true,
    required: [true, 'User name is required'],
  },
  avatarURL: {
    type: String,
  },
});
//------------------------------------------------------------------------------
const notificationSchema = mongoose.Schema({
  createdAt: {
    type: Date,
    default: Date.now,
  },
  notificationType: {
    type: String,
    enum: Object.values(NOTIFICATION_TYPES),
    required: [true, 'Notification type is required'],
  },
  sender: {
    type: profileSchema,
    required: [true, 'Sender is required'],
  },
  payload: {
    type: Object, // See: https://mongoosejs.com/docs/schematypes.html#mixed
  },
  didRead: {
    type: Boolean,
    default: false,
  },
});
//------------------------------------------------------------------------------
const schema = mongoose.Schema({
  createdAt: {
    type: Date,
    default: Date.now,
  },
  recipient: {
    type: profileSchema,
    required: [true, 'Recipient is required'],
  },
  unreadCounter: {
    type: Number,
    default: 0,
  },
  items: {
    type: [notificationSchema],
    default: [],
    validate: [val => val.length <= MAX_ITEMS, 'Items exceeds the limit'], // limit to 20 items
  },
});

//------------------------------------------------------------------------------
// INSTANCE METHODS:
//------------------------------------------------------------------------------

//------------------------------------------------------------------------------
// STATIC METHODS:
//------------------------------------------------------------------------------
schema.statics.createUser = async function ({ id, name }) {
  const exist = await this.findOne({ 'recipient.id': id });

  if (exist) {
    throw new Error('User already exist in NotificationsList collection');
  }

  const recipient = { id, name };

  const newList = new this({ recipient });
  await newList.save();
  return newList;
};
//------------------------------------------------------------------------------
schema.statics.insertNotification = async function (recipientId, notification) {
  console.log('INSERT NOTIFICATION', { recipientId, notification });
  const query = { 'recipient.id': recipientId };
  const notificationsList = await this.findOne(query);

  console.log({ notificationsList });

  if (!notificationsList) {
    throw new Error('NotificationsList does not exist');
  }

  if (notificationsList.items.length === MAX_ITEMS) {
    // Remove the first item (oldest) from the items array
    await this.updateOne(query, { $pop: { items: -1 } });
  }

  await this.updateOne(query, { $push: { items: notification } });
};
//------------------------------------------------------------------------------
schema.statics.updateRecipientProfile = async function ({ id, name, avatarURL }) {
  const query = { 'recipient.id': id };
  const notificationsList = await this.findOne(query);

  if (!notificationsList) {
    throw new Error('NotificationsList does not exist');
  }

  await this.update(query, { $set: { name, avatarURL } });
};
//------------------------------------------------------------------------------
schema.statics.deleteRecipientData = async function (fields) {
  // TODO: delete recipient's list + all notification created by said user
};
//------------------------------------------------------------------------------
// MONGOOSE MODEL:
//------------------------------------------------------------------------------
const NotificationsList = mongoose.model('NotificationsList', schema);

module.exports = {
  NotificationsList,
};


/* eslint-disable func-names */
// const mongoose = require('mongoose');
// const { NOTIFICATION_TYPES } = require('../../constants');

// //------------------------------------------------------------------------------
// // MONGOOSE SCHEMAS:
// //------------------------------------------------------------------------------
// const schema = mongoose.Schema({
//   createdAt: {
//     type: Date,
//     default: Date.now,
//   },
//   senderId: {
//     type: mongoose.Schema.Types.ObjectId,
//     // The notification could be triggered by a user's action or cron-job
//   },
//   recipientId: {
//     type: mongoose.Schema.Types.ObjectId,
//     required: [true, 'Recipient ID is required'],
//   },
//   notificationType: {
//     type: String,
//     enum: Object.values(NOTIFICATION_TYPES),
//     required: [true, 'Notification type is required'],
//   },
//   payload: {
//     type: Object, // See: https://mongoosejs.com/docs/schematypes.html#mixed
//   },
//   didRead: {
//     type: Boolean,
//     default: false,
//   },
// });

// //------------------------------------------------------------------------------
// // INSTANCE METHODS:
// //------------------------------------------------------------------------------
// // OBS: you shouldn't use these methods outside connectors
// //------------------------------------------------------------------------------

// //------------------------------------------------------------------------------
// // STATIC METHODS:
// //------------------------------------------------------------------------------
// // OBS: you shouldn't use these methods outside connectors
// //------------------------------------------------------------------------------
// schema.statics.createNotification = async function (fields) {
//   const newNotification = new this(fields);
//   await newNotification.save();
//   return newNotification;
// };
// //------------------------------------------------------------------------------
// // MONGOOSE MODEL:
// //------------------------------------------------------------------------------
// const Notification = mongoose.model('Notification', schema);

// module.exports = {
//   Notification,
// };
