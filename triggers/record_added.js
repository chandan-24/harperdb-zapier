const perform = (z, bundle) => {
  const basicAuth =
    'Basic ' +
    Buffer.from(
      bundle.authData.username + ':' + bundle.authData.password,
      'utf8'
    ).toString('base64');

  const hostUrl = 'https://'+bundle.authData.host_address;

  const query = `select * from ` + `${bundle.inputData.schema}.${bundle.inputData.table}` +` order by __createdtime__ desc`;

  const options = {
    url: hostUrl,
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
    canPaginate: false,
  },
  key: 'record_added',
  noun: 'Record',
  display: {
    label: 'New Record Added',
    description:
      'Trigger when a new record in added to the table. \'id\' should be your hash_attribute.',
    hidden: false,
    important: true,
  },
};
