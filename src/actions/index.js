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


// Active courier actions
export const receiveActiveCourier = activeCourier => ({
  type: types.RECEIVE_ACTIVE_COURIER,
  activeCourier,
});
export const receiveActiveCourierFailed = () => ({
  type: types.RECEIVE_ACTIVE_COURIER_FAIL,
});

export const requestActiveCourier = courierId => ({
  type: types.REQUEST_ACTIVE_COURIER,
  courierId,
});

export const requestActiveCourierWithOnlyOrder = (courierId, orderId) => ({
  type: types.REQUEST_ACTIVE_COURIER_WITH_ONLY_ORDER,
  courierId,
  orderId,
});

export const resetActiveCourier = () => ({
  type: types.RESET_ACTIVE_COURIER,
});


// Map actions
export const pan = location => ({
  type: types.PAN,
  location,
});

export const setZoom = zoom => ({
  type: types.SET_ZOOM,
  zoom,
});


// Error action
export const resetError = () => ({
  type: types.RESET_ERROR,
});
