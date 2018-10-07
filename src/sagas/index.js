import { call, put, takeLatest } from 'redux-saga/effects'

import * as actions from '../actions';
import * as Api from '../api';

function* couriersFetch(action) {
    console.log('Receiving couriers...');

    try {
        const {topLeftLat, topLeftLon, bottomRightLat, bottomRightLon} = action.boxField;
        const couriers = yield call(Api.getCouriersByBoxField, topLeftLat, topLeftLon, bottomRightLat, bottomRightLon);
        console.log(couriers);
        yield put({ type: actions.RECEIVE_COURIERS, couriers: couriers, center: action.center });
    } catch (e) {
        yield put({type: actions.RECEIVE_COURIERS_FAILED});
    }
}


function* rootSaga() {
    yield takeLatest(actions.REQUEST_COURIERS_BY_BOX_FIELD, couriersFetch);
}

export default rootSaga;
