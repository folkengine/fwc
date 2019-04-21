import React, { Component } from "react";
import FWCJSON from '../contracts/FWC';
import Web3 from 'web3';

export default class Simple extends Component {
  
  constructor(props, context) {
    super(props);
    
    this.web3 = new Web3(new Web3.providers.WebsocketProvider('wss://ropsten.infura.io/ws/v3/29c9aca6789b4ec5b2c3bc6b4a31e5b8'));
    this.json = FWCJSON;
    this.contractName = this.json['contractName'];
    this.address = this.json['networks']['3']['address'];
    this.contract = new this.web3.eth.Contract(this.json.abi, this.address);
  }
  
  
  state = { isMinter: false };

  componentDidMount() {
    const { drizzle, drizzleState } = this.props;
    
    // console.log(drizzle.web3);
    const contract = drizzle.contracts.FWC;
    const isMinterKey = contract.methods.isMinter.cacheCall(drizzleState.accounts[0]);
    // const isMinter = contract.storedData[isMinterKey].value;
  
    console.log(this.contract);
    
    // this.contract.Wager({}, { fromBlock: 0, toBlock: 'latest' }).get((error, eventResult) => {
    //   if (error)
    //     console.log('Error in myEvent event handler: ' + error);
    //   else
    //     console.log('myEvent: ' + JSON.stringify(eventResult.args));
    // });
    
    // console.log(contract.events);
    this.setState({
      account: drizzleState.accounts[0],
      isMinterKey
    });
  }
  
  render() {
    const { FWC } = this.props.drizzleState.contracts;
  
    // console.log(FWC.events.length);
    
    const isMinter = (
      FWC.isMinter[this.state.isMinterKey] &&
      FWC.isMinter[this.state.isMinterKey].value
    );
  
    if (isMinter === undefined) {
      return 'Loading...'
    }
    
    return (
      <div>
        <p>I'm in. -{isMinter.toString()}-</p>
      </div>
    );
  }
}

