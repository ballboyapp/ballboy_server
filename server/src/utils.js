const { RESPONDENT_STATUSES }  = require('./constants');

const getAttendees = respondents => (
  (respondents && respondents.length > 0)
    ? respondents.filter(r => r.status === RESPONDENT_STATUSES.ATTENDING)
    : []
);

module.exports = {
  getAttendees,
};
