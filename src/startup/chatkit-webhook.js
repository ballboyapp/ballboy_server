const get = require('lodash/get');
const { User, NotificationsList, Activity } = require('../models');
const { NOTIFICATION_TYPES } = require('../constants');
// const crypto = require('crypto');

// const { CHATKIT_WEBHOOK_SECRET } = process.env;

// function verify(req) {
//   const signature = crypto
//     .createHmac('sha1', CHATKIT_WEBHOOK_SECRET)
//     .update(req.body)
//     .digest('hex');

//   return signature === req.get('webhook-signature');
// }

// { created_at: '2020-01-26T21:11:57Z',
//   id: 103454819,
//   parts: [ { content: 'wer', type: 'text/plain' } ],
//   room_id: '22846323',
//   truncated: false,
//   updated_at: '2020-01-26T21:11:57Z',
//   user_id: '5e1065c85f83d61a9b3a0e98' }


module.exports = (app) => {
  app.post('/chatkit-webhook', async (req, res) => {
    const message = req.body.payload.messages[0];

    const { user_id: senderId, room_id: chatkitRoomId } = message;

    console.log('chatkit webhook', { message });

    try {
      // OBS: sender doesn't need to be a participant or the owner;
      // any registered user should be able to leave a message
      const sender = await User.findOne({ _id: senderId });

      if (sender == null) {
        throw new Error('Sender not found');
      }

      const activity = await Activity.findOne({ chatkitRoomId });

      if (activity == null) {
        throw new Error('Activity not found');
      }

      const notification = {
        notificationType: NOTIFICATION_TYPES.NEW_MESSAGE,
        sender: {
          id: senderId,
          name: get(sender, 'profile.username', ''),
          avatarURL: get(sender, 'profile.avatar', ''),
        },
        payload: {
          activityId: activity._id,
          activityTitle: activity.title,
          chatkitRoomId,
        },
      };

      // Send notification to all attendees plus the organizer
      const promises = activity.getUsersExcept(senderId).map(userId => (
        NotificationsList.insertNotification(userId, notification)
      ));

      await Promise.all(promises);

      res.sendStatus(200);
    } catch (exc) {
      // TODO: log to sentry
      console.log({ exc });
      res.sendStatus(500);
    }
  });
};

// module.exports = (app) => {
//   app.post('/chatkit-webhook', (req, res) => {
//     const message = req.body.payload.messages[0];
//     console.log(message);
//     if (verify(req)) {
//       console.log('Got a request with body', req.body);

//       // Notifications.send({
//       //   msgType: EMAIL_NOTIFICATION_TYPES.NEW_MESSAGE,
//       //   senderId: usr._id,
//       //   recipientId,
//       //   url: `${APP_DNS}/inbox`,
//       // });

//       res.sendStatus(200);
//     } else {
//       console.log('Got an unverified request; ignoring.');
//       res.sendStatus(401);
//     }
//   });
// };