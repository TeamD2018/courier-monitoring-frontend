import { types } from '../actions';

const initialState = {
  isOpen: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.SHOW_COURIERS_LIST:
      return {
        ...state,
        isOpen: true,
      };

    case types.HIDE_COURIERS_LIST:
      return {
        ...state,
        isOpen: false,
      };

    default:
      return state;
  }
};
