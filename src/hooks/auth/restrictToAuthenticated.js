const errors = require('feathers-errors');
const get = require('lodash/get');

module.exports = (options = { entity: 'user' }) => (context) => {
  if (context.type !== 'before') {
    throw new Error('The \'restrictToAuthenticated\' hook should only be used as a \'before\' hook.');
  }

  if (context.params.provider && get(context.params, options.entity) === undefined) {
    throw new errors.NotAuthenticated('You are not authenticated.');
    // TODO (EK): Add debug log to check to see if the user is populated, if the token was verified and warn appropriately
  }
};