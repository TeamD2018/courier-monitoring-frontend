import { call, put, takeLatest } from 'redux-saga/effects';

import { getCouriersByBoxField } from '../api';
import { receiveCouriers, receiverCouriersFailed, REQUEST_COURIERS_BY_BOX_FIELD } from '../actions';

function* couriersFetch(action) {
  try {
    const couriers = yield call(getCouriersByBoxField, action.boxField);

    yield put(receiveCouriers(couriers));
  } catch (e) {
    yield put(receiverCouriersFailed());
  }
}

function* rootSaga() {
  yield takeLatest(REQUEST_COURIERS_BY_BOX_FIELD, couriersFetch);
}

export default rootSaga;
