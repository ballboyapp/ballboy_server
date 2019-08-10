const jwt = require('express-jwt');

const { JWT_PRIVATE_KEY } = process.env;

// See: https://blog.pusher.com/handling-authentication-in-graphql/
// Decode jwt and get user data (_id). Then reset req.user to decoded data.
const validateJwtMiddleware = jwt({
  secret: JWT_PRIVATE_KEY,
  credentialsRequired: false, // allow non-authenticated requests to pass through the middleware
});

module.exports = validateJwtMiddleware;
