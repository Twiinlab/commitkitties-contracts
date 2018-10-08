const ganache = require('ganache-cli')
const axios = require('axios')
const config = require('./config/config.json')
// const fs = require('fs')
// const Cheshire = require('./lib/cheshire.js')
// const path = require('path')
// const { exec } = require('child_process')
// const Api = require('./api')
// const Contract = require('./lib/contract.js')
// const User = require('./lib/user.js')

const { log } = console

const Server = {
  startTestnet() {
    log('> Starting testnet...')

    ganache.server({
      accounts: config.accounts,
      debug: true,
      logger: console,
      verbose: true,
    })
      .listen(config.portTestnet, (err, start) => {
        log('> Starting ganache...');
        if (err) {
          log('Error starting Ganache:', err)
          process.exit(1)
        }
      })
  },

  async initKittiest(){
      // const attrsApi = await this.fetchAttrsApi(addressMainnet)
      // attrsApi.address = addressTestnet
  
      // this.db.run('UPDATE users SET address_mainnet=?, api_object=? WHERE address_testnet=?', addressMainnet, JSON.stringify(attrsApi), addressTestnet)
  
      const { kitties } = (await axios.get(`https://api.cryptokitties.co/kitties?offset=0&&limit=20`)).data
  
      for (const kitty of kitties) {
        await Kitty.importKitty(kitty.id, config.addressKittyCoreMainnet) // eslint-disable-line no-await-in-loop
      }
  
      module.exports = async function importBugCat(cheshire) {
        const bugCatIdMainnet = 101
        const ownerTestnet = cheshire.accounts[0].address
        const kittyIdTestnet = await cheshire.importKitty(bugCatIdMainnet, ownerTestnet)
      
        console.log(`Kitty #${kittyIdTestnet} => ${ownerTestnet}`)
      }
      
      return config.addressKittyCoreMainnet
  },

//   async compileContracts() {
//     log('> Compiling contracts...')

//     return new Promise((resolve, reject) => {
//       const child = exec('truffle compile')
//       child.stdout.pipe(process.stdout)
//       child.stderr.pipe(process.stderr)
//       child.on('error', log)
//       child.on('close', (code) => {
//         if (code === 0) {
//           resolve()
//         } else {
//           log('Exited with code', code)
//           reject()
//         }
//       })
//     })
//   },

//   async deployContracts() {
//     log('> Deploying CryptoKitties contracts to testnet...')

//     const ownerCut = 375

//     const kittyCore = await Contract.deploy('KittyCore')
//     const saleClockAuction = await Contract.deploy('SaleClockAuction', kittyCore.address, ownerCut)
//     const siringClockAuction = await Contract.deploy('SiringClockAuction', kittyCore.address, ownerCut)
//     const geneScience = await Contract.deploy('GeneScience')

//     await kittyCore.setSaleAuctionAddress(saleClockAuction.address)
//     await kittyCore.setSiringAuctionAddress(siringClockAuction.address)
//     await kittyCore.setGeneScienceAddress(geneScience.address)
//     await kittyCore.unpause()

//     return {
//       kittyCore: kittyCore.address,
//       saleClockAuction: saleClockAuction.address,
//       siringClockAuction: siringClockAuction.address,
//       geneScience: geneScience.address,
//     }
//   },

//   async startApiServer() {
//     log('> Starting local CryptoKitties API server...')

//     Api.listen(config.portApi)
//   },

//   async loadAccounts() {
//     log('> Loading accounts')

//     config.accounts.forEach(async (account, index) => {
//       const apiObject = {
//         address: account.address,
//         nickname: `User #${index}`,
//         image: '1',
//       }

//       await User.createUser(account.address, account.address, apiObject)
//     })
//   },

//   async runSetupScript() {
//     log('> Running setup script...')

//     const scriptPath = path.join(process.cwd(), process.argv[2] || './scripts/setup.js')
//     if (!fs.existsSync(scriptPath)) {
//       log('Exiting, script not found:', scriptPath)
//       process.exit(1)
//     }

//     const cheshire = new Cheshire(config)

//     console.group()
//     // eslint-disable-next-line global-require, import/no-dynamic-require
//     await require(scriptPath)(cheshire)
//     console.groupEnd()
//   },

  async start() {
    await this.startTestnet()
    await this.initKittiest();
    // await this.compileContracts()
    // await this.deployContracts()
    // await this.startApiServer()
    // await this.loadAccounts()
    // await this.runSetupScript()

    log('')
    log('CommitKitties is live 😺')
    log('')

    // await new Cheshire(config).printHelp()
  },
}

Server.start()
