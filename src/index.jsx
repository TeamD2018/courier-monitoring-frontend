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
const orderId = urlParams.get('order_id');
const courierId = urlParams.get('courier_id');

ReactDOM.render(
  <Provider store={store}>
    {
      orderId
        ? <ClientApp orderId={orderId} courierId={courierId} />
        : <App />
    }
  </Provider>,
  document.getElementById('root'),
);
