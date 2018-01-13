import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import jssNested from 'jss-nested';
import { JssProvider, jss } from 'react-jss';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from './reducers';

jss.use(jssNested());

const store = createStore(reducers);

ReactDOM.render(
    <Provider store={store}>
      <JssProvider jss={jss}>
        <App />
      </JssProvider>
    </Provider>
, document.getElementById('root'));

registerServiceWorker();
