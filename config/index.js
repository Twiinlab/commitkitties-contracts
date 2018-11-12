
const defaultConfig = require('./default.json');
const env = process.env.NODE_ENV;

const config = {
    dev: {
      api: {
        endpoint: 'http://localhost:8080',
        base: '/api'
      },
      network:{
        http: "http://localhost:8545",
        ws: "ws://localhost:8545",
        account: {
          address: "0x4aaa4e3ce8e9d8a6533b75db54da017e2cf811c8",
          key: "0xbb73e8a2733d614b215c1a651dd3884cabf1149a6dc847f1b6ce20c9d2f682ce"
        },
        mnemonic: "cargo little forum bring connect ready old matter accident ability never thumb"
      } 
    },
    pre: {
      api: {
        endpoint: 'http://localhost:8080',
        base: '/api'
      },
      network:{
        http: "http://35.231.178.158:8545",
        ws: "ws://35.231.178.158:8545",
        account: {
          address: "0x4aaa4e3ce8e9d8a6533b75db54da017e2cf811c8",
          key: "0xbb73e8a2733d614b215c1a651dd3884cabf1149a6dc847f1b6ce20c9d2f682ce"
        },
        mnemonic: "cargo little forum bring connect ready old matter accident ability never thumb"
      } 
    },
    pro: {
      api: {
        endpoint: 'http://localhost:8080',//'https://commitkitties-api.appspot.com',
        base: '/api'
      },
      network: {
        http: "https://rinkeby.infura.io/v3/b97d8303c3d84cf8bb43c325612ae8a7",
        ws: "wss://rinkeby.infura.io/v3/b97d8303c3d84cf8bb43c325612ae8a7",
        account: {
            address: "0x8420AaB0b1a42c26089e696FBeF3e35ec9Da2849",
            key: "79A2227E181F91A2CFE1C89394A2BF0D530B83952A83928770F3ABB2070A5F30"
        },
        mnemonic: "roof aware length another south suspect dust useful fan toy language wolf"
      }
    }
};

module.exports = Object.assign( defaultConfig, config[env ? env : 'pro']);