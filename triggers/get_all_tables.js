const perform = (z, bundle) => {
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
      operation: 'describe_schema',
      schema: bundle.inputData.schema,
    },
  };

  return z.request(options).then((response) => {
    response.throwForStatus();
    const results = response.json;

    // You can do any parsing you need for results here before returning them

    return results;
  });
};

module.exports = {
  operation: {
    perform: perform,
    sample: {
      id: '245640e1-2afc-4cbd-980a-006dbb931c30',
      name: 'breeds',
    },
    outputFields: [{ key: 'name', label: 'Table', type: 'string' }],
  },
  key: 'get_all_tables',
  noun: 'tables',
  display: {
    label: 'get all tables',
    description: 'fetch all tables from the schema',
    hidden: true,
    important: false,
  },
};
