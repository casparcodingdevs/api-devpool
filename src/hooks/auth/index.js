const has = require('lodash/has');

const { isAdminOrTrainer } = require('../../utils/auth');
const restrictTo = require('./restrictTo');
const restrictToAuthenticated = require('./restrictToAuthenticated');


module.exports = {
  restrictTo,

  restrictToAuthenticated,

  // TODO: Include require authentication
  restrictToAdmin: restrictTo({ roles: [ 'admin' ], owner: false }),

  // TODO: Include require authentication
  restrictToAdminOrDeveloper: restrictTo({ roles: [ 'admin', 'developer' ], owner: false }),

  isAdminOrTrainer: (hook) => has(hook, 'params.user') && isAdminOrTrainer(hook.params.user),
};
