import React, { Component } from 'react';
import { Drizzle } from 'drizzle';
import { DrizzleContext } from "drizzle-react";

import './App.css';
import Dapp from './Dapp';
import drizzleOptions from "./drizzleOptions";
const drizzle = new Drizzle(drizzleOptions);

class App extends Component {
  render() {
    return (
      <DrizzleContext.Provider drizzle={drizzle}>
        <Dapp />
      </DrizzleContext.Provider>
    );
  }
}

export default App;
