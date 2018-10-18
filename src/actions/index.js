export const REQUEST_COURIERS_BY_BOX_FIELD = 'REQUEST_COURIERS_BY_BOX_FIELD';
export const RECEIVE_COURIERS = 'RECEIVE_COURIERS';
export const RECEIVE_COURIERS_FAILED = 'RECEIVE_COURIERS_FAILED';

export const SHOW_COURIERS_LIST = 'SHOW_COURIERS_LIST';
export const HIDE_COURIERS_LIST = 'HIDE_COURIERS_LIST';

export const PAN = 'PAN';
export const SHOW_ALL_COURIERS = 'SHOW_ALL_COURIERS';
export const SHOW_COURIER_ORDER = 'SHOW_COURIER_ORDER';

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

export const pan = location => ({
  type: PAN,
  location,
});

export const showAllCouriers = () => ({
  type: SHOW_ALL_COURIERS,
});

export const showCourierOrder = courierId => ({
  type: SHOW_COURIER_ORDER,
  courierId,
});
