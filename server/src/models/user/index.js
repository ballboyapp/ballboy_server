/* eslint-disable func-names */
const mongoose = require('mongoose');
const moment = require('moment');
const bcrypt = require('bcrypt');
const { isEmail } = require('validator');
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const extend = require('lodash/extend');
const pick = require('lodash/pick');
const { GENDERS, CITIES } = require('../../constants');
const { imageSchema } = require('../common-schemas');
const getExpDate = require('./utils');

//------------------------------------------------------------------------------
// CONSTANTS:
//------------------------------------------------------------------------------
const { JWT_PRIVATE_KEY } = process.env;

const MIN_STRING_LENGTH = 2;
const MAX_STRING_LENGTH = 255;
const PASS_CODE_LENGTH = 6; // plain text passcode length

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
  // facebookId: {
  //   type: String,
  //   unique: true,
  //   required: [true, 'Facebook ID is required'],
  // },
  // accessToken: {
  //   type: String,
  //   unique: true,
  //   required: [true, 'Facebook access token is required'],
  // },
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
  passcode: {
    type: String,
    maxlength: 1024, // hashed passcode
  },
  expirationDate: { // pass code expiration date
    type: Date,
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
//------------------------------------------------------------------------------
schema.methods.validatePasscode = function ({ passcode }) {
  return (
    passcode
    && this.passcode
    && bcrypt.compare(passcode.toString(), this.passcode)
  );
};
//------------------------------------------------------------------------------
schema.methods.passcodeExpired = function () {
  if (!this.expirationDate) {
    return true; // expired
  }

  const now = moment();
  // console.log('NOW', now.clone().toISOString());
  const expDate = moment(this.expirationDate);
  // console.log('EXP_DATE', expDate.clone().toISOString());
  // console.log('DIFF', expDate.diff(now));
  return expDate.diff(now) < 0;
};
//------------------------------------------------------------------------------
schema.methods.genPasscode = async function (digits) {
  // TODO: Math.random() does not provide cryptographically secure random numbers.
  // Do not use them for anything related to security. Use the Web Crypto API
  // instead, and more precisely the window.crypto.getRandomValues() method.
  const passcode = Math.floor(Math.random() * (10 ** digits));

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(passcode.toString(), salt);

  this.passcode = hash;
  this.expirationDate = getExpDate();
  await this.save();

  return passcode; // plain text passcode
};
//------------------------------------------------------------------------------
schema.methods.setEmailToVerified = async function () {
  this.emailVerified = true;
  await this.save();
};
//------------------------------------------------------------------------------
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
//------------------------------------------------------------------------------
schema.statics.createUser = async function ({ username, email }) {
  const newUser = new this({ username, email });
  await newUser.save();
  return newUser;
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
const usernameVal = Joi.string().min(MIN_STRING_LENGTH).max(MAX_STRING_LENGTH).required(); // eslint-disable-line
const emailVal = Joi.string().email().min(MIN_STRING_LENGTH).max(MAX_STRING_LENGTH).required(); // eslint-disable-line
const passcodeVal = Joi.number().integer().min(0).max(Math.pow(10, PASS_CODE_LENGTH + 1)).required(); // eslint-disable-line
const emailsSchema = Joi.object({ value: Joi.string() });
const arraySchema = Joi.array().items(emailsSchema);

const validateSignup = (user) => {
  console.log('VALIDATE SIGNUP', user);
  const joiSchema = {
    username: usernameVal,
    email: emailVal,
  };

  return Joi.validate(user, joiSchema); // { error, value }
};

const validateLogin = (credentials) => {
  const joiSchema = {
    email: emailVal,
    passcode: passcodeVal,
  };

  return Joi.validate(credentials, joiSchema); // { error, value }
};

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

const validateUserProfile = ({ userFields }) => {
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
  validateSignup,
  validateLogin,
  validateFBAuth,
  validateUserProfile,
};
