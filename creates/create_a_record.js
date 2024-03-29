const getAllAttributes = require('../helper/getAllAttributes');

const perform = (z, bundle) => {
  const getRecords = () => {
    const data = {};
    Object.keys(bundle.inputData).forEach((ele) => {
      if (!['schema', 'table', 'lookup_attribute', 'lookup_value'].includes(ele) && bundle.inputData[ele])
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
  const hostUrl = 'https://'+bundle.authData.host_address;

  const options = {
    url: hostUrl,
    method: 'POST',
    headers: {
      Authorization: basicAuth,
    },
    params: {},
    body: {
      operation: 'insert',
      schema: bundle.inputData.schema,
      table: bundle.inputData.table,
      records: getRecords(),
    },
  };

  return z.request(options).then((response) => {
    response.throwForStatus();
    const results = response.json;
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
      message: 'inserted 1 of 1 records',
      skipped_hashes: [],
      inserted_hashes: ['34986be2-0f95-4617-bb08-8db001fa9263'],
    },
    outputFields: [{ key: 'message', label: 'message', type: 'text' }],
  },
  key: 'create_a_record',
  noun: 'Record',
  display: {
    label: 'Create a Record',
    description:
      'Create a new record in a table of your choice. You must pass the id(hash_attribute) of the record you need to update.',
    hidden: false,
    important: true,
  },
};
