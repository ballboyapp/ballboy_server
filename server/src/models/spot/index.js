/* eslint-disable func-names */
const mongoose = require('mongoose');
const { SPORTS } = require('../../constants');
const { pointSchema, imageSchema } = require('../common-schemas');

//------------------------------------------------------------------------------
// MONGOOSE SCHEMAS:
//------------------------------------------------------------------------------
const schema = mongoose.Schema({
  spotname: {
    type: String,
    trim: true,
    required: [true, 'Spotname is required'],
  },
  address: {
    type: String,
    required: [true, 'Address is required'],
  },
  location: {
    type: pointSchema,
    required: [true, 'Location is required'],
  },
  images: {
    type: [imageSchema],
    default: [],
  },
  sports: {
    type: [String],
    enum: Object.values(SPORTS),
    default: [],
  },
  // AVAILABLE DATES
  // OWNER / CONTACT INFO { email, phone }
  // AMENITIES
  // BELONGS TO SPORT CENTRUM
});

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
schema.statics.createSpot = async function ({ coordinates, ...rest }) {
  const location = { coordinates };
  const newSpot = new this({ location, ...rest });
  await newSpot.save();
  return newSpot;
};
//------------------------------------------------------------------------------
// MONGOOSE MODEL:
//------------------------------------------------------------------------------
const Spot = mongoose.model('Spot', schema);


module.exports = {
  Spot,
};
