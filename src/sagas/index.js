import {
  call, put, takeLatest, all, select,
} from 'redux-saga/effects';

import { getCourierById, getCouriersByBoxField, getGeoHistory } from '../api';
import {
  receiveCouriers,
  receiverCouriersFailed,
  receiveOrders,
  receiveGeoHistory,
  receiveActiveCourierFailed,
  receiveActiveCourier,
  types,
} from '../actions';
import { fetchRecentOrders } from '../services';

function* couriersFetch(action) {
  try {
    const couriers = yield call(getCouriersByBoxField, action.boxField);

    yield put(receiveCouriers(couriers));
  } catch (e) {
    console.error(e);
    yield put(receiverCouriersFailed());
  }
}

function* fetchActiveCourier(action) {
  try {
    let activeCourier = yield select(state => state.activeCourier);
    if (!activeCourier) {
      activeCourier = {};
    }
    const shouldUpdate = activeCourier.id === action.courierId;

    const latest = shouldUpdate
      ? activeCourier.last_seen
      : action.since;

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
    console.error(e);
    yield put(receiveActiveCourierFailed());
  }
}

function* rootSaga() {
  yield all([
    takeLatest(types.REQUEST_COURIERS_BY_BOX_FIELD, couriersFetch),
    takeLatest(types.REQUEST_ACTIVE_COURIER, fetchActiveCourier),
  ]);
}

export default rootSaga;
