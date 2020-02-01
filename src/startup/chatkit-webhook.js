const { NotificationsList } = require('../models');
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
  app.post('/chatkit-webhook', (req, res) => {
    const message = req.body.payload.messages[0];

    const { user_id: recipientId, room_id: activityId } = message;

    const notification = {
      notificationType: NOTIFICATION_TYPES.NEW_MESSAGE,
      senderId: recipientId, // TODO: target all participants in the game + the owner/admins
      payload: { activityId },
    };

    NotificationsList.insertNotification(recipientId, notification);

    res.sendStatus(200);
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
