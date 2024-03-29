require('should');

const zapier = require('zapier-platform-core');

const App = require('../../index');
const appTester = zapier.createAppTester(App);

describe('Create - create_a_record', () => {
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
    const result = await appTester(
      App.creates['create_a_record'].operation.perform,
      bundle
    );
    result.should.not.be.an.Object();
  });
});
