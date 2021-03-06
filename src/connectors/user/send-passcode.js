const get = require('lodash/get');
const { nodemailer, transporter } = require('../../services/nodemailer/config');
const { User } = require('../../models');

const { APP_NAME, APP_DOMAIN_NAME } = process.env;

// TODO: i18n
const getText = ({ username, passcode }) => (`
Hey${username.length > 0 ? ' ' : ''}${username},
Your verification code is ${passcode}.
Enjoy!
`);

const getHtml = ({ username, passcode }) => (`
<p>
Hey${username.length > 0 ? ' ' : ''}${username},
</p>
<p>
Your verification code is <b>${passcode}</b>.
</p>
<p>Enjoy!</p>
`);

const sendPasscode = async ({ usr }, { email }) => {
  // Make sure user is logged out
  if (usr) {
    return null;
  }

  // Is there any user associated to this email?
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error('User is not registered'); // Bad request - 400
  }

  // Genearte a pass code and attach it to the user
  const passcode = await user.genPasscode();
  const username = get(user, 'profile.username', '');

  // Send pass code to user
  const mailOptions = {
    from: `"${APP_NAME}" <no-reply@${APP_DOMAIN_NAME}>`, // sender address
    to: email, // list of receivers
    subject: 'Verification code for Ballboy', // subject line
    text: getText({ username, passcode }), // plain text body
    html: getHtml({ username, passcode }), // html body
  };

  // Send email with defined transport object
  const info = await transporter.sendMail(mailOptions);
  console.log('Message sent: %s', info.messageId);
  // Preview only available when sending through an Ethereal account
  console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  return user;
};

module.exports = sendPasscode;
