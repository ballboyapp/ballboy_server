const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const enforce = require('express-sslify');
const rateLimit = require('express-rate-limit');
const Sentry = require('@sentry/node');
const csp = require('./src/csp');

//------------------------------------------------------------------------------
// MAKE SURE ENV VARS ARE SET
//------------------------------------------------------------------------------
require('./src/startup/env-vars');

const { PORT, SENTRY_DSN_SERVER, CLIENT_URL } = process.env;

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
console.log('\nprocess.env.PORT', PORT);

const app = express();
app.set('port', (PORT || 3001));

//------------------------------------------------------------------------------
// INIT SENTRY
//------------------------------------------------------------------------------
Sentry.init({ dsn: SENTRY_DSN_SERVER });

//------------------------------------------------------------------------------
// MIDDLEWARES
//------------------------------------------------------------------------------
// The request handler must be the first middleware on the app
app.use(Sentry.Handlers.requestHandler());

// Apply middleware to parse incoming body requests into JSON format.
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// For DEBUGGING, DO NOT DELETE
// app.use((req, res, next) => {
//   // console.log('req', req);
//   console.log('req.body', req.body);
//   // console.log('res', res);
//   next();
// });

app.use(helmet());

// You need a JSON parser first.
app.use(helmet.contentSecurityPolicy(csp));

if (app.get('env') === 'development') {
  // Enable the app to receive requests from the React app and Storybook when running locally.
  app.use(cors());
}

if (app.get('env') === 'production') {
  // Enable the app to receive requests from the front end.
  app.use('*', cors({ origin: [CLIENT_URL] }));

  // Use enforce.HTTPS({ trustProtoHeader: true }) in case you are behind a load balancer (Heroku).
  app.use(enforce.HTTPS({ trustProtoHeader: true }));

  // Enable if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)
  // see https://expressjs.com/en/guide/behind-proxies.html
  app.set('trust proxy', 1);
}

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 200, // limit each IP to 200 requests per windowMs
  onLimitReached: (req, res, options) => {
    console.log('Rate Limit Reached req', req);
  },
});

// Only apply to requests that begin with /graphql
app.use('/graphql', limiter);

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
// VALIDATE JWT MIDDLEWARE
//------------------------------------------------------------------------------
app.use(require('./src/middlewares/validate-jwt'));

// Catch JWT invalid signature error
app.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    req.user = null;
  }
  next();
});

//------------------------------------------------------------------------------
// APOLLO SERVER
//------------------------------------------------------------------------------
require('./src/startup/apollo-server')(app);

// TODO: disable in production
// app.get('/debug-sentry', (req, res) => {
//   throw new Error('My first Sentry error!');
// });

//------------------------------------------------------------------------------
// CRON JOBS
//------------------------------------------------------------------------------
require('./src/startup/cron-jobs');

//------------------------------------------------------------------------------
// MIGRATIONS
//------------------------------------------------------------------------------
// Wait for 60 secs before running the migrations
const waitForSecs = app.get('env') === 'production' ? 60 : 5;

// setTimeout(() => {
//   require('./src/startup/migrations'); // eslint-disable-line global-require
// }, waitForSecs * 1000);

//------------------------------------------------------------------------------
// ERROR HANDLING MIDDLEWARE
//------------------------------------------------------------------------------
// The error handler must be before any other error middleware and after all controllers
app.use(Sentry.Handlers.errorHandler());
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
