const perform = (z, bundle) => {
  const basicAuth =
    'Basic ' +
    Buffer.from(
      bundle.authData.username + ':' + bundle.authData.password,
      'utf8'
    ).toString('base64');

  const hostUrl = 'https://'+bundle.authData.host_address;

  const query =
    `select * from ` +
    `${bundle.inputData.schema}.${bundle.inputData.table}` +
    ` where ${bundle.inputData.lookup_attribute} = '${bundle.inputData.lookup_value}'` +
    ` order by __createdtime__ desc limit 1`;

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
        label: 'Schema',
        type: 'string',
        dynamic: 'get_all_schema.name.name',
        required: true,
        list: false,
        altersDynamicFields: false,
      },
      {
        key: 'table',
        label: 'Table',
        type: 'string',
        dynamic: 'get_all_tables.name.name',
        required: true,
        list: false,
        altersDynamicFields: false,
      },
      {
        key: 'lookup_attribute',
        label: 'Lookup Attribute',
        type: 'string',
        dynamic: 'get_all_attributes.attribute.attribute',
        required: true,
        list: false,
        altersDynamicFields: false,
      },
      {
        key: 'lookup_value',
        label: 'Lookup Value',
        type: 'string',
        required: true,
        list: false,
        altersDynamicFields: false,
      },
    ],
  },
  key: 'find_or_create_row',
  noun: 'row',
  display: {
    label: 'Find or Create a row',
    description: 'Find a row or alternatively create a new one if not found.',
    hidden: false,
    important: true,
  },
};
