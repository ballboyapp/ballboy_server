const moment = require('moment');

const getExpDate = () => (
  // Five minutes from now
  moment().add(5, 'minutes').toISOString()
  // moment().add(5, 'seconds').toISOString()
);

module.exports = getExpDate;
