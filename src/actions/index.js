export const REQUEST_COURIERS_BY_BOX_FIELD = 'REQUEST_COURIERS_BY_BOX_FIELD';
export const RECEIVE_COURIERS = 'RECEIVE_COURIERS';
export const RECEIVE_COURIERS_FAILED = 'RECEIVE_COURIERS_FAILED';
export const HIGHLIGHT_COURIER = 'HIGHLIGHT_COURIER';
export const PAN = 'PAN';

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

export const pan = location => ({
  type: PAN,
  location,
});

});

export const highlightCourier = highlightedCourierId => ({
  type: HIGHLIGHT_COURIER,
  highlightedCourierId,
});
