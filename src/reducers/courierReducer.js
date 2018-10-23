import {
  DISABLE_ACTIVE_COURIER,
  RECEIVE_ACTIVE_COURIER, RECEIVE_GEO_HISTORY,
  RECEIVE_GEO_HISTORY_FAILED,
  RECEIVE_ORDERS,
  RECEIVE_ORDERS_FAILED,
} from '../actions';

const initialState = null;

export default (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_ORDERS:
      return {
        ...state,
        orders: action.orders,
      };

    case RECEIVE_ORDERS_FAILED:
      return state;

    case RECEIVE_GEO_HISTORY_FAILED:
      return state;

    case RECEIVE_ACTIVE_COURIER: {
      let current = state || {};
      if (current.id && current.id !== action.activeCourier.id) {
        current = {};
      }

      return {
        ...current,
        ...action.activeCourier,
      };
    }

    case DISABLE_ACTIVE_COURIER:
      return null;

    case RECEIVE_GEO_HISTORY: {
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

    default:
      return state;
  }
};
