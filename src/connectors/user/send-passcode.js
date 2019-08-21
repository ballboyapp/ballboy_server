const { nodemailer, transporter } = require('../../services/nodemailer/config');
const { User } = require('../../models');

// TODO: i18n
const getText = ({ passcode }) => (`
Hello,
Your verification code is ${passcode}.
Thanks.
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

  // Send pass code to user
  const mailOptions = {
    from: 'email@example.com', // sender address
    to: email, // list of receivers
    subject: `Your pass code is ${passcode} for <siteName>`, // subject line
    text: getText({ passcode }), // plain text body
    // html: '<b>Hello world?</b>', // html body
  };

  // Send email with defined transport object
  const info = await transporter.sendMail(mailOptions);
  console.log('Message sent: %s', info.messageId);
  // Preview only available when sending through an Ethereal account
  console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  return user;
};

module.exports = sendPasscode;
