import {
  call, put, takeLatest, all, select,
} from 'redux-saga/effects';

import { getCourierById, getCouriersByBoxField, getGeoHistory } from '../api';
import {
  receiveCouriers,
  receiverCouriersFailed,
  receiveOrders,
  receiveOrdersFailed,
  receiveGeoHistoryFailed,
  receiveGeoHistory,
  receiveActiveCourierFailed,
  receiveActiveCourier,
  REQUEST_COURIERS_BY_BOX_FIELD,
  REQUEST_RECENT_ORDERS, REQUEST_GEO_HISTORY, REQUEST_ACTIVE_COURIER,
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

function* historyFetch(action) {
  try {
    const history = yield call(getGeoHistory, action.courierId, action.since);
    yield put(receiveGeoHistory(history));
  } catch (e) {
    yield put(receiveGeoHistoryFailed());
  }
}

function* fetchActiveCourier(action) {
  try {
    let activeCourier = yield select(state => state.activeCourier);
    if (!activeCourier) {
      activeCourier = {};
    }
    const currentHistory = activeCourier.geoHistory || [];

    const latest = (activeCourier.id === action.courierId) ? currentHistory[currentHistory.length - 1].timestamp : action.since;

    const [courier, history] = yield all([
      call(getCourierById, action.courierId),
      call(getGeoHistory, action.courierId, latest),
    ]);

    const shouldUpdate = activeCourier.id === action.courierId;

    yield all([
      put(receiveActiveCourier(courier)),
      put(receiveGeoHistory(history.geo_history, shouldUpdate)),
    ]);
  } catch (e) {
    yield put(receiveActiveCourierFailed());
  }
}

function* rootSaga() {
  yield takeLatest(REQUEST_COURIERS_BY_BOX_FIELD, couriersFetch);
  yield takeLatest(REQUEST_RECENT_ORDERS, ordersFetch);
  yield takeLatest(REQUEST_GEO_HISTORY, historyFetch);
  yield takeLatest(REQUEST_ACTIVE_COURIER, fetchActiveCourier);
}

export default rootSaga;
