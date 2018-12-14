import React from 'react';
import 'materialize-css/dist/css/materialize.min.css';
import ReactDom from 'react-dom';
import App from './components/App.js';
import { Provider } from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import reduxThunk from 'redux-thunk';
import combineReducers from './reducers';
import axios from 'axios';

window.axios = axios;
const store = createStore(combineReducers, [], applyMiddleware(reduxThunk));

ReactDom.render(
  <Provider store={store}><App /></Provider>,
  document.querySelector('#root')
);

console.log(process.env.REACT_APP_STRIPE_KEY);
console.log(process.env.NODE_ENV);
