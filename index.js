const authentication = require('./authentication');
const getAllTablesTrigger = require('./triggers/get_all_tables');
const getAllSchemaTrigger = require('./triggers/get_all_schema');
const getAllAttributesTrigger = require('./triggers/get_all_attributes');
// const recordAddedTrigger = require('./triggers/record_added');
// const recordUpdatedTrigger = require('./triggers/record_updated');
const createARecordCreate = require('./creates/create_a_record');
const upadateARecordCreate = require('./creates/update_a_record');
const updateOrCreateARecordCreate = require('./creates/update_or_create_a_record');
const findRecordSearch = require('./searches/find_a_record');
const findRecordViaCustomQuerySearch = require('./searches/find_record_via_custom_query');
const findOrCreateRecordSearch = require('./searches/find_or_create_record');

module.exports = {
  version: require('./package.json').version,
  platformVersion: require('zapier-platform-core').version,
  authentication: authentication,
  creates: {
    [createARecordCreate.key]: createARecordCreate,
    [upadateARecordCreate.key]: upadateARecordCreate,
    [updateOrCreateARecordCreate.key]: updateOrCreateARecordCreate,
  },
  triggers: {
    [getAllTablesTrigger.key]: getAllTablesTrigger,
    [getAllSchemaTrigger.key]: getAllSchemaTrigger,
    [getAllAttributesTrigger.key]: getAllAttributesTrigger,
    // [recordAddedTrigger.key]: recordAddedTrigger,
    // [recordUpdatedTrigger.key]: recordUpdatedTrigger,
  },
  searches: {
    [findRecordSearch.key]: findRecordSearch,
    [findRecordViaCustomQuerySearch.key]: findRecordViaCustomQuerySearch,
    [findOrCreateRecordSearch.key]: findOrCreateRecordSearch,
  },
  searchOrCreates: {
    find_or_create_record: {
      key: 'find_or_create_record',
      display: {
        label: 'Find Or Create Record',
        description:
          'Find a Record or alternatively create a new one if not found.',
      },
      search: 'find_or_create_record',
      create: 'create_a_record',
    },
  },
};
