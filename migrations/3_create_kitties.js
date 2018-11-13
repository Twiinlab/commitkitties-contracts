const Migrations = artifacts.require("./Migrations.sol")
const GeneScience = artifacts.require("./GeneScience.sol")
const KittyCore = artifacts.require("./KittyCore.sol")
const SaleClockAuction = artifacts.require("./SaleClockAuction.sol")
const SiringClockAuction = artifacts.require("./SiringClockAuction.sol")

const Contract = require("../lib/contract")
const Kitty = require("../lib/kitty")
const config = require("../config")
const axios = require('axios')


function getKittyValue(kitty){
  return Math.pow(10, 15) * Math.abs(kitty.generation || 1) * (kitty.is_fancy ? 2 : 1) * (kitty.is_exclusive ? 2 : 1)
}

module.exports = (deployer, network) => {
  deployer.then(async () => {
    
    console.log('Init Create Kitties');

    // console.log('register Contracts')
    // await Contract.register('KittyCore', kittyCore.address);
    // console.log(`KittyCore registered in ${kittyCore.address}`);
    // await Contract.register('SaleClockAuction', saleClockAuction.address);
    // console.log(`SaleClockAuction registered in ${saleClockAuction.address}`);
    // await Contract.register('SiringClockAuction', siringClockAuction.address);
    // console.log(`SiringClockAuction registered in ${ siringClockAuction.address}`);

    const kittyCoreInstance = await KittyCore.at("0x0c689b182939b29ab4d5c505fe74e17048ff1541");

    const { kitties } = (await axios.get(`https://api.cryptokitties.co/kitties?offset=0&&limit=20`)).data
    const mainAccount = Contract.mainAccount.address;

    for (const kitty of kitties) {
      //call Smarcontract
      
      const attrsChain = await Kitty.fetchAttrsChain(kitty.id)
      const attrsApi = await Kitty.fetchAttrsApi(kitty.id)

      const kittyId = parseInt(await kittyCoreInstance.createKitty.call(
        attrsChain.matronId,
        attrsChain.sireId,
        attrsChain.generation,
        attrsChain.genes,
        mainAccount,
        { value: 0, gas: 500000, gasPrice: 10000000000 } // eslint-disable-line comma-dangle
      ), 10)
  
      await kittyCoreInstance.createKitty(
        attrsChain.matronId,
        attrsChain.sireId,
        attrsChain.generation,
        attrsChain.genes,
        mainAccount,
        { value: 0, gas: 500000, gasPrice: 10000000000 } // eslint-disable-line comma-dangle
      )

      attrsApi.id = kittyId.toString();
      attrsApi.owner = { address: mainAccount };
      attrsApi.value = getKittyValue(attrsApi);

      console.log(`Kitty #${kitty.id} => ${JSON.stringify(kitty)}`)
      await axios.post(`${config.api.endpoint}${config.api.base}/kitties`, attrsApi);
    }


  })

}
