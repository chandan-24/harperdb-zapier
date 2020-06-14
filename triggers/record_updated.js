const perform = (z, bundle) => {
  const basicAuth =
    'Basic ' +
    Buffer.from(
      bundle.authData.username + ':' + bundle.authData.password,
      'utf8'
    ).toString('base64');

  const hostUrl = 'https://'+bundle.authData.host_address;

  const query = `select * from ` + `${bundle.inputData.schema}.${bundle.inputData.table}` +` order by __updatedtime__ desc`;

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
        label: 'Schema',
        dynamic: 'get_all_schema.name.name',
        required: false,
        list: false,
        altersDynamicFields: false,
      },
      {
        key: 'table',
        type: 'string',
        label: 'Table',
        dynamic: 'get_all_tables.name.name',
        required: false,
        list: false,
        altersDynamicFields: false,
      },
    ],
    canPaginate: false,
  },
  key: 'record_updated',
  noun: 'Record',
  display: {
    label: 'Record Updated',
    description: 'Trigger when a record is modified.',
    hidden: false,
    important: true,
  },
};
