const Joi = require('../../lib/joi');

const schema = Joi.object().keys({
  roles: Joi.array().allow(null).items(Joi.string()).authorize({
    create: [ 'admin' ],
    update: [ 'admin' ],
  }),
  surname: Joi.string().allow(null).authorize({
    create: [ 'public', 'owner', 'admin' ],
    update: [ 'owner', 'admin' ],
  }),
  forename: Joi.string().authorize({
    create: [ 'public', 'owner', 'admin' ],
    update: [ 'owner', 'admin' ],
  }).when('$method', { is: 'create', then: Joi.required() }),
  password: Joi.string().allow(null).authorize({
    create: [ 'public', 'owner', 'admin' ],
    update: [ 'owner', 'admin' ],
  }),
  email: Joi.string().authorize({
    create: [ 'public', 'owner', 'admin' ],
    update: [ 'owner', 'admin' ],
  }).when('$method', { is: 'create', then: Joi.required() }),
  locale: Joi.string().allow(null).authorize({
    create: [ 'public', 'owner', 'admin' ],
    update: [ 'owner', 'admin' ],
  }),
  timezone: Joi.string().allow(null).authorize({
    create: [ 'public', 'owner', 'admin' ],
    update: [ 'owner', 'admin' ],
  }),
  phone_number: Joi.string().allow(null).authorize({
    create: [ 'public', 'owner', 'admin' ],
    update: [ 'owner', 'admin' ],
  }),
  gender: Joi.string().allow(null).valid(['male', 'female']).authorize({
    create: [ 'public', 'owner', 'admin' ],
    update: [ 'owner', 'admin' ],
  }),
  homezone_country_code: Joi.string().allow(null).authorize({
    create: [ 'public', 'owner', 'admin' ],
    update: [ 'owner', 'admin' ],
  }),
  homezone_city_code: Joi.string().allow(null).authorize({
    create: [ 'public', 'owner', 'admin' ],
    update: [ 'owner', 'admin' ],
  }),
  homezone_district_code: Joi.string().allow(null).authorize({
    create: [ 'public', 'owner', 'admin' ],
    update: [ 'owner', 'admin' ],
  }),
  homezone_zipcode: Joi.string().allow(null).authorize({
    create: [ 'public', 'owner', 'admin' ],
    update: [ 'owner', 'admin' ],
  }),
  consent_update_requested_at: Joi.date().allow(null).authorize({
    create: [ 'admin' ],
    update: [ 'admin' ],
  }),
  is_consenting_privacy_policy_and_terms: Joi.boolean().allow(null).authorize({
    create: [ 'public', 'owner', 'admin' ],
    update: [ 'owner', 'admin' ],
  }),
  is_consenting_public_profile: Joi.boolean().allow(null).authorize({
    create: [ 'public', 'owner', 'admin' ],
    update: [ 'owner', 'admin' ],
  }),
  is_consenting_newsletters: Joi.boolean().allow(null).authorize({
    create: [ 'public', 'owner', 'admin' ],
    update: [ 'owner', 'admin' ],
  }),
  suspended_at: Joi.date().allow(null).authorize({
    create: [ 'admin' ],
    update: [ 'admin' ],
  }),
});

module.exports = schema;
