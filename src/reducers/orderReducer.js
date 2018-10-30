import { RECEIVE_ACTIVE_ORDER } from '../actions';

const initialState = null;
export default (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_ACTIVE_ORDER: {
      return action.order;
    }
    default:
      return state;
  }
};
