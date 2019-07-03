const sendPasscode = (root, args, ctx) => {
  // console.log('sendPasscodeMutation', args, ctx);
  return ctx.models.User.sendPasscode(args);
};

module.exports = sendPasscode;
