const { ACTIVITY_STATUSES } = require('../../../constants');
const { Activity } = require('../../../models');

// TODO: move this to activity model
const setActivityStatusToFinished = ({ _id }) => (
  Activity.updateOne({ _id }, { $set: { status: ACTIVITY_STATUSES.FINISHED } }) // Promise
);

module.exports = setActivityStatusToFinished;
