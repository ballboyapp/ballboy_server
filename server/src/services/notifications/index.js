const { User } = require('../../models');
const { nodemailer, transporter } = require('../nodemailer/config');
const { getSubject, getText } = require('./utils');

// Namespace
const Notifications = {};

//------------------------------------------------------------------------------
Notifications.send = async ({
  msgType,
  senderId,
  recipientId,
  url,
}) => {
  if (!msgType || !recipientId) {
    throw new Error('msgType, recipientId are required');
  }

  // Query sender and recipient
  const sender = senderId ? await User.findById({ _id: senderId }) : null;
  const senderName = (sender && sender.firstName) || '';

  const recipient = recipientId ? await User.findById({ _id: recipientId }) : null;
  if (!recipient) {
    throw new Error('Recipient not found');
  }

  const recipientName = (recipient && recipient.firstName) || '';
  const recipientEmail = (recipient && recipient.email) || '';

  const subject = getSubject({ msgType });
  const text = getText({ msgType, url, recipientName, senderName });

  console.log(
    '\n\nAbout to send email',
    'recipientName', recipientName,
    'recipientEmail', recipientEmail,
    'subject', subject,
    'text', text,
  );

  // Send pass code to user
  const mailOptions = {
    from: 'Pet Digs <contact@mypetdigs.com>', // sender address
    to: recipientEmail, // list of receivers
    subject, // subject line
    text, // plain text body
    // html: '<b>Hello world?</b>', // html body
  };

  try {
    // Send email with defined transport object
    const info = await transporter.sendMail(mailOptions);
    console.log('Message sent: %s', info.messageId);
    // Preview only available when sending through an Ethereal account
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  } catch (exc) {
    console.log('Email could not be delivered', exc);
  }
};
//------------------------------------------------------------------------------
Notifications.sendCrashReport = async (exc) => {
  console.log('\nAbout to send Crash report');
  let text = '';

  try {
    text = JSON.stringify(exc);
  } catch (e) {
    text = exc.message || 'Something bad happened on the server';
  }

  // Send pass code to user
  const mailOptions = {
    from: 'Pet Digs Crash <crash@mypetdigs.com>', // sender address
    to: 'federodes@gmail.com', // list of receivers
    subject: 'Server Crash', // subject line
    text, // plain text body
    // html: '<b>Hello world?</b>', // html body
  };

  // Send email with defined transport object
  const info = await transporter.sendMail(mailOptions);
  console.log('Message sent: %s', info.messageId);
  // Preview only available when sending through an Ethereal account
  console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
};
//------------------------------------------------------------------------------

module.exports = Notifications;
