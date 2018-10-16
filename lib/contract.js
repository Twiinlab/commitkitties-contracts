const _ = require('lodash')
const contract = require('truffle-contract')
const fs = require('fs')
const path = require('path')
const Web3 = require('web3')
const axios = require('axios')

const config = require('../config/config.json')

class Contract {
  static get addresses() {
    const addresses = {}

    const filenames = fs.readdirSync(path.join(__dirname, '../contracts'))
    filenames.forEach((filename) => {
      if (!filename.match(/\.sol$/)) {
        return
      }

      const contractName = filename.replace(/\.sol$/, '')
      addresses[contractName] = process.env[`ADDRESS_${_.snakeCase(contractName).toUpperCase()}`]
    })

    return addresses
  }

  static get contractDefaults() {
    return {
      from: this.accounts[0] || config.accounts[0].address,
      gas: 6500000,
      gasPrice: 100000000000,
    }
  }

  static declaration(contractName) {
    // eslint-disable-next-line global-require, import/no-dynamic-require
    const declaration = contract(require(`../build/contracts/${contractName}.json`))
    declaration.defaults(this.contractDefaults)
    declaration.setProvider(this.web3Provider)

    return declaration
  }

  static declarationMainnet(contractName) {
    const declaration = Contract.declaration(contractName)
    declaration.setProvider(this.web3ProviderMainnet)

    return declaration
  }

  static async deploy(contractName, ...constructorArgs) {
    const newContract = constructorArgs.length > 0
      ? await this.declaration(contractName).new(...constructorArgs)
      : await this.declaration(contractName).new()

    process.env[`ADDRESS_${_.snakeCase(contractName).toUpperCase()}`] = newContract.address

    return newContract
  }

  static async register(contractName, address) {
    // eslint-disable-next-line global-require, import/no-dynamic-require
    const { abi, bytecode } = require(`../build/contracts/${contractName}.json`);
    return await axios.post(`https://commitkitties-api.appspot.com/api/contract`, { id: contractName, abi , bytecode, address });
  }

  static get accounts() {
    return (new Web3(this.web3Provider)).eth.accounts;
  }

  static get network() {
    return (new Web3(this.web3Provider)).version.network;
  }

  static get web3Provider() {
    return new Web3.providers.HttpProvider(`http://localhost:${config.portTestnet}`)
  }

  static get web3SocketProvider() {
    return new Web3.providers.WebsocketProvider(`ws://localhost:${config.portTestnet}`)
  }

  static get web3ProviderMainnet() {
    return new Web3.providers.HttpProvider(config.ethNodeMainnet)
  }

}

module.exports = Contract
