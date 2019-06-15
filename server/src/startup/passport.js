const passport = require('passport');
const { Strategy } = require('passport-facebook');
const union = require('lodash/union');
const chatkit = require('../services/chatkit');
const { User, validateFBAuth } = require('../models');

const { FACEBOOK_APP_ID, FACEBOOK_APP_SECRET } = process.env;

/**
 * @see {@link https://medium.com/hyphe/token-based-authentication-in-node-6e8731bfd7f2}
 * @see {@link https://developers.facebook.com/docs/facebook-login/permissions#reference-user_friends}
 * @see {@link https://stackoverflow.com/questions/50095522/how-to-get-whole-facebook-friends-list-from-api}
 * @see {@link https://stackoverflow.com/questions/23417356/facebook-graph-api-v2-0-me-friends-returns-empty-or-only-friends-who-also-u}
 * @see {@link https://benbiddington.wordpress.com/2010/04/23/facebook-graph-api-getting-access-tokens/}
 */

module.exports = (app) => {
  app.use(passport.initialize());

  // Configure the Facebook strategy for use by Passport.
  const scope = ['email'];

  const conf = {
    clientID: FACEBOOK_APP_ID,
    clientSecret: FACEBOOK_APP_SECRET,
    callbackURL: '/auth/facebook/callback',
    enableProof: true,
    // https://developers.facebook.com/docs/graph-api/reference/v2.5/user
    profileFields: union(['id', 'displayName', 'photos'], scope),
    // Force https. See: https://stackoverflow.com/questions/49403748/insecure-login-blocked-you-cant-get-an-access-token-or-log-in-to-this-app-from
    proxy: true,
  };

  const failureRoute = '/400';

  const authCb = async (accessToken, refreshToken, profile, cb) => {
    console.log('\nACCESS TOKEN', accessToken);
    console.log('\nPROFILE', profile);
    const { error } = validateFBAuth({ accessToken, profile });
    if (error) {
      console.log('INVALID FB AUTH CREDENTIALS', error);
      cb(error.details[0].message, false);
      return;
    }

    let user;

    try {
      // Insert user into DB
      user = await User.findOrCreate({ accessToken, profile });
      cb(null, user);
    } catch (exc) {
      console.log('Failed inserting user into DB', exc);
      cb(exc, false);
    }

    try {
      // Register user into Chatkit service
      await chatkit.createUser({ id: user._id, name: user.displayName });
    } catch (exc) {
      console.log('Failed registering user to Chatkit', exc);
    }
  };

  // OAuth 2.0-based strategies require a `verify` function which receives the
  // credential (`accessToken`) for accessing the Facebook API on the user's
  // behalf, along with the user's profile. The function must invoke `cb`
  // with a user object, which will be set at `req.user` in route handlers after
  // authentication.
  passport.use(new Strategy(conf, authCb));

  // Every time we hit the '/auth/facebook' endpoint, the authentication process will be started
  const authOpts = { scope, failureRedirect: failureRoute };

  app.get('/auth/facebook', passport.authenticate('facebook', authOpts));

  // Once the user is authenticated by the third party provider, we'll generate a
  // JWT and send it back to the client
  const cbOpts = { session: false, failureRedirect: failureRoute };

  const authMid = (req, res, next) => {
    passport.authenticate('facebook', cbOpts, (err, user) => {
      if (err || !user) {
        res.status(400).redirect(failureRoute);
        return;
      }
      // TODO: re-save, update data in case something changed from FB profile
      req.user = user;
      next();
    })(req, res, next);
  };

  const serialize = (req, res, next) => {
    req.user = { _id: req.user._id };
    next();
  };

  const genToken = async (req, res, next) => {
    const user = await User.findById({ _id: req.user._id });
    req.token = user.genAuthToken();
    next();
  };

  const respond = (req, res) => {
    res.status(200).redirect(`/auth/facebook/success/${req.token}`);
  };

  app.get('/auth/facebook/callback', authMid, serialize, genToken, respond);
};
