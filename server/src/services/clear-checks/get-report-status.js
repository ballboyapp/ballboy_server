const clearChecks = require('./config');
// const { validatePush } = require('../../models/subscription');

//------------------------------------------------------------------------------
// METHOD:
//------------------------------------------------------------------------------
/**
 * @param {[String]} emails
 * @example
 *  res {
 *   "status": "P",
 *   "reports": {
 *       "background_report": "C",
 *       "mvd_status": "P"
 *   }
 * }
 */
const getReportStatus = ({ reportKey }) => {
  console.log(
    '\n******Get Clear Check Report Status******',
    '\nreportKey', reportKey,
  );

  const options = {
    method: 'GET',
    uri: `/api/status/${reportKey}`,
    body: {
      report_key: reportKey, // required string report_key identifier of the report.
    },
  };

  return clearChecks(options);
};

module.exports = getReportStatus;
