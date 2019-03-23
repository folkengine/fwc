import { drizzleConnect } from 'drizzle-react'

import Dapp from './Dapp';

// May still need this even with data function to refresh component on updates for this contract.
const mapStateToProps = state => {
  return {
    accounts: state.accounts,
    FWC: state.contracts.FWC,
    drizzleStatus: state.drizzleStatus
  }
}

const DappContainer = drizzleConnect(Dapp, mapStateToProps);

export default DappContainer;

