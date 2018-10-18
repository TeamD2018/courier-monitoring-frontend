import * as actions from '../actions';

const MOCKBA = { lat: 55.751244, lng: 37.618423 };

const initialState = {
  couriers: [],
  center: MOCKBA,
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.RECEIVE_COURIERS: return {
      ...state,
      couriers: action.couriers,
    };

    case actions.PAN: return {
      ...state,
      center: action.location,
    };


    default: return state;
  }
};

export default rootReducer;
