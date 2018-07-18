const _ = require('lodash');


module.exports = {
  isAdminOrDeveloper: (user) => {
    const roles = _.isEmpty(user.roles) ? null : user.roles;

    return _.includes(roles, 'admin') || _.includes(roles, 'developer');
  }
};
