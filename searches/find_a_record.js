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

  console.log(query);

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
        altersDynamicFields: true,
      },
      {
        key: 'table',
        label: 'Table',
        type: 'string',
        dynamic: 'get_all_tables.name.name',
        required: true,
        list: false,
        altersDynamicFields: true,
      },
      {
        key: 'lookup_attribute',
        label: 'Lookup Attribute',
        type: 'string',
        helpText:
          'Column you want to search by with the value below. We will grab the latest matching record and give you all of its values',
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
    ]
  },
  key: 'find_a_record',
  noun: 'Record',
  display: {
    label: 'Find a Record',
    description: 'Finds a record in the table via a lookup attribute',
    hidden: false,
    important: true,
  },
};
