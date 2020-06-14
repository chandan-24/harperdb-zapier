require('should');

const zapier = require('zapier-platform-core');

const App = require('../../index');
const appTester = zapier.createAppTester(App);

describe('Create - update_or_create_a_row', () => {
  zapier.tools.env.inject();

  it('should create an object', async () => {
    const bundle = {
      authData: {
        host_address: process.env.HOST_ADDRESS,
        username: process.env.USERNAME,
        password: process.env.PASSWORD,
        oauth_consumer_key: process.env.OAUTH_CONSUMER_KEY,
        oauth_consumer_secret: process.env.OAUTH_CONSUMER_SECRET,
        oauth_token: process.env.OAUTH_TOKEN,
        oauth_token_secret: process.env.OAUTH_TOKEN_SECRET,
      },

      inputData: {},
    };

    const operation = App.creates['update_or_create_a_row'].operation;
    const result = await appTester(
      operation.perform,
      bundle
    );
    result.should.not.be.an.Array();
  });
});