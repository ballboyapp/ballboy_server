/* eslint-disable func-names */
const mongoose = require('mongoose');
const { isEmail } = require('validator');
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const extend = require('lodash/extend');
const pick = require('lodash/pick');
const {
  GENDERS,
  CITIES,
} = require('../../constants');
const { imageSchema } = require('../common-schemas');

//------------------------------------------------------------------------------
// CONSTANTS:
//------------------------------------------------------------------------------
const { JWT_PRIVATE_KEY } = process.env;

const MIN_STRING_LENGTH = 2;
const MAX_STRING_LENGTH = 10000;

//------------------------------------------------------------------------------
// MONGOOSE SCHEMAS:
//------------------------------------------------------------------------------
const publicUserFields = {
  username: {
    type: String,
    trim: true,
    required: [true, 'Username is required'],
  },
  city: { // OR coords
    type: String,
    enum: Object.values(CITIES),
  },
  gender: {
    type: String,
    enum: Object.values(GENDERS),
    default: GENDERS.TBD,
  },
  images: {
    type: [imageSchema],
    default: [],
    // TODO: add limit to number of images
  },
  // SPORT/LEVEL
  // AVAILABLE DATES
  // PREFERRED SPOTS
};
//------------------------------------------------------------------------------
const schema = mongoose.Schema(Object.assign({}, {
  facebookId: {
    type: String,
    unique: true,
    required: [true, 'Facebook ID is required'],
  },
  accessToken: {
    type: String,
    unique: true,
    required: [true, 'Facebook access token is required'],
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    minlength: MIN_STRING_LENGTH,
    maxlength: MAX_STRING_LENGTH,
    unique: true,
    // required: [true, 'Email address is required'],
    validate: [isEmail, 'Provide a valid email address'],
  },
  emailVerified: {
    type: Boolean,
    default: false,
  },
  // TODO: see jti or jwt balcklist to prevent stolen tokens to pass validation
  // See: https://medium.com/react-native-training/building-chatty-part-7-authentication-in-graphql-cd37770e5ab3
},
publicUserFields),
{ timestamps: true }); // `createdAt` & `updatedAt` will be included
//------------------------------------------------------------------------------
// INSTANCE METHODS:
//------------------------------------------------------------------------------
// OBS: you shouldn't use these methods outside connectors
schema.methods.genAuthToken = function () {
  return jwt.sign({ _id: this._id }, JWT_PRIVATE_KEY);
};
//------------------------------------------------------------------------------
schema.methods.updateUserFields = async function ({ userFields }) {
  console.log('user.update', userFields);

  Object.keys(userFields).forEach((key) => {
    this[key] = userFields[key];
  });

  await this.save();
  return this;
};
//------------------------------------------------------------------------------
// STATIC METHODS:
//------------------------------------------------------------------------------
// OBS: you shouldn't use these methods outside connectors
schema.statics.findById = function ({ _id }) {
  return this.findOne({ _id });
};
//------------------------------------------------------------------------------
schema.statics.findOrCreate = async function ({ accessToken, profile }) {
  const { id: facebookId, displayName, emails } = profile;

  // In case user already exists, return it
  const user = await this.findOne({ facebookId });
  if (user) {
    return user;
  }

  // Otherwise, create a new record
  const nameArray = displayName.split(' ');
  const record = {
    facebookId,
    accessToken,
    displayName,
    firstName: nameArray[0],
    lastName: nameArray[1] || '',
    // TODO: add remaining fields and also update DB schema
  };

  if (emails && emails.length > 0) {
    extend(record, {
      email: emails[0].value,
      emailVerified: true,
    });
  }

  const newUser = new this(record);
  await newUser.save();
  return newUser;
};
//------------------------------------------------------------------------------
// MONGOOSE MODEL:
//------------------------------------------------------------------------------
const User = mongoose.model('User', schema);

//------------------------------------------------------------------------------
// JOI:
//------------------------------------------------------------------------------
const emailsSchema = Joi.object({
  value: Joi.string(),
});

const arraySchema = Joi.array().items(emailsSchema);

const validateFBAuth = ({ accessToken, profile }) => {
  const fields = ['id', 'displayName', 'emails', 'photos', 'provider'];

  const joiSchema = {
    accessToken: Joi.string().required(),
    id: Joi.string().required(),
    displayName: Joi.string().required(),
    emails: Joi.alternatives().try(emailsSchema, arraySchema),
    photos: Joi.array().items(),
    provider: Joi.string().required(),
  };

  return Joi.validate(Object.assign({}, { accessToken }, pick(profile, fields)), joiSchema); // { error, value }
};

const validateUserUpdate = ({ userFields }) => {
  const fields = ['firstName', 'lastName', 'email'];

  const joiSchema = {
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().email({ minDomainAtoms: 2 }),
  };

  return Joi.validate(pick(userFields, fields), joiSchema); // { error, value }
};

module.exports = {
  publicUserFields,
  User,
  validateFBAuth,
  validateUserUpdate,
};
