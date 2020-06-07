const authentication = require('./authentication');
const getAllTablesTrigger = require('./triggers/get_all_tables.js');
const getAllAttibutesTrigger = require('./triggers/get_all_attibutes.js');
const getAllSchemaTrigger = require('./triggers/get_all_schema.js');
const createARowCreate = require('./creates/create_a_row.js');
const updateARowCreate = require('./creates/update_a_row');

module.exports = {
  version: require('./package.json').version,
  platformVersion: require('zapier-platform-core').version,
  authentication: authentication,
  creates: {
    [createARowCreate.key]: createARowCreate,
    [updateARowCreate.key]: updateARowCreate,
  },
  triggers: {
    [getAllTablesTrigger.key]: getAllTablesTrigger,
    [getAllAttibutesTrigger.key]: getAllAttibutesTrigger,
    [getAllSchemaTrigger.key]: getAllSchemaTrigger,
  },
};
