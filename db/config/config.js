const feathers = require('@feathersjs/feathers');
const configuration = require('@feathersjs/configuration');


let app = feathers().configure(configuration());

const env = process.env.NODE_ENV || 'development';
const dialect = 'postgres';
const url = app.get(dialect);

if (!url) {
  throw new Error('Missing postgresql connection string');
}

module.exports = {
  [env]: {
    dialect,
    url,
    migrationStorageTableName: '_migrations'
  }
};

