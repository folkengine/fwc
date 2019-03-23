import React, { Component } from 'react'
import { newContextComponents } from "drizzle-react-components";

const { AccountData, ContractData, ContractForm } = newContextComponents;

class Dapp extends Component {
  render() {
    return (
      <main className="container">
        <div className="pure-u-1-1">
          <h2>Active Account</h2>
          <AccountData accountIndex="0" units="ether" precision="3" />
        </div>
      </main>
    )
  }
}

export default Dapp
