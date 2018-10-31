import { types } from '../actions';

const MOCKBA = {
  lat: 55.751244,
  lng: 37.618423,
};

const initialState = {
  center: MOCKBA,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.PAN:
      return {
        ...state,
        center: action.location,
      };

    default:
      return state;
  }
};
