const get = require('lodash/get');

module.exports = context => {
  const deleted = get(context, 'data.deleted');

  if(deleted === true){
    context.data.deleted_at = new Date();
    context.data.email = null;
    context.data.surname = null;
    context.data.profile_image = null;
    context.data.forename = 'Deleted user';
  }
};
