const csp = {
  directives: {
    defaultSrc: ["'self'"],
    styleSrc: [
      "'self'",
      "'unsafe-inline'",
      'https://fonts.googleapis.com',
      'http://cdn.jsdelivr.net/npm/@apollographql/graphql-playground-react@1.7.26/build/static/css/index.css',
    ],
    fontSrc: ["'self'", 'https://fonts.gstatic.com'],
    imgSrc: [
      "'self'",
      '*.cloudinary.com',
      'http://cdn.jsdelivr.net/npm/@apollographql/graphql-playground-react@1.7.26/build/favicon.png',
      'https://www.google-analytics.com',
    ],
    mediaSrc: ["'self'", '*.cloudinary.com'],
    scriptSrc: [
      "'self'",
      "'unsafe-inline'",
      'http://cdn.jsdelivr.net/npm/@apollographql/graphql-playground-react@1.7.26/build/static/js/middleware.js',
    ],
    scriptSrcElem: [
      "'self'",
      "'unsafe-inline'",
      'http://cdn.jsdelivr.net/npm/@apollographql',
    ],
    connectSrc: [
      "'self'",
      'https://sentry.io',
      'https://us1.pusherplatform.io',
      'wss://us1.pusherplatform.io',
    ],
    frameSrc: [
      "'self'",
    ],
  },
  // This module will detect common mistakes in your directives and throw errors
  // if it finds any. To disable this, enable "loose mode".
  loose: true,

  // Set to true if you only want browsers to report errors, not block them.
  // You may also set this to a function(req, res) in order to decide dynamically
  // whether to use reportOnly mode, e.g., to allow for a dynamic kill switch.
  reportOnly: false,

  // Set to true if you want to blindly set all headers: Content-Security-Policy,
  // X-WebKit-CSP, and X-Content-Security-Policy.
  setAllHeaders: false,

  // Set to true if you want to disable CSP on Android where it can be buggy.
  disableAndroid: false,

  // Set to false if you want to completely disable any user-agent sniffing.
  // This may make the headers less compatible but it will be much faster.
  // This defaults to `true`.
  browserSniff: true,
};

module.exports = csp;
