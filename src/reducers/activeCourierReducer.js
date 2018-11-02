import { types } from '../actions';

const initialState = null;

export default (state = initialState, action) => {
  switch (action.type) {
    case types.RECEIVE_ACTIVE_COURIER:
      return action.activeCourier;

    case types.REQUEST_ACTIVE_COURIER:
      return state && state.id !== action.id
        ? {
          ...state,
          id: action.id,
        }
        : state;

    case types.RESET_ACTIVE_COURIER:
      return null;

    default:
      return state;
  }
};
