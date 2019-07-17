const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
// const path = require('path');
const cors = require('cors');
const enforce = require('express-sslify');

//------------------------------------------------------------------------------
// MAKE SURE ENV VARS ARE SET
//------------------------------------------------------------------------------
require('./src/startup/env-vars');

//------------------------------------------------------------------------------
// CONFIG VALIDATION LIBS
//------------------------------------------------------------------------------
require('./src/startup/validation');

//------------------------------------------------------------------------------
// CONFIG LOGGER & CATCH UNCAUGHT EXCEPTIONS
//------------------------------------------------------------------------------
require('./src/startup/logger');

//------------------------------------------------------------------------------
// INIT EXPRESS SERVER
//------------------------------------------------------------------------------
// Initialize Express server. Port is set by Heroku when the app is deployed or
// when running locally using the 'heroku local' command.
const { PORT } = process.env;
console.log('\nprocess.env.PORT', PORT);

const app = express();
app.set('port', (PORT || 3001));

//------------------------------------------------------------------------------
// MIDDLEWARES
//------------------------------------------------------------------------------
// Apply middleware to parse incoming body requests into JSON format.
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// app.use((req, res, next) => {
//   // console.log('req', req);
//   console.log('req.body', req.body);
//   // console.log('res', res);
//   next();
// });

app.use(helmet());

console.log('app.get(env)', app.get('env'));
if (app.get('env') === 'development') {
  // Enable the app to receive requests from the React app and Storybook when running locally.
  // app.use('*', cors({ origin: ['http://localhost:3000', 'http://localhost:9009'] }));
  // This is CORS-enabled for all origins!
  app.use(cors());
  app.use(morgan('tiny'));
}

if (app.get('env') === 'production') {
  // Use enforce.HTTPS({ trustProtoHeader: true }) in case you are behind
  // a load balancer (e.g. Heroku).
  app.use(enforce.HTTPS({ trustProtoHeader: true }));
}
//------------------------------------------------------------------------------
// MONGO CONNECTION
//------------------------------------------------------------------------------
require('./src/startup/db');

//------------------------------------------------------------------------------
// SERVER STATIC FILE
//------------------------------------------------------------------------------
// Serve static files from the React app
// const staticFiles = express.static(path.join(__dirname, '../../client/build'));
// app.use(staticFiles);

//------------------------------------------------------------------------------
// PASSPORT AUTH
//------------------------------------------------------------------------------
// require('./src/startup/passport')(app);

//------------------------------------------------------------------------------
// VALIDATE JWT MIDDLEWARE
//------------------------------------------------------------------------------
app.use(require('./src/middlewares/validate-jwt'));

//------------------------------------------------------------------------------
// APOLLO SERVER
//------------------------------------------------------------------------------
require('./src/startup/apollo-server')(app);

//------------------------------------------------------------------------------
// CHATKIT AUTH
//------------------------------------------------------------------------------
require('./src/startup/chatkit-auth')(app);

//------------------------------------------------------------------------------
// CRON JOBS
//------------------------------------------------------------------------------
// require('./src/startup/cron-jobs');

//------------------------------------------------------------------------------
// ERROR HANDLING MIDDLEWARE
//------------------------------------------------------------------------------
app.use(require('./src/middlewares/error'));

//------------------------------------------------------------------------------
// CATCH ALL
//------------------------------------------------------------------------------
// The "catchall" handler: for any request that doesn't match one above, send
// back React's index.html file.
// app.use('*', staticFiles);

//------------------------------------------------------------------------------
// LISTEN
//------------------------------------------------------------------------------
app.listen(app.get('port'), () => {
  console.log(`Apollo server listening on http://localhost:${app.get('port')}/graphql`);
});
