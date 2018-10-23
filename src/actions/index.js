export const REQUEST_COURIERS_BY_BOX_FIELD = 'REQUEST_COURIERS_BY_BOX_FIELD';
export const RECEIVE_COURIERS = 'RECEIVE_COURIERS';
export const RECEIVE_COURIERS_FAILED = 'RECEIVE_COURIERS_FAILED';
export const REQUEST_RECENT_ORDERS = 'REQUEST_RECENT_ORDERS';

export const SHOW_COURIERS_LIST = 'SHOW_COURIERS_LIST';
export const HIDE_COURIERS_LIST = 'HIDE_COURIERS_LIST';

export const PAN = 'PAN';

export const SHOW_ALL_COURIERS = 'SHOW_ALL_COURIERS';
export const SHOW_COURIER_ORDER = 'SHOW_COURIER_ORDER';
export const RECEIVE_ORDERS = 'RECEIVE_ORDERS';
export const RECEIVE_ORDERS_FAILED = 'RECEIVE_ORDERS_FAILED';
export const RECEIVE_GEO_HISTORY = 'RECEIVE_GEO_HISTORY';
export const RECEIVE_GEO_HISTORY_FAILED = 'RECEIVE_GEO_HISTORY_FAIL';
export const REQUEST_GEO_HISTORY = 'REQUEST_GEO_HISTORY';
export const RECEIVE_ACTIVE_COURIER = 'RECEIVE_ACTIVE_COURIER';
export const RECEIVE_ACTIVE_COURIER_FAIL = 'RECEIVE_ACTIVE_COURIER_FAIL';
export const REQUEST_ACTIVE_COURIER = 'REQUEST_ACTIVE_COURIER';


export const DISABLE_ACTIVE_COURIER = 'DISABLE_ACTIVE_COURIER';

export const requestCouriersByBoxField = boxField => ({
  type: REQUEST_COURIERS_BY_BOX_FIELD,
  boxField,
});

export const receiveCouriers = couriers => ({
  type: RECEIVE_COURIERS,
  couriers,
});

export const receiverCouriersFailed = () => ({
  type: RECEIVE_COURIERS_FAILED,
});

export const showCouriersList = () => ({
  type: SHOW_COURIERS_LIST,
});

export const hideCouriersList = () => ({
  type: HIDE_COURIERS_LIST,
});

export const receiveOrders = orders => ({
  type: RECEIVE_ORDERS,
  orders,
});

export const fetchRecentOrders = (courierId, period) => ({
  type: REQUEST_RECENT_ORDERS,
  courierId,
  period,
});
export const receiveOrdersFailed = () => ({
  type: RECEIVE_COURIERS_FAILED,
});

export const receiveGeoHistory = (geoHistory, shouldUpdate) => ({
  type: RECEIVE_GEO_HISTORY,
  geoHistory,
  shouldUpdate,
});
export const receiveGeoHistoryFailed = () => ({
  type: RECEIVE_GEO_HISTORY_FAILED,
});

export const requestGeoHistory = (courierId, since) => ({
  type: REQUEST_GEO_HISTORY,
  courierId,
  since,
});

export const receiveActiveCourier = activeCourier => ({
  type: RECEIVE_ACTIVE_COURIER,
  activeCourier,
});
export const receiveActiveCourierFailed = () => ({
  type: RECEIVE_ACTIVE_COURIER_FAIL,
});

export const requestActiveCourier = (courierId, since) => ({
  type: REQUEST_ACTIVE_COURIER,
  courierId,
  since,
});

export const pan = location => ({
  type: PAN,
  location,
});
export const disableActiveCourier = () => ({
  type: DISABLE_ACTIVE_COURIER,
});
