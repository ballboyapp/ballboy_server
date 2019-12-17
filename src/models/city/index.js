/* eslint-disable func-names */
const mongoose = require('mongoose');
const omit = require('lodash/omit');
const { pointSchema } = require('../common-schemas');

//------------------------------------------------------------------------------
// MONGOOSE SCHEMAS:
//------------------------------------------------------------------------------
const schema = mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: [true, 'Name is required'],
  },
  country: {
    type: String,
    trim: true,
    required: [true, 'Country is required'],
  },
  formattedAddress: {
    type: String,
    trim: true,
    required: [true, 'Formatted address is required'],
  },
  location: {
    type: pointSchema,
    required: [true, 'Location is required'],
  },
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
schema.statics.createCity = async function (fields) {
  const { coordinates } = fields;
  const location = { coordinates };
  const newCity = new this(Object.assign({}, { location }, omit(fields, 'coordinates')));
  await newCity.save();
  return newCity;
};
//------------------------------------------------------------------------------
// MONGOOSE MODEL:
//------------------------------------------------------------------------------
const City = mongoose.model('City', schema);

module.exports = {
  City,
};
