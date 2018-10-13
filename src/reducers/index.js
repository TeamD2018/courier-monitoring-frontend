import * as actions from '../actions';

const initialState = {
  couriers: [],
  highlightedCourierId: '',
  center: { lat: 55.751244, lng: 37.618423 },
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.RECEIVE_COURIERS: {
      return {
        ...state,
        couriers: action.couriers,
      };
    }

    case actions.CHANGE_CENTER: {
      return {
        ...state,
        center: action.newCenter,
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
  }
};

export default rootReducer;
