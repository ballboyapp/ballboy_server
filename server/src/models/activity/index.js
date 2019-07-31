/* eslint-disable func-names */
const mongoose = require('mongoose');
const { SPORTS, ACTIVITY_STATUSES } = require('../../constants');
const { pointSchema } = require('../common-schemas');
const { Spot } = require('../spot');

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
  location: {
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
schema.statics.createActivity = async function (args) {
  const spot = await Spot.findOne({ _id: args.spotId });
  if (!spot) {
    throw new Error('No spot found');
  }
  const location = { coordinates: spot.location.coordinates };

  const newActivity = new this({ ...args, location });
  await newActivity.save();
  return newActivity;
};
//------------------------------------------------------------------------------
schema.statics.updateActivity = async function (args) {
  // console.log('\n\nschema.statics.updateActivity', args);
  const spot = await Spot.findOne({ _id: args.spotId });
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
// MONGOOSE MODEL:
//------------------------------------------------------------------------------
const Activity = mongoose.model('Activity', schema);


module.exports = {
  Activity,
};
