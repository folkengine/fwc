import React from "react";
import { newContextComponents } from "drizzle-react-components";
import { DrizzleContext } from "drizzle-react";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Simple from './components/Simple';

const { AccountData, ContractData, ContractForm } = newContextComponents;

export default () => (
  <DrizzleContext.Consumer>
    {drizzleContext => {
      const { drizzle, drizzleState, initialized } = drizzleContext;
      if (!initialized) {
        return "Loading...";
      }
      
      const { accounts } = drizzleState;
      return (
        <div className="App">
          <ToastContainer />
          <div>
            <h1>Friendly Wagering Coin (FWC) Tester</h1>
          </div>
          
          <Simple
            drizzle={drizzle}
            drizzleState={drizzleState} />
          
          <div className="section">
            <h2>Active Account</h2>
            <AccountData drizzle={drizzle} drizzleState={drizzleState} accountIndex="0" units="ether" precision="3" />
          </div>
          
          <div className="section">
            <h2>FWC</h2>
            <p>
              <strong>Total Supply: </strong>
              <ContractData
                drizzle={drizzle}
                drizzleState={drizzleState}
                contract="FWC"
                method="totalSupply"
                methodArgs={[{ from: accounts[0] }]}
              />{" "}
              <ContractData
                drizzle={drizzle}
                drizzleState={drizzleState}
                contract="FWC"
                method="symbol"
                hideIndicator
              />
            </p>
            <p>
              <strong>Is Minter: </strong>
              <ContractData
                drizzle={drizzle}
                drizzleState={drizzleState}
                contract="FWC"
                method="isMinter"
                methodArgs={[accounts[0]]}
              />
            </p>
            <p>
              <strong>My Balance: </strong>
              <ContractData
                drizzle={drizzle}
                drizzleState={drizzleState}
                contract="FWC"
                method="balanceOf"
                methodArgs={[accounts[0]]}
              />
            </p>
            <h3>Make Wager</h3>
            <ContractForm
              drizzle={drizzle}
              drizzleState={drizzleState}
              contract="FWC"
              method="makeWager"
              labels={["Amount", "Description"]}
            />
            <h3>Send Tokens</h3>
            <ContractForm
              drizzle={drizzle}
              drizzleState={drizzleState}
              contract="FWC"
              method="transfer"
              labels={["To Address", "Amount to Send"]}
            />
            <h3>Mint Tokens</h3>
            <ContractForm
              drizzle={drizzle}
              drizzleState={drizzleState}
              contract="FWC"
              method="mint"
              labels={["To Address", "Amount to Mint"]}
            />
          </div>
        </div >
      );
    }}
  </DrizzleContext.Consumer>
);
