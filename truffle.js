const HDWalletProvider = require("truffle-hdwallet-provider");
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
    rinkeby: {
      // provider: () => new HDWalletProvider(config.network.account.key, config.network.http ),
      provider: () => new HDWalletProvider(config.network.mnemonic, config.network.http, 0),
      gas : 6700000, 
      gasPrice : 10000000000,
      network_id:4
    },
  },
  solc: {
    optimizer: {
      enabled: true,
      runs: 2000
    }
  }
};
