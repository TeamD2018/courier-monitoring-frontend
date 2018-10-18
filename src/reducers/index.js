import * as actions from '../actions';

const MOCKBA = { lat: 55.751244, lng: 37.618423 };

const initialState = {
  couriers: [],
  highlightedCourierId: '',
  center: { lat: 55.751244, lng: 37.618423 },
  center: MOCKBA,
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.RECEIVE_COURIERS: {
      return {
        ...state,
        couriers: action.couriers,
      };
    }
    case actions.HIGHLIGHT_COURIER: {
      return {
        ...state,
        highlightedCourierId: action.highlightedCourierId,
      };
    }

    default: {
      return state;
    }

    case actions.PAN: return {
      ...state,
      center: action.location,
    };

  }
};

export default rootReducer;
