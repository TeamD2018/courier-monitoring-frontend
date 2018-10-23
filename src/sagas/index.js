import {
  call, put, takeLatest, all, select, takeEvery,
} from 'redux-saga/effects';

import { getCourierById, getCouriersByBoxField, getGeoHistory } from '../api';
import {
  receiveCouriers,
  receiverCouriersFailed,
  receiveOrders,
  receiveOrdersFailed,
  receiveGeoHistory,
  receiveActiveCourierFailed,
  receiveActiveCourier,
  REQUEST_COURIERS_BY_BOX_FIELD,
  REQUEST_RECENT_ORDERS, REQUEST_ACTIVE_COURIER,
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
    yield put(receiveOrders(orders));
  } catch (e) {
    yield put(receiveOrdersFailed());
  }
}


function* fetchActiveCourier(action) {
  try {
    let activeCourier = yield select(state => state.activeCourier);
    if (!activeCourier) {
      activeCourier = {};
    }
    const shouldUpdate = activeCourier.id === action.courierId;

    const latest = (shouldUpdate)
      ? (activeCourier.last_seen) : action.since;

    const [courier, history, orders] = yield all([
      call(getCourierById, action.courierId),
      call(getGeoHistory, action.courierId, latest),
      call(fetchRecentOrders, action.courierId, 8),
    ]);
    yield all([
      put(receiveActiveCourier(courier)),
      put(receiveGeoHistory(history.geo_history, shouldUpdate)),
      put(receiveOrders(orders)),
    ]);
  } catch (e) {
    yield put(receiveActiveCourierFailed());
  }
}

function* rootSaga() {
  yield all([
    takeLatest(REQUEST_COURIERS_BY_BOX_FIELD, couriersFetch),
    takeLatest(REQUEST_RECENT_ORDERS, ordersFetch),
    takeEvery(REQUEST_ACTIVE_COURIER, fetchActiveCourier),
  ]);
}

export default rootSaga;
