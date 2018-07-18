const { iff, isProvider } = require('feathers-hooks-common');
const { get } = require('lodash');

const { createObjectFilter, createArrayFilter } = require('../../utils/data_filter');

const createFilter = ({ schema, ownership, forceCriteria }) => (hook) => {
  let criteria = forceCriteria || [];
  if (hook.params.user) {
    const roles = hook.params.user.roles || [];
    criteria = [ ...criteria, ...roles, 'public' ];
  } else {
    criteria = [ ...criteria, 'public' ];
  }

  const conditionalCriteria = item => {
    if (hook.params.user && hook.params.user.id === get(item, ownership)) {
      return ['owner'];
    }

    return null;
  }

  const resultAttribute = hook.dispatch ? 'dispatch' : 'result';

  if (hook[resultAttribute].data) {
    const arrayFilter = createArrayFilter(schema, conditionalCriteria);
    hook[resultAttribute].data = arrayFilter(hook[resultAttribute].data, criteria);
  } else {
    const objectFilter = createObjectFilter(schema, conditionalCriteria);
    hook[resultAttribute] = objectFilter(hook[resultAttribute], criteria);
  }
};

module.exports = (options) => {

  return iff(isProvider('external'), createFilter(options));
};
