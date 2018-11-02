import {
  call, put, takeLatest, all, select,
} from 'redux-saga/effects';

import {
  getCourierById, getCouriersByBoxField, getGeoHistory, getOrder,
} from '../api';
import {
  receiveCouriers,
  receiverCouriersFailed,
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

    if (!activeCourier || activeCourier.id !== action.courierId) {
      yield put(receiveActiveCourier({
        id: action.courierId,
        geoHistory: [],
        orders: [],
        last_seen: 0,
      }));
    }

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

    courier.orders = orders;

    yield all([
      put(receiveActiveCourier(courier)),
      put(receiveGeoHistory(history.geo_history, shouldUpdate)),
    ]);
  } catch (e) {
    console.error(e);
    yield put(receiveActiveCourierFailed());
  }
}

function* fetchActiveCourierWithOnlyOrder(action) {
  try {
    let activeCourier = yield select(state => state.activeCourier);

    if (!activeCourier) {
      activeCourier = {
        id: action.courierId,
        geoHistory: [],
        orders: [],
        last_seen: 0,
      };
    }
    const shouldUpdate = activeCourier.id === action.courierId;

    const latest = shouldUpdate
      ? activeCourier.last_seen
      : action.since;

    const [courier, history, order] = yield all([
      call(getCourierById, action.courierId),
      call(getGeoHistory, action.courierId, latest),
      call(getOrder, action.courierId, action.orderId),
    ]);

    courier.orders = [order];

    yield all([
      put(receiveActiveCourier(courier)),
      put(receiveGeoHistory(history.geo_history, shouldUpdate)),
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
    takeLatest(types.REQUEST_ACTIVE_COURIER_WITH_ONLY_ORDER, fetchActiveCourierWithOnlyOrder),
  ]);
}

export default rootSaga;
