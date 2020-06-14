const authentication = require('./authentication');
const getAllTablesTrigger = require('./triggers/get_all_tables');
const getAllSchemaTrigger = require('./triggers/get_all_schema');
const rowAddedTrigger = require('./triggers/row_added');
const getAllAttributesTrigger = require('./triggers/get_all_attributes');
const rowUpdatedTrigger = require('./triggers/row_updated');
const createARowCreate = require('./creates/create_a_row');
const upadateARowCreate = require('./creates/update_a_row');
const updateOrCreateARowCreate = require('./creates/update_or_create_a_row');
const findRowSearch = require('./searches/find_a_row');
const findRowViaCustomQuerySearch = require('./searches/find_row_via_custom_query');
const findOrCreateRowSearch = require('./searches/find_or_create_row');

module.exports = {
  version: require('./package.json').version,
  platformVersion: require('zapier-platform-core').version,
  authentication: authentication,
  creates: {
    [createARowCreate.key]: createARowCreate,
    [upadateARowCreate.key]: upadateARowCreate,
    [updateOrCreateARowCreate.key]: updateOrCreateARowCreate,
  },
  triggers: {
    [getAllTablesTrigger.key]: getAllTablesTrigger,
    [getAllSchemaTrigger.key]: getAllSchemaTrigger,
    [rowAddedTrigger.key]: rowAddedTrigger,
    [getAllAttributesTrigger.key]: getAllAttributesTrigger,
    [rowUpdatedTrigger.key]: rowUpdatedTrigger,
  },
  searches: {
    [findRowSearch.key]: findRowSearch,
    [findRowViaCustomQuerySearch.key]: findRowViaCustomQuerySearch,
    [findOrCreateRowSearch.key]: findOrCreateRowSearch,
  },
  searchOrCreates: {
    find_or_create_row: {
      key: 'find_or_create_row',
      display: {
        label: 'Find or Create row',
        description:
          'Find a row or alternatively create a new one if not found.',
      },
      search: 'find_or_create_row',
      create: 'create_a_row',
    },
  },
};
