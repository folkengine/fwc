import FWC from './contracts/FWC';

const options = {
  web3: {
    block: false,
    fallback: {
      type: 'ws',
      url: 'ws://127.0.0.1:8545'
    }
  },
  contracts: [FWC],
  events: {
    FWC: ['Wager', 'WagerAccepted', 'Shame'],
  },
  polls: {
    accounts: 1500,
  },
};

export default options;
