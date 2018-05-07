import React from 'react';
import ReactDOM from 'react-dom';
import ReduxThunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';                           
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import reducers from './reducers';

const composeStoreWithMiddleware = applyMiddleware(                             
  ReduxThunk
)(createStore);

ReactDOM.render((
  <Provider store={composeStoreWithMiddleware(reducers)}>
    <BrowserRouter>
      <App/>
    </BrowserRouter>
  </Provider>
), document.getElementById('root'));

registerServiceWorker();
