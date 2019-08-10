const order = require('./order');
const getReportStatus = require('./get-report-status');

const clearChecksAPI = {};

//------------------------------------------------------------------------------
clearChecksAPI.order = args => order(args);
//------------------------------------------------------------------------------
clearChecksAPI.getReportStatus = args => getReportStatus(args);
//------------------------------------------------------------------------------

module.exports = clearChecksAPI;
