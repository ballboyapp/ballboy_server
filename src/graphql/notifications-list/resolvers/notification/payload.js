/**
 * Payload is being stored as an object that could contain any information.
 * Given that graphql doesn't support Object type out of the box, a way
 * to go around this is to stringify the content of the object and pass
 * the data as a string instead.
 */
const payload = (root, args, ctx) => (
  // console.log('payloadField', root, args);
  root.payload ? JSON.stringify(root.payload) : null
);

module.exports = payload;
