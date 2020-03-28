const genUserModel = require('./user');
const genCityModel = require('./city');
const genSpotModel = require('./spot');
const genActivityModel = require('./activity');
const genNotificationsListModel = require('./notifications-list');
const genChatRooms = require('./chat-rooms');

module.exports = {
  genUserModel,
  genCityModel,
  genSpotModel,
  genActivityModel,
  genNotificationsListModel,
  genChatRooms,
};
