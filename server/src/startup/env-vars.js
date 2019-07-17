require('dotenv').config();

/**
 * @summary Makes sure all env vars are set
 */

const ENV_VARS = [
  'MONGO_URL',
  'JWT_PRIVATE_KEY',
  'SMTP_HOST',
  'SMTP_USERNAME',
  'SMTP_PASSWORD',
  'SMTP_PORT',
  'GCM_PRIVATE_KEY',
  'VAPID_SUBJECT',
  'VAPID_PUBLIC_KEY',
  'VAPID_PRIVATE_KEY',
  'FACEBOOK_APP_ID',
  'FACEBOOK_APP_SECRET',
  'CHATKIT_INSTANCE_LOCATOR',
  'CHATKIT_SECRET_KEY',
  'CHATKIT_USER_ADMIN',
  'CHATKIT_USER_READ_ONLY',
];

ENV_VARS.forEach((key) => {
  const val = process.env[key];
  if (!val || val.trim().length === 0) {
    console.error(`FATAL ERROR: ${key} env var missing`);
    process.exit(1);
  }
});

// if (NODE_ENV && NODE_ENV === 'test' && (!MONGO_URL_TEST || MONGO_URL_TEST.trim().length === 0)) {
//   console.error('FATAL ERROR: MONGO_URL_TEST env var missing');
//   process.exit(1);
// }
