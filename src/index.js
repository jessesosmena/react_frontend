import React from 'react';
import ReactDOM from 'react-dom';
import { applyMiddleware, createStore, compose } from 'redux';  
import { Provider } from 'react-redux';  
import createSagaMiddleware from 'redux-saga';  
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
//import logger from "redux-logger";
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';
//import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
//import './assets/light-bootstrap-dashboard.css';
//import './assets/animate.min.css';

import './include/bootstrap';

import 'bootstrap/dist/css/bootstrap.css';
import registerServiceWorker from './registerServiceWorker';
import { setToken, } from './login/actions';

//import {  
  //setClient,
//} from './client/actions'


// Import the index reducer and sagas
import IndexReducer from './index-reducer';  
import IndexSagas from './index-sagas';

// Setup the middleware to watch between the Reducers and the Actions
const sagaMiddleware = createSagaMiddleware()

/*eslint-disable */
const composeSetup = process.env.NODE_ENV !== 'production' && typeof window === 'object' &&  
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose
/*eslint-enable */


const store = createStore(
   IndexReducer,
   composeSetup(applyMiddleware(sagaMiddleware, thunk, promise())),
)

const token = localStorage.getItem('token');
store.dispatch(setToken(token));
console.log(token);
//store.subscribe(() =>
  //console.log(store.getState())
//)

// Begin our Index Saga
sagaMiddleware.run(IndexSagas)
// Provider = to “provide” the store to its child components
ReactDOM.render(

  <Provider store={store}> 
    <BrowserRouter>
      <App/>
    </BrowserRouter>
  </Provider>,

document.getElementById('root'));
registerServiceWorker();





