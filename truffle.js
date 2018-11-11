const config = require('./config');

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  networks: {
    development: {
      host: 'localhost',
      port: 8545,
      network_id: '*'
    },
    gcloud: {
      host: '35.231.178.158',
      port: 8545,
      network_id: '*'
    },
  },
};
