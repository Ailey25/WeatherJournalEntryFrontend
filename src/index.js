import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import 'babel-polyfill';

import rootReducer from './reducers';
import App from "./app/index.js";
import './styles.css';

export const store = createStore(rootReducer, applyMiddleware(thunk));

const Index = () => (
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>
)

ReactDOM.render(<Index />,document.getElementById("root"));
