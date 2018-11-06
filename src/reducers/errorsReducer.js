import { types } from '../actions';

const initialState = {
  error: false,
  errorMessage: null,
  errorName: 'Ошибка',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.RECEIVE_COURIERS_FAILED:
    case types.RECEIVE_ACTIVE_COURIER_FAIL:
      return {
        ...state,
        error: true,
        errorMessage: action.errorMessage,
        errorName: action.errorName,
      };

    case types.RESET_ERROR:
      return initialState;

    default:
      return state;
  }
};
