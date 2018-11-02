import { types } from '../actions';

const initialState = null;

export default (state = initialState, action) => {
  switch (action.type) {
    case types.RECEIVE_ORDERS:
      return {
        ...state,
        orders: action.orders,
      };

    case types.RECEIVE_ORDERS_FAILED:
      return state;

    case types.RECEIVE_ACTIVE_COURIER: {
      let current = state || {};
      if (current.id && current.id !== action.activeCourier.id) {
        current = {};
      }

      return {
        ...current,
        ...action.activeCourier,
      };
    }

    case types.RESET_ACTIVE_COURIER:
      return null;

    case types.RECEIVE_GEO_HISTORY: {
      let activeCourier = state;
      let { geoHistory } = action;
      const { shouldUpdate } = action;
      geoHistory = geoHistory.map(historyPoint => ({
        lat: historyPoint.point.lat,
        lng: historyPoint.point.lon,
      }));

      if (!activeCourier) {
        activeCourier = {
          geoHistory: [],
        };
      }

      if (!activeCourier.geoHistory) {
        activeCourier.geoHistory = [];
      }

      if (shouldUpdate) {
        geoHistory = activeCourier.geoHistory.concat(geoHistory);
      }

      activeCourier = {
        ...activeCourier,
        geoHistory,
      };

      return activeCourier;
    }

    case types.RECEIVE_GEO_HISTORY_FAILED:
      return state;

    default:
      return state;
  }
};
