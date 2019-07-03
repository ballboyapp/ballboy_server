const mongoose = require('mongoose');

const pointSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['Point'],
    default: 'Point',
  },
  coordinates: {
    type: [Number],
    default: [0, 0],
    // required: [true, 'Coordinates is required'],
  },
});

module.exports = pointSchema;
