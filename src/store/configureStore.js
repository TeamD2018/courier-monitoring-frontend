import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer from '../reducers';

const configureStore = () => {
  const sagaMiddleware = createSagaMiddleware();

  const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

  if (module.hot) {
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers/index'); // eslint-disable-line global-require
      store.replaceReducer(nextRootReducer);
    });
  }

  return {
    ...store,
    runSaga: sagaMiddleware.run,
  };
};

export default configureStore;
