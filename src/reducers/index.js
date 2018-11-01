import { combineReducers } from 'redux';

import mapReducer from './mapReducer';
import courierListReducer from './couriersListReducer';
import couriersReducer from './couriersReducer';
import activeCourierReducer from './activeCourierReducer';
import courierDetailsReducer from './courierDetailsReducer';
import orderReducer from './orderReducer';

export default combineReducers({
  map: mapReducer,
  couriersList: courierListReducer,
  couriers: couriersReducer,
  activeCourier: activeCourierReducer,
  courierDetails: courierDetailsReducer,
  activeOrder: orderReducer,
});
