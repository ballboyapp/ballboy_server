/* eslint-disable func-names */
const mongoose = require('mongoose');
const { SPORTS, ACTIVITY_STATUSES } = require('../../constants');

//------------------------------------------------------------------------------
// MONGOOSE SCHEMAS:
//------------------------------------------------------------------------------
const schema = mongoose.Schema({
  organizerId: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, 'Organizer ID is required'],
  },
  spotId: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, 'Spot ID is required'],
  },
  sport: {
    type: String,
    required: [true, 'Sport is required'],
    enum: Object.values(SPORTS),
  },
  dateTime: { // (start) date and time of the activity
    type: Date,
    required: [true, 'Start date is required'],
  },
  duration: {
    type: Number,
    // required: [true, 'Start date is required'],
  },
  title: {
    type: String,
    trim: true,
    required: [true, 'Title is required'],
    // TODO: max length
  },
  description: {
    type: String,
    trim: true,
  },
  status: {
    type: String,
    enum: Object.values(ACTIVITY_STATUSES),
    default: ACTIVITY_STATUSES.ACTIVE,
  },
  capacity: {
    type: Number,
  },
  shareLink: {
    type: String,
  },
  chatkitRoomId: {
    type: String,
  },
  attendeesIds: {
    type: [String],
    default: [],
  },
},
{ timestamps: true }); // `createdAt` & `updatedAt` will be included

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
schema.statics.createActivity = async function (args) {
  const newActivity = new this(args);
  await newActivity.save();
  return newActivity;
};
//------------------------------------------------------------------------------
// MONGOOSE MODEL:
//------------------------------------------------------------------------------
const Activity = mongoose.model('Activity', schema);


module.exports = {
  Activity,
};
