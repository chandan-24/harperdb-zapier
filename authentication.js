const test = (z, bundle) => {
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
      operation: 'user_info',
    },
  };

  return z.request(options).then((response) => {
    response.throwForStatus();
    const results = {};
    results.active = response.json.active;
    results.username = response.json.username;
    return results;
  });
};

module.exports = {
  type: 'digest',
  test,
  fields: [
    {
      computed: false,
      key: 'host_address',
      required: true,
      label: 'Host',
      type: 'string',
      helpText:
        'The IP address or hostname (db.example.com) of where your database instance resides. Note, localhost and 127.0.0.1 are not valid! Make sure it is accessible from outside of your network.',
    },
    {
      computed: false,
      key: 'username',
      required: true,
      label: 'Username',
      type: 'string',
      helpText:
        'We recommend creating a new database user with extremely limited access.\n',
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
