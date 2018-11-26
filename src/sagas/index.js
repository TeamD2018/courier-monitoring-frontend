import {
  call, put, takeLatest, all, select, debounce,
} from 'redux-saga/effects';

import {
  getCourierById, getCouriersByBoxField, getGeoHistory, getOrder,
} from '../api';
import {
  receiveCouriers,
  receiverCouriersFailed,
  receiveActiveCourier,
  receiveActiveCourierFailed,
  types, resetActiveCourier,
} from '../actions';
import { fetchRecentOrders } from '../services';

function* couriersFetch(action) {
  try {
    const couriers = yield call(getCouriersByBoxField, action.boxField);

    yield put(receiveCouriers(couriers));
  } catch (e) {
    console.error(e);
    yield put(receiverCouriersFailed(e.message, e.name));
  }
}

function* fetchActiveCourier(action) {
  try {
    const currentActiveCourier = yield select(state => state.activeCourier);
    const overwrite = !currentActiveCourier.courier
      || currentActiveCourier.courier.id !== action.courierId;

    const latest = overwrite
      ? 0
      : currentActiveCourier.courier.lastSeen;

    const [courier, geoHistory, orders] = yield all([
      call(getCourierById, action.courierId),
      call(getGeoHistory, action.courierId, latest),
      call(fetchRecentOrders, action.courierId, 8),
    ]);

    courier.orders = orders;
    courier.geoHistory = overwrite
      ? geoHistory
      : currentActiveCourier.courier.geoHistory.concat(geoHistory);

    yield put(receiveActiveCourier(courier));
  } catch (e) {
    console.error(e);

    if (e.message === '404') {
      yield put(resetActiveCourier());
    } else {
      yield put(receiveActiveCourierFailed(e.message, e.name));
    }
  }
}

function* fetchActiveCourierWithOnlyOrder(action) {
  try {
    const currentActiveCourier = yield select(state => state.activeCourier);
    const overwrite = !currentActiveCourier.courier
      || currentActiveCourier.courier.id !== action.courierId;

    const latest = overwrite
      ? 0
      : currentActiveCourier.courier.lastSeen;

    const [courier, geoHistory, order] = yield all([
      call(getCourierById, action.courierId),
      call(getGeoHistory, action.courierId, latest),
      call(getOrder, action.courierId, action.orderId),
    ]);

    courier.orders = [order];
    courier.geoHistory = overwrite
      ? geoHistory
      : currentActiveCourier.courier.geoHistory.concat(geoHistory);

    yield put(receiveActiveCourier(courier));
  } catch (e) {
    console.error(e);

    if (e.message === '404') {
      yield put(resetActiveCourier());
    } else {
      yield put(receiveActiveCourierFailed(e.message, e.name));
    }
  }
}

function* rootSaga() {
  yield all([
    debounce(500, types.REQUEST_COURIERS_BY_BOX_FIELD, couriersFetch),
    takeLatest(types.REQUEST_ACTIVE_COURIER, fetchActiveCourier),
    takeLatest(types.REQUEST_ACTIVE_COURIER_WITH_ONLY_ORDER, fetchActiveCourierWithOnlyOrder),
  ]);
}

export default rootSaga;
