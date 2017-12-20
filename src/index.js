import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { ApolloClient, ApolloProvider, createNetworkInterface } from 'react-apollo';
import jssNested from 'jss-nested';
import { JssProvider, jss } from 'react-jss';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from './reducers';

jss.use(jssNested());

const store = createStore(reducers);

const networkInterface = createNetworkInterface({
  uri: 'https://api.graph.cool/simple/v1/cj8p2ygkq01250163gfr11kr3'
});
const client = new ApolloClient({ networkInterface });

ReactDOM.render(
  <ApolloProvider client={client}>
    <Provider store={store}>
      <JssProvider jss={jss}>
        <App />
      </JssProvider>
    </Provider>
  </ApolloProvider>
, document.getElementById('root'));

registerServiceWorker();
