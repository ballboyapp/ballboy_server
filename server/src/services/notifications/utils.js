const { NOTIFICATION_TYPES } = require('../../constants');

//------------------------------------------------------------------------------
const getSubject = ({ msgType }) => {
  switch (msgType) {
    case NOTIFICATION_TYPES.SITTER_APPLICATION:
      return 'New Sitter Application';
    case NOTIFICATION_TYPES.SITTER_APPLICATION_ACCEPTED:
      return 'Application Accepted';
    case NOTIFICATION_TYPES.SITTER_APPLICATION_DECLINED:
      return 'Application Declined';
    case NOTIFICATION_TYPES.SITTER_APPLICATION_CANCELED:
      return 'Application Canceled';
    case NOTIFICATION_TYPES.HOST_INVITATION:
      return 'New Sitting Invite';
    case NOTIFICATION_TYPES.HOST_INVITATION_ACCEPTED:
      return 'Invitation Accepted';
    case NOTIFICATION_TYPES.HOST_INVITATION_DECLINED:
      return 'Invitation Declined';
    case NOTIFICATION_TYPES.NEW_MESSAGE:
      return 'New Message';
    case NOTIFICATION_TYPES.COMPLETE_REVIEW:
      return 'Complete your Review';
    case NOTIFICATION_TYPES.COMPLETE_REVIEW_REMINDER:
      return 'Reminder: Complete your Review';
    default:
      throw new Error('Unknown message type', msgType);
  }
};
//------------------------------------------------------------------------------
const greetings = name => `Hello${name ? ` ${name}` : ''},`;
//------------------------------------------------------------------------------
const goToLink = url => `To see the application, follow the link below:\n${url}`;
//------------------------------------------------------------------------------
const footer = 'Best.\nPet Digs';
//------------------------------------------------------------------------------
const layout = ({ url, recipientName, text }) => `
${greetings(recipientName)}

${text}

${goToLink(url)}

${footer}
`;
//------------------------------------------------------------------------------
const getText = ({
  msgType,
  url,
  recipientName,
  senderName,
}) => {
  switch (msgType) {
    case NOTIFICATION_TYPES.SITTER_APPLICATION:
      return layout({
        url,
        recipientName,
        text: `You have received a sitter application${senderName ? ` from ${senderName}` : ''}.`,
      });
    case NOTIFICATION_TYPES.SITTER_APPLICATION_ACCEPTED:
      return layout({
        url,
        recipientName,
        text: 'Your sitter application has been accepted :)',
      });
    case NOTIFICATION_TYPES.SITTER_APPLICATION_DECLINED:
      return layout({
        url,
        recipientName,
        text: 'Your sitter application has been declined :(',
      });
    case NOTIFICATION_TYPES.SITTER_APPLICATION_CANCELED:
      return layout({
        url,
        recipientName,
        text: 'The sitter has canceled the application :(',
      });
    case NOTIFICATION_TYPES.HOST_INVITATION:
      return `
${greetings(recipientName)}

You have received a sitting invitation${senderName ? ` from ${senderName}` : ''}.

To see the invitation, follow the link below:\n${url}

${footer}
      `;
    case NOTIFICATION_TYPES.HOST_INVITATION_ACCEPTED:
      return layout({
        url,
        recipientName,
        text: 'Your sitting invitation has been accepted :)',
      });
    case NOTIFICATION_TYPES.HOST_INVITATION_DECLINED:
      return layout({
        url,
        recipientName,
        text: 'Your sitting invitation has been declined :(',
      });
    case NOTIFICATION_TYPES.NEW_MESSAGE:
      return `
${greetings(recipientName)}

You have received a new message${senderName ? ` from ${senderName}` : ''}.

To see the message, follow the link below:\n${url}

${footer}
      `;
    case NOTIFICATION_TYPES.COMPLETE_REVIEW:
    case NOTIFICATION_TYPES.COMPLETE_REVIEW_REMINDER:
      return `
${greetings(recipientName)}

Please, tell us about your experience${senderName ? ` with ${senderName}` : ''}.

To complete your review, follow the link below:\n${url}

${footer}
      `;
    default:
      throw new Error('Unknown message type', msgType);
  }
};
//------------------------------------------------------------------------------

module.exports = {
  getSubject,
  getText,
};
