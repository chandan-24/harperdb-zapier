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
      operation: 'describe_all',
    },
  };

  return z.request(options).then((response) => {
    response.throwForStatus();
    const results = [];
    let id = 0;
    Object.keys(response.json).forEach((ele) => {
      const schema = {
        id: ++id,
        name: ele,
      };
      results.push(schema);
    });
    // You can do any parsing you need for results here before returning them

    return results;
  });
};

module.exports = {
  operation: {
    perform: perform,
    sample: { id: 1, name: 'dev' },
    outputFields: [{ key: 'name', label: 'name' }],
  },
  key: 'get_all_schema',
  noun: 'schema',
  display: {
    label: 'get all schema',
    description: 'fetch all schema from the server',
    hidden: true,
    important: false,
  },
};
