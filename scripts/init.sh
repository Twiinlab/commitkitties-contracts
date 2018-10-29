web3.eth.account

main account = '0x4aaa4e3ce8e9d8a6533b75db54da017e2cf811c8'

web3.eth.getBalance('0xE370c2C187193ccF3B9265917C557602F68aC11f', function(err,res) { console.log(res.toNumber()) })


KittyCore.createAuction(_tokenId,
        uint256 _startingPrice,
        uint256 _endingPrice,
        uint256 _duration,
        address _seller


getAuction(uint256 _tokenId)

KittyCore.at("0x327c47ee276e84dfe7664b05bb1a0f1c95caab51").then(function(instance){ return instance.getKitty.call("1");}).then(function(result){console.log(result);})

SaleClockAuction.at("0x62f29d2be20c5b179a82b7977f7160c8b0b56e3a").then(function(instance){ return instance.getAuction.call("1");}).then(function(result){console.log(result);})

SaleClockAuction.at("0x62f29d2be20c5b179a82b7977f7160c8b0b56e3a").then(function(instance){ return instance.bid("1",{from: "0x6999e1d9ec10d0b0d06c657e289f55a2e17dea64", value:"100"});}).then(function(result){console.log(result);})

KittyCore.at("0x327c47ee276e84dfe7664b05bb1a0f1c95caab51").then(function(instance){ return instance.kittyIndexToOwner("1");}).then(function(result){console.log(result);})


