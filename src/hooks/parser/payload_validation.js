const { iff, isProvider } = require('feathers-hooks-common');
const errors = require('@feathersjs/errors');
const { get } = require('lodash');

// For the ownership work on patch, a `stashBefore()` hook must be called before this
const createValidation = ({ schema, ownership, method, forceCriteria }) => (hook) => {
  let criteria = forceCriteria || [];
  if (hook.params.user) {
    const roles = hook.params.user.roles || [];
    criteria = [ ...criteria, ...roles ];
  } else {
    criteria = [ ...criteria, 'public' ];
  }

  const payload = hook.params.before || hook.data;

  if (hook.params.user && ownership && hook.params.user.id === get(payload, ownership)) {
    criteria = [ ...criteria, 'owner' ];
  }

  const validation = schema.validate(hook.data, {
    abortEarly: false,
    stripUnknown: true,
    context: {
      authorization: criteria,
      method,
    }
  });

  if (validation.error) {
    throw new errors.BadRequest('There are missing or invalid information', {
      error: 'missing_or_invalid_fields',
      details: validation.error.details
    });
  }

  hook.data = validation.value;
};

module.exports = (options) => {

  return iff(isProvider('external'), createValidation(options));
};


