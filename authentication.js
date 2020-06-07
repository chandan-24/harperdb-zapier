const testAuth = (z, bundle) => {
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
      operation: 'user_info',
    },
  };

  return z.request(options).then((response) => {
    response.throwForStatus();
    const results = {};
    results.active = response.json.active;
    results.username = response.json.username;

    // You can do any parsing you need for results here before returning them

    return results;
  });
};

module.exports = {
  type: 'digest',
  test: testAuth,
  fields: [
    {
      computed: false,
      key: 'host_address',
      required: true,
      label: 'Host',
      type: 'string',
    },
    {
      computed: false,
      key: 'username',
      required: true,
      label: 'Username',
      type: 'string',
    },
    {
      computed: false,
      key: 'password',
      required: true,
      label: 'Password',
      type: 'password',
    },
  ],
  connectionLabel: '{{bundle.authData.username}}',
  digestConfig: {},
};
