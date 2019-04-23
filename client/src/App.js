import React, { Component } from 'react';
import { Drizzle } from 'drizzle';
import { DrizzleContext } from "drizzle-react";

import dotenv from 'dotenv';

import './App.css';
import Dapp from './Dapp';
import drizzleOptions from "./drizzleOptions";
import store from './middleware';

dotenv.config();
const drizzle = new Drizzle(drizzleOptions, store);

if (!process.env.REACT_APP_GRAPHQL_ENDPOINT) {
  throw new Error('REACT_APP_GRAPHQL_ENDPOINT environment variable not defined')
}

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
