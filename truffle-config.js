require('dotenv').config();
require('babel-register');
require('babel-polyfill');
const HDWalletProvider = require("truffle-hdwallet-provider");

const path = require("path");

module.exports = {
  contracts_build_directory: path.join(__dirname, "./client/src/contracts"),
  // compilers: {
  //   solc: {
  //     version: "0.5.2"
  //   }
  // },
  mocha: {
    useColors: true
  },
  networks: {
    development: {
      host: 'localhost',
      port: 8545,
      network_id: '*', // eslint-disable-line camelcase
    },
    ropsten:  {
      network_id: 3,
      host: "localhost",
      port:  8545,
      gas:   4600000
    },
    infura: {
      provider: function() {
        return new HDWalletProvider(process.env.MNEMONIC, "https://ropsten.infura.io/v3/29c9aca6789b4ec5b2c3bc6b4a31e5b8");
      },
      network_id: '*'
    }
  },
  rpc: {
    host: 'localhost',
    post:8080
  }
};
