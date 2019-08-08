/* eslint-disable func-names */
const mongoose = require('mongoose');
const omit = require('lodash/omit');
const { SPORTS } = require('../../constants');
const { pointSchema } = require('../common-schemas');

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
    type: [String],
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
// schema.statics.createSpot = async function ({ coordinates, ...rest }) {
schema.statics.createSpot = async function (fields) {
  const { coordinates } = fields;
  const location = { coordinates };
  // const newSpot = new this({ location, ...rest });
  const newSpot = new this(Object.assign({}, { location }, omit(fields, 'coordinates')));
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
