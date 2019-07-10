const user = (root, args, ctx) => {
  console.log('userField', root, args);
  return ctx.User.getPublicUser({ _id: root.userId });
};

module.exports = user;
