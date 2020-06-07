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
      operation: 'describe_table',
      schema: bundle.authData.schema,
      table: 'breeds',
    },
  };

  return z.request(options).then((response) => {
    response.throwForStatus();
    const results = response.json;
    let id = 0;
    const attributes = [];
    results.attributes.forEach((ele) => {
      if (!['__updatedtime__', '__createdtime__'].includes(ele.attribute)) {
        ele.id = ++id;
        attributes.push(ele);
      }
    });
    return attributes;
  });
};

module.exports = {
  operation: {
    perform: perform,
    sample: { attribute: 'image', id: 1 },
    outputFields: [{ key: 'attribute', label: 'attribute' }],
  },
  key: 'get_all_attibutes',
  noun: 'attributes',
  display: {
    label: 'get all attributes',
    description: 'fetch all attributes of the table',
    hidden: true,
    important: false,
  },
};
