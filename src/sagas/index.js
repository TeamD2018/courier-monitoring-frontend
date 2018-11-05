import {
  call, put, takeLatest, all, select,
} from 'redux-saga/effects';

import {
  getCourierById, getCouriersByBoxField, getGeoHistory, getOrder,
} from '../api';
import {
  receiveCouriers,
  receiverCouriersFailed,
  receiveActiveCourier,
  receiveActiveCourierFailed,
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
    const activeCourier = yield select(state => state.activeCourier);
    const overwrite = !activeCourier.courier || activeCourier.courier.id !== action.courierId;

    const latest = overwrite
      ? 0
      : activeCourier.courier.lastSeen;

    const [courier, geoHistory, orders] = yield all([
      call(getCourierById, action.courierId),
      call(getGeoHistory, action.courierId, latest),
      call(fetchRecentOrders, action.courierId, 8),
    ]);

    courier.orders = orders;
    courier.geoHistory = overwrite
      ? geoHistory
      : activeCourier.courier.geoHistory.concat(geoHistory);

    yield put(receiveActiveCourier(courier));
  } catch (e) {
    console.error(e);
    yield put(receiveActiveCourierFailed());
  }
}

function* fetchActiveCourierWithOnlyOrder(action) {
  try {
    const activeCourier = yield select(state => state.activeCourier);
    const overwrite = !activeCourier.courier || activeCourier.courier.id !== action.courierId;

    const latest = overwrite
      ? 0
      : activeCourier.courier.lastSeen;

    const [courier, geoHistory, order] = yield all([
      call(getCourierById, action.courierId),
      call(getGeoHistory, action.courierId, latest),
      call(getOrder, action.courierId, action.orderId),
    ]);

    courier.orders = [order];
    courier.geoHistory = overwrite
      ? geoHistory
      : activeCourier.geoHistory.concat(geoHistory);

    yield put(receiveActiveCourier(courier));
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
