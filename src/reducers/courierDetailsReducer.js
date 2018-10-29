import { HIDE_COURIER_DETAILS, SHOW_COURIER_DETAILS, CLOSE_COURIER_DETAILS } from '../actions';

const initialState = {
  isOpen: true,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SHOW_COURIER_DETAILS:
      return {
        ...state,
        isOpen: true,
      };

    case HIDE_COURIER_DETAILS:
      return {
        ...state,
        isOpen: false,
      };

    case CLOSE_COURIER_DETAILS:
      return {
        ...state,
        isOpen: false,
      };

    default:
      return state;
  }
};
