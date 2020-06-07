const getAllAttributes = (z, bundle) => {
  if(!bundle.inputData.schema && !bundle.inputData.table)
    return [];

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
      operation: 'describe_table',
      schema: bundle.inputData.schema,
      table: bundle.inputData.table,
    },
  };

  return z.request(options).then((response) => {
    response.throwForStatus();
    const results = response.json;
    let id = 0;
    const attributes = [];
    results.attributes.forEach((ele) => {
      if (!['__updatedtime__', '__createdtime__'].includes(ele.attribute)) {
        ele.label = ele.attribute;
        ele.key = ele.attribute;
        ele.type = 'string',
        attributes.push(ele);
      }
    });
    return attributes;
  });
};


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
      skipped_hashes: [],
      update_hashes: ['06a885b1-2cfe-46af-8493-4875edcafc88'],
    },
    outputFields: [{ key: 'message', label: 'message', type: 'text' }],
  },
  key: 'update_a_row',
  noun: 'row',
  display: {
    label: 'Update a row',
    description: 'update a row in table',
    hidden: false,
    important: true,
  },
};
