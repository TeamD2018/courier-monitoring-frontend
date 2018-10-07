export const REQUEST_COURIERS_BY_BOX_FIELD = 'REQUEST_COURIERS_BY_BOX_FIELD';
export const RECEIVE_COURIERS = 'RECEIVE_COURIERS';
export const RECEIVE_COURIERS_FAILED = 'RECEIVE_COURIERS_FAILED';
export const CHANGE_CENTER = 'CHANGE_CENTER';

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

export const changeCenter = newCenter => ({
  type: CHANGE_CENTER,
  newCenter,
});
