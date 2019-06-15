const Chatkit = require('@pusher/chatkit-server');

const { CHATKIT_INSTANCE_LOCATOR, CHATKIT_SECRET_KEY } = process.env;

// Create chatkit instance
const chatkit = new Chatkit.default({ // eslint-disable-line
  instanceLocator: CHATKIT_INSTANCE_LOCATOR,
  key: CHATKIT_SECRET_KEY,
});

module.exports = chatkit;
