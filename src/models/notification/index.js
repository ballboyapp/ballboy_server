/* eslint-disable func-names */
const mongoose = require('mongoose');
const { NOTIFICATION_TYPES } = require('../../constants');

//------------------------------------------------------------------------------
// MONGOOSE SCHEMAS:
//------------------------------------------------------------------------------
const schema = mongoose.Schema({
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    // The notification could be triggered by a user's action or cron-job
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  recipientId: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, 'Recipient ID is required'],
  },
  notificationType: {
    type: String,
    enum: Object.values(NOTIFICATION_TYPES),
    required: [true, 'Notification type is required'],
  },
  link: {
    type: String,
  },
  didRead: {
    type: Boolean,
    default: false,
  },
});

//------------------------------------------------------------------------------
// INSTANCE METHODS:
//------------------------------------------------------------------------------
// OBS: you shouldn't use these methods outside connectors
//------------------------------------------------------------------------------

//------------------------------------------------------------------------------
// STATIC METHODS:
//------------------------------------------------------------------------------
// OBS: you shouldn't use these methods outside connectors
//------------------------------------------------------------------------------
schema.statics.createNotification = async function (fields) {
  const newNotification = new this(fields);
  await newNotification.save();
  return newNotification;
};
//------------------------------------------------------------------------------
// MONGOOSE MODEL:
//------------------------------------------------------------------------------
const Notification = mongoose.model('Notification', schema);

module.exports = {
  Notification,
};
