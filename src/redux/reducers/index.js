import { combineReducers } from 'redux';

import airline from './airline';
import allAirlineReducer from './allAirline';
import allFlightReducer from './allFlight';
import detailAirlineReducer from './detailAirline';
import user from './user';

export default combineReducers({
  airline,
  allAirlineReducer,
  allFlightReducer,
  detailAirlineReducer,
  user
});
