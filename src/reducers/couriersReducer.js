import { types } from '../actions';

const initialState = {
  showOnlyFreeCouriers: false,
  couriers: [],
  polygonFilter: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.RECEIVE_COURIERS:
      return {
        ...state,
        couriers: action.couriers,
      };

    case types.SET_SHOW_ONLY_FREE_COURIERS_FLAG:
      return {
        ...state,
        showOnlyFreeCouriers: true,
      };

    case types.RESET_SHOW_ONLY_FREE_COURIERS_FLAG:
      return {
        ...state,
        showOnlyFreeCouriers: false,
      };

    case types.SET_POLYGON:
      return {
        ...state,
        polygonFilter: {
          osmID: action.osmID,
          osmType: action.osmType,
          name: action.name,
          polygon: action.polygon,
        },
      };

    case types.RESET_POLYGON:
      return {
        ...state,
        polygonFilter: null,
      };

    default:
      return state;
  }
};
