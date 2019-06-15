const mongoose = require('mongoose');

const dateRangeSchema = mongoose.Schema({
  startDate: {
    type: Date,
    required: [true, 'Start date is required'],
  },
  endDate: {
    type: Date,
    required: [true, 'End date is required'],
  },
});

module.exports = dateRangeSchema;
