import { call, put, takeLatest } from 'redux-saga/effects';

import { getCouriersByBoxField, getGeoHistory } from '../api';
import {
  receiveCouriers,
  receiverCouriersFailed,
  receiveOrders,
  receiveOrdersFailed,
  receiveGeoHistoryFailed,
  receiveGeoHistory,
  REQUEST_COURIERS_BY_BOX_FIELD,
  REQUEST_RECENT_ORDERS, REQUEST_GEO_HISTORY,
} from '../actions';
import { fetchRecentOrders } from '../services/index';

function* couriersFetch(action) {
  try {
    const couriers = yield call(getCouriersByBoxField, action.boxField);

    yield put(receiveCouriers(couriers));
  } catch (e) {
    yield put(receiverCouriersFailed());
  }
}

function* ordersFetch(action) {
  try {
    const orders = yield call(fetchRecentOrders, action.courierId, action.period);
    console.log(orders);
    yield put(receiveOrders(orders));
  } catch (e) {
    yield put(receiveOrdersFailed());
  }
}

function* historyFetch(action) {
  try {
    const history = yield call(getGeoHistory, action.courierId, action.since);
    console.log(history);
    yield put(receiveGeoHistory(history));
  } catch (e) {
    yield put(receiveGeoHistoryFailed());
  }
}

function* rootSaga() {
  yield takeLatest(REQUEST_COURIERS_BY_BOX_FIELD, couriersFetch);
  yield takeLatest(REQUEST_RECENT_ORDERS, ordersFetch);
  yield takeLatest(REQUEST_GEO_HISTORY, historyFetch);
}

export default rootSaga;
