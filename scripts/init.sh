Available Accounts
==================
(0) 0x4aaa4e3ce8e9d8a6533b75db54da017e2cf811c8 (~100 ETH)
(1) 0x6999e1d9ec10d0b0d06c657e289f55a2e17dea64 (~100 ETH)
(2) 0x3788e8dc5af58da6866454acac0597aff03ab8e9 (~100 ETH)
(3) 0xbd96a20eaa28874b81a0540d371327d16b4004b8 (~100 ETH)
(4) 0x54072d778673d1df7e87c42e7771ff710628555a (~100 ETH)
(5) 0x0d2078daf76e38f37e31baa93d4d257040612503 (~100 ETH)
(6) 0x24394f0e42e56b0c117bb8df4aedb536386524ec (~100 ETH)
(7) 0x5c813c7ebc380c29575302ad81e530690262d160 (~100 ETH)
(8) 0x6d35d6c0c9ef6d3d4507073561806b126cb4b771 (~100 ETH)
(9) 0xa9df85ce7e31ef71f842f85e08344df3003c1f72 (~100 ETH)

Private Keys
==================
(0) 0xbb73e8a2733d614b215c1a651dd3884cabf1149a6dc847f1b6ce20c9d2f682ce
(1) 0x1eb760be23a1a72cae7d7b70f9f7cdc1a4a7c4161a5dc82be205bef57a58a596
(2) 0xdbbd52d516f33b8a858b4487d2e4e11db7d64eb1364409336f672d4c3b927de4
(3) 0x94447f5e458a09703b2fce4415f72e36a7cc587b52452a8b3589f7b0223c00e8
(4) 0x0a737069ac10224c8222299167e138353f4b58076662c73f5b9295f160107899
(5) 0xb697af4ecd7a4cf22089ac1206ea1edf123ba1ee14d6ed62f123550fa330ba6a
(6) 0xc4d157078d19d02d29cd49ff5fcd5c50b7f81278f24bcac159b801572f938ee3
(7) 0x7fdc97d9bb9a581bdee3e099cd1a7bd4d94ba2d8ab621cde6f5b75f55d603da8
(8) 0xb94ab4e133c9c222b1cf4ef1c009372bca99120d257a9bfe4cf7955c13bbb85f
(9) 0xe84769a7ed5838f8039dbc02ffb7c14981322a5b422b1748402f5eb6fc74e053




web3.eth.account

main account = '0x4aaa4e3ce8e9d8a6533b75db54da017e2cf811c8'

web3.eth.getBalance('0x6999e1d9ec10d0b0d06c657e289f55a2e17dea64', function(err,res) { console.log(res.toNumber()) })


KittyCore.createAuction(_tokenId,
        uint256 _startingPrice,
        uint256 _endingPrice,
        uint256 _duration,
        address _seller


getAuction(uint256 _tokenId)

KittyCore.at("0xa3c510935b08d4adcfed01366262ce5d3279ad29").then(function(instance){ return instance.getKitty.call("10");}).then(function(result){console.log(result);})

SaleClockAuction.at("0x7639579dbcb28ef5af8f4fd9f7e6f3296e7fedb9").then(function(instance){ return instance.getAuction.call("19");}).then(function(result){console.log(result);})

SaleClockAuction.at("0x62f29d2be20c5b179a82b7977f7160c8b0b56e3a").then(function(instance){ return instance.bid("1",{from: "0x6999e1d9ec10d0b0d06c657e289f55a2e17dea64", value:"100"});}).then(function(result){console.log(result);})

KittyCore.at("0x2b7ec3747c6d4ebfd79512ac2ad32c189afe911c").then(function(instance){ return instance.kittyIndexToOwner("10");}).then(function(result){console.log(result);})

docker run -d -p 8545:8545 trufflesuite/ganache-cli:latest -h 0.0.0.0 -m 'cargo little forum bring connect ready old matter accident ability never thumb'