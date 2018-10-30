import './index.css';

import 'regenerator-runtime/runtime';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './containers/App';
import configureStore from './store/configureStore';
import rootSaga from './sagas';
import ClientApp from './containers/ClientApp';

const store = configureStore();
store.runSaga(rootSaga);
const urlParams = new URLSearchParams(window.location.search);
const order_id = urlParams.get('order_id');
const courier_id = urlParams.get('courier_id');
console.log(order_id, courier_id)
ReactDOM.render(
  <Provider store={store}>
    {order_id ? (<ClientApp orderId={order_id} courierId={courier_id}/>) : (<App/>)}
  </Provider>,
  document.getElementById('root'),
);
