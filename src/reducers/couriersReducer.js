import { types } from '../actions';

const initialState = {
  showOnlyFreeCouriers: false,
  couriers: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.RECEIVE_COURIERS:
      return {
        ...state,
        couriers: action.couriers,
      };

    case types.SET_SHOW_ONLY_FREE_COURIERS_FLAG:
      return {
        ...state,
        showOnlyFreeCouriers: true,
      };

    case types.RESET_SHOW_ONLY_FREE_COURIERS_FLAG:
      return {
        ...state,
        showOnlyFreeCouriers: false,
      };

    default:
      return state;
  }
};
