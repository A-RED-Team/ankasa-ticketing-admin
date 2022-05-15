import { combineReducers } from 'redux';

import airline from './airline';
import allAirlineReducer from './allAirline';
import allFlightReducer from './allFlight';
import detailAirlineReducer from './detailAirline';

export default combineReducers({
  airline,
  allAirlineReducer,
  allFlightReducer,
  detailAirlineReducer
});
