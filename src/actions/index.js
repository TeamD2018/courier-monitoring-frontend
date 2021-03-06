import * as types from './types';

export { types };


// Request actions
export const requestCouriersByBoxField = (boxField, activeOnly) => ({
  type: types.REQUEST_COURIERS_BY_BOX_FIELD,
  boxField,
  activeOnly,
});

export const requestCouriersByPolygon = (osmID, osmType, activeOnly) => ({
  type: types.REQUEST_COURIERS_BY_POLYGON,
  osmID,
  osmType,
  activeOnly,
});

export const receiveCouriers = couriers => ({
  type: types.RECEIVE_COURIERS,
  couriers,
});

export const receiverCouriersFailed = (errorMessage, errorName) => ({
  type: types.RECEIVE_COURIERS_FAILED,
  errorMessage,
  errorName,
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
export const receiveActiveCourierFailed = (errorMessage, errorName) => ({
  type: types.RECEIVE_ACTIVE_COURIER_FAIL,
  errorMessage,
  errorName,
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

// Couriers filter
export const setShowOnlyFreeCouriersFlag = () => ({
  type: types.SET_SHOW_ONLY_FREE_COURIERS_FLAG,
});

export const resetShowOnlyFreeCouriersFlag = () => ({
  type: types.RESET_SHOW_ONLY_FREE_COURIERS_FLAG,
});

export const requestPolygon = (osmID, osmType, name) => ({
  type: types.REQUEST_POLYGON,
  osmID,
  osmType,
  name,
});

export const receivePolygonFailed = (errorMessage, errorName) => ({
  type: types.RECEIVE_POLYGON_FAILED,
  errorMessage,
  errorName,
});

export const setPolygonFilter = (osmID, osmType, name, polygon) => ({
  type: types.SET_POLYGON,
  osmID,
  osmType,
  name,
  polygon,
});

export const resetPolygonFilter = () => ({
  type: types.RESET_POLYGON,
});
