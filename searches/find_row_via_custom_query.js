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
      operation: 'sql',
      sql: bundle.inputData.query,
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
        key: 'query',
        label: 'Query',
        type: 'string',
        helpText:
          'You should include desired ordering and limiting (usually to 1 record) in the query',
        default: 'SELECT * FROM schema.table ORDER BY id DESC LIMIT 1',
        required: true,
        list: false,
        altersDynamicFields: false,
      },
    ],
  },
  key: 'find_row_via_custom_query',
  noun: 'row',
  display: {
    label: 'Find Row via Custom Query',
    description: 'Finds a row in a table via a custom query you control.',
    hidden: false,
    important: true,
  },
};
