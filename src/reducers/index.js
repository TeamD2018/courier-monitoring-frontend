import { combineReducers } from 'redux';

import mapReducer from './mapReducer';
import courierListReducer from './couriersListReducer';
import couriersReducer from './couriersReducers';
import courierReducer from './courierReducer';
import courierDetailsReducer from './courierDetailsReducer';
import orderReducer from './orderReducer';

export default combineReducers({
  map: mapReducer,
  couriersList: courierListReducer,
  couriers: couriersReducer,
  activeCourier: courierReducer,
  courierDetails: courierDetailsReducer,
  activeOrder: orderReducer,
});
