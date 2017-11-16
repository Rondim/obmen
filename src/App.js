import React, { Component } from 'react';
import './App.css';

import ExchangeCreate from './containers/ExchangeCreate';

class App extends Component {
  render() {
    return (
      <div className="App">
        <ExchangeCreate />
      </div>
    );
  }
}

export default App;
