const validatePasscode = (root, args, ctx) => {
  console.log('validatePasscodeMutation', args);
  return ctx.models.User.validatePasscode(args);
};

module.exports = validatePasscode;
