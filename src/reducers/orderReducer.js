import { types } from '../actions';

const initialState = null;

export default (state = initialState, action) => {
  switch (action.type) {
    case types.SET_ACTIVE_ORDER:
      return action.order;

    case types.RESET_ACTIVE_ORDER:
      return null;

    case types.RECEIVE_ACTIVE_ORDER:
      return action.order;

    default:
      return state;
  }
};
