
const defaultConfig = require('./default.json');
const env = process.env.NODE_ENV;

const config = {
    dev: {
      api: {
        endpoint: 'http://localhost:8080',
        base: '/api'
      }
    },
    pro: {
      api: {
        endpoint: 'https://commitkitties-api.appspot.com',
        base: '/api'
      }
    }
};

module.exports = Object.assign( defaultConfig, config[env ? env : 'pro']);