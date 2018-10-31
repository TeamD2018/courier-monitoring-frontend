import { combineReducers } from 'redux';

import mapReducer from './mapReducer';
import courierListReducer from './couriersListReducer';
import couriersReducer from './courierReducers';
import activeCourierReducer from './activeCourierReducer';
import courierDetailsReducer from './courierDetailsReducer';

export default combineReducers({
  map: mapReducer,
  couriersList: courierListReducer,
  couriers: couriersReducer,
  activeCourier: activeCourierReducer,
  courierDetails: courierDetailsReducer,
});
