const commonHooks = require('feathers-hooks-common');
const { hashPassword, protect } = require('@feathersjs/authentication-local').hooks;

const handDeletion = require('./hooks/before/handleDeletion');

const userInputSchema = require('../../schemas/user/input');
const userOutputSchema = require('../../schemas/user/output.json');

const resultsFilterHook = require('../../hooks/parser/results_filter');
const payloadValidationHook = require('../../hooks/parser/payload_validation');

module.exports = {
  before: {
    all: [
      commonHooks.softDelete(),
    ],
    find: [],
    get: [],
    create: [
      payloadValidationHook({
        schema: userInputSchema,
        method: 'create',
      }),
      hashPassword(),
    ],
    update: [],
    patch: [
      commonHooks.disableMultiItemChange(),
      commonHooks.stashBefore(),
      payloadValidationHook({
        schema: userInputSchema,
        ownership: 'id',
        method: 'update',
      }),
      hashPassword(),
      handDeletion,
    ],
    remove: []
  },

  after: {
    all: [
      protect('password', 'password_digest'),
      commonHooks.iff(
        commonHooks.isProvider('external'),
        protect('password_reset_token', 'email_verify_token'),
      ),
    ],
    find: [
      resultsFilterHook({
        schema: userOutputSchema,
        ownership: 'id',
      }),
    ],
    get: [
      resultsFilterHook({
        schema: userOutputSchema,
        ownership: 'id',
      }),
    ],
    create: [
      resultsFilterHook({
        schema: userOutputSchema,
        ownership: 'id',
        forceCriteria: ['owner']
      }),
    ],
    update: [],
    patch: [
      resultsFilterHook({
        schema: userOutputSchema,
        ownership: 'id',
      }),
    ],
    remove: [
      resultsFilterHook({
        schema: userOutputSchema,
        ownership: 'id',
      }),
    ],
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};

