import { types } from '../actions';

const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case types.RECEIVE_COURIERS:
      return action.couriers;
    default:
      return state;
  }
};