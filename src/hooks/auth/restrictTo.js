const { restrictToRoles } = require('feathers-authentication-hooks');
const commonHooks = require('feathers-hooks-common');

module.exports = (options = {}) =>
  commonHooks.iff(
    commonHooks.isProvider('external'),
    restrictToRoles(Object.assign({}, {
      roles: [ 'admin', 'developer', 'cto' ],
      fieldName: 'roles',
      idField: 'id',
      ownerField: 'user_id',
      owner: true
    }, options))
  );
