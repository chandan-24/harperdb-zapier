const authentication = require('./authentication');
const getAllTablesTrigger = require('./triggers/get_all_tables');
const getAllSchemaTrigger = require('./triggers/get_all_schema');
const rowAddedTrigger = require('./triggers/row_added');
const getAllAttributesTrigger = require('./triggers/get_all_attributes');
const createARowCreate = require('./creates/create_a_row');
const upadateARowCreate = require('./creates/update_a_row');
const findRowSearch = require('./searches/find_a_row');

module.exports = {
  version: require('./package.json').version,
  platformVersion: require('zapier-platform-core').version,
  authentication: authentication,
  creates: {
    [createARowCreate.key]: createARowCreate,
    [upadateARowCreate.key]: upadateARowCreate,
  },
  triggers: {
    [getAllTablesTrigger.key]: getAllTablesTrigger,
    [getAllSchemaTrigger.key]: getAllSchemaTrigger,
    [rowAddedTrigger.key]: rowAddedTrigger,
    [getAllAttributesTrigger.key]: getAllAttributesTrigger,
  },
  searches: { [findRowSearch.key]: findRowSearch },
};
