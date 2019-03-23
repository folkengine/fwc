// import ERC20 from './contracts/ERC20';
// import ERC20Mintable from './contracts/ERC20Mintable';
import FWC from './contracts/FWC';
// import IERC20 from './contracts/IERC20';
// import Migrations from './contracts/Migrations';
// import MinterRole from './contracts/MinterRole';
// import Roles from './contracts/Roles';
// import SafeMath from './contracts/SafeMath';

const options = {
  web3: {
    block: false,
    fallback: {
      type: 'ws',
      url: 'ws://127.0.0.1:8545'
    }
  },
  // contracts: [ERC20, ERC20Mintable, FWC, IERC20, Migrations, MinterRole, Roles, SafeMath],
  contracts: [FWC],
  events: {
    // ERC20: ['Approval', 'Transfer'],
    // ERC20Mintable: ['MinterAdded', 'MinterRemoved'],
    FWC: ['Wager', 'WagerAccepted', 'Shame'],
  },
  polls: {
    accounts: 1500,
  },
};

export default options;
