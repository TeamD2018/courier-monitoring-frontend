import { types } from '../actions';

const initialState = {
  isOpen: true,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.SHOW_ORDER_DETAILS:
      return {
        ...state,
        isOpen: true,
      };

    case types.HIDE_ORDER_DETAILS:
      return {
        ...state,
        isOpen: false,
      };

    case types.CLOSE_ORDER_DETAILS:
      return {
        ...state,
        isOpen: false,
      };

    default:
      return state;
  }
};
