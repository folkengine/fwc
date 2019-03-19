const path = require("path");

module.exports = {
  contracts_build_directory: path.join(__dirname, "../client/src/contracts"),
  compilers: {
    solc: {
      version: "0.5.2"
    }
  },
  networks: {
    development: {
      host: 'localhost',
      port: 8545,
      network_id: '*', // eslint-disable-line camelcase
    },
    test: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*"
    }
  }
};
