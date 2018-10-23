import { HIDE_COURIERS_LIST, SHOW_COURIERS_LIST } from '../actions';

const initialState = {
  isOpen: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SHOW_COURIERS_LIST:
      return {
        ...state,
        isOpen: true,
      };

    case HIDE_COURIERS_LIST:
      return {
        ...state,
        isOpen: false,
      };

    default:
      return state;
  }
};
