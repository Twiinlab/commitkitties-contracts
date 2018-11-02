const axios = require('axios')
const _ = require('lodash')


const config = require('../config')
const Contract = require('./contract.js')

class Kitty {

  // static async getContractAddress(contractName){
    
  //   if (process.env[`ADDRESS_${_.snakeCase(contractName).toUpperCase()}`]){
  //     return Promise.resolve(process.env[`ADDRESS_${_.snakeCase(contractName).toUpperCase()}`]);
  //   }
  //   const contract = await axios.get(`${config.api.endpoint}${config.api.base}/contracts`, contractName);

  //   return contract.address;

  // }

  static async createKitty(matronId, sireId, generation, genes, owner) {

    const kittyCore = Contract.declaration('KittyCore').at(process.env.ADDRESS_KITTY_CORE)

    const kittyId = parseInt(await kittyCore.createKitty.call(
      matronId,
      sireId,
      generation,
      genes,
      owner,
      { value: 0, gas: 500000, gasPrice: 10000000000 } // eslint-disable-line comma-dangle
    ), 10)

    await kittyCore.createKitty(
      matronId,
      sireId,
      generation,
      genes,
      owner,
      { value: 0, gas: 500000, gasPrice: 10000000000 } // eslint-disable-line comma-dangle
    )

    return kittyId.toString();
  }

  static async fetchAttrsApi(kittyId) {
    return (await axios.get(`https://api.cryptokitties.co/kitties/${kittyId}`)).data
  }

  static async fetchAttrsChain(kittyId) {
    const kittyCoreMainnet = Contract.declarationMainnet('KittyCore').at(config.addressKittyCoreMainnet)
    const [
      isGestating,
      isReady,
      cooldownIndex,
      nextActionAt,
      siringWithId,
      birthTime,
      matronId,
      sireId,
      generation,
      genes,
    ] = await kittyCoreMainnet.getKitty(kittyId)

    return {
      isGestating,
      isReady,
      cooldownIndex,
      nextActionAt,
      siringWithId,
      birthTime,
      matronId,
      sireId,
      generation,
      genes,
    }
  }

  static getRandom(limit){
    return Math.floor(Math.random() * limit) + 1  
  }

  static async importKitty(kittyIdMainnet, owner) {
    const attrsChain = await this.fetchAttrsChain(kittyIdMainnet)
    const attrsApi = await this.fetchAttrsApi(kittyIdMainnet)

    let kittyId = await this.createKitty(
        attrsChain.matronId,
        attrsChain.sireId,
        attrsChain.generation,
        attrsChain.genes,
        owner
      );
    attrsApi.id = kittyId;
    attrsApi.owner = { address: owner, userId: null };
    
    if (this.getRandom(2) === 2) { //create Auction in 50% of new kitties
      let price = 100 * this.getRandom(10);
      await this.createAuction(
          kittyId,
          price, 
          price, 
          price, 
          owner
          );
      attrsApi.auction = { price };
    } else {
      attrsApi.auction = {};
    }
    
    return await axios.post(`${config.api.endpoint}${config.api.base}/kitties`, attrsApi);
    
  }

  static async createAuction(tokenId, startingPrice, endingPrice, duration, seller) {

    const kittyCore = Contract.declaration('KittyCore').at( process.env.ADDRESS_KITTY_CORE );

    return await kittyCore.createSaleAuction(
      tokenId, 
      startingPrice, 
      endingPrice, 
      duration,
      { from: seller, value: 0, gas: 500000, gasPrice: 10000000000 } // eslint-disable-line comma-dangle
    );

  }

}

// Kitty.db = require('../api/db.js')

module.exports = Kitty
