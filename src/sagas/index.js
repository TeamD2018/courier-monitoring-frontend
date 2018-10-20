import { call, put, takeLatest } from 'redux-saga/effects';

import { getCouriersByBoxField } from '../api';
import { receiveCouriers, receiverCouriersFailed, REQUEST_COURIERS_BY_BOX_FIELD } from '../actions';
import { fetchRecentOrders } from '../services/orders';

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
    yield put(recieveOrders(orders));
  } catch (e) {
    yield put(recieveOrdersFailed());
  }
}

function* rootSaga() {
  yield takeLatest(REQUEST_COURIERS_BY_BOX_FIELD, couriersFetch);
}

export default rootSaga;
