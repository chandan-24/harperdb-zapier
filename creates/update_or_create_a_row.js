const getAllAttributes = require('../helper/getAllAttributes');
const createRow = require('./create_a_row');

const perform = (z, bundle) => {
  const getRecords = () => {
    const data = {};
    Object.keys(bundle.inputData).forEach((ele) => {
      if (!['schema', 'table'].includes(ele) && bundle.inputData[ele])
        data[ele] = bundle.inputData[ele];
    });
    return [data];
  };

  const basicAuth =
    'Basic ' +
    Buffer.from(
      bundle.authData.username + ':' + bundle.authData.password,
      'utf8'
    ).toString('base64');

  const options = {
    url: bundle.authData.host_address,
    method: 'POST',
    headers: {
      Authorization: basicAuth,
    },
    params: {},
    body: {
      operation: 'update',
      schema: bundle.inputData.schema,
      table: bundle.inputData.table,
      records: getRecords(),
    },
  };

  return z.request(options).then((response) => {
    response.throwForStatus();
    const results = response.json;
    if (results.skipped_hashes.length) {
      return createRow.operation.perform(z,bundle);
    }
    return results;
  });
};


module.exports = {
  operation: {
    perform: perform,
    inputFields: [
      {
        key: 'schema',
        label: 'schema',
        type: 'string',
        dynamic: 'get_all_schema.name.name',
        required: true,
        list: false,
        altersDynamicFields: true,
      },
      {
        key: 'table',
        label: 'table',
        type: 'string',
        dynamic: 'get_all_tables.name.name',
        required: true,
        list: false,
        altersDynamicFields: true,
      },
      getAllAttributes,
    ],
    sample: {
      message: 'updated 1 of 1 records',
      skipped_hashes: ['some_id'],
      update_hashes: ['06a885b1-2cfe-46af-8493-4875edcafc88'],
    },
    outputFields: [{ key: 'message', label: 'message', type: 'text' }],
  },
  key: 'update_or_create_a_row',
  noun: 'row',
  display: {
    label: 'Update or create a row',
    description:
      'Update an existing row or alternatively create one if it does not exist in the selected table. You must pass the id(hash_attribute) of the row you need to update.',
    hidden: false,
    important: true,
  },
};
