const moment = require('moment');
const { ACTIVITY_STATUSES } = require('../../../constants');
const { Activity } = require('../../../models');

// TODO: move this to activity model
const getActivitiesFinishingToday = () => {
  const today = moment().startOf('day').toISOString();

  const query = {
    status: {
      $in: [
        ACTIVITY_STATUSES.ACTIVE,
        ACTIVITY_STATUSES.CANCELED,
      ],
    },
    dateTime: {
      $lt: today,
    },
  };

  return Activity.find(query).lean(); // Promise
};

module.exports = getActivitiesFinishingToday;
