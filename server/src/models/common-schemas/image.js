const mongoose = require('mongoose');

const imageSchema = mongoose.Schema({
  publicId: {
    type: String,
    required: [true, 'Public ID is required'],
  },
  secureUrl: {
    type: String,
    required: [true, 'Secure URL is required'],
  },
});

module.exports = imageSchema;
