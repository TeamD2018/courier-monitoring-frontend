import * as actions from '../actions';

const MOCKBA = { lat: 55.751244, lng: 37.618423 };

const initialState = {
  couriers: [],
  center: MOCKBA,
  isCouriersListOpen: false,
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.RECEIVE_COURIERS: return {
      ...state,
      couriers: action.couriers,
    };

    case actions.SHOW_COURIERS_LIST: return {
      ...state,
      isCouriersListOpen: true,
    };

    case actions.HIDE_COURIERS_LIST: return {
      ...state,
      isCouriersListOpen: false,
    };

    case actions.PAN: return {
      ...state,
      center: action.location,
    };


    default: return state;
  }
};

export default rootReducer;
