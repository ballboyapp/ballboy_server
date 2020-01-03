/* eslint-disable func-names */
const mongoose = require('mongoose');
const moment = require('moment');
const cloneDeep = require('lodash/cloneDeep');
const extend = require('lodash/extend');
const omit = require('lodash/omit');
const { SPORTS, ACTIVITY_STATUSES } = require('../../constants');
const { pointSchema } = require('../common-schemas');
const { Spot } = require('../spot');
const { getSpotId } = require('./utils');

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
  location: { // copy from spot
    type: pointSchema,
    required: [true, 'Location is required'],
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
    type: [String], // TODO: mongoose.Schema.Types.ObjectId // Do we need to use ObjectId?
    default: [],
  },
  repeatFrequency: { // Weeks
    type: Number,
    default: 0, // 0 means do not repeat
  },
},
{ timestamps: true }); // `createdAt` & `updatedAt` will be included

schema.index({ location: '2dsphere' });

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
// TODO: pick only the required fields from args
schema.statics.createActivity = async function (args) {
  // console.log('\n\nschema.statics.createActivity', args);
  const spotId = getSpotId(args.spotId);
  const spot = await Spot.findOne({ _id: spotId });
  if (!spot) {
    throw new Error('No spot found');
  }
  const location = { coordinates: spot.location.coordinates };

  const newActivity = new this(Object.assign({}, args, { location }));
  await newActivity.save();
  return newActivity;
};
//------------------------------------------------------------------------------
schema.statics.updateActivity = async function (args) {
  // console.log('\n\nschema.statics.updateActivity', args);
  const spotId = getSpotId(args.spotId);
  const spot = await Spot.findOne({ _id: spotId });
  if (!spot) {
    throw new Error('No spot found');
  }

  const location = {
    type: 'Point',
    coordinates: spot.location.coordinates,
  };

  const activity = await this.findOne({ _id: args._id });

  Object.keys(args).forEach((key) => {
    if (key && key !== '_id') {
      activity[key] = args[key]; // update field value
    }
  });
  activity.location = location;

  await activity.save();
  return activity;
};
//------------------------------------------------------------------------------
/**
 * @summary Query activities finishing on the given date
 * @param {Date} - date
 * @returns {Promise} - activities
 */
schema.statics.getActivitiesFinishingOnDate = function (date) {
  const query = {
    status: {
      $in: [
        ACTIVITY_STATUSES.ACTIVE,
        ACTIVITY_STATUSES.CANCELED,
      ],
    },
    dateTime: {
      $lt: date,
    },
  };

  return this.find(query).lean(); // Promise
};
//------------------------------------------------------------------------------
/**
 * @summary Set activity status to finished
 * @param {ID} - _id - activity ID to be updated
 * @returns {Promise} - promise
 */
schema.statics.setActivityStatusToFinished = function (_id) {
  return this.updateOne({ _id }, { $set: { status: ACTIVITY_STATUSES.FINISHED } }); // Promise
};
//------------------------------------------------------------------------------
/**
 * @summary Recreate the given activity
 * @param {object} - activity
 * @returns {Promise} - promise
 */
schema.statics.recreateActivity = function (activity) {
  console.log('\n\nrecreateActivity', activity);
  if (!activity || !activity.repeatFrequency) return null;
  const newDateTime = moment(activity.dateTime).add(activity.repeatFrequency, 'weeks');
  const newActivity = omit(cloneDeep(activity), '_id');
  extend(newActivity, { dateTime: newDateTime, attendeesIds: [newActivity.organizerId] });
  return this.createActivity(newActivity); // Promise
};
//------------------------------------------------------------------------------
// MONGOOSE MODEL:
//------------------------------------------------------------------------------
const Activity = mongoose.model('Activity', schema);


module.exports = {
  Activity,
};
