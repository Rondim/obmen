import React, { Component } from 'react';
import glamorous from 'glamorous';

import ExchangeCreate from './components/ExchangeCreate';

const AppS = glamorous.div({
  width: '768px',
  margin: '0 auto',
  background: '#e5e5e5',
  textAlign: 'center'
});
class App extends Component {
  render() {
    return (
      <AppS>
        <ExchangeCreate />
      </AppS>
    );
  }
}

export default App;
