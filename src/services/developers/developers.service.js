// Initializes the `developers` service on path `/developers`
const createService = require('feathers-sequelize');
const createModel = require('../../models/developers.model');
const hooks = require('./developers.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/developers', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('developers');

  service.hooks(hooks);
};
