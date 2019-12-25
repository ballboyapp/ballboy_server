const { CLIENT_URL } = process.env;

const shareLink = (root, args, ctx) => (
  // console.log('shareLinkField', root, args);
  `${CLIENT_URL}/activities/${root._id}`
);

module.exports = shareLink;
