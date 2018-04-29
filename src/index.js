import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';                           
import { Provider } from 'react-redux';
// import { createLogger } from 'redux-logger';
import ReduxThunk from 'redux-thunk';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import reducers from './reducers';

const composeStoreWithMiddleware = applyMiddleware(                             
  // createLogger(),
  ReduxThunk
)(createStore);

ReactDOM.render((
  <Provider store={composeStoreWithMiddleware(reducers)}>
    <App/>
  </Provider>
), document.getElementById('root'));

registerServiceWorker();
