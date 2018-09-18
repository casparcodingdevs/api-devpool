const Joi = require('joi');
const { map, get } = require('lodash');

const matchArrays = require('../utils/match_arrays');

const joiTypes = ['any', 'array', 'boolean', 'date', 'number', 'string'];

const createAuthorizationRule = (type) =>
  (joi) => ({
    base: joi[type](),
    name: type,
    language: {
      authorize: 'is forbidden to be {{method}}d'
    },
    rules: [
      {
        name: 'authorize',
        params: {
          permitted: joi.object().required(),
          strictMode: joi.boolean().default(false)
        },
        validate(params, value, state, options) {
          const { authorization, method } = options.context;

          const permitted = get(params, `permitted.${method}`);

          if (!permitted || !matchArrays(authorization, permitted)) {
            if (params.strictMode) {
              return this.createError(`${type}.authorize`, { v: value, method }, state, options);
            }

            return undefined;
          }

          return value;
        }
      }
    ]
  });

const emptyStringToNull = (joi) => ({
  base: joi.string().allow(null),
  name: 'string',
  coerce: function (value, state, options) {
    if (value === '') {
      return null;
    }

    return value;
  },
});

const customJoi = Joi
  .extend(map(joiTypes, createAuthorizationRule))
  .extend(emptyStringToNull);

module.exports = customJoi;
