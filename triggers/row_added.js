const perform = (z, bundle) => {
  const basicAuth =
    'Basic ' +
    Buffer.from(
      bundle.authData.username + ':' + bundle.authData.password,
      'utf8'
    ).toString('base64');

  const query = `select * from ` + `${bundle.inputData.schema}.${bundle.inputData.table}` +` order by __createdtime__ desc`;

  const options = {
    url: bundle.authData.host_address,
    method: 'POST',
    headers: {
      Authorization: basicAuth,
    },
    params: {},
    body: {
      operation: 'sql',
      sql: query,
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
        type: 'string',
        label: 'schema',
        dynamic: 'get_all_schema.name.name',
        required: true,
        list: false,
        altersDynamicFields: true,
      },
      {
        key: 'table',
        type: 'string',
        label: 'table',
        dynamic: 'get_all_tables.name.name',
        required: true,
        list: false,
        altersDynamicFields: true,
      },
    ],
    outputFields: [],
  },
  key: 'row_added',
  noun: 'row',
  display: {
    label: 'New row added',
    description:
      'Triggered when a new row in added to the table. \'id\' should be is your hash_attribute.',
    hidden: false,
    important: true,
  },
};
