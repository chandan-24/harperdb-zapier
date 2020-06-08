const getAllTributes = (z, bundle) => {
  if(!bundle.inputData.schema && !bundle.inputData.table)
    return [];

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
      if (!['__updatedtime__', '__createdtime__'].includes(ele.attribute)) {
        ele.label = ele.attribute;
        ele.key = ele.attribute;
        ele.type = 'string',
        attributes.push(ele);
      }
    });
    return attributes;
  });
};

module.exports = getAllTributes;
