import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import 'antd/dist/antd.css';
import './less/styles.less';
import App from './components/App';
import reducers from './reducers';

const store = createStore(reducers,
  typeof (localStorage['redux-store']) !== 'undefined' ? JSON.parse(localStorage['redux-store']) : []);

ReactDOM.render(
  <Provider store={store}>
    <App store={store} />
  </Provider>,
  document.querySelector('#root')
);