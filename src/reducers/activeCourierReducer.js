import { types } from '../actions';

const initialState = {
  requestedId: null,
  courier: null,
  isFetching: true,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.RECEIVE_ACTIVE_COURIER:
      return {
        ...state,
        courier: action.activeCourier,
        isFetching: false,
      };

    case types.REQUEST_ACTIVE_COURIER:
      return {
        ...state,
        requestedId: action.courierId,
        isFetching: state.courier && state.courier.id !== action.courierId,
      };

    case types.REQUEST_ACTIVE_COURIER_WITH_ONLY_ORDER:
      return {
        ...state,
        requestedId: action.courierId,
        isFetching: state.courier && state.courier.id !== action.courierId,
      };

    case types.RESET_ACTIVE_COURIER:
      return initialState;

    default:
      return state;
  }
};
