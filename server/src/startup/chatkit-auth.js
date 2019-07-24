const chatkit = require('../services/chatkit');

const { CHATKIT_USER_READ_ONLY } = process.env;

module.exports = (app) => {
  app.post('/chatkit-auth', (req, res) => {
    // User data is decoded on the validateJwtMiddleware
    const userId = (req.user && req.user._id) || CHATKIT_USER_READ_ONLY;
    const authData = chatkit.authenticate({ userId });
    // console.log('authData', authData);
    res.status(authData.status).send(authData.body); // { access_token, expires_in }
  });
};
