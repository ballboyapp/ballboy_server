/* eslint-disable func-names */
const mongoose = require('mongoose');

//------------------------------------------------------------------------------
// CONSTANTS:
//------------------------------------------------------------------------------
const MAX_MESSAGES = 300;

//------------------------------------------------------------------------------
// MONGOOSE SCHEMAS:
//------------------------------------------------------------------------------
const profileSchema = mongoose.Schema({
  id: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, 'User ID is required'],
  },
  name: {
    type: String,
    trim: true,
    required: [true, 'User name is required'],
  },
  avatarURL: {
    type: String,
  },
}, { _id: false });
//------------------------------------------------------------------------------
const messageSchema = mongoose.Schema({
  createdAt: {
    type: Date,
    default: Date.now,
  },
  sender: {
    type: profileSchema,
    required: [true, 'Sender is required'],
  },
  text: {
    type: String,
    trim: true,
    required: [true, 'Text is required'],
  },
});
//------------------------------------------------------------------------------
const schema = mongoose.Schema({
  createdAt: {
    type: Date,
    default: Date.now,
  },
  messages: {
    type: [messageSchema],
    default: [],
    validate: [val => val.length <= MAX_MESSAGES, 'Messages exceed the limit'],
  },
});

//------------------------------------------------------------------------------
// INSTANCE METHODS:
//------------------------------------------------------------------------------

//------------------------------------------------------------------------------
// STATIC METHODS:
//------------------------------------------------------------------------------
schema.statics.createRoom = async function () {
  const newRoom = new this();
  await newRoom.save();
  return newRoom;
};
//------------------------------------------------------------------------------
schema.statics.insertMessage = async function ({ roomId, sender, text }) {
  const query = { _id: roomId };
  const room = await this.findOne(query);

  console.log({ room });

  if (!room) {
    throw new Error('Room does not exist');
  }

  if (room.messages.length === MAX_MESSAGES) {
    throw new Error('Room message limit');
  }

  await this.updateOne(query, { $push: { messages: { sender, text } } });
  return this.findOne(query); // Promise
};
//------------------------------------------------------------------------------
schema.statics.deleteRoom = async function (roomId) {
  // TODO: delete room
};
//------------------------------------------------------------------------------
// MONGOOSE MODEL:
//------------------------------------------------------------------------------
const ChatRooms = mongoose.model('ChatRooms', schema);

module.exports = {
  ChatRooms,
};
