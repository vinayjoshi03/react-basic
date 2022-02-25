import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createStore, combineReducers, applyMiddleware } from 'redux'
import postReducer from './store/postReducer'
import userReducer from './store/reducer'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk';
//import 'bootstrap/dist/css/bootstrap.min.css';
import logger from 'redux-logger'
import commonReducer from './store/commonReducer'


const rootReducer = combineReducers({ common: commonReducer, post: postReducer, user: userReducer });
const store = createStore(rootReducer, applyMiddleware(thunk, logger));
ReactDOM.render(
  //<React.StrictMode>
  <Provider store={store}>
    <App />
  </Provider>,
  //</React.StrictMode>,
  document.getElementById('App')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
