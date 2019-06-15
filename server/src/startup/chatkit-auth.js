const chatkit = require('../services/chatkit');

module.exports = (app) => {
  app.post('/chatkit-auth', (req, res) => {
    // User data is decoded on the validateJwtMiddleware
    const userId = (req.user && req.user._id) || null;
    const authData = chatkit.authenticate({ userId });
    res.status(authData.status).send(authData.body); // { access_token, expires_in }
  });
};
