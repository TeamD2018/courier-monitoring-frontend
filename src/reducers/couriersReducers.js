import { RECEIVE_COURIERS } from '../actions';

const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_COURIERS:
      return action.couriers;

    default:
      return state;
  }
};
