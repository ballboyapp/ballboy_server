const rp = require('request-promise');
const cloneDeep = require('lodash/cloneDeep');

/**
 * @see {@link https://app.clearchecks.com/developers/docs}
 */

const { CLEAR_CHECKS_ACCOUNT, CLEAR_CHECKS_SECRET_KEY } = process.env;

// Set clear checks key
const BASE_OPTIONS = {
  baseUrl: 'https://app.clearchecks.com', // baseUrl + uri
  qs: {
    api_token: CLEAR_CHECKS_SECRET_KEY, // -> uri + '?api_token=xxxxx%20xxxxx'
  },
  headers: {
    Accept: 'application/json',
    // 'Content-Type': 'application/json; charset=utf-8', // TODO: ONLY FOR POST PUT
    // 'Content-Type': 'application/x-www-form-urlencoded', // TODO: ONLY FOR POST PUT
  },
  json: true, // Automatically stringifies the body to JSON
};

const mergeOptions = ({ method, uri, body }) => {
  if (!method || !uri || !body) {
    throw new Error('Method or uri or body is required');
  }
  if (!uri.startsWith('/api')) {
    throw new Error('Malformed uri');
  }

  const merged = cloneDeep(BASE_OPTIONS);
  merged.uri = uri;
  merged.method = method;
  merged.body = body;

  return merged;
};

const clearChecks = (options) => {
  const opts = mergeOptions(options);
  console.log('opts', opts);
  return rp(opts);
};

module.exports = clearChecks;
