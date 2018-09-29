const config = require('./config/config.json')

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  networks: {
    development: {
      host: 'localhost',
      port: config.portTestnet,
      network_id: 1337,
    },
  },
};
