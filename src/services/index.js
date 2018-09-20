const users = require('./users/users.service.js');
const developers = require('./developers/developers.service.js');
const clients = require('./clients/clients.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(users);
  app.configure(developers);
  app.configure(clients);
};
