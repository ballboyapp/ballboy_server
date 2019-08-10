const clearChecks = require('./config');
// const { validatePush } = require('../../models/subscription');

//------------------------------------------------------------------------------
// CONSTANTS:
//------------------------------------------------------------------------------
const { CLEAR_CHECKS_REPORT_TYPE } = process.env;

//------------------------------------------------------------------------------
// METHOD:
//------------------------------------------------------------------------------
/**
 * @param {[String]} emails
 * @example
 *  res { 'order created': 'true',
 *    account: '4ed05bbd3bd18627',
 *    applicants:
 *     [ { applicant_email: 'federodes2@gmail.com',
 *         report_key: 'e9c6c4cd83797274a77063170cb92d48' },
 *       { applicant_email: 'rodesf@gmail.com',
 *         report_key: 'd933ca2770422214bddb8409c96963ce' } ] }
 */
const order = ({ emails }) => {
  // console.log('\n\nclearChecksAPI.send args', args);
  /* const { error } = validateOrder({ email });
  if (error) {
    console.log('\n\nerror', error);
    return { error: error.details[0].message };
  } */

  console.log(
    '\n******Send Clear Check Order******',
    '\nemails', emails,
  );

  const options = {
    method: 'POST',
    uri: '/api/orders/new',
    body: {
      report_sku: CLEAR_CHECKS_REPORT_TYPE, // required string Allowed values: EE4, EE5, EE6
      drug_test: 'N', // required string Allowed values: Y, N
      include_monitoring: 'N', // required string Allowed values: Y, N
      order_quantity: emails.length, // required integer Must equal # of applicant_emails
      applicant_emails: JSON.stringify(emails), // required string
      terms_agree: 'Y', // required string Allowed values: Y, N
    },
  };

  return clearChecks(options);
};

module.exports = order;
