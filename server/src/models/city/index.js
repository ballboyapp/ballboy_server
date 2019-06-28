/* eslint-disable func-names */
const mongoose = require('mongoose');
const { pointSchema } = require('../common-schemas');

//------------------------------------------------------------------------------
// MONGOOSE SCHEMAS:
//------------------------------------------------------------------------------
const schema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'City name is required'],
  },
  country: {
    type: String,
    required: [true, 'Country is required'],
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
schema.statics.createCity = async function ({ name, country, coordinates }) {
  const location = { coordinates };
  const newCity = new this({ name, country, location });
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
