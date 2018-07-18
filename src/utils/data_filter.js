const filterObject = require('filter-object');
const { filter, keys, chain, isEmpty, negate } = require('lodash');

const matchArrays = require('./match_arrays');

const createObjectFilter = (schema, conditionalCriteria) =>
  (object, criteria) => {
    const applyCriteria = conditionalCriteria(object) || criteria;
    const attributes = filter(keys(schema), (key) =>
      matchArrays(schema[key].authorize, applyCriteria));

    return filterObject(object, attributes);
  };

const createArrayFilter = (schema, conditionalCriteria) => {
  const objectFilter = createObjectFilter(schema, conditionalCriteria);

  return (array, criteria) =>
    chain(array)
      .map(object => objectFilter(object, criteria))
      .filter(negate(isEmpty))
      .value();
};

module.exports = {
  createObjectFilter,
  createArrayFilter,
};
