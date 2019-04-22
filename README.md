# fwc
Friendly Wagering Coin

[![Build Status](https://api.travis-ci.org/folkengine/fwc.svg?branch=master)](https://travis-ci.org/folkengine/fwc)

## Script

* `$> yarn init`
* `$> yarn add npm-run-all --dev`
* `$> `
* [Specify compiler version](https://github.com/trufflesuite/truffle/releases/tag/v5.0.0-beta.0#bring-your-own-compiler) in contracts/truffle-config:
```js
  compilers: {
    solc: {
      version: "0.5.2"
    }
  }
```

[FWC on Ethernet Ropsten](https://ropsten.etherscan.io/address/0xb5aaf55BB0a3a10C718594000723d1fE49F9A955)

```js
graph init \
  --from-contract 0xb5aaf55BB0a3a10C718594000723d1fE49F9A955 \
  --network ropsten \
  folkengine/fwc graph
```

## Helpful 

* [truffle-flattener](https://www.npmjs.com/package/truffle-flattener)
* [OpenZeppelin test helpers](https://github.com/OpenZeppelin/openzeppelin-test-helpers)

## Steps

* Create Contract
* Flatten Contract
* Migrate Contact to Ropsten 
* Verify [Contract Code](https://ropsten.etherscan.io/address/0xb5aaf55BB0a3a10C718594000723d1fE49F9A955#code)
* Init graph project `graph init --from-contract 0xb5aaf55BB0a3a10C718594000723d1fE49F9A955 --network ropsten folkengine/fwc graph`




https://api-ropsten.etherscan.io/api?module=contract&action=getabi&address=0xb5aaf55BB0a3a10C718594000723d1fE49F9A955
