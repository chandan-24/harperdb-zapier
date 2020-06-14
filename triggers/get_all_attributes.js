const perform = (z, bundle) => {
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
      ele.id = ++id;
      attributes.push(ele);
    });
    return attributes;
  });
};

module.exports = {
  operation: {
    perform: perform,
    sample: { attribute: '__updatedtime__', id: 1 },
    outputFields: [{ key: 'attribute', label: 'Attribute' }],
  },
  key: 'get_all_attributes',
  noun: 'Attributes',
  display: {
    label: 'Get all Attributes',
    description: 'Fetch all attributes of the table from the schema',
    hidden: true,
    important: false,
  },
};
