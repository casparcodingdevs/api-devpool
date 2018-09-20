const assert = require('assert');
const app = require('../../src/app');

describe('\'developers\' service', () => {
  it('registered the service', () => {
    const service = app.service('developers');

    assert.ok(service, 'Registered the service');
  });
});
