import { types } from '../actions';

const initialState = {
  isOpen: true,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.SHOW_COURIER_DETAILS:
      return {
        ...state,
        isOpen: true,
      };

    case types.HIDE_COURIER_DETAILS:
      return {
        ...state,
        isOpen: false,
      };

    case types.CLOSE_COURIER_DETAILS:
      return {
        ...state,
        isOpen: false,
      };

    case types.SHOW_COURIERS_LIST:
      return {
        ...state,
        isOpen: false,
      };

    default:
      return state;
  }
};
