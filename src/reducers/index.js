import * as actions from '../actions';

const MOCKBA = {
  lat: 55.751244,
  lng: 37.618423,
};

const initialState = {
  couriers: [],
  center: MOCKBA,
  isCouriersListOpen: false,
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.RECEIVE_COURIERS:
      return {
        ...state,
        couriers: action.couriers,
      };

    case actions.SHOW_COURIERS_LIST:
      return {
        ...state,
        isCouriersListOpen: true,
      };

    case actions.HIDE_COURIERS_LIST:
      return {
        ...state,
        isCouriersListOpen: false,
      };

    case actions.PAN:
      return {
        ...state,
        center: action.location,
      };
    case actions.RECEIVE_ORDERS: {
      const activeCourier = state.activeCourier || {};
      activeCourier.orders = action.order;
      console.log(...state);
      return {
        ...state,
        activeCourier,
      };
    }
    case actions.RECEIVE_ORDERS_FAILED: {
      console.log('FAIL TO RECIEVE ORDERS');
      return { ...state };
    }
    case actions.RECEIVE_GEO_HISTORY_FAILED: {
      console.log('FAIL TO RECIEVE GEO HISTORY');
      return { ...state };
    }
    case actions.RECEIVE_GEO_HISTORY: {
      const activeCourier = state.activeCourier || {};
      const geoHistory = activeCourier.geoHistory || [];
      geoHistory.concat(action.geoHistory);
      activeCourier.geoHistory = geoHistory;
      return {
        ...state,
        activeCourier,
      };
    }
    default:
      return state;
  }
};

export default rootReducer;
