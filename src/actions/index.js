import * as types from './types';

export { types };


// Request actions
export const requestCouriersByBoxField = boxField => ({
  type: types.REQUEST_COURIERS_BY_BOX_FIELD,
  boxField,
});

export const receiveCouriers = couriers => ({
  type: types.RECEIVE_COURIERS,
  couriers,
});

export const receiverCouriersFailed = () => ({
  type: types.RECEIVE_COURIERS_FAILED,
});


// Couriers list actions
export const showCouriersList = () => ({
  type: types.SHOW_COURIERS_LIST,
});

export const hideCouriersList = () => ({
  type: types.HIDE_COURIERS_LIST,
});


// Courier details actions
export const showCourierDetails = () => ({
  type: types.SHOW_COURIER_DETAILS,
});

export const hideCourierDetails = () => ({
  type: types.HIDE_COURIER_DETAILS,
});

export const closeCourierDetails = () => ({
  type: types.CLOSE_COURIER_DETAILS,
});


// Orders actions
export const receiveOrders = orders => ({
  type: types.RECEIVE_ORDERS,
  orders,
});

export const fetchRecentOrders = (courierId, period) => ({
  type: types.REQUEST_RECENT_ORDERS,
  courierId,
  period,
});
export const receiveOrdersFailed = () => ({
  type: types.RECEIVE_COURIERS_FAILED,
});


// Geo history actions
export const receiveGeoHistory = (geoHistory, shouldUpdate) => ({
  type: types.RECEIVE_GEO_HISTORY,
  geoHistory,
  shouldUpdate,
});
export const receiveGeoHistoryFailed = () => ({
  type: types.RECEIVE_GEO_HISTORY_FAILED,
});

export const requestGeoHistory = (courierId, since) => ({
  type: types.REQUEST_GEO_HISTORY,
  courierId,
  since,
});


// Active courier actions
export const receiveActiveCourier = activeCourier => ({
  type: types.RECEIVE_ACTIVE_COURIER,
  activeCourier,
});
export const receiveActiveCourierFailed = () => ({
  type: types.RECEIVE_ACTIVE_COURIER_FAIL,
});

export const requestActiveCourier = (courierId, since) => ({
  type: types.REQUEST_ACTIVE_COURIER,
  courierId,
  since,
});

export const disableActiveCourier = () => ({
  type: types.DISABLE_ACTIVE_COURIER,
});

export const resetActiveCourier = courierId => ({
  type: types.RESET_ACTIVE_COURIER,
  courierId,
});


// Map actions
export const pan = location => ({
  type: types.PAN,
  location,
});
