const { publicUserFields } = require('../models');

const publicUserProjection = Object.keys(publicUserFields).reduce((total, field) => (
  Object.assign({}, total, { [field]: 1 })
), {});

// console.log('projection', JSON.stringify(projection));

module.exports = publicUserProjection;
